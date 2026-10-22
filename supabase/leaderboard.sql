-- Run once in the Supabase SQL Editor to enable shared rankings and four-day tournaments.
-- A student appears in rankings after completing at least one step and earning 10 career XP.

create table if not exists public.leaderboard_tournament_xp (
  user_id uuid not null references auth.users(id) on delete cascade,
  round_start timestamptz not null,
  stage_id text not null,
  xp integer not null check (xp > 0 and xp <= 100),
  created_at timestamptz not null default now(),
  primary key (user_id, round_start, stage_id)
);

alter table public.leaderboard_tournament_xp enable row level security;
revoke all on public.leaderboard_tournament_xp from anon, authenticated;

-- One successful course step can score once per student in each four-day round.
create or replace function public.record_tournament_step(p_stage_id text, p_xp integer)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user uuid := auth.uid();
  v_round_start timestamptz := pg_catalog.date_bin(
    interval '4 days', pg_catalog.now(), timestamptz '2026-01-01 00:00:00+01'
  );
begin
  if v_user is null then
    raise exception 'Sign in to join the tournament.' using errcode = '28000';
  end if;
  if p_stage_id is null or length(p_stage_id) > 160 or p_xp is null or p_xp < 1 or p_xp > 100 then
    raise exception 'Invalid course step.' using errcode = '22023';
  end if;
  if not exists (
    select 1 from public.learning_progress lp
    where lp.user_id = v_user and p_stage_id = any(lp.completed)
  ) then
    raise exception 'Complete the course step before scoring it.' using errcode = '42501';
  end if;
  insert into public.leaderboard_tournament_xp(user_id, round_start, stage_id, xp)
  values (v_user, v_round_start, p_stage_id, p_xp)
  on conflict (user_id, round_start, stage_id) do nothing;
end;
$$;

revoke all on function public.record_tournament_step(text, integer) from public, anon;
grant execute on function public.record_tournament_step(text, integer) to authenticated;

-- Only safe public profile fields and eligible users are exposed through this ranking RPC.
create or replace function public.get_leaderboard(p_period text default 'all')
returns table (
  user_id uuid,
  display_name text,
  username text,
  faculty text,
  avatar_url text,
  xp bigint,
  place bigint
)
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_round_start timestamptz := pg_catalog.date_bin(
    interval '4 days', pg_catalog.now(), timestamptz '2026-01-01 00:00:00+01'
  );
  v_week_start timestamptz := pg_catalog.date_trunc(
    'week', pg_catalog.timezone('Africa/Algiers', pg_catalog.now())
  ) at time zone 'Africa/Algiers';
  v_last_round timestamptz;
begin
  if p_period not in ('all', 'week', 'tournament', 'last_tournament') then
    raise exception 'Unknown leaderboard period.' using errcode = '22023';
  end if;

  if p_period = 'last_tournament' then
    select max(t.round_start) into v_last_round
    from public.leaderboard_tournament_xp t
    where t.round_start < v_round_start;
    if v_last_round is null then return; end if;
  end if;

  return query
  with scores as (
    select lp.user_id, lp.xp::bigint as score
    from public.learning_progress lp
    where p_period = 'all'
    union all
    select t.user_id, sum(t.xp)::bigint
    from public.leaderboard_tournament_xp t
    where p_period = 'week'
      and t.created_at >= v_week_start
      and t.created_at < v_week_start + interval '7 days'
    group by t.user_id
    union all
    select t.user_id, sum(t.xp)::bigint
    from public.leaderboard_tournament_xp t
    where p_period = 'tournament' and t.round_start = v_round_start
    group by t.user_id
    union all
    select t.user_id, sum(t.xp)::bigint
    from public.leaderboard_tournament_xp t
    where p_period = 'last_tournament' and t.round_start = v_last_round
    group by t.user_id
  ), eligible as (
    select s.user_id, p.display_name, p.username, p.faculty, p.avatar_url, s.score
    from scores s
    join public.learning_progress lp on lp.user_id = s.user_id
    join public.profiles p on p.id = s.user_id
    where lp.xp >= 10 and pg_catalog.cardinality(lp.completed) > 0
      and (p_period = 'all' or s.score > 0)
  ), ranked as (
    select e.*, pg_catalog.row_number() over (order by e.score desc, e.display_name asc) as rank_no
    from eligible e
  )
  select r.user_id, r.display_name, r.username, r.faculty, r.avatar_url,
         r.score, r.rank_no
  from ranked r
  order by r.score desc, r.display_name asc
  limit 100;
end;
$$;

revoke all on function public.get_leaderboard(text) from public;
grant execute on function public.get_leaderboard(text) to anon, authenticated;

create or replace function public.get_leaderboard_round_info()
returns table (round_start timestamptz, round_end timestamptz, last_round_start timestamptz)
language sql
stable
security definer
set search_path = ''
as $$
  with current_round as (
    select pg_catalog.date_bin(interval '4 days', pg_catalog.now(), timestamptz '2026-01-01 00:00:00+01') as starts_at
  )
  select c.starts_at, c.starts_at + interval '4 days',
         (select max(t.round_start) from public.leaderboard_tournament_xp t where t.round_start < c.starts_at)
  from current_round c;
$$;

revoke all on function public.get_leaderboard_round_info() from public;
grant execute on function public.get_leaderboard_round_info() to anon, authenticated;

-- Fetch all visible periods and the countdown in one request; clients refresh this snapshot periodically.
create or replace function public.get_leaderboard_snapshot()
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
  select pg_catalog.jsonb_build_object(
    'all', (select coalesce(pg_catalog.jsonb_agg(pg_catalog.to_jsonb(r) order by r.place), '[]'::jsonb) from public.get_leaderboard('all') r),
    'week', (select coalesce(pg_catalog.jsonb_agg(pg_catalog.to_jsonb(r) order by r.place), '[]'::jsonb) from public.get_leaderboard('week') r),
    'tournament', (select coalesce(pg_catalog.jsonb_agg(pg_catalog.to_jsonb(r) order by r.place), '[]'::jsonb) from public.get_leaderboard('tournament') r),
    'last_tournament', (select coalesce(pg_catalog.jsonb_agg(pg_catalog.to_jsonb(r) order by r.place), '[]'::jsonb) from public.get_leaderboard('last_tournament') r),
    'round_end', (select i.round_end from public.get_leaderboard_round_info() i)
  );
$$;

revoke all on function public.get_leaderboard_snapshot() from public;
grant execute on function public.get_leaderboard_snapshot() to anon, authenticated;

-- Reload the PostgREST schema cache so the new RPCs are available immediately.
notify pgrst, 'reload schema';
