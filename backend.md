# Backend

## Supabase

PostgreSQL 17, Auth cookie sessions through `@supabase/ssr`, Storage and PostgREST RPC. `src/proxy.ts` refreshes sessions with `getClaims`; server authorization never trusts `getSession` or user-editable metadata.

## Schema groups

- Identity: profiles, user_roles, admin_audit_logs
- CMS: pages, page_sections, content_revisions, menus, site_settings, media_assets
- Learning: products, courses, batches, modules, module_resources, enrollments
- Commerce: orders, order_items, payment_attempts, coupons, coupon_redemptions
- Products: ebooks, workshops, workshop_registrations
- Certificates: certificates and public verification RPC
- Operations: email_outbox, email_delivery_logs, integration_runs
- Analytics: sessions, events, daily rollups, ad campaign metrics, preferences

All foreign keys used in joins/RLS are indexed. Monetary values use numeric; timestamps use timestamptz. Every exposed table has explicit grants and RLS.

## Storage

- `cms-public`: public read, staff write
- `course-files`, `ebooks`, `certificates`: private and entitlement/owner restricted
- `avatars`: private user-owned paths

Upload flow: server validates request → signed direct upload → server verifies object metadata → media row/audit.

## Important RPCs

- `save_page_draft`, `publish_page`, `rollback_page_revision`
- `create_order`, `fulfill_verified_order`
- `verify_certificate_public`
- `ingest_analytics_event`
- `claim_email_outbox`
