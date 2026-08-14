# Standalone rebuild and rollout

## Completed in source

- Next.js App Router/TypeScript/Tailwind/shadcn foundation
- Standalone branding and academy homepage
- Course, eBook, workshop, auth, checkout, student and admin surfaces
- Fresh Supabase schema/RLS/storage/RPC migration
- PayStation adapter and mock-safe local flow
- CMS publish/rollback, analytics ingestion, Resend outbox, Sentry wiring
- Unit/visual/E2E scaffolding and brand CI gate
- Separate Supabase staging project in `ap-south-1`, with 32/32 public tables protected by RLS
- Private GitHub feature branch/draft PR and a READY Vercel Preview deployment

## Data policy

Previous users, auth identities, orders, enrollments, payment history and private files are not imported. Only public certificate verification fields may be transformed/imported. Current course/eBook resources must be re-uploaded before launch.

## Launch gates

1. Configure PayStation live merchant credentials.
2. Purchase/connect `associatesacademy.com.bd` and `www` redirect.
3. Verify Resend domain and sender addresses.
4. Create/connect new Meta dataset/pixel, GA4 property and Sentry project.
5. Upload required private resources.
6. Run authenticated RLS/E2E and final performance checks with production credentials.
7. Promote the tested artifact, run smoke tests and retire the previous site.

Rollback: Vercel previous deployment for code; content revision restore for CMS; forward-safe database migration for schema/data.
