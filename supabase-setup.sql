-- ============================================================
-- NIX App – Supabase SQL Setup
-- Führe dieses Script im Supabase SQL Editor aus
-- (Dashboard → SQL Editor → New Query → Run)
-- ============================================================

-- 1. QUEUE: Wartende User
create table if not exists public.queue (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  matched     boolean not null default false,
  created_at  timestamptz not null default now()
);

-- 2. CHATS: Verbundene Paare
create table if not exists public.chats (
  id          uuid primary key default gen_random_uuid(),
  user_a      uuid not null references auth.users(id) on delete cascade,
  user_b      uuid not null references auth.users(id) on delete cascade,
  created_at  timestamptz not null default now()
);

-- 3. MESSAGES: Nachrichten (werden mit dem Chat gelöscht)
create table if not exists public.messages (
  id          uuid primary key default gen_random_uuid(),
  chat_id     uuid not null references public.chats(id) on delete cascade,
  sender_id   uuid not null references auth.users(id) on delete cascade,
  content     text not null check (char_length(content) <= 1000),
  created_at  timestamptz not null default now()
);

-- ============================================================
-- Row Level Security (RLS)
-- ============================================================

alter table public.queue    enable row level security;
alter table public.chats    enable row level security;
alter table public.messages enable row level security;

-- QUEUE policies
create policy "Jeder eingeloggte User darf die Queue lesen"
  on public.queue for select
  using (auth.uid() is not null);

create policy "User darf sich selbst in die Queue eintragen"
  on public.queue for insert
  with check (auth.uid() = user_id);

create policy "User darf seinen eigenen Queue-Eintrag updaten"
  on public.queue for update
  using (auth.uid() = user_id);

create policy "User darf seinen eigenen Queue-Eintrag löschen"
  on public.queue for delete
  using (auth.uid() = user_id);

-- Sonderfall: Matcher darf matched=true setzen für andere
create policy "Matcher darf fremde Einträge als matched markieren"
  on public.queue for update
  using (auth.uid() is not null);

-- CHATS policies
create policy "Beteiligte User dürfen den Chat sehen"
  on public.chats for select
  using (auth.uid() = user_a or auth.uid() = user_b);

create policy "Eingeloggter User darf Chat erstellen"
  on public.chats for insert
  with check (auth.uid() = user_a);

create policy "Beteiligte User dürfen den Chat löschen"
  on public.chats for delete
  using (auth.uid() = user_a or auth.uid() = user_b);

-- MESSAGES policies
create policy "Beteiligte dürfen Nachrichten lesen"
  on public.messages for select
  using (
    exists (
      select 1 from public.chats
      where id = chat_id
        and (user_a = auth.uid() or user_b = auth.uid())
    )
  );

create policy "Beteiligte dürfen Nachrichten schreiben"
  on public.messages for insert
  with check (
    auth.uid() = sender_id
    and exists (
      select 1 from public.chats
      where id = chat_id
        and (user_a = auth.uid() or user_b = auth.uid())
    )
  );

-- ============================================================
-- Realtime aktivieren
-- ============================================================

alter publication supabase_realtime add table public.chats;
alter publication supabase_realtime add table public.messages;
alter publication supabase_realtime add table public.queue;
