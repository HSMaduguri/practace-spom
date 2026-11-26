-- 1. User profiles table (1:1 with auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null check (char_length(email) <= 254),
  display_name text not null default '' check (char_length(display_name) <= 120),
  photo_url text not null default '' check (char_length(photo_url) <= 2048),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. User progress buckets ('practice', 'flashcards', 'notes')
create table if not exists public.user_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  section text not null check (section in ('practice', 'flashcards', 'notes')),
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (user_id, section)
);

-- 3. Server-side timestamp enforcement (immutable created_at, atomic updated_at)
create or replace function public.enforce_profile_timestamps()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  if tg_op = 'INSERT' then
    new.created_at := now();
    new.updated_at := now();
  elsif tg_op = 'UPDATE' then
    new.created_at := old.created_at;
    new.updated_at := now();
  end if;
  return new;
end;
$$;

create or replace trigger trg_profiles_timestamps
  before insert or update on public.profiles
  for each row execute function public.enforce_profile_timestamps();

create or replace function public.enforce_progress_timestamps()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create or replace trigger trg_user_progress_timestamps
  before insert or update on public.user_progress
  for each row execute function public.enforce_progress_timestamps();

-- 4. Explicit Data API grants (no DELETE, no anon access)
revoke all on table public.profiles from anon, authenticated;
revoke all on table public.user_progress from anon, authenticated;
grant usage on schema public to authenticated;
grant select, insert, update on table public.profiles to authenticated;
grant select, insert, update on table public.user_progress to authenticated;

-- 5. Enable Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.user_progress enable row level security;

-- 6. Strict ownership RLS policies using cached (select auth.uid())
create policy "profiles_select_own"
  on public.profiles for select
  to authenticated
  using ((select auth.uid()) = id);

create policy "profiles_insert_own"
  on public.profiles for insert
  to authenticated
  with check ((select auth.uid()) = id);

create policy "profiles_update_own"
  on public.profiles for update
  to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

create policy "user_progress_select_own"
  on public.user_progress for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "user_progress_insert_own"
  on public.user_progress for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "user_progress_update_own"
  on public.user_progress for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

-- 7. Enable Realtime postgres_changes on user_progress (respects RLS)
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'user_progress'
  ) then
    alter publication supabase_realtime add table public.user_progress;
  end if;
end $$;
