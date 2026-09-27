# PORT-304 — Image pipeline

| Field | Value |
|---|---|
| Epic | E3 — Content |
| Type | eng |
| Priority | P1 |
| Estimate | M |
| Depends on | PORT-301 |
| Status | todo |

## User story
As a **visitor on a slow connection**, I want images that load fast and don't shift the layout so that browsing feels instant.

## Context
Legacy images are full-size JPGs in `public/` referenced as CSS `background-image` (not indexable, no alt, no lazy loading) with fixed heights (`600px` in `ProjectContent.jsx`). Several assets are unused (`react.svg`, `vite.svg`, `shape.svg`).

## Scope
- Move content images next to their MDX (`content/work/<slug>/`) or `src/assets/`.
- Build-time optimization to AVIF/WebP with responsive `srcset` + width/height (e.g. `vite-imagetools`, or a plain script — pick the simpler one that works with content-collections).
- Blur/colour placeholder optional.
- Drop unused assets.

## Acceptance criteria
- [ ] All images render with `width`/`height` (no CLS from images).
- [ ] Largest image served on mobile is ≤ 200 KB.
- [ ] Below-the-fold images are `loading="lazy"`; the hero/LCP image is eager with `fetchpriority="high"`.
- [ ] No image is used as a CSS background for content.

## Out of scope
- A CDN/image service.
