# Security model

## Identity and authorization

- Supabase Auth cookie sessions; Proxy refreshes with `getClaims`.
- Roles live in `user_roles`, never user-editable metadata.
- Every privileged page/action checks the server role; every table repeats enforcement with RLS.
- Owner alone manages roles, integration secrets and destructive settings.

## Database

- RLS enabled on every exposed table.
- Data API privileges are explicit and least-privilege.
- Views use security-invoker behavior; public certificate access goes through a PII-limited RPC.
- Security-definer functions live behind explicit grants, fixed empty search paths and caller checks.
- RLS predicates wrap `auth.uid()`/helpers in scalar selects and indexed columns.

## Payments

- Product price and fees are calculated in PostgreSQL, not accepted from the browser.
- Callback supports GET/POST but uses only the invoice as a lookup hint.
- PayStation verification must match invoice, exact amount, BDT and success status.
- Paid transition, enrollment and outbox insertion are atomic/idempotent.

## Files

Signed uploads use allowlisted buckets, MIME, size and scoped paths. Completion verifies the uploaded object before creating a database reference. Private downloads require user ownership or active entitlement.

## Secrets and observability

Only publishable Supabase values use `NEXT_PUBLIC_`. Supabase secret, PayStation, Resend, Meta, GA4 and Sentry tokens stay in Vercel/Supabase secret configuration. Sentry excludes default PII. Logs/audits never store provider secrets.
