# PORT-406 — Case study page `/work/$slug`

| Field | Value |
|---|---|
| Epic | E4 — Pages |
| Type | eng |
| Priority | P0 |
| Estimate | L |
| Depends on | PORT-301, PORT-302, PORT-304 |
| Status | review |

## User story
As a **hiring manager**, I want a readable, well-structured case study so that I understand the problem, Bibi's role and the outcome.

## Context
Legacy `Project.jsx` + `SideBar.jsx` + `ProjectContent.jsx`: sidebar with title/description and "back to homepage", then image/text blocks with images as CSS backgrounds at a fixed 600px height. Unknown ids crash the page.

## Scope
- Route `src/routes/work/$slug.tsx`; loader uses `getProjectBySlug()` and throws `notFound()` for unknown slugs.
- Header: title, summary, meta (role, year, tags), cover image, external link if present.
- MDX body rendered with the PORT-301 component map, readable measure (~65–75ch).
- Prev/next project navigation (`getAdjacentProjects()`).
- Per-page `head()` with title, description, canonical, OG (image from PORT-501).
- All slugs prerendered.
- Analytics (PORT-502): `track('case_study_view', …)` once per view, `track('case_study_read', …)` once at 75% scroll, `track('prototype_click', …)` on live/repo links. Helpers are in `src/lib/analytics.ts`.

## Acceptance criteria
- [x] Every MDX project has a prerendered page at `/work/<slug>`. _(All 9 slugs are listed in `vite.config.ts` from the generated content, so they prerender even before /work links to them. Drafts are excluded.)_
- [ ] `/work/does-not-exist` shows the 404 page with a 404 status on the host.
- [x] Headings are in order (single `h1`, no skipped levels). _(Checked on all 9 built pages.)_
- [ ] Matches PORT-007 on all breakpoints. _(Blocked: PORT-007 isn't done. Built from the PORT-005 wireframes and PORT-006 design system, and checked at 375 and 1440 with no horizontal scroll.)_

## Notes / links
- From PORT-006: the body sits on a deep reading column with the notebook grid (`bg-notebook-card`), plus a `margin-width` column of `<MarginNote>`s on desktop (inline below lg) and numbered "fig. N" labels. See `tickets/artifacts/design-system/README.md`, "The notebook".

## Out of scope
- Comments, likes, view counts.

## Notes (2026-10-18)
- **Layout:** back link to the group (`/work#work` or `#craft`), title, summary, Summary `<dl>` (missing team or outcome left out), tags and ProjectLinks all sit on the first screen. Then the cover (eager, `fetchpriority="high"`, 16:10 on mobile and 2:1 from md), the deep notebook reading card, and prev/next in the same group.
- **Reading card:** a grid of `measure` plus a `margin-width` column, centred, from lg up. The new `<MarginNote>` MDX block sits beside the block before it on desktop and inline below lg. Full figures, image pairs and quotes span both columns. "Full" means the card's width, not the viewport: a true viewport bleed is a PORT-007 call.
- **Title size** is capped at `min(fluid-h1, 8vw)`: at 375px, "Woodworking" in Syne overflowed the screen. Only screens below ~560px are affected.
- **Data:** the loader only validates the slug (`notFound()` otherwise). The component reads the project from the bundle, so the MDX isn't serialised into the HTML a second time. All project data ships in the JS bundle; PORT-504 can split it if it weighs too much.
- **Head:** the new `pageHead()` in `seo.ts` adds canonical and `og:*` (type `article`). The OG image comes in PORT-501.
- **Analytics:** `case_study_view` per slug, deferred a tick so it lands after the root's gtag init and page_view. `case_study_read` fires via an IntersectionObserver marker at 75% of the body. `prototype_click` goes on live and repo links, and `outbound_click` (medium, case_study) on Medium links. TikTok isn't tracked (brief §4).
- **Build fix:** the content-collections Vite plugin now runs in dev only. During `vite build` it rebuilt the content before `NODE_ENV` was `production`, which brought the draft sample back (it was prerendered at `/work/sample`). `scripts/content-build.ts` already generates production content before Vite starts.
- **Local gotcha:** don't run `pnpm build` while `pnpm dev` is running. Both write to `.content-collections/` and `public/_img/`, and the dev watcher adds drafts back. CI and Vercel are unaffected.
- **Not here:** the contact CTA (PORT-408). The footer is `#contact` for now.
- **Follow-up fix (2026-10-18):** `pnpm dev` restarted in a loop after this merged. `vite.config.ts` imported the generated content to list the prerender pages, so Vite watched those files as config dependencies, and every content rebuild restarted the server. The file is now loaded by a runtime URL that the config bundler doesn't follow.

