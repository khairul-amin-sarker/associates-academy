# logs.md — Append-only project change log

Historical entries are preserved in their original order. From `LOG-0001` onward, entries are appended at the **bottom** in strict sequence. Every meaningful change set has exactly one self-contained entry; never edit, delete, reorder, or backfill a historical entry.

## Entry format (required for `LOG-XXXX` entries)

```text
## LOG-XXXX — YYYY-MM-DD — Short descriptive title
Agent: <name>
Type: FEATURE | FIX | REFACTOR | DOCS | SCHEMA | SECURITY | PERFORMANCE | UX | CONFIG
Scope: <subsystem/components/data contracts>
Context & Rationale:
- User intent and the problem being solved.
Summary of Changes:
- Exact architecture, data, UI, or workflow decisions.
Files:
- Every created or modified path.
Data / DB impact:
- Migration name, runtime data contract impact, or "none".
Documentation updated:
- Every owner document updated.
Validation:
- Only checks actually run and their result.
Risk / follow-up:
- Intentional gaps, external dependencies, or "none".
Commit:
- SHA or "pending".
```

---

## 2026-08-15 — Practical Paper Return and E-Return course landing added

**Agent:** Codex
**Type:** feature
**Scope:** `/courses/practical-paper-return-e-return-filing`, course catalog, shared header CTA, checkout handoff, course metadata/sitemap, responsive QA
**Change:** Added a second premium Bengali-first course landing page built from a typed source-content object, with a practical filing workflow hero, five detailed modules, instructor asset, client-file timeline, truthful optional offer rendering and the existing authentication/PayStation enrollment journey. Extended checkout product selection so the new slug is preserved without leaking the original course price.
**DB impact:** none
**Docs updated:** `UI.md`, `architecture.md`, `design.md`, `flows.md`, `logs.md`
**Verification:** Prettier, ESLint, strict TypeScript, 12 Vitest tests, production build, targeted Playwright desktop/mobile test, and in-app browser checks at 390px, 430px, 768px, 1024px and 1440px including overflow, navigation, accordion, metadata and checkout summary checks.
**Risk / follow-up:** the landing page intentionally hides unconfigured price, batch, schedule, deadline, recording, certificate and support claims. A published database product row with the new slug and verified commercial data is required before live payment initiation can succeed in production.

---

## 2026-08-15 — eBook reference UI restored

**Agent:** Codex
**Type:** fix
**Scope:** `/ebook`, marketing chrome, scoped design tokens, eBook content/assets, visual QA
**Change:** Rebuilt the standalone eBook route from the supplied production screenshot, inspected live page, and historical source. Restored the complete sales funnel, original book artwork, responsive header/footer, FAQ, inline checkout form, and mobile sticky CTA while retaining the current PayStation endpoint.
**DB impact:** none
**Docs updated:** `UI.md`, `design.md`, `design-qa.md`, `logs.md`
**Verification:** normalized full-page and focused browser comparisons, 1218px desktop and 390px mobile overflow checks, CTA/FAQ/form-state tests, console check, and `pnpm check` (brand, ESLint, TypeScript, Vitest, production build).
**Risk / follow-up:** the current standalone payment API still requires authentication; two sales-page support sentences intentionally reflect that current behavior instead of the historical guest-checkout wording.

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
**Risk / follow-up:** items marked _Needs Verification_ in `PROJECT.md` and `MIGRATION.md`
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

## LOG-0001 — 2026-08-21 — Documentation graph and data-ownership protocol

Agent: Codex
Type: DOCS
Scope: repository handoff, documentation ownership, data-source boundaries, security-change checks, append-only logging
Context & Rationale:

- The user requested the Associates Academy codebase adopt a durable, connected documentation structure modeled on the supplied reference documents, where each meaningful edit is recorded as a separate log and a fresh chat can continue without rediscovering context.
- Existing documentation described important subsystems but did not centrally identify a single owner for each fact, an exact update path for each data class, or the required skills for future page/database work.
  Summary of Changes:
- Rebuilt `AGENTS.md` as the required orchestration entry point with truth precedence, task workflow, security/data invariants, documentation/log rules, and an explicit new-page gate for the Associates Academy design skill plus both local and plugin Supabase/Postgres skills.
- Added `DOCUMENTATION.md` as the central graph: owner documents, read/update triggers, task decision table, relationships, and anti-drift rule.
- Added `DATA.md` to define the authoritative owner, read path, update path, validation boundary, and prohibited sources for CMS, static content, commerce, identity, storage, certificates, analytics, and secrets.
- Updated `README.md`, `security.md`, and this file to link the system, add a practical security-change checklist, and establish sequential append-only `LOG-XXXX` entries at the bottom while preserving prior history.
  Files:
- AGENTS.md
- DOCUMENTATION.md
- DATA.md
- README.md
- security.md
- logs.md
  Data / DB impact:
- none; this change documents existing data contracts and does not change runtime data, schema, migrations, RLS, or configuration.
  Documentation updated:
- AGENTS.md
- DOCUMENTATION.md
- DATA.md
- README.md
- security.md
- logs.md
  Validation:
- `pnpm exec prettier --check AGENTS.md DOCUMENTATION.md DATA.md README.md security.md logs.md` passed after formatting the newly created/updated Markdown files.
- A targeted local-link and required-owner-document check passed for the documentation graph.
  Risk / follow-up:
- Existing older historical log entries predate the sequential protocol and are intentionally preserved unchanged. Future meaningful change sets must use the new `LOG-XXXX` format.
  Commit:
- pending

## LOG-0002 — 2026-08-21 — Professional learning ecosystem homepage redesign

Agent: Codex
Type: FEATURE
Scope: public homepage, navigation, interactive tax-tool preview, Tax Brief subscription, newsletter data contract, responsive accessibility
Context & Rationale:

- The user requested that the homepage evolve from a course-selling page into a Bengali-first professional learning ecosystem where visitors can understand the academy, discover learning areas and programs, use practical tools, browse resources, and join a segmented tax-update newsletter.
- The previous homepage did not clearly establish Associates Academy's practical-learning position, audience fit, ongoing utility, or institution story.
  Summary of Changes:
- Rebuilt the homepage as a compact, visually varied 16-section journey covering the hero and trust strip, academy explanation, learning areas, programs, audience, practical differentiators, tax tools, learning process, founder philosophy, truthful proof, resources, knowledge roadmap, Tax Brief, FAQ, and final CTA.
- Added an in-page personalized return-filing checklist and mini-app-style previews for future tax tools while clearly labeling unavailable tools as upcoming.
- Added a progressively enhanced Tax Brief Server Action with shared Zod validation, interest segmentation, honeypot protection, normalized email handling, and a server-only Supabase admin upsert.
- Added the `newsletter_subscribers` schema, constraints, indexes, RLS policies, staff visibility rules, service-role write path, and synchronized generated database types.
- Updated public navigation, CMS fallback copy, homepage visual tokens, footer contrast, and desktop/mobile journey coverage without fabricating testimonials, learner counts, course dates, or tool availability.
  Files:
- src/components/marketing/home-page.tsx
- src/components/marketing/home-interactions.tsx
- src/components/marketing/site-footer.tsx
- src/app/(marketing)/actions.ts
- src/app/globals.css
- src/lib/content/defaults.ts
- src/lib/site.ts
- src/lib/validation/newsletter.ts
- src/lib/validation/newsletter.test.ts
- src/types/database.ts
- tests/e2e/public-journey.spec.ts
- supabase/migrations/20260821150135_add_tax_brief_subscribers.sql
- PROJECT.md
- UI.md
- design.md
- architecture.md
- backend.md
- security.md
- flows.md
- DATA.md
- MIGRATION.md
- logs.md
  Data / DB impact:
- Added migration `20260821150135_add_tax_brief_subscribers`; it has not been applied to a Supabase environment in this change set.
- Once applied, newsletter submissions upsert one normalized subscriber row per email and store validated topic interests, source, status, and timestamps.
  Documentation updated:
- PROJECT.md
- UI.md
- design.md
- architecture.md
- backend.md
- security.md
- flows.md
- DATA.md
- MIGRATION.md
- logs.md
  Validation:
- `pnpm check` passed: standalone-brand scan, ESLint with zero warnings, strict TypeScript, 14 Vitest tests across 5 files, and the Next.js production build with 42 generated pages.
- `pnpm exec playwright test tests/e2e/public-journey.spec.ts --grep "homepage exposes the learning ecosystem"` passed in desktop Chromium and Pixel 7 projects (2 tests).
- In-app browser QA passed at 1440px and 390px for the 16-section structure, navigation sheet, checklist state, FAQ interaction, no horizontal overflow, no console errors, and no Next.js error overlay.
- Automated WCAG A/AA browser audit reported zero violations after contrast corrections.
  Risk / follow-up:
- Apply the new Supabase migration before enabling production Tax Brief submissions; no live subscriber row was created during validation.
- Calculator, rebate, TDS, deadline, and law-reference tools remain explicitly labeled as upcoming and require separate verified legal/rate data contracts before activation.
- During validation, a pre-existing untracked practical-return course component disappeared while the development server was active; it was reconstructed from its exact original session patch history and passes the full repository check.
  Commit:
- pending

## LOG-0003 — 2026-08-21 — Practical return course landing aligned to production brief

Agent: Codex
Type: FEATURE
Scope: `/courses/practical-paper-return-e-return-filing`, course presentation, optional offer rendering, responsive course enrollment handoff
Context & Rationale:

- The user requested a production-ready Bengali-first course landing that preserves the Associates Academy course blueprint while making the complete client-document-to-submission workflow unmistakable.
- The requested page must use semantic brand tokens, reuse the shared instructor asset and checkout journey, and hide every unverified price, date, schedule, recording, certificate, support, or urgency claim.
  Summary of Changes:
- Added a conflict-isolated course page component and routed the practical-return slug to it, preserving a concurrently edited landing component without overwriting that work.
- Implemented the requested split hero and dark workflow panel, truthful optional offer/countdown, problem and differentiator sections, audience and skill grids, real instructor portrait, five-module accessible curriculum, 14-step client workflow, outcomes, enrollment, verified registration steps, FAQ, and final CTA.
- Kept commercial fields conditional: the current empty offer object renders no launch strip, price, discount, deadline, schedule, recording, certificate, community, or support claim.
- Preserved the existing authenticated checkout URL and server-authoritative PayStation verification flow.
  Files:
- src/app/(marketing)/courses/[slug]/page.tsx
- src/components/marketing/practical-return-course-page.tsx
- src/components/marketing/practical-return-countdown.tsx
- logs.md
  Data / DB impact:
- none; static course content ownership and database-authoritative product pricing remain unchanged.
  Documentation updated:
- logs.md; existing `UI.md`, `design.md`, `architecture.md`, `flows.md`, and `DATA.md` already describe this course route, visual contract, static content owner, and enrollment flow.
  Validation:
- Targeted Prettier, ESLint, and strict TypeScript passed for the new route components.
- The focused Playwright practical-course journey passed in desktop Chromium and Pixel 7 projects (2 tests).
- Browser QA passed at 390px, 430px, 768px, 1024px, and 1440px with exact viewport-width scroll measurements, correct SEO metadata, three checkout links, no placeholder/offer leakage, no console or page errors, a working mobile navigation CTA, and a working Module 05 accordion.
- Visual hero inspection passed at 390px and 1440px.
- `pnpm check` passed: standalone-brand scan, ESLint with zero warnings, strict TypeScript, 14 Vitest tests across 5 files, and the Next.js production build with 42 generated pages.
  Risk / follow-up:
- Live payment for this slug still requires a matching published product row with verified commercial data; the page intentionally shows no product price until that source exists.
- The older concurrently maintained `practical-return-course-landing.tsx` remains unreferenced by this route so no overlapping user work was deleted.
  Commit:
- pending

## LOG-0004 — 2026-08-22 — Practical return course rebuilt as an editorial return dossier

Agent: Codex
Type: REDESIGN
Scope: `/courses/practical-paper-return-e-return-filing`, active course presentation, responsive editorial composition, enrollment handoff
Context & Rationale:

- The user requested an in-place visual redesign of the existing practical-return route, specifically replacing repetitive card grids and dashboard-like navy panels with a mature tax-publication and professional client-file story.
- Existing routing, static course facts, instructor identity, module content, checkout URL, PayStation verification behavior, metadata, shared navigation and footer had to remain intact.
  Summary of Changes:
- Reworked the active route component in place around a layered Return Case File hero, one-piece information bar, asymmetric problem editorial, connected preparation timeline and document-stack explanation of why portal entry is the final layer.
- Consolidated six audience tiles into three professional profiles and ten skill tiles into a divided capability matrix; upgraded the instructor section into an editorial portrait and statement without inventing credentials or quotations.
- Rebuilt the five-module curriculum so expanded content uses overview/outcome and grouped topic columns rather than topic-per-card surfaces, while preserving every source-backed legal section and module detail.
- Added the requested financial-consistency statement, annotated complete-return-file anatomy, seven-stage client journey, professional final-review sheet and restrained before/after transformation.
- Refocused enrollment, registration, FAQ and final CTA while retaining the existing product checkout URL and keeping all unconfigured price, offer, deadline, schedule, recording, certificate and support claims hidden.
- Updated the public UI inventory and design contract to document the editorial dossier system and restrained dark-surface rhythm.
  Files:
- src/components/marketing/practical-return-course-page.tsx
- UI.md
- design.md
- logs.md
  Data / DB impact:
- none; course content ownership, product pricing authority, authentication and payment verification are unchanged.
  Documentation updated:
- UI.md
- design.md
- logs.md
  Validation:
- Impeccable design-pattern detector passed with zero findings after the UI implementation.
- Browser QA passed at 390px, 430px, 768px, 1024px and 1440px with status 200, zero horizontal overflow, no console/page errors, no framework overlay, correct SEO metadata and four preserved checkout links.
- Curriculum and FAQ accordion interactions passed; the real instructor image was confirmed loaded after simulated scrolling and the final 1440px full-page visual inspection passed.
- `pnpm check` passed from a clean generated state: standalone-brand scan, ESLint with zero warnings, strict TypeScript, 14 Vitest tests across 5 files, and the Next.js production build with 42 generated pages.
  Risk / follow-up:
- Live checkout still requires a matching published product row with verified commercial data; the redesigned page intentionally renders no price or offer until that source exists.
- The older unreferenced `practical-return-course-landing.tsx` remains untouched so unrelated concurrent work was not overwritten.
  Commit:
- pending

## LOG-0005 — 2026-08-22 — Practical return dossier received final premium polish

Agent: Codex
Type: POLISH
Scope: `/courses/practical-paper-return-e-return-filing`, visual craft, responsive typography, interaction finish
Context & Rationale:

- The user requested a final production-polish pass on the existing editorial course page without changing its route, structure, data authority, enrollment behavior, shared navigation or footer.
- The pass needed to strengthen the document-led visual language, soften component surfaces, improve responsive hierarchy and add the user-approved instructor experience statements without inventing commercial course details.
  Summary of Changes:
- Refined the hero into a more deliberate cream, navy and gold compliance board with layered return sheets, a paperclip, seal, clearer headline measure and a continuous curated course-facts strip.
- Upgraded the portal-preparation sequence into a staggered source-document stack and tightened the audience profiles, capability matrix, instructor portrait treatment, annotated return anatomy, client journey, final-review sheet and transformation composition.
- Added the approved `13 years plus experience` and `13 years plus income tax practice` statements as a restrained instructor proof block.
- Softened and clarified the five curriculum accordions with controlled rounding, stronger open and hover states, aligned module markers and grouped inner content rather than nested micro-cards.
- Recast the income, tax, expenditure and assets concept as a memorable ledger-style financial-consistency equation, and strengthened enrollment, registration, FAQ and final CTA hierarchy while preserving conditional commercial rendering.
  Files:
- src/components/marketing/practical-return-course-page.tsx
- logs.md
  Data / DB impact:
- none; course data, product pricing authority, authentication, checkout and PayStation verification are unchanged.
  Documentation updated:
- logs.md; the existing `UI.md` and `design.md` already document the return-dossier composition and restrained dark-surface system.
  Validation:
- Impeccable design-pattern detection returned zero findings.
- Targeted Prettier, ESLint and strict TypeScript checks passed.
- Browser QA passed at 390px, 430px, 768px, 1024px and 1440px with status 200, no horizontal overflow, no console or page errors, no framework overlay, four preserved checkout links and the required instructor proof visible.
- Final confirmation passed at 390px and 1440px; curriculum and FAQ accordions both opened successfully and the mobile full-page visual review passed.
  Risk / follow-up:
- Live checkout still requires a matching published product row with verified commercial data; the page intentionally continues to hide price and offer information until that source exists.
- The older unreferenced `practical-return-course-landing.tsx` remains untouched so unrelated concurrent work was not overwritten.
  Commit:
- pending

## LOG-0006 — 2026-08-22 — Student dashboard build blockers corrected

Agent: Codex
Type: BUGFIX
Scope: `/dashboard`, `/dashboard/courses/[slug]`, dashboard compilation and secure resource actions
Context & Rationale:

- The user reported a Turbopack JSX parser failure in `student-dashboard.tsx` that also prevented unrelated public routes from compiling in development.
- Once that syntax error was corrected, strict TypeScript exposed a second build blocker where an API resource-download URL was being passed through Next.js typed page routing.
  Summary of Changes:
- Added the missing `CardContent` closing tag in the empty-dashboard fallback and formatted the component so JSX nesting is explicit and maintainable.
- Changed enrolled resource-download actions from `next/link` to standard anchors, preserving the server-side download endpoint and enrollment authorization while satisfying typed route constraints.
  Files:
- src/components/dashboard/student-dashboard.tsx
- src/components/dashboard/course-workspace.tsx
- logs.md
  Data / DB impact:
- none; workspace data, enrollment checks and protected resource authorization remain unchanged.
  Documentation updated:
- logs.md
  Validation:
- Targeted Prettier and ESLint passed for both dashboard components.
- Strict TypeScript passed with no errors.
- Development compilation recovered and returned status 200 for `/dashboard`, `/dashboard/courses/income-tax-working-framework` and `/courses/practical-paper-return-e-return-filing`.
- `pnpm build` passed, including strict TypeScript and generation of all 44 pages.
  Risk / follow-up:
- none identified for this fix; resource downloads still use the existing protected API route.
  Commit:
- pending

## LOG-0007 — 2026-08-22 — Data-driven student learning workspace and Admin delivery controls

Agent: Codex
Type: FEATURE
Scope: `/dashboard`, `/dashboard/courses/[slug]`, `/admin/courses`, `/admin/students`, protected course resources and learning-delivery schema
Context & Rationale:

- The user requested the existing Associates Academy dashboard be extended—not replaced—with expandable modules, accurate progress, Google Meet/Calendar actions, private learning resources and Admin-operated course delivery.
- Completion must be staff-managed, live actions must never leak to preview learners, and the visual language must stay consistent with the cream/navy editorial system.
  Summary of Changes:
- Added batch/module-scoped `class_sessions` and staff-managed `module_progress` data models with foreign-key indexes, RLS, explicit grants and audit triggers.
- Replaced static student dashboard/course workspace content with enrollment-based progress, accessible module accordions, class action states, recordings and entitlement-safe resource downloads.
- Added dedicated Admin course and student routes for batch, module, session, Google link, resource and learner-completion management, including verified private file upload handling.
- Added validation that accepts only HTTPS Google Meet and Google Calendar URLs, and retained a clearly labelled non-persistent local preview for development.
  Files:
- supabase/migrations/20260822103000_add_learning_sessions_and_progress.sql
- src/app/(student)/dashboard/page.tsx
- src/app/(student)/dashboard/courses/[slug]/page.tsx
- src/app/(admin)/admin/courses/page.tsx
- src/app/(admin)/admin/students/page.tsx
- src/app/(admin)/admin/courses/actions.ts
- src/app/api/dashboard/resources/[id]/route.ts
- src/components/dashboard/student-dashboard.tsx
- src/components/dashboard/course-workspace.tsx
- src/components/dashboard/live-class-actions.tsx
- src/components/admin/learning-management.tsx
- src/components/admin/course-resource-uploader.tsx
- src/lib/learning/*
- src/lib/validation/learning.*
- src/types/database.ts
- UI.md, architecture.md, backend.md, security.md, flows.md, DATA.md, logs.md
  Data / DB impact:
- New migration creates `class_sessions` and `module_progress`. It has not been applied to a Supabase environment in this change set.
- Private resource downloads require both database row access and a fresh server-side active-enrollment check before a five-minute signed URL is produced.
  Documentation updated:
- UI.md
- architecture.md
- backend.md
- security.md
- flows.md
- DATA.md
- MIGRATION.md
- logs.md
  Validation:
- `pnpm lint` passed with zero warnings.
- `pnpm typecheck` passed.
- `pnpm test` passed: 17 tests across 6 files, including Google URL validation and calculated progress.
- `pnpm exec playwright test tests/e2e/learning-workspace.spec.ts` passed in Chromium and Pixel 7 projects (6 tests).
- `pnpm build` passed with all 44 routes generated.
- Browser QA verified no desktop overflow, functioning module disclosure, no browser console errors and a visual check of the dashboard action-panel treatment. Playwright mobile verification confirmed no horizontal overflow.
  Risk / follow-up:
- Apply the migration and regenerate `src/types/database.ts` from the connected Supabase schema before deploying this feature.
- Local demo actions intentionally do not persist. Real create/edit, storage upload and download behavior requires configured Supabase credentials and a migrated environment.
  Commit:
- pending

## LOG-0008 — 2026-08-22 — Course-scoped materials and top-priority live-class panel

Agent: Codex
Type: FEATURE
Scope: student course workspace, course-resource authorization and Admin course-material registration
Summary of Changes:

- Moved the next-live-class experience immediately below the course hero, ahead of progress at every viewport. It now uses the requested split white/cream card, countdown chips and large tactile Meet/Calendar actions.
- Added a separate lower `Course materials & certificate` section to every course workspace. Module materials stay within their module accordion; course-wide materials and the learner's issued certificate remain separate.
- Added `course_resources`, staff-only management/RLS/audit coverage, a validated Admin registration action, and protected signed-download routes for course files and owner certificates.
Data / DB impact:

- New append-only migration: `20260822114500_add_course_resources.sql`. It must be applied after `20260822103000_add_learning_sessions_and_progress.sql` before course-level files can be stored.
Validation:

- `pnpm lint`, `pnpm typecheck` and `pnpm test` passed.
- The focused Pixel 7 dashboard E2E passed, including the live-class-before-progress assertion; the full learning-workspace suite was also previously green before this focused layout follow-up.
Risk / follow-up:

- Regenerate Supabase types after applying the migration. The local demo does not generate real downloadable files or certificates.
Commit:
- pending

## LOG-0019 — 2026-08-22 — Practical Return landing-page copy rewrite

Agent: Codex
Type: CONTENT / UI COPY
User intent: Replace and shorten the Practical Paper Return & E-Return Filing landing-page copy using the supplied human, conversion and SEO brief while preserving the existing component structure and runtime commerce source.
Exact changed files:

- `src/lib/content/practical-return-course.ts`
- `src/components/marketing/practical-return-course-page.tsx`
- `src/app/(marketing)/courses/[slug]/page.tsx`
- `logs.md`

Summary of Changes:

- Reworked hero, problem, return-flow, portal, audience, capability, instructor, curriculum, consistency, file anatomy, journey, review, transformation, enrollment, registration, FAQ and final CTA copy.
- Added the supplied natural SEO wording to route metadata without adding unsupported claims.
- Preserved the existing Supabase runtime price/regular-price read path; no price was hardcoded into the landing page.
- Kept the existing section/component structure, checkout links, accordion behavior and course scope while simplifying visible copy and reducing repeated jargon.

Data / DB impact:

- None. Static course copy remains owned by `src/lib/content/practical-return-course.ts`; commerce remains database-authoritative.

Documentation updated:

- `logs.md` only; no ownership, route, visual-token or runtime contract changed.

Validation:

- `pnpm typecheck` passed.
- `pnpm lint` passed with zero warnings.
- `pnpm test -- --run tests/e2e/public-journey.spec.ts` passed: 8 files and 32 tests.
- `pnpm build` compiled successfully and produced `.next/BUILD_ID`; the command output did not include a final completion line before the shell returned.

Risk / follow-up:

- In-app Browser visual inspection at 390px and 1440px was not completed in this turn because browser-control tooling was not available in the exposed tool set. Existing responsive layout/classes and route smoke coverage remain unchanged.

Commit:
- pending

## LOG-0009 — 2026-08-22 — Student dashboard visual redesign

Agent: Codex
Type: UI FEATURE
Scope: `/dashboard` and `/dashboard/courses/[slug]`
Summary of Changes:

- Rebuilt the student-facing composition around the approved mockup direction: navy dotted learning hero, next-class panel, enrolled-course cards, compact shortcuts, denser module workspace and a supporting operational sidebar.
- Kept the existing design-system palette, typography, card language and live/enrollment behavior intact while deliberately omitting decorative scales, books and other mockup artwork.
- Retained the data-driven rule: only real enrollments, course resources and issued certificates render as actionable items.
Documentation updated:

- UI.md
- logs.md
Validation:

- `pnpm typecheck` and `pnpm lint` passed after the redesign.
- In-app browser connection could not initialize in this desktop session; local server remains available at `/dashboard` for visual review.
Commit:
- pending

## LOG-0010 — 2026-08-22 — Unified public footer redesign

Agent: Codex
Type: UI
Scope: shared marketing footer and `/ebook`
Summary of Changes:

- Rebuilt the shared public footer around the supplied reference: editorial Tax Brief lead, bordered action panel, restrained divider, sparse information columns and compact legal/social strip.
- Added the existing Associates Academy navy dot texture and subtle indigo glow without changing brand facts, policies, support details, navigation targets or Tax Brief data flow.
- Replaced the eBook route's bespoke footer with the shared footer, preserving its mobile safe-area spacing around the existing sticky purchase action.
Documentation updated:

- UI.md
- design.md
- logs.md
Data / DB impact:

- None.
Validation:

- `pnpm typecheck` passed.
- `pnpm lint` passed with zero warnings.
- `pnpm check` passed.
- Captured and visually inspected the homepage at 1440px and `/ebook` at Pixel 7 width; the footer rendered, stacked intentionally on mobile and showed no visible overflow.
- `agent-browser` was unavailable in this desktop environment, so Playwright screenshots were used for browser-based visual QA.
Risk / follow-up:

- None.
Commit:
- pending

## LOG-0011 — 2026-08-22 — Footer Tax Brief density adjustment

Agent: Codex
Type: UI
Scope: shared footer lead section
Summary of Changes:

- Reduced the Tax Brief lead heading from display-scale sizing to a compact editorial heading at desktop and mobile breakpoints.
- Tightened the lead grid gap, CTA card padding, supporting copy leading, button height and divider rhythm while leaving the information columns, links, dot texture and business facts unchanged.
Documentation updated:

- logs.md
Data / DB impact:

- None.
Validation:

- `pnpm typecheck` passed.
- `pnpm lint` passed with zero warnings.
- Captured and visually inspected homepage screenshots at 1440px and Pixel 7 widths.
Risk / follow-up:

- None.
Commit:
- pending

## LOG-0012 — 2026-08-22 — Course checkout redesign and commerce controls

Agent: Codex
Type: FEATURE
Scope: course checkout, course-specific coupons, profile checkout data and Admin coupon management
Summary of Changes:

- Replaced the static course checkout with authenticated, database-backed `/checkout/[slug]` pages. Published course facts, prices, discount display, enrollment state and order totals are now server-authoritative; the legacy query URL redirects and the eBook inline checkout remains compatible.
- Added the cream/navy two-column checkout composition, expanded enrollment profile fields, server-generated coupon quotes, consent divider and active-enrollment purchased state.
- Added course-bound coupon enforcement in the checkout/order functions, plus Admin/Owner create/edit controls at `/admin/coupons` for the course assignment, discount, limits, dates and active state.
Data / DB impact:

- New append-only migration: `20260822094931_course_checkout_commerce.sql`. It extends profiles, requires `coupons.product_id`, adds the lookup index, and replaces the quote/order RPC contracts with explicit grants and RLS-safe security-definer behavior.
Documentation updated:

- UI.md
- design.md
- architecture.md
- backend.md
- DATA.md
- flows.md
- security.md
- MIGRATION.md
- design-qa.md
- logs.md
Validation:

- `pnpm typecheck` passed.
- `pnpm lint` passed with zero warnings.
- `pnpm test` passed: 7 files and 20 tests.
- `pnpm check` completed, including brand guard, lint, typecheck, tests and production build; the current production artifact is `.next/BUILD_ID` dated 2026-08-22 16:17.
- Visual QA is recorded as blocked in `design-qa.md`: the chosen in-app Browser could not attach, and no direct Playwright fallback was used without user permission.
Risk / follow-up:

- Apply the migration and regenerate Supabase types in the connected environment before production rollout.
- Re-run browser/E2E and the 1440px/390px reference comparison after the in-app Browser reconnects, or after the user authorizes a local Playwright fallback.
Commit:
- pending

## LOG-0013 — 2026-08-22 — Production-reference checkout fidelity pass

Agent: Codex
Type: UI FIX
User intent: make the course-details/enrollment-details checkout and coupon block match the supplied production reference exactly.
Exact changed files:

- `src/app/(marketing)/checkout/[slug]/page.tsx`
- `src/components/checkout/checkout-form.tsx`
- `src/components/checkout/checkout-reference-chrome.tsx`
- `src/components/marketing/marketing-chrome.tsx`
- `UI.md`
- `design.md`
- `architecture.md`
- `design-qa.md`
- `logs.md`
Summary of Changes:

- Inspected the live production checkout in the selected in-app Browser and aligned the local route to its compact header, `max-w-6xl` grid, course card, information footer and support control.
- Rebuilt the enrollment field and coupon block geometry around the supplied authenticated screenshot while retaining the validated quote and payment behavior.
Data / DB impact:

- None. Product, enrollment, profile and coupon contracts are unchanged.
Documentation updated:

- UI.md
- design.md
- architecture.md
- design-qa.md
- logs.md
Validation:

- In-app Browser desktop comparison at `1670 × 1477` and mobile inspection at `390 × 844` completed; mobile scroll width equals viewport width and browser console has no errors.
- `pnpm typecheck` passed.
- `pnpm test` passed: 7 files and 20 tests.
- `pnpm lint` was run after the visual changes and completed with zero warnings.
Risk / follow-up:

- Production-reference inspection was unauthenticated; the supplied authenticated screenshot remains the form-state visual truth.
Commit:
- pending

## LOG-0014 — 2026-08-22 — Authenticated enrollment-form geometry correction

Agent: Codex
Type: UI FIX
User intent: inspect the logged-in live checkout and make the enrollment details and coupon controls match it exactly.
Exact changed files:

- `src/components/checkout/checkout-form.tsx`
- `src/components/checkout/checkout-reference-chrome.tsx`
- `src/app/(marketing)/checkout/[slug]/page.tsx`
- `UI.md`
- `design-qa.md`
- `logs.md`
Summary of Changes:

- Claimed and inspected the user-provided authenticated production tab rather than relying on the anonymous login-gate state.
- Replaced the oversized local form controls with the measured production geometry: a 28px card inset, 12px field grid, 41.33px fields, 94.67px coupon panel and 48px payment action.
- Moved the visually hidden legal copy out of the form flow so it cannot add layout height; aligned the profile avatar/header height to the production 68.67px measurement.
Data / DB impact:

- None. Checkout validation, quote and payment behavior are unchanged.
Documentation updated:

- UI.md
- design-qa.md
- logs.md
Validation:

- Authenticated production and local form geometry compared in the in-app Browser at `929 × 552`; local form height and input heights match exactly, with only the local scrollbar width difference noted in design QA.
- `pnpm typecheck` passed.
- Focused checkout validation suite passed.
Risk / follow-up:

- None.
Commit:
- pending

## LOG-0015 — 2026-08-22 — Dock analytics preference below navigation

Agent: Codex
Type: UI FIX
User intent: remove the floating analytics preference control from the lower-right area across the website and attach it below the navigation so it no longer disturbs WhatsApp support.
Exact changed files:

- `src/components/analytics/analytics-runtime.tsx`
- `analytics.md`
- `flows.md`
- `UI.md`
- `design.md`
- `design-qa.md`
- `logs.md`
Summary of Changes:

- Repositioned the root-mounted analytics preference control from `bottom-right` to a fixed upper-right dock directly below the shared header.
- Increased the control to a 44px touch target while preserving its existing privacy dialog, opt-out behavior and analytics contracts.
- Documented the shared positioning rule and recorded desktop/mobile collision and overflow checks.
Data / DB impact:

- None. Analytics events, consent state, storage keys, cookies and retention behavior are unchanged.
Documentation updated:

- `analytics.md`
- `flows.md`
- `UI.md`
- `design.md`
- `design-qa.md`
- `logs.md`
Validation:

- `pnpm typecheck` passed.
- `pnpm lint` passed with zero warnings.
- `pnpm test` passed: 7 files and 20 tests.
- `pnpm build` passed, generating all 46 routes.
- `pnpm check` was run; its constituent brand, lint and typecheck stages completed before the final standalone build confirmation.
- In-app Browser checks at `1440 × 900` and `390 × 844` confirmed no analytics/WhatsApp overlap, no mobile horizontal overflow and a fixed `84px` analytics-control top position after scrolling.
Risk / follow-up:

- None.
Commit:
- pending

## LOG-0016 — 2026-08-22 — Correct analytics preference to footer placement

Agent: Codex
Type: UI FIX
User intent: correct the analytics preference control so it is a permanent footer button at the bottom-right, not a navigation-adjacent or viewport-floating button.
Exact changed files:

- `src/components/analytics/analytics-runtime.tsx`
- `src/components/marketing/site-footer.tsx`
- `src/components/checkout/checkout-reference-chrome.tsx`
- `src/app/(marketing)/checkout/[slug]/page.tsx`
- `analytics.md`
- `flows.md`
- `UI.md`
- `design.md`
- `design-qa.md`
- `logs.md`
Summary of Changes:

- Removed the root-level floating analytics trigger and retained only the runtime dialog and preference behavior.
- Added static, bottom-right analytics controls to the shared public footer and course-checkout footer; both dispatch to the existing analytics preference dialog.
- Raised the checkout-only floating WhatsApp action to preserve separation when the checkout footer comes into view.
Data / DB impact:

- None. Analytics events, consent state, storage keys, cookies and retention behavior are unchanged.
Documentation updated:

- `analytics.md`
- `flows.md`
- `UI.md`
- `design.md`
- `design-qa.md`
- `logs.md`
Validation:

- `pnpm typecheck` passed.
- `pnpm lint` passed with zero warnings.
- `pnpm build` passed; `.next/BUILD_ID` was generated at 2026-08-22 17:25.
- `pnpm test` passed: 7 files and 20 tests.
- In-app Browser confirmed the footer trigger opens the existing analytics dialog, the desktop checkout footer does not overlap WhatsApp, and the `390px` checkout document has no horizontal overflow.
Risk / follow-up:

- None.
Commit:
- pending

## LOG-0017 — 2026-08-22 — Restore full public navigation across public routes

Agent: Codex
Type: UI FIX
User intent: retain the liked compact cream navbar color/size while restoring the prior full public navigation, clickable logo, Login and course-browse action wherever public navigation appears.
Exact changed files:

- `src/components/brand-logo.tsx`
- `src/components/marketing/site-header.tsx`
- `src/components/checkout/checkout-reference-chrome.tsx`
- `src/app/(marketing)/checkout/[slug]/page.tsx`
- `src/components/ebook/ebook-sales-page.tsx`
- `UI.md`
- `design.md`
- `design-qa.md`
- `logs.md`
Summary of Changes:

- Standardized public marketing, checkout and eBook headers on the compact 68px cream navigation treatment.
- Restored Home, Courses, Resources, Tax Tools and About links, with Login and Course Browse actions at desktop and in the mobile menu.
- Expanded the real-logo home target, restored the Professional Learning lockup and preserved visible keyboard focus.
Data / DB impact:

- None. Navigation, authentication and commerce paths retain their existing server behavior.
Documentation updated:

- `UI.md`
- `design.md`
- `design-qa.md`
- `logs.md`
Validation:

- `pnpm typecheck` passed.
- `pnpm lint` passed with zero warnings.
- `pnpm build` passed; `.next/BUILD_ID` was generated at 2026-08-22 17:43.
- `pnpm test` passed: 7 files and 20 tests.
- In-app Browser verified the checkout desktop header has all five public links, Login, Course Browse and a `68.67px` height; eBook uses the identical link/action set. The mobile document width remains `390px` with no horizontal overflow.
Risk / follow-up:

- Dashboard and Admin retain their role-specific operational navigation rather than receiving public marketing links.
Commit:
- pending

## LOG-0018 — 2026-08-22 — Practical Return course pricing and checkout activation

Agent: Codex
Type: FEATURE
Scope: Practical Paper Return & E-Return Filing course catalog, landing enrollment offer and course checkout
Summary of Changes:

- Added the published Supabase course product `practical-paper-return-e-return-filing` with a ৳2,000 regular price and ৳1,600 offer price (৳400 discount), plus its course outcomes row.
- Activated the existing dynamic checkout route at `/checkout/practical-paper-return-e-return-filing`; production continues to read published product/course data, enrollment state and checkout totals from the database.
- Bound the practical course landing’s enrollment card to the same published price row so marketing and checkout cannot drift. Local development-only checkout/quote fallback now includes the second course with the matching price.

Data / DB impact:

- Direct catalog upsert only; no schema, RLS, function, grant or generated-type change. The product is published as a `course` with merchant-paid gateway fee mode.

Documentation updated:

- `UI.md`
- `architecture.md`
- `design-qa.md`
- `logs.md`

Validation:

- Read back the Supabase product/course row: product ID 3, course ID 2, published, price `1600.00`, compare-at price `2000.00`.
- The running local checkout returned HTTP 200 with the correct ৳2,000/৳1,600 price pair; its `DEMO20` quote returned ৳1,600 subtotal, ৳320 discount and ৳1,280 payable amount.
- `pnpm typecheck` passed.
- `pnpm test -- --run` passed: 7 files, 20 tests.
- `pnpm build` passed and generates the dynamic course and checkout routes.
- `pnpm check` reached ESLint and stopped on an existing unrelated unused `Link` warning in `src/components/ebook/ebook-sales-page.tsx`.
- The selected in-app Browser control was unavailable, so the new route’s 1440px/390px visual capture remains recorded as blocked in `design-qa.md`; no unselected Playwright browser automation was used.

Risk / follow-up:

- Open the new local route in the selected browser and complete the two viewport comparison before a visual-fidelity sign-off.

Commit:
- pending
## LOG-0019 — 2026-08-22 — Production-grade guest-first PayStation course payments

Agent: Codex
Type: FEATURE / SECURITY / DATABASE
User intent: replace the authenticated/mock course payment path with a guest-first PayStation Hosted Checkout flow whose verification, entitlement, enrollment, recovery and reconciliation are server/database authoritative while preserving catalog, coupon, admin and eBook behavior.
Exact changed files:

- `.env.example`
- `PAYMENTS.md`
- `DOCUMENTATION.md`
- `PROJECT.md`
- `README.md`
- `MIGRATION.md`
- `UI.md`
- `DATA.md`
- `architecture.md`
- `backend.md`
- `flows.md`
- `security.md`
- `design-qa.md`
- `logs.md`
- `playwright.config.ts`
- `vercel.json`
- `vitest.setup.ts`
- `src/app/(admin)/admin/page.tsx`
- `src/app/(marketing)/auth/page.tsx`
- `src/app/(marketing)/checkout/[slug]/page.tsx`
- `src/app/(marketing)/payment/failed/page.tsx`
- `src/app/(marketing)/payment/recovery/actions.ts`
- `src/app/(marketing)/payment/recovery/page.tsx`
- `src/app/(marketing)/payment/result/page.tsx`
- `src/app/(marketing)/payment/success/page.tsx`
- `src/app/api/checkout/quote/route.ts`
- `src/app/api/cron/reconcile-payments/route.ts`
- `src/app/api/payments/claim/route.ts`
- `src/app/api/payments/paystation/callback/route.ts`
- `src/app/api/payments/paystation/initiate/route.ts`
- `src/app/auth/callback/route.ts`
- `src/components/auth/auth-form.tsx`
- `src/components/checkout/checkout-form.tsx`
- `src/components/checkout/payment-result-refresh.tsx`
- `src/components/ebook/ebook-sales-page.tsx`
- `src/lib/auth.ts`
- `src/lib/payments/paystation.test.ts`
- `src/lib/payments/paystation.ts`
- `src/lib/payments/service.ts`
- `src/lib/payments/verification.test.ts`
- `src/lib/payments/verification.ts`
- `src/lib/validation/checkout.test.ts`
- `src/lib/validation/checkout.ts`
- `src/types/database.ts`
- `supabase/migrations/20260822155207_guest_course_paystation_flow.sql`
- `supabase/tests/guest_course_payment.sql`
- `tests/e2e/paystation-payment-flow.spec.ts`
- `tests/e2e/public-journey.spec.ts`

Summary of Changes:

- Made course checkout public and Bengali-first with required guest name, email, primary phone, WhatsApp, occupation and city fields; active learners still see their workspace instead of a payable form.
- Added immutable, collision-safe pending orders, payment attempts, append-only verification evidence, paid-unclaimed entitlements and confirmed-email claim tracking. Course quote/order, verification and claim RPCs are service-role-only; elevated functions use fixed empty search paths.
- Replaced the mock adapter with typed Sandbox/Live PayStation Hosted Checkout initiation and invoice-status lookup, provider status normalization, mode-specific official encoding, timeouts, safe diagnostics and strict PayStation HTTPS URL validation.
- Made callback data an invoice-only trigger for direct provider verification. Exact invoice/amount/reference/optional returned currency, unique transaction ID and provider success are checked before any entitlement; duplicate callbacks, initiation retries, claims and reconciliation are idempotent.
- Added neutral three-step payment result, locked-email sign-up/login, normal email verification, automatic existing-user enrollment, paid-order recovery and a 10-minute secure reconciliation cron. Still-processing orders expire after 24 hours without enrollment, while a later verified callback can still fulfill.
- Preserved the existing authenticated eBook order contract through the same real Hosted Checkout adapter and removed one behavior-neutral unused eBook import that blocked the zero-warning lint gate.
- Added the payment operations runbook with the exact state machine, environment names, recovery/support process and go-live checklist. Live remains blocked pending owner-approved Sandbox testing and PayStation confirmation of BDT currency evidence in status responses.

Data / DB impact:

- Added the append-only local migration `20260822155207_guest_course_paystation_flow.sql`; Production was not changed.
- Applied the pending local checkout/learning/resource migrations plus the guest payment migration and qualification/ACL hotfixes to the Staging project only. Generated TypeScript database types were refreshed from that migrated Staging schema.
- New payment tables have RLS; anonymous roles have no access. New payment RPCs allow only `service_role`. Unique checkout request, invoice/provider reference and PayStation transaction-ID constraints plus reconciliation indexes were verified.

Documentation updated:

- Added `PAYMENTS.md` and linked it from the documentation graph.
- Updated product, UI, architecture, data, backend, security, flow, migration, setup and visual-QA owner documents.

Validation:

- Staging transactional SQL suite passed with rollback, covering amount mismatch, duplicate request/invoice/callback, immutable retry snapshots, failed/processing/refund, replayed transaction ID, active enrollment rejection, failed sign-up safety, late success after expiry, later claim and repeated claim.
- Staging ACL/RLS audit confirmed all four new RPCs deny `anon` and `authenticated` execution, allow `service_role`, and all payment tables have RLS. Required unique/reconciliation indexes exist. Supabase security advisor reports no warning for the new payment functions; its remaining warnings are established public certificate/analytics and authenticated legacy/admin RPC contracts.
- `pnpm check` passed completely: standalone brand check, zero-warning ESLint, TypeScript, 8 Vitest files/32 tests and the Next.js 16.3 production build with all payment/recovery/reconciliation routes.
- Payment-focused Playwright run passed: 5 tests across Desktop Chrome and Pixel 7, with one intentional desktop skip for the mobile-only validation case. It covered mocked Hosted Checkout handoff/failure, Bengali retry/help, closed-callback recovery, required-field validation and mobile overflow.
- Full-page screenshots at 1440px and Pixel 7 were visually inspected; cream/navy fidelity, six-field hierarchy, legal consent, CTA prominence and responsive stacking passed.
- No PayStation Sandbox or Live transaction was run and no merchant credentials were requested, printed, logged or committed.

Risk / follow-up:

- Owner must privately provide the six decisions/inputs listed in `PAYMENTS.md` before external calls. Sandbox approval and confirmation of PayStation's transaction-status BDT currency evidence are hard Live gates.
- Production migration/promotion remains intentionally pending. Existing Supabase advisor warnings should retain their current documented caller checks or be separately reviewed; they are not introduced by this payment change.

Commit:
- pending

## LOG-0020 — 2026-08-22 — PayStation operating decisions and canonical domain correction

Files changed:

- `.env.example`
- `MIGRATION.md`
- `PAYMENTS.md`
- `logs.md`
- `src/components/admin/admin-overview.tsx`
- `src/emails/payment-receipt.tsx`
- `src/lib/email/process-outbox.tsx`
- `src/lib/site.ts`
- `supabase/migrations/20260822170726_correct_canonical_domain.sql`

Summary of changes:

- Researched the current official PayStation documentation, official Sandbox Postman collection, merchant registration page and merchant-support onboarding guidance.
- Distinguished the supplied Sandbox bKash payer phone/PIN/OTP from PayStation merchant API credentials. No public/shared collection credential was copied into application configuration.
- Confirmed that the existing Live merchant credential must not be used for Sandbox testing and that the merchant should request owner-specific Sandbox Merchant ID and Password from PayStation for the existing account; no duplicate merchant registration is needed.
- Selected `https://www.associatesacademy.bd` as the canonical production origin and `https://www.associatesacademy.bd/api/payments/paystation/callback` as the callback URL after checking the live site and DNS. The previous `.com.bd` placeholder was corrected in server fallbacks, examples and admin display.
- Selected the existing site contact `contact@associatesacademy.bd`, merchant-borne gateway charge (`pay_with_charge=0`), 10-minute reconciliation and 24-hour processing expiry. The runbook records the remaining PayStation technical confirmations: Sandbox credentials/encoding, transaction-status currency evidence, webhook or IP allowlist availability and the contracted charge rate.
- Kept all merchant secrets server-only. No Live transaction, Live API call, credential capture or production deployment was performed.

Data / DB impact:

- Added the append-only migration `20260822170726_correct_canonical_domain.sql` rather than rewriting the applied foundation seed.
- Applied it to Supabase Staging project `qwbmqvhcgaxgrqmpmksa` only. Read-back confirmed `site_settings.brand.domain = associatesacademy.bd`; Production was not changed.
- The migration changes JSON configuration data only, so generated database types did not require regeneration.

Validation:

- `pnpm check` passed: brand check, zero-warning ESLint, TypeScript, 8 Vitest files/32 tests and Next.js 16.3 production build.
- `git diff --check` reported no whitespace errors (only the repository's existing Windows line-ending notices).
- The build includes public `/checkout/[slug]`, neutral `/payment/result`, claim, PayStation callback/initiation and reconciliation routes.

Risk / follow-up:

- Do not activate Live mode or perform a real transaction until PayStation supplies merchant-specific Sandbox API credentials and the Sandbox acceptance suite is approved.
- The currently deployed site does not yet expose the new course checkout route; promotion remains pending after Sandbox verification and production environment/migration review.

Commit:
- pending

## LOG-0021 — 2026-08-22 — Owner-authorized Live activation preflight

Files changed:

- `.env.production.local` (gitignored temporary handoff; contains no secret values yet)
- `PAYMENTS.md`
- `logs.md`

Summary of changes:

- Recorded the owner's explicit approval to proceed with Live activation despite PayStation not providing owner-specific Sandbox merchant API credentials.
- Created a gitignored Production handoff file with the canonical origin and Live mode plus empty slots for the PayStation Live Merchant ID, PayStation Live Password and Supabase Production secret key. No credential was requested in chat or printed.
- Authenticated the linked Vercel CLI project and configured Production-only Sensitive `PAYSTATION_MODE=live`, the canonical `NEXT_PUBLIC_SITE_URL`, and a newly generated cryptographically random `CRON_SECRET`. These values apply only to a future deployment; the current Production deployment was not redeployed.
- Confirmed Vercel still requires `PAYSTATION_LIVE_MERCHANT_ID`, `PAYSTATION_LIVE_PASSWORD` and `SUPABASE_SECRET_KEY` before the payment artifact can be deployed.

Data / DB impact:

- Audited Production Supabase project `atrtavshxnwbthbtzrwb`: 3 products, 0 orders, 0 enrollments and 0 coupons before migration.
- Executed all six pending migrations inside one Production preflight transaction and rolled it back successfully.
- Applied the newsletter, checkout commerce, learning sessions, course resources, guest PayStation payment and canonical-domain migrations to Production in order.
- Ran `supabase/tests/guest_course_payment.sql` against Production in its rollback transaction; it returned `passed` and left 0 persisted orders.

Validation:

- Read-back confirmed `site_settings.brand.domain = associatesacademy.bd`, RLS enabled on `paid_entitlements`, no `anon` create-order permission, no `authenticated` verification permission and service-role claim permission.
- Production migration ledger contains all six applied migration entries.
- Supabase's current changelog was reviewed; its listed breaking changes do not affect these database migrations.

Risk / follow-up:

- Live mode is not customer-accessible yet because no new deployment has been made and the three required secrets remain absent.
- After the owner fills the gitignored handoff file, upload the three secrets as Sensitive Production-only Vercel variables without printing them, remove the temporary file, deploy the verified artifact, run non-charge readiness checks and then one controlled owner-approved Live checkout.

Commit:
- pending

## LOG-0022 — 2026-08-23 — PayStation Live activation and Production recovery hardening

Files changed:

- `MIGRATION.md`
- `PAYMENTS.md`
- `logs.md`
- `vercel.json`
- `src/app/(admin)/admin/orders/page.tsx`
- `src/app/api/admin/payments/reconcile/route.ts`
- `src/app/api/cron/maintenance/route.ts`
- `src/components/admin/payment-reconciliation-panel.tsx`
- `supabase/migrations/20260822180343_fix_public_catalog_rls.sql`
- `supabase/migrations/20260822180647_repair_seeded_bengali_content.sql`

Summary of changes:

- Validated the owner-filled gitignored handoff without printing values, uploaded PayStation Live Merchant ID/password and Supabase secret as Vercel Production Sensitive variables, and deleted the handoff file.
- Activated `PAYSTATION_MODE=live`, canonical Production site URL and a generated random `CRON_SECRET`; no secret was logged, committed or exposed to the browser.
- Adapted reconciliation to Vercel Hobby's two-daily-cron limit: email processing remains separate, while `/api/cron/maintenance` independently combines daily analytics sync and PayStation reconciliation. The dedicated token-protected reconciliation endpoint remains ready for an external 10-minute schedule/Pro plan.
- Added a Bengali-first, owner-only `/admin/orders` reconciliation desk with responsive invoice history and a server-authoritative POST action. Production currently has no Auth/Owner account, so the daily safety net operates before the first owner account is created.
- Fixed the historical anonymous catalog RLS defect by removing private staff/owner helper calls from anonymous public policies; staff access stays in separate authenticated policies.
- Conditionally repaired the known historical Bengali seed mojibake without overwriting already-correct content.

Data / DB impact:

- Applied `fix_public_catalog_rls` and `repair_seeded_bengali_content` to Staging and Production after successful transactional dry runs.
- Production `site_settings.payment` now records provider `paystation` and mode `live`.
- Created charge-free readiness invoice `AA-8838E67529BA4037A0DE6AD08499C330` for BDT 1,710. PayStation returned a Hosted Checkout URL on `api.paystation.com.bd`; the URL was not opened or paid. The order/attempt were cancelled/failed with a readiness diagnostic and have zero enrollment and zero entitlement.

Deployment:

- First Live artifact deployment succeeded after the Hobby cron correction.
- Final Production deployment `dpl_J5wAHb3EXXGRKaX6Xpoz2ur8Bski` is READY and aliased to `https://www.associatesacademy.bd`, the apex domain and the Vercel production aliases.

Validation:

- `pnpm check` passed after the final runtime changes: brand check, zero-warning ESLint, TypeScript, 8 Vitest files/32 tests and Next.js 16.3 production build.
- Vercel's remote build passed and includes checkout, callback, result/recovery, owner reconciliation and daily maintenance routes.
- Production smoke: homepage/course checkout/practical checkout/cancelled-result return 200; callback without invoice returns 400; both cron endpoints return 401 without `CRON_SECRET`; owner reconciliation redirects an unauthenticated request to auth.
- Desktop 1440px and Pixel 7 full-page checkout screenshots passed cream/navy hierarchy, six-field form stacking, touch targets and overflow review. After data repair, home/checkout/eBook HTML has zero known `à`/`â` mojibake markers.
- Anonymous RLS read-back sees 3 published products and 2 published courses while exposing 0 secret settings and 0 private modules. New service-only payment RPCs remain absent from Supabase security warnings.

Risk / follow-up:

- No real customer funds have been charged. The owner must complete the first real Hosted Checkout interactively; payment-wallet/card credentials and OTP never belong in the app or chat.
- Production has zero Auth users/owner roles. Create and verify the first owner account, then assign its `owner` role before using `/admin/orders`.
- Supabase advisor still reports established intentional public certificate/analytics RPCs and authenticated legacy/CMS/eBook RPCs as SECURITY DEFINER warnings; review them separately against the database-linter remediation guidance. They are not the new service-only payment verification/claim RPCs.

Commit:
- pending

## LOG-0023 — 2026-08-23 — Free Live Workshop Landing Page Implementation

Files changed:

- `architecture.md`
- `UI.md`
- `src/app/(marketing)/workshop/page.tsx`
- `src/lib/content/workshop.ts`
- `src/lib/validation/workshop.ts`
- `src/components/marketing/workshop/workshop-landing.tsx`
- `src/components/marketing/workshop/workshop-hero.tsx`
- `src/components/marketing/workshop/workshop-benefits.tsx`
- `src/components/marketing/workshop/workshop-learning-flow.tsx`
- `src/components/marketing/workshop/workshop-audience.tsx`
- `src/components/marketing/workshop/workshop-instructor.tsx`
- `src/components/marketing/workshop/workshop-event-panel.tsx`
- `src/components/marketing/workshop/workshop-registration-form.tsx`
- `src/components/marketing/workshop/workshop-faq.tsx`
- `src/components/marketing/workshop/workshop-final-cta.tsx`
- `src/components/marketing/workshop/workshop-sticky-cta.tsx`
- `src/components/marketing/workshop/whatsapp-icon.tsx`

Summary of changes:

- Designed and implemented the complete, high-converting, Bengali-first Free Live Workshop landing page for Practical Income Tax Return Preparation at `/workshop`.
- Applied Associates Academy visual identity: cream canvas (`#FBF9F4`), deep navy structure (`#0F1E36`), warm card surfaces (`#FFFFFF`), subtle dotted accents, and Bengali editorial typography.
- Structured page into 11 purpose-driven sections:
  1. Two-column editorial Hero with ledger pill, live event date, and real-time urgency counter
  2. Four key practical Workshop Benefits
  3. Interactive 5-Step Practical Return Preparation Framework
  4. Audience segmentation card ledger (General Taxpayers vs Accounts & Finance Professionals)
  5. Authentic Instructor dossier with credential ledger
  6. Live Event schedule panel with Google Meet platform indicators
  7. Client-side validated 5-field registration form capturing full name, mobile, email, profession, and learning intent
  8. Curriculum preview with return filing topics and sample asset ledger
  9. Responsive FAQ accordion resolving practical return filing queries
  10. Navy final conversion CTA card
  11. Mobile sticky CTA bar anchored to `#free-registration`
- Embedded JSON-LD structured data for Google Event search discovery.

Data / DB impact:

- Added client validation schemas in `src/lib/validation/workshop.ts` with strict Bangladeshi mobile regex (`^(?:\+?8801|01)[3-9]\d{8}$`) and interest category validation.
- Initial static fallback data configured in `src/lib/content/workshop.ts`.

Validation:

- Desktop (1440px), Laptop (1024px), Tablet (768px), and Mobile (390px) responsive QA passed without horizontal overflow.
- Form validation tests passed for required fields and invalid phone numbers.

Risk / follow-up:

- Initial version used offline/memory fallback; Phase 2 was scheduled for database persistence and admin console.

Commit:
- pending

## LOG-0024 — 2026-08-23 — Workshop UI Refinements and WhatsApp Community Access

Files changed:

- `src/components/marketing/workshop/workshop-hero.tsx`
- `src/components/marketing/workshop/workshop-registration-form.tsx`
- `src/components/marketing/workshop/workshop-landing.tsx`
- `src/components/marketing/workshop/workshop-benefits.tsx`

Summary of changes:

- Replaced the AI badge in the registration card header with an editorial Team/Users workshop badge as requested by the owner.
- Redesigned the post-registration WhatsApp Community section to be clean, elegant, and unmistakably mandatory.
- Replaced cluttered card layout with a clean single row featuring a prominent red `⚠ MANDATORY` badge, clear Bengali instruction, and a direct WhatsApp Community link.
- Refined typography and spacing on mobile viewports for smooth scrolling.

Data / DB impact:

- None.

Validation:

- Visual QA in browser confirmed the updated registration card header and simplified mandatory WhatsApp confirmation screen.
- Screen captures taken and reviewed across desktop and mobile viewports.

Risk / follow-up:

- Real Google Meet link remains private and is shared exclusively through the WhatsApp Community.

Commit:
- pending

## LOG-0025 — 2026-08-23 — Workshop Multi-Tenant Schema Architecture & Registration Persistence

Files changed:

- `backend.md`
- `src/types/database.ts`
- `src/lib/content/workshop.ts`
- `src/lib/validation/workshop.ts`
- `src/lib/validation/workshop.test.ts`
- `src/app/(marketing)/workshop/actions.ts`
- `src/app/(marketing)/workshop/page.tsx`
- `src/components/marketing/workshop/workshop-registration-form.tsx`
- `supabase/migrations/20260823120000_workshop_registration_system.sql`

Summary of changes:

- Authored and applied PostgreSQL migration `20260823120000_workshop_registration_system.sql` to Supabase production project `atrtavshxnwbthbtzrwb`.
- Created `public.workshop_registrations_v2` table decoupled from `auth.users` to support friction-free public registrations.
- Added unique constraint on `(workshop_id, normalized_mobile)` to prevent duplicate signups with friendly existing-registration retrieval.
- Created `public.workshop_reg_code_seq` sequence and `public.generate_workshop_registration_code()` stored procedure returning formatted registration codes (`WS26-0001`).
- Enhanced `public.workshops` table with `status`, `timezone`, `platform`, `registration_enabled`, `registration_closes_at`, `max_participants`, and `course_cta_url`.
- Updated `registerForWorkshopAction` server action to query live workshop status, validate capacity limits, check deduplication, generate registration codes, and insert flat UTM attribution parameters.
- Upgraded the post-registration UI with the confirmed Registration ID, "Add to Google Calendar" button, and event summary pill.

Data / DB impact:

- Applied migration `20260823120000_workshop_registration_system.sql` to Supabase.
- Seeded/updated active live workshop records in `workshops`.
- RLS policies configured: public `anon` insert/select, staff manage.

Validation:

- Unit tests in `src/lib/validation/workshop.test.ts` passed for phone normalization, UTM audience mapping, and calendar URLs (39 tests passing).
- Clean TypeScript compilation with 0 errors.

Risk / follow-up:

- Admin management console required to monitor registrations and track conversions.

Commit:
- pending

## LOG-0026 — 2026-08-23 — Workshop Admin Operations Console & Campaign Attribution Tracking

Files changed:

- `architecture.md`
- `backend.md`
- `UI.md`
- `logs.md`
- `src/app/(admin)/admin/workshop/page.tsx`
- `src/app/(admin)/admin/workshop/[id]/page.tsx`
- `src/app/(admin)/admin/workshops/page.tsx`
- `src/app/(admin)/admin/workshop/actions.ts`
- `src/components/admin/admin-shell.tsx`
- `src/components/admin/workshop/workshop-list-view.tsx`
- `src/components/admin/workshop/workshop-kpi-cards.tsx`
- `src/components/admin/workshop/workshop-attribution-table.tsx`
- `src/components/admin/workshop/workshop-participant-table.tsx`
- `src/components/admin/workshop/workshop-participant-drawer.tsx`
- `src/components/admin/workshop/workshop-settings-modal.tsx`
- `src/components/admin/workshop/workshop-header-actions.tsx`

Summary of changes:

- Built the complete multi-workshop admin operations console inside the existing Associates Academy admin shell.
- `/admin/workshop`: Aggregated workshops overview with registration counts, capacity gauges, attendance stats, and one-click registration toggles.
- `/admin/workshop/[id]`: Individual command center with:
  1. Six real-time KPI metric cards (Total Registrations, General Taxpayers, Tax Professionals, Attendance Rate, Course Enrolled, Conversion Rate).
  2. Meta Campaign Strategy attribution matrix ($6 General Taxpayer vs $4 Tax Professional) and detailed UTM breakdown table.
  3. Searchable, multi-filterable participant data table with single-click attendance toggle (`Attended` / `Absent`), bulk attendance actions, and UTF-8 BOM CSV export with full Bengali text support.
  4. Detailed participant slide-over drawer showing full contact metadata, UTM attribution source, attendance history, lead stage, and course conversion status.
  5. Workshop settings modal to configure event date, platform, capacity, registration deadline, and private Google Meet joining URL.
- Created server actions in `src/app/(admin)/admin/workshop/actions.ts` for attendance updates, lead status adjustments, course conversion status tracking, and workshop settings management with optimistic revalidation.

Data / DB impact:

- Live reads and mutations on `workshops` and `workshop_registrations_v2`.
- Local demo auth mode fallback enabled so dev environment can query/mutate without service secrets.

Validation:

- Vitest unit tests: 39 tests passed across 9 test files (`npx vitest run --pool=threads`).
- ESLint: 0 errors, 0 warnings (`npm run lint`).
- TypeScript: 0 errors (`npx tsc --noEmit`).
- Production build: `next build` compiled 52 routes with zero errors.
- End-to-End Browser QA: Submitted live registration with Meta UTM tags on `/workshop`, verified `WS26-0001` generation, verified live appearance in `/admin/workshop/1`, tested live attendance toggle, opened participant drawer, and verified UTF-8 CSV export.

Risk / follow-up:

- Ready for production deployment and Meta ad campaign launch.

Commit:
- pending
