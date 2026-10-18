# PORT-204 — Motion primitives

| Field | Value |
|---|---|
| Epic | E2 — Design System |
| Type | eng |
| Priority | P1 |
| Estimate | S |
| Depends on | PORT-201, PORT-007 |
| Status | review |

## User story
As a **visitor**, I want subtle, purposeful motion that respects my system settings so that the site feels alive without making me uncomfortable.

## Context
Legacy uses `framer-motion` v10 for one fade (`MainText.jsx`) with no reduced-motion handling. The package is now published as `motion`.

## Scope
- Install `motion`; wrap the app in `MotionConfig reducedMotion="user"`.
- Reusable pieces from the PORT-007 motion spec, e.g. `FadeIn`/`Reveal` on scroll, `RotatingText`, hover transitions via Tailwind.
- Motion tokens (durations/easings) come from PORT-201.

## Acceptance criteria
- [x] With "reduce motion" enabled in the OS, all non-essential animation is disabled or replaced by opacity-only changes.
- [x] Content is visible without JS (no elements stuck at opacity 0 in the prerendered HTML).
- [x] Every animation in the PORT-007 spec has a matching primitive or a documented Tailwind class.

## Out of scope
- Page transitions unless PORT-007 specifies them.

## Notes
- The PORT-007 motion spec needs no library, so `motion` isn't installed and there's no `MotionConfig`. Everything is CSS. Motion sits behind `motion-safe:` or `prefers-reduced-motion: no-preference`, and the global reduce rule in `styles.css` remains as a safety net.
- Spec row → primitive:
  - Hero star → `<Star spinning />` (`src/components/brand/star.tsx`), `motion-safe:animate-star` (40s linear, slowed from 14s in PORT-402, `--animate-star`).
  - Desk object → `desk-object` utility: 6px lift, `shadow-object-lift`, `z-object-focus` on hover or `:focus-within`. Tilt set with `rotate-*`. Tailwind emits it once PORT-403 uses it.
  - Text link, project card → `TextLink` (unchanged).
  - Button → the 1px press is now `motion-safe:`.
  - Interest row → the arrow nudge is now `motion-safe:`.
  - Mobile menu → fade plus a 12px slide down (`motion-safe:`).
  - Anchors → smooth scroll on `html` only without reduced motion. The spec listed this as built, but it wasn't.
  - Copy email, focus ring → unchanged, nothing moves.
- `e2e/motion.spec.ts` checks scroll behaviour with and without reduced motion, and that no page has content at opacity 0 with JS off.
