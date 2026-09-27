# PORT-401 — Root route: document shell, head & error handling

| Field | Value |
|---|---|
| Epic | E4 — Pages |
| Type | eng |
| Priority | P0 |
| Estimate | S |
| Depends on | PORT-203 |
| Status | todo |

## User story
As a **visitor**, I want every page to load with the right title, language and a graceful error state so that the site feels solid even when something goes wrong.

## Context
Legacy `index.html` has a static `<title>Bibi Branco</title>`, the Vite favicon, and no error handling (an unknown project id throws in `Project.jsx`).

## Scope
- `src/routes/__root.tsx`: `<html lang="en">`, charset/viewport, default `head()` meta (title template "%s · Bibi Branco", description, theme-color), stylesheet link, `<main id="main">` target for the skip link.
- `errorComponent` with friendly copy and a link home.
- `notFoundComponent` wired to the 404 page (PORT-409).

## Acceptance criteria
- [ ] Prerendered HTML for every route includes `lang`, title and description.
- [ ] Throwing in a route loader shows the error component, not a blank page.
- [ ] Child routes can override title/description.

## Out of scope
- OG images, sitemap (PORT-501).
