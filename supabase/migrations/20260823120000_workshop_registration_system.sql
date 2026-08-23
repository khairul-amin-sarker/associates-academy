-- Workshop Registration System & Multi-Workshop Admin Management
-- Supports public anonymous registration with normalized mobile deduplication,
-- human-friendly registration codes (WS26-XXXX), UTM attribution tracking,
-- attendance & conversion tracking, and admin dashboard queries.

-- 1. Enhance workshops table with multi-workshop management fields
alter table public.workshops
  add column if not exists short_title text,
  add column if not exists status text not null default 'registration_open',
  add column if not exists timezone text not null default 'Asia/Dhaka',
  add column if not exists platform text not null default 'Google Meet',
  add column if not exists registration_enabled boolean not null default true,
  add column if not exists registration_opens_at timestamptz,
  add column if not exists registration_closes_at timestamptz,
  add column if not exists max_participants integer,
  add column if not exists related_course_id bigint references public.products(id) on delete set null,
  add column if not exists course_cta_url text;

-- Add check constraint for workshop status
do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'workshops_status_check'
  ) then
    alter table public.workshops
      add constraint workshops_status_check
      check (status in ('draft', 'registration_open', 'registration_closed', 'live', 'completed', 'cancelled'));
  end if;
end $$;

-- 2. Create sequence for human-friendly registration codes (e.g. WS26-0001)
create sequence if not exists public.workshop_reg_code_seq start 1;

-- Function to generate formatted registration code
create or replace function public.generate_workshop_registration_code()
returns text language plpgsql as $$
declare
  next_val bigint;
begin
  next_val := nextval('public.workshop_reg_code_seq');
  return 'WS26-' || lpad(next_val::text, 4, '0');
end;
$$;

-- 3. Create production workshop_registrations_v2 table
create table if not exists public.workshop_registrations_v2 (
  id bigint generated always as identity primary key,
  registration_code text not null unique,
  workshop_id bigint not null references public.workshops(id) on delete cascade,
  full_name text not null,
  mobile text not null,
  normalized_mobile text not null,
  email text not null,
  profession text not null,
  intent text not null,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  utm_audience text,
  referrer text,
  landing_page_url text,
  registration_status text not null default 'registered' check (registration_status in ('registered', 'confirmed', 'cancelled')),
  confirmation_status text not null default 'pending' check (confirmation_status in ('pending', 'sent', 'failed')),
  attendance_status text not null default 'unknown' check (attendance_status in ('unknown', 'attended', 'absent')),
  lead_status text not null default 'new' check (lead_status in ('new', 'interested', 'follow_up', 'converted')),
  course_conversion_status text not null default 'not_enrolled' check (course_conversion_status in ('not_enrolled', 'interested', 'enrolled')),
  registered_at timestamptz not null default now(),
  confirmed_at timestamptz,
  attended_at timestamptz,
  converted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint workshop_registrations_v2_unique_mobile unique (workshop_id, normalized_mobile)
);

-- 4. Indexes for fast admin queries, searching, and analytics rollups
create index if not exists idx_workshop_registrations_v2_workshop_id
  on public.workshop_registrations_v2(workshop_id, registered_at desc);

create index if not exists idx_workshop_registrations_v2_normalized_mobile
  on public.workshop_registrations_v2(normalized_mobile);

create index if not exists idx_workshop_registrations_v2_email
  on public.workshop_registrations_v2(email);

create index if not exists idx_workshop_registrations_v2_utm_audience
  on public.workshop_registrations_v2(utm_audience);

create index if not exists idx_workshop_registrations_v2_attendance
  on public.workshop_registrations_v2(attendance_status);

create index if not exists idx_workshop_registrations_v2_lead_status
  on public.workshop_registrations_v2(lead_status);

create index if not exists idx_workshop_registrations_v2_course_conversion
  on public.workshop_registrations_v2(course_conversion_status);

-- 5. Seed / update the active workshop row
insert into public.workshops (
  slug,
  title,
  short_title,
  description,
  starts_at,
  ends_at,
  platform,
  meet_url,
  is_published,
  status,
  registration_enabled
) values (
  'paper-return-to-e-return-2026-08-26',
  'Paper Return থেকে NBR E-Return — Complete Return Preparation বুঝুন হাতে-কলমে',
  'Paper Return to NBR E-Return Live Workshop',
  'নিজের Income Tax Return নিজে বুঝে করতে চান অথবা Client-এর Return professionally prepare করেন—একটি practical example-এর মাধ্যমে Documents থেকে Final Submission পর্যন্ত পুরো Return Preparation Process বুঝুন।',
  '2026-08-26T21:00:00+06:00',
  '2026-08-26T22:30:00+06:00',
  'Google Meet',
  'https://meet.google.com/private-workshop-session',
  true,
  'registration_open',
  true
)
on conflict (slug) do update set
  title = excluded.title,
  short_title = coalesce(public.workshops.short_title, excluded.short_title),
  description = excluded.description,
  starts_at = excluded.starts_at,
  ends_at = excluded.ends_at,
  platform = excluded.platform,
  is_published = excluded.is_published,
  status = excluded.status,
  registration_enabled = excluded.registration_enabled;

-- Also support lookup for secondary slug 'paper-return-to-e-return-live-workshop' if queried
insert into public.workshops (
  slug,
  title,
  short_title,
  description,
  starts_at,
  ends_at,
  platform,
  meet_url,
  is_published,
  status,
  registration_enabled
) values (
  'paper-return-to-e-return-live-workshop',
  'Paper Return থেকে NBR E-Return — Complete Return Preparation বুঝুন হাতে-কলমে',
  'Paper Return to NBR E-Return Live Workshop',
  'নিজের Income Tax Return নিজে বুঝে করতে চান অথবা Client-এর Return professionally prepare করেন—একটি practical example-এর মাধ্যমে Documents থেকে Final Submission পর্যন্ত পুরো Return Preparation Process বুঝুন।',
  '2026-08-26T21:00:00+06:00',
  '2026-08-26T22:30:00+06:00',
  'Google Meet',
  'https://meet.google.com/private-workshop-session',
  true,
  'registration_open',
  true
)
on conflict (slug) do nothing;

-- 6. Enable RLS on workshop_registrations_v2
alter table public.workshop_registrations_v2 enable row level security;

-- 7. Grant permissions
grant select on public.workshops to anon, authenticated;
grant insert on public.workshop_registrations_v2 to anon, authenticated;
grant usage, select on sequence public.workshop_reg_code_seq to anon, authenticated, service_role;
grant all on public.workshops, public.workshop_registrations_v2 to service_role;

-- 8. Policies
-- Public can insert registrations
drop policy if exists workshop_registrations_v2_anon_insert on public.workshop_registrations_v2;
create policy workshop_registrations_v2_anon_insert
  on public.workshop_registrations_v2
  for insert
  to anon, authenticated
  with check (true);

-- Staff (admin / owner) can select and update registrations
drop policy if exists workshop_registrations_v2_staff_manage on public.workshop_registrations_v2;
create policy workshop_registrations_v2_staff_manage
  on public.workshop_registrations_v2
  for all
  to authenticated
  using (
    exists (
      select 1 from public.user_roles
      where user_roles.user_id = auth.uid()
      and user_roles.role in ('admin', 'owner')
    )
  )
  with check (
    exists (
      select 1 from public.user_roles
      where user_roles.user_id = auth.uid()
      and user_roles.role in ('admin', 'owner')
    )
  );

-- Staff can update workshops
drop policy if exists workshops_staff_manage_v2 on public.workshops;
create policy workshops_staff_manage_v2
  on public.workshops
  for all
  to authenticated
  using (
    exists (
      select 1 from public.user_roles
      where user_roles.user_id = auth.uid()
      and user_roles.role in ('admin', 'owner')
    )
  )
  with check (
    exists (
      select 1 from public.user_roles
      where user_roles.user_id = auth.uid()
      and user_roles.role in ('admin', 'owner')
    )
  );
