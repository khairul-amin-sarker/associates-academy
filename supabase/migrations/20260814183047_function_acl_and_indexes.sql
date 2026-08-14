-- Tighten SECURITY DEFINER entrypoints after Supabase default function grants (production-applied migration).
-- Public certificate lookup and analytics ingestion are intentionally anonymous;
-- every other capability is granted only to its required application role.

revoke execute on function public.save_page_draft(text, jsonb) from public, anon, authenticated;
revoke execute on function public.publish_page(text, uuid) from public, anon, authenticated;
revoke execute on function public.rollback_page_revision(uuid, uuid) from public, anon, authenticated;
revoke execute on function public.create_order(text, jsonb, text) from public, anon, authenticated;
revoke execute on function public.fulfill_verified_order(text, text, numeric, text, jsonb) from public, anon, authenticated;
revoke execute on function public.ingest_analytics_event(uuid, uuid, text, text, jsonb, timestamptz) from public, anon, authenticated;
revoke execute on function public.claim_email_outbox(integer) from public, anon, authenticated;
revoke execute on function public.verify_certificate_public(text) from public, anon, authenticated;

grant execute on function public.save_page_draft(text, jsonb) to authenticated;
grant execute on function public.publish_page(text, uuid) to authenticated;
grant execute on function public.rollback_page_revision(uuid, uuid) to authenticated;
grant execute on function public.create_order(text, jsonb, text) to authenticated;
grant execute on function public.verify_certificate_public(text) to anon, authenticated;
grant execute on function public.ingest_analytics_event(uuid, uuid, text, text, jsonb, timestamptz) to anon, authenticated;
grant execute on function public.fulfill_verified_order(text, text, numeric, text, jsonb) to service_role;
grant execute on function public.claim_email_outbox(integer) to service_role;

-- Some Supabase projects install this helper automatically while others do not.
-- Harden it when present without making a fresh environment migration fail.
do $$
begin
  if to_regprocedure('public.rls_auto_enable()') is not null then
    execute 'revoke execute on function public.rls_auto_enable() from public, anon, authenticated';
    execute 'grant execute on function public.rls_auto_enable() to service_role';
  end if;
end
$$;

create index if not exists content_revisions_created_by_idx on public.content_revisions(created_by);
create index if not exists coupon_redemptions_user_id_idx on public.coupon_redemptions(user_id);
create index if not exists pages_created_by_idx on public.pages(created_by);
create index if not exists pages_updated_by_idx on public.pages(updated_by);
create index if not exists site_settings_updated_by_idx on public.site_settings(updated_by);
create index if not exists workshops_product_id_idx on public.workshops(product_id);
