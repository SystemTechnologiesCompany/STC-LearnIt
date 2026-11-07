import Stripe from 'npm:stripe@23.1.0';
import { createClient } from 'npm:@supabase/supabase-js@2.81.1';

export const site = 'https://stclearnit.netlify.app';
export const prices = {
  pro: Deno.env.get('STRIPE_PRICE_PRO') || 'price_1UZ7jk4Mzb2FMoC9REskIl6F',
  stc: Deno.env.get('STRIPE_PRICE_STC') || 'price_1UZ7k54Mzb2FMoC9htZNQwMR',
};
export function clients() {
  const key = (Deno.env.get('STRIPE_SECRET_KEY') || '').trim();
  if (!key) throw new Error('BILLING_KEY_MISSING');
  const live = Deno.env.get('STRIPE_MODE') === 'live';
  if (!(live ? /^(rk|sk)_live_/ : /^(rk|sk)_test_/).test(key)) throw new Error('BILLING_MODE_MISMATCH');
  if (!Deno.env.get('SUPABASE_URL') || !Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')) throw new Error('SUPABASE_ENV_MISSING');
  const stripe = new Stripe(key, { apiVersion: '2026-10-28.endive', maxNetworkRetries: 2 });
  const db = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, { auth: { persistSession: false } });
  return { stripe, db, live };
}
export const id = (value: unknown): string => typeof value === 'string' ? value : (value as { id?: string })?.id || '';
export async function checkedPrice(stripe: Stripe, plan: 'pro' | 'stc', live: boolean, requireActive = true) {
  const price = await stripe.prices.retrieve(prices[plan]);
  if ((requireActive && !price.active) || price.livemode !== live || price.currency !== 'dzd' || price.unit_amount !== (plan === 'pro' ? 25000 : 70000)
    || price.recurring?.interval !== 'month' || price.recurring.interval_count !== 1) throw new Error('PRICE_CONFIGURATION');
  return price;
}
