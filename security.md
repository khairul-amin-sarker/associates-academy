# Security model

This file owns non-negotiable security invariants. Read it together with `backend.md` and `DATA.md` before changing Supabase, auth, API routes, payments, storage, analytics, secrets, certificates, or personal data. When a requested implementation conflicts with these rules, stop and request a safe decision rather than weakening the control.

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
- PayStation merchant credentials exist only in server environment variables; Hosted Checkout is used and no card data enters the app.
- Paid transition, transaction-ID uniqueness, entitlement/enrollment claim and outbox insertion are atomic/idempotent.
- Course checkout quotes and orders resolve the course price, coupon/product assignment, date/usage limits, fee and payable amount in PostgreSQL. A browser cannot quote/order a coupon for another course, create a ৳0 checkout, or bypass an existing active enrollment.
- Guest customer/product/amount snapshots are immutable. Enrollment contact fields are protected order/profile PII; an authenticated checkout uses the verified account email, while a guest entitlement can be claimed only by a server-read, confirmed `auth.users` email matching the stored normalized checkout email.
- PayStation's public status examples currently omit currency. The adapter never fabricates the field and rejects a mismatch when present; Live enablement remains blocked pending provider confirmation of BDT status evidence. See `PAYMENTS.md`.

## Files

Signed uploads use allowlisted buckets, MIME, size and scoped paths. Completion verifies the uploaded object before creating a database reference. Private downloads require user ownership or active entitlement.

## Secrets and observability

Only publishable Supabase values use `NEXT_PUBLIC_`. Supabase secret, PayStation, Resend, Meta, GA4 and Sentry tokens stay in Vercel/Supabase secret configuration. Sentry excludes default PII. Logs/audits never store provider secrets.

## Required security checks for changes

- **Auth/RLS/roles:** use server-side authorization and RLS; do not authorize with client state or user-editable metadata. Policies must use explicit target roles and ownership/staff predicates, with `USING` and `WITH CHECK` where updates need both.
- **Database/API exposure:** every exposed table requires explicit grants and RLS. New views must use security-invoker behavior or remain inaccessible to browser roles. Any elevated function needs a fixed search path, minimal grants, and an explicit caller check.
- **Payment/enrollment:** validate and re-verify provider data server-to-server before the idempotent database fulfillment path. A browser redirect, query parameter, or callback body is never proof of payment.
- **Storage:** keep private course/eBook/certificate files private. Issue access only after entitlement/ownership verification, with scoped signed URLs. Do not log the URL or raw object path when it is sensitive.
- **Learning actions:** Google Meet and Calendar URLs are validated HTTPS Google-hosted links, are readable only through the active batch/session policy, and are never returned to a preview or unentitled learner. Module completion is staff-managed; students have no mutation policy.
- **Privacy/analytics:** analytics and application logs contain no PII, secrets, tokens, payment evidence, or signed URLs. Analytics validates its bounded schema and honors opt-out.
- **Newsletter PII:** subscriber email and interests stay in the RLS-protected `newsletter_subscribers` table, are never placed in analytics, and are written only through a Zod-validated server action using a server-only secret client. Browser roles have no insert or broad read grant.
- **Secrets:** never commit, echo, return, or place server credentials in `NEXT_PUBLIC_*`, static content, migrations, tests, or documentation examples.

For any change in this section, document the affected invariant in the owning document and record the validation honestly in `logs.md`.
