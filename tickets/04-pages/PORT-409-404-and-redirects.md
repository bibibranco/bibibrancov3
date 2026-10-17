# PORT-409 — 404 page & legacy redirects

| Field | Value |
|---|---|
| Epic | E4 — Pages |
| Type | eng |
| Priority | P0 |
| Estimate | S |
| Depends on | PORT-401, PORT-003, PORT-106 |
| Status | in progress |

## User story
As **someone following an old link**, I want to land on the right new page instead of an error so that shared links keep working.

## Context
Old URLs `/project/1`, `/project/2`, `/project/3` may be shared or indexed. The legacy app had no 404. Found on 2026-09-27: loading `https://www.bibibran.co/project/1` directly already returns a Vercel 404, because the legacy SPA has no rewrite. Old deep links have been broken on direct load all along; they only work when clicked from the home page.

## Scope
- 404 page (design from PORT-007) linking to home and `/work`.
- Host-level 301 redirects (e.g. `vercel.json` `redirects`) using the table from PORT-003 ([`sitemap.md` §4](../artifacts/sitemap.md#4-legacy-redirects-input-for-port-409)).
- Host serves the prerendered 404 with a real 404 status.

## Acceptance criteria
- [ ] `curl -I <preview>/project/1` returns 301 to the mapped page (repeat for 2 and 3).
- [ ] `curl -I <preview>/nope` returns 404 and shows the custom page.
- [ ] 404 page has `noindex`.

## Notes / links
- `src/routes/404.tsx` renders `NotFound` and is prerendered to `dist/client/404.html` (`pages` in `vite.config.ts`). It needs a real route because prerendering stops on any non-200 response. Vercel serves `404.html` with a 404 status for unmatched paths.
- `NotFound` renders `<meta name="robots" content="noindex">`, which React hoists into `<head>`. That covers `404.html`, unknown URLs on the dev server and client-side navigation, and a future `notFound()` from `/work/$slug`.
- Redirects live in `vercel.json` with `statusCode: 301` (`permanent: true` would send 308). `/project/:id` comes last as the catch-all.
- `/work#work` only scrolls once PORT-405 adds the `work` group id.
- The 404 layout is still the PORT-401 placeholder. Restyle it when PORT-007 delivers the design.

## Out of scope
- Redirects for URLs that never existed.
