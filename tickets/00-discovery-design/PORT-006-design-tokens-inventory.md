# PORT-006 — Design tokens & component inventory

| Field | Value |
|---|---|
| Epic | E0 — Discovery & Design |
| Type | design |
| Priority | P0 |
| Estimate | M |
| Depends on | PORT-004, PORT-005 |
| Status | todo |

## User story
As the **developer (future Bibi)**, I want tokens and a component list defined in Figma so that the code design system (E2) is a translation, not an invention.

## Context
Legacy CSS has hardcoded colours, px values and per-component class names (`container-main-text__anim`, `wrapGetInTouch`, …) with no shared scale.

## Scope
- Figma variables: colour (semantic: `background`, `foreground`, `muted`, `accent`, `border`, …, following shadcn naming), type scale, spacing, radius, shadows, motion durations/easings, breakpoints.
- Light/dark decision (single theme is acceptable — record it).
- Component inventory: list each component, its variants and states (e.g. Button: primary/ghost/link × default/hover/focus/disabled).

## Acceptance criteria
- [ ] Tokens exist as Figma variables with names that map 1:1 to Tailwind v4 `@theme` / shadcn CSS vars.
- [ ] All text/background token pairs pass WCAG AA.
- [ ] Component inventory lists every component used by PORT-005 wireframes.
- [ ] Focus state is designed for every interactive component.

## Out of scope
- Coding tokens (PORT-201).

## Notes / links
- Reference for naming: shadcn theming variables used in `~/soletrador/frontend`.
