# PORT-202 — Core UI primitives

| Field | Value |
|---|---|
| Epic | E2 — Design System |
| Type | eng |
| Priority | P0 |
| Estimate | M |
| Depends on | PORT-201 |
| Status | todo |

## User story
As the **developer**, I want a small set of typed, accessible building blocks so that pages are assembled quickly and look consistent.

## Context
Legacy equivalents: `SectionTitle` (class chosen by a `type` prop), `Experience` (text1/text2/text3 props), timeline cards, and project cards that are clickable `div`s with `window.open` instead of links.

## Scope
Built with shadcn/base-ui + `cva` variants, in `src/components/ui/`:
- `Button` (variants from PORT-006)
- `TextLink` (internal via TanStack `Link`, external with `target="_blank" rel="noopener noreferrer"` and an icon + visually hidden "opens in new tab")
- `Tag`/`Badge`
- `Card` (whole card clickable via a real link, no nested interactive elements)
- `Container` and `Section` (layout widths + vertical rhythm)
- `SectionHeading` (replaces `SectionTitle`)
- `Image` wrapper (aspect ratio, lazy by default, required `alt`)

## Acceptance criteria
- [ ] Each primitive has typed props; `Image` fails to compile without `alt`.
- [ ] All interactive primitives work with keyboard only and show focus.
- [ ] A dev-only `/_kitchen-sink` route (excluded from prerender/sitemap) shows every variant.

## Out of scope
- Storybook (P2 follow-up if wanted).
