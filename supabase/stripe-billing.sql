-- Run after premium-codes.sql. Keeps code purchases and Stripe access separate.
begin;
create table if not exists public.stripe_customers (
  user_id uuid not null references auth.users(id) on delete cascade,
  livemode boolean not null,
  customer_id text not null unique,
  primary key(user_id, livemode)
);
create table if not exists public.stripe_subscriptions (
  subscription_id text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  plan text not null check(plan in ('pro','stc')),
  status text not null,
  livemode boolean not null,
  paid_until timestamptz not null,
  observed_at timestamptz not null,
  risk_blocked boolean not null default false
);
create table if not exists public.stripe_webhook_events (
  event_id text primary key,
  event_type text not null,
  received_at timestamptz not null default now()
);
alter table public.stripe_customers enable row level security;
alter table public.stripe_subscriptions enable row level security;
alter table public.stripe_webhook_events enable row level security;
revoke all on public.stripe_customers, public.stripe_subscriptions, public.stripe_webhook_events from public, anon, authenticated;
grant all on public.stripe_customers, public.stripe_subscriptions, public.stripe_webhook_events to service_role;
grant select on public.stripe_subscriptions to authenticated;
drop policy if exists own_stripe_subscription on public.stripe_subscriptions;
create policy own_stripe_subscription on public.stripe_subscriptions for select to authenticated using (user_id = (select auth.uid()));

-- Sandbox payments never grant production premium access.
create or replace view public.effective_premium_subscriptions with (security_invoker = true) as
select distinct on (g.user_id) g.user_id, g.plan, g.expires_at from (
  select m.user_id, m.plan, m.expires_at from public.premium_subscriptions m where m.expires_at > now()
  union all
  select s.user_id, s.plan, s.paid_until from public.stripe_subscriptions s
    where s.livemode and not s.risk_blocked and s.paid_until > now()
) g order by g.user_id, (g.plan = 'stc') desc, g.expires_at desc;
grant select on public.effective_premium_subscriptions to authenticated, service_role;

create or replace function public.record_stripe_subscription(
  p_event text, p_type text, p_subscription text, p_user uuid, p_plan text,
  p_status text, p_live boolean, p_paid_until timestamptz, p_observed timestamptz, p_block boolean
) returns void language plpgsql security definer set search_path = '' as $$
begin
  insert into public.stripe_webhook_events(event_id,event_type) values(p_event,p_type) on conflict do nothing;
  if not found then return; end if;
  insert into public.stripe_subscriptions as s(subscription_id,user_id,plan,status,livemode,paid_until,observed_at,risk_blocked)
  values(p_subscription,p_user,p_plan,p_status,p_live,p_paid_until,p_observed,p_block)
  on conflict(subscription_id) do update set
    plan = case when excluded.observed_at >= s.observed_at then excluded.plan else s.plan end,
    status = case when excluded.observed_at >= s.observed_at then excluded.status else s.status end,
    paid_until = case when excluded.observed_at >= s.observed_at then excluded.paid_until else s.paid_until end,
    observed_at = greatest(s.observed_at,excluded.observed_at),
    risk_blocked = s.risk_blocked or excluded.risk_blocked;
end; $$;
revoke all on function public.record_stripe_subscription(text,text,text,uuid,text,text,boolean,timestamptz,timestamptz,boolean) from public,anon,authenticated;
grant execute on function public.record_stripe_subscription(text,text,text,uuid,text,text,boolean,timestamptz,timestamptz,boolean) to service_role;

-- Upgrade the existing energy function while retaining its deployed implementation.
do $$
declare v_definition text;
begin
  if to_regprocedure('public._apply_learning_energy(integer)') is not null then
    select pg_get_functiondef('public._apply_learning_energy(integer)'::regprocedure) into v_definition;
    execute replace(v_definition, 'public.premium_subscriptions', 'public.effective_premium_subscriptions');
  end if;
end; $$;
notify pgrst, 'reload schema';
commit;
