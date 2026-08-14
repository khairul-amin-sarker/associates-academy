# Architecture

## Runtime

Next.js App Router on Vercel, Node.js runtime by default. Route groups separate `(marketing)`, `(student)` and `(admin)`. Reads use Server Components; interactive forms/charts/editors are isolated Client Components. Third-party callbacks and public ingestion use Route Handlers; internal mutations use Server Actions/RPCs.

## Routes

- Public: `/`, `/courses`, `/courses/[slug]`, `/ebook`, `/workshop`, `/resources`, `/about`, `/contact`, `/verify`, legal routes
- Auth/commerce: `/auth`, `/auth/callback`, `/checkout`, `/payment/success`, `/payment/failed`
- Student: `/dashboard`, `/dashboard/courses/[slug]`, `/workshop/dashboard`, `/profile`
- Admin: `/admin`, `/admin/website-studio`, `/admin/media`, `/admin/[module]`
- API: analytics ingestion, PayStation initiate/callback, certificate lookup, media sign/complete, cron workers

## Caching

Public CMS reads use tagged caching with database fallbacks. Publish/rollback validates the complete snapshot, commits via one PostgreSQL RPC, calls `revalidateTag` and revalidates the page. Authenticated responses are private/no-store via `src/proxy.ts`.

## Deployment

GitHub integration creates Vercel previews. Preview uses a separate Supabase environment. Production migration precedes artifact promotion. Rollback uses a previous Vercel artifact; data rollback uses forward-safe migrations/revision restore.
