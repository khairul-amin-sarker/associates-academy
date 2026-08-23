create table public.newsletter_subscribers (
  id bigint generated always as identity primary key,
  email text not null unique,
  interests text[] not null default '{}'::text[],
  status text not null default 'subscribed',
  source text not null default 'homepage_tax_brief',
  subscribed_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint newsletter_subscribers_email_normalized check (
    email = lower(email)
    and length(email) between 5 and 320
    and position('@' in email) > 1
  ),
  constraint newsletter_subscribers_interests_allowed check (
    cardinality(interests) between 1 and 4
    and interests <@ array['income-tax', 'vat', 'corporate-compliance', 'courses-workshops']::text[]
  ),
  constraint newsletter_subscribers_status_allowed check (
    status in ('subscribed', 'unsubscribed')
  ),
  constraint newsletter_subscribers_source_length check (
    length(source) between 3 and 80
  )
);

alter table public.newsletter_subscribers enable row level security;

create policy newsletter_subscribers_staff_select
on public.newsletter_subscribers
for select
to authenticated
using ((select private.is_staff()));

create policy newsletter_subscribers_staff_update
on public.newsletter_subscribers
for update
to authenticated
using ((select private.is_staff()))
with check ((select private.is_staff()));

revoke all on public.newsletter_subscribers from anon, authenticated;
grant select, update on public.newsletter_subscribers to authenticated;
grant all on public.newsletter_subscribers to service_role;
grant usage, select on sequence public.newsletter_subscribers_id_seq to service_role;
