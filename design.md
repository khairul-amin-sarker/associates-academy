# Design system

## Direction

Calm editorial premium: cream canvas, deep navy anchors, white paper cards, restrained gold details. The public site is visual/navigation focused; dashboard density is deliberate and operational.

## Tokens

- Navy `#111844`
- Indigo `#4B5694`
- Blue `#7288AE`
- Gold `#C99A2E`
- Cream `#F3ECDF`
- Card `#FFFDF9`

CSS variables in `src/app/globals.css` are the only foundation source. Use theme classes rather than random palette colors.

The `/ebook` route scopes the historical source palette (`#EAE0CF`, `#111844`, `#4B5694`, `#7288AE`, `#C9A24C`) under `.ebook-page`. This preserves screenshot fidelity without changing the newer global cream and gold values used by the rest of the site.

## Typography

- Display: Baloo Da 2
- Body/UI: Hind Siliguri
- IDs/metrics: Geist Mono/system monospace

## Components and motion

Use shadcn/ui primitives with 12–18px radii, thin navy-tinted borders and restrained elevation. Buttons use a 200ms tactile press/hover treatment. Avoid heavy scroll animation, glass effects and gradients. Icons are Lucide; raster/brand imagery uses real assets and `next/image`.

Every public-facing header uses the same compact 68px cream paper bar (`#F1E7D6`): a generous clickable real-logo lockup with the Professional Learning line, five public navigation links, an outlined Login action and navy course-browse action. It becomes the accessible menu sheet on mobile; dashboard/admin navigation remains operational rather than marketing-oriented.

Global utility controls that are not task CTAs, such as analytics preferences, belong in the footer's bottom-right utility area with a white paper surface and navy icon. They are static footer controls, leaving the floating lower-right support action unobstructed.

The practical return course uses a mature editorial dossier composition rather than repeated tile grids: layered paper and case-file geometry, ruled lists, connected timelines, grouped curriculum topics, annotation lines, a review stamp and one full-width reconciliation statement. Cream and white remain dominant; navy is reserved for the case-file anchor, the financial-consistency section and final CTA, with gold used only as a precise document/status accent. All surfaces continue to use the existing semantic brand variables and introduce no new palette values.

The academy homepage uses the Framework blueprint as its dominant composition: a `max-w-6xl` editorial shell, cream/white section alternation, restrained paper dots, dark workflow/tool panels, warm bordered cards and small indigo text accents. Gold remains a structural signal on light surfaces and readable text only on dark surfaces. Homepage muted copy is scoped slightly darker for WCAG AA contrast without changing dashboard or product-route tokens.

The eBook page keeps the legacy soft/lift shadows, 18px dotted paper texture and navy footer gradient as scoped route utilities. Its cover, six internal pages, two table-of-contents pages and author portrait are original source assets in `public/ebook` and `public/brand`.

Course checkout uses the live production reference's compact scale: `max-w-6xl` shell, 68px header, 24px (`rounded-3xl`) document cards, 20px navy course-header padding, soft/lift shadows and a 56px pill-shaped field/coupon control. The footer is a route-specific navy dotted four-column information panel. The design has no synthetic course artwork: outcomes and commercial values come from the selected product/course data.

## Shared footer

The public footer is a single reusable navy panel, including on `/ebook`. It follows the reference's two-part rhythm: a left editorial Tax Brief promise with a bordered CTA card to its right, then a thin divider and sparse four-column information area. It uses the existing restrained white dot grid and subtle indigo glow; gold remains limited to labels and small icons. Mobile stacks the CTA and information columns without removing links or business facts.
