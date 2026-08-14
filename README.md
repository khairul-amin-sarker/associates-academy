# Associates Academy

Standalone academy platform for Bengali-first Tax, VAT, Legal and Professional Compliance learning.

## Local development

Requirements: Node.js 22+ and pnpm 11.

```bash
pnpm install
copy .env.example .env.local
pnpm dev
```

The repository has a safe local dashboard preview when `LOCAL_DEMO_ADMIN=true`. Vercel production never enables this flag.

## Quality commands

```bash
pnpm check:brand
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:e2e
```

## Supabase

Schema source: `supabase/migrations/20260814182758_standalone_foundation.sql`, followed by the function ACL/index hardening and environment-specific certificate-import marker migrations.

The migration creates the structured CMS, learning, commerce, certificate, email and analytics models; explicit Data API grants; RLS; storage buckets; atomic CMS/payment RPCs; and standalone seed content.

## Deployment

- Feature branch → GitHub PR → Vercel Preview + staging Supabase
- Validate tests/advisors → apply production migration → promote the verified artifact
- `main` is production
- Domain, branded email, OAuth, Meta, GA4 and live PayStation callbacks remain launch gates until credentials/DNS exist

See `MIGRATION.md` and `security.md` before production changes.

The separate `Associates Academy Staging` Supabase project is active in `ap-south-1`; Vercel Preview uses its public URL/key. Production promotion remains intentionally gated.
