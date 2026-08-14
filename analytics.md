# Analytics

## First-party events

`page_view`, `section_view`, `scroll_depth` (25/50/75/90), `cta_click`, `checkout_started`, `payment_initiated`, `payment_failed`, `verified_purchase`, `dashboard_view`, `live_class_join`, `resource_download`, `ebook_download`.

Events contain UUID event/session IDs, path, timestamp and schema-limited properties. UTM values are session dimensions. Raw `fbclid` is hashed before storage. Database uniqueness deduplicates event IDs and rate limits sessions.

## External reporting

- GA4 client tagging is optional and stops on opt-out.
- Verified server events use Measurement Protocol when measurement ID/API secret exist.
- Dashboard reporting uses GA4 Data API when service account/property access exists.
- Meta Pixel and CAPI share `event_id` for deduplication.
- Meta Marketing API campaign clicks, impressions and spend are imported daily; clicks never masquerade as website sessions.

## Consent and retention

Tracking is default-on per product decision. A persistent privacy control switches collection off, deletes the anonymous session ID/cookie and stops first-party, GA4, Pixel and CAPI. Raw event default retention is 13 months; daily rollups remain. Owner may set 1–60 months.

## Status

First-party collection works independently. External cards show `Not connected` until new properties/datasets and credentials are configured.
