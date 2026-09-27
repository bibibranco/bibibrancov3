# PORT-201 — Tokens in the Tailwind theme

| Field | Value |
|---|---|
| Epic | E2 — Design System |
| Type | eng |
| Priority | P0 |
| Estimate | S |
| Depends on | PORT-103, PORT-006 |
| Status | todo |

## User story
As the **developer**, I want Figma tokens available as Tailwind utilities so that UI code uses design decisions, not magic numbers.

## Context
Legacy colours and sizes are hardcoded per CSS file (e.g. `#0055D4`, `#DCEAFF`, `margin: 48px 80px` in `legacy/src/index.css`).

## Scope
- Map PORT-006 variables to CSS custom properties + `@theme` in `src/styles/app.css` (colours, fonts, type scale, radius, shadows, easing/duration).
- Wire shadcn semantic vars (`--background`, `--foreground`, `--primary`, …) to the tokens.
- Dark theme only if PORT-006 decided on one (with `prefers-color-scheme` + no flash on load).
- Base layer: body font, text colour, selection colour, focus-visible ring.

## Acceptance criteria
- [ ] Every Figma token has a matching CSS variable/utility with the same name.
- [ ] No raw hex values in components (checked by grep in review).
- [ ] Focus ring is visible on every focusable element by default.

## Out of scope
- Components (PORT-202).
