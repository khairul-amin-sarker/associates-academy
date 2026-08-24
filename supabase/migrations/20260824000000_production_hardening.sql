-- Production Hardening & Seed Migration for Associates Academy
-- Date: 2026-08-24

-- 1. Fix mutable search_path on generate_workshop_registration_code
create or replace function public.generate_workshop_registration_code()
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  next_val bigint;
  formatted_code text;
begin
  next_val := nextval('public.workshop_reg_code_seq');
  formatted_code := 'WS26-' || lpad(next_val::text, 4, '0');
  return formatted_code;
end;
$$;

-- 2. Elevate lead instructor account to owner role
insert into public.user_roles (user_id, role)
select id, 'owner'
from auth.users
where email = 'khairulamin.lawyer@gmail.com'
on conflict (user_id) do update
set role = 'owner', updated_at = now();

-- 3. Ensure Batches exist for courses
insert into public.batches (course_id, name, starts_at, ends_at, is_published)
select 2, 'Batch 1', '2026-08-30 20:00:00+06'::timestamptz, '2026-09-30 22:00:00+06'::timestamptz, true
where not exists (select 1 from public.batches where course_id = 2);

insert into public.batches (course_id, name, starts_at, ends_at, is_published)
select 1, 'Batch 1', '2026-08-30 20:00:00+06'::timestamptz, '2026-09-30 22:00:00+06'::timestamptz, true
where not exists (select 1 from public.batches where course_id = 1);

-- 4. Seed structured learning modules for Practical Paper Return course (course_id: 2)
insert into public.modules (course_id, title, description, position, is_preview, is_published)
select 2, 'ক্লায়েন্ট ফাইল সেটআপ ও ডকুমেন্টস ভেরিফিকেশন', 'Client Basic Info, Source Documents, Bank Statement, TDS & Advance Tax Challan অডিট ও ক্রস-চেক।', 1, false, true
where not exists (select 1 from public.modules where course_id = 2 and position = 1);

insert into public.modules (course_id, title, description, position, is_preview, is_published)
select 2, 'আয়ের খাত ও করযোগ্য আয় নির্ধারণ', 'Heads of Income, Non-Assessable Income, Business/Profession & Salary Income বিশ্লেষণ ও পরিগণনা।', 2, false, true
where not exists (select 1 from public.modules where course_id = 2 and position = 2);

insert into public.modules (course_id, title, description, position, is_preview, is_published)
select 2, 'ট্যাক্স কম্পিউটেশন, রিবেট ও সমন্বয়', 'Slab Tax, Minimum Tax, Tax Rebate, AIT/TDS Adjustment এবং চূড়ান্ত কর দায় হিসাব।', 3, false, true
where not exists (select 1 from public.modules where course_id = 2 and position = 3);

insert into public.modules (course_id, title, description, position, is_preview, is_published)
select 2, 'আইটি-১০বি ও আইটি-১০বিবি রিকনসিলিয়েশন', 'সম্পদ বিবরণী (Statement of Assets & Liabilities) ও জীবনযাত্রা ব্যয় রিকনসিলিয়েশন।', 4, false, true
where not exists (select 1 from public.modules where course_id = 2 and position = 4);

insert into public.modules (course_id, title, description, position, is_preview, is_published)
select 2, 'পেপার রিটার্ন (IT-11GA) ও এনবিআর ই-রিটার্ন ফাইলিং', 'ফরম IT-11GA পূরণ, A-Challan পেমেন্ট এবং NBR E-Return পোর্টালে নির্ভুল ডাটা এন্ট্রি ও সাবমিশন।', 5, false, true
where not exists (select 1 from public.modules where course_id = 2 and position = 5);

-- 5. Seed structured learning modules for Fundamentals course (course_id: 1)
insert into public.modules (course_id, title, description, position, is_preview, is_published)
select 1, 'আয়কর আইনের ভূমিকা ও মৌলিক কাঠামো', 'Role & Basic Structure of Income Tax Act, 2023', 1, false, true
where not exists (select 1 from public.modules where course_id = 1 and position = 1);

insert into public.modules (course_id, title, description, position, is_preview, is_published)
select 1, 'করযোগ্যতা ও আবাসিক মর্যাদা', 'Taxability, Scope of Income & Residential Status', 2, false, true
where not exists (select 1 from public.modules where course_id = 1 and position = 2);

insert into public.modules (course_id, title, description, position, is_preview, is_published)
select 1, 'আয়ের খাতসমূহ ও করযোগ্য আয় পরিগণনা', 'Heads of Income, Exemptions & Allowable Deductions', 3, false, true
where not exists (select 1 from public.modules where course_id = 1 and position = 3);

insert into public.modules (course_id, title, description, position, is_preview, is_published)
select 1, 'মোট আয়, রেয়াত, করহার ও সারচার্জ', 'Total Income, Tax Rates, Investment Rebate & Surcharge', 4, false, true
where not exists (select 1 from public.modules where course_id = 1 and position = 4);

insert into public.modules (course_id, title, description, position, is_preview, is_published)
select 1, 'উৎসে কর কর্তন (TDS) ও অগ্রিম কর', 'Withholding Tax, TDS Compliance & Advance Tax (AIT)', 5, false, true
where not exists (select 1 from public.modules where course_id = 1 and position = 5);

insert into public.modules (course_id, title, description, position, is_preview, is_published)
select 1, 'রিটার্ন, নিরীক্ষণ, আপিল ও জরিমানা', 'Tax Return Preparation, Audit, Assessment, Appeal & Penalties', 6, false, true
where not exists (select 1 from public.modules where course_id = 1 and position = 6);
