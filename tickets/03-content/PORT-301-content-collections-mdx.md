# PORT-301 — Content collections, MDX & project schema

| Field | Value |
|---|---|
| Epic | E3 — Content |
| Type | eng |
| Priority | P0 |
| Estimate | M |
| Depends on | PORT-102, PORT-005 |
| Status | review |

## User story
As **Bibi**, I want to add a project by dropping in one MDX file so that updating the portfolio doesn't mean editing components.

## Context
Legacy content is a JS array (`projetos` in `legacy/src/pages/Project.jsx`) with fields `id`, `nome`, `description`, `content[] {imgUrl, imgDesc, imgTxt}`, found by numeric id and crashing on an unknown id (`projeto` is undefined).

## Scope
- Install `@content-collections/core`, `@content-collections/vite`, `@content-collections/mdx` and `zod`.
- `content/work/*.mdx` collection with a zod schema:
  `title`, `slug`, `summary`, `year`, `role`, `timeline`, `team?`, `outcome?`, `category` (`work` | `craft`, PORT-003), `tags[]`, `cover { src, alt }`, `featured` (bool), `order` (number), `links { live?, repo?, external? }` (replaces `externalUrl`), `fragments[]` (home "bits and pieces": `{ type: code | quote | stat | spec | image | writing | sketch, …, featured?, order? }`), `draft?`. See [`wireframes.md`](../artifacts/wireframes.md#case-study-content-blocks-input-for-port-301).
- MDX component map for the blocks defined in PORT-005: `<Figure>`, `<ImagePair>`, `<Quote>`, `<Stats>`, `<Specs>`, using PORT-202 primitives.
- Helpers in `src/lib/content.ts`: `getAllProjects()`, `getFeaturedProjects()`, `getProjectBySlug()`, `getAdjacentProjects()`, `getFeaturedFragments()`; drafts excluded in production.

## Acceptance criteria
- [x] A file with invalid frontmatter fails `pnpm build` with a readable error. _(One line per bad field, then exit 1.)_
- [x] A sample MDX renders all custom blocks. _(`content/work/sample.mdx`, shown on `/_kitchen-sink` in dev.)_
- [x] Helpers are fully typed from the schema (no `any`).
- [x] Drafts show in dev and are excluded from production build.

## Out of scope
- Writing real content (PORT-302).

## Notes
- **Slug = file name.** `content/work/<slug>.mdx` sets the slug, so there's no `slug` field that could drift from the URL. Rename a file only with a 301 (sitemap §3).
- **Failing on bad frontmatter:** the Vite plugin only logs validation errors and drops the file, so `pnpm build` and `pnpm typecheck` run `content-collections build` first, which exits 1. Typecheck needs it anyway, since the types are generated.
- **Drafts** are skipped in the collection transform when `NODE_ENV` is `production`, so they never reach the bundle (not just filtered out in the helpers).
- **Fragments** are a discriminated union on `type`: `code { lines }`, `quote { text, cite? }`, `stat { title, rows, total? }`, `spec { rows }`, `image { image, object: polaroid | print }`, `writing { title, body?, source?, object: clipping | index-card }`, `sketch { image }`. Each has `featured` and `order`.
- **Blocks** are in `src/components/mdx/blocks.tsx`, and `MdxContent` maps them together with styled `h2`, `h3`, `p` and links (external links open in a new tab, internal ones go through the router). Figures are numbered "fig. N" by a CSS counter. The full-bleed breakout for `<Figure size="full">` is left to PORT-406.
- `links.external` is a plain URL. The label ("Read the full story on Medium") is decided in PORT-406.

