# End-to-end flows

## Course purchase

Homepage/course → Auth → Checkout → `create_order` reads server price/coupon/fee → PayStation initiate → provider callback → server-to-server verify invoice/amount/currency/status → `fulfill_verified_order` atomically marks paid, activates enrollment and queues receipt → dashboard access.

Repeated callbacks return safely without duplicate enrollment or email. Failed/processing/refunded states never grant access.

## CMS publish

Owner/Admin opens Website Studio → edits structured fields → Zod full-page validation → draft save → responsive preview → publish RPC locks page, writes immutable revision/audit and swaps published snapshot → cache tag/path revalidation → live page changes without deployment. Rollback republishes a chosen revision through the same contract.

## Media

Admin selects allowlisted file → server creates scoped signed token → browser uploads directly → completion endpoint lists/verifies exact object size/type/path → media asset is registered and audited. Private files are returned only through entitlement-safe signed access.

## Analytics

Client creates anonymous session → batched/beacon events → opt-out/rate/schema/idempotency checks → raw first-party events → daily rollups. Meta ad clicks remain separate from website sessions. Verified purchases share a deduplication event ID with external reporting when connected.

## Certificate

Admin issues/imports PII-limited certificate row → public visitor submits code → RPC returns only verification projection → private file remains inaccessible.

## Email

Business transaction inserts deterministic outbox key → immediate `after()` worker attempts Resend send → daily cron retries failures with exponential backoff → provider message/delivery events are logged.
