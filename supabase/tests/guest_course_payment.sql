begin;

do $test$
declare
  course_product_id bigint;
  first_order record;
  replay_order record;
  expired_order record;
  refund_order record;
  result_row record;
  claim_row record;
  claimant uuid := '11111111-1111-4111-8111-111111111111';
  enrolled_user uuid := '22222222-2222-4222-8222-222222222222';
  duplicate_invoice_blocked boolean := false;
begin
  select id into course_product_id from public.products where slug = 'income-tax-working-framework';

  select * into first_order from public.create_guest_course_order(
    'income-tax-working-framework',
    '{"name":"Guest Learner","email":"guest.payment.test@example.com","phone":"01700000000","whatsappNumber":"01700000000","occupation":"Accountant","city":"Dhaka"}',
    null, 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', null, 'sandbox'
  );
  if first_order.order_id is null or exists (
    select 1 from public.enrollments where order_id = first_order.order_id
  ) then raise exception 'pending_guest_order_invalid'; end if;

  if (select order_id from public.create_guest_course_order(
    'income-tax-working-framework',
    '{"name":"Changed Browser Data","email":"guest.payment.test@example.com","phone":"01999999999","whatsappNumber":"01999999999","occupation":"Changed","city":"Chattogram"}',
    'CHANGED', 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', null, 'sandbox'
  )) <> first_order.order_id then raise exception 'duplicate_request_created_order'; end if;
  if (select customer_snapshot ->> 'name' from public.orders where id = first_order.order_id)
      <> 'Guest Learner'
    or (select coupon_code from public.orders where id = first_order.order_id) is not null
  then raise exception 'duplicate_request_mutated_snapshot'; end if;

  begin
    insert into public.orders (invoice_number, subtotal, total_amount, customer_snapshot)
    values (first_order.invoice_number, 1, 1, '{"email":"duplicate@example.com"}');
  exception when unique_violation then duplicate_invoice_blocked := true;
  end;
  if not duplicate_invoice_blocked then raise exception 'duplicate_invoice_allowed'; end if;

  select * into expired_order from public.create_guest_course_order(
    'income-tax-working-framework',
    '{"name":"Expired Learner","email":"expired.payment.test@example.com","phone":"01700000009","whatsappNumber":"01700000009","occupation":"Accountant","city":"Dhaka"}',
    null, 'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee', null, 'sandbox'
  );
  update public.orders set status = 'cancelled', payment_state = 'expired'
  where id = expired_order.order_id;
  if exists (select 1 from public.enrollments where order_id = expired_order.order_id)
    then raise exception 'expired_order_fulfilled'; end if;
  select * into result_row from public.record_paystation_verification(
    expired_order.invoice_number, expired_order.invoice_number, 'TRX-EXPIRED-LATE',
    expired_order.total_amount, null, expired_order.provider_reference,
    'success', '200', true, '{}', 'test'
  );
  if result_row.payment_state <> 'paid_unclaimed' then
    raise exception 'later_success_after_expiry_not_fulfilled';
  end if;

  insert into auth.users (
    id, aud, role, email, email_confirmed_at, raw_app_meta_data, raw_user_meta_data,
    created_at, updated_at, is_sso_user, is_anonymous
  ) values (
    enrolled_user, 'authenticated', 'authenticated', 'enrolled.payment.test@example.com',
    now(), '{}', '{}', now(), now(), false, false
  );
  insert into public.enrollments (user_id, product_id, status, access_starts_at)
  values (enrolled_user, course_product_id, 'active', now());

  begin
    perform * from public.create_guest_course_order(
      'income-tax-working-framework',
      '{"name":"Existing Learner","email":"enrolled.payment.test@example.com","phone":"01700000001","whatsappNumber":"01700000001","occupation":"Lawyer","city":"Dhaka"}',
      null, 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', enrolled_user, 'sandbox'
    );
    raise exception 'already_enrolled_not_blocked';
  exception when others then
    if sqlerrm not like '%already_enrolled%' then raise; end if;
  end;

  select * into result_row from public.record_paystation_verification(
    first_order.invoice_number, first_order.invoice_number, 'TRX-AMOUNT',
    first_order.total_amount - 1, null, first_order.provider_reference,
    'success', '200', true, '{}', 'test'
  );
  if result_row.diagnostic_code <> 'amount_mismatch' or exists (
    select 1 from public.enrollments where order_id = first_order.order_id
  ) then raise exception 'amount_mismatch_fulfilled'; end if;

  select * into result_row from public.record_paystation_verification(
    first_order.invoice_number, first_order.invoice_number, '', first_order.total_amount,
    null, first_order.provider_reference, 'processing', '200', true, '{}', 'test'
  );
  if result_row.payment_state <> 'processing' then raise exception 'processing_invalid'; end if;

  select * into result_row from public.record_paystation_verification(
    first_order.invoice_number, first_order.invoice_number, '', first_order.total_amount,
    null, first_order.provider_reference, 'failed', '200', true, '{}', 'test'
  );
  if result_row.payment_state <> 'failed' or exists (
    select 1 from public.enrollments where order_id = first_order.order_id
  ) then raise exception 'failed_fulfilled'; end if;

  select * into result_row from public.record_paystation_verification(
    first_order.invoice_number, first_order.invoice_number, 'TRX-PRIMARY',
    first_order.total_amount, null, first_order.provider_reference,
    'success', '200', true, '{}', 'test'
  );
  if result_row.payment_state <> 'paid_unclaimed' or (
    select count(*) from public.paid_entitlements where order_id = first_order.order_id
  ) <> 1 then raise exception 'paid_unclaimed_missing'; end if;

  select * into result_row from public.record_paystation_verification(
    first_order.invoice_number, first_order.invoice_number, 'TRX-PRIMARY',
    first_order.total_amount, null, first_order.provider_reference,
    'success', '200', true, '{}', 'test'
  );
  if not result_row.idempotent or (
    select count(*) from public.paid_entitlements where order_id = first_order.order_id
  ) <> 1 then raise exception 'duplicate_callback_not_idempotent'; end if;

  -- A failed signup creates no auth.users row; the paid entitlement remains durable.
  if (select payment_state from public.orders where id = first_order.order_id) <> 'paid_unclaimed'
    then raise exception 'signup_failure_lost_payment'; end if;

  select * into replay_order from public.create_guest_course_order(
    'income-tax-working-framework',
    '{"name":"Replay Learner","email":"replay.payment.test@example.com","phone":"01700000002","whatsappNumber":"01700000002","occupation":"Consultant","city":"Dhaka"}',
    null, 'cccccccc-cccc-4ccc-8ccc-cccccccccccc', null, 'sandbox'
  );
  select * into result_row from public.record_paystation_verification(
    replay_order.invoice_number, replay_order.invoice_number, 'TRX-PRIMARY',
    replay_order.total_amount, null, replay_order.provider_reference,
    'success', '200', true, '{}', 'test'
  );
  if result_row.diagnostic_code <> 'transaction_id_reused'
    then raise exception 'replay_not_blocked'; end if;

  insert into auth.users (
    id, aud, role, email, email_confirmed_at, raw_app_meta_data, raw_user_meta_data,
    created_at, updated_at, is_sso_user, is_anonymous
  ) values (
    claimant, 'authenticated', 'authenticated', 'guest.payment.test@example.com',
    now(), '{}', '{}', now(), now(), false, false
  );
  perform set_config('request.jwt.claim.sub', claimant::text, true);

  select * into claim_row from public.claim_paid_course_orders(claimant);
  if claim_row.order_id <> first_order.order_id or not claim_row.newly_claimed
    then raise exception 'claim_failed'; end if;
  select * into claim_row from public.claim_paid_course_orders(claimant);
  if claim_row.order_id <> first_order.order_id or claim_row.newly_claimed
    then raise exception 'repeat_claim_failed'; end if;
  if (select count(*) from public.enrollments e where e.user_id = claimant and e.product_id = course_product_id) <> 1
    then raise exception 'claim_duplicate_enrollment'; end if;

  select * into refund_order from public.create_guest_course_order(
    'income-tax-working-framework',
    '{"name":"Refund Learner","email":"refund.payment.test@example.com","phone":"01700000003","whatsappNumber":"01700000003","occupation":"Student","city":"Dhaka"}',
    null, 'dddddddd-dddd-4ddd-8ddd-dddddddddddd', null, 'sandbox'
  );
  select * into result_row from public.record_paystation_verification(
    refund_order.invoice_number, refund_order.invoice_number, 'TRX-REFUND',
    refund_order.total_amount, null, refund_order.provider_reference,
    'refund', '200', true, '{}', 'test'
  );
  if result_row.payment_state <> 'refunded' or exists (
    select 1 from public.enrollments where order_id = refund_order.order_id
  ) then raise exception 'refund_fulfilled'; end if;
end
$test$;

select 'passed' as status;
rollback;
