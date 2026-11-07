# STC Learnit — Stripe integration plan

Prepared 7 November 2026 from the existing website and official Stripe integration guidance. The installed plugin did not expose `stripe_implementation_planner`; the user-requested official skills fallback was run instead. This is a project-specific plan, not a planner-tool output.

## Current implementation

- Static frontend hosted on Netlify; Supabase provides accounts and premium entitlements.
- `plans.js` offers Pro at 250 DA and STC at 700 DA. Visa currently displays a coming-soon message. BaridiMob transfers are manually verified and fulfilled through activation codes.
- `supabase/premium-codes.sql` defines premium subscriptions and redemption. Stripe is not currently integrated.

## Decisions needed before creating payment products

### Confirmed setup

- Automatic monthly renewal selected by the owner.
- Pro: 250 DZD/month, Price ID `price_1UZ7jk4Mzb2FMoC9REskIl6F`.
- STC: 700 DZD/month, Price ID `price_1UZ7k54Mzb2FMoC9htZNQwMR`.
- Owner reports a US Stripe account. Live charges/payouts and the supplied Prices' sandbox/live mode have not been independently verified.
- Price IDs are public identifiers. Actual amount, currency, recurring interval, active status and account/environment must be checked server-side before accepting payments.

1. Confirm the Stripe account country, verification status and whether live charges and payouts are enabled. Installing the plugin does not establish eligibility to receive payments.
2. Confirm whether card purchases renew automatically each month or purchase one month without renewal. Existing code-based purchases expire; automatic renewal is a new customer agreement and must be explicit.
3. Confirm the checkout currency and amounts supported by the actual merchant account, including Stripe minimum charges. Do not silently convert the displayed 250/700 DA prices or charge a different currency without showing it clearly.

## Recommended architecture

Use Stripe-hosted Checkout. For automatic monthly renewal, use Billing with Checkout Sessions in subscription mode. Create separate Products for Pro and STC and a monthly Price per Product. For a one-month nonrenewing purchase, use payment mode and activate a fixed entitlement after confirmed payment.

Add authenticated Supabase Edge Functions for creating Checkout Sessions and Customer Portal sessions. Verify the Supabase user token, derive user identity on the server and map the selected tier to a server-configured Price ID. Never accept an arbitrary amount, Price ID, Customer ID or user ID from the browser. Use fixed allowed redirect origins and idempotency keys.

Use a least-privilege restricted Stripe API key stored in Supabase secrets. Keep the webhook signing secret there too. Neither belongs in frontend code, Git, browser storage or chat. Start in an isolated Stripe sandbox. Keep live and sandbox credentials, Price IDs and webhook secrets separate.

## Confirm payment and synchronize access

Implement a public Stripe webhook endpoint that verifies the signature against the raw request body before parsing or modifying data. Store processed event IDs with a unique constraint. Make updates transactional and repeatable; tolerate retries and events arriving out of order by reconciling current Stripe state.

For subscriptions, handle checkout completion, paid invoices, failed invoices and subscription changes/deletion. Gate checkout fulfillment on confirmed payment and handle asynchronous payment success/failure if enabled. For risk handling, reconcile refunds and disputes and flag early fraud warnings for review rather than treating every warning as proof of fraud.

Keep a server-only mapping from Supabase users to Stripe Customers and subscription records. Store billing provider, tier, subscription status and paid-through time. Derive learning access from confirmed payment and entitlement policy, including cancellation at period end and any explicitly chosen grace period. Never grant access from a success-page URL or browser-supplied subscription status.

Preserve manual purchases and activation-code grants when Stripe subscriptions change: retain separate entitlement sources and calculate effective access. A Stripe cancellation must not delete separately purchased code access. Avoid duplicate subscriptions and define how upgrades, downgrades and overlapping grants behave before enabling plan changes.

## Invoicing and customer experience

Stripe Billing generates invoices for subscription cycles. Let users download paid invoices, update payment details and cancel through Stripe Customer Portal. Show upcoming renewal amount/date, cancellation status and failed-payment messages in EN and FR. Explain recurring billing before checkout. Retain BaridiMob as its existing manual alternative.

Tax: review the merchant's tax obligations and registrations before enabling Stripe Tax. Enable automatic tax only after the appropriate registrations are active; a switch alone does not establish tax collection obligations or coverage.

## Acceptance checks before release

- Successful payment activates the correct tier for the correct authenticated user.
- Declined, abandoned, unpaid and forged returns grant no access.
- Duplicate and out-of-order webhook deliveries do not duplicate or regress entitlements.
- Renewal, failed payment, recovery and cancellation update access correctly.
- Refund/dispute events follow the selected entitlement policy and produce an operational record.
- Manual/code access survives unrelated Stripe changes.
- Users cannot access another customer's portal or create arbitrary-priced checkouts.
- Secrets stay server-side; EN/FR checkout and account messaging is accurate on mobile.

## Implementation order

Confirm account readiness and billing model; configure sandbox products/prices; add server-only billing schema and functions; implement signed webhooks; connect the Visa and account buttons; run the acceptance checks; then configure live credentials and endpoints after account activation.

Official references: [Checkout subscriptions](https://docs.stripe.com/payments/checkout/build-subscriptions), [subscription webhooks](https://docs.stripe.com/billing/subscriptions/webhooks), [Customer Portal](https://docs.stripe.com/customer-management/integrate-customer-portal), [API keys](https://docs.stripe.com/keys), [Stripe availability](https://stripe.com/global).
