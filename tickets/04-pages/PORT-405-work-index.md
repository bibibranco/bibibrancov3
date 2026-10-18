# PORT-405 — Work index `/work`

| Field | Value |
|---|---|
| Epic | E4 — Pages |
| Type | eng |
| Priority | P0 |
| Estimate | M |
| Depends on | PORT-301, PORT-403 |
| Status | review |

## User story
As a **visitor**, I want to browse all projects and filter by discipline so that I find the kind of work I care about.

## Context
There is no index page today; projects are only reachable from home cards.

## Scope
- Route `src/routes/work/index.tsx` listing all non-draft projects with `ProjectCard` (reuse from PORT-403).
- Two groups, **Work** and **Craft** (`category` in the schema), each a section with an `id` (`#work`, `#craft`) for deep links. No filters (PORT-003, [`sitemap.md`](../artifacts/sitemap.md)).
- Page meta title/description.

## Acceptance criteria
- [x] `/work#work` and `/work#craft` land on the right group. _(Checked at 375px: #craft lands with its heading at the top.)_
- [x] Each group is a labelled section (`<section aria-labelledby>`) with an `h2`. _(Cards are `h3`s under it.)_
- [x] Unfiltered page is prerendered.

## Out of scope
- Search.

## Notes (2026-10-18)
- **ProjectCard** (`src/components/work/project-card.tsx`) is built here because PORT-403 now renders desk objects, not cards. It's a compact row on mobile (96px thumbnail beside the text, as in the wireframe) and a stacked card from md, in 2 then 3 columns. The whole card is one link, and the cover has `alt=""` because the title is the link text. The meta line is the year, plus "full story on Medium" or "video on TikTok" on short pages (copy.md).
- **Jump links** "Work · 6" and "Craft · 3" are plain anchors, not filters (PORT-003). Copy and meta are from copy.md, and `pageHead()` adds the canonical URL.
- **Two shared bugs fixed on the way:**
  - `cn` (tailwind-merge) read custom sizes like `text-small` as colours, so `cn('text-small', 'text-muted-foreground')` dropped the size. `src/lib/utils.ts` now configures it with the theme's text, spacing, radius and container tokens, and every component imports it from there.
  - `buttonVariants()` used directly on links kept `border-transparent` next to the variant's border colour, and the transparent one won. So secondary link-buttons (mobile Menu, 404 "See my work", these jump links) had no border. It now returns merged classes.
- Draft years show as-is (PORT-507 confirms them).

