-- Associates Academy standalone foundation (fresh database; production-applied migration)
-- PostgreSQL 17 / Supabase. All public tables use explicit grants + RLS.

create schema if not exists private;
revoke all on schema private from public, anon, authenticated;
grant usage on schema private to authenticated, service_role;

create type public.app_role as enum ('student', 'admin', 'owner');
create type public.content_status as enum ('draft', 'published', 'archived');
create type public.product_type as enum ('course', 'ebook', 'workshop');
create type public.order_status as enum ('pending', 'processing', 'paid', 'failed', 'cancelled', 'refunded');
create type public.enrollment_status as enum ('pending', 'active', 'expired', 'cancelled', 'refunded');
create type public.gateway_fee_mode as enum ('merchant', 'customer');
create type public.email_status as enum ('pending', 'processing', 'sent', 'failed', 'cancelled');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  avatar_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_phone_length check (phone is null or char_length(phone) between 8 and 20)
);

create table public.user_roles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role public.app_role not null default 'student',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.admin_audit_logs (
  id bigint generated always as identity primary key,
  actor_id uuid references auth.users(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id text,
  before_snapshot jsonb,
  after_snapshot jsonb,
  request_id uuid,
  created_at timestamptz not null default now()
);

create index admin_audit_logs_actor_created_idx on public.admin_audit_logs (actor_id, created_at desc);
create index admin_audit_logs_entity_idx on public.admin_audit_logs (entity_type, entity_id, created_at desc);

create table public.pages (
  id bigint generated always as identity primary key,
  slug text not null unique,
  title text not null,
  status public.content_status not null default 'draft',
  draft_content jsonb not null default '{}'::jsonb,
  published_content jsonb,
  seo jsonb not null default '{}'::jsonb,
  published_at timestamptz,
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint pages_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  constraint pages_content_objects check (jsonb_typeof(draft_content) = 'object' and (published_content is null or jsonb_typeof(published_content) = 'object'))
);

create table public.page_sections (
  id bigint generated always as identity primary key,
  page_id bigint not null references public.pages(id) on delete cascade,
  section_key text not null,
  component_type text not null,
  position integer not null default 0,
  is_visible boolean not null default true,
  draft_content jsonb not null default '{}'::jsonb,
  published_content jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (page_id, section_key),
  constraint page_sections_position_nonnegative check (position >= 0)
);

create index page_sections_page_position_idx on public.page_sections (page_id, position);

create table public.content_revisions (
  id uuid primary key default gen_random_uuid(),
  page_id bigint not null references public.pages(id) on delete cascade,
  revision_number bigint not null,
  content jsonb not null,
  seo jsonb not null default '{}'::jsonb,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  unique (page_id, revision_number)
);

create index content_revisions_page_created_idx on public.content_revisions (page_id, created_at desc);

create table public.menus (
  id bigint generated always as identity primary key,
  location text not null,
  label text not null,
  href text not null,
  position integer not null default 0,
  is_visible boolean not null default true,
  parent_id bigint references public.menus(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index menus_location_position_idx on public.menus (location, position);
create index menus_parent_id_idx on public.menus (parent_id);

create table public.site_settings (
  key text primary key,
  value jsonb not null,
  is_secret boolean not null default false,
  updated_by uuid references auth.users(id) on delete set null,
  updated_at timestamptz not null default now()
);

create table public.media_assets (
  id uuid primary key default gen_random_uuid(),
  bucket_id text not null,
  object_path text not null,
  original_name text not null,
  mime_type text not null,
  size_bytes bigint not null,
  width integer,
  height integer,
  alt_text text,
  uploaded_by uuid references auth.users(id) on delete set null,
  verified_at timestamptz,
  created_at timestamptz not null default now(),
  unique (bucket_id, object_path),
  constraint media_assets_size_positive check (size_bytes > 0),
  constraint media_assets_path_safe check (object_path !~ '(^|/)\.\.(/|$)')
);

create index media_assets_uploaded_created_idx on public.media_assets (uploaded_by, created_at desc);

create table public.products (
  id bigint generated always as identity primary key,
  slug text not null unique,
  product_type public.product_type not null,
  title text not null,
  summary text,
  price numeric(12,2) not null,
  compare_at_price numeric(12,2),
  currency text not null default 'BDT',
  gateway_fee_mode public.gateway_fee_mode not null default 'merchant',
  is_published boolean not null default false,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint products_price_nonnegative check (price >= 0 and (compare_at_price is null or compare_at_price >= price)),
  constraint products_currency_bdt check (currency = 'BDT'),
  constraint products_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

create index products_published_type_idx on public.products (product_type, created_at desc) where is_published;

create table public.courses (
  id bigint generated always as identity primary key,
  product_id bigint not null unique references public.products(id) on delete cascade,
  learning_outcomes jsonb not null default '[]'::jsonb,
  instructor_name text not null,
  instructor_title text not null,
  certificate_enabled boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.batches (
  id bigint generated always as identity primary key,
  course_id bigint not null references public.courses(id) on delete cascade,
  name text not null,
  starts_at timestamptz,
  ends_at timestamptz,
  enrollment_opens_at timestamptz,
  enrollment_closes_at timestamptz,
  meet_url text,
  calendar_url text,
  community_url text,
  capacity integer,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint batches_dates_ordered check (ends_at is null or starts_at is null or ends_at >= starts_at),
  constraint batches_capacity_positive check (capacity is null or capacity > 0)
);

create index batches_course_starts_idx on public.batches (course_id, starts_at desc);

create table public.modules (
  id bigint generated always as identity primary key,
  course_id bigint not null references public.courses(id) on delete cascade,
  title text not null,
  description text,
  position integer not null default 0,
  recording_url text,
  unlock_at timestamptz,
  is_preview boolean not null default false,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint modules_position_nonnegative check (position >= 0)
);

create index modules_course_position_idx on public.modules (course_id, position);

create table public.module_resources (
  id bigint generated always as identity primary key,
  module_id bigint not null references public.modules(id) on delete cascade,
  title text not null,
  bucket_id text not null,
  object_path text not null,
  mime_type text,
  position integer not null default 0,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  unique (bucket_id, object_path),
  constraint module_resources_position_nonnegative check (position >= 0)
);

create index module_resources_module_position_idx on public.module_resources (module_id, position);

create table public.enrollments (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id bigint not null references public.products(id) on delete restrict,
  batch_id bigint references public.batches(id) on delete set null,
  order_id bigint,
  status public.enrollment_status not null default 'pending',
  access_starts_at timestamptz,
  access_ends_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, product_id)
);

create index enrollments_user_status_idx on public.enrollments (user_id, status);
create index enrollments_product_status_idx on public.enrollments (product_id, status);
create index enrollments_batch_id_idx on public.enrollments (batch_id);

create table public.orders (
  id bigint generated always as identity primary key,
  invoice_number text not null unique,
  user_id uuid not null references auth.users(id) on delete restrict,
  status public.order_status not null default 'pending',
  subtotal numeric(12,2) not null,
  discount_amount numeric(12,2) not null default 0,
  gateway_fee numeric(12,2) not null default 0,
  total_amount numeric(12,2) not null,
  currency text not null default 'BDT',
  customer_snapshot jsonb not null,
  coupon_code text,
  paid_at timestamptz,
  refunded_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint orders_amounts_valid check (subtotal >= 0 and discount_amount >= 0 and gateway_fee >= 0 and total_amount >= 0),
  constraint orders_currency_bdt check (currency = 'BDT')
);

alter table public.enrollments add constraint enrollments_order_id_fkey foreign key (order_id) references public.orders(id) on delete set null;
create index enrollments_order_id_idx on public.enrollments (order_id);
create index orders_user_created_idx on public.orders (user_id, created_at desc);
create index orders_status_created_idx on public.orders (status, created_at desc);

create table public.order_items (
  id bigint generated always as identity primary key,
  order_id bigint not null references public.orders(id) on delete cascade,
  product_id bigint not null references public.products(id) on delete restrict,
  title_snapshot text not null,
  quantity integer not null default 1,
  unit_price numeric(12,2) not null,
  line_total numeric(12,2) not null,
  created_at timestamptz not null default now(),
  constraint order_items_values_valid check (quantity > 0 and unit_price >= 0 and line_total >= 0)
);

create index order_items_order_id_idx on public.order_items (order_id);
create index order_items_product_id_idx on public.order_items (product_id);

create table public.payment_attempts (
  id uuid primary key default gen_random_uuid(),
  order_id bigint not null references public.orders(id) on delete cascade,
  provider text not null default 'paystation',
  provider_transaction_id text,
  status public.order_status not null default 'pending',
  requested_amount numeric(12,2) not null,
  verified_amount numeric(12,2),
  currency text not null default 'BDT',
  raw_response jsonb,
  callback_received_at timestamptz,
  verified_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index payment_attempts_provider_tx_unique on public.payment_attempts (provider, provider_transaction_id) where provider_transaction_id is not null;
create index payment_attempts_order_created_idx on public.payment_attempts (order_id, created_at desc);

create table public.coupons (
  id bigint generated always as identity primary key,
  code text not null unique,
  discount_type text not null check (discount_type in ('fixed', 'percent')),
  discount_value numeric(12,2) not null,
  max_redemptions integer,
  max_redemptions_per_user integer not null default 1,
  starts_at timestamptz,
  ends_at timestamptz,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint coupons_value_positive check (discount_value > 0),
  constraint coupons_percent_range check (discount_type <> 'percent' or discount_value <= 100)
);

create table public.coupon_redemptions (
  id bigint generated always as identity primary key,
  coupon_id bigint not null references public.coupons(id) on delete restrict,
  user_id uuid not null references auth.users(id) on delete restrict,
  order_id bigint not null unique references public.orders(id) on delete cascade,
  discount_amount numeric(12,2) not null,
  created_at timestamptz not null default now()
);

create index coupon_redemptions_coupon_user_idx on public.coupon_redemptions (coupon_id, user_id);

create table public.ebooks (
  id bigint generated always as identity primary key,
  product_id bigint not null unique references public.products(id) on delete cascade,
  bucket_id text not null default 'ebooks',
  object_path text,
  edition text,
  page_count integer,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.workshops (
  id bigint generated always as identity primary key,
  product_id bigint references public.products(id) on delete set null,
  slug text not null unique,
  title text not null,
  description text,
  starts_at timestamptz,
  ends_at timestamptz,
  meet_url text,
  calendar_url text,
  capacity integer,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.workshop_registrations (
  id bigint generated always as identity primary key,
  workshop_id bigint not null references public.workshops(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  registered_at timestamptz not null default now(),
  attended_at timestamptz,
  unique (workshop_id, user_id)
);

create index workshop_registrations_user_idx on public.workshop_registrations (user_id, registered_at desc);

create table public.certificates (
  id bigint generated always as identity primary key,
  verification_code text not null unique,
  user_id uuid references auth.users(id) on delete set null,
  student_name text not null,
  course_name text not null,
  batch_name text,
  instructor_name text not null,
  grade text,
  status text not null default 'valid' check (status in ('valid', 'revoked', 'expired')),
  issued_at date not null,
  expires_at date,
  bucket_id text default 'certificates',
  object_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index certificates_user_issued_idx on public.certificates (user_id, issued_at desc);
create index certificates_status_issued_idx on public.certificates (status, issued_at desc);

create view public.verify_certificates with (security_invoker = true) as
select verification_code, student_name, course_name, batch_name, instructor_name, grade, status, issued_at, expires_at
from public.certificates;

create table public.email_outbox (
  id uuid primary key default gen_random_uuid(),
  idempotency_key text not null unique,
  template_key text not null,
  recipient_email text not null,
  payload jsonb not null,
  status public.email_status not null default 'pending',
  attempt_count integer not null default 0,
  next_attempt_at timestamptz not null default now(),
  locked_at timestamptz,
  sent_at timestamptz,
  last_error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index email_outbox_pending_idx on public.email_outbox (next_attempt_at, created_at) where status in ('pending', 'failed');

create table public.email_delivery_logs (
  id bigint generated always as identity primary key,
  outbox_id uuid not null references public.email_outbox(id) on delete cascade,
  provider_message_id text,
  event_type text not null,
  detail jsonb,
  created_at timestamptz not null default now()
);

create index email_delivery_logs_outbox_idx on public.email_delivery_logs (outbox_id, created_at desc);

create table public.integration_runs (
  id uuid primary key default gen_random_uuid(),
  integration_key text not null,
  run_type text not null,
  status text not null check (status in ('running', 'success', 'failed')),
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  records_processed integer not null default 0,
  detail jsonb,
  error_message text
);

create index integration_runs_key_started_idx on public.integration_runs (integration_key, started_at desc);

create table public.analytics_sessions (
  id uuid primary key,
  user_id uuid references auth.users(id) on delete set null,
  first_path text not null,
  last_path text not null,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  fbclid_hash text,
  first_seen_at timestamptz not null,
  last_seen_at timestamptz not null,
  event_count integer not null default 0
);

create index analytics_sessions_user_last_idx on public.analytics_sessions (user_id, last_seen_at desc);
create index analytics_sessions_campaign_first_idx on public.analytics_sessions (utm_campaign, first_seen_at desc);

create table public.analytics_events (
  id uuid primary key,
  session_id uuid not null references public.analytics_sessions(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  event_name text not null,
  path text not null,
  properties jsonb not null default '{}'::jsonb,
  occurred_at timestamptz not null,
  received_at timestamptz not null default now(),
  constraint analytics_events_name_format check (event_name ~ '^[a-z][a-z0-9_]{1,63}$'),
  constraint analytics_events_properties_object check (jsonb_typeof(properties) = 'object')
);

create index analytics_events_session_occurred_idx on public.analytics_events (session_id, occurred_at desc);
create index analytics_events_name_occurred_idx on public.analytics_events (event_name, occurred_at desc);
create index analytics_events_user_occurred_idx on public.analytics_events (user_id, occurred_at desc);

create table public.analytics_daily_rollups (
  day date not null,
  dimension_type text not null,
  dimension_value text not null,
  sessions bigint not null default 0,
  users bigint not null default 0,
  events bigint not null default 0,
  checkout_started bigint not null default 0,
  verified_purchases bigint not null default 0,
  revenue numeric(14,2) not null default 0,
  updated_at timestamptz not null default now(),
  primary key (day, dimension_type, dimension_value)
);

create table public.ad_campaign_metrics (
  day date not null,
  platform text not null,
  account_id text not null,
  campaign_id text not null,
  campaign_name text,
  impressions bigint not null default 0,
  clicks bigint not null default 0,
  spend numeric(14,2) not null default 0,
  attributed_purchases bigint not null default 0,
  attributed_revenue numeric(14,2) not null default 0,
  raw_metrics jsonb not null default '{}'::jsonb,
  synced_at timestamptz not null default now(),
  primary key (day, platform, account_id, campaign_id)
);

create table public.analytics_preferences (
  user_id uuid primary key references auth.users(id) on delete cascade,
  collection_enabled boolean not null default true,
  retention_months integer not null default 13,
  updated_at timestamptz not null default now(),
  constraint analytics_preferences_retention_range check (retention_months between 1 and 60)
);

create or replace function private.set_updated_at()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

do $$
declare table_name text;
begin
  foreach table_name in array array['profiles','user_roles','pages','page_sections','menus','site_settings','products','courses','batches','modules','enrollments','orders','payment_attempts','coupons','ebooks','workshops','certificates','email_outbox']
  loop
    execute format('create trigger %I_set_updated_at before update on public.%I for each row execute function private.set_updated_at()', table_name, table_name);
  end loop;
end $$;

-- Authorization helpers must exist before RPC and policy definitions below.
create or replace function private.current_app_role()
returns public.app_role
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce((select role from public.user_roles where user_id = (select auth.uid())), 'student'::public.app_role);
$$;

create or replace function private.is_staff()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select (select auth.uid()) is not null and (select private.current_app_role()) in ('admin'::public.app_role, 'owner'::public.app_role);
$$;

create or replace function private.is_owner()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select (select auth.uid()) is not null and (select private.current_app_role()) = 'owner'::public.app_role;
$$;

create or replace function public.save_page_draft(p_slug text, p_content jsonb)
returns bigint
language plpgsql
security definer
set search_path = ''
as $$
declare page_id bigint;
begin
  if not (select private.is_staff()) then raise exception 'forbidden'; end if;
  if jsonb_typeof(p_content) <> 'object' then raise exception 'content_must_be_object'; end if;
  insert into public.pages (slug, title, status, draft_content, created_by, updated_by)
  values (p_slug, coalesce(nullif(p_content ->> 'title', ''), initcap(replace(p_slug, '-', ' '))), 'draft', p_content, (select auth.uid()), (select auth.uid()))
  on conflict (slug) do update set draft_content = excluded.draft_content, updated_by = (select auth.uid()), updated_at = now()
  returning id into page_id;
  return page_id;
end;
$$;

create or replace function public.publish_page(p_slug text, p_request_id uuid default null)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  page_row public.pages%rowtype;
  revision_id uuid;
  next_revision bigint;
begin
  if not (select private.is_staff()) then raise exception 'forbidden'; end if;
  select * into page_row from public.pages where slug = p_slug for update;
  if page_row.id is null then raise exception 'page_not_found'; end if;
  if jsonb_typeof(page_row.draft_content) <> 'object' or page_row.draft_content = '{}'::jsonb then raise exception 'invalid_draft'; end if;
  select coalesce(max(revision_number), 0) + 1 into next_revision from public.content_revisions where page_id = page_row.id;
  insert into public.content_revisions (page_id, revision_number, content, seo, created_by)
  values (page_row.id, next_revision, page_row.draft_content, page_row.seo, (select auth.uid())) returning id into revision_id;
  update public.pages set published_content = draft_content, status = 'published', published_at = now(), updated_by = (select auth.uid()), updated_at = now() where id = page_row.id;
  insert into public.admin_audit_logs (actor_id, action, entity_type, entity_id, before_snapshot, after_snapshot, request_id)
  values ((select auth.uid()), 'publish', 'pages', page_row.id::text, page_row.published_content, page_row.draft_content, p_request_id);
  return revision_id;
end;
$$;

create or replace function public.rollback_page_revision(p_revision_id uuid, p_request_id uuid default null)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare revision_row public.content_revisions%rowtype; page_row public.pages%rowtype;
begin
  if not (select private.is_staff()) then raise exception 'forbidden'; end if;
  select * into revision_row from public.content_revisions where id = p_revision_id;
  if revision_row.id is null then raise exception 'revision_not_found'; end if;
  select * into page_row from public.pages where id = revision_row.page_id for update;
  update public.pages set draft_content = revision_row.content, published_content = revision_row.content, seo = revision_row.seo, status = 'published', published_at = now(), updated_by = (select auth.uid()), updated_at = now() where id = revision_row.page_id;
  insert into public.admin_audit_logs (actor_id, action, entity_type, entity_id, before_snapshot, after_snapshot, request_id)
  values ((select auth.uid()), 'rollback', 'pages', revision_row.page_id::text, page_row.published_content, revision_row.content, p_request_id);
end;
$$;

create or replace function public.verify_certificate_public(p_code text)
returns table (verification_code text, student_name text, course_name text, batch_name text, instructor_name text, grade text, status text, issued_at date, expires_at date)
language sql
stable
security definer
set search_path = ''
as $$
  select c.verification_code, c.student_name, c.course_name, c.batch_name, c.instructor_name, c.grade, c.status, c.issued_at, c.expires_at
  from public.certificates c
  where upper(c.verification_code) = upper(trim(p_code))
  limit 1;
$$;

create or replace function public.create_order(p_product_slug text, p_customer jsonb, p_coupon_code text default null)
returns table (order_id bigint, invoice_number text, total_amount numeric, currency text)
language plpgsql
security definer
set search_path = ''
as $$
declare
  product_row public.products%rowtype;
  coupon_row public.coupons%rowtype;
  discount numeric(12,2) := 0;
  gateway numeric(12,2) := 0;
  created_order public.orders%rowtype;
  invoice text;
begin
  if (select auth.uid()) is null then raise exception 'authentication_required'; end if;
  if jsonb_typeof(p_customer) <> 'object' or nullif(trim(p_customer ->> 'email'), '') is null then raise exception 'invalid_customer'; end if;
  select * into product_row from public.products where slug = p_product_slug and is_published for share;
  if product_row.id is null then raise exception 'product_not_found'; end if;
  if p_coupon_code is not null and trim(p_coupon_code) <> '' then
    select * into coupon_row from public.coupons where upper(code) = upper(trim(p_coupon_code)) and is_active and (starts_at is null or starts_at <= now()) and (ends_at is null or ends_at >= now()) for share;
    if coupon_row.id is null then raise exception 'invalid_coupon'; end if;
    if coupon_row.max_redemptions is not null and (select count(*) from public.coupon_redemptions where coupon_id = coupon_row.id) >= coupon_row.max_redemptions then raise exception 'coupon_exhausted'; end if;
    if (select count(*) from public.coupon_redemptions where coupon_id = coupon_row.id and user_id = (select auth.uid())) >= coupon_row.max_redemptions_per_user then raise exception 'coupon_user_limit'; end if;
    discount := case when coupon_row.discount_type = 'percent' then round(product_row.price * coupon_row.discount_value / 100, 2) else least(product_row.price, coupon_row.discount_value) end;
  end if;
  if product_row.gateway_fee_mode = 'customer' then gateway := round((product_row.price - discount) * 0.02, 2); end if;
  invoice := 'AA-' || to_char(now() at time zone 'Asia/Dhaka', 'YYYYMMDD') || '-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 10));
  insert into public.orders (invoice_number, user_id, subtotal, discount_amount, gateway_fee, total_amount, customer_snapshot, coupon_code)
  values (invoice, (select auth.uid()), product_row.price, discount, gateway, product_row.price - discount + gateway, p_customer, nullif(upper(trim(p_coupon_code)), '')) returning * into created_order;
  insert into public.order_items (order_id, product_id, title_snapshot, unit_price, line_total) values (created_order.id, product_row.id, product_row.title, product_row.price, product_row.price);
  insert into public.payment_attempts (order_id, requested_amount) values (created_order.id, created_order.total_amount);
  if coupon_row.id is not null then insert into public.coupon_redemptions (coupon_id, user_id, order_id, discount_amount) values (coupon_row.id, (select auth.uid()), created_order.id, discount); end if;
  return query select created_order.id, created_order.invoice_number, created_order.total_amount, created_order.currency;
end;
$$;

create or replace function public.fulfill_verified_order(p_invoice_number text, p_provider_transaction_id text, p_verified_amount numeric, p_currency text, p_raw_response jsonb)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare order_row public.orders%rowtype; item_row public.order_items%rowtype;
begin
  select * into order_row from public.orders where invoice_number = p_invoice_number for update;
  if order_row.id is null then raise exception 'order_not_found'; end if;
  if order_row.status = 'paid' then return false; end if;
  if order_row.status in ('refunded','cancelled') then raise exception 'invalid_order_state'; end if;
  if p_currency <> order_row.currency or p_verified_amount <> order_row.total_amount then raise exception 'payment_mismatch'; end if;
  update public.orders set status = 'paid', paid_at = now(), updated_at = now() where id = order_row.id;
  update public.payment_attempts set provider_transaction_id = p_provider_transaction_id, status = 'paid', verified_amount = p_verified_amount, raw_response = p_raw_response, verified_at = now(), updated_at = now() where order_id = order_row.id and status <> 'paid';
  select * into item_row from public.order_items where order_id = order_row.id order by id limit 1;
  if exists (select 1 from public.products where id = item_row.product_id and product_type = 'course') then
    insert into public.enrollments (user_id, product_id, order_id, status, access_starts_at)
    values (order_row.user_id, item_row.product_id, order_row.id, 'active', now())
    on conflict (user_id, product_id) do update set order_id = excluded.order_id, status = 'active', access_starts_at = coalesce(public.enrollments.access_starts_at, now()), updated_at = now();
  end if;
  insert into public.email_outbox (idempotency_key, template_key, recipient_email, payload)
  values ('receipt:' || order_row.id, 'payment_receipt', order_row.customer_snapshot ->> 'email', jsonb_build_object('orderId', order_row.id, 'invoice', order_row.invoice_number, 'amount', order_row.total_amount)) on conflict (idempotency_key) do nothing;
  return true;
end;
$$;

create or replace function public.ingest_analytics_event(p_event_id uuid, p_session_id uuid, p_event_name text, p_path text, p_properties jsonb, p_occurred_at timestamptz)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
begin
  if p_event_name !~ '^[a-z][a-z0-9_]{1,63}$' or char_length(p_path) > 500 or jsonb_typeof(p_properties) <> 'object' then raise exception 'invalid_event'; end if;
  if (select count(*) from public.analytics_events where session_id = p_session_id and received_at > now() - interval '1 minute') >= 120 then raise exception 'rate_limited'; end if;
  insert into public.analytics_sessions (id, user_id, first_path, last_path, utm_source, utm_medium, utm_campaign, utm_content, fbclid_hash, first_seen_at, last_seen_at, event_count)
  values (p_session_id, (select auth.uid()), p_path, p_path, nullif(p_properties ->> 'utm_source',''), nullif(p_properties ->> 'utm_medium',''), nullif(p_properties ->> 'utm_campaign',''), nullif(p_properties ->> 'utm_content',''), nullif(p_properties ->> 'fbclid_hash',''), p_occurred_at, p_occurred_at, 1)
  on conflict (id) do update set last_path = excluded.last_path, last_seen_at = greatest(public.analytics_sessions.last_seen_at, excluded.last_seen_at), event_count = public.analytics_sessions.event_count + 1, user_id = coalesce(public.analytics_sessions.user_id, excluded.user_id);
  insert into public.analytics_events (id, session_id, user_id, event_name, path, properties, occurred_at)
  values (p_event_id, p_session_id, (select auth.uid()), p_event_name, p_path, p_properties - 'fbclid', p_occurred_at)
  on conflict (id) do nothing;
  return found;
end;
$$;

create or replace function public.claim_email_outbox(p_limit integer default 20)
returns setof public.email_outbox
language plpgsql
security definer
set search_path = ''
as $$
begin
  return query
  with claimed as (
    select id from public.email_outbox where status in ('pending','failed') and next_attempt_at <= now() order by next_attempt_at, created_at for update skip locked limit greatest(1, least(p_limit, 100))
  )
  update public.email_outbox o set status = 'processing', locked_at = now(), attempt_count = attempt_count + 1, updated_at = now()
  from claimed where o.id = claimed.id returning o.*;
end;
$$;

revoke all on function public.save_page_draft(text,jsonb), public.publish_page(text,uuid), public.rollback_page_revision(uuid,uuid), public.create_order(text,jsonb,text), public.fulfill_verified_order(text,text,numeric,text,jsonb), public.ingest_analytics_event(uuid,uuid,text,text,jsonb,timestamptz), public.claim_email_outbox(integer), public.verify_certificate_public(text) from public;
grant execute on function public.save_page_draft(text,jsonb), public.publish_page(text,uuid), public.rollback_page_revision(uuid,uuid) to authenticated;
grant execute on function public.create_order(text,jsonb,text) to authenticated;
grant execute on function public.verify_certificate_public(text), public.ingest_analytics_event(uuid,uuid,text,text,jsonb,timestamptz) to anon, authenticated;
grant execute on function public.fulfill_verified_order(text,text,numeric,text,jsonb), public.claim_email_outbox(integer) to service_role;

-- RLS is enabled on every exposed table.
do $$
declare table_name text;
begin
  foreach table_name in array array['profiles','user_roles','admin_audit_logs','pages','page_sections','content_revisions','menus','site_settings','media_assets','products','courses','batches','modules','module_resources','enrollments','orders','order_items','payment_attempts','coupons','coupon_redemptions','ebooks','workshops','workshop_registrations','certificates','email_outbox','email_delivery_logs','integration_runs','analytics_sessions','analytics_events','analytics_daily_rollups','ad_campaign_metrics','analytics_preferences']
  loop execute format('alter table public.%I enable row level security', table_name); end loop;
end $$;

create policy profiles_self_select on public.profiles for select to authenticated using ((select auth.uid()) = id or (select private.is_staff()));
create policy profiles_self_update on public.profiles for update to authenticated using ((select auth.uid()) = id or (select private.is_staff())) with check ((select auth.uid()) = id or (select private.is_staff()));
create policy user_roles_self_select on public.user_roles for select to authenticated using ((select auth.uid()) = user_id or (select private.is_staff()));
create policy user_roles_owner_manage on public.user_roles for all to authenticated using ((select private.is_owner())) with check ((select private.is_owner()));
create policy audit_staff_select on public.admin_audit_logs for select to authenticated using ((select private.is_staff()));

create policy pages_public_select on public.pages for select to anon, authenticated using ((status = 'published' and published_content is not null) or (select private.is_staff()));
create policy pages_staff_manage on public.pages for all to authenticated using ((select private.is_staff())) with check ((select private.is_staff()));
create policy page_sections_public_select on public.page_sections for select to anon, authenticated using ((is_visible and published_content is not null) or (select private.is_staff()));
create policy page_sections_staff_manage on public.page_sections for all to authenticated using ((select private.is_staff())) with check ((select private.is_staff()));
create policy revisions_staff on public.content_revisions for all to authenticated using ((select private.is_staff())) with check ((select private.is_staff()));
create policy menus_public_select on public.menus for select to anon, authenticated using (is_visible or (select private.is_staff()));
create policy menus_staff_manage on public.menus for all to authenticated using ((select private.is_staff())) with check ((select private.is_staff()));
create policy settings_public_select on public.site_settings for select to anon, authenticated using ((not is_secret) or (select private.is_owner()));
create policy settings_staff_manage on public.site_settings for all to authenticated using ((select private.is_staff())) with check ((select private.is_staff()) and (not is_secret or (select private.is_owner())));
create policy media_public_select on public.media_assets for select to anon, authenticated using (bucket_id = 'cms-public' or (select private.is_staff()));
create policy media_staff_manage on public.media_assets for all to authenticated using ((select private.is_staff())) with check ((select private.is_staff()));

create policy products_public_select on public.products for select to anon, authenticated using (is_published or (select private.is_staff()));
create policy products_staff_manage on public.products for all to authenticated using ((select private.is_staff())) with check ((select private.is_staff()));
create policy courses_public_select on public.courses for select to anon, authenticated using (exists (select 1 from public.products p where p.id = product_id and p.is_published) or (select private.is_staff()));
create policy courses_staff_manage on public.courses for all to authenticated using ((select private.is_staff())) with check ((select private.is_staff()));
create policy batches_public_select on public.batches for select to anon, authenticated using (is_published or (select private.is_staff()));
create policy batches_staff_manage on public.batches for all to authenticated using ((select private.is_staff())) with check ((select private.is_staff()));
create policy modules_preview_or_enrolled on public.modules for select to anon, authenticated using (is_preview or ((select auth.uid()) is not null and exists (select 1 from public.courses c join public.enrollments e on e.product_id = c.product_id where c.id = course_id and e.user_id = (select auth.uid()) and e.status = 'active')) or (select private.is_staff()));
create policy modules_staff_manage on public.modules for all to authenticated using ((select private.is_staff())) with check ((select private.is_staff()));
create policy resources_enrolled_select on public.module_resources for select to authenticated using (exists (select 1 from public.modules m join public.courses c on c.id = m.course_id join public.enrollments e on e.product_id = c.product_id where m.id = module_id and e.user_id = (select auth.uid()) and e.status = 'active') or (select private.is_staff()));
create policy resources_staff_manage on public.module_resources for all to authenticated using ((select private.is_staff())) with check ((select private.is_staff()));
create policy enrollments_self_select on public.enrollments for select to authenticated using (user_id = (select auth.uid()) or (select private.is_staff()));
create policy enrollments_staff_manage on public.enrollments for all to authenticated using ((select private.is_staff())) with check ((select private.is_staff()));

create policy orders_self_select on public.orders for select to authenticated using (user_id = (select auth.uid()) or (select private.is_staff()));
create policy orders_staff_manage on public.orders for all to authenticated using ((select private.is_staff())) with check ((select private.is_staff()));
create policy order_items_self_select on public.order_items for select to authenticated using (exists (select 1 from public.orders o where o.id = order_id and (o.user_id = (select auth.uid()) or (select private.is_staff()))));
create policy order_items_staff_manage on public.order_items for all to authenticated using ((select private.is_staff())) with check ((select private.is_staff()));
create policy payment_attempts_self_select on public.payment_attempts for select to authenticated using (exists (select 1 from public.orders o where o.id = order_id and (o.user_id = (select auth.uid()) or (select private.is_staff()))));
create policy payment_attempts_staff_manage on public.payment_attempts for all to authenticated using ((select private.is_staff())) with check ((select private.is_staff()));
create policy coupons_staff on public.coupons for all to authenticated using ((select private.is_staff())) with check ((select private.is_staff()));
create policy coupon_redemptions_self on public.coupon_redemptions for select to authenticated using (user_id = (select auth.uid()) or (select private.is_staff()));
create policy ebooks_public_select on public.ebooks for select to anon, authenticated using (is_published or (select private.is_staff()));
create policy ebooks_staff_manage on public.ebooks for all to authenticated using ((select private.is_staff())) with check ((select private.is_staff()));
create policy workshops_public_select on public.workshops for select to anon, authenticated using (is_published or (select private.is_staff()));
create policy workshops_staff_manage on public.workshops for all to authenticated using ((select private.is_staff())) with check ((select private.is_staff()));
create policy workshop_registrations_self on public.workshop_registrations for select to authenticated using (user_id = (select auth.uid()) or (select private.is_staff()));
create policy workshop_registrations_self_insert on public.workshop_registrations for insert to authenticated with check (user_id = (select auth.uid()));
create policy workshop_registrations_staff_manage on public.workshop_registrations for all to authenticated using ((select private.is_staff())) with check ((select private.is_staff()));
create policy certificates_self_select on public.certificates for select to authenticated using (user_id = (select auth.uid()) or (select private.is_staff()));
create policy certificates_staff_manage on public.certificates for all to authenticated using ((select private.is_staff())) with check ((select private.is_staff()));

create policy operations_staff_email_outbox on public.email_outbox for all to authenticated using ((select private.is_staff())) with check ((select private.is_staff()));
create policy operations_staff_email_logs on public.email_delivery_logs for select to authenticated using ((select private.is_staff()));
create policy operations_staff_integration_runs on public.integration_runs for select to authenticated using ((select private.is_staff()));
create policy analytics_staff_sessions on public.analytics_sessions for select to authenticated using ((select private.is_staff()));
create policy analytics_staff_events on public.analytics_events for select to authenticated using ((select private.is_staff()));
create policy analytics_staff_rollups on public.analytics_daily_rollups for select to authenticated using ((select private.is_staff()));
create policy analytics_staff_ad_metrics on public.ad_campaign_metrics for select to authenticated using ((select private.is_staff()));
create policy analytics_preferences_self on public.analytics_preferences for all to authenticated using (user_id = (select auth.uid()) or (select private.is_owner())) with check (user_id = (select auth.uid()) or (select private.is_owner()));

-- Explicit Data API grants (RLS remains the row-level gate).
revoke all on all tables in schema public from anon, authenticated;
grant select on public.pages, public.page_sections, public.menus, public.site_settings, public.media_assets, public.products, public.courses, public.batches, public.modules, public.ebooks, public.workshops to anon;
grant select on public.profiles, public.user_roles, public.admin_audit_logs, public.pages, public.page_sections, public.content_revisions, public.menus, public.site_settings, public.media_assets, public.products, public.courses, public.batches, public.modules, public.module_resources, public.enrollments, public.orders, public.order_items, public.payment_attempts, public.coupons, public.coupon_redemptions, public.ebooks, public.workshops, public.workshop_registrations, public.certificates, public.email_outbox, public.email_delivery_logs, public.integration_runs, public.analytics_sessions, public.analytics_events, public.analytics_daily_rollups, public.ad_campaign_metrics, public.analytics_preferences to authenticated;
grant insert, update on public.profiles, public.analytics_preferences to authenticated;
grant insert on public.workshop_registrations to authenticated;
grant insert, update, delete on public.pages, public.page_sections, public.content_revisions, public.menus, public.site_settings, public.media_assets, public.products, public.courses, public.batches, public.modules, public.module_resources, public.enrollments, public.orders, public.order_items, public.payment_attempts, public.coupons, public.coupon_redemptions, public.ebooks, public.workshops, public.workshop_registrations, public.certificates, public.email_outbox to authenticated;
grant usage, select on all sequences in schema public to authenticated, service_role;
grant all on all tables in schema public to service_role;

-- Storage buckets and policies.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types) values
  ('cms-public','cms-public',true,10485760,array['image/jpeg','image/png','image/webp','image/avif']),
  ('course-files','course-files',false,52428800,array['application/pdf','application/zip','image/jpeg','image/png']),
  ('ebooks','ebooks',false,52428800,array['application/pdf']),
  ('certificates','certificates',false,10485760,array['application/pdf','image/png','image/jpeg']),
  ('avatars','avatars',false,5242880,array['image/jpeg','image/png','image/webp'])
on conflict (id) do update set public = excluded.public, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

create policy cms_public_read on storage.objects for select to anon, authenticated using (bucket_id = 'cms-public');
create policy staff_storage_manage on storage.objects for all to authenticated using (bucket_id in ('cms-public','course-files','ebooks','certificates') and (select private.is_staff())) with check (bucket_id in ('cms-public','course-files','ebooks','certificates') and (select private.is_staff()));
create policy avatar_self_select on storage.objects for select to authenticated using (bucket_id = 'avatars' and ((storage.foldername(name))[1] = (select auth.uid())::text or (select private.is_staff())));
create policy avatar_self_insert on storage.objects for insert to authenticated with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy avatar_self_update on storage.objects for update to authenticated using (bucket_id = 'avatars' and (storage.foldername(name))[1] = (select auth.uid())::text) with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy avatar_self_delete on storage.objects for delete to authenticated using (bucket_id = 'avatars' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy enrolled_course_files_read on storage.objects for select to authenticated using (bucket_id = 'course-files' and split_part(name,'/',1) ~ '^[0-9]+$' and exists (select 1 from public.enrollments e where e.product_id = split_part(name,'/',1)::bigint and e.user_id = (select auth.uid()) and e.status = 'active'));
create policy paid_ebook_files_read on storage.objects for select to authenticated using (bucket_id = 'ebooks' and split_part(name,'/',1) ~ '^[0-9]+$' and exists (select 1 from public.orders o join public.order_items oi on oi.order_id = o.id where o.user_id = (select auth.uid()) and o.status = 'paid' and oi.product_id = split_part(name,'/',1)::bigint));
create policy certificate_owner_file_read on storage.objects for select to authenticated using (bucket_id = 'certificates' and (storage.foldername(name))[1] = (select auth.uid())::text);

-- Standalone seed content; no legacy identities/orders/enrollments are imported.
insert into public.pages (slug, title, status, draft_content, published_content, seo, published_at)
values ('home', 'Homepage', 'published',
  jsonb_build_object('eyebrow','Tax · VAT · Legal · Professional Learning','title','আয়কর ও Professional Compliance শেখার নির্ভরযোগ্য প্ল্যাটফর্ম','description','আইন শুধু মুখস্থ নয়—বোঝা, প্রয়োগ করা এবং পেশাগত কাজে আত্মবিশ্বাসের সঙ্গে ব্যবহার করার জন্য structured learning experience।','primaryCta','কোর্স দেখুন','secondaryCta','eBook দেখুন','founderName','খাইরুল আমিন সরকার','founderTitle','Founder & Lead Instructor, Associates Academy','founderBio','Income Tax, VAT ও professional compliance নিয়ে practical teaching, structured framework এবং নিয়মিত law update-এর মাধ্যমে শিক্ষার্থীদের বাস্তব কাজে প্রস্তুত করেন।'),
  jsonb_build_object('eyebrow','Tax · VAT · Legal · Professional Learning','title','আয়কর ও Professional Compliance শেখার নির্ভরযোগ্য প্ল্যাটফর্ম','description','আইন শুধু মুখস্থ নয়—বোঝা, প্রয়োগ করা এবং পেশাগত কাজে আত্মবিশ্বাসের সঙ্গে ব্যবহার করার জন্য structured learning experience।','primaryCta','কোর্স দেখুন','secondaryCta','eBook দেখুন','founderName','খাইরুল আমিন সরকার','founderTitle','Founder & Lead Instructor, Associates Academy','founderBio','Income Tax, VAT ও professional compliance নিয়ে practical teaching, structured framework এবং নিয়মিত law update-এর মাধ্যমে শিক্ষার্থীদের বাস্তব কাজে প্রস্তুত করেন।'),
  jsonb_build_object('title','Associates Academy','description','আয়কর, ভ্যাট, আইন ও Professional Compliance শেখার নির্ভরযোগ্য প্ল্যাটফর্ম।'), now());

insert into public.products (slug, product_type, title, summary, price, compare_at_price, gateway_fee_mode, is_published) values
  ('income-tax-working-framework','course','Fundamentals of Income Tax Act, 2023','Act থেকে Return—complete practical working framework',1710,3000,'merchant',true),
  ('fundamentals-income-tax-ebook','ebook','Fundamentals of Income Tax Act, 2023 eBook','১২৩ পৃষ্ঠার Bengali digital handbook',149,220,'merchant',true);

insert into public.courses (product_id, learning_outcomes, instructor_name, instructor_title)
select id, '["Act & Basic Concepts","Taxability","Heads of Income","Tax Computation","TDS Compliance","Return Preparation"]'::jsonb, 'খাইরুল আমিন সরকার', 'Founder & Lead Instructor, Associates Academy' from public.products where slug = 'income-tax-working-framework';

insert into public.ebooks (product_id, edition, page_count, is_published)
select id, 'Edition 2026', 123, true from public.products where slug = 'fundamentals-income-tax-ebook';

insert into public.site_settings (key, value) values
  ('brand', '{"name":"Associates Academy","domain":"associatesacademy.com.bd"}'::jsonb),
  ('analytics', '{"defaultEnabled":true,"retentionMonths":13}'::jsonb),
  ('payment', '{"provider":"paystation","mode":"not_connected"}'::jsonb);

create or replace function private.current_app_role()
returns public.app_role
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce((select role from public.user_roles where user_id = (select auth.uid())), 'student'::public.app_role);
$$;

create or replace function private.is_staff()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select (select auth.uid()) is not null and (select private.current_app_role()) in ('admin'::public.app_role, 'owner'::public.app_role);
$$;

create or replace function private.is_owner()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select (select auth.uid()) is not null and (select private.current_app_role()) = 'owner'::public.app_role;
$$;

revoke all on function private.current_app_role() from public, anon;
revoke all on function private.is_staff() from public, anon;
revoke all on function private.is_owner() from public, anon;
grant execute on function private.current_app_role(), private.is_staff(), private.is_owner() to authenticated, service_role;

create or replace function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, nullif(trim(coalesce(new.raw_user_meta_data ->> 'full_name', '')), ''))
  on conflict (id) do nothing;
  insert into public.user_roles (user_id, role) values (new.id, 'student') on conflict (user_id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created after insert on auth.users for each row execute function private.handle_new_user();

create or replace function private.audit_row_change()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  row_id text;
  request_value uuid;
begin
  if (select auth.uid()) is null or not (select private.is_staff()) then
    return coalesce(new, old);
  end if;
  row_id := coalesce(to_jsonb(new) ->> 'id', to_jsonb(old) ->> 'id', to_jsonb(new) ->> 'key', to_jsonb(old) ->> 'key');
  begin
    request_value := nullif(current_setting('request.id', true), '')::uuid;
  exception when others then request_value := null;
  end;
  insert into public.admin_audit_logs (actor_id, action, entity_type, entity_id, before_snapshot, after_snapshot, request_id)
  values ((select auth.uid()), lower(tg_op), tg_table_name, row_id, case when tg_op <> 'INSERT' then to_jsonb(old) end, case when tg_op <> 'DELETE' then to_jsonb(new) end, request_value);
  return coalesce(new, old);
end;
$$;

do $$
declare table_name text;
begin
  foreach table_name in array array['pages','page_sections','menus','site_settings','media_assets','products','courses','batches','modules','module_resources','enrollments','orders','coupons','ebooks','workshops','certificates']
  loop
    execute format('create trigger %I_audit after insert or update or delete on public.%I for each row execute function private.audit_row_change()', table_name, table_name);
  end loop;
end $$;
