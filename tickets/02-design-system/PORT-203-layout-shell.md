# PORT-203 — Layout shell: header, nav, footer

| Field | Value |
|---|---|
| Epic | E2 — Design System |
| Type | eng |
| Priority | P0 |
| Estimate | M |
| Depends on | PORT-202, PORT-003 |
| Status | todo |

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
- [ ] Nav works with keyboard and screen reader on mobile and desktop.
- [ ] Current page is indicated visually and with `aria-current="page"`.
- [ ] Skip link moves focus to `<main>`.
- [ ] No layout shift when the menu opens/closes.

## Out of scope
- Page content.
