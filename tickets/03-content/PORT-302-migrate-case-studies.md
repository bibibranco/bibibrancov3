# PORT-302 — Migrate case studies to MDX

| Field | Value |
|---|---|
| Epic | E3 — Content |
| Type | content |
| Priority | P0 |
| Estimate | L |
| Depends on | PORT-301, PORT-008, PORT-304 |
| Status | todo |

## User story
As a **visitor**, I want each project on its own page with the full story so that I understand Bibi's role and process.

## Context
Legacy project content (see PORT-001 inventory):
- `/project/1` "product design" bundles **AEDIT** (`aedit.jpg`), **Thomé** (`thome.jpg`) and "other projects" (`random.jpg`).
- `/project/2` "crafting" — **woodworking** (`woodworking.jpg`, `woodworking2.jpg`).
- `/project/3` "data viz" — **ITP Camp interaction mapping** (`mapping.jpg`, `1D6A3859.jpg`).
- Home "latest projects" — **Busca Resgatados** (Medium link, `buscaresg.jpg`) and **Rato Túlio** (TikTok link, `tulio.jpg`).

## Scope
- One MDX per project using PORT-008 copy: `aedit`, `thome`, `woodworking`, `itp-mapping`, `busca-resgatados`, `rato-tulio` (+ any new projects Bibi adds).
- Set `featured`/`order` per PORT-003 decisions.
- Keep outbound links (Medium, TikTok) as `externalUrl` and in-body references.

## Acceptance criteria
- [ ] Every legacy project is either migrated or explicitly dropped in PORT-001.
- [ ] Every image has meaningful alt text (no "Project 1").
- [ ] All MDX files pass schema validation in `npm run build`.

## Out of scope
- New photography.
