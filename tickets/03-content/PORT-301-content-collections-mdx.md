# PORT-301 — Content collections, MDX & project schema

| Field | Value |
|---|---|
| Epic | E3 — Content |
| Type | eng |
| Priority | P0 |
| Estimate | M |
| Depends on | PORT-102, PORT-005 |
| Status | todo |

## User story
As **Bibi**, I want to add a project by dropping in one MDX file so that updating the portfolio doesn't mean editing components.

## Context
Legacy content is a JS array (`projetos` in `legacy/src/pages/Project.jsx`) with fields `id`, `nome`, `description`, `content[] {imgUrl, imgDesc, imgTxt}`, found by numeric id and crashing on an unknown id (`projeto` is undefined).

## Scope
- Install `@content-collections/core`, `@content-collections/vite`, `@content-collections/mdx` and `zod`.
- `content/work/*.mdx` collection with a zod schema:
  `title`, `slug`, `summary`, `year`, `role`, `tags[]`, `cover { src, alt }`, `featured` (bool), `order` (number), `externalUrl?`, `draft?`.
- MDX component map for the blocks defined in PORT-005 (e.g. `<Figure>`, `<ImagePair>`, `<Quote>`, `<Stats>`), using PORT-202 primitives.
- Helpers in `src/lib/content.ts`: `getAllProjects()`, `getFeaturedProjects()`, `getProjectBySlug()`, `getAdjacentProjects()`; drafts excluded in production.

## Acceptance criteria
- [ ] A file with invalid frontmatter fails `pnpm build` with a readable error.
- [ ] A sample MDX renders all custom blocks.
- [ ] Helpers are fully typed from the schema (no `any`).
- [ ] Drafts show in dev and are excluded from production build.

## Out of scope
- Writing real content (PORT-302).
