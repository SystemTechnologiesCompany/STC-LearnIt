-- STC LearnIt account profile table. Run in Supabase SQL Editor.
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  public_id text not null unique default ('STC-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 6))),
  username text not null default ('student_' || lower(substr(replace(gen_random_uuid()::text, '-', ''), 1, 8))) check (username ~ '^[a-zA-Z0-9._]{3,30}$'),
  display_name text not null default 'STC Learner' check (char_length(display_name) between 1 and 32),
  faculty text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists profiles_by_faculty on public.profiles(faculty);
create unique index if not exists profiles_username_unique_ci on public.profiles (lower(username));

alter table public.profiles enable row level security;
grant select on public.profiles to authenticated;
grant insert (id, username, display_name, faculty, avatar_url) on public.profiles to authenticated;
grant update (username, display_name, faculty, avatar_url, updated_at) on public.profiles to authenticated;

drop policy if exists "Signed-in students can view profiles" on public.profiles;
create policy "Signed-in students can view profiles"
  on public.profiles for select to authenticated using (true);

drop policy if exists "Students can update their own profile" on public.profiles;
create policy "Students can update their own profile"
  on public.profiles for update to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

drop policy if exists "Students can create their own profile" on public.profiles;
create policy "Students can create their own profile"
  on public.profiles for insert to authenticated
  with check (auth.uid() = id);

create or replace function public.create_student_profile()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(nullif(trim(new.raw_user_meta_data ->> 'display_name'), ''), 'STC Learner'))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_profile on auth.users;
create trigger on_auth_user_created_profile
  after insert on auth.users
  for each row execute procedure public.create_student_profile();

-- Follow graph used by the student directory and profile counters.
create table if not exists public.follows (
  follower_id uuid not null references public.profiles(id) on delete cascade,
  following_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (follower_id, following_id),
  constraint follows_no_self_follow check (follower_id <> following_id)
);

create index if not exists follows_by_following_id on public.follows(following_id);
alter table public.follows enable row level security;
grant select, insert, delete on public.follows to authenticated;

drop policy if exists "Students can view their own follows" on public.follows;
create policy "Students can view their own follows"
  on public.follows for select to authenticated
  using (auth.uid() = follower_id or auth.uid() = following_id);

drop policy if exists "Students can follow other students" on public.follows;
create policy "Students can follow other students"
  on public.follows for insert to authenticated
  with check (auth.uid() = follower_id and follower_id <> following_id);

drop policy if exists "Students can unfollow from their account" on public.follows;
create policy "Students can unfollow from their account"
  on public.follows for delete to authenticated
  using (auth.uid() = follower_id);

-- Public avatars are readable by classmates; each student can manage only their own folder.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('stc-avatars', 'stc-avatars', true, 1572864, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Anyone can view STC avatars" on storage.objects;
create policy "Anyone can view STC avatars"
  on storage.objects for select to public
  using (bucket_id = 'stc-avatars');

drop policy if exists "Students can upload their own STC avatar" on storage.objects;
create policy "Students can upload their own STC avatar"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'stc-avatars' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "Students can update their own STC avatar" on storage.objects;
create policy "Students can update their own STC avatar"
  on storage.objects for update to authenticated
  using (bucket_id = 'stc-avatars' and (storage.foldername(name))[1] = auth.uid()::text)
  with check (bucket_id = 'stc-avatars' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "Students can delete their own STC avatar" on storage.objects;
create policy "Students can delete their own STC avatar"
  on storage.objects for delete to authenticated
  using (bucket_id = 'stc-avatars' and (storage.foldername(name))[1] = auth.uid()::text);
