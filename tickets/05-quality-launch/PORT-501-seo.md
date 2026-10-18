# PORT-501 — SEO, social previews & favicons

| Field | Value |
|---|---|
| Epic | E5 — Quality & Launch |
| Type | eng |
| Priority | P1 |
| Estimate | M |
| Depends on | PORT-401, PORT-406, PORT-007 |
| Status | review |

## User story
As **Bibi sharing a link on LinkedIn/WhatsApp**, I want a proper preview card so that people click through.

## Context
The legacy SPA gives crawlers an empty page, a single static title, the default `vite.svg` favicon and no OG tags.

## Scope
- Per-route `head()`: title, description, canonical URL, `og:*`, `twitter:card`.
- OG images: static default + one per case study (generated at build from the PORT-007 template, or exported by hand — pick the simpler).
- `sitemap.xml` (all prerendered routes, excluding 404/kitchen sink) and `robots.txt`.
- Favicon set (SVG + PNG + apple-touch-icon) and `site.webmanifest` from the new logo.
- JSON-LD `Person` on home/about.

## Acceptance criteria
- [ ] LinkedIn Post Inspector and opengraph.xyz show correct cards for home and one case study. _(Needs a public URL: previews are behind Vercel login. Tags checked in the built HTML. Moved to the PORT-506 post-launch checks.)_
- [x] `sitemap.xml` lists every public route with the production domain. _(12 URLs: /, /work, /about and the 9 case studies. No drafts, hash URLs, 404 or /_ routes.)_
- [ ] Favicon shows correctly in Chrome, Safari and iOS home screen. _(Files and links in place and served with the right types. Check on the devices after merge.)_
- [ ] Rich Results Test validates the `Person` JSON-LD. _(Needs a public URL; moved to the PORT-506 post-launch checks. The JSON parses and follows schema.org Person.)_

## Out of scope
- Paid search, blog.

## Notes (2026-10-18)
- **`pageHead()`** (`src/lib/seo.ts`) now adds `og:image` (absolute, 1200×630, with alt), `twitter:card` (`summary_large_image`) and the twitter title, description and image, plus optional JSON-LD scripts. Home now uses it too (path `/`).
- **Share images (interim until PORT-007):**
  - **Default:** `public/og.jpg`, the "bibi" wordmark and a yellow star on blue with the notebook grid.
  - **Case studies:** each one's cover, cropped to 1200×630 JPEG by `processOgImage()` in the content build (content-hashed, in `public/_img/<slug>/`). JPEG because some previews skip WebP and AVIF.
  - The placeholder covers and the 272px covers (Rato Túlio, Busca Resgatados) make weak cards until PORT-507 replaces them. A designed template from PORT-007 can replace both.
- **Icons:** `scripts/brand-assets.ts` builds them from vector paths (v3 star on brand blue): `favicon.svg`, `favicon.ico` (a 32px PNG inside an ICO), `apple-touch-icon.png` (180, square), `icon-192`/`icon-512`, a maskable 512 and `og.jpg`. The outputs are committed; rerun it after a brand change. `site.webmanifest` and the icon links are in the root `head()`.
- **Sitemap:** `scripts/sitemap.ts` runs in `pnpm build` after the content build and writes `public/sitemap.xml` (git-ignored) from a static list (`/`, `/work`, `/about`) plus the projects that ship. TanStack Start's built-in sitemap uses its crawl list, which includes `/work#work`, both `/work` and `/work/`, and the 404. `robots.txt` allows everything and points to the sitemap. Vercel already marks preview deployments noindex.
- **JSON-LD `Person`** on home and about: name, url, portrait image, jobTitle, worksFor momoGood, São Paulo, email, and `sameAs` LinkedIn and Medium. There's no GitHub profile in `profile.ts` yet; add it to `socials` if wanted.

