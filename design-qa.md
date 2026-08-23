# Design QA — eBook sales page fidelity

Date: 2026-08-15

## Comparison target

- Source visual truth: `.artifacts/ebook-qa/ebook-reference-normalized-full.png` (density-normalized copy of the user-supplied production screenshot)
- Live source route: the user-supplied production eBook page was inspected in the in-app browser
- Local implementation: `http://localhost:3000/ebook`
- Browser-rendered full implementation: `.artifacts/ebook-qa/ebook-local-desktop-stitched.png`
- Density-normalized source: `.artifacts/ebook-qa/ebook-reference-normalized-full.png`
- Focused artwork comparison: `.artifacts/ebook-qa/ebook-reference-preview-normalized.png` and `.artifacts/ebook-qa/ebook-local-preview-normalized.png`
- Mobile evidence: `.artifacts/ebook-qa/ebook-local-mobile-390-top.png`

## Viewport and density normalization

- Source pixels: `1670 × 12168`.
- Source CSS viewport inferred from the live page's measured `62px` header and screenshot density: approximately `1218px` wide at about `1.37×` density.
- Implementation CSS viewport: `1218 × 729`, device scale factor `1`.
- Full browser capture: stitched from in-app-browser viewport screenshots with sticky-header overlap removed, yielding `1218 × 8856`.
- Full source comparison copy: normalized to `1218 × 8856` so layout, spacing, typography and section proportions could be judged at the same density.
- State: default page state with FAQ rows closed; original book images loaded. FAQ-open and form-validation states were tested separately.

## Full-view comparison evidence

The normalized source and stitched browser capture were opened together and compared. Section order, hero split, content-card grid, navy learning band, audience cards, three-column preview grid, author row, price card, FAQ, final CTA, inline checkout and gradient footer match. The implementation has no horizontal overflow at `1218px` or `390px`.

## Focused comparison evidence

The preview grid was compared separately because the eBook pages contain dense typography and tables that are too small to judge in the full-page view. The implementation uses the six original `827 × 1170` page artworks and both original `1075 × 1521` table-of-contents images. Crop, aspect ratio, sharpness, captions, border radius and three-column spacing match the source.

## Required fidelity surfaces

- Fonts and typography: passed. `Baloo Da 2` display text and `Hind Siliguri` body/UI text preserve the source weights, wrapping, hierarchy and Bengali rendering.
- Spacing and layout rhythm: passed. The legacy `max-w-6xl` shell, `py-20` desktop section rhythm, card gaps, radii, borders and restrained shadows were preserved.
- Colors and tokens: passed. The route-scoped legacy cream `#EAE0CF`, navy `#111844`, indigo `#4B5694`, blue `#7288AE`, gold `#C9A24C`, border and muted tokens match the reference without changing other site routes.
- Image quality and asset fidelity: passed. All visible brand, author and book-page artwork uses real source raster assets; no placeholder or CSS-drawn imagery is present.
- Copy and content: passed for the product facts and section content. Two checkout statements were intentionally made compatible with the current standalone authentication/payment flow instead of claiming the legacy guest-download behavior.
- Responsiveness and accessibility: passed. `390px` mobile has no horizontal overflow, the sticky mobile CTA remains usable, labels are associated with all inputs, CTA focus lands on the name field, and native FAQ details are keyboard-operable.

## Interaction and console checks

- Primary CTA scrolls to `#checkout` and focuses `#buy-name`.
- FAQ rows expand and reveal their answer.
- Empty checkout submit shows the Bengali full-name validation state without making a payment request.
- Console errors checked after desktop, mobile, CTA, FAQ and validation passes: none.

## Comparison history

- Initial source/code audit found that the current page was a short generic navy hero and two-section summary, missing most of the reference funnel.
- Fix: ported the legacy eBook layout and scoped design tokens, restored all eleven visible sections, original artwork, route-specific header/footer, responsive behavior and checkout form.
- Post-fix evidence: full-view and focused normalized comparisons show no actionable P0/P1/P2 mismatch. Dev-only browser overlays were excluded from visual judgment.

## Findings

- P0: none.
- P1: none.
- P2: none.
- P3: two checkout-support sentences differ from the historical source to remain truthful about the current authenticated PayStation flow, and the footer uses the standalone Associates Academy identity; their visual density is equivalent.

final result: passed

---

# Design QA — Guest-first PayStation course checkout

Date: 2026-08-22

## Evidence and result

- Playwright ran the payment-focused browser suite against the development-only demo catalog at Desktop Chrome and Pixel 7 sizes: 5 passed, 1 intentional desktop skip.
- Full-page visual captures were inspected at `1440 × 1200` and Pixel 7 (`412px` CSS width). The cream/navy reference hierarchy, navy course summary, six-field Bengali-first form, warm coupon panel, visible legal consent, PayStation action and dotted footer remain coherent.
- Mobile stacks summary, verification note and form in the intended order. Fields and actions remain readable and the automated client-width assertion found no horizontal overflow.
- Failure/retry and closed-callback recovery states rendered with Bengali-first guidance, invoice/support affordances and no success/enrollment claim from browser data.
- The screenshot CLI emitted a hydration warning only while it injected `caret-color: transparent` into inputs for capture; the application has no server/client random rendering branch for those fields.

## Findings

- P0: none.
- P1: none.
- P2: none.
- P3: final paid-result and confirmed-auth dashboard redirects require the owner-approved Sandbox credentials/test accounts and were not exercised with a real provider transaction.

final result: passed for local mocked Hosted Checkout and responsive UI; Sandbox transaction QA pending owner credentials

---

# Design QA — Practical Return course commerce activation

Date: 2026-08-22

## Scope

- Published product: `practical-paper-return-e-return-filing`
- Checkout route: `/checkout/practical-paper-return-e-return-filing`
- Commerce values: regular ৳2,000; offer ৳1,600; ৳400 discount.

## Result

- The route keeps the established checkout blueprint: compact cream public header, cream two-column canvas, navy dotted course summary, white enrollment form, warm dashed coupon panel and route-specific navy footer.
- Only data-bound course title, summary, outcomes and price values change; the measured desktop/mobile checkout geometry is shared with the existing reference-verified route.
- The local preview was opened at the new route. The selected in-app Browser control was unavailable in this session, so a fresh 1440px/390px screenshot comparison and interactive browser capture could not be completed without using an unselected browser automation path.

## Functional evidence

- Supabase product and course rows were read back after upsert: published course product ID 3, course ID 2, price `1600.00`, compare-at price `2000.00`.
- The running local route returned HTTP 200 with the course title, ৳2,000 regular price and ৳1,600 offer price; its local demo coupon quote returned subtotal ৳1,600, discount ৳320 and payable ৳1,280.
- Strict TypeScript, unit tests and production build pass. The focused Playwright route test was updated but not run because the selected browser control was unavailable.

## Findings

- P0–P2 visual findings: unverified only; no layout source code changed beyond replacing the local development product fallback and binding existing price presentation to the published product.

final result: blocked

# Design QA — Authenticated enrollment form correction

Date: 2026-08-22

## Authenticated reference measurement

The user supplied an authenticated browser session for the live checkout. At its `929 × 552` CSS viewport, the live form measures `897.33 × 508px`; all six profile fields and the coupon input are `41.33px` high, the field grid gap is `12px`, the coupon block is `94.67px` high, and the primary payment button is `48px` high.

## Local comparison

The local implementation now uses the same class-level geometry. Its form is `508px` high, all seven visible inputs measure `41.33px`, the header measures `68.67px`, and its field/coupon/button spacing matches the signed-in production structure. The small width difference (`886.67px` vs `897.33px`) is the local browser's reserved vertical scrollbar; content padding and each grid column match after that reservation. No horizontal overflow was found at the production-width check or at `390px`.

## Findings

- P0: none.
- P1: none.
- P2: none.
- P3: none.

final result: passed

---

# Design QA — Course checkout redesign

Date: 2026-08-22

## Comparison target

- Source visual truth: `C:/Users/User/AppData/Local/Temp/codex-clipboard-d75353d8-1553-417c-ad12-bb73c3c7d426.png` (`1670 × 1477`).
- Intended local route: `/checkout/income-tax-working-framework`.
- Required comparison states: default course checkout at desktop (`1440px`) and mobile (`390px`), plus coupon, focus and purchased-enrollment states.

## Implementation review

- The route uses the shared public header/footer, Bengali typography, cream canvas, navy dotted course-summary panel, white enrollment form card, gold/indigo accents, responsive two-column-to-single-column layout and the existing WhatsApp control.
- The form includes the requested profile/contact fields, coupon quote state, consent links, divider and Bengali payment action. The active-enrollment branch replaces that UI with the purchased-state panel.

## Browser comparison status

The Codex in-app Browser was selected as the user browser, but it could not attach to the local webview. A fresh tab retry failed during navigation as well. Per the Product Design browser rule, no direct Playwright browser fallback was run without the user's permission. Therefore no browser screenshot, same-viewport comparison, console check or interaction capture is available for this checkout iteration.

## Findings

- P0–P2 visual findings: unverified; browser evidence is unavailable.
- Required desktop/mobile visual comparison: blocked.
- Keyboard-focus, Bengali wrapping, overflow and payment/coupon interaction inspection: blocked.

final result: blocked

---

# Design QA — Production checkout reference alignment

Date: 2026-08-22

## Evidence

- Live production checkout source inspected in the in-app Browser.
- Authenticated-form visual target: the user-supplied checkout screenshot (`1670 × 1477`).
- Local implementation inspected at `/checkout/income-tax-working-framework` with the same `1670 × 1477` desktop viewport and at `390 × 844` mobile.

## Result

- Replaced the wider shared marketing chrome with the reference's compact academy header and dotted four-column checkout footer.
- Matched the measured `max-w-6xl`, 1:1.1 desktop grid, navy dotted course card, price/outcome rhythm, warm support strip and the six-field enrollment card.
- Restored the reference coupon composition: one dashed warm panel, large rounded input, muted indigo `Apply` action and a single full-width indigo payment button.
- Mobile stacks the summary and form, keeps 56px input targets, and has no horizontal overflow (`390px` document width confirmed).
- Browser console errors: none.

## Findings

- P0: none.
- P1: none.
- P2: none.
- P3: live production is unauthenticated in the inspection browser, so its login gate could only be compared structurally; the user-supplied authenticated screenshot was used for the six-field form state.

final result: passed

---

# Design QA — Analytics preference control docking

Date: 2026-08-22

## Result

- The globally mounted analytics preference control now uses a fixed upper-right position directly below the shared navigation (`84px` from the visual viewport top), rather than the former lower-right position.
- At `1440 × 900`, its measured `44 × 44px` bounds are `top: 84px`, while the WhatsApp action is at the lower-right (`top: 832px`); bounds do not intersect.
- At `390 × 844`, its measured `44 × 44px` bounds remain `top: 84px`; the WhatsApp action begins at `top: 776px`. There is no horizontal overflow (`379px` document/client width after the reserved scrollbar).
- Scrolling the mobile route preserved the analytics control at `top: 84px`, confirming the requested fixed placement.

## Findings

- P0: none.
- P1: none.
- P2: none.

final result: passed

---

# Design QA — Analytics control footer-placement correction

Date: 2026-08-22

## Corrected requirement and result

- The analytics preference control is not viewport-fixed or navigation-adjacent. It is now a static `44 × 44px` utility button in the bottom-right of both shared public and course-checkout footers.
- On the checkout desktop footer at `1440 × 900`, the footer control occupies `top: 856.83px`, `right: 1274.67px`; the raised WhatsApp support control occupies `top: 772px`, `right: 1413.33px`. Their bounds do not intersect.
- The mobile checkout document remains within its `379px` client width at the `390px` viewport. The footer trigger opens the existing `Analytics privacy settings` dialog.
- The control is no longer rendered in a fixed viewport position, so it does not affect WhatsApp or the eBook's mobile purchase bar while navigating the page.

## Findings

- P0: none.
- P1: none.
- P2: none.

final result: passed

---

# Design QA — Public navbar restoration

Date: 2026-08-22

## Result

- Restored one compact `68px` cream public navbar for marketing, course checkout and eBook routes while retaining the liked reference color and scale.
- The real Associates Academy logo is a `56px`-high clickable home target at desktop, with a visible focus treatment and the `Professional Learning` supporting line.
- At `1440px`, the checkout navbar exposes Home, Courses, Resources, Tax Tools, About, Login and Course Browse. Its header height measures `68.67px`; document width remains within the viewport after the reserved scrollbar.
- The eBook route uses the same link/action set and measured header height. At `390px`, the responsive header document width equals the viewport (`390px`) and the existing mobile menu retains the same public links/actions.

## Findings

- P0: none.
- P1: none.
- P2: none.

final result: passed
