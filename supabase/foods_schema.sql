create extension if not exists pgcrypto;

create table if not exists public.foods (
	id uuid primary key default gen_random_uuid(),
	name text not null,
	description text not null,
	price integer not null check (price >= 0),
	image_url text not null,
	is_available boolean not null default true,
	created_at timestamptz not null default now()
);

alter table public.foods enable row level security;

drop policy if exists "Public can read foods" on public.foods;
drop policy if exists "Public can insert foods" on public.foods;
drop policy if exists "Public can update foods" on public.foods;
drop policy if exists "Public can delete foods" on public.foods;

create policy "Public can read foods"
on public.foods
for select
to anon, authenticated
using (true);

create policy "Public can insert foods"
on public.foods
for insert
to anon, authenticated
with check (true);

create policy "Public can update foods"
on public.foods
for update
to anon, authenticated
using (true)
with check (true);

create policy "Public can delete foods"
on public.foods
for delete
to anon, authenticated
using (true);
