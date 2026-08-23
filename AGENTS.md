# AGENTS.md — Associates Academy operating protocol

`AGENTS.md` is the mandatory entry point for every human or AI working in this repository. It is the orchestration layer, not a duplicate of product or implementation detail. Start here, then use the documentation graph in [DOCUMENTATION.md](DOCUMENTATION.md).

## Product and stack boundaries

Associates Academy is a standalone Bengali-first academy for Tax, VAT, Legal and Professional Compliance learning. Historical projects and references are evidence only; they must never be copied into this repository, deployment metadata, public copy, legal text, emails, or runtime data.

The stack is locked unless the user explicitly authorizes a change:

- Next.js App Router, React, TypeScript (strict), Tailwind CSS, shadcn/ui, Lucide React
- Supabase PostgreSQL/Auth/Storage, Zod, React Hook Form
- PayStation adapter, Resend outbox, first-party analytics with optional GA4/Meta adapters
- Vercel, GitHub, Vitest, Playwright, Node 22+ and pnpm

Do not introduce another framework, router, state manager, styling system, database, package manager, or animation library without approval.

## Documentation graph and reading order

Read [DOCUMENTATION.md](DOCUMENTATION.md) for the complete owner, connection, and update map. The normal order is:

1. `AGENTS.md` — workflow, boundaries, logging protocol
2. `PROJECT.md` — product scope, roles, business rules
3. The task-specific documents named by `DOCUMENTATION.md`
4. The newest relevant entries in `logs.md` (read from the bottom)
5. Only the source files and migrations directly needed for the task

Truth precedence is: current code and applied migrations → task-specific documentation → `logs.md` → historical/reference artifacts. When these conflict, do not guess: correct the stale documentation as part of the change and record it in the log.

## Required workflow

`READ → UNDERSTAND → PLAN → IMPLEMENT → TEST → DOCUMENT → LOG → HANDOFF`

1. Read this file, the relevant documentation, and recent logs before editing.
2. Inspect the smallest possible set of implementation files; do not scan the entire tree.
3. Reuse existing components, validation, server actions, routes, data contracts, and design tokens before adding new ones.
4. Keep all facts and state in their declared source of truth. Do not fabricate customer-facing facts, prices, schedules, testimonials, urgency, metrics, payment outcomes, or placeholder production data.
5. Test in proportion to risk. `pnpm check` is required before handing off a material application change; add or update focused tests for authentication/RLS, payment, CMS, analytics, or validation changes.
6. Update every affected document identified by the documentation graph in the same change set.
7. Re-read the bottom of `logs.md`, append exactly one new self-contained sequential `LOG-XXXX` entry, and state the log ID in the handoff.

## New page and data-change gates

Before designing or implementing **any new page**, use these skills and follow their required references:

1. `apply-associates-academy-design` — select the appropriate Associates Academy blueprint, preserve tokens/components, and run responsive visual QA.
2. Local `supabase` and plugin `supabase:supabase` — if the page reads/writes Supabase data, auth, storage, RPCs, or a Supabase-backed API; verify current Supabase documentation before implementation.
3. Local `supabase-postgres-best-practices` and plugin `supabase:supabase-postgres-best-practices` — before creating or changing any PostgreSQL table, policy, index, function, query, trigger, migration, or RLS behavior.

The design skill is required for every public/admin/student page design, even when no database work is involved. The four Supabase skills are required whenever the page or its supporting change touches Supabase; no schema work may begin without them. Read [DATA.md](DATA.md) before changing content, configuration, or data flow.

## Security and data invariants

- Server-side authorization and RLS both protect privileged data; client checks are presentation only.
- Prices, payment status, enrollment, private file access, and certificates are server/database authoritative. Callback or browser data never grants access.
- Never expose secrets, service-role credentials, signed private URLs, payment evidence, or PII in the browser, analytics, source control, error messages, or logs.
- Every exposed Supabase table has explicit grants and RLS; use ownership/staff predicates rather than broad authenticated access.
- CMS updates are validated, revisioned, atomically published, and cache-revalidated. Static content has an explicit module owner in `DATA.md`.

Read `security.md` before touching auth, RLS, storage, payments, certificates, API routes, secrets, or personal data. Read `backend.md` before data/schema work and `flows.md` before changing an end-to-end journey.

## Documentation and log protocol

- Keep knowledge centralized: each fact has one owning document or data source, linked from `DOCUMENTATION.md` and `DATA.md` rather than duplicated across unrelated files.
- A meaningful edit/change set always creates its own new log entry. `logs.md` is append-only: never edit, delete, reorder, or backfill a historical entry.
- Before appending, inspect the bottom-most entry and increment its `LOG-XXXX` identifier. In concurrent work, re-check it immediately before writing to avoid collisions.
- The entry must include the user intent, exact changed files, data/DB impact, documentation updated, validation actually run, and unresolved follow-up. Never claim a command, browser check, deployment, database change, or commit that did not occur.
- If the task changes a product boundary, UI behavior, architecture, data/security, flow, analytics, deployment, or these instructions, update its named owner document in the same change.

## Handoff

State the outcome, tests actually run, intentional gaps, and the new `LOG-XXXX` ID. If an external credential, production action, or user decision is required, name it clearly rather than silently assuming it.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
