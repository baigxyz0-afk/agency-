-- Phase 2: worldwide directory + admin dashboard.
-- Run this in the Supabase SQL editor for your project (after schema.sql).
--
-- Relationships: country -> region -> city; industry <-> agencies (many-to-many);
-- agency -> city. Services on an agency are free-form tags, not a controlled
-- taxonomy, so they live directly on the agency row as a text array.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Locations
-- ---------------------------------------------------------------------------

create table if not exists countries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique
);

create table if not exists regions (
  id uuid primary key default gen_random_uuid(),
  country_id uuid not null references countries(id) on delete cascade,
  name text not null,
  slug text not null,
  unique (country_id, slug)
);

create table if not exists cities (
  id uuid primary key default gen_random_uuid(),
  region_id uuid not null references regions(id) on delete cascade,
  name text not null,
  slug text not null,
  unique (region_id, slug)
);

-- ---------------------------------------------------------------------------
-- Industries
-- ---------------------------------------------------------------------------

create table if not exists industries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique
);

-- ---------------------------------------------------------------------------
-- Agencies
-- ---------------------------------------------------------------------------

create table if not exists agencies (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  name text not null,
  slug text not null unique,
  website text,
  description text,
  city_id uuid references cities(id) on delete set null,
  services text[] not null default '{}',
  founded_year int,
  team_size text,
  rating numeric(2, 1),
  review_count int not null default 0,
  verification_status text not null default 'unverified'
    check (verification_status in ('unverified', 'pending', 'verified')),
  is_featured boolean not null default false,
  is_sponsored boolean not null default false,
  data_source text,
  last_verified_at timestamptz
);

create table if not exists agency_industries (
  agency_id uuid not null references agencies(id) on delete cascade,
  industry_id uuid not null references industries(id) on delete cascade,
  primary key (agency_id, industry_id)
);

create index if not exists idx_agencies_city on agencies(city_id);
create index if not exists idx_agencies_verification on agencies(verification_status);
create index if not exists idx_agency_industries_industry on agency_industries(industry_id);

-- ---------------------------------------------------------------------------
-- Admin accounts
-- ---------------------------------------------------------------------------
-- One row per admin user, referencing a Supabase Auth user by id. There is no
-- public sign-up flow in the app; rows here are created manually (Supabase
-- dashboard or scripts/create-admin.mjs) by someone who already has project
-- access, which is what makes the dashboard invite-only.

create table if not exists admin_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  role text not null default 'admin' check (role in ('admin')),
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
-- Admin writes go through Server Actions using the service role key, which
-- bypasses RLS entirely — so no write policies are defined here. Public
-- (anon) reads are allowed only for the directory-facing tables, and only
-- for verified agencies.

alter table countries enable row level security;
alter table regions enable row level security;
alter table cities enable row level security;
alter table industries enable row level security;
alter table agencies enable row level security;
alter table agency_industries enable row level security;
alter table admin_profiles enable row level security;

create policy "Public read countries" on countries for select using (true);
create policy "Public read regions" on regions for select using (true);
create policy "Public read cities" on cities for select using (true);
create policy "Public read industries" on industries for select using (true);

create policy "Public read verified agencies" on agencies
  for select using (verification_status = 'verified');

create policy "Public read agency_industries for verified agencies" on agency_industries
  for select using (
    exists (
      select 1 from agencies
      where agencies.id = agency_industries.agency_id
        and agencies.verification_status = 'verified'
    )
  );

-- Authenticated users may read only their own admin_profiles row — this is
-- what lets middleware confirm "is this logged-in user actually an admin"
-- without needing the service role key on every request. It does not let
-- anyone read or enumerate other admins.
create policy "Users can read their own admin profile" on admin_profiles
  for select using (auth.uid() = id);
