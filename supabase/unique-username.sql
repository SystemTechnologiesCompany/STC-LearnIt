-- Run this once in Supabase SQL Editor to add unique student usernames.
alter table public.profiles
  add column if not exists username text;

-- Give existing accounts a distinct starter handle that they can later edit.
update public.profiles
set username = 'student_' || lower(substr(replace(id::text, '-', ''), 1, 8))
where username is null or btrim(username) = '';

alter table public.profiles
  alter column username set default ('student_' || lower(substr(replace(gen_random_uuid()::text, '-', ''), 1, 8))),
  alter column username set not null;

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'profiles_username_format'
      and conrelid = 'public.profiles'::regclass
  ) then
    alter table public.profiles
      add constraint profiles_username_format
      check (username ~ '^[a-zA-Z0-9._]{3,30}$');
  end if;
end;
$$;

create unique index if not exists profiles_username_unique_ci
  on public.profiles (lower(username));

grant insert (id, username, display_name, faculty, avatar_url) on public.profiles to authenticated;
grant update (username, display_name, faculty, avatar_url, updated_at) on public.profiles to authenticated;
