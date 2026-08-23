# Data ownership and update contracts

All runtime facts must have a declared source of truth. This document maps each data class to its owner, access path, validation boundary, and update procedure. It complements `backend.md`; security restrictions remain owned by `security.md`.

## Source-of-truth catalog

| Data class                                         | Authoritative source                                                                                                                                         | Read path                                            | Update path                                                                                                  | Rules                                                                                                                                                                                                                                       |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Home-page CMS copy/SEO                             | `pages`, `page_sections`, `content_revisions` in Supabase                                                                                                    | `src/lib/content/pages.ts` → cached `getHomeContent` | Admin Website Studio → Zod validation → `save_page_draft` → `publish_page`/`rollback_page_revision` RPC      | Draft/revision/publish are atomic; revalidate tag/path after publish; never edit a published snapshot directly                                                                                                                              |
| Tax Brief subscribers and interests                | Supabase `newsletter_subscribers`                                                                                                                            | Server-only staff/operations access                  | Homepage Server Action → Zod normalization → service-role atomic upsert                                      | Email is normalized/unique PII; browser roles have no insert or broad read grant; never copy into analytics                                                                                                                                 |
| Static course landing facts                        | `src/lib/content/practical-return-course.ts` and its typed object                                                                                            | Dynamic course route and marketing landing component | Edit the typed content module and its affected rendering/tests                                               | Omit unknown commercial claims; product availability/price stays database-authoritative                                                                                                                                                     |
| Static eBook/legal/informational copy              | `src/lib/content/ebook.ts`, `legal.ts`, `defaults.ts`                                                                                                        | Corresponding page/component imports                 | Edit the owning content module and validate affected route                                                   | Keep Bengali-first truthfulness; legal/business facts need owner confirmation when materially changed                                                                                                                                       |
| Catalog, pricing, coupons, courses/batches/modules | Supabase `products`, `courses`, `coupons`, `batches`, `modules`, `class_sessions`, `module_resources`, `course_resources`, `module_progress`, related tables | Server Components/actions/RPCs                       | Authorized admin learning workflow through validated server/database contract                                | Each coupon belongs to one product; browser prices/totals are never authoritative; checkout quotes/final orders are calculated in PostgreSQL; progress is staff-marked; resources are course-scoped; schema changes require a new migration |
| Identity, roles, profile                           | Supabase Auth + `profiles`, `user_roles`                                                                                                                     | `src/lib/supabase/*`, `src/lib/auth.ts`              | Auth flow and validated profile/checkout server path                                                         | Auth email is authoritative; name, phone, WhatsApp, occupation and city prefill checkout; roles never come from editable user metadata; RLS plus server checks                                                                              |
| Orders, attempts, paid entitlements, enrollment    | Supabase commerce/learning tables, immutable order snapshots and append-only verification events                                                             | Server-only payment/order/claim paths                | `create_guest_course_order`, verified status lookup, `record_paystation_verification`, confirmed-email claim | Only server verification can create entitlement; only confirmed matching Auth email can claim; all transitions idempotent                                                                                                                   |
| Private/public files and media references          | Supabase Storage buckets + `media_assets`                                                                                                                    | Signed/entitlement-safe URLs and media components    | Server-signed upload → client upload → server completion verification                                        | Bucket, MIME, path and size allowlists apply; never place a private URL in static content                                                                                                                                                   |
| Certificates                                       | `certificates` and public verification RPC                                                                                                                   | Certificate API/verification page                    | Authorized admin/import procedure                                                                            | Public lookup returns only a PII-minimized projection                                                                                                                                                                                       |
| Analytics and consent                              | Analytics tables + `analytics_preferences`                                                                                                                   | Analytics runtime and reporting paths                | Validated ingestion/RPC; user privacy control                                                                | Event schema is `analytics.md`; no PII, secrets, tokens, or signed URLs                                                                                                                                                                     |
| Environment secrets/configuration                  | `.env.local` locally; Vercel/Supabase secret stores in deployed environments                                                                                 | Server-only config readers                           | Host configuration, never source code or migrations                                                          | Only publishable `NEXT_PUBLIC_*` values may be sent to the browser                                                                                                                                                                          |

## Update decision path

```text
Need to change a fact?
│
├─ CMS-managed home content → Website Studio + publish/rollback RPC
├─ Static page copy/structure → owning src/lib/content module + page/component/test update
├─ Product/commerce/learning data → authenticated server/database contract
├─ Schema/RLS/RPC/index → Supabase migration workflow + backend/security documentation
├─ File/media → signed upload/verification flow; store only approved reference metadata
└─ Secret/environment value → local or host secret configuration; never commit it
```

## Required data-change procedure

1. Identify the catalog row above before editing. If no row fits, add a new authoritative owner to this document before creating the data path.
2. Read the linked owner documentation and relevant recent `logs.md` entries.
3. Validate at the declared boundary: Zod for input/content, server authorization for mutations, and RLS/explicit grants for exposed Supabase data.
4. Keep an update in its source of truth; do not duplicate it into a page component, local storage, query string, analytics payload, or another document merely for convenience.
5. Verify the actual read/write flow. For CMS publish, verify draft → publish → cache revalidation; for database work, verify the migration/query/RLS behavior; for content, verify the rendered route.
6. Update `DATA.md` when the owner or contract changes, update the related owner documentation, then append one `LOG-XXXX` entry.

## Schema and generated types

`supabase/migrations/` is append-only schema history. Create migrations through the Supabase CLI workflow; never hand-name a migration timestamp. `src/types/database.ts` must reflect the database contract used by the application. A data contract is incomplete until migration, types, validation, access control, documentation, and tests agree.

## What must never become a data source

- Customer-visible placeholder values, demo figures, or inferred business facts
- Client-submitted price, payment status, role, entitlement, or certificate authority
- User-editable JWT metadata for authorization
- Browser local storage/query parameters for privileged state
- Analytics payloads, logs, screenshots, or historical projects for current runtime truth
