# PORT-007 — Hi-fi designs & motion spec

| Field | Value |
|---|---|
| Epic | E0 — Discovery & Design |
| Type | design |
| Priority | P0 |
| Estimate | L |
| Depends on | PORT-006, PORT-008 |
| Status | todo |

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
- [ ] All pages designed at 375 / 768 / 1440.
- [ ] Motion spec table covers every animation, each with a `prefers-reduced-motion` fallback.
- [ ] OG image template designed.
- [ ] Designs signed off (move ticket to done = build can start on E4).

## Out of scope
- Illustrations/photography production beyond what exists (log gaps as new tickets).

## Notes / links
- Figma file link: _TBD_
