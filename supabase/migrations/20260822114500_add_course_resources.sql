-- Course-specific private materials, displayed separately from module materials.
-- Apply after 20260822103000_add_learning_sessions_and_progress.sql.

create table public.course_resources (
  id bigint generated always as identity primary key,
  course_id bigint not null references public.courses(id) on delete cascade,
  title text not null,
  bucket_id text not null default 'course-files',
  object_path text not null,
  mime_type text,
  position integer not null default 0 check (position >= 0),
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (bucket_id, object_path)
);

create index course_resources_course_position_idx on public.course_resources (course_id, position);
alter table public.course_resources enable row level security;

create policy course_resources_enrolled_or_staff on public.course_resources for select to authenticated using (
  (select private.is_staff()) or exists (
    select 1 from public.courses c join public.enrollments e on e.product_id = c.product_id
    where c.id = course_resources.course_id and e.user_id = (select auth.uid()) and e.status = 'active'
  )
);
create policy course_resources_staff_manage on public.course_resources for all to authenticated using ((select private.is_staff())) with check ((select private.is_staff()));

grant select, insert, update, delete on public.course_resources to authenticated;
grant usage, select on sequence public.course_resources_id_seq to authenticated;
create trigger course_resources_audit after insert or update or delete on public.course_resources for each row execute function private.audit_row_change();
