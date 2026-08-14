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

## Typography

- Display: Baloo Da 2
- Body/UI: Hind Siliguri
- IDs/metrics: Geist Mono/system monospace

## Components and motion

Use shadcn/ui primitives with 12–18px radii, thin navy-tinted borders and restrained elevation. Buttons use a 200ms tactile press/hover treatment. Avoid heavy scroll animation, glass effects and gradients. Icons are Lucide; raster/brand imagery uses real assets and `next/image`.
