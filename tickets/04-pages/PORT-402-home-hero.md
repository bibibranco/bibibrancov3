# PORT-402 — Home: hero

| Field | Value |
|---|---|
| Epic | E4 — Pages |
| Type | eng |
| Priority | P0 |
| Estimate | M |
| Depends on | PORT-401, PORT-204, PORT-007 |
| Status | todo |

## User story
As a **first-time visitor**, I want to understand in 5 seconds who Bibi is and what they do so that I decide to keep scrolling.

## Context
Legacy hero (`legacy/src/components/HeroSection/MainText/MainText.jsx`): "Hey there! I'm Bibi Branco and I …" with a word cycling every 2s through "create stuff / build interfaces / build furniture / love spreadsheets". Issues: the array is recreated every render and is the effect dependency (interval reset each render), no pause control, not announced sensibly to screen readers.

## Scope
- Build the hero per PORT-007 design using the PORT-008 copy.
- `RotatingText` (from PORT-204): pauses on hover/focus and when the tab is hidden; static under reduced motion; screen readers get one full sentence (e.g. visually hidden list of all roles) rather than live-changing text.
- Primary CTA(s) per design (e.g. "see work", "get in touch").

## Acceptance criteria
- [ ] Matches PORT-007 at 375 / 768 / 1440.
- [ ] Headline text is present in the prerendered HTML.
- [ ] Rotation is paused/static with reduced motion and is not announced on every change.
- [ ] LCP element on the home page loads in < 2.5s on a mid-tier mobile profile (Lighthouse).

## Out of scope
- Other home sections.
