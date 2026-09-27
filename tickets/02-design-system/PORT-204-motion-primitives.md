# PORT-204 — Motion primitives

| Field | Value |
|---|---|
| Epic | E2 — Design System |
| Type | eng |
| Priority | P1 |
| Estimate | S |
| Depends on | PORT-201, PORT-007 |
| Status | todo |

## User story
As a **visitor**, I want subtle, purposeful motion that respects my system settings so that the site feels alive without making me uncomfortable.

## Context
Legacy uses `framer-motion` v10 for one fade (`MainText.jsx`) with no reduced-motion handling. The package is now published as `motion`.

## Scope
- Install `motion`; wrap the app in `MotionConfig reducedMotion="user"`.
- Reusable pieces from the PORT-007 motion spec, e.g. `FadeIn`/`Reveal` on scroll, `RotatingText`, hover transitions via Tailwind.
- Motion tokens (durations/easings) come from PORT-201.

## Acceptance criteria
- [ ] With "reduce motion" enabled in the OS, all non-essential animation is disabled or replaced by opacity-only changes.
- [ ] Content is visible without JS (no elements stuck at opacity 0 in the prerendered HTML).
- [ ] Every animation in the PORT-007 spec has a matching primitive or a documented Tailwind class.

## Out of scope
- Page transitions unless PORT-007 specifies them.
