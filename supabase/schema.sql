-- Phase 1 schema: contact form submissions + the sidebar quick-inquiry widget.
-- Run this in the Supabase SQL editor for your project.

create table if not exists contact_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  company text,
  website text,
  country text not null,
  industry text not null,
  service_required text not null,
  budget_range text not null,
  project_description text not null,
  timeline text not null
);

alter table contact_submissions enable row level security;

-- No public policies are created: only the service role key (used server-side
-- in app/actions/contact.ts) can write to this table. Read access for an
-- admin dashboard is part of Phase 2.

-- ---------------------------------------------------------------------------
-- Quick inquiry widget (the sidebar tab present on every marketing page).
-- Kept as its own table rather than reusing contact_submissions, since that
-- table's country/industry/service/budget/timeline columns are NOT NULL and
-- specific to the full /contact form — this is intentionally a shorter,
-- lower-friction form.
-- ---------------------------------------------------------------------------

create table if not exists quick_inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  message text not null,
  page_path text
);

alter table quick_inquiries enable row level security;

-- Same as contact_submissions: writes only via the service role key
-- (app/actions/quick-inquiry.ts), no public policies.
