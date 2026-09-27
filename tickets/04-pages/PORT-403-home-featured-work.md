# PORT-403 — Home: featured work

| Field | Value |
|---|---|
| Epic | E4 — Pages |
| Type | eng |
| Priority | P0 |
| Estimate | M |
| Depends on | PORT-301, PORT-202, PORT-302 |
| Status | todo |

## User story
As a **recruiter**, I want to see Bibi's best projects right away so that I can judge their work without digging.

## Context
Legacy `ProjectSection.jsx` hardcodes two cards (Busca Resgatados, Rato Túlio) as `div role="button"` with `onClick` + `window.open` — not real links, no Enter-key support, unused `useNavigate`, and alt text "Project 1/2".

## Scope
- Section listing `getFeaturedProjects()` sorted by `order`.
- `ProjectCard`: cover, title, summary, tags; the whole card is one real link to `/work/$slug` (or `externalUrl` if the project has no page, marked as external).
- "See all work" link to `/work`.

## Acceptance criteria
- [ ] Cards are `<a>` elements reachable by Tab and activated with Enter.
- [ ] Toggling `featured` in MDX adds/removes a card without code changes.
- [ ] Layout matches PORT-007 on all breakpoints.

## Out of scope
- Filtering (PORT-405).
