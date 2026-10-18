# PORT-401 — Root route: document shell, head & error handling

| Field | Value |
|---|---|
| Epic | E4 — Pages |
| Type | eng |
| Priority | P0 |
| Estimate | S |
| Depends on | PORT-203 |
| Status | review |

## User story
As a **visitor**, I want every page to load with the right title, language and a graceful error state so that the site feels solid even when something goes wrong.

## Context
Legacy `index.html` has a static `<title>Bibi Branco</title>`, the Vite favicon, and no error handling (an unknown project id throws in `Project.jsx`).

## Scope
- `src/routes/__root.tsx`: `<html lang="en">`, charset/viewport, default `head()` meta (title template "%s · Bibi Branco", description, theme-color), stylesheet link, `<main id="main">` target for the skip link.
- `errorComponent` with friendly copy and a link home.
- `notFoundComponent` wired to the 404 page (PORT-409).

## Acceptance criteria
- [x] Prerendered HTML for every route includes `lang`, title and description. _(Checked `/`, `/work` and `/about`: exactly one `<title>` and one description each.)_
- [x] Throwing in a route loader shows the error component, not a blank page. _(Verified with a temporary `/_error-test` route whose loader throws: the page shows "This page didn't work." inside the header and footer. The route was removed afterwards.)_
- [x] Child routes can override title/description. _(`head: () => ({ meta: seo({ title, description }) })`; the deepest route wins and the tags are deduped, verified with a temporary description override.)_

## Notes / links
- `src/lib/seo.ts`: `seo({ title?, description? })` returns `"<title> · Bibi Branco"` (home: "Bibi Branco · Product designer") plus the description. The default description is a draft until PORT-008.
- The root `head()` sets charset, viewport, `theme-color` (#0055d4, the `--blue` token), the default `seo()` and the stylesheet. `<html lang="en">` and `<main id="main">` were already in place from PORT-203.
- `RouteError` (`src/components/site/route-error.tsx`): "This page didn't work.", with Try again (`reset()` + `router.invalidate()`) and Go home. The error message shows in dev only. It's set as the router's `defaultErrorComponent`.
- `NotFound` (`src/components/site/not-found.tsx`) is a placeholder 404 inside the shell (dev server returns status 404). It's set as the root `notFoundComponent` and `defaultNotFoundComponent`. PORT-409 replaces it with the designed page and the static `404.html`.

## Out of scope
- OG images, sitemap (PORT-501).
