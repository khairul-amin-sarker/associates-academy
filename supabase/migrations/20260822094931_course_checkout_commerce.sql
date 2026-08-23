-- Course checkout: profile completion, course-bound coupons, and safe quotes.
alter table public.profiles
  add column if not exists whatsapp_number text,
  add column if not exists occupation text,
  add column if not exists city text;

alter table public.profiles
  add constraint profiles_whatsapp_number_length
    check (whatsapp_number is null or char_length(whatsapp_number) between 8 and 20) not valid,
  add constraint profiles_occupation_length
    check (occupation is null or char_length(occupation) <= 100) not valid,
  add constraint profiles_city_length
    check (city is null or char_length(city) <= 100) not valid;

alter table public.coupons
  add column if not exists product_id bigint references public.products(id) on delete restrict;

-- Existing global coupons are intentionally left unassigned and cannot be used
-- until an administrator assigns their course. New or edited coupons require one.
alter table public.coupons
  add constraint coupons_product_required check (product_id is not null) not valid;

create index if not exists coupons_product_code_idx
  on public.coupons (product_id, upper(code))
  where product_id is not null;

create or replace function public.quote_checkout(
  p_product_slug text,
  p_coupon_code text default null
)
returns table (
  subtotal numeric,
  discount_amount numeric,
  gateway_fee numeric,
  total_amount numeric,
  currency text
)
language plpgsql
security definer
set search_path = ''
as $$
declare
  product_row public.products%rowtype;
  coupon_row public.coupons%rowtype;
  calculated_discount numeric(12,2) := 0;
  calculated_gateway numeric(12,2) := 0;
  calculated_total numeric(12,2);
begin
  if (select auth.uid()) is null then
    raise exception 'authentication_required';
  end if;

  select * into product_row
  from public.products
  where slug = p_product_slug and product_type = 'course' and is_published;

  if product_row.id is null then
    raise exception 'product_not_found';
  end if;

  if p_coupon_code is not null and trim(p_coupon_code) <> '' then
    select * into coupon_row
    from public.coupons
    where product_id = product_row.id
      and upper(code) = upper(trim(p_coupon_code))
      and is_active
      and (starts_at is null or starts_at <= now())
      and (ends_at is null or ends_at >= now());

    if coupon_row.id is null then
      raise exception 'invalid_coupon';
    end if;
    if coupon_row.max_redemptions is not null
      and (select count(*) from public.coupon_redemptions where coupon_id = coupon_row.id) >= coupon_row.max_redemptions then
      raise exception 'coupon_exhausted';
    end if;
    if (select count(*) from public.coupon_redemptions where coupon_id = coupon_row.id and user_id = (select auth.uid())) >= coupon_row.max_redemptions_per_user then
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

  if calculated_total <= 0 then
    raise exception 'zero_total_not_supported';
  end if;

  return query select product_row.price, calculated_discount, calculated_gateway, calculated_total, product_row.currency;
end;
$$;

create or replace function public.create_order(
  p_product_slug text,
  p_customer jsonb,
  p_coupon_code text default null
)
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
  calculated_total numeric(12,2);
  created_order public.orders%rowtype;
  invoice text;
begin
  if (select auth.uid()) is null then raise exception 'authentication_required'; end if;
  if jsonb_typeof(p_customer) <> 'object'
    or nullif(trim(p_customer ->> 'email'), '') is null
    or nullif(trim(p_customer ->> 'name'), '') is null
    or nullif(trim(p_customer ->> 'phone'), '') is null then
    raise exception 'invalid_customer';
  end if;

  select * into product_row
  from public.products
  where slug = p_product_slug and is_published
  for share;
  if product_row.id is null then raise exception 'product_not_found'; end if;

  if product_row.product_type = 'course' and exists (
    select 1 from public.enrollments
    where user_id = (select auth.uid()) and product_id = product_row.id and status = 'active'
  ) then
    raise exception 'already_enrolled';
  end if;

  if p_coupon_code is not null and trim(p_coupon_code) <> '' then
    select * into coupon_row
    from public.coupons
    where product_id = product_row.id
      and upper(code) = upper(trim(p_coupon_code))
      and is_active
      and (starts_at is null or starts_at <= now())
      and (ends_at is null or ends_at >= now())
    for update;
    if coupon_row.id is null then raise exception 'invalid_coupon'; end if;
    if coupon_row.max_redemptions is not null and (select count(*) from public.coupon_redemptions where coupon_id = coupon_row.id) >= coupon_row.max_redemptions then raise exception 'coupon_exhausted'; end if;
    if (select count(*) from public.coupon_redemptions where coupon_id = coupon_row.id and user_id = (select auth.uid())) >= coupon_row.max_redemptions_per_user then raise exception 'coupon_user_limit'; end if;
    discount := case when coupon_row.discount_type = 'percent' then round(product_row.price * coupon_row.discount_value / 100, 2) else least(product_row.price, coupon_row.discount_value) end;
  end if;

  if product_row.gateway_fee_mode = 'customer' then gateway := round((product_row.price - discount) * 0.02, 2); end if;
  calculated_total := product_row.price - discount + gateway;
  if calculated_total <= 0 then raise exception 'zero_total_not_supported'; end if;

  insert into public.profiles (id, full_name, phone, whatsapp_number, occupation, city)
  values (
    (select auth.uid()),
    nullif(trim(p_customer ->> 'name'), ''),
    nullif(trim(p_customer ->> 'phone'), ''),
    nullif(trim(p_customer ->> 'whatsappNumber'), ''),
    nullif(trim(p_customer ->> 'occupation'), ''),
    nullif(trim(p_customer ->> 'city'), '')
  )
  on conflict (id) do update set
    full_name = excluded.full_name,
    phone = excluded.phone,
    whatsapp_number = excluded.whatsapp_number,
    occupation = excluded.occupation,
    city = excluded.city,
    updated_at = now();

  invoice := 'AA-' || to_char(now() at time zone 'Asia/Dhaka', 'YYYYMMDD') || '-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 10));
  insert into public.orders (invoice_number, user_id, subtotal, discount_amount, gateway_fee, total_amount, customer_snapshot, coupon_code)
  values (invoice, (select auth.uid()), product_row.price, discount, gateway, calculated_total, p_customer, nullif(upper(trim(p_coupon_code)), ''))
  returning * into created_order;
  insert into public.order_items (order_id, product_id, title_snapshot, unit_price, line_total)
  values (created_order.id, product_row.id, product_row.title, product_row.price, product_row.price);
  insert into public.payment_attempts (order_id, requested_amount) values (created_order.id, created_order.total_amount);
  if coupon_row.id is not null then
    insert into public.coupon_redemptions (coupon_id, user_id, order_id, discount_amount)
    values (coupon_row.id, (select auth.uid()), created_order.id, discount);
  end if;
  return query select created_order.id, created_order.invoice_number, created_order.total_amount, created_order.currency;
end;
$$;

revoke all on function public.quote_checkout(text, text) from public, anon, authenticated;
grant execute on function public.quote_checkout(text, text) to authenticated;
revoke all on function public.create_order(text, jsonb, text) from public, anon;
grant execute on function public.create_order(text, jsonb, text) to authenticated;
