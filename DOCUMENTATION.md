# Documentation graph

This file is the single navigation map for repository knowledge. `AGENTS.md` is the required entry point; this graph tells a contributor where a fact belongs, what must be read before changing it, and which files must be updated afterward. It prevents parallel, scattered sources of truth.

## Authority model

| Priority | Source                                                         | Owns                                         |
| -------- | -------------------------------------------------------------- | -------------------------------------------- |
| 1        | Current application code and applied `supabase/migrations/`    | Runtime behavior and schema truth            |
| 2        | The owner document in the table below                          | Intended product/technical contract          |
| 3        | `logs.md`                                                      | Append-only decision/change history          |
| 4        | Historical projects, screenshots, PRDs, or external references | Evidence only; never overrides current truth |

If the first two disagree, update the documentation in the same change after verifying the implementation. If the intended behavior is unclear, ask before changing production-sensitive behavior.

## Owned knowledge map

| Document          | Single responsibility                                                   | Read before                                           | Update when                                           | Connected to                                   |
| ----------------- | ----------------------------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------- | ---------------------------------------------- |
| `AGENTS.md`       | Global workflow, constraints, skills, log protocol                      | Every task                                            | Working protocol or global boundaries change          | Every document; `logs.md`                      |
| `PROJECT.md`      | Product scope, roles, customer/business rules                           | Product or feature work                               | Scope, roles, product rules change                    | `flows.md`, `DATA.md`, `security.md`           |
| `UI.md`           | Surface inventory, responsive/accessibility behavior                    | Page/component/interaction work                       | UI behavior, routes, loading, responsive rules change | `design.md`, `architecture.md`                 |
| `design.md`       | Visual language, tokens, typography, component styling                  | Any visual design work                                | Tokens, typography, reusable visual rules change      | `UI.md`, design skill                          |
| `architecture.md` | Runtime, routes, component/server boundaries, caching/deployment        | Routes, server actions, caching, build setup          | Route map, data flow, runtime/build boundaries change | `backend.md`, `flows.md`, `DATA.md`            |
| `backend.md`      | Supabase schema groups, storage, RPC/data contracts                     | Database, auth, storage, server data work             | Schema, RPC, storage, auth data contracts change      | `security.md`, `DATA.md`, migrations           |
| `security.md`     | Non-negotiable authorization, secret, payment, privacy rules            | Auth, API, RLS, payment, storage, PII work            | Security invariants or safeguards change              | `backend.md`, `flows.md`, `DATA.md`            |
| `flows.md`        | End-to-end purchase, CMS, media, analytics, certificate, email journeys | Any journey mutation                                  | Step/actor/authorization/result changes               | `PROJECT.md`, `backend.md`, `security.md`      |
| `analytics.md`    | Event contract, consent, retention, external reporting                  | Tracking, CTA, funnel, reporting work                 | Event names/properties/consent/retention change       | `flows.md`, `security.md`, `DATA.md`           |
| `DATA.md`         | Runtime/static data ownership and safe update paths                     | Content, configuration, data-source work              | Data source, validation, publish process changes      | `backend.md`, `architecture.md`, `security.md` |
| `MIGRATION.md`    | Environment promotion, launch gates, rollback                           | Deployments or environment promotion                  | Release process, launch gates, migrations change      | `README.md`, `backend.md`, `security.md`       |
| `PAYMENTS.md`     | PayStation state machine, verification, recovery and go-live operations | Checkout, payment, entitlement or reconciliation work | Payment provider/state/operations contract changes    | `flows.md`, `backend.md`, `security.md`        |
| `README.md`       | Setup and concise operational orientation                               | First local setup                                     | Commands, environment, deployment overview change     | `DOCUMENTATION.md`, `MIGRATION.md`             |
| `logs.md`         | Append-only, self-contained change record                               | Start/resume work; immediately before logging         | Every meaningful change set (append only)             | Every changed document/file                    |

`PRODUCT.md` and `design-qa.md` are task artifacts: use them only for the page/initiative they describe. They do not replace the owner documents above.

## Task-to-document decision table

| Change                                       | Required reads                                                                             | Required documentation updates                                                                                                   |
| -------------------------------------------- | ------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| New or redesigned page                       | `AGENTS.md`, `PROJECT.md`, `UI.md`, `design.md`, `architecture.md`, `DATA.md`, recent logs | `UI.md`, `architecture.md`; `design.md` if shared visual rules change; `DATA.md` if data ownership changes; `logs.md`            |
| Content or CMS update                        | `DATA.md`, `backend.md`, `flows.md`, `security.md`, recent logs                            | `DATA.md` if contract/process changes; relevant owner doc; `logs.md`                                                             |
| Supabase schema/RLS/RPC/storage              | `backend.md`, `security.md`, `DATA.md`, relevant Supabase skills, recent logs              | `backend.md`, `security.md`, `architecture.md`/`flows.md` as relevant, `DATA.md`, `MIGRATION.md` if promotion changes, `logs.md` |
| Payment, checkout, enrollment, email         | `PROJECT.md`, `flows.md`, `backend.md`, `security.md`, `PAYMENTS.md`, recent logs          | Each affected owner document, `PAYMENTS.md` and `logs.md`                                                                        |
| Analytics, CTA, consent, reporting           | `analytics.md`, `flows.md`, `security.md`, `DATA.md`, recent logs                          | `analytics.md`, affected UI/flow docs, `logs.md`                                                                                 |
| Build, dependency, route/runtime, deployment | `architecture.md`, `MIGRATION.md`, `README.md`, recent logs                                | Corresponding documents and `logs.md`                                                                                            |

## Relationship overview

```text
AGENTS.md ──governs──> DOCUMENTATION.md ──routes work to──> owner documents
                                               │
                     ┌─────────────────────────┼─────────────────────────┐
                     ▼                         ▼                         ▼
                 PROJECT.md                 UI.md / design.md       backend.md / DATA.md
                     │                         │                         │
                     └───────────────> flows.md <────────────── security.md
                                               │
                                               ▼
                                         analytics.md

Every meaningful change ──> owner document(s) + append-only logs.md
```

## Non-negotiable anti-drift rule

Do not create a second, unlinked place for product facts, UI rules, data contracts, security rules, or operations guidance. Add the fact to its owner document, link to it from another document only when needed, and record the change once in `logs.md`.
