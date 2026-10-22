-- STC Learnit one-time activation codes and one-month memberships.
-- Run once in the Supabase SQL Editor before deploying redeem-premium-code.

create table if not exists public.premium_codes (
  id uuid primary key default gen_random_uuid(),
  code_hash text not null unique check (code_hash ~ '^[0-9a-f]{64}$'),
  plan text not null check (plan in ('pro', 'stc')),
  active boolean not null default true,
  valid_until timestamptz,
  redeemed_by uuid references auth.users(id) on delete set null,
  redeemed_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.premium_subscriptions (
  user_id uuid primary key references auth.users(id) on delete cascade,
  plan text not null check (plan in ('pro', 'stc')),
  starts_at timestamptz not null default now(),
  expires_at timestamptz not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.premium_code_attempts (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  attempted_at timestamptz not null default now(),
  succeeded boolean not null default false
);
create index if not exists premium_code_attempts_recent
  on public.premium_code_attempts(user_id, attempted_at desc)
  where succeeded = false;

alter table public.premium_codes enable row level security;
alter table public.premium_subscriptions enable row level security;
alter table public.premium_code_attempts enable row level security;

revoke all on public.premium_codes, public.premium_subscriptions, public.premium_code_attempts from public, anon, authenticated;
grant select on public.premium_subscriptions to authenticated;
grant all on public.premium_codes, public.premium_subscriptions, public.premium_code_attempts to service_role;

drop policy if exists "Students can read their own premium subscription" on public.premium_subscriptions;
create policy "Students can read their own premium subscription"
  on public.premium_subscriptions for select to authenticated
  using (user_id = (select auth.uid()));

create or replace function public.redeem_premium_code(p_code_hash text)
returns table (activated boolean, plan text, expires_at timestamptz, reason text)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user uuid := auth.uid();
  v_code_id uuid;
  v_plan text;
  v_expiry timestamptz;
  v_attempts integer;
begin
  if v_user is null then
    return query select false, null::text, null::timestamptz, 'SIGN_IN_REQUIRED'::text;
    return;
  end if;

  if p_code_hash is null or p_code_hash !~ '^[0-9a-f]{64}$' then
    return query select false, null::text, null::timestamptz, 'INVALID_CODE'::text;
    return;
  end if;

  select count(*)::integer into v_attempts
  from public.premium_code_attempts a
  where a.user_id = v_user
    and a.succeeded = false
    and a.attempted_at > pg_catalog.now() - interval '10 minutes';
  if v_attempts >= 8 then
    return query select false, null::text, null::timestamptz, 'RATE_LIMITED'::text;
    return;
  end if;

  select c.id, c.plan into v_code_id, v_plan
  from public.premium_codes c
  where c.code_hash = p_code_hash
    and c.active
    and c.redeemed_at is null
    and (c.valid_until is null or c.valid_until > pg_catalog.now())
  for update skip locked;

  if v_code_id is null then
    insert into public.premium_code_attempts(user_id, succeeded) values (v_user, false);
    return query select false, null::text, null::timestamptz, 'INVALID_CODE'::text;
    return;
  end if;

  update public.premium_codes
  set redeemed_by = v_user, redeemed_at = pg_catalog.now()
  where id = v_code_id;

  insert into public.premium_subscriptions as current_subscription(user_id, plan, starts_at, expires_at, updated_at)
  values (v_user, v_plan, pg_catalog.now(), pg_catalog.now() + interval '1 month', pg_catalog.now())
  on conflict (user_id) do update
    set plan = excluded.plan,
        starts_at = case
          when current_subscription.expires_at > pg_catalog.now()
            then current_subscription.starts_at
          else pg_catalog.now()
        end,
        expires_at = greatest(current_subscription.expires_at, pg_catalog.now()) + interval '1 month',
        updated_at = pg_catalog.now()
  returning current_subscription.expires_at into v_expiry;

  insert into public.premium_code_attempts(user_id, succeeded) values (v_user, true);
  return query select true, v_plan, v_expiry, null::text;
end;
$$;

revoke all on function public.redeem_premium_code(text) from public, anon;
grant execute on function public.redeem_premium_code(text) to authenticated;
notify pgrst, 'reload schema';
