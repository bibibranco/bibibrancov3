# PORT-106 — Hosting & preview deploys

| Field | Value |
|---|---|
| Epic | E1 — Foundation |
| Type | eng |
| Priority | P0 |
| Estimate | S |
| Depends on | PORT-102 |
| Status | done |

## User story
As **Bibi**, I want every branch deployed to a preview URL so that I can review work on real devices and share it for feedback.

## Context
Production `bibibran.co` is live on **Vercel** today, served by an existing Vercel project that builds the legacy app. The domain is registered at **Namecheap**; its DNS runs on Vercel's nameservers (`ns1/ns2.vercel-dns.com`). The repo has no `vercel.json`, so the old project's settings (root directory, framework preset) live in the Vercel dashboard only.

## Scope
- Write down the existing Vercel project's name and settings (root directory, build command) in the Notes below.
- Create a **new** Vercel project on the same repo, root directory = repo root, TanStack Start preset / static output. Keeping the old project separate means production stays on the old site until PORT-506.
- Preview deploys per PR; production branch = `main` but **do not attach the production domain yet** (PORT-506).
- Staging URL recorded in `tickets/README.md`.

## Acceptance criteria
- [x] Opening a PR produces a preview URL.
- [x] The preview serves prerendered HTML (view-source shows content).
- [x] The live site on `bibibran.co` is untouched until launch (still served by the old Vercel project).
- [x] The new project's `*.vercel.app` URL is recorded in `tickets/README.md`.

## Out of scope
- Domain cutover (PORT-506).

## Notes / links
- Current host: Vercel. Existing project **`bibibrancov3`** (team `bibibrancos-projects`), root directory `legacy`, as shown by the Vercel bot on PR #7. It also builds a preview of the *legacy* app for every PR, so those preview links do not show the new app.
- DNS: registrar is Namecheap, but the nameservers are Vercel's, so records are managed in Vercel. No DNS changes are needed in this ticket.
- `vercel.json` at the repo root sets the new project's build: `pnpm build`, output `dist/client` (the prerendered static HTML), no framework preset, clean URLs.
- The root `vercel.json` **is** also applied to the old project, even with its root directory set to `legacy`: after #8 its builds failed (`pnpm install --frozen-lockfile` on an npm app). `legacy/vercel.json` (Vite, `npm ci`, `npm run build`, output `dist`) now pins the old project's build; verified on PR #10. Production was never affected, because a failed build doesn't replace the live deployment.
- New project: **`bibibranco-v4`** (created as `bibibrancov3-legacy`, renamed 2026-10-01; builds the v4 app at the repo root), production branch `main`, no custom domain. Staging URL: https://bibibranco-v4.vercel.app. Deployment Protection is on for preview URLs (Vercel login required); the production `*.vercel.app` alias is public.
- Verified on PR #10: both projects post a preview; the v4 preview serves prerendered HTML (`<h1>Bibi Branco</h1>` in the response), the legacy preview serves the old SPA; `www.bibibran.co` is still on `bibibrancov3`.
