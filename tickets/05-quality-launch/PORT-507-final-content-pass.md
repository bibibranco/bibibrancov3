# PORT-507 — Final content pass before launch

| Field | Value |
|---|---|
| Epic | E5 — Quality & Launch |
| Type | content |
| Priority | P0 |
| Estimate | M |
| Depends on | PORT-302, PORT-303, PORT-008 |
| Status | todo |

## User story
As **Bibi**, I want every page to show real, checked content before the site goes live, so that nothing I'd be embarrassed by (a placeholder, a guessed date, an NDA slip) reaches a recruiter or a peer.

## Context
PORT-302 drafted all nine projects in MDX so the pages (E4) can be built and reviewed with realistic content. The drafts only use facts from the content inventory, the copy doc and v3. Everything else is a `TODO` marker:
- in YAML comments (`year: 2024 # TODO: confirm the year`) for values the schema needs but nobody has confirmed;
- in the value itself (`timeline: TODO — dates`, `value: 'TODO'`) where there's no sensible stand-in;
- as `[TODO: …]` paragraphs in the MDX bodies;
- on line 2 of every draft file, to be deleted last.

`pnpm content:todo` lists every marker in `content/work/` and `src/content/`. At PORT-302 merge there were 67 (64 in the projects, 3 in `profile.ts`).

The three new projects (momoProto, momoGood platform, Itaú card fees) use labelled placeholder covers, `cover-placeholder.jpg`. Rato Túlio and Busca Resgatados use their 272×192 v3 images.

## Scope
- **Facts:** confirm or fix every year, timeline, role, team and outcome flagged in the frontmatter.
- **NDA:** decide with momoGood and Itaú what can be shown. Rewrite or cut those case studies to match. Turn the Itaú index card into a `stat` receipt only if there are cleared numbers, and remove the `<Stats>` block otherwise.
- **Bodies:** replace every `[TODO: …]` paragraph in the full case studies, and write the 2–3 paragraphs for the short pages (Busca Resgatados, Rato Túlio).
- **Desk fragments:** a real momoGood quote and who said it, woodworking specs, a Thomé sketch (or keep the screen), and the Busca Resgatados post date.
- **Images:** real covers for the three new projects, high-res covers for Rato Túlio and Busca Resgatados, figure captions, and an alt-text check on every image.
- **Profile:** Melhor Envio and Agência Ursa summaries, the Melhor Envio level, the talks list, and the About portrait (keep v3's `me.png` or take a new photo, inventory A2).
- **Links:** open the Medium post and LinkedIn by hand (both block bots, inventory §10), and add any public prototype or repo links.
- **Proofread** every page on the preview, with tone per brief §5.
- **Gate:** run `pnpm content:todo` in production builds (`pnpm build`) or CI, so a leftover marker fails the build after this ticket.

## Acceptance criteria
- [ ] `pnpm content:todo` prints "No TODOs left."
- [ ] No `cover-placeholder.jpg` remains in `content/work/`.
- [ ] Bibi has signed off NDA-sensitive content (momoGood, Itaú) in writing in this ticket.
- [ ] Every page has been read end to end on the preview, and the fixes are merged.
- [ ] The production build fails if a `TODO` marker comes back.

## Out of scope
- New case studies beyond the nine in sitemap §3 (post-launch tickets).
- Layout changes (E4 tickets).

## Notes / links
- Markers per file at PORT-302 merge: Itaú 11, woodworking 10, momoProto 9, momoGood 9, Busca Resgatados 7, AEDIT 5, Rato Túlio 5, Thomé 5, ITP map 3, `profile.ts` 3.
- Owed facts are also listed in [`copy.md`](../artifacts/copy.md) and PORT-008.
