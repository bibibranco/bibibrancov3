# PORT-006 — Design tokens & component inventory

| Field | Value |
|---|---|
| Epic | E0 — Discovery & Design |
| Type | design |
| Priority | P0 |
| Estimate | M |
| Depends on | PORT-004, PORT-005 |
| Status | review |

## User story
As the **developer (future Bibi)**, I want tokens and a component list defined in Figma so that the code design system (E2) is a translation, not an invention.

## Context
Legacy CSS has hardcoded colours, px values and per-component class names (`container-main-text__anim`, `wrapGetInTouch`, …) with no shared scale.

## Scope
- Figma variables: colour (semantic: `background`, `foreground`, `muted`, `accent`, `border`, …, following shadcn naming), type scale, spacing, radius, shadows, motion durations/easings, breakpoints.
- Light/dark decision (single theme is acceptable — record it).
- Component inventory: list each component, its variants and states (e.g. Button: primary/ghost/link × default/hover/focus/disabled).

## Acceptance criteria
- [x] Tokens exist as ~~Figma variables~~ design-system tokens with names that map 1:1 to Tailwind v4 `@theme` / shadcn CSS vars. _(No Figma file, so the source of truth is the design-system artifact plus [`tokens.json`](../artifacts/design-system/tokens.json); the mapping table is in its README.)_
- [x] All text/background token pairs pass WCAG AA. _(Ratios in the README colour table. The lowest is mist on blue at 4.6:1, metadata only.)_
- [x] Component inventory lists every component used by PORT-005 wireframes ([`inventory.md`](../artifacts/design-system/inventory.md)).
- [x] Focus state is designed for every interactive component. _(One system ring: 3px star, 3px offset, always over blue. Clipped desk objects put the ring on the `<li>`.)_

## Out of scope
- Coding tokens (PORT-201).

## Notes / links
- Reference for naming: shadcn theming variables used in `~/soletrador/frontend`.
- Design system (private artifact): https://claude.ai/artifact/2KFa7b19rL3VQfFw6Fzt3C. It has tokens, a brand book, the inventory, live previews of Button, TextLink and DeskObject with every state, and the logo and star as assets. Repo copies are in [`tickets/artifacts/design-system/`](../artifacts/design-system/).
- **Theme decision:** one theme, Blue. No light theme and no dark mode: the blue is the identity, and long reading uses the deep `card` column. Remove the shadcn `.dark` block in PORT-201.
- **From direction B (2026-10-17):** a squared notebook grid, 24px squares in line with the gutter. It goes on the deep reading column, the paper objects, and the desk section only. Also margin notes beside the case-study text, "fig. N" figure labels, and `2026.05` dates. Grid on blue is restricted: mist over a grid line drops to 4.0:1, so no text under 24px sits directly on it.
- Still open for PORT-007: a handwritten face for sticky notes.
