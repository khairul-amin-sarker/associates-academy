# Standalone rebuild and rollout

## Completed in source

- Next.js App Router/TypeScript/Tailwind/shadcn foundation
- Standalone branding and academy homepage
- Course, eBook, workshop, auth, checkout, student and admin surfaces
- Fresh Supabase schema/RLS/storage/RPC migration
- Typed PayStation Hosted Checkout adapter, guest course orders, server verification, paid-entitlement claim and reconciliation
- CMS publish/rollback, analytics ingestion, Resend outbox, Sentry wiring
- Interest-segmented Tax Brief subscriber migration and server-only signup flow
- Learning-delivery migration for batch/module sessions and staff-managed module progress
- Unit/visual/E2E scaffolding and brand CI gate
- Separate Supabase staging project in `ap-south-1`, with 32/32 public tables protected by RLS
- Private GitHub feature branch/draft PR and a READY Vercel Preview deployment

## Data policy

Previous users, auth identities, orders, enrollments, payment history and private files are not imported. Only public certificate verification fields may be transformed/imported. Current course/eBook resources must be re-uploaded before launch.

## Launch status and remaining gates

1. The owner explicitly approved a Live-first exception because PayStation did not issue merchant-specific Sandbox API credentials. Live credentials are stored only as Vercel Production Sensitive variables.
2. `https://www.associatesacademy.bd` is the canonical Production origin and callback base; the apex aliases to the same READY deployment.
3. All checkout, learning, payment, canonical-domain, public-RLS and Bengali-seed repair migrations are applied to Staging and Production. Generated database types already include the payment schema; the final two migrations change policies/data only.
4. Production payment SQL rollback suite, RLS/grant checks, anonymous catalog checks, lint, typecheck, 32 unit tests, local/remote production builds and desktop/mobile checkout QA pass.
5. PayStation Live initiation accepted the Production Merchant ID/password and returned an official Hosted Checkout URL. The readiness order was not paid and was cancelled with zero enrollment/entitlement.
6. Vercel Hobby runs email processing plus a combined daily analytics/payment maintenance job. The owner-only `/admin/orders` action and the protected dedicated reconciliation endpoint remain available for immediate or external 10-minute checks.
7. Remaining operational work: create/verify the first Owner account and assign its owner role, verify Resend sender/domain, configure Meta/GA4/Sentry as desired, upload private learning resources, and complete one owner-operated real payment settlement journey.

Rollback: Vercel previous deployment for code; content revision restore for CMS; forward-safe database migration for schema/data.
