# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary users are new and existing Tax Practitioners and Accounts, Finance, Legal, Tax and Accounting professionals who need to prepare and review real client tax returns. They arrive with legal or professional context but need a reliable practical workflow that connects client documents, computation, reconciliation, Paper Return and NBR E-Return submission.

## Product Purpose

Associates Academy is a Bengali-first professional education platform for Tax, VAT, Legal and Professional Compliance learning. This course should help a trainee understand the complete client-return journey and decide to enrol in a structured program that develops independent return-preparation confidence.

Success on the course landing page means the visitor clearly understands that this is neither law-only teaching nor portal-only training, can assess whether the program fits their work, can inspect the five-module curriculum and can enter the existing authenticated checkout journey.

## Positioning

The Practical Paper Return & E-Return Filing Course teaches a complete client-file preparation system: Client Information → Documents → Compliance → Income Identification and Classification → Computation → Rebate and Adjustments → IT10B and IT10BB Reconciliation → Tax Payment → Paper Return → NBR E-Return → Final Review and Submission.

Its meaningfully different promise is that the portal is treated as the final filing surface, while the core professional skill is turning client evidence into a defensible, reconciled and correctly computed return.

## Operating Context

Visitors evaluate the course in a professional legal and tax-practice context. The learning material is based on Assessment Year 2026–2027 and Finance Act 2026 as supplied in the course brief. The working environment includes client information, supporting documents, income heads, TDS and Advance Tax evidence, tax computation, IT10B, IT10BB, A-Challan, Paper Return forms and the NBR E-Return portal.

The enrollment journey is Course Page → Auth or Account Creation → Checkout Details → PayStation Payment → Server Verification → Dashboard Access.

## Capabilities and Constraints

- Preserve the existing Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui and Lucide React architecture.
- Reuse the shared Associates Academy header, footer, instructor asset and authenticated checkout flow.
- Keep the course route and product slug `practical-paper-return-e-return-filing`.
- Course content lives in `src/lib/content/practical-return-course.ts` and remains the source of truth for the landing page.
- Do not invent price, discount, batch date, class schedule, deadline, duration, recordings, certificate, support, seat limits, testimonials, ratings or guarantees.
- Undefined commercial data must remain hidden.
- Preserve keyboard-accessible accordions, semantic headings, visible focus, Bengali readability and mobile-first behavior.

## Brand Commitments

- Product name: Associates Academy.
- Bengali-first scholarly, premium, trustworthy, professional and practical voice.
- Preserve the existing cream, navy, indigo, blue and restrained-gold brand system.
- Preserve Baloo Da 2 for display typography and Hind Siliguri for body and UI text.
- Preserve the real instructor portrait at `public/brand/founder.png` and the shared academy logo.
- The redesigned course page must feel like an official Associates Academy surface, not a generic SaaS template or unrelated visual identity.

## Evidence on Hand

- Detailed course scope, module structure, FAQs and claims supplied by the user and captured in `src/lib/content/practical-return-course.ts`.
- Existing production app design tokens and utilities in `src/app/globals.css` and `design.md`.
- Shared marketing chrome in `src/components/marketing/site-header.tsx` and `src/components/marketing/site-footer.tsx`.
- Existing instructor portrait and academy logo in `public/brand`.
- Existing course, checkout, authentication and payment implementation in the repository.
- No verified testimonials, ratings, review counts or commercial details are available for this course and none may be fabricated.

## Product Principles

1. Make the complete client-return workflow unmistakable before describing individual features.
2. Translate deep tax content into a scannable professional decision journey without rewriting legal provisions.
3. Earn trust through structure, real assets and truthful omissions rather than unsupported marketing claims.
4. Keep enrollment connected to the existing secure platform journey.
5. Make dense Bengali-first curriculum content comfortable to read on every supported viewport.

## Accessibility & Inclusion

The public course experience must support keyboard navigation, semantic heading order, sufficient contrast, visible focus states, descriptive labels, reduced-motion preferences and readable Bengali line height. It must avoid horizontal overflow and remain usable at 390px, 430px, 768px, 1024px and 1440px widths.
