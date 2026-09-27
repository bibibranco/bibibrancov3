# PORT-409 — 404 page & legacy redirects

| Field | Value |
|---|---|
| Epic | E4 — Pages |
| Type | eng |
| Priority | P0 |
| Estimate | S |
| Depends on | PORT-401, PORT-003, PORT-106 |
| Status | todo |

## User story
As **someone following an old link**, I want to land on the right new page instead of an error so that shared links keep working.

## Context
Old URLs `/project/1`, `/project/2`, `/project/3` may be shared or indexed. The legacy app had no 404.

## Scope
- 404 page (design from PORT-007) linking to home and `/work`.
- Host-level 301 redirects (e.g. `vercel.json` `redirects`) using the table from PORT-003.
- Host serves the prerendered 404 with a real 404 status.

## Acceptance criteria
- [ ] `curl -I <preview>/project/1` returns 301 to the mapped page (repeat for 2 and 3).
- [ ] `curl -I <preview>/nope` returns 404 and shows the custom page.
- [ ] 404 page has `noindex`.

## Out of scope
- Redirects for URLs that never existed.
