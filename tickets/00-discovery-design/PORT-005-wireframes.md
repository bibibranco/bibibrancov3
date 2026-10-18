# PORT-005 — Mobile-first wireframes

| Field | Value |
|---|---|
| Epic | E0 — Discovery & Design |
| Type | design |
| Priority | P0 |
| Estimate | M |
| Depends on | PORT-003 |
| Status | review |

## User story
As a **visitor on a phone**, I want layouts that are designed for my screen first so that the site is easy to read and navigate anywhere.

## Context
The legacy site was built desktop-first with a single `max-width: 480px` breakpoint in `bibibranco/src/index.css` and duplicated card markup to swap sides on mobile (`TimelineCard.jsx` renders `InnerCardContent` twice).

## Scope
Low-fi wireframes at 375px and 1440px for:
- Home (all sections)
- Work index (two groups, no filters: PORT-003 dropped the filter)
- Case study (long-form template: hero, meta, body blocks — text, full-bleed image, image pair, quote, stats — next project)
- About
- 404
- Nav: desktop + mobile menu open state

## Acceptance criteria
- [x] Every page from PORT-003 has mobile and desktop wireframes. _(Home, /work, case study, /about, 404 at 1440 and 375, plus the open mobile menu.)_
- [x] Case study template defines the reusable content blocks (input for PORT-301 MDX components). _(Summary, Links, Text, FullBleedImage, ImagePair, Quote, Stats and prev/next, tagged on the case-study frames and listed in the canvas notes.)_
- [ ] Wireframes reviewed with at least one outside person (peer/friend) and feedback logged.

## Out of scope
- Colour, typography, final imagery.

## Notes / links
- Wireframes (first draft by Claude, 2026-10-18): https://claude.ai/artifact/Lf1GQAghkKtpTM4zzdT8jr. It's a canvas with one row per page (desktop + mobile), sticky notes with open questions, and clickable links between frames. Bibi to review, then rework in Figma if needed.
- Decisions in the draft: the hero has a visual placeholder for PORT-007 to keep or cut; on mobile, `/work` uses compact rows rather than big cards; the contact CTA appears on home, case studies and /about (not /work, per sitemap §1).
- Still needed for done: review with one outside person, with feedback logged here.
- Feedback log: _none yet_
