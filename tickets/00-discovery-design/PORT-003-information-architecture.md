# PORT-003 — Information architecture & sitemap

| Field | Value |
|---|---|
| Epic | E0 — Discovery & Design |
| Type | design |
| Priority | P0 |
| Estimate | S |
| Depends on | PORT-001, PORT-002 |
| Status | todo |

## User story
As a **visitor**, I want a predictable site structure with readable URLs so that I can find work and background info quickly and share specific pages.

## Context
Today there is one long home page plus `/project/:projectId` with numeric ids (1–3) that group several projects together ("product design" mixes AEDIT, Thomé and "other projects"). "Latest projects" link out to Medium/TikTok instead of living on the site. There is no navigation, no 404 and no about page.

## Scope
Proposed sitemap to validate:
- `/` — home: hero, featured work, interests, short about, contact CTA
- `/work` — all projects, filterable by tag (product design, crafting, data viz, …)
- `/work/$slug` — one case study per project (e.g. `aedit`, `thome`, `busca-resgatados`, `rato-tulio`, `itp-mapping`, `woodworking`)
- `/about` — bio, experience, education, interests
- 404
- Redirects: `/project/1` → `/work?tag=product-design`, `/project/2` → `/work/woodworking`, `/project/3` → `/work/itp-mapping` (confirm final targets)
- Primary nav items and footer links.

## Acceptance criteria
- [ ] Sitemap diagram approved, covering every page and nav entry.
- [ ] Slug naming rule written (lowercase, kebab-case, stable).
- [ ] Every item in the PORT-001 inventory has a home in the new IA or is explicitly dropped.
- [ ] Legacy redirect table finalized (input for PORT-409).

## Out of scope
- Visual layout (PORT-005).

## Notes / links
- Decide whether external-only projects (Busca Resgatados → Medium) get a full case study or a short page with the outbound link.
