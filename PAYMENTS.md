# PayStation payment operations

This document owns the course-payment state machine, verification contract, recovery process and go-live gates. It supplements `flows.md`, `backend.md` and `security.md`; implementation truth remains the migrations and server code.

## Course payment state machine

| Stored state      | Meaning                                                                                 | Enrollment allowed | Next states                                                                  |
| ----------------- | --------------------------------------------------------------------------------------- | ------------------ | ---------------------------------------------------------------------------- |
| `pending_payment` | Durable immutable order exists; Hosted Checkout has not yet verified payment            | No                 | `processing`, `failed`, `expired`, `paid_unclaimed`, `verified_paid`         |
| `processing`      | PayStation status lookup succeeded but transaction is not final                         | No                 | `processing`, `failed`, `expired`, `paid_unclaimed`, `verified_paid`         |
| `failed`          | Provider reports a failed/cancelled transaction or verification evidence is invalid     | No                 | `failed`, `paid_unclaimed`, `verified_paid` after a later valid lookup       |
| `cancelled`       | Explicit operational cancellation                                                       | No                 | `paid_unclaimed` or `verified_paid` only after a later valid lookup          |
| `expired`         | Reconciliation found a still-pending/processing order after its 24-hour checkout window | No                 | `paid_unclaimed` or `verified_paid` only after a later valid lookup/callback |
| `paid_unclaimed`  | Exact successful payment is verified but no confirmed matching Auth account exists      | No                 | `verified_paid`, `refunded`                                                  |
| `verified_paid`   | Payment is verified and its confirmed-email entitlement has been claimed/enrolled       | Yes, exactly once  | `verified_paid`, `refunded`                                                  |
| `refunded`        | Provider reports refund; entitlement/enrollment is revoked                              | No                 | `refunded`                                                                   |

Payment attempts and append-only `payment_verification_events` retain provider status, evidence-match booleans, diagnostic codes and safe response snapshots. Unique invoice, checkout-request and PayStation transaction-ID constraints plus row locks/advisory locks make initiation, verification and claim retries idempotent.

## Browser and server sequence

1. Every course purchase action targets `/checkout/[course-slug]`. A guest supplies full name, email, primary phone, WhatsApp number, occupation and city.
2. The server resolves the published course and invokes `create_guest_course_order`. PostgreSQL recalculates product price, course-specific coupon, discount, configured gateway-fee policy and non-zero BDT total; it also rejects an active enrollment.
3. The database creates one pending order and payment attempt before redirect. Customer, product, price, coupon, discount, fee, total, currency and provider-mode snapshots are immutable.
4. The server re-reads the stored customer snapshot and calls PayStation `POST /initiate-payment` with server-only credentials. Sandbox initiation uses the official collection's multipart encoding; Live uses the documented URL-encoded v1 contract.
5. GET/POST callback data is only an invoice lookup trigger. The callback calls PayStation `/transaction-status` itself, records the evidence atomically, then redirects to `/payment/result?invoice=...`.
6. Success requires a successful status response, successful transaction state, exact stored invoice and amount, a non-empty never-reused transaction ID, and matching reference/currency when PayStation returns those fields. The order and initiation currency are always BDT.
7. A confirmed matching Auth user is enrolled atomically. Otherwise one `paid_entitlements` row is kept against the normalized checkout email until a user verifies and authenticates that same email.
8. Sign-up/login calls the service-only `claim_paid_course_orders` RPC. It reads `auth.users` server-side, requires `email_confirmed_at`, claims every eligible order for the normalized verified email and upserts one active enrollment per course.

Important provider-contract gap: PayStation's current public transaction-status examples do not document a currency response field. The adapter never invents one and rejects a mismatch if the provider supplies it. Live enablement is blocked until PayStation confirms how the status API cryptographically/contractually proves BDT or adds the currency field; stored BDT plus the initiated BDT request is not represented as provider-returned currency evidence.

## Recovery and support

- A learner can reopen `/payment/recovery`, sign in with the checkout email, verify that email normally and claim all eligible paid orders.
- `/payment/result` always shows the invoice and support contact. Paid guests see the exact account/login prompt and the three steps: payment verification, account/login, course access.
- A failed sign-up never modifies or deletes the paid order. Repeated claim attempts are safe.
- Failed, processing, expired and refunded states never enroll. Learners who see a failure after money was deducted are told not to pay again until support checks the invoice.
- Existing authenticated learners are enrolled immediately after verification and redirected to `/dashboard/courses/[course-slug]`.

## Reconciliation

Orders become eligible for reconciliation 10 minutes after initiation. The protected `/api/cron/reconcile-payments` endpoint uses `CRON_SECRET`, selects due `pending_payment`, `processing` and `failed` orders, requests PayStation status by invoice and invokes the same idempotent verification RPC as the callback. It returns counts only and never logs PII or credentials.

The current Vercel Hobby plan allows only two cron jobs and no schedule more frequent than daily. `/api/cron/maintenance` therefore combines the existing external analytics sync with PayStation reconciliation at 00:30 UTC each day, independently reporting either failure. This is the automatic safety net for a closed browser return before any Owner account exists. An authenticated Owner can also run the same server-side reconciliation immediately from `/admin/orders`; this is the secure on-demand admin mechanism for stuck orders. The dedicated endpoint remains ready for an external 10-minute scheduler or a Vercel Pro cron later without changing payment logic. Still-processing orders pass their 24-hour window into `expired`; a later valid callback, daily maintenance run or owner reconciliation can still fulfill them.

## Confirmed Associates Academy operating decisions

- Canonical production origin: `https://www.associatesacademy.bd`.
- PayStation callback: `https://www.associatesacademy.bd/api/payments/paystation/callback`.
- Payment result remains the neutral database-backed `/payment/result` route; PayStation receives the callback endpoint above.
- Support uses the website-published `contact@associatesacademy.bd` and phone numbers from `businessInfo`.
- `pay_with_charge=0`: Associates Academy bears the gateway charge. The learner pays the exact database-owned advertised total; no undocumented gateway rate is estimated in the browser or order total.
- Reconciliation interval: 10 minutes; checkout expiry window: 24 hours.
- No public PayStation documentation currently describes a separate server-to-server webhook or source-IP allowlist. The browser callback plus direct status lookup and scheduled reconciliation remain the supported contract until PayStation confirms otherwise.

## Sandbox credential situation

The supplied bKash Phone/PIN/OTP values are payer-side Sandbox wallet credentials, not PayStation merchant API credentials. PayStation documents Sandbox and Live as separate environments and its integration guidance expects Sandbox and/or Live Merchant ID/password pairs. Never send Live credentials to the Sandbox endpoint and never use a real payment merely to simulate Sandbox approval.

PayStation's public Postman collection contains shared sample merchant values. They are reference/test data only and must not be copied into the application, committed, logged or treated as Associates Academy's merchant identity. Associates Academy needs PayStation to provision owner-specific Sandbox Merchant ID/password for the already-active Live merchant.

PayStation merchant registration is a human onboarding form and merchant-dashboard workflow, not a documented public registration REST API. Because the Live merchant already exists, do not register a second business account. Ask PayStation merchant onboarding to enable Sandbox credentials for the same merchant and confirm the technical contract below.

Suggested support request:

> Subject: Sandbox API credentials and integration confirmations — Associates Academy
>
> Our Associates Academy Live merchant is already active. Please provision the corresponding Sandbox Merchant ID and Password for `https://sandbox.paystation.com.bd`. Our canonical website is `https://www.associatesacademy.bd` and our callback will be `https://www.associatesacademy.bd/api/payments/paystation/callback`. Please also confirm: (1) Sandbox `/initiate-payment` supports multipart/form-data, (2) Sandbox `/transaction-status` accepts JSON with `merchantId` header, (3) whether transaction-status can return currency/BDT evidence, (4) whether a server webhook or source-IP allowlist is available, and (5) the contracted merchant charge/rate. We will use `pay_with_charge=0` unless your merchant agreement requires otherwise.

## Environment variable names

- `PAYSTATION_MODE=sandbox|live`
- `PAYSTATION_SANDBOX_MERCHANT_ID`
- `PAYSTATION_SANDBOX_PASSWORD`
- `PAYSTATION_LIVE_MERCHANT_ID`
- `PAYSTATION_LIVE_PASSWORD`
- `NEXT_PUBLIC_SITE_URL`
- `CRON_SECRET`

Only `NEXT_PUBLIC_SITE_URL` is browser-public. Merchant passwords and IDs are read only in server modules and must remain in private local/Vercel configuration.

## Go-live checklist

1. PayStation provisions owner-specific Sandbox Merchant ID/password; the owner stores them through private local environment configuration—never chat, source, tests or screenshots.
2. Use the confirmed canonical origin, website support contact, 10-minute reconciliation and merchant-borne charge policy documented above.
3. PayStation confirms the exact supported Sandbox initiation encoding, BDT currency evidence, contracted merchant rate and whether a server-to-server webhook and/or source-IP allowlist is available.
4. Apply all pending migrations to Staging, regenerate database types, run the SQL payment suite, RLS/grant/advisor checks, unit tests, Playwright and production build.
5. Run owner-approved Sandbox journeys: guest success/signup/claim, existing-user success, cancellation, delayed callback/reconciliation, duplicate callback and mobile.
6. Obtain Live Merchant ID/password only after Sandbox approval. Set `PAYSTATION_MODE=live`, configure the production HTTPS origin and repeat a non-transactional configuration smoke check.
7. Apply the verified append-only migrations to Production and deploy the exact tested artifact. Do not run a Live transaction without explicit owner approval.
8. After approval, run one controlled Live transaction, reconcile by invoice, confirm one payment/entitlement/enrollment/receipt, validate support recovery, and monitor safe diagnostics.

Before any external transaction work, the remaining external dependency is:

1. PayStation-issued owner-specific Sandbox Merchant ID and Password, stored via local/private environment configuration.
2. PayStation's written confirmation of the currency/webhook/IP/contracted-rate questions above.

The Live Merchant ID/password already supplied to the owner must stay private and unused until Sandbox is fully approved. The callback domain, support contact, charge policy and reconciliation interval are now decided and require no further owner input.

## Owner-authorized Live activation exception — 2026-08-22

The owner explicitly authorized Live activation despite PayStation not issuing owner-specific Sandbox merchant API credentials. This approval permits Production configuration, deployment and a controlled Live transaction, but it does not turn the public Sandbox bKash payer credentials into merchant credentials or remove server-authoritative verification requirements.

Production database migrations and the transactional payment SQL suite have been applied/verified. Before deployment, the owner must place the following three secrets in the gitignored `.env.production.local` handoff file—never in chat, screenshots, source control or a public environment variable:

- `PAYSTATION_LIVE_MERCHANT_ID`: the Store/Merchant ID from PayStation's email.
- `PAYSTATION_LIVE_PASSWORD`: the Live password from PayStation's email.
- `SUPABASE_SECRET_KEY`: the Production project's `sb_secret_...` key (or legacy `service_role` key) from Supabase API settings.

The handoff file already fixes `NEXT_PUBLIC_SITE_URL=https://www.associatesacademy.bd` and `PAYSTATION_MODE=live`. After presence-only validation, the operator uploads the values as Sensitive, Production-only Vercel variables, generates a separate random `CRON_SECRET`, redeploys, verifies callback/reconciliation readiness, and removes the temporary handoff file. Secret values must never be printed during this process.

## Live activation record — 2026-08-23

- The owner completed the gitignored handoff; presence and basic Supabase-key format were validated without printing values.
- `PAYSTATION_LIVE_MERCHANT_ID`, `PAYSTATION_LIVE_PASSWORD`, `SUPABASE_SECRET_KEY`, `PAYSTATION_MODE`, `NEXT_PUBLIC_SITE_URL` and `CRON_SECRET` are Vercel Production-only Sensitive variables. The temporary handoff file was deleted after upload.
- Production deployment `dpl_J5wAHb3EXXGRKaX6Xpoz2ur8Bski` is READY and aliased to both `https://www.associatesacademy.bd` and the apex domain.
- A charge-free Live readiness order (`AA-8838E67529BA4037A0DE6AD08499C330`, BDT 1,710) received a PayStation Hosted Checkout URL on `api.paystation.com.bd`, proving the Live Merchant ID/password and URL-encoded initiation contract were accepted. The URL was not opened or paid; the order/attempt were marked cancelled/failed with a readiness diagnostic and have zero enrollment and zero entitlement.
- A historical anonymous-RLS defect discovered during the Production smoke test was corrected without granting anonymous access to private staff helpers. Published products/courses are visible; secret settings and private modules remain hidden.
- Historical mojibake in the seeded Bengali homepage/course/eBook content was conditionally repaired on Staging and Production. Production HTML contains no known `à`/`â` markers.
- Vercel Hobby permits two daily crons. Production now runs email processing plus the combined `/api/cron/maintenance` analytics/payment safety net daily; `/admin/orders` remains the owner-only immediate action and `/api/cron/reconcile-payments` remains available for a future external 10-minute scheduler or Vercel Pro.
- No real customer funds have been charged yet. The first settlement test must be completed interactively through the public Hosted Checkout because PayStation/bKash/card credentials and OTP must never enter this application or chat.
