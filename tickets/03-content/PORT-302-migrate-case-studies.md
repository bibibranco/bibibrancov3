# PORT-302 — Migrate case studies to MDX

| Field | Value |
|---|---|
| Epic | E3 — Content |
| Type | content |
| Priority | P0 |
| Estimate | L |
| Depends on | PORT-301, PORT-008, PORT-304 |
| Status | review |

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
- Keep outbound links (Medium, TikTok) as `links.external` (PORT-301 replaced `externalUrl`) and in-body references.

## Acceptance criteria
- [x] Every legacy project is either migrated or explicitly dropped in PORT-001. _(AEDIT, Thomé, woodworking, ITP map, Busca Resgatados and Rato Túlio migrated. "Other projects" (P1.5) becomes the one-line mention on /about in copy.md.)_
- [x] Every image has meaningful alt text (no "Project 1"). _(Written from looking at each image. Placeholder covers say they are placeholders.)_
- [x] All MDX files pass schema validation in `pnpm build`.

## Out of scope
- New photography.

## Notes
- **Draft content (2026-10-18).** All nine projects from sitemap §3 are in `content/work/`, including the three new ones (momoProto, momoGood platform, Itaú card fees). They use only facts from the content inventory (§6, §7a), `copy.md` and v3, with v3 typos fixed. Every unknown is a `TODO` marker, never a guess presented as fact. `pnpm content:todo` lists all 67 of them, and **PORT-507** clears them before launch.
- **Featured and order** follow sitemap §3. Featured: momoProto, momoGood platform, Itaú, Rato Túlio. The desk fragments follow the canvas order (`copy.md`). The Itaú fragment is an index card until there are NDA-cleared numbers. `getFeaturedProjects()` now follows /work order (Work, then Craft), so `order` values only need to be unique within a group.
- **Images:** new projects use labelled `cover-placeholder.jpg` files. Rato Túlio and Busca Resgatados keep their 272×192 v3 images for now.
- **Bug found and fixed:** a YAML syntax error (an unquoted `: ` in `summary`) dropped `momoproto.mdx` without any message, and `pnpm build` still passed. The cause is upstream: the content-collections CLI subscribes to errors only after the files have been parsed. `scripts/content-build.ts` replaces the CLI in `build` and `typecheck`. It listens from the start, prints every error with its file, and exits 1.

