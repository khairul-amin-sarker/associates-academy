# AGENTS.md — Associates Academy standalone application

## Product

Associates Academy is an independent Bengali-first academy for Tax, VAT, Legal and Professional Compliance learning. This repository contains the new production application. Historical source material lives outside this directory and must never be included in Git, Vercel builds, metadata, copy, legal text or email templates.

## Stack

- Next.js App Router + TypeScript (strict)
- Tailwind CSS + shadcn/ui + Lucide React
- Supabase PostgreSQL, Auth and Storage
- Zod + React Hook Form
- PayStation adapter, Resend outbox, first-party analytics, GA4/Meta adapters
- Vercel, GitHub, Vitest and Playwright
- Node 22+ and pnpm (locked)

## Source of truth

1. Code and migrations
2. `PROJECT.md`, `architecture.md`, `backend.md`, `flows.md`, `UI.md`, `design.md`, `security.md`, `analytics.md`
3. `logs.md`

## Required workflow

READ → PLAN → IMPLEMENT → TEST → DOCUMENT → LOG

- Use Server Components for reads and small Client Components for interaction.
- Every privileged action is checked server-side and through RLS.
- Never trust payment callbacks without provider re-verification.
- Never expose secret keys or provider credentials to the browser, Git or public tables.
- Content updates must publish atomically and revalidate cache without a deployment.
- Use Bengali-first user copy and the cream/navy/gold design system.
- Run `pnpm check` before handoff. Add tests for payment, auth/RLS, CMS and analytics changes.
- Fresh production data is intentional. Only PII-limited public certificate registry rows may be imported.
- Required current course/eBook resources must be uploaded to new storage before launch.

## Change documentation

- Routes/UI: update `UI.md` and `architecture.md`.
- Database/RLS/storage/auth: update `backend.md` and `security.md`.
- Payment or journey: update `flows.md`.
- Tracking: update `analytics.md`.
- Any material change: append `logs.md`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
