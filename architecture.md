# Architecture

## Runtime

Next.js App Router on Vercel, Node.js runtime by default. Route groups separate `(marketing)`, `(student)` and `(admin)`. Reads use Server Components; interactive forms/charts/editors are isolated Client Components. Third-party callbacks and public ingestion use Route Handlers; internal mutations use Server Actions/RPCs.

## Routes

- Public: `/`, `/courses`, `/courses/[slug]` (including the dynamically priced practical-return course), `/ebook`, `/workshop`, `/resources`, `/about`, `/contact`, `/verify`, legal routes
- Auth/commerce: `/auth`, `/auth/callback`, public `/checkout/[slug]` (with legacy `/checkout?product=` redirect), neutral `/payment/result`, `/payment/recovery`, legacy result redirects
- Student: `/dashboard`, `/dashboard/courses/[slug]`, `/workshop/dashboard`, `/profile`
- Admin: `/admin`, `/admin/workshop`, `/admin/workshop/[id]`, `/admin/website-studio`, `/admin/media`, `/admin/courses`, `/admin/students`, `/admin/coupons`, `/admin/orders`, `/admin/[module]`
- API: analytics ingestion, guest checkout quote, PayStation initiate/callback, confirmed-email payment claim, certificate lookup, media sign/complete, cron workers including payment reconciliation

## Caching

Public CMS reads use tagged caching with database fallbacks. Publish/rollback validates the complete snapshot, commits via one PostgreSQL RPC, calls `revalidateTag` and revalidates the page. Authenticated responses are private/no-store via `src/proxy.ts`.

The homepage remains a Server Component fed by cached CMS content. Only the personalised return checklist and Tax Brief form are Client Component islands. Tax Brief submission calls a validated Server Action, which uses the server-only Supabase secret client to upsert a normalized subscriber record; no service credential or subscriber data reaches the browser.

The `/workshop` landing page is a public Server Component with static fallback and live database status checks. Its registration form Client Component calls `registerForWorkshopAction` with client-captured UTM attribution and referrer metadata; registrations persist directly to `workshop_registrations_v2` with sequence-generated codes (`WS26-XXXX`) and normalized mobile deduplication.

Authenticated learning pages use server-side enrollment checks plus RLS. Class/session data is batch-scoped, while private module files are reached through a short-lived signed download URL created only after a second server-side enrollment check.

The course checkout page is a public Server Component that reads only the selected published product/course and, when available, the verified learner profile/active enrollment. Its Client Component submits validated guest contact/coupon input and an idempotency UUID; PostgreSQL calculates and snapshots the quote/order independently. The payment adapter and service-role verification/claim modules are server-only. Callback and result are separate: callback triggers provider verification, while the result page renders database state. Checkout opts out of `MarketingChrome` and composes its reference-matched header/footer; eBook checkout stays inline and uses its existing authenticated order RPC through the same Hosted Checkout adapter.

## Deployment

GitHub integration creates Vercel previews. Preview uses a separate Supabase environment. Production migration precedes artifact promotion. Rollback uses a previous Vercel artifact; data rollback uses forward-safe migrations/revision restore.

## Course content

Static marketing facts for the practical Paper Return/E-Return program live in `src/lib/content/practical-return-course.ts`. Its course landing reads the published product price and regular price at request time from Supabase, so the marketing enrollment card and `/checkout/practical-paper-return-e-return-filing` use the same database-authoritative commerce values. Both course slugs are returned by the dynamic route's `generateStaticParams`; metadata is generated per course.
