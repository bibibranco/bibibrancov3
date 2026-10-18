# PORT-007 — Hi-fi designs & motion spec

| Field | Value |
|---|---|
| Epic | E0 — Discovery & Design |
| Type | design |
| Priority | P0 |
| Estimate | L |
| Depends on | PORT-006, PORT-008 |
| Status | in progress |

## User story
As **Bibi**, I want final high-fidelity designs with real copy and images so that implementation can proceed without guessing.

## Context
Legacy motion is limited to a fade on the hero rotating word (`framer-motion` in `MainText.jsx`) and there is no reduced-motion handling.

## Scope
- Hi-fi mobile + desktop for every wireframe from PORT-005, using real copy from PORT-008.
- Prototype of key interactions: nav/menu, hero animation, card hover, page transitions (if any), filter on /work.
- Motion spec: what animates, duration, easing, trigger, and reduced-motion fallback for each.
- OG image template (1200×630) for pages and case studies.

## Acceptance criteria
- [x] All pages designed at 375 / 768 / 1440. _(Home drawn hi-fi; built pages shown as build screenshots for sign-off.)_
- [x] Motion spec table covers every animation, each with a `prefers-reduced-motion` fallback.
- [x] OG image template designed.
- [ ] Designs signed off (move ticket to done = build can start on E4).

## Out of scope
- Illustrations/photography production beyond what exists (log gaps as new tickets).

## Notes / links
- Hi-fi canvas (private until shared): https://claude.ai/artifact/WXCCpvZpTHWEAsu535dTX5. It uses the bibibran.co design system.
  - **Home** (new): designed at 1440, 768 and 375 from one responsive artboard. Hero, desk (A + C), "count me in for", short about, contact and footer. Hover lifts, star rotation, copy button and the mobile menu work in Play.
  - **Built pages** (/work, case study, about, 404, mobile menu) at 1440, 768 and 375: screenshots of the production build for sign-off, since they were built before this pass.
  - **Motion spec**: every animation, with trigger, duration, easing and a reduced-motion fallback, plus what deliberately doesn't animate.
  - **Share cards**: page and case-study templates (1200×630).
- **Hero (2026-10-18):** four copy options (A–D) were drafted after the first hero ran too tall. Bibi wrote the final copy instead; see copy.md.
- **Sticky-note hand:** Caveat, an open question from PORT-006. Swap it if Bibi prefers another.
- **Scope notes:** there's no /work filter to prototype (PORT-003 dropped filters) and no page transitions (motion spec).
- **Still open:** sign-off (criterion 4). Using the share-card templates at build time needs fonts available to the build (a PORT-501 follow-up).
