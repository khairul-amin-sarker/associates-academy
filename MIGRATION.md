# Standalone rebuild and rollout

## Completed in source

- Next.js App Router/TypeScript/Tailwind/shadcn foundation
- Standalone branding and academy homepage
- Course, eBook, workshop, auth, checkout, student and admin surfaces
- Fresh Supabase schema/RLS/storage/RPC migration
- PayStation adapter and mock-safe local flow
- CMS publish/rollback, analytics ingestion, Resend outbox, Sentry wiring
- Unit/visual/E2E scaffolding and brand CI gate

## Data policy

Previous users, auth identities, orders, enrollments, payment history and private files are not imported. Only public certificate verification fields may be transformed/imported. Current course/eBook resources must be re-uploaded before launch.

## Launch gates

1. Create/approve separate Supabase staging environment.
2. Configure PayStation live merchant credentials.
3. Purchase/connect `associatesacademy.com.bd` and `www` redirect.
4. Verify Resend domain and sender addresses.
5. Create/connect new Meta dataset/pixel, GA4 property and Sentry project.
6. Upload required private resources.
7. Run RLS/advisor/E2E/visual/performance checks on Preview.
8. Promote tested artifact, run smoke tests and retire the previous site.

Rollback: Vercel previous deployment for code; content revision restore for CMS; forward-safe database migration for schema/data.
