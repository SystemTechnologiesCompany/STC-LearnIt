import Stripe from 'npm:stripe@23.1.0';
import { checkedPrice } from './stripe.ts';

const pro = { active: true, livemode: false, currency: 'dzd', unit_amount: 25000, recurring: { interval: 'month', interval_count: 1 } };
const client = (price: unknown) => ({ prices: { retrieve: () => Promise.resolve(price) } }) as unknown as Stripe;
Deno.test('Pro and STC accept the advertised monthly DZD amounts', async () => {
  await checkedPrice(client(pro), 'pro', false);
  await checkedPrice(client({ ...pro, unit_amount: 70000 }), 'stc', false);
});
for (const [name, patch] of Object.entries({
  'live price in sandbox': { livemode: true },
  'wrong currency': { currency: 'usd' },
  '250 minor units instead of 250 DZD': { unit_amount: 250 },
  'wrong tier amount': { unit_amount: 70000 },
  'archived checkout price': { active: false },
  'yearly renewal': { recurring: { interval: 'year', interval_count: 1 } },
  'three-month renewal': { recurring: { interval: 'month', interval_count: 3 } },
  'one-time price': { recurring: null },
})) Deno.test(`Checkout rejects ${name}`, async () => {
  let rejected = false;
  try { await checkedPrice(client({ ...pro, ...patch }), 'pro', false); }
  catch { rejected = true; }
  if (!rejected) throw new Error('Unsafe price accepted');
});
Deno.test('Archived prices still reconcile existing paid subscriptions', async () => {
  await checkedPrice(client({ ...pro, active: false }), 'pro', false, false);
});
