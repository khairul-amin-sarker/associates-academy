# End-to-end flows

## Course purchase

Homepage/course/Meta/direct CTA → public `/checkout/[course-slug]` → guest or verified learner supplies the six checkout fields → service-only quote/order RPC recalculates the published course, course coupon, fee policy and non-zero BDT total → immutable `pending_payment` order/attempt → PayStation Hosted Checkout → neutral callback/result → server-to-server status lookup by invoice → atomic verification.

If a confirmed matching account exists, verification creates/ensures one active enrollment and the learner reaches `/dashboard/courses/[course-slug]`. Otherwise verification creates one `paid_unclaimed` email entitlement and the result page offers login/sign-up with the immutable checkout email. Normal Auth email verification is mandatory; after sign-up/login, a service-only claim RPC compares the confirmed `auth.users` email, claims every eligible paid order atomically and creates each enrollment once. Failed sign-up leaves the paid order claimable. `/payment/recovery` supports learners who closed the return page.

The course checkout UI resolves only its selected published product and never substitutes the original Income Tax course when the practical-return product is requested. Existing eBook checkout remains inline on `/ebook`. An already-active learner sees dashboard/workspace actions instead of payment controls; the same rule is enforced by `create_order`.

Repeated callbacks, request retries, reconciliation, page refreshes and repeated claims return safely without duplicate orders, transactions, enrollment or email. Failed/cancelled/processing/expired/refunded states never grant access. The 10-minute reconciliation cron rechecks due invoices and can complete a payment even when the browser return was closed. See `PAYMENTS.md` for the exact state machine and go-live contract.

## CMS publish

Owner/Admin opens Website Studio → edits structured fields → Zod full-page validation → draft save → responsive preview → publish RPC locks page, writes immutable revision/audit and swaps published snapshot → cache tag/path revalidation → live page changes without deployment. Rollback republishes a chosen revision through the same contract.

## Media

Admin selects allowlisted file → server creates scoped signed token → browser uploads directly → completion endpoint lists/verifies exact object size/type/path → media asset is registered and audited. Private files are returned only through entitlement-safe signed access.

## Learning delivery

Admin creates a course batch, publishes modules, then creates batch/module class sessions with validated Google Meet and Calendar links. The active learner's dashboard joins only sessions assigned to that learner's batch. Admin marks module completion per enrollment; the dashboard derives progress from those rows. Private resources are uploaded to the product-scoped course-files path and downloaded only after the server re-checks active enrollment before creating a short-lived URL.

## Analytics

Client creates anonymous session → batched/beacon events → opt-out/rate/schema/idempotency checks → raw first-party events → daily rollups. The persistent preference control is available from the bottom-right of the rendered footer instead of the viewport support-control area. Meta ad clicks remain separate from website sessions. Verified purchases share a deduplication event ID with external reporting when connected.

## Certificate

Admin issues/imports PII-limited certificate row → public visitor submits code → RPC returns only verification projection → private file remains inaccessible.

## Email

Business transaction inserts deterministic outbox key → immediate `after()` worker attempts Resend send → daily cron retries failures with exponential backoff → provider message/delivery events are logged.

## Associates Tax Brief

Homepage visitor enters an email and selects one or more interest slugs → native form validation and Zod normalize/validate the payload → the Server Action uses the server-only Supabase client → `newsletter_subscribers` atomically inserts or refreshes the normalized email, interests, subscribed status and homepage source. The flow stores audience preferences only; newsletter composition/sending and unsubscribe delivery are separate future operational flows.
