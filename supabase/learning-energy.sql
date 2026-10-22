-- Run once in Supabase SQL Editor to enable account-synced learning energy.
-- Energy starts at 20; starting a level spends 3, and 1 energy regenerates every 5 minutes.

alter table public.learning_progress
  add column if not exists energy integer not null default 20 check (energy between 0 and 20),
  add column if not exists energy_updated_at timestamptz not null default now();

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

  v_ticks := pg_catalog.floor(greatest(
    pg_catalog.date_part('epoch', v_now - v_updated_at), 0
  ) / 300)::integer;
  if v_ticks > 0 then
    v_energy := least(20, v_energy + v_ticks);
    if v_energy >= 20 then
      v_updated_at := v_now;
    else
      v_updated_at := v_updated_at + (v_ticks * interval '5 minutes');
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

create or replace function public.get_learning_energy()
returns table (energy integer, energy_updated_at timestamptz, spent boolean)
language sql
security definer
set search_path = ''
as $$
  select * from public._apply_learning_energy(0);
$$;

create or replace function public.spend_learning_energy()
returns table (energy integer, energy_updated_at timestamptz, spent boolean)
language sql
security definer
set search_path = ''
as $$
  select * from public._apply_learning_energy(3);
$$;

revoke all on function public.get_learning_energy() from public, anon;
revoke all on function public.spend_learning_energy() from public, anon;
grant execute on function public.get_learning_energy() to authenticated;
grant execute on function public.spend_learning_energy() to authenticated;

notify pgrst, 'reload schema';
