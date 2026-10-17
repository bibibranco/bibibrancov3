# PORT-103 — Tailwind v4, shadcn & fonts

| Field | Value |
|---|---|
| Epic | E1 — Foundation |
| Type | eng |
| Priority | P0 |
| Estimate | S |
| Depends on | PORT-102, PORT-004 |
| Status | review |

## User story
As the **developer**, I want the same styling stack as my other projects so that I move fast and reuse patterns I know.

## Context
Legacy: one CSS file per component + a CSS reset in `legacy/src/index.css`; Google Fonts and the Phosphor icon CDN script loaded from `index.html`. Reference setup to mirror: `~/soletrador/frontend` (Tailwind v4 via `@tailwindcss/vite`, shadcn on `@base-ui/react`, `class-variance-authority`, `clsx`, `tailwind-merge`, `tw-animate-css`, `lucide-react`, `@fontsource-variable/*`).

## Scope
- Install and configure `tailwindcss` + `@tailwindcss/vite`.
- `shadcn init` (base-ui flavour), `components.json`, `src/lib/utils.ts` with `cn()`.
- Install the fonts chosen in PORT-004 via `@fontsource-variable/*` (self-hosted, no Google Fonts request).
- `lucide-react` for icons (replaces Phosphor).
- `prettier-plugin-tailwindcss` with `tailwindStylesheet` pointing at the app CSS (carried over from PORT-104).

## Acceptance criteria
- [x] A Tailwind utility class and a shadcn `Button` render correctly on the placeholder page.
- [x] Fonts load from the app bundle (no request to fonts.googleapis.com or unpkg in the Network tab). _(The built CSS points `@font-face` at `/assets/*.woff2`, and `dist/` has no Google Fonts or unpkg URLs.)_
- [x] `cn()` merges conflicting classes correctly.
- [x] Tailwind classes are auto-sorted by Prettier on save.

## Notes / links
- Done so far:
  - Tailwind 4.3 via `@tailwindcss/vite`.
  - `shadcn init`, template `start`, base `base` (Base UI), preset `nova`. `components.json` ends up with style `base-nova`, baseColor `neutral` and icons `lucide`, the same as soletrador.
  - `tw-animate-css` and `lucide-react` added.
  - `prettier-plugin-tailwindcss` with `tailwindStylesheet: ./src/styles.css`.
- `cn()` now comes from shadcn's `cn` package (github.com/shadcn-ui/cn), which replaces clsx + tailwind-merge. `src/lib/utils.ts` re-exports it for `@/lib/utils` imports.
- `shadcn init` added Geist. I removed it, because the typefaces are decided in PORT-004.
- Fonts (2026-10-17): imported in `src/styles.css`. `--font-heading` is Syne Variable (headings only), `--font-sans` is Atkinson Hyperlegible Next Variable (body), and `--font-mono` is JetBrains Mono Variable. The placeholder page uses all three.
- The react-refresh lint rule is off for `src/components/ui/**`, since shadcn files export their cva variants.

## Out of scope
- Real tokens (PORT-201).

## Notes / links
- If PORT-004 is not finished yet, install fonts later; everything else can proceed.
- PORT-004 picked **Syne** (`@fontsource-variable/syne`) for display, **Atkinson Hyperlegible Next** (`@fontsource-variable/atkinson-hyperlegible-next`) for body, and **JetBrains Mono** (`@fontsource-variable/jetbrains-mono`) for mono. See [`visual-direction.md`](../artifacts/visual-direction.md).
