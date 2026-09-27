# PORT-501 — SEO, social previews & favicons

| Field | Value |
|---|---|
| Epic | E5 — Quality & Launch |
| Type | eng |
| Priority | P1 |
| Estimate | M |
| Depends on | PORT-401, PORT-406, PORT-007 |
| Status | todo |

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
- [ ] LinkedIn Post Inspector and opengraph.xyz show correct cards for home and one case study.
- [ ] `sitemap.xml` lists every public route with the production domain.
- [ ] Favicon shows correctly in Chrome, Safari and iOS home screen.
- [ ] Rich Results Test validates the `Person` JSON-LD.

## Out of scope
- Paid search, blog.
