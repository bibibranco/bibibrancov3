# PORT-102 — Scaffold TanStack Start

| Field | Value |
|---|---|
| Epic | E1 — Foundation |
| Type | eng |
| Priority | P0 |
| Estimate | M |
| Depends on | PORT-101 |
| Status | review |

## User story
As the **developer**, I want a TanStack Start app with strict TypeScript and file-based routing so that I build on the stack I use day to day and every page is prerendered to real HTML.

## Context
Legacy uses React 18 + React Router 6 as a client-only SPA (`legacy/src/main.jsx`), so crawlers and link previews only see an empty `<div id="root">`.

## Scope
- Scaffold TanStack Start (React 19, Vite, TypeScript) at the repo root.
- `tsconfig` with `strict: true`, `noUncheckedIndexedAccess: true`, path alias `@/*` → `src/*`.
- File-based routes in `src/routes/` with a placeholder `/` route.
- Enable static prerendering of all routes (crawl links) in the Start config.
- `.nvmrc` pinned to the current Node LTS.

## Acceptance criteria
- [x] `pnpm dev` serves a placeholder home page at http://localhost:3044.
- [x] `pnpm build` outputs prerendered HTML for `/` (verify the HTML contains page text, not just a root div).
- [x] Route tree is generated and typed (a link to a non-existent route is a type error).
- [x] `@/` alias resolves in both TS and Vite.

## Out of scope
- Styling (PORT-103), linting (PORT-104).

## Notes / links
- Implementation notes:
  - Scaffolded with `@tanstack/cli create --blank` (React 19.3, Start 1.168, Router 1.170, Vite 8, TypeScript 6).
  - **pnpm 10** is pinned via `packageManager`, matching momoProto.
  - Node **24** is pinned in `.nvmrc` and `engines`.
  - Dev port is **3044** with `--strictPort`, because ports 3000, 3007 and 3100 are used by your other local projects.
  - `routeTree.gen.ts` is committed, as TanStack recommends.
- Follow the current official TanStack Start quick start; check the docs for the prerender option name in the installed version.
