# PORT-103 — Tailwind v4, shadcn & fonts

| Field | Value |
|---|---|
| Epic | E1 — Foundation |
| Type | eng |
| Priority | P0 |
| Estimate | S |
| Depends on | PORT-102, PORT-004 |
| Status | todo |

## User story
As the **developer**, I want the same styling stack as my other projects so that I move fast and reuse patterns I know.

## Context
Legacy: one CSS file per component + a CSS reset in `legacy/src/index.css`; Google Fonts and the Phosphor icon CDN script loaded from `index.html`. Reference setup to mirror: `~/soletrador/frontend` (Tailwind v4 via `@tailwindcss/vite`, shadcn on `@base-ui/react`, `class-variance-authority`, `clsx`, `tailwind-merge`, `tw-animate-css`, `lucide-react`, `@fontsource-variable/*`).

## Scope
- Install and configure `tailwindcss` + `@tailwindcss/vite`.
- `shadcn init` (base-ui flavour), `components.json`, `src/lib/utils.ts` with `cn()`.
- Install the fonts chosen in PORT-004 via `@fontsource-variable/*` (self-hosted, no Google Fonts request).
- `lucide-react` for icons (replaces Phosphor).

## Acceptance criteria
- [ ] A Tailwind utility class and a shadcn `Button` render correctly on the placeholder page.
- [ ] Fonts load from the app bundle (no request to fonts.googleapis.com or unpkg in the Network tab).
- [ ] `cn()` merges conflicting classes correctly.

## Out of scope
- Real tokens (PORT-201).

## Notes / links
- If PORT-004 is not finished yet, install fonts later; everything else can proceed.
