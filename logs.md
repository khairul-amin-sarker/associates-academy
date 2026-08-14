# logs.md — Append-only project change log

Newest entries at the top. Every agent must append an entry after any change.

## Entry format

```
## YYYY-MM-DD — <short title>
**Agent:** <name>
**Type:** feature | fix | docs | schema | security | chore
**Scope:** <routes / files / tables touched>
**Change:** <what changed and why, 1-3 sentences>
**DB impact:** <migration name, or "none">
**Docs updated:** <files>
**Verification:** <how it was tested>
**Risk / follow-up:** <anything left open>
```

---

## 2026-08-14 — AI handoff documentation system created
**Agent:** Lovable
**Type:** docs
**Scope:** `AGENTS.md`, `PROJECT.md`, `architecture.md`, `backend.md`, `UI.md`, `design.md`,
`flows.md`, `analytics.md`, `security.md`, `MIGRATION.md`, `logs.md`
**Change:** Inspected the live repository and backend configuration and produced a complete
handoff documentation set so a fresh AI session can understand Associates Academy without
prior chat context and safely plan a Next.js App Router migration. `design.md` was extended
with logo usage, responsive principles and a reusable-component inventory; all other files are
new. No application code, database, auth or configuration was changed.
**DB impact:** none
**Docs updated:** all of the above
**Verification:** every documented route, table, server function, storage bucket, env var name,
analytics ID and workflow was cross-checked against `src/routes/**`, `src/lib/*.functions.ts`,
`src/styles.css`, `vite.config.ts`, `src/start.ts`, `supabase/migrations/**` and the live
Supabase schema/function listing.
**Risk / follow-up:** items marked *Needs Verification* in `PROJECT.md` and `MIGRATION.md`
(Google identity continuity off the Lovable OAuth broker, whether the Supabase project stays
Lovable-managed, ZiniPay brand-domain re-registration, dark-mode usage, MCP retention).
`docs/codex-handoff/**` is an older Firebase-oriented plan and is now superseded for stack facts.

---

## 2026-08-15 — Standalone Next.js rebuild implemented
**Agent:** Codex
**Type:** feature
**Scope:** public website, student dashboard, admin console, CMS, payments, analytics, auth, storage, database, tests and deployment configuration
**Change:** Rebuilt Associates Academy as a standalone Bengali-first Next.js App Router application. Added the academy homepage and product journeys, a command-center admin dashboard with Website Studio, first-party analytics with GA4/Meta adapters, PayStation verification and idempotent fulfillment, a role-aware student area, and a strict standalone-brand CI gate.
**DB impact:** `20260814174622_standalone_foundation`, `20260814183047_function_acl_and_indexes`, and `20260814183652_import_public_certificates`; production received the fresh normalized schema and 21 PII-minimized public certificate records.
**Docs updated:** `README.md`, `PROJECT.md`, `architecture.md`, `backend.md`, `UI.md`, `design.md`, `flows.md`, `analytics.md`, `security.md`, `MIGRATION.md`, `design-qa.md`
**Verification:** brand scan, ESLint, strict TypeScript, Vitest, production build, Supabase RLS/advisor inspection, and in-app browser QA at 1440px and 390px across homepage, course, checkout, dashboard, CMS, certificate and consent journeys.
**Risk / follow-up:** live PayStation, branded domain/email, external Meta/GA4/Sentry credentials and required private course files remain launch gates. The separate zero-cost staging project is active.

---

## Before 2026-08-14
Change history prior to this entry is not recorded here; see git history and
`supabase/migrations/**` (49 migrations) for the authoritative record.
