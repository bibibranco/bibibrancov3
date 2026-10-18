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
> **Updated by PORT-005 (2026-10-17):** the section is now "bits and pieces on my desk". It renders `getFeaturedFragments()` as desk objects (terminal, sticky, receipt, shop tag, polaroid, clipping, notebook page) instead of `ProjectCard`s. See [`wireframes.md`](../artifacts/wireframes.md#direction-a--c-bits-and-pieces-on-my-desk-bibi-2026-10-17). The scope below is superseded where it conflicts.

- Section listing `getFeaturedProjects()` sorted by `order`.
- `ProjectCard`: cover, title, summary, tags; the whole card is one real link to `/work/$slug`. Every project has its own page (PORT-003); projects with `externalUrl` link out from their page, not from the card.
- "See all work" link to `/work`.

## Acceptance criteria
- [ ] Cards are `<a>` elements reachable by Tab and activated with Enter.
- [ ] Toggling `featured` in MDX adds/removes a card without code changes.
- [ ] Layout matches PORT-007 on all breakpoints.

## Out of scope
- Filtering (PORT-405).
