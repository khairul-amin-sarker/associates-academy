-- Public catalog policies must never require EXECUTE on private staff helpers.
-- Authenticated staff continue to receive broader access through the existing
-- staff-management policies; anonymous visitors receive published rows only.

drop policy if exists pages_public_select on public.pages;
create policy pages_public_select on public.pages
for select to anon, authenticated
using (status = 'published' and published_content is not null);

drop policy if exists page_sections_public_select on public.page_sections;
create policy page_sections_public_select on public.page_sections
for select to anon, authenticated
using (is_visible and published_content is not null);

drop policy if exists menus_public_select on public.menus;
create policy menus_public_select on public.menus
for select to anon, authenticated
using (is_visible);

drop policy if exists settings_public_select on public.site_settings;
create policy settings_public_select on public.site_settings
for select to anon, authenticated
using (not is_secret);

drop policy if exists media_public_select on public.media_assets;
create policy media_public_select on public.media_assets
for select to anon, authenticated
using (bucket_id = 'cms-public');

drop policy if exists products_public_select on public.products;
create policy products_public_select on public.products
for select to anon, authenticated
using (is_published);

drop policy if exists courses_public_select on public.courses;
create policy courses_public_select on public.courses
for select to anon, authenticated
using (
  exists (
    select 1
    from public.products p
    where p.id = product_id
      and p.is_published
  )
);

drop policy if exists batches_public_select on public.batches;
create policy batches_public_select on public.batches
for select to anon, authenticated
using (is_published);

drop policy if exists modules_preview_or_enrolled on public.modules;
create policy modules_public_preview on public.modules
for select to anon
using (is_preview);

create policy modules_authenticated_preview_or_enrolled on public.modules
for select to authenticated
using (
  is_preview
  or exists (
    select 1
    from public.courses c
    join public.enrollments e on e.product_id = c.product_id
    where c.id = course_id
      and e.user_id = (select auth.uid())
      and e.status = 'active'
  )
);

drop policy if exists ebooks_public_select on public.ebooks;
create policy ebooks_public_select on public.ebooks
for select to anon, authenticated
using (is_published);

drop policy if exists workshops_public_select on public.workshops;
create policy workshops_public_select on public.workshops
for select to anon, authenticated
using (is_published);
