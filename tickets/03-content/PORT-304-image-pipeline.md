# PORT-304 — Image pipeline

| Field | Value |
|---|---|
| Epic | E3 — Content |
| Type | eng |
| Priority | P1 |
| Estimate | M |
| Depends on | PORT-301 |
| Status | review |

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
- [x] All images render with `width`/`height` (no CLS from images). _(Content images get them from the file; `Image` without a pipeline source keeps `ratio`.)_
- [x] Largest image served on mobile is ≤ 200 KB. _(A 375px phone at 3× picks the 1200w variant. The largest real one is woodworking at 57 KB AVIF and 89 KB WebP.)_
- [x] Below-the-fold images are `loading="lazy"`; the hero/LCP image is eager with `fetchpriority="high"`. _(Lazy by default; pass `priority` on the LCP image, which PORT-402/406 decide.)_
- [x] No image is used as a CSS background for content. _(The only `url(`/gradients in `src` are the notebook grid.)_

## Out of scope
- A CDN/image service.

## Notes
- **How it works:** every image in `content/work/<slug>/` is turned into AVIF (q50) and WebP (q72) at 480, 800, 1200, 1600 and 2400px wide, never wider than the source. This runs in the content-collections transform, using `sharp`, and writes to `public/_img/<slug>/`, which is git-ignored. File names carry a content hash, so a replaced image gets new URLs. The project document carries `{ src, srcset, width, height, color }`, and the dominant colour fills the box while the image loads.
- **Referencing images:** frontmatter and MDX both use `./file.jpg`. A missing frontmatter image fails `pnpm build`. A missing MDX image fails the prerender. `MdxContent` takes the project's `images`.
- **`Picture`** (in `ui/image.tsx`) renders `<picture>` with AVIF and WebP sources. Blocks pass `sizes`: 720px for the reading column, half that for `ImagePair`, and 100vw for full-bleed.
- **`pnpm build`** clears `public/_img` and builds content with `NODE_ENV=production`, so draft images never reach `dist`.
- **Moved** (copied from `legacy/`, capped at 2400px): `itp-mapping/prisms.jpg` (was `1D6A3859.jpg`), `itp-mapping/map.jpg`, `aedit/cover.jpg`, `thome/cover.jpg`, `woodworking/cover.jpg`, `rato-tulio/tulio.jpg` and `busca-resgatados/cover.jpg`. The last two are 272×192, so they only suit polaroid size until there are high-res covers (inventory §9).
- **Not moved:** the inventory's "decide" items (`random.jpg`, `img01.jpg`, `habla.jpg`, `woodworking2.jpg`, `me.png`), plus the star and logo SVGs. The unused assets (`react.svg`, `vite.svg`, `shape.svg`) were never in the new app, and they go with `legacy/` in PORT-506.
- Site images outside projects, like the About portrait, can reuse `scripts/content-images.ts` when PORT-303 or PORT-407 needs them.

