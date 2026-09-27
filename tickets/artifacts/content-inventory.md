# Content inventory (PORT-001)

Audit of every user-visible string, image and link in the legacy site (`bibibranco/`, becoming `legacy/` in PORT-101). Audited 2026-09-27.

**Status key:** **keep** = reuse as is · **rewrite** = keep the idea, new copy in PORT-008 · **verify** = Bibi needs to confirm the facts · **drop** = not carried over · **decide** = needs a call in PORT-003/004.

Paths are relative to `bibibranco/src/` unless noted.

## 1. Global / document

| # | Location | Current value | Status | Notes |
|---|---|---|---|---|
| G1 | `../index.html` `<title>` | Bibi Branco | rewrite | One static title for every page; needs per-page titles (PORT-008, PORT-401) |
| G2 | `../index.html` favicon | `/vite.svg` | drop | Vite default; new favicon set in PORT-501 |
| G3 | `../index.html` fonts | Google Fonts: Syne 400–800, PT Mono | decide | Keep/drop in PORT-004; self-host via fontsource (PORT-103) |
| G4 | `../index.html` script | `unpkg.com/@phosphor-icons/web` | drop | Render-blocking and unused (icons come from `@phosphor-icons/react`) |
| G5 | `../index.html` GA4 | `G-KR5JD1GYC2` | keep | Same ID in PORT-502 |
| G6 | `index.css` | Background `#0055D4`, text `#DCEAFF` | decide | Identity colours (PORT-004) |
| G7 | — | No meta description, no OG tags | rewrite | PORT-008 / PORT-501 |

## 2. Header & footer

| # | Location | Current value | Status | Notes |
|---|---|---|---|---|
| H1 | `components/Header/Header.jsx` | Logo image (`assets/logo.svg`), no alt, not a link | decide | Keep logo? (PORT-004). Must link home with an accessible name |
| F1 | `components/Footer/Footer.jsx` | "Developed by the amazing Amanda Medeiros and I" | rewrite | Keep the credit but reword for v4 (e.g. credit for v3). "and I" → "and me" |
| F2 | same | Link `https://asmdrs.vercel.app/` | keep | Live (200) |

## 3. Hero

| # | Location | Current value | Status | Notes |
|---|---|---|---|---|
| HE1 | `components/HeroSection/MainText/MainText.jsx` | "Hey there! I'm Bibi Branco and I …" | rewrite | Keep the friendly tone (PORT-002 tone of voice) |
| HE2 | same, rotating words | "create stuff", "build interfaces", "build furniture", "love spreadsheets" | rewrite | Update to current interests; mechanics rebuilt in PORT-402 |

## 4. Latest projects (home)

| # | Location | Current value | Status | Notes |
|---|---|---|---|---|
| LP1 | `components/Latest Projects/ProjectSection.jsx` | Section title "latest projects" | rewrite | Becomes "featured work" or similar |
| LP2 | same | **Busca Resgatados** — "A digital platform created amidst a catastrophe" | keep | Becomes a case study (`busca-resgatados`) |
| LP3 | same | Link: Medium article `…/busca-resgatados-a-digital-platform-created-amidst-a-catastrophe-3b402c184f11` | verify | Medium blocks automated checks (403); open it manually |
| LP4 | same | **Rato Túlio** — "The process of 3D printing and using Arduino to build my own Halloween costume" | keep | Becomes a case study (`rato-tulio`) |
| LP5 | same | Link: TikTok `https://vm.tiktok.com/ZMkJ1nLMd/` | keep | Live (resolves to a TikTok video) |
| LP6 | same | "Check it out" (×2) | rewrite | Generic link text; needs descriptive text for accessibility |
| LP7 | same | Image alt "Project 1", "Project 2" | rewrite | Meaningless alt text |

## 5. "count me in for" (timeline)

| # | Location | Current value | Status | Notes |
|---|---|---|---|---|
| T1 | `components/Timeline/Timeline.jsx` | Section title "count me in for" | decide | Nice phrase; keep if the section survives PORT-003/005 |
| T2 | same | **product design** — "I've been working on end-to-end UI/UX projects for the last 5 years" → `/project/1` | verify | "5 years" is stale (started 2018 per About → 8+ years) |
| T3 | same | **crafting** — "playing around with woodworking, glass cutting and circuits since I was a child" → `/project/2` | keep | |
| T4 | same | **data viz** — "creating spreadsheets and turning the collected data into visual assets is one of my passions" → `/project/3` | keep | Same sentence is reused as the data viz case-study description (P3.2) |
| T5 | same | **sharing knowledge** — "talking about my passions and curiosities with other people keeps me moving" (no link) | decide | No destination. Link to talks/workshops, or keep as text? |
| T6 | same | Closing line "and hoping this list grows bigger everyday" | rewrite | Typo: "everyday" → "every day" |

## 6. Case studies (`pages/Project.jsx`, `projetos` array)

| # | Project | Current value | Status | Notes |
|---|---|---|---|---|
| P1.1 | 1 · product design | Title "product design" | decide | Bundles 3 projects; split per PORT-003 |
| P1.2 | same | Description: "I’ve been working with end-to-end user experience design for the last five years, creating and collaborating with global companies such as Itau Unibanco, Melhor Envio, and AEDIT. …" | verify | "five years" stale; "Itau" → "Itaú"; check the company list is current |
| P1.3 | same · **AEDIT** | "Being the sole designer leading a complete= application redesign, my responsbilities ranged from …" | rewrite | Typos: "complete=", "responsbilities". Becomes case study `aedit` |
| P1.4 | same · **Thomé** | "Covid-19 affected the way kids access education … final project for my Design undergrad …" | keep | Becomes case study `thome` |
| P1.5 | same · **other projects** | "I have also designed experiences for real life applications, experimental workshops, …" | decide | Generic; drop or fold into About |
| P2.1 | 2 · crafting | Description: "woodworking, cutting glass, graphic design and a pile of different hobbies collected throughout the years" | keep | |
| P2.2 | same · woodworking | "I recently rediscovered my passion for working with tangible things … made piece with that side of me …" | rewrite | Typo: "made piece" → "made peace". Becomes `woodworking` |
| P3.1 | 3 · data viz | Title "data viz" | keep | Becomes `itp-mapping` |
| P3.2 | same | Description (same as T4, with trailing whitespace) | keep | |
| P3.3 | same | Three paragraphs on the ITP Camp interaction log and 3D prisms | keep | Good content; light edit |
| P0 | `pages/SideBar.jsx/SideBar.jsx` | "back to homepage" | rewrite | Replaced by site nav + prev/next project |

## 7. About

| # | Location | Current value | Status | Notes |
|---|---|---|---|---|
| A1 | `components/About/About.jsx` | Section title "about me" | keep | |
| A2 | same | Portrait `assets/me.png`, no alt | decide | New photo? Needs alt text either way |
| A3 | same | Itaú Unibanco · 2022 – present · mid-level product designer | verify | Still there? Still mid-level? |
| A4 | same | Melhor Envio · 2020 – 2022 · junior/mid-level product designer | keep | |
| A5 | same | Agência Ursa · 2018 – 2020 · designer | keep | |
| A6 | same | Graphic Design · 2017 – 2022 · "bachalor’s degree @ Universidade Federal de Pelotas" | rewrite | Typo: "bachalor’s" → "bachelor’s" |
| A7 | same | ITP Camp · june 2023 · NYU summer program | keep | |
| A8 | same | Programming For All · 2020 · @Le Wagon | keep | |
| A9 | same | Headings "professional experience", "education" are `h1`s | — | Structural fix in PORT-407 |
| A10 | — | Anything since 2023 (new roles, projects, talks) is missing | verify | Bibi to list what to add |

## 8. Contact

| # | Location | Current value | Status | Notes |
|---|---|---|---|---|
| C1 | `components/Contact/Contact.jsx` | Title "get in touch" | keep | |
| C2 | same | "say hi, invite me to collaborate on a project or just ask for my PSN so I can beat you on EAFC 24" | rewrite | "EAFC 24" is dated |
| C3 | same | LinkedIn `https://www.linkedin.com/in/bibibranco/` | verify | LinkedIn blocks automated checks (999); open it manually |
| C4 | same | `mailto: oi@bibibran.co` | keep | Bug: stray space after `mailto:`. Fix in PORT-408 |

## 9. Images & assets

Sizes are the original files. Anything over about 200 KB needs optimizing (PORT-304).

| File | Size | Dimensions | Used in | Status | Notes |
|---|---|---|---|---|---|
| `public/1D6A3859.jpg` | 1.4 MB | 5196×3008 | Timeline (data viz), Project 3 | keep | Rename (`itp-prisms.jpg`); far too large |
| `public/aedit.jpg` | 688 KB | 1521×1200 | Project 1 | keep | → `aedit` cover |
| `public/thome.jpg` | 696 KB | 1521×1136 | Project 1 | keep | → `thome` cover |
| `public/random.jpg` | 932 KB | 1521×1152 | Project 1 ("other projects") | decide | Follows P1.5 |
| `public/woodworking.jpg` | 1.7 MB | 2818×3149 | Project 2 | keep | Far too large |
| `public/woodworking2.jpg` | 44 KB | 400×200 | Timeline (crafting) | decide | Too small for anything but a thumbnail |
| `public/mapping.jpg` | 248 KB | 1086×724 | Project 3 | keep | |
| `public/img01.jpg` | 44 KB | 400×200 | Timeline (product design) | decide | Low resolution |
| `public/habla.jpg` | 32 KB | 400×200 | Timeline (sharing knowledge) | decide | Low resolution |
| `src/assets/buscaresg.jpg` | 12 KB | 272×192 | Latest projects | rewrite | Need a high-res cover for a case study |
| `src/assets/tulio.jpg` | 36 KB | 272×192 | Latest projects | rewrite | Need a high-res cover for a case study |
| `src/assets/me.png` | 156 KB | 734×734 | About | decide | See A2 |
| `src/assets/logo.svg` | 4 KB | — | Header | decide | See H1 |
| `src/assets/star.svg`, `star-blue.svg` | 4 KB each | — | Timeline, sidebar | decide | Star motif (PORT-004) |
| `src/assets/shape.svg` | 4 KB | — | **unused** | drop | |
| `src/assets/react.svg`, `public/vite.svg` | — | — | Template leftovers | drop | |

**Missing assets:** high-res covers for Busca Resgatados and Rato Túlio; images for anything added since 2023; an OG image.

## 10. Links

| URL | Where | Result (2026-09-27) |
|---|---|---|
| `https://www.bibibran.co/` | Production | 200. Apex `bibibran.co` redirects to `www` |
| `https://asmdrs.vercel.app/` | Footer | 200 |
| `https://vm.tiktok.com/ZMkJ1nLMd/` | Rato Túlio | 200 (resolves to the TikTok video) |
| Medium Busca Resgatados article | Busca Resgatados | 403 to bots. **Check manually** |
| `https://www.linkedin.com/in/bibibranco/` | Contact | 999 to bots. **Check manually** |
| `mailto: oi@bibibran.co` | Contact | Malformed (leading space) |

## 11. Code-level findings (for the rebuild, not content)

- `App.jsx` imports `components/Latest Projects/Project/Projects` but never renders it. The component is a copy of `Experience`. Drop it.
- `ProjectSection.jsx` imports `useNavigate` and doesn't use it. Cards are `div role="button"` with no keyboard handler.
- `MainText.jsx` recreates `textsArray` on every render and uses it as the effect dependency, so the interval resets on every tick.
- `Project.jsx` crashes when `projectId` doesn't match (`projeto` is undefined).
- `TimelineCard.jsx` renders every card's content twice so it can swap sides on mobile.
- Content images are CSS `background-image`s: no alt text, and search engines don't index them.

## Summary for PORT-008 (copy refresh)

**Typos to fix:** "complete=", "responsbilities", "made piece" → "made peace", "bachalor’s" → "bachelor’s", "everyday" → "every day", "Itau" → "Itaú", "and I" → "and me".

**Facts for Bibi to confirm:**
- A3: current role and title at Itaú
- T2 / P1.2: years of experience
- A10: anything new since 2023
- LP3 / C3: the Medium and LinkedIn links still work

**Decisions for PORT-003/004:**
- T5: where "sharing knowledge" goes
- P1.5: keep "other projects" or not
- Low-res timeline thumbnails
- Logo, star motif, colours and fonts
