# ETHAN HUB v13.1 — 18 APPS — 80 files

All 29 PDF manuals and narration texts are preserved. Narration texts are consolidated in the existing JavaScript bundle. SQL sections below are separate setup/migration instructions; apply only when needed.

## README.md

# ETHAN HUB v13 — 18 apps

Includes all 18 existing services and games, including Ethan ERP, Ethan Wave Rush and ETHAN BATTLE ARENA. The dashboard count is calculated from the app registry. The release badge is v13.

Cards use readable descriptions, responsive columns and large Open buttons. Existing authentication and app destinations are preserved.

Deploy the contents of this ZIP to the existing Hub repository, with index.html at the deployment root, then redeploy hub.ethandigitalacademy.org. Uploading this ZIP here does not update the live domain.


## CREATOR-SETUP.txt

Ethan Creator is added to Hub's app list. Its URL has NOT been provided.

Before deployment, open index.html and replace:
  creatorUrl:'',
with your actual deployed HTTPS Creator address, for example:
  creatorUrl:'https://YOUR-REAL-CREATOR-DOMAIN',
Do not use the example as a real URL. Until configured, the Creator tile says URL needed and its Open button is disabled.

The existing Hub apps and authentication are unchanged. Upload the EXTRACTED files to the existing Hub repository, not the ZIP itself.


## WAVE-RUSH-DEPLOY.txt

Upload the CONTENTS of this folder to the root of your existing Ethan Hub GitHub repository and redeploy the existing Vercel project. Keep your existing environment variables and domain configuration. Wave Rush opens at https://hub.ethandigitalacademy.org/wave-rush/ after deployment. Includes all game assets; no separate game hosting or private preview login required. Hub authentication is preserved. The game path itself is a public static page, not independently protected by Ethan ID. Progress saves per browser.


## ERP-HUB-DEPLOY.md

# Hub with Ethan ERP

Upload all extracted files and folders to the GitHub repository serving Ethan Hub. Deploy the root folder as before.

The Ethan ERP card opens the included /erp/ app. Wave Rush remains at /wave-rush/. Existing apps and Hub authentication remain in place.

ERP v3 is browser-local and opens an administration preview. The Hub link does not create server-side ERP authentication or shared records. Do not treat Hub sign-in as protection for the direct /erp/ URL.

Records from app.ethandigitalacademy.org do not automatically appear on hub.ethandigitalacademy.org. Export an ERP JSON backup from the old origin, then restore it under Operations on the included ERP.


## BATTLE-ARENA-DEPLOY.md

# Battle Arena added to this uploaded Hub

The uploaded package contained 17 app registry entries. ETHAN BATTLE ARENA is entry 18. Existing app entries, bundled ERP, authentication and Wave Rush files are preserved.

Extract this ZIP, upload its contents to the existing Hub GitHub repository, and redeploy its Vercel project. Keep index.html and vercel.json at repository root. The Battle Arena card opens the included game at /games/battle-arena/. The game offline worker is restricted to that folder.

This package is prepared and checked. The live custom domain has not been changed from this session.


## erp/README.md

# Ethan Digital Academy ERP v3

See ERP-AUDIT-AND-SETUP.md for current features, installation, migration and limitations.

This is a browser-local administration workspace. It does not provide production multi-user authentication or shared records.


## erp/SUPABASE-SETUP.md

# Supabase Setup for ETHAN ERP & LMS v2

1. Create a Supabase project.
2. Open SQL Editor and run `schema.sql`.
3. Open `config.js`.
4. Add:
   - `supabaseUrl`
   - `supabasePublishableKey`
5. In Authentication > Providers, enable Email.
6. Configure your Site URL and allowed redirect URLs for your deployed domain.
7. In Storage, create the buckets you need for course files, assignments, avatars and certificates.
8. Do not place the Supabase service-role key in frontend files.

When credentials are present, the app can authenticate through Supabase. Without them, it stays in browser-local preview mode.

## Existing installation upgrade to v5
If you already ran `schema.sql`, do NOT rerun the whole schema. Run only:
`UPDATE-v5-PAYMENT-COURSE-GATING.sql`

This creates missing student/parent operational rows and locks modules/lessons to paid/allocated enrolments.


## erp/README-V12.8-DEEPENED.md

# ETHAN ERP & LMS v12.8 — Deepened Operations Pass

This pass focuses on professional information architecture and academy operations while preserving the compact v12.7 course library and backend integration files.

Key changes: grouped role-based navigation, Admin/Super Admin command centre, calculated payment metrics instead of a fixed demo amount, operational workflow, improved search routing, public catalogue placement fix, and responsive polish.


## erp/ERP-AUDIT-AND-SETUP.md

# Ethan Digital Academy ERP — Version 3

## What changed
- Payments link to a specific invoice. A receipt can no longer be counted against multiple invoices for the same learner/course. Verified receipts without an invoice remain unassigned; edit them to reconcile.
- Invoice status shows Paid, Part Paid, Unpaid or Overdue; printouts include verified receipts and outstanding balance. Overpayment against a linked invoice is blocked.
- Accepted applicants convert to learner records once, with duplicate-email protection. Conversion does not provision a login.
- Learner summaries show receipts, invoice balances, course allocations, attendance counts and published results.
- Mark a whole allocated class present, absent, late or excused. Repeated saves update the existing learner/course/date record.
- Class scheduling checks overlapping instructor or venue bookings.
- Deletion moves records to a recycle bin. Restore is available. Linked learner/course history and verified receipts are protected from deletion.
- Course Allocations allows active, paused, completed and cancelled status.
- Search matches linked learner/course names. Lists show 20 records per page.
- Dashboard shows active learners, verified receipts, outstanding balances, applications, today's classes and overdue invoices.
- Reports identify verified receipts awaiting invoice assignment.

## Existing functionality
Learner/course/staff records, admissions, assignments, assessment planning, results, certificates, announcements, attendance, timetable, payments, invoices, expenses, equipment, CSV exports, local activity history and JSON backup/restore.

## Run and upload
Extract this ZIP. Upload its contents to the GitHub repository root, with index.html at the root. This is a static site; no build command is required. For Vercel use Framework Preset: Other, no build command, Output Directory: .

## Data migration and backup
The same browser storage key is retained from v2. Export a JSON backup before replacing an existing deployment. Existing receipts are not automatically assigned to invoices. In Payment Records, edit each receipt and select the matching invoice. Legacy Confirmed statuses should be reviewed and changed to Verified by an administrator where appropriate. Invoices include only payments explicitly marked Verified and linked to that invoice.

Records belong to the browser and the website origin. A local file, GitHub Pages, Vercel and the private preview each have separate data stores. To transfer records between them, export then restore a backup. Clearing browser data removes local records, including the recycle bin.

## Scope and limitations
This build opens as an administration preview without academy sign-in. Do not expose this preview as a production multi-user system. New modules do not sync with Supabase merely by entering credentials. Shared records, secure authentication/roles and server authorization need backend integration.

Staff directory entries are personnel records, not accounts. Admissions conversion creates a local learner record. Email sending, payment gateways, automatic reconciliation, online quiz delivery/marking and public certificate verification are not connected. Certificates require a published score of at least 60%; completion eligibility still needs manual review. The activity history is local and not tamper-proof. Cash reports are operational summaries, not statutory accounts.

A verified payment can allocate a course even when the fee is partially paid; the learner is marked Part Paid. Admin decides whether to allocate access and can pause it under Course Allocations. Editing a receipt does not automatically revoke existing course access.

## Validation
Syntax checks passed. Automated JavaScript tests covered module rendering in a test harness, per-invoice reconciliation, overpayment rejection, repeated allocation, bulk-attendance updates, linked-record protection, application conversion, recycle/restore, timetable overlap, score bounds, certificate prerequisites, dashboard/report output and learner result filtering. A full visual browser/end-to-end check was not available in this environment.


## PREMIUM-PLAN-MIGRATION.sql

```sql
-- ETHAN HUB v5.0 — optional Free / Plus / Pro plan framework
-- Run once in the SAME Supabase project used by Ethan Hub.
-- This adds plan metadata only. It does NOT process payments.
alter table public.ethan_profiles
  add column if not exists plan text not null default 'free';

alter table public.ethan_profiles
  drop constraint if exists ethan_profiles_plan_check;
alter table public.ethan_profiles
  add constraint ethan_profiles_plan_check check (plan in ('free','plus','pro'));

-- Existing users remain on Free unless an authorised backend/admin process changes them.
update public.ethan_profiles set plan='free' where plan is null or plan not in ('free','plus','pro');

```

## erp/FIX-v9.3-SUPER-ADMIN-ROLE-SYNC.sql

```sql
-- Ethan ERP/LMS v9.3 Super Admin role verification
-- Run in Supabase SQL Editor.

-- 1. Confirm Authentication user and profile row match by UUID.
select
  u.id as auth_user_id,
  u.email as auth_email,
  p.id as profile_id,
  p.email as profile_email,
  p.role
from auth.users u
left join public.profiles p on p.id = u.id
where lower(u.email) = lower('fedora4jesus@gmail.com');

-- 2. Enforce the intended database role on the profile belonging to THIS auth user.
update public.profiles p
set role = 'super_admin',
    email = 'fedora4jesus@gmail.com'
from auth.users u
where p.id = u.id
  and lower(u.email) = lower('fedora4jesus@gmail.com');

-- 3. Verify.
select
  u.id as auth_user_id,
  u.email,
  p.id as profile_id,
  p.role
from auth.users u
join public.profiles p on p.id = u.id
where lower(u.email) = lower('fedora4jesus@gmail.com');

```

## erp/UPDATE-v5-PAYMENT-COURSE-GATING.sql

```sql
-- ETHAN ERP & LMS v5 migration
-- Run ONCE in Supabase SQL Editor after the original schema.sql has already been installed.

-- 1) Future student/parent registrations get the corresponding operational record automatically.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  selected_role public.app_role;
begin
  selected_role := case
    when coalesce(new.raw_user_meta_data->>'role','student') in ('student','parent')
      then (new.raw_user_meta_data->>'role')::public.app_role
    else 'student'::public.app_role
  end;

  insert into public.profiles(id,first_name,last_name,email,phone,role)
  values(
    new.id,
    coalesce(new.raw_user_meta_data->>'first_name',''),
    coalesce(new.raw_user_meta_data->>'last_name',''),
    new.email,
    coalesce(new.raw_user_meta_data->>'phone',''),
    selected_role
  )
  on conflict (id) do nothing;

  if selected_role = 'student' then
    insert into public.students(user_id,student_no,status)
    values(new.id, 'EDA-ST-' || upper(substr(replace(new.id::text,'-',''),1,8)), 'Pending Payment')
    on conflict (user_id) do nothing;
  elsif selected_role = 'parent' then
    insert into public.parents(user_id)
    values(new.id)
    on conflict (user_id) do nothing;
  end if;

  return new;
end;
$$;

-- 2) Backfill student operational records for users who registered before v5.
insert into public.students(user_id,student_no,status)
select p.id, 'EDA-ST-' || upper(substr(replace(p.id::text,'-',''),1,8)), 'Pending Payment'
from public.profiles p
where p.role='student'
and not exists (select 1 from public.students s where s.user_id=p.id);

-- 3) Backfill parent operational records.
insert into public.parents(user_id)
select p.id
from public.profiles p
where p.role='parent'
and not exists (select 1 from public.parents pr where pr.user_id=p.id);

-- 4) Learning structure is visible to staff or students enrolled in the relevant course.
drop policy if exists "published modules read" on public.modules;
create policy "allocated modules read" on public.modules for select using (
  public.is_staff()
  or exists (
    select 1 from public.enrolments e
    join public.students s on s.id=e.student_id
    where e.course_id=modules.course_id
      and e.status='active'
      and s.user_id=auth.uid()
  )
);

drop policy if exists "published lessons read" on public.lessons;
create policy "allocated lessons read" on public.lessons for select using (
  public.is_staff()
  or exists (
    select 1
    from public.modules m
    join public.enrolments e on e.course_id=m.course_id and e.status='active'
    join public.students s on s.id=e.student_id
    where m.id=lessons.module_id
      and s.user_id=auth.uid()
      and lessons.published=true
  )
);

-- 5) Course catalogue can remain visible, but enrolment is the authorization gate for lessons/videos.
-- Admin/Super Admin already have write access to payments and enrolments through the original RLS policies.

```

## erp/UPDATE-v6-STAFF-ACCESS.sql

```sql
-- ETHAN ERP & LMS v6 migration
-- Run ONCE after v5 migration.

-- Admin/Super Admin can read staff profiles through the existing profile policy.
-- This index improves staff filtering.
create index if not exists idx_profiles_role on public.profiles(role);

-- Instructors need to read course-instructor assignments involving themselves.
alter table public.course_instructors enable row level security;
drop policy if exists "course instructor assignments staff read" on public.course_instructors;
create policy "course instructor assignments staff read" on public.course_instructors
for select using (public.is_staff());

drop policy if exists "course instructor assignments admin write" on public.course_instructors;
create policy "course instructor assignments admin write" on public.course_instructors
for all using (public.is_admin()) with check (public.is_admin());

```
