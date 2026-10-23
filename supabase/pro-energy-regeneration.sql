-- Run once in the Supabase SQL Editor to enable faster energy recovery for Pro.
-- Basic: 1 energy per 5 minutes. Pro: 1 energy per 2 minutes 30 seconds.
-- STC: unlimited energy.

create or replace function public._apply_learning_energy(p_cost integer)
returns table (energy integer, energy_updated_at timestamptz, spent boolean)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user uuid := auth.uid();
  v_energy integer;
  v_updated_at timestamptz;
  v_now timestamptz := pg_catalog.clock_timestamp();
  v_ticks integer;
  v_spent boolean;
  v_unlimited boolean;
  v_pro boolean;
  v_regen_seconds integer := 300;
begin
  if v_user is null then
    raise exception 'Sign in to sync energy.' using errcode = '28000';
  end if;
  if p_cost not in (0, 3) then
    raise exception 'Invalid energy cost.' using errcode = '22023';
  end if;

  insert into public.learning_progress (user_id)
  values (v_user)
  on conflict (user_id) do nothing;

  select lp.energy, lp.energy_updated_at
    into v_energy, v_updated_at
  from public.learning_progress lp
  where lp.user_id = v_user
  for update;

  select exists (
    select 1
    from public.premium_subscriptions ps
    where ps.user_id = v_user
      and ps.plan = 'stc'
      and ps.expires_at > v_now
  ) into v_unlimited;

  select exists (
    select 1
    from public.premium_subscriptions ps
    where ps.user_id = v_user
      and ps.plan = 'pro'
      and ps.expires_at > v_now
  ) into v_pro;

  if v_unlimited then
    update public.learning_progress lp
    set energy = 20, energy_updated_at = v_now
    where lp.user_id = v_user;
    return query select 20, v_now, true;
    return;
  end if;

  if v_pro then
    v_regen_seconds := 150;
  end if;

  v_ticks := pg_catalog.floor(pg_catalog.greatest(
    pg_catalog.date_part('epoch', v_now - v_updated_at), 0
  ) / v_regen_seconds)::integer;
  if v_ticks > 0 then
    v_energy := pg_catalog.least(20, v_energy + v_ticks);
    if v_energy >= 20 then
      v_updated_at := v_now;
    else
      v_updated_at := v_updated_at + (v_ticks * v_regen_seconds * interval '1 second');
    end if;
  end if;

  if p_cost > 0 and v_energy >= 20 then
    v_updated_at := v_now;
  end if;
  v_spent := p_cost = 0 or v_energy >= p_cost;
  if v_spent and p_cost > 0 then
    v_energy := v_energy - p_cost;
  end if;

  update public.learning_progress lp
  set energy = v_energy, energy_updated_at = v_updated_at
  where lp.user_id = v_user;

  return query select v_energy, v_updated_at, v_spent;
end;
$$;

revoke all on function public._apply_learning_energy(integer) from public, anon, authenticated;
notify pgrst, 'reload schema';
