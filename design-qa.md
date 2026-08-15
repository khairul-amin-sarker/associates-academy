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
