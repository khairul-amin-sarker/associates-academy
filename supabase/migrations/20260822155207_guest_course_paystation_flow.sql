-- Guest-first, database-authoritative PayStation course checkout.
-- Existing authenticated/eBook commerce remains compatible with orders.status.

alter table public.orders
  alter column user_id drop not null,
  add column checkout_request_id uuid,
  add column normalized_email text,
  add column payment_state text not null default 'pending_payment',
  add column product_id_snapshot bigint references public.products(id) on delete restrict,
  add column product_slug_snapshot text,
  add column product_type_snapshot public.product_type,
  add column product_title_snapshot text,
  add column compare_at_price_snapshot numeric(12,2),
  add column gateway_fee_mode_snapshot public.gateway_fee_mode,
  add column provider_mode text,
  add column provider_reference text,
  add column expires_at timestamptz,
  add column last_verification_at timestamptz,
  add column next_reconciliation_at timestamptz,
  add column verification_count integer not null default 0,
  add constraint orders_payment_state_valid check (
    payment_state in (
      'pending_payment', 'processing', 'verified_paid', 'paid_unclaimed',
      'failed', 'cancelled', 'expired', 'refunded'
    )
  ),
  add constraint orders_provider_mode_valid check (
    provider_mode is null or provider_mode in ('sandbox', 'live', 'legacy')
  ),
  add constraint orders_snapshot_amounts_valid check (
    compare_at_price_snapshot is null or compare_at_price_snapshot >= 0
  ),
  add constraint orders_guest_email_required check (
    product_type_snapshot is distinct from 'course'::public.product_type
    or normalized_email is not null
  ),
  add constraint orders_verification_count_nonnegative check (verification_count >= 0);

update public.orders
set
  normalized_email = nullif(lower(btrim(customer_snapshot ->> 'email')), ''),
  payment_state = case status::text
    when 'processing' then 'processing'
    when 'paid' then 'verified_paid'
    when 'failed' then 'failed'
    when 'cancelled' then 'cancelled'
    when 'refunded' then 'refunded'
    else 'pending_payment'
  end,
  provider_mode = coalesce(provider_mode, 'legacy')
where normalized_email is null or provider_mode is null;

create unique index orders_checkout_request_id_unique
  on public.orders (checkout_request_id)
  where checkout_request_id is not null;
create unique index orders_provider_reference_unique
  on public.orders (provider_reference)
  where provider_reference is not null;
create index orders_normalized_email_payment_state_idx
  on public.orders (normalized_email, payment_state, created_at desc)
  where normalized_email is not null;
create index orders_reconciliation_due_idx
  on public.orders (next_reconciliation_at, created_at)
  where payment_state in ('pending_payment', 'processing', 'failed');
create index orders_product_snapshot_idx
  on public.orders (product_id_snapshot, payment_state);

alter table public.payment_attempts
  add column provider_status text,
  add column provider_reference text,
  add column provider_status_code text,
  add column verification_source text,
  add column diagnostic_code text,
  add column verification_count integer not null default 0,
  add column initiated_at timestamptz,
  add column last_verified_at timestamptz,
  add constraint payment_attempts_provider_status_valid check (
    provider_status is null or provider_status in ('processing', 'success', 'failed', 'refund')
  ),
  add constraint payment_attempts_verification_count_nonnegative check (verification_count >= 0);

create index payment_attempts_reconciliation_idx
  on public.payment_attempts (provider_status, last_verified_at, created_at)
  where provider_status is null or provider_status in ('processing', 'failed');

alter table public.coupon_redemptions
  alter column user_id drop not null,
  add column normalized_email text,
  add constraint coupon_redemptions_identity_required check (
    user_id is not null or normalized_email is not null
  );

update public.coupon_redemptions cr
set normalized_email = o.normalized_email
from public.orders o
where o.id = cr.order_id and cr.normalized_email is null;

create index coupon_redemptions_coupon_email_idx
  on public.coupon_redemptions (coupon_id, normalized_email)
  where normalized_email is not null;

create table public.paid_entitlements (
  id bigint generated always as identity primary key,
  order_id bigint not null unique references public.orders(id) on delete restrict,
  product_id bigint not null references public.products(id) on delete restrict,
  normalized_email text not null,
  user_id uuid references auth.users(id) on delete restrict,
  status text not null default 'unclaimed' check (status in ('unclaimed', 'claimed', 'refunded')),
  claimed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint paid_entitlements_claim_consistent check (
    (status = 'claimed' and user_id is not null and claimed_at is not null)
    or (status = 'unclaimed' and user_id is null and claimed_at is null)
    or status = 'refunded'
  )
);

create index paid_entitlements_email_status_idx
  on public.paid_entitlements (normalized_email, status, created_at);
create index paid_entitlements_user_status_idx
  on public.paid_entitlements (user_id, status)
  where user_id is not null;
create index paid_entitlements_product_id_idx
  on public.paid_entitlements (product_id);

create table public.payment_verification_events (
  id bigint generated always as identity primary key,
  order_id bigint not null references public.orders(id) on delete restrict,
  payment_attempt_id uuid not null references public.payment_attempts(id) on delete restrict,
  source text not null check (source in ('callback', 'return', 'reconciliation', 'admin', 'test')),
  request_successful boolean not null,
  provider_status text check (provider_status is null or provider_status in ('processing', 'success', 'failed', 'refund')),
  provider_status_code text,
  provider_invoice_number text,
  provider_transaction_id text,
  provider_reference text,
  verified_amount numeric(12,2),
  provider_currency text,
  invoice_matches boolean not null default false,
  amount_matches boolean not null default false,
  currency_matches boolean,
  reference_matches boolean,
  diagnostic_code text,
  response_snapshot jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index payment_verification_events_order_created_idx
  on public.payment_verification_events (order_id, created_at desc);
create index payment_verification_events_attempt_id_idx
  on public.payment_verification_events (payment_attempt_id);
create index payment_verification_events_transaction_id_idx
  on public.payment_verification_events (provider_transaction_id)
  where provider_transaction_id is not null;

alter table public.paid_entitlements enable row level security;
alter table public.payment_verification_events enable row level security;

revoke all on table public.paid_entitlements, public.payment_verification_events from anon, authenticated;
grant select on table public.paid_entitlements, public.payment_verification_events to authenticated;
grant all on table public.paid_entitlements, public.payment_verification_events to service_role;
grant usage, select on sequence public.paid_entitlements_id_seq, public.payment_verification_events_id_seq to service_role;

create policy paid_entitlements_owner_select
on public.paid_entitlements for select
to authenticated
using (user_id = (select auth.uid()) or (select private.is_staff()));

create policy payment_verification_events_staff_select
on public.payment_verification_events for select
to authenticated
using ((select private.is_staff()));

create or replace function private.protect_order_payment_snapshot()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.invoice_number is distinct from old.invoice_number
    or new.checkout_request_id is distinct from old.checkout_request_id
    or new.normalized_email is distinct from old.normalized_email
    or new.customer_snapshot is distinct from old.customer_snapshot
    or new.subtotal is distinct from old.subtotal
    or new.discount_amount is distinct from old.discount_amount
    or new.gateway_fee is distinct from old.gateway_fee
    or new.total_amount is distinct from old.total_amount
    or new.currency is distinct from old.currency
    or new.coupon_code is distinct from old.coupon_code
    or new.product_id_snapshot is distinct from old.product_id_snapshot
    or new.product_slug_snapshot is distinct from old.product_slug_snapshot
    or new.product_type_snapshot is distinct from old.product_type_snapshot
    or new.product_title_snapshot is distinct from old.product_title_snapshot
    or new.compare_at_price_snapshot is distinct from old.compare_at_price_snapshot
    or new.gateway_fee_mode_snapshot is distinct from old.gateway_fee_mode_snapshot
    or new.provider_mode is distinct from old.provider_mode
    or new.provider_reference is distinct from old.provider_reference
  then
    raise exception 'order_snapshot_immutable';
  end if;
  return new;
end;
$$;

create trigger protect_order_payment_snapshot
before update on public.orders
for each row execute function private.protect_order_payment_snapshot();

create or replace function private.prevent_payment_verification_event_mutation()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  raise exception 'payment_verification_events_append_only';
end;
$$;

create trigger payment_verification_events_append_only
before update or delete on public.payment_verification_events
for each row execute function private.prevent_payment_verification_event_mutation();

create or replace function public.quote_guest_course_checkout(
  p_product_slug text,
  p_coupon_code text default null,
  p_checkout_email text default null,
  p_authenticated_user_id uuid default null
)
returns table (
  subtotal numeric,
  discount_amount numeric,
  gateway_fee numeric,
  total_amount numeric,
  currency text,
  gateway_fee_mode public.gateway_fee_mode
)
language plpgsql
security invoker
set search_path = ''
as $$
declare
  product_row public.products%rowtype;
  coupon_row public.coupons%rowtype;
  normalized_checkout_email text := nullif(lower(btrim(p_checkout_email)), '');
  calculated_discount numeric(12,2) := 0;
  calculated_gateway numeric(12,2) := 0;
  calculated_total numeric(12,2);
begin
  select * into product_row
  from public.products p
  where p.slug = p_product_slug
    and p.product_type = 'course'
    and p.currency = 'BDT'
    and p.is_published;

  if product_row.id is null then raise exception 'product_not_found'; end if;

  if p_authenticated_user_id is not null and exists (
    select 1 from public.enrollments
    where user_id = p_authenticated_user_id
      and product_id = product_row.id
      and status = 'active'
  ) then
    raise exception 'already_enrolled';
  end if;

  if p_coupon_code is not null and btrim(p_coupon_code) <> '' then
    select * into coupon_row
    from public.coupons c
    where c.product_id = product_row.id
      and upper(c.code) = upper(btrim(p_coupon_code))
      and c.is_active
      and (c.starts_at is null or c.starts_at <= now())
      and (c.ends_at is null or c.ends_at >= now());

    if coupon_row.id is null then raise exception 'invalid_coupon'; end if;
    if coupon_row.max_redemptions is not null and (
      select count(*) from public.coupon_redemptions where coupon_id = coupon_row.id
    ) >= coupon_row.max_redemptions then
      raise exception 'coupon_exhausted';
    end if;
    if normalized_checkout_email is not null and (
      select count(*) from public.coupon_redemptions
      where coupon_id = coupon_row.id and normalized_email = normalized_checkout_email
    ) >= coupon_row.max_redemptions_per_user then
      raise exception 'coupon_user_limit';
    end if;

    calculated_discount := case
      when coupon_row.discount_type = 'percent' then round(product_row.price * coupon_row.discount_value / 100, 2)
      else least(product_row.price, coupon_row.discount_value)
    end;
  end if;

  if product_row.gateway_fee_mode = 'customer' then
    calculated_gateway := round((product_row.price - calculated_discount) * 0.02, 2);
  end if;
  calculated_total := product_row.price - calculated_discount + calculated_gateway;
  if calculated_total <= 0 then raise exception 'zero_total_not_supported'; end if;

  return query select
    product_row.price,
    calculated_discount,
    calculated_gateway,
    calculated_total,
    product_row.currency,
    product_row.gateway_fee_mode;
end;
$$;

create or replace function public.create_guest_course_order(
  p_product_slug text,
  p_customer jsonb,
  p_coupon_code text,
  p_checkout_request_id uuid,
  p_authenticated_user_id uuid,
  p_provider_mode text
)
returns table (
  order_id bigint,
  payment_attempt_id uuid,
  invoice_number text,
  total_amount numeric,
  currency text,
  gateway_fee_mode public.gateway_fee_mode,
  provider_reference text,
  course_slug text
)
language plpgsql
security definer
set search_path = ''
as $$
declare
  product_row public.products%rowtype;
  coupon_row public.coupons%rowtype;
  existing_order public.orders%rowtype;
  created_order public.orders%rowtype;
  created_attempt public.payment_attempts%rowtype;
  account_user_id uuid;
  normalized_checkout_email text;
  discount numeric(12,2) := 0;
  gateway numeric(12,2) := 0;
  calculated_total numeric(12,2);
  invoice text;
  reference text;
begin
  if p_checkout_request_id is null then raise exception 'checkout_request_id_required'; end if;
  if p_provider_mode not in ('sandbox', 'live') then raise exception 'invalid_provider_mode'; end if;
  if jsonb_typeof(p_customer) <> 'object' then raise exception 'invalid_customer'; end if;

  normalized_checkout_email := nullif(lower(btrim(p_customer ->> 'email')), '');
  if normalized_checkout_email is null
    or normalized_checkout_email !~ '^[^[:space:]@]+@[^[:space:]@]+[.][^[:space:]@]+$'
    or char_length(coalesce(nullif(btrim(p_customer ->> 'name'), ''), '')) < 2
    or char_length(coalesce(nullif(btrim(p_customer ->> 'phone'), ''), '')) not between 8 and 20
    or char_length(coalesce(nullif(btrim(p_customer ->> 'whatsappNumber'), ''), '')) not between 8 and 20
    or char_length(coalesce(nullif(btrim(p_customer ->> 'occupation'), ''), '')) not between 1 and 100
    or char_length(coalesce(nullif(btrim(p_customer ->> 'city'), ''), '')) not between 1 and 100
  then
    raise exception 'invalid_customer';
  end if;

  select * into existing_order
  from public.orders o
  where o.checkout_request_id = p_checkout_request_id;
  if existing_order.id is not null then
    if existing_order.normalized_email <> normalized_checkout_email
      or existing_order.product_slug_snapshot <> p_product_slug then
      raise exception 'idempotency_conflict';
    end if;
    select * into created_attempt
    from public.payment_attempts pa
    where pa.order_id = existing_order.id
    order by pa.created_at desc
    limit 1;
    return query select existing_order.id, created_attempt.id, existing_order.invoice_number,
      existing_order.total_amount, existing_order.currency,
      existing_order.gateway_fee_mode_snapshot, existing_order.provider_reference,
      existing_order.product_slug_snapshot;
    return;
  end if;

  select * into product_row
  from public.products p
  where p.slug = p_product_slug
    and p.product_type = 'course'
    and p.currency = 'BDT'
    and p.is_published
  for share;
  if product_row.id is null then raise exception 'product_not_found'; end if;

  if p_authenticated_user_id is not null then
    select id into account_user_id
    from auth.users
    where id = p_authenticated_user_id
      and email_confirmed_at is not null
      and lower(btrim(email)) = normalized_checkout_email;
    if account_user_id is null then raise exception 'authenticated_email_mismatch'; end if;
  else
    select id into account_user_id
    from auth.users
    where email_confirmed_at is not null
      and lower(btrim(email)) = normalized_checkout_email
    limit 1;
  end if;

  if account_user_id is not null and exists (
    select 1 from public.enrollments
    where user_id = account_user_id
      and product_id = product_row.id
      and status = 'active'
  ) then
    raise exception 'already_enrolled';
  end if;

  if p_coupon_code is not null and btrim(p_coupon_code) <> '' then
    select * into coupon_row
    from public.coupons c
    where c.product_id = product_row.id
      and upper(c.code) = upper(btrim(p_coupon_code))
      and c.is_active
      and (c.starts_at is null or c.starts_at <= now())
      and (c.ends_at is null or c.ends_at >= now())
    for update;
    if coupon_row.id is null then raise exception 'invalid_coupon'; end if;
    if coupon_row.max_redemptions is not null and (
      select count(*) from public.coupon_redemptions where coupon_id = coupon_row.id
    ) >= coupon_row.max_redemptions then raise exception 'coupon_exhausted'; end if;
    if (
      select count(*) from public.coupon_redemptions
      where coupon_id = coupon_row.id and normalized_email = normalized_checkout_email
    ) >= coupon_row.max_redemptions_per_user then raise exception 'coupon_user_limit'; end if;
    discount := case
      when coupon_row.discount_type = 'percent' then round(product_row.price * coupon_row.discount_value / 100, 2)
      else least(product_row.price, coupon_row.discount_value)
    end;
  end if;

  if product_row.gateway_fee_mode = 'customer' then
    gateway := round((product_row.price - discount) * 0.02, 2);
  end if;
  calculated_total := product_row.price - discount + gateway;
  if calculated_total <= 0 then raise exception 'zero_total_not_supported'; end if;

  invoice := 'AA-' || upper(replace(gen_random_uuid()::text, '-', ''));
  reference := invoice;

  insert into public.orders (
    invoice_number, checkout_request_id, user_id, status, payment_state,
    subtotal, discount_amount, gateway_fee, total_amount, currency,
    customer_snapshot, normalized_email, coupon_code,
    product_id_snapshot, product_slug_snapshot, product_type_snapshot,
    product_title_snapshot, compare_at_price_snapshot, gateway_fee_mode_snapshot,
    provider_mode, provider_reference, expires_at, next_reconciliation_at
  ) values (
    invoice, p_checkout_request_id, account_user_id, 'pending', 'pending_payment',
    product_row.price, discount, gateway, calculated_total, 'BDT',
    jsonb_build_object(
      'name', btrim(p_customer ->> 'name'),
      'email', normalized_checkout_email,
      'phone', btrim(p_customer ->> 'phone'),
      'whatsappNumber', btrim(p_customer ->> 'whatsappNumber'),
      'occupation', btrim(p_customer ->> 'occupation'),
      'city', btrim(p_customer ->> 'city')
    ),
    normalized_checkout_email, nullif(upper(btrim(p_coupon_code)), ''),
    product_row.id, product_row.slug, product_row.product_type,
    product_row.title, product_row.compare_at_price, product_row.gateway_fee_mode,
    p_provider_mode, reference, now() + interval '24 hours', now() + interval '10 minutes'
  )
  on conflict (checkout_request_id) where checkout_request_id is not null do nothing
  returning * into created_order;

  if created_order.id is null then
    select * into existing_order
    from public.orders o
    where o.checkout_request_id = p_checkout_request_id;
    if existing_order.normalized_email <> normalized_checkout_email
      or existing_order.product_slug_snapshot <> p_product_slug then
      raise exception 'idempotency_conflict';
    end if;
    select * into created_attempt from public.payment_attempts pa
    where pa.order_id = existing_order.id order by pa.created_at desc limit 1;
    return query select existing_order.id, created_attempt.id, existing_order.invoice_number,
      existing_order.total_amount, existing_order.currency,
      existing_order.gateway_fee_mode_snapshot, existing_order.provider_reference,
      existing_order.product_slug_snapshot;
    return;
  end if;

  insert into public.order_items (order_id, product_id, title_snapshot, unit_price, line_total)
  values (created_order.id, product_row.id, product_row.title, product_row.price, product_row.price);

  insert into public.payment_attempts (
    order_id, requested_amount, currency, provider_reference, provider_status
  ) values (
    created_order.id, created_order.total_amount, 'BDT', reference, 'processing'
  ) returning * into created_attempt;

  if coupon_row.id is not null then
    insert into public.coupon_redemptions (
      coupon_id, user_id, normalized_email, order_id, discount_amount
    ) values (
      coupon_row.id, account_user_id, normalized_checkout_email, created_order.id, discount
    );
  end if;

  return query select created_order.id, created_attempt.id, created_order.invoice_number,
    created_order.total_amount, created_order.currency,
    created_order.gateway_fee_mode_snapshot, created_order.provider_reference,
    created_order.product_slug_snapshot;
end;
$$;

create or replace function public.record_paystation_verification(
  p_invoice_number text,
  p_provider_invoice_number text,
  p_provider_transaction_id text,
  p_verified_amount numeric,
  p_provider_currency text,
  p_provider_reference text,
  p_provider_status text,
  p_provider_status_code text,
  p_request_successful boolean,
  p_response_snapshot jsonb,
  p_source text
)
returns table (
  payment_state text,
  course_slug text,
  entitled_user_id uuid,
  diagnostic_code text,
  idempotent boolean
)
language plpgsql
security definer
set search_path = ''
as $$
declare
  order_row public.orders%rowtype;
  attempt_row public.payment_attempts%rowtype;
  item_row public.order_items%rowtype;
  matched_user_id uuid;
  checkout_email text;
  invoice_matches boolean;
  amount_matches boolean;
  currency_matches boolean;
  reference_matches boolean;
  diagnostic text;
  was_idempotent boolean := false;
begin
  if p_source not in ('callback', 'return', 'reconciliation', 'admin', 'test') then
    raise exception 'invalid_verification_source';
  end if;
  if p_provider_status not in ('processing', 'success', 'failed', 'refund') then
    raise exception 'invalid_provider_status';
  end if;

  select * into order_row
  from public.orders
  where invoice_number = p_invoice_number
  for update;
  if order_row.id is null then raise exception 'order_not_found'; end if;
  checkout_email := coalesce(
    order_row.normalized_email,
    nullif(lower(btrim(order_row.customer_snapshot ->> 'email')), '')
  );

  select * into attempt_row
  from public.payment_attempts
  where order_id = order_row.id
  order by created_at desc
  limit 1
  for update;
  if attempt_row.id is null then raise exception 'payment_attempt_not_found'; end if;

  invoice_matches := p_provider_invoice_number = order_row.invoice_number;
  amount_matches := p_verified_amount is not null and p_verified_amount = order_row.total_amount;
  currency_matches := case
    when p_provider_currency is null then null
    else upper(p_provider_currency) = order_row.currency
  end;
  reference_matches := case
    when p_provider_reference is null or btrim(p_provider_reference) = '' or order_row.provider_reference is null then null
    else p_provider_reference = order_row.provider_reference
  end;

  update public.orders set
    last_verification_at = now(),
    next_reconciliation_at = case
      when p_provider_status in ('processing', 'failed') then now() + interval '10 minutes'
      else null
    end,
    verification_count = verification_count + 1,
    updated_at = now()
  where id = order_row.id;

  update public.payment_attempts set
    callback_received_at = case when p_source in ('callback', 'return') then coalesce(callback_received_at, now()) else callback_received_at end,
    provider_status = p_provider_status,
    provider_status_code = p_provider_status_code,
    provider_reference = coalesce(nullif(p_provider_reference, ''), provider_reference),
    verification_source = p_source,
    verification_count = verification_count + 1,
    last_verified_at = now(),
    raw_response = coalesce(p_response_snapshot, '{}'::jsonb),
    updated_at = now()
  where id = attempt_row.id;

  if not p_request_successful then diagnostic := 'provider_request_failed'; end if;
  if diagnostic is null and not invoice_matches then diagnostic := 'invoice_mismatch'; end if;
  if diagnostic is null and p_provider_status = 'success' and not amount_matches then diagnostic := 'amount_mismatch'; end if;
  if diagnostic is null and p_provider_status = 'success' and currency_matches is false then diagnostic := 'currency_mismatch'; end if;
  if diagnostic is null and p_provider_status = 'success' and reference_matches is false then diagnostic := 'reference_mismatch'; end if;
  if diagnostic is null and p_provider_status = 'success' and nullif(btrim(p_provider_transaction_id), '') is null then diagnostic := 'transaction_id_missing'; end if;

  if diagnostic is null and p_provider_status = 'success' then
    perform pg_advisory_xact_lock(hashtextextended(p_provider_transaction_id, 0));
    if exists (
      select 1 from public.payment_attempts
      where provider = 'paystation'
        and provider_transaction_id = p_provider_transaction_id
        and order_id <> order_row.id
    ) then
      diagnostic := 'transaction_id_reused';
    end if;
  end if;

  if diagnostic is null and p_provider_status = 'processing' then
    if order_row.payment_state not in ('verified_paid', 'paid_unclaimed', 'refunded') then
      update public.orders set status = 'processing', payment_state = 'processing', updated_at = now()
      where id = order_row.id;
      update public.payment_attempts set status = 'processing', diagnostic_code = null where id = attempt_row.id;
      order_row.payment_state := 'processing';
    else
      was_idempotent := true;
    end if;
  elsif diagnostic is null and p_provider_status = 'failed' then
    if order_row.payment_state not in ('verified_paid', 'paid_unclaimed', 'refunded') then
      update public.orders set status = 'failed', payment_state = 'failed', updated_at = now()
      where id = order_row.id;
      update public.payment_attempts set status = 'failed', diagnostic_code = null where id = attempt_row.id;
      order_row.payment_state := 'failed';
    else
      was_idempotent := true;
    end if;
  elsif diagnostic is null and p_provider_status = 'refund' then
    update public.orders set status = 'refunded', payment_state = 'refunded', refunded_at = coalesce(refunded_at, now()), updated_at = now()
    where id = order_row.id;
    update public.payment_attempts set status = 'refunded', provider_transaction_id = nullif(btrim(p_provider_transaction_id), ''), verified_amount = p_verified_amount, verified_at = now(), diagnostic_code = null where id = attempt_row.id;
    update public.paid_entitlements set status = 'refunded', updated_at = now() where order_id = order_row.id;
    update public.enrollments set status = 'refunded', updated_at = now() where order_id = order_row.id;
    order_row.payment_state := 'refunded';
  elsif diagnostic is null and p_provider_status = 'success' then
    if order_row.payment_state in ('verified_paid', 'paid_unclaimed')
      and attempt_row.provider_transaction_id = p_provider_transaction_id then
      was_idempotent := true;
    else
      select id into matched_user_id
      from auth.users
      where id = order_row.user_id
        and email_confirmed_at is not null
        and lower(btrim(email)) = checkout_email;

      if matched_user_id is null then
        select id into matched_user_id
        from auth.users
        where email_confirmed_at is not null
          and lower(btrim(email)) = checkout_email
        limit 1;
      end if;

      update public.payment_attempts set
        provider_transaction_id = p_provider_transaction_id,
        status = 'paid',
        verified_amount = p_verified_amount,
        currency = order_row.currency,
        verified_at = now(),
        diagnostic_code = null,
        updated_at = now()
      where id = attempt_row.id;

      update public.orders set
        user_id = matched_user_id,
        status = 'paid',
        payment_state = case when matched_user_id is null then 'paid_unclaimed' else 'verified_paid' end,
        paid_at = coalesce(paid_at, now()),
        updated_at = now()
      where id = order_row.id;

      select * into item_row
      from public.order_items where order_id = order_row.id order by id limit 1;

      if order_row.product_type_snapshot = 'course' or exists (
        select 1 from public.products where id = item_row.product_id and product_type = 'course'
      ) then
        insert into public.paid_entitlements (
          order_id, product_id, normalized_email, user_id, status, claimed_at
        ) values (
          order_row.id,
          coalesce(order_row.product_id_snapshot, item_row.product_id),
          checkout_email,
          matched_user_id,
          case when matched_user_id is null then 'unclaimed' else 'claimed' end,
          case when matched_user_id is null then null else now() end
        )
        on conflict (order_id) do update set
          user_id = excluded.user_id,
          status = excluded.status,
          claimed_at = excluded.claimed_at,
          updated_at = now();

        if matched_user_id is not null then
          insert into public.enrollments (user_id, product_id, order_id, status, access_starts_at)
          values (matched_user_id, coalesce(order_row.product_id_snapshot, item_row.product_id), order_row.id, 'active', now())
          on conflict (user_id, product_id) do update set
            status = 'active',
            access_starts_at = coalesce(public.enrollments.access_starts_at, now()),
            updated_at = now();
        end if;
      end if;

      update public.coupon_redemptions
      set user_id = coalesce(user_id, matched_user_id)
      where order_id = order_row.id;

      insert into public.email_outbox (idempotency_key, template_key, recipient_email, payload)
      values (
        'receipt:' || order_row.id,
        'payment_receipt',
        checkout_email,
        jsonb_build_object('orderId', order_row.id, 'invoice', order_row.invoice_number, 'amount', order_row.total_amount)
      ) on conflict (idempotency_key) do nothing;

      order_row.payment_state := case when matched_user_id is null then 'paid_unclaimed' else 'verified_paid' end;
      order_row.user_id := matched_user_id;
    end if;
  end if;

  if diagnostic is not null then
    update public.payment_attempts set diagnostic_code = diagnostic where id = attempt_row.id;
  end if;

  insert into public.payment_verification_events (
    order_id, payment_attempt_id, source, request_successful,
    provider_status, provider_status_code, provider_invoice_number,
    provider_transaction_id, provider_reference, verified_amount,
    provider_currency, invoice_matches, amount_matches, currency_matches,
    reference_matches, diagnostic_code, response_snapshot
  ) values (
    order_row.id, attempt_row.id, p_source, p_request_successful,
    p_provider_status, p_provider_status_code, p_provider_invoice_number,
    nullif(btrim(p_provider_transaction_id), ''), nullif(btrim(p_provider_reference), ''), p_verified_amount,
    nullif(upper(btrim(p_provider_currency)), ''), invoice_matches, amount_matches, currency_matches,
    reference_matches, diagnostic, coalesce(p_response_snapshot, '{}'::jsonb)
  );

  return query select order_row.payment_state,
    coalesce(order_row.product_slug_snapshot, (
      select p.slug from public.order_items oi join public.products p on p.id = oi.product_id
      where oi.order_id = order_row.id order by oi.id limit 1
    )),
    order_row.user_id,
    diagnostic,
    was_idempotent;
end;
$$;

create or replace function public.claim_paid_course_orders(p_user_id uuid)
returns table (
  order_id bigint,
  invoice_number text,
  course_slug text,
  newly_claimed boolean
)
language plpgsql
security definer
set search_path = ''
as $$
declare
  caller_id uuid := p_user_id;
  caller_email text;
  entitlement_row record;
begin
  if caller_id is null then raise exception 'user_id_required'; end if;

  select lower(btrim(email)) into caller_email
  from auth.users
  where id = caller_id and email_confirmed_at is not null;
  if caller_email is null then raise exception 'verified_email_required'; end if;

  for entitlement_row in
    select e.id as entitlement_id, e.order_id, e.product_id, e.status,
      o.invoice_number, p.slug
    from public.paid_entitlements e
    join public.orders o on o.id = e.order_id
    join public.products p on p.id = e.product_id
    where e.normalized_email = caller_email
      and e.status in ('unclaimed', 'claimed')
      and (e.user_id is null or e.user_id = caller_id)
      and o.status = 'paid'
      and o.payment_state in ('paid_unclaimed', 'verified_paid')
    order by e.order_id
    for update of e, o
  loop
    update public.paid_entitlements set
      user_id = caller_id,
      status = 'claimed',
      claimed_at = coalesce(claimed_at, now()),
      updated_at = now()
    where id = entitlement_row.entitlement_id;

    update public.orders set
      user_id = caller_id,
      payment_state = 'verified_paid',
      updated_at = now()
    where id = entitlement_row.order_id;

    insert into public.enrollments (user_id, product_id, order_id, status, access_starts_at)
    values (caller_id, entitlement_row.product_id, entitlement_row.order_id, 'active', now())
    on conflict (user_id, product_id) do update set
      status = 'active',
      access_starts_at = coalesce(public.enrollments.access_starts_at, now()),
      updated_at = now();

    update public.coupon_redemptions cr
    set user_id = coalesce(cr.user_id, caller_id)
    where cr.order_id = entitlement_row.order_id;

    order_id := entitlement_row.order_id;
    invoice_number := entitlement_row.invoice_number;
    course_slug := entitlement_row.slug;
    newly_claimed := entitlement_row.status = 'unclaimed';
    return next;
  end loop;
end;
$$;

revoke all on function public.quote_guest_course_checkout(text, text, text, uuid) from public, anon, authenticated;
revoke all on function public.create_guest_course_order(text, jsonb, text, uuid, uuid, text) from public, anon, authenticated;
revoke all on function public.record_paystation_verification(text, text, text, numeric, text, text, text, text, boolean, jsonb, text) from public, anon, authenticated;
revoke all on function public.claim_paid_course_orders(uuid) from public, anon, authenticated;

grant execute on function public.quote_guest_course_checkout(text, text, text, uuid) to service_role;
grant execute on function public.create_guest_course_order(text, jsonb, text, uuid, uuid, text) to service_role;
grant execute on function public.record_paystation_verification(text, text, text, numeric, text, text, text, text, boolean, jsonb, text) to service_role;
grant execute on function public.claim_paid_course_orders(uuid) to service_role;

revoke execute on function private.protect_order_payment_snapshot() from public, anon, authenticated, service_role;
revoke execute on function private.prevent_payment_verification_event_mutation() from public, anon, authenticated, service_role;
