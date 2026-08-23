# Product definition

Associates Academy is an independent academy/platform—not a single-course sales page. The homepage is the academy gateway; each course, eBook and workshop has its own landing and dashboard experience.

## Product surfaces

- Academy homepage and resources
- Interactive tax-learning tools and the interest-segmented Associates Tax Brief
- Course, eBook and workshop catalog/landing pages
- Supabase Auth, checkout and PayStation results
- Student learning dashboard with live class, recordings, resources, community and certificates
- Public certificate verification
- Owner/Admin command center, Website Studio and operational modules
- First-party analytics plus optional Meta/GA reporting

## Roles

- Owner: complete access including roles, integrations and system settings
- Admin: content, learning, students, orders, certificates and analytics; no owner/secrets/destructive settings
- Student: own profile, purchases, enrollments and entitled resources

## Core business rules

- Prices are read server-side from products.
- Gateway fee responsibility is configured per product.
- Course payment is guest-first: account creation/login follows successful provider verification, while a verified existing account takes the shortest automatic-enrollment path.
- Browser callback data never grants access. PayStation invoice, amount, currency and status are re-verified.
- Fulfillment and confirmed-email entitlement claims are idempotent and create exactly one enrollment/access record and one receipt outbox item.
- CMS content is structured, validated, revisioned and atomically published without redeploy.
- Student trust content must be genuine; no invented reviews/counts.
- Tracking is default-on with a clear opt-out that stops first-party, GA4, Pixel and CAPI collection.
- Fresh database is intentional; previous accounts/orders/enrollments are not imported.
