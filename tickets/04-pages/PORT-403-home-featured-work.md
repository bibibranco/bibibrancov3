# PORT-403 — Home: featured work

| Field | Value |
|---|---|
| Epic | E4 — Pages |
| Type | eng |
| Priority | P0 |
| Estimate | M |
| Depends on | PORT-301, PORT-202, PORT-302 |
| Status | review |

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
- [x] Cards are `<a>` elements reachable by Tab and activated with Enter. _(Desk objects; `e2e/desk.spec.ts`.)_
- [x] Toggling `featured` in MDX adds/removes a card without code changes. _(Per fragment. The test counts `featured: true` fragments in the MDX and expects that many links. Past ten, the slots repeat one desk lower.)_
- [x] Layout matches PORT-007 on all breakpoints. _(Hand-placed from xl, not lg: see Notes.)_

## Notes
- **Built in:**
  - `src/components/home/desk.tsx`: one object per fragment type. The terminal, sticky, receipt, shop tag, polaroid, print, index card, clipping and notebook page are all from the canvas.
  - `src/components/home/desk-layout.ts`: the ten canvas slots, as percentages of a 1200px desk.
- **Deviation from the canvas:** hand placement starts at **1280 (xl)**, not 1024.
  - At 1024 the objects narrow with the desk, but their text doesn't, so neighbours overlapped: the sticky over Thomé, the clipping over AEDIT.
  - 1024–1279 uses three masonry columns. Below that, two (as designed).
- **Link names:** each object is one link, named by everything on it, caption included ("… terminal · momoProto →").
  - A caption-only name (`aria-labelledby`) failed axe's label-in-name rule (WCAG 2.5.3).
  - The project title is always link text. The object word is hidden below md, per copy.md.
- **Sticky-note hand:** Caveat, self-hosted (`@fontsource-variable/caveat`, `font-hand`). It was the canvas default, and the open question in the design system wasn't answered. Swapping it is one token. It's only fetched when a sticky renders, below the fold.
- **Images:**
  - Polaroids and prints use each image's own aspect ratio, not the canvas crops. AEDIT's print is taller than on the canvas, so all three phone screens stay visible.
  - All desk images are lazy, so the hero's LCP is untouched.
- **Owed content** (PORT-507): the momoGood quote, the woodworking spec, the Busca Resgatados date, and a stat receipt for Itaú if numbers are cleared. They show as TODO today.
- **Tests:** `e2e/desk.spec.ts` covers links and count, keyboard, "Everything, tidy" and hover lift with reduced motion. `desk-layout.test.ts` covers the slots.

## Out of scope
- Filtering (PORT-405).
