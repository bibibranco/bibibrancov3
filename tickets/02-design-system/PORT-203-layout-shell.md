# PORT-203 — Layout shell: header, nav, footer

| Field | Value |
|---|---|
| Epic | E2 — Design System |
| Type | eng |
| Priority | P0 |
| Estimate | M |
| Depends on | PORT-202, PORT-003 |
| Status | review |

## User story
As a **visitor**, I want consistent navigation on every page so that I always know where I am and can move around.

## Context
Legacy `Header.jsx` is only a logo image with no link or nav; project pages use a sidebar "back to homepage" link. `Footer.jsx` credits Amanda Medeiros (https://asmdrs.vercel.app/) as co-developer of the previous version.

## Scope
- `SiteHeader`: logo linking to `/` (with accessible name), nav items from PORT-003, active state via TanStack `Link` `activeProps`.
- Mobile menu (base-ui Dialog/Sheet): focus trap, Esc to close, closes on navigation, scroll lock.
- `SiteFooter`: contact links, socials, © year, credit line (decide wording for the Amanda Medeiros credit — e.g. "v3 built with Amanda Medeiros").
- Skip-to-content link as the first focusable element.
- Wire into the root route layout.

## Acceptance criteria
- [x] Nav works with keyboard and screen reader on mobile and desktop. _(Tested in Chrome on 2026-10-17. The desktop nav is a labelled `<nav>` list. The mobile menu is a base-ui Dialog titled "Menu": focus trapped (6 Tabs stayed inside), Esc closes it and returns focus to Menu, `aria-expanded` toggles, scroll is locked, and it closes on navigation. Not yet tested with a screen reader by hand, so that check goes to PORT-503.)_
- [x] Current page is indicated visually and with `aria-current="page"` (TanStack `Link` sets it; a 3px underline via `data-[status=active]`).
- [x] Skip link moves focus to `<main>` (`<main id="main" tabIndex={-1}>`; verified that `document.activeElement` is `MAIN#main`).
- [x] No layout shift when the menu opens/closes. _(The sheet is a fixed full-screen overlay in a portal, and the Menu button keeps its label.)_

## Notes / links
- Files: `src/components/site/site-header.tsx` (`SiteHeader`, `SkipLink`, mobile menu), `site-footer.tsx`, `nav.ts`, and `src/components/brand/logo.tsx` (the v3 SVG, kept as is, in `currentColor`).
- The root route renders skip link → header → `<main id="main">` → footer. Pages no longer render their own `<main>`.
- Stub `/work` and `/about` routes were added so the typed nav links resolve. PORT-405 and PORT-407 replace them.
- "Say hi" goes to `#contact`, which is the footer for now. PORT-408's ContactCta takes over the id.
- Footer credit: "v3 built with Amanda Medeiros ↗". The Medium link goes to the author profile `medium.com/@bibianabranco`, taken from the article URL. Check it's the right profile.

## Out of scope
- Page content.
