# PORT-005 — Mobile-first wireframes

| Field | Value |
|---|---|
| Epic | E0 — Discovery & Design |
| Type | design |
| Priority | P0 |
| Estimate | M |
| Depends on | PORT-003 |
| Status | in progress |

## User story
As a **visitor on a phone**, I want layouts that are designed for my screen first so that the site is easy to read and navigate anywhere.

## Context
The legacy site was built desktop-first with a single `max-width: 480px` breakpoint in `bibibranco/src/index.css` and duplicated card markup to swap sides on mobile (`TimelineCard.jsx` renders `InnerCardContent` twice).

## Scope
Low-fi wireframes at 375px and 1440px for:
- Home (all sections)
- Work index (with filter state)
- Case study (long-form template: hero, meta, body blocks — text, full-bleed image, image pair, quote, stats — next project)
- About
- 404
- Nav: desktop + mobile menu open state

## Acceptance criteria
- [x] Every page from PORT-003 has mobile and desktop wireframes.
- [x] Case study template defines the reusable content blocks (input for PORT-301 MDX components).
- [ ] Wireframes reviewed with at least one outside person (peer/friend) and feedback logged.

## Out of scope
- Colour, typography, final imagery.

## Notes / links
- Wireframes canvas: https://claude.ai/artifact/H3VKFT1fZvBeRwbSU9AVd3 (private). Notes, content blocks, SEO evaluation and the featured-work direction are in [`wireframes.md`](../artifacts/wireframes.md).
- The "Work index (with filter state)" scope item is replaced by Work/Craft group anchors (PORT-003).
- Still open: criterion 3 (outside review), and redrawing the Home artboards with the A + C featured section.
