# PORT-201 — Tokens in the Tailwind theme

| Field | Value |
|---|---|
| Epic | E2 — Design System |
| Type | eng |
| Priority | P0 |
| Estimate | S |
| Depends on | PORT-103, PORT-006 |
| Status | review |

## User story
As the **developer**, I want Figma tokens available as Tailwind utilities so that UI code uses design decisions, not magic numbers.

## Context
Legacy colours and sizes are hardcoded per CSS file (e.g. `#0055D4`, `#DCEAFF`, `margin: 48px 80px` in `legacy/src/index.css`).

## Scope
- Map PORT-006 variables to CSS custom properties + `@theme` in `src/styles/app.css` (colours, fonts, type scale, radius, shadows, easing/duration).
- Wire shadcn semantic vars (`--background`, `--foreground`, `--primary`, …) to the tokens.
- ~~Dark theme only if PORT-006 decided on one.~~ PORT-006 decided on **one theme (Blue)**: delete the shadcn `.dark` block and the `dark` custom variant.
- Source: [`tickets/artifacts/design-system/tokens.json`](../artifacts/design-system/tokens.json). The mapping table is in that folder's README.
- Base layer: body font, text colour, selection colour, focus-visible ring.

## Acceptance criteria
- [x] Every ~~Figma~~ PORT-006 token has a matching CSS variable/utility with the same name. _(All 102 checked by script against `tokens.json`.)_
- [x] No raw hex values in components (`grep -rnE "#[0-9a-fA-F]{3,8}" src --include="*.tsx"` finds none).
- [x] Focus ring is visible on every focusable element by default. _(A base `:focus-visible` rule: 3px `ring`, 3px offset. The Button's `outline-none` and 50% ring were removed so they don't override it.)_

## Notes / links
- Tokens live in `src/styles.css`, not `src/styles/app.css`: Prettier's `tailwindStylesheet` and the root route already point there.
- **`dark` variant kept, deliberately.** Deleting it would bring back Tailwind's default `dark:` (it follows `prefers-color-scheme`), and the `dark:` classes that shadcn components ship with would switch on in OS dark mode. It stays bound to a `.dark` class that is never set, so they stay inert. The shadcn `.dark` token block, sidebar and chart vars are removed.
- **Utility names:** colours are `bg-<token>` / `text-<token>`. Type styles are `text-display` … `text-note`, which set size, line height, tracking and weight; pair them with `font-heading` / `font-sans` / `font-mono`. Also `px-gutter`, `py-section`, `min-h-tap`, `max-w-content`, `max-w-measure`, `rounded-pill`, `shadow-object(-lift)`, `ease-out`, `bg-notebook`, `bg-notebook-card`, `bg-notebook-paper`, and `rotate-(--tilt-2)`.
- `container-max` maps to `max-w-content`, because a `--container-max` theme key would clash with Tailwind's `max-w-max`. The plain `--container-max` variable still exists.
- A global `prefers-reduced-motion` rule shortens all animations and transitions to almost nothing.

## Out of scope
- Components (PORT-202).
