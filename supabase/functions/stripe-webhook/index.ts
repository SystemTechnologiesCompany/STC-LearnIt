import Stripe from 'npm:stripe@23.1.0';
import { clients, prices, id, checkedPrice } from '../_shared/stripe.ts';

Deno.serve(async request => {
  if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 });
  let event: Stripe.Event;
  const { stripe, db, live } = clients();
  try {
    event = await stripe.webhooks.constructEventAsync(await request.text(), request.headers.get('stripe-signature') || '', Deno.env.get('STRIPE_WEBHOOK_SECRET') || '');
  } catch { return new Response('Invalid signature', { status: 400 }); }
  if (event.livemode !== live) return new Response('Mode mismatch', { status: 400 });
  const watched = ['checkout.session.completed','checkout.session.async_payment_succeeded','checkout.session.async_payment_failed','customer.subscription.created','customer.subscription.updated','customer.subscription.deleted','invoice.paid','invoice.payment_failed','charge.refunded','charge.dispute.created','radar.early_fraud_warning.created'];
  if (!watched.includes(event.type)) return new Response('Ignored');
  try {
    const observed = new Date().toISOString();
    const object = event.data.object as unknown as Record<string, any>;
    let subId = '';
    let blocked = false;
    if (event.type.startsWith('customer.subscription.')) subId = id(object);
    else if (event.type.startsWith('checkout.session.')) {
      if (object.payment_status !== 'paid') return new Response('Awaiting payment');
      subId = id(object.subscription);
    } else if (event.type.startsWith('invoice.')) subId = id(object.parent?.subscription_details?.subscription);
    else {
      const charge = event.type === 'charge.refunded' ? object : await stripe.charges.retrieve(id(object.charge));
      // Current API resolves invoice charges through InvoicePayment -> PaymentIntent.
      if (!id(charge.payment_intent)) return new Response('No payment intent');
      const payments = await stripe.invoicePayments.list({ payment: { type: 'payment_intent', payment_intent: id(charge.payment_intent) }, limit: 1 });
      const invoiceId = id(payments.data[0]?.invoice);
      if (!invoiceId) return new Response('No subscription invoice');
      const invoice = await stripe.invoices.retrieve(invoiceId);
      subId = id(invoice.parent?.subscription_details?.subscription);
      blocked = event.type !== 'radar.early_fraud_warning.created' && (event.type !== 'charge.refunded' || charge.refunded === true);
      if (event.type === 'radar.early_fraud_warning.created') console.warn('Stripe early fraud warning: review in Dashboard', event.id);
    }
    if (!subId) return new Response('No subscription');
    const sub = await stripe.subscriptions.retrieve(subId);
    const { data: owner, error: ownerError } = await db.from('stripe_customers').select('user_id').eq('customer_id', id(sub.customer)).eq('livemode', live).maybeSingle();
    if (ownerError) throw ownerError;
    if (!owner) throw new Error('CUSTOMER_MAPPING_MISSING');
    const item = sub.items.data[0];
    const plan = item?.price.id === prices.stc ? 'stc' : item?.price.id === prices.pro ? 'pro' : null;
    if (!plan || sub.items.data.length !== 1 || item.quantity !== 1) throw new Error('UNKNOWN_PRICE');
    await checkedPrice(stripe, plan, live, false);
    const invoices = await stripe.invoices.list({ subscription: sub.id, status: 'paid', limit: 1 });
    const lastPaid = invoices.data[0];
    let paidUntil = 0;
    if (lastPaid) {
      const lines = await stripe.invoices.listLineItems(lastPaid.id, { limit: 100 });
      for (const line of lines.data) {
        if (id(line.parent?.subscription_item_details?.subscription_item) === item.id && line.pricing?.price_details?.price === item.price.id) paidUntil = Math.max(paidUntil, line.period.end);
      }
    }
    const { error } = await db.rpc('record_stripe_subscription', {
      p_event: event.id, p_type: event.type, p_subscription: sub.id, p_user: owner.user_id, p_plan: plan,
      p_status: sub.status, p_live: live, p_paid_until: new Date(paidUntil * 1000).toISOString(), p_observed: observed, p_block: blocked,
    });
    if (error) throw error;
    return new Response('Recorded');
  } catch (error) {
    console.error('Stripe reconciliation failed', event.id, (error as { code?: string }).code || (error as Error).name);
    return new Response('Retry later', { status: 500 });
  }
});
