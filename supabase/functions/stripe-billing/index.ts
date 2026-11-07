import { clients, checkedPrice, site } from '../_shared/stripe.ts';

const headers = {
  'Access-Control-Allow-Origin': site,
  'Access-Control-Allow-Headers': 'authorization, apikey, content-type, x-client-info',
  'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Content-Type': 'application/json',
};
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers });
Deno.serve(async request => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers });
  if (request.method !== 'POST') return json({ reason: 'METHOD' }, 405);
  try {
    if (!Deno.env.get('STRIPE_WEBHOOK_SECRET')) throw new Error('WEBHOOK_NOT_CONFIGURED');
    const { stripe, db, live } = clients();
    const token = (request.headers.get('Authorization') || '').replace(/^Bearer /, '');
    const { data: { user }, error: authError } = await db.auth.getUser(token);
    if (authError || !user) return json({ reason: 'SIGN_IN_REQUIRED' }, 401);
    const body = await request.json();
    if (body.expectedMode !== (live ? 'live' : 'test')) return json({ reason: 'BILLING_MODE_MISMATCH' }, 409);
    const { data: mapping, error: mapError } = await db.from('stripe_customers').select('customer_id').eq('user_id', user.id).eq('livemode', live).maybeSingle();
    if (mapError) throw mapError;
    let customerId = mapping?.customer_id;
    if (!customerId) {
      const customer = await stripe.customers.create({ email: user.email, metadata: { supabase_user_id: user.id } }, { idempotencyKey: `learnit-customer-${user.id}-${live}` });
      const { error } = await db.from('stripe_customers').upsert({ user_id: user.id, livemode: live, customer_id: customer.id }, { onConflict: 'user_id,livemode' });
      if (error) throw error;
      customerId = customer.id;
    }
    const portal = async () => json({ url: (await stripe.billingPortal.sessions.create({ customer: customerId, return_url: `${site}/profile.html` })).url });
    if (body.action === 'portal') return await portal();
    if (body.action !== 'checkout' || !['pro', 'stc'].includes(body.plan)) return json({ reason: 'INVALID_PLAN' }, 400);
    const plan = body.plan as 'pro' | 'stc';
    const price = await checkedPrice(stripe, plan, live);
    const existing = await stripe.subscriptions.list({ customer: customerId, status: 'all', limit: 100 });
    if (existing.has_more || existing.data.some(s => !['canceled', 'incomplete_expired'].includes(s.status))) return await portal();
    // One pending checkout per customer prevents rapid clicks creating duplicate subscriptions.
    const open = await stripe.checkout.sessions.list({ customer: customerId, status: 'open', limit: 10 });
    if (open.data.length) return json({ url: open.data[0].url });
    const bucket = Math.floor(Date.now() / 1800000);
    const session = await stripe.checkout.sessions.create({
      customer: customerId, mode: 'subscription', line_items: [{ price: price.id, quantity: 1 }],
      client_reference_id: user.id, metadata: { supabase_user_id: user.id, plan },
      subscription_data: { metadata: { supabase_user_id: user.id, plan } },
      locale: body.language === 'fr' ? 'fr' : 'en',
      success_url: `${site}/profile.html?billing=success`, cancel_url: `${site}/profile.html?billing=cancelled`,
      integration_identifier: 'stc_learnit_checkout_qmtrbplx',
    }, { idempotencyKey: `learnit-checkout-${user.id}-${bucket}` });
    return json({ url: session.url });
  } catch (error) {
    // Never log provider messages, request headers, key values or environment contents.
    const problem = error as { code?: string; name?: string; type?: string; message?: string };
    const setupReasons = ['WEBHOOK_NOT_CONFIGURED', 'BILLING_KEY_MISSING', 'BILLING_MODE_MISMATCH', 'PRICE_CONFIGURATION', 'SUPABASE_ENV_MISSING'];
    const reason = setupReasons.includes(problem.message || '') ? problem.message
      : problem.type === 'StripePermissionError' ? 'STRIPE_PERMISSION_MISSING'
      : problem.type === 'StripeAuthenticationError' ? 'STRIPE_KEY_INVALID'
      : problem.code === 'resource_missing' ? 'STRIPE_RESOURCE_MISSING'
      : 'BILLING_UNAVAILABLE';
    console.error('Stripe billing failed', reason);
    return json({ reason }, 503);
  }
});
