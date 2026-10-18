# bibibran.co

Bibi Branco's portfolio, v4. TanStack Start (React 19, Vite, TypeScript), Tailwind v4 with shadcn on Base UI, and MDX case studies through content-collections. Every page is prerendered to static HTML and hosted on Vercel.

The backlog and design decisions live in [`tickets/`](tickets/README.md). The 2023 site is in `legacy/` until launch.

## Working on it

Needs Node 24 (`.nvmrc`) and pnpm.

| Command                                              | What it does                                                               |
| ---------------------------------------------------- | -------------------------------------------------------------------------- |
| `pnpm dev`                                           | Dev server on http://localhost:3044                                        |
| `pnpm build`                                         | Content, sitemap and the prerendered site in `dist/`                       |
| `pnpm preview`                                       | Serves `dist/`                                                             |
| `pnpm typecheck` · `pnpm lint` · `pnpm format:check` | Static checks                                                              |
| `pnpm test`                                          | Unit tests (Vitest)                                                        |
| `pnpm test:e2e`                                      | Browser tests against the build (Playwright + axe); run `pnpm build` first |
| `pnpm budget`                                        | Checks the home JS budget below; run `pnpm build` first                    |
| `pnpm content:todo`                                  | Lists `TODO` markers left in the content                                   |

A new project is one MDX file in `content/work/` with its images in a folder of the same name. See `content-collections.ts` for the fields.

## Performance budget

From PORT-504. Every change should keep to it.

| Metric                                                             | Budget                               | Checked by                                            |
| ------------------------------------------------------------------ | ------------------------------------ | ----------------------------------------------------- |
| Lighthouse mobile: Performance, Accessibility, Best Practices, SEO | ≥ 95 each                            | Lighthouse, by hand                                   |
| Largest Contentful Paint                                           | < 2.5 s                              | Lighthouse, by hand                                   |
| Cumulative Layout Shift                                            | < 0.1                                | Lighthouse, by hand                                   |
| Interaction to Next Paint                                          | < 200 ms                             | Lighthouse Total Blocking Time as a stand-in, by hand |
| JS on the home page                                                | ≤ 150 KB gzipped                     | `pnpm budget`, in CI                                  |
| Third-party requests                                               | GA only, and only on the live domain | `e2e/third-party.spec.ts`, in CI                      |

To run Lighthouse, check four pages: home, `/work`, one case study and `/about`. Measure the Vercel preview of the branch, or a local server that compresses responses. `pnpm preview` doesn't compress, which adds about a second to LCP.

```sh
pnpm dlx lighthouse@12 <url> --view
```

Use the default mobile settings, a cold load, and the median of three runs.

What keeps the budget:

- **Prerendered HTML.** Text paints before any JS runs.
- **Preloaded fonts.** The Syne and Atkinson latin subsets are preloaded with `font-display: swap`. Other subsets load only for the characters that need them.
- **Small up-front JS.** Case study bodies are only in the case study chunk (`src/lib/content-body.ts`). `cn` runs on tables compiled for this project (`src/lib/cn-tables.ts`, kept current by the Vite plugin). The mobile menu's dialog loads on demand.
- **Responsive images.** AVIF and WebP in several widths (`scripts/content-images.ts`). Only the LCP image is eager and high priority.
