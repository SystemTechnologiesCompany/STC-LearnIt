// Dashboard-ready bundle. Generated from supabase/functions; edit the source files first.

// supabase/functions/_shared/stripe.ts
import Stripe from "npm:stripe@23.1.0";
import { createClient } from "npm:@supabase/supabase-js@2.81.1";
var prices = {
  pro: Deno.env.get("STRIPE_PRICE_PRO") || "price_1UZ7jk4Mzb2FMoC9REskIl6F",
  stc: Deno.env.get("STRIPE_PRICE_STC") || "price_1UZ7k54Mzb2FMoC9htZNQwMR"
};
function clients() {
  const key = (Deno.env.get("STRIPE_SECRET_KEY") || "").trim();
  if (!key) throw new Error("BILLING_KEY_MISSING");
  const live = Deno.env.get("STRIPE_MODE") === "live";
  if (!(live ? /^(rk|sk)_live_/ : /^(rk|sk)_test_/).test(key)) throw new Error("BILLING_MODE_MISMATCH");
  if (!Deno.env.get("SUPABASE_URL") || !Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")) throw new Error("SUPABASE_ENV_MISSING");
  const stripe = new Stripe(key, { apiVersion: "2026-10-28.endive", maxNetworkRetries: 2 });
  const db = createClient(Deno.env.get("SUPABASE_URL"), Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"), { auth: { persistSession: false } });
  return { stripe, db, live };
}
var id = (value) => typeof value === "string" ? value : value?.id || "";
async function checkedPrice(stripe, plan, live, requireActive = true) {
  const price = await stripe.prices.retrieve(prices[plan]);
  if (requireActive && !price.active || price.livemode !== live || price.currency !== "dzd" || price.unit_amount !== (plan === "pro" ? 25e3 : 7e4) || price.recurring?.interval !== "month" || price.recurring.interval_count !== 1) throw new Error("PRICE_CONFIGURATION");
  return price;
}

// supabase/functions/stripe-webhook/index.ts
Deno.serve(async (request) => {
  if (request.method !== "POST") return new Response("Method not allowed", { status: 405 });
  let event;
  const { stripe, db, live } = clients();
  try {
    event = await stripe.webhooks.constructEventAsync(await request.text(), request.headers.get("stripe-signature") || "", Deno.env.get("STRIPE_WEBHOOK_SECRET") || "");
  } catch {
    return new Response("Invalid signature", { status: 400 });
  }
  if (event.livemode !== live) return new Response("Mode mismatch", { status: 400 });
  const watched = ["checkout.session.completed", "checkout.session.async_payment_succeeded", "checkout.session.async_payment_failed", "customer.subscription.created", "customer.subscription.updated", "customer.subscription.deleted", "invoice.paid", "invoice.payment_failed", "charge.refunded", "charge.dispute.created", "radar.early_fraud_warning.created"];
  if (!watched.includes(event.type)) return new Response("Ignored");
  try {
    const observed = (/* @__PURE__ */ new Date()).toISOString();
    const object = event.data.object;
    let subId = "";
    let blocked = false;
    if (event.type.startsWith("customer.subscription.")) subId = id(object);
    else if (event.type.startsWith("checkout.session.")) {
      if (object.payment_status !== "paid") return new Response("Awaiting payment");
      subId = id(object.subscription);
    } else if (event.type.startsWith("invoice.")) subId = id(object.parent?.subscription_details?.subscription);
    else {
      const charge = event.type === "charge.refunded" ? object : await stripe.charges.retrieve(id(object.charge));
      if (!id(charge.payment_intent)) return new Response("No payment intent");
      const payments = await stripe.invoicePayments.list({ payment: { type: "payment_intent", payment_intent: id(charge.payment_intent) }, limit: 1 });
      const invoiceId = id(payments.data[0]?.invoice);
      if (!invoiceId) return new Response("No subscription invoice");
      const invoice = await stripe.invoices.retrieve(invoiceId);
      subId = id(invoice.parent?.subscription_details?.subscription);
      blocked = event.type !== "radar.early_fraud_warning.created" && (event.type !== "charge.refunded" || charge.refunded === true);
      if (event.type === "radar.early_fraud_warning.created") console.warn("Stripe early fraud warning: review in Dashboard", event.id);
    }
    if (!subId) return new Response("No subscription");
    const sub = await stripe.subscriptions.retrieve(subId);
    const { data: owner, error: ownerError } = await db.from("stripe_customers").select("user_id").eq("customer_id", id(sub.customer)).eq("livemode", live).maybeSingle();
    if (ownerError) throw ownerError;
    if (!owner) throw new Error("CUSTOMER_MAPPING_MISSING");
    const item = sub.items.data[0];
    const plan = item?.price.id === prices.stc ? "stc" : item?.price.id === prices.pro ? "pro" : null;
    if (!plan || sub.items.data.length !== 1 || item.quantity !== 1) throw new Error("UNKNOWN_PRICE");
    await checkedPrice(stripe, plan, live, false);
    const invoices = await stripe.invoices.list({ subscription: sub.id, status: "paid", limit: 1 });
    const lastPaid = invoices.data[0];
    let paidUntil = 0;
    if (lastPaid) {
      const lines = await stripe.invoices.listLineItems(lastPaid.id, { limit: 100 });
      for (const line of lines.data) {
        if (id(line.parent?.subscription_item_details?.subscription_item) === item.id && line.pricing?.price_details?.price === item.price.id) paidUntil = Math.max(paidUntil, line.period.end);
      }
    }
    const { error } = await db.rpc("record_stripe_subscription", {
      p_event: event.id,
      p_type: event.type,
      p_subscription: sub.id,
      p_user: owner.user_id,
      p_plan: plan,
      p_status: sub.status,
      p_live: live,
      p_paid_until: new Date(paidUntil * 1e3).toISOString(),
      p_observed: observed,
      p_block: blocked
    });
    if (error) throw error;
    return new Response("Recorded");
  } catch (error) {
    console.error("Stripe reconciliation failed", event.id, error.code || error.name);
    return new Response("Retry later", { status: 500 });
  }
});
