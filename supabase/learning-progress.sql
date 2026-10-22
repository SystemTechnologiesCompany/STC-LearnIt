-- Run once in Supabase SQL Editor to sync lesson progress across devices.
create table if not exists public.learning_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  completed text[] not null default '{}',
  xp integer not null default 0 check (xp >= 0),
  streak integer not null default 0 check (streak >= 0),
  last_active date,
  today_xp integer not null default 0 check (today_xp >= 0),
  goal_date date,
  updated_at timestamptz not null default now()
);

alter table public.learning_progress enable row level security;
grant select on public.learning_progress to authenticated;
grant insert, update on public.learning_progress to authenticated;

drop policy if exists "Students can view their own learning progress" on public.learning_progress;
create policy "Students can view their own learning progress"
  on public.learning_progress for select to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Students can insert their own learning progress" on public.learning_progress;
create policy "Students can insert their own learning progress"
  on public.learning_progress for insert to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Students can update their own learning progress" on public.learning_progress;
create policy "Students can update their own learning progress"
  on public.learning_progress for update to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Merge completed steps atomically so simultaneous devices don't overwrite one another.
create or replace function public.merge_learning_progress(
  p_completed text[],
  p_xp integer,
  p_streak integer,
  p_last_active date,
  p_today_xp integer,
  p_goal_date date
)
returns void
language plpgsql
security invoker
set search_path = ''
as $$
declare
  current_user_id uuid := auth.uid();
begin
  if current_user_id is null then
    raise exception 'Sign in to sync learning progress.' using errcode = '28000';
  end if;
  if coalesce(cardinality(p_completed), 0) > 10000
     or coalesce(p_xp, 0) < 0
     or coalesce(p_streak, 0) < 0
     or coalesce(p_today_xp, 0) < 0 then
    raise exception 'Invalid learning progress.' using errcode = '22023';
  end if;

  insert into public.learning_progress as existing (
    user_id, completed, xp, streak, last_active, today_xp, goal_date, updated_at
  ) values (
    current_user_id, coalesce(p_completed, '{}'), coalesce(p_xp, 0),
    coalesce(p_streak, 0), p_last_active, coalesce(p_today_xp, 0), p_goal_date, now()
  )
  on conflict (user_id) do update set
    completed = (
      select coalesce(array_agg(distinct item order by item), '{}')
      from unnest(existing.completed || excluded.completed) as items(item)
    ),
    xp = greatest(existing.xp, excluded.xp),
    streak = case
      when existing.last_active is null or excluded.last_active > existing.last_active then excluded.streak
      when excluded.last_active is null or excluded.last_active < existing.last_active then existing.streak
      else greatest(existing.streak, excluded.streak)
    end,
    last_active = greatest(existing.last_active, excluded.last_active),
    today_xp = case
      when existing.goal_date is null or excluded.goal_date > existing.goal_date then excluded.today_xp
      when excluded.goal_date is null or excluded.goal_date < existing.goal_date then existing.today_xp
      else greatest(existing.today_xp, excluded.today_xp)
    end,
    goal_date = greatest(existing.goal_date, excluded.goal_date),
    updated_at = now();
end;
$$;

revoke all on function public.merge_learning_progress(text[], integer, integer, date, integer, date) from public, anon;
grant execute on function public.merge_learning_progress(text[], integer, integer, date, integer, date) to authenticated;
