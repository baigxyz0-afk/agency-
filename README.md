# Fieldstone Digital — Website

Full-stack development + SEO agency website. Next.js (App Router) + TypeScript +
Tailwind CSS, with Supabase for data (contact submissions, the directory,
and admin auth).

**Phase 1** — the marketing site: services, industries, work, case studies,
about, process, contact, resources, legal pages.

**Phase 2** — the worldwide agency directory (`/directory`) and the
invite-only admin dashboard (`/admin`) that manages it. Supabase is live
(schema applied, 7 real researched agencies imported as `unverified` — see
below). No agencies are fabricated; anything in the database was either
entered by a human or found via web research and clearly marked as such.

**Still needed**: a real admin email/password to create the first account —
see "Admin dashboard" below. Until that exists, `/admin` can't be signed into
(by design — no public sign-up), though the data underneath it is already live.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in real values, see below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

See `.env.example`. Nothing in the app requires these to run — the contact
form, the directory, and the admin login all detect a missing Supabase
connection and show an honest message instead of crashing or silently
failing. **`.env.local` is already filled in with a live Supabase project**
(schema applied via `scripts/run-schema.mjs`); if you're setting up a
different project instead:

1. Create a Supabase project.
2. `node --env-file=.env.local scripts/run-schema.mjs` — runs
   `supabase/schema.sql` then `supabase/phase2-directory-schema.sql` against
   `POSTGRES_URL_NON_POOLING` directly (or paste both files into the Supabase
   SQL editor by hand).
3. Set `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_SUPABASE_URL`,
   and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local` from your project's
   API settings (Settings → API).
4. Create your first admin account (there is no public sign-up form on
   purpose):
   ```bash
   node --env-file=.env.local scripts/create-admin.mjs you@example.com "a-strong-password"
   ```
   Then sign in at `/admin/login`. Add more admins the same way.

## Admin dashboard (`/admin`)

- **Agencies** — full CRUD, plus Verified/Featured/Sponsored flags. New
  agencies default to Unverified and are **not** publicly visible until
  marked Verified — that's the publish gate for the whole directory.
- **Import CSV** / **Export CSV** — bulk add agencies (template at
  `/agency-import-template.csv`) or download the current dataset.
  `supabase/researched-agencies-import.csv` has 7 real, currently-operating
  web dev/SEO agencies (one per supported country, confirmed live via browser
  as of this writing) ready to import — found via web research, not
  fabricated, so they land as `unverified` / `data_source: web research`
  until someone reviews and verifies each one.
- **Industries & Locations** — countries/regions/cities/industries are
  created automatically from what you type into the agency form or CSV; this
  page is just for cleanup (rename by re-adding, delete unused entries).

Auth is Supabase Auth, gated in `middleware.ts` and by an `admin_profiles`
table — a valid Supabase session alone isn't enough to reach the dashboard,
the user also has to be listed as an admin.

## Public directory (`/directory`)

`/directory/[industry]/[country]/[region]/[city]` — only pages with at least
one **verified** agency are indexable; thinner pages still render (with an
honest "no agencies listed yet" message) but are marked `noindex` so search
engines don't index empty pages. See `/disclaimer` for the published
methodology (verification, Featured vs. Sponsored labeling).

## Content

Marketing copy lives in typed TypeScript modules under `/content` (services,
industries, portfolio, case studies, process, site stats) rather than a CMS.
Directory data lives in Supabase instead, since it's meant to be edited at
runtime through the admin dashboard, not redeployed.

- `content/site-stats.ts` — trust-section numbers. Left `null` until you have
  real, verifiable figures — the homepage hides the stat grid entirely rather
  than showing a placeholder number.
- `content/portfolio.ts` / `content/case-studies.ts` — demo/sample entries
  only, clearly labeled. Replace with real client work (real results only) as
  it becomes available for public display.
- `content/resources.ts` — intentionally empty. No filler blog posts ship by
  default; add real, reviewed articles here.

## Brand

`lib/site-config.ts` is the single source of truth for the agency name,
domain, contact details, and navigation structure — update it there rather
than hunting through pages. The current name ("Fieldstone Digital") and
domain are placeholders pending a real brand/domain decision.

## Scripts

- `npm run dev` — start the dev server (Turbopack)
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — ESLint
- `node --env-file=.env.local scripts/create-admin.mjs <email> <password>` —
  create an admin account
- `node --env-file=.env.local scripts/run-schema.mjs` — apply both SQL
  schema files to whatever Postgres connection `POSTGRES_URL_NON_POOLING`
  points at
- `node --env-file=.env.local scripts/import-agencies-csv.mjs <path.csv>` —
  bulk-import agencies directly via the service role key (bypasses the admin
  web UI login — useful before a first admin account exists). Same CSV
  format as `/agency-import-template.csv`; everything lands `unverified`.
- `node --env-file=.env.local scripts/sync-industries.mjs` — inserts any of
  the 39 industries from `content/industries.ts` that don't yet exist in
  Supabase's `industries` table. The directory's DB-backed taxonomy
  (admin taxonomy page, search filters) only ever contains industries an
  agency has actually been tagged with — run this after a fresh schema setup
  or a CSV import that only touched a couple of industries, so filters and
  the taxonomy page reflect all 39, not just whichever ones happened to get
  created along the way.
