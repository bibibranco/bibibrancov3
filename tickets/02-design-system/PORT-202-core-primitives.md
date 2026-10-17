# PORT-202 — Core UI primitives

| Field | Value |
|---|---|
| Epic | E2 — Design System |
| Type | eng |
| Priority | P0 |
| Estimate | M |
| Depends on | PORT-201 |
| Status | review |

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
- [x] Each primitive has typed props; `Image` fails to compile without `alt` (verified: TS2741 "Property 'alt' is missing").
- [x] All interactive primitives work with keyboard only and show focus. _(They are native `<button>`/`<a>` elements, with the global ring from PORT-201.)_
- [x] A dev-only `/_kitchen-sink` route (excluded from prerender/sitemap) shows every variant. _(Production returns not-found; the `vite.config.ts` prerender `filter` skips `/_*` paths. Keep it out of the sitemap in PORT-501.)_

## Notes / links
- Files are in `src/components/ui/`: `button.tsx`, `text-link.tsx` (`TextLink` + `ExternalLink`), `tag.tsx`, `card.tsx`, `layout.tsx` (`Container`, `Section`, `SectionHeading`) and `image.tsx`.
- **TextLink is split in two:** `TextLink` is built with TanStack `createLink`, so `to` is type-checked against the routes. `ExternalLink` takes an `href`, opens in a new tab, and adds ↗ plus a visually hidden "(opens in new tab)". MDX links can map to one or the other by `href`. The PORT-502 `outbound_click` hook goes in `ExternalLink`.
- **Button** variants: primary, secondary, ghost; sizes `default` (min 44px) and `icon`. A link styled as a button uses `buttonVariants()` on an `<a>`/`Link`.
- **Card** is a `createLink` component with `CardMedia`, `CardMeta`, `CardTitle` and `CardDescription`. Nothing interactive goes inside it.
- **Section** has a `notebook` prop for `bg-notebook` (desk only).
- **Image** props: `ratio` (`16/10`, `2/1`, `4/3`, `1/1`) reserves space before load; `priority` loads eagerly with high fetch priority for the LCP image. Otherwise images are lazy.

## Out of scope
- Storybook (P2 follow-up if wanted).
