-- Per-module live sessions and staff-managed learner progress.
-- Apply after 20260821150135_add_tax_brief_subscribers.sql.

create table public.class_sessions (
  id bigint generated always as identity primary key,
  batch_id bigint not null references public.batches(id) on delete cascade,
  module_id bigint not null references public.modules(id) on delete cascade,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  meet_url text,
  calendar_url text,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint class_sessions_dates_ordered check (ends_at >= starts_at)
);

create index class_sessions_batch_starts_idx on public.class_sessions (batch_id, starts_at);
create index class_sessions_module_id_idx on public.class_sessions (module_id);

create table public.module_progress (
  id bigint generated always as identity primary key,
  enrollment_id bigint not null references public.enrollments(id) on delete cascade,
  module_id bigint not null references public.modules(id) on delete cascade,
  completed_at timestamptz not null default now(),
  marked_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (enrollment_id, module_id)
);

create index module_progress_module_id_idx on public.module_progress (module_id);
create index module_progress_enrollment_id_idx on public.module_progress (enrollment_id);

alter table public.class_sessions enable row level security;
alter table public.module_progress enable row level security;

create policy class_sessions_enrolled_or_staff on public.class_sessions for select to authenticated using (
  (select private.is_staff())
  or exists (
    select 1 from public.enrollments e
    where e.batch_id = class_sessions.batch_id
      and e.user_id = (select auth.uid())
      and e.status = 'active'
  )
);

create policy class_sessions_staff_manage on public.class_sessions for all to authenticated using (
  (select private.is_staff())
) with check ((select private.is_staff()));

create policy module_progress_self_or_staff on public.module_progress for select to authenticated using (
  (select private.is_staff())
  or exists (
    select 1 from public.enrollments e
    where e.id = module_progress.enrollment_id
      and e.user_id = (select auth.uid())
  )
);

create policy module_progress_staff_manage on public.module_progress for all to authenticated using (
  (select private.is_staff())
) with check ((select private.is_staff()));

grant select on public.class_sessions, public.module_progress to authenticated;
grant insert, update, delete on public.class_sessions, public.module_progress to authenticated;
grant usage, select on all sequences in schema public to authenticated, service_role;

create trigger class_sessions_audit after insert or update or delete on public.class_sessions for each row execute function private.audit_row_change();
create trigger module_progress_audit after insert or update or delete on public.module_progress for each row execute function private.audit_row_change();
