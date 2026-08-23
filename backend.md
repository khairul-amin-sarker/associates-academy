# Backend

## Supabase

PostgreSQL 17, Auth cookie sessions through `@supabase/ssr`, Storage and PostgREST RPC. `src/proxy.ts` refreshes sessions with `getClaims`; server authorization never trusts `getSession` or user-editable metadata.

## Schema groups

- Identity: profiles, user_roles, admin_audit_logs
- CMS: pages, page_sections, content_revisions, menus, site_settings, media_assets
- Learning: products, courses, batches, modules, `class_sessions`, `module_resources`, `course_resources`, enrollments, `module_progress`
- Identity: profiles, user_roles, admin_audit_logs
- CMS: pages, page_sections, content_revisions, menus, site_settings, media_assets
- Learning: products, courses, batches, modules, `class_sessions`, `module_resources`, `course_resources`, enrollments, `module_progress`
- Commerce: orders, order_items, payment_attempts, append-only payment_verification_events, paid_entitlements, coupons, coupon_redemptions
- Products: ebooks, workshops, `workshop_registrations_v2`
- Certificates: certificates and public verification RPC
- Operations: email_outbox, email_delivery_logs, integration_runs
- Audience: newsletter_subscribers with normalized unique email, constrained interest slugs and subscription status
- Analytics: sessions, events, daily rollups, ad campaign metrics, preferences

All foreign keys used in joins/RLS are indexed. Monetary values use numeric; timestamps use timestamptz. Every exposed table has explicit grants and RLS.

`workshops` maintains live event scheduling, capacity, status (`registration_open`, `registration_closed`, etc.), platform, private Meet URL, and course CTA URLs. `workshop_registrations_v2` is decoupled from `auth.users` to support friction-free anonymous public registrations with unique `(workshop_id, normalized_mobile)` deduplication, flat UTM attribution tracking, lifecycle statuses (`attendance_status`, `lead_status`, `course_conversion_status`), and auto-generated `WS26-XXXX` codes via sequence `workshop_reg_code_seq`.

Each coupon is assigned to one `products` row. Course checkout uses service-only `quote_guest_course_checkout` and `create_guest_course_order`; the latter repeats coupon/product/limit/fee/zero-total checks, blocks an active enrollment and creates an immutable guest or authenticated snapshot without enrollment. `record_paystation_verification` row-locks the order, validates provider evidence, enforces a globally unique PayStation transaction ID and atomically creates a paid entitlement/enrollment. `claim_paid_course_orders` is service-only, validates a confirmed `auth.users` email and claims all matching entitlements exactly once. Legacy `quote_checkout`/`create_order` remain for the compatible authenticated eBook contract.

`newsletter_subscribers` is written only by the server-side Tax Brief action through the service role. Browser roles receive no insert grant; authenticated staff receive policy-gated select/update access. Re-subscription uses an atomic email-conflict upsert and refreshes interests/status without creating duplicate rows.

## Storage

- `cms-public`: public read, staff write
- `course-files`, `ebooks`, `certificates`: private and entitlement/owner restricted
- `avatars`: private user-owned paths

Upload flow: server validates request → signed direct upload → server verifies object metadata → media row/audit.

Course and module resources use `course-files` paths scoped to the product ID. Their student download routes re-check the resource's course and the caller's active enrollment before issuing a five-minute signed URL. Certificate files use an owner-only signed download route. `class_sessions` are scoped to an enrolled batch; `module_progress` is staff-written and learner-readable only through the related enrollment.

## Important RPCs

- `save_page_draft`, `publish_page`, `rollback_page_revision`
- `quote_checkout`, `create_order`, `fulfill_verified_order` (legacy/eBook)
- `quote_guest_course_checkout`, `create_guest_course_order`, `record_paystation_verification`, `claim_paid_course_orders`
- `verify_certificate_public`
- `ingest_analytics_event`
- `claim_email_outbox`
