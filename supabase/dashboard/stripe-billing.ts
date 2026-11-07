// Dashboard-ready bundle. Generated from supabase/functions; edit the source files first.

// supabase/functions/_shared/stripe.ts
import Stripe from "npm:stripe@23.1.0";
import { createClient } from "npm:@supabase/supabase-js@2.81.1";
var site = "https://stclearnit.netlify.app";
var prices = {
  pro: Deno.env.get("STRIPE_PRICE_PRO") || "price_1UZ6aR4Mzb2FMoC9OpncOXVr",
  stc: Deno.env.get("STRIPE_PRICE_STC") || "price_1UZ6bB4Mzb2FMoC9GHMFVvtZ"
};
function clients() {
  const key = Deno.env.get("STRIPE_SECRET_KEY") || "";
  const live = Deno.env.get("STRIPE_MODE") === "live";
  if (!(live ? /^(rk|sk)_live_/ : /^(rk|sk)_test_/).test(key)) throw new Error("BILLING_MODE_MISMATCH");
  const stripe = new Stripe(key, { apiVersion: "2026-10-28.endive", maxNetworkRetries: 2 });
  const db = createClient(Deno.env.get("SUPABASE_URL"), Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"), { auth: { persistSession: false } });
  return { stripe, db, live };
}
async function checkedPrice(stripe, plan, live, requireActive = true) {
  const price = await stripe.prices.retrieve(prices[plan]);
  if (requireActive && !price.active || price.livemode !== live || price.currency !== "dzd" || price.unit_amount !== (plan === "pro" ? 25e3 : 7e4) || price.recurring?.interval !== "month" || price.recurring.interval_count !== 1) throw new Error("PRICE_CONFIGURATION");
  return price;
}

// supabase/functions/stripe-billing/index.ts
var headers = {
  "Access-Control-Allow-Origin": site,
  "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-client-info",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json"
};
var json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers });
Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers });
  if (request.method !== "POST") return json({ reason: "METHOD" }, 405);
  try {
    if (!Deno.env.get("STRIPE_WEBHOOK_SECRET")) throw new Error("WEBHOOK_NOT_CONFIGURED");
    const { stripe, db, live } = clients();
    const token = (request.headers.get("Authorization") || "").replace(/^Bearer /, "");
    const { data: { user }, error: authError } = await db.auth.getUser(token);
    if (authError || !user) return json({ reason: "SIGN_IN_REQUIRED" }, 401);
    const body = await request.json();
    const { data: mapping, error: mapError } = await db.from("stripe_customers").select("customer_id").eq("user_id", user.id).eq("livemode", live).maybeSingle();
    if (mapError) throw mapError;
    let customerId = mapping?.customer_id;
    if (!customerId) {
      const customer = await stripe.customers.create({ email: user.email, metadata: { supabase_user_id: user.id } }, { idempotencyKey: `learnit-customer-${user.id}-${live}` });
      const { error } = await db.from("stripe_customers").upsert({ user_id: user.id, livemode: live, customer_id: customer.id }, { onConflict: "user_id,livemode" });
      if (error) throw error;
      customerId = customer.id;
    }
    const portal = async () => json({ url: (await stripe.billingPortal.sessions.create({ customer: customerId, return_url: `${site}/profile.html` })).url });
    if (body.action === "portal") return await portal();
    if (body.action !== "checkout" || !["pro", "stc"].includes(body.plan)) return json({ reason: "INVALID_PLAN" }, 400);
    const plan = body.plan;
    const price = await checkedPrice(stripe, plan, live);
    const existing = await stripe.subscriptions.list({ customer: customerId, status: "all", limit: 100 });
    if (existing.has_more || existing.data.some((s) => !["canceled", "incomplete_expired"].includes(s.status))) return await portal();
    const open = await stripe.checkout.sessions.list({ customer: customerId, status: "open", limit: 10 });
    if (open.data.length) return json({ url: open.data[0].url });
    const bucket = Math.floor(Date.now() / 18e5);
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      line_items: [{ price: price.id, quantity: 1 }],
      client_reference_id: user.id,
      metadata: { supabase_user_id: user.id, plan },
      subscription_data: { metadata: { supabase_user_id: user.id, plan } },
      locale: body.language === "fr" ? "fr" : "en",
      success_url: `${site}/profile.html?billing=success`,
      cancel_url: `${site}/profile.html?billing=cancelled`,
      integration_identifier: "stc_learnit_checkout_qmtrbplx"
    }, { idempotencyKey: `learnit-checkout-${user.id}-${bucket}` });
    return json({ url: session.url });
  } catch (error) {
    console.error("Stripe billing failed", error.code || error.name);
    return json({ reason: "BILLING_UNAVAILABLE" }, 503);
  }
});
