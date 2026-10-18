# Site copy (PORT-008)

Working copy doc for v4. When a section is final, it moves into MDX/TS data (PORT-302, PORT-303) and the components that use it. Tone follows [brief.md §5](brief.md#5-tone-of-voice). Item IDs (HE1, C2, …) refer to the [content inventory](content-inventory.md). Layouts are in the PORT-005 wireframes.

**Status per section:** **Bibi** = written by Bibi · **draft** = drafted by Claude 2026-10-18 for Bibi to edit · **final** = signed off. Text in [brackets] is a fact or decision still owed.

## Hero (home)
Replaces HE1 and HE2. Status: **final, from Bibi (2026-10-18, PORT-007)**.

> **I started with design. Got a little carried away.**
> I'm a product designer with 8+ years of experience, a growing toolbox, and a tendency to learn things the hard way. Usually on purpose.

| Part | Copy |
|---|---|
| h1, small first line (mono) | Bibi Branco, product designer |
| h1 | I started with design. Got a little carried away. |
| Subline | I'm a product designer with 8+ years of experience, a growing toolbox, and a tendency to learn things the hard way. Usually on purpose. |
| Meta line (mono) | at momoGood · previously Itaú |
| Buttons | See my work · Say hi |

**Notes:**
- Replaces the 2026-10-17 draft ("Whatever works. And sometimes whatever doesn't."), which ran to four lines at display size. Options A–D are kept on the hi-fi canvas for the record.
- The name stays in the h1's small first line for name searches (PORT-005 SEO review), and the h1 uses the page-title size (36→72px), not display.
- "8+" is written as text here; the build should use `yearsOfExperience` from `profile.ts`.
- No rotating words (v3 had them); the only motion is the star (PORT-007 motion spec).
- Hero play (PORT-410, option A): the star is a button that drops tools. Its label is "Drop a tool from the star". The status line reads "click the star. it has things to show you." (lg) or "tap the star…" (phones), then "3 things out · latest: a terminal". The clear button is "tidy up".

## Home: bits and pieces on my desk
Replaces LP1, LP6, LP7. Status: **draft**. Layout is direction A + C from PR #17 ([`wireframes.md`](wireframes.md#direction-a--c-bits-and-pieces-on-my-desk-bibi-2026-10-17)): each project fragment is a desk object, and the fragment type picks the object.

| Part | Copy |
|---|---|
| Section title (h2) | bits and pieces on my desk |
| Link to `/work` | Everything, tidy → |
| Object link text | `<object> · <project title> →`, e.g. "terminal · momoProto →". The project title is always in the link text, so the name is real text in the HTML. Mobile drops the object word: "momoProto →" |

Fragments (input for `fragments[]` in PORT-301/PORT-302). Order follows the canvas; featured order is still Bibi's call.

| Project | Type → object | Fragment copy | Owed |
|---|---|---|---|
| `momoproto` | `code` → terminal | `$ pnpm ds:check` / `✓ every prototype passes the contract` | — (the `ds:check` gate is real, inventory §7a) |
| `momoproto` | `writing` → index card | **momoProto** · One hub for every prototype, with a design-system gate. | — |
| `momogood-platform` | `quote` → sticky | "[A quote from a user, a teammate, or me in a retro]" | The quote and who said it |
| `itau-credit-card-fees` | `stat` → receipt | ITAÚ · CARD FEES · [outcome] [value] · [outcome] [value] · TOTAL [value] | NDA-cleared numbers. If none can be shown, swap to a `writing` index card |
| `rato-tulio` | `image` → polaroid | Photo crop of the costume | Alt text, e.g. "[the rat costume, describe it]" |
| `busca-resgatados` | `writing` → clipping | MEDIUM · [date] · **A digital platform created amidst a catastrophe** | Medium post date |
| `itp-mapping` | `image` → polaroid | Crop of the 3D prisms | Alt text |
| `woodworking` | `spec` → shop tag | WOOD [ ] · TOOLS [ ] · TIME [ ] | Real wood, tools and time |
| `thome` | `sketch` → notebook page | A sketch from the project | Which sketch, and alt text |
| `aedit` | `image` → printed screenshot | One app screen | Which screen, and alt text |

Image alt text describes what's in the image, never "Project 1" (LP7). Decorative objects (the star sticker, empty slots) are `aria-hidden`.

## Project summaries
Status: **draft**. One line per project, used on `/work`, as the case-study meta description and in the case-study summary block. Not on the home page any more (the desk replaces cards there).

| Slug | Summary |
|---|---|
| `momoproto` | momoGood's prototype hub: clickable React prototypes in one app, all held to the same design-system contract. |
| `momogood-platform` | Designing a workplace giving platform from the ground up, and bringing AI into Tatango's messaging workflows. |
| `itau-credit-card-fees` | How millions of Itaú customers understand, choose and manage their credit card fees. |
| `rato-tulio` | A Halloween rat costume, 3D printed and wired up with Arduino. |
| `aedit` | The only designer on a full redesign of the AEDIT app. |
| `thome` | My design degree's final project: how Covid-19 changed the way kids access education. |
| `busca-resgatados` | A digital platform created amidst a catastrophe. |
| `woodworking` | Making peace with the side of me that likes working with tangible things. |
| `itp-mapping` | My interactions at ITP Camp, logged and turned into 3D prisms. |

## Home: "count me in for"
Replaces T1–T6. Status: **draft**. Each label links to the page in [sitemap.md §5](sitemap.md#5-inventory-coverage).

| Label | Line | Links to |
|---|---|---|
| product design | 8+ years designing products end to end. These days AI-first and prototyped in code. | `/work#work` |
| crafting | playing around with woodworking, glass cutting and circuits since I was a child | `/work/woodworking` |
| data viz | turning spreadsheets and collected data into visual things is one of my passions | `/work/itp-mapping` |
| sharing knowledge | talking about my passions and curiosities with other people keeps me moving | `/about#talks` |

Closing line: **and hoping this list grows bigger every day** (fixes "everyday", T6).

**Option:** add **prototyping** ("if it can be clicked, it can be tested. I build prototypes in code to find out faster") to make the brief's positioning shift visible on home. It overlaps with the product design line, so pick one.

## Home: short about
Status: **draft**.

> I'm Bibi, a product designer at momoGood. Before that I spent three and a half years on credit card experiences at Itaú, used by millions of customers. I work AI-first and prototype in code, so ideas get tested as real things, not just screens. Away from work I 3D print, wire up Arduinos and build furniture.

Link: **More about me**

## Contact CTA
Replaces C1–C4. Used on home, case studies and `/about` (PORT-408). Status: **draft**.

| Part | Copy |
|---|---|
| Title | get in touch |
| Line | Say hi, pitch me a weird project, or ask how the rat costume works. |
| Email button | oi@bibibran.co |
| Copy button | Copy email → after click: "Copied!" (announced to screen readers) |
| LinkedIn link | LinkedIn |

## Footer
Replaces F1. Status: **draft**.

- Credit: **v3 designed and built with the amazing Amanda Medeiros** (keeps the warmth of F1, drops "and I").
- © line: **© 2026 Bibi Branco** (year from the build).

## Work index `/work`
Status: **draft**.

| Part | Copy |
|---|---|
| h1 | Work |
| Intro | Product work from momoGood, Itaú and before, plus the things I make when I'm away from a screen. |
| Work group | **Work**: product design, from discovery to shipped. |
| Craft group | **Craft**: things I build with my hands. |
| Short-page label | full story on Medium / video on TikTok |

## About `/about`
Replaces A1–A10 and P1.5. Facts from inventory §7a. Status: **draft**.

**Long bio:**

> I'm Bibi Branco, a product designer with 8+ years of experience. I started in graphic design, at Universidade Federal de Pelotas and Agência Ursa, moved into product at Melhor Envio, and spent three and a half years at Itaú, Brazil's largest private bank, working on credit card experiences used by millions of customers.
>
> Since December 2025 I've been at momoGood, designing a workplace giving platform from the ground up and bringing AI into Tatango's messaging tools. I work AI-first: intelligence built into the workflow, not bolted on as a chat box. And I prototype in code, because a clickable thing answers questions a static screen can't.
>
> The other half of me makes things. Woodworking, glass cutting, 3D printing, Arduino, and one rat costume. At ITP Camp at NYU in 2023 I logged my own interactions and turned them into 3D prisms. I'm always adding to the toolbox.

**Experience:**

| Dates | Role · Company | Line |
|---|---|---|
| Dec 2025 – now | Product Designer · momoGood | Designing the momoGood giving platform from the ground up, bringing AI into Tatango's messaging workflows, and prototyping in code with momoProto. |
| Jun 2022 – Dec 2025 | Product Designer · Itaú Unibanco | Led the credit card annuity redesign and designed the upgrade/downgrade flow between card tiers. Built AI-powered Figma plugins that write SQL, so designers and product teams get data without waiting on data engineering. |
| 2020 – 2022 | Product Designer · Melhor Envio | [One line: what you worked on.] v3 said "junior/mid-level product designer". [Keep the level or drop it?] |
| 2018 – 2020 | Designer · Agência Ursa | [One line: what you worked on.] |

**Education:**

| Dates | What · Where |
|---|---|
| Jun 2023 | ITP Camp · NYU (summer program on interactive technology) |
| 2020 | Programming For All · Le Wagon |
| 2017 – 2022 | Bachelor's in Graphic Design · Universidade Federal de Pelotas (fixes "bachalor's", A6) |

**Talks & teaching** (`#talks`):

> I like explaining how I work almost as much as the work itself. Some places I've done that:
> - [Talk or workshop · where · year]
> - [Talk or workshop · where · year]
>
> I also write on Medium now and then.

**Other projects (one line):** I've also designed real-life applications and experimental workshops. Ask me about them.

## 404
Status: **draft** (already live as the PORT-409 placeholder).

| Part | Copy |
|---|---|
| Eyebrow | 404 |
| h1 | This page doesn't exist. |
| Line | The link might be old, or it never worked. Here are two that do. |
| Buttons | Go home · See my work |

## Meta titles and descriptions
Template "<page> · Bibi Branco" (PORT-401). Titles ≤ 60 characters, descriptions ≤ 155. Status: **draft**.

| Page | Title | Description |
|---|---|---|
| `/` | Bibi Branco · Product designer | Product designer at momoGood, previously Itaú. Design, data, code, prototypes and experiments, plus the things I build with my hands. |
| `/work` | Work · Bibi Branco | Case studies from momoGood, Itaú and earlier product work, plus craft projects in 3D printing, woodworking and data viz. |
| `/about` | About · Bibi Branco | Product designer with 8+ years of experience, now at momoGood. Experience, education, talks and how to get in touch. |
| `/work/$slug` | <Project title> · Bibi Branco | The project's line from "Project summaries". |
| 404 | Page not found · Bibi Branco | This page doesn't exist. Try the home page or the work index. |

## Case-study bodies
Status: **draft in MDX** (PORT-302, 2026-10-18). Each project's body is in `content/work/<slug>.mdx`, written from the inventory, this doc and v3, with the v3 typos fixed ("complete=", "responsbilities", "made piece"). Unknowns are `TODO` markers: `pnpm content:todo` lists them, and PORT-507 clears them before launch, including the NDA call for momoGood and Itaú.
