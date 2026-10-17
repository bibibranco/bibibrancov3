# Brief: goals, audience & success metrics (PORT-002)

Drafted 2026-10-17 from the PORT-002 interview and the [content inventory](content-inventory.md). Input for PORT-003 (IA), PORT-004 (visual direction), PORT-008 (copy) and PORT-502 (analytics).

## 1. Purpose
bibibran.co is the home of a product designer who works AI-first, prototypes in code and builds physical things. v3 said "UI/UX + crafting". v4 shows how Bibi works now: real product work at momoGood and Itaú, prototypes that run, and the maker projects that keep the curiosity going. The site is not a job application. It is a professional presence that people find, share and come back to.

## 2. Goals
| | Goal | This means we… |
|---|---|---|
| **Primary** | **Professional presence.** Show current work and thinking so opportunities come in passively. | …lead with recent work, keep it current, and make every page worth sharing (stable URLs, proper link previews). |
| Secondary | **The site is a showcase.** The build itself (TanStack Start, motion, accessibility) proves Bibi designs *and* builds. | …treat craft details (motion, type, performance, a11y) as content, and can mention how the site was made. |
| Secondary | **Share knowledge.** Talks, workshops and write-ups on AI-native design and making. | …leave room in the IA for write-ups and talks (decided in PORT-003), and link out to Medium for now. |
| Secondary | **Personal record.** An archive of what Bibi has made, for Bibi as much as anyone. | …keep older and craft projects on `/work` even if they aren't featured, and make adding a project one MDX file. |

## 3. Audiences

### Design/eng peer (primary)
- **Who:** product designers, design engineers and front-end devs, often found through LinkedIn, Medium or word of mouth.
- **Comes for:** how Bibi works. Prototyping in code, AI in design workflows, design systems.
- **Needs to see:** process and artefacts, not only final screens. Live prototypes, repos, tools (momoProto, the AI Figma/SQL plugin), decisions and trade-offs.
- **Top tasks:** read a case study · open a prototype or its code · get in touch to swap ideas.

### Maker (primary)
- **Who:** people into 3D printing, Arduino, woodworking and costume builds, often coming from TikTok or a talk.
- **Comes for:** the build behind a project (Rato Túlio, woodworking, ITP prisms).
- **Needs to see:** materials, steps, photos and what went wrong. Enough detail to try it themselves.
- **Top tasks:** read a craft project · see the build process · get in touch or follow along.

### Hiring manager / recruiter (secondary)
- **Who:** someone screening senior product design candidates, skimming fast.
- **Comes for:** proof of seniority and impact.
- **Needs to see:** role, team, scope and outcome for each work case study, visible in the first screen; current role and years of experience (8+) without hunting.
- **Top tasks:** scan featured work · read one case study summary · find LinkedIn or email.
- **Effect on design:** shapes the case-study format (a summary block with role, timeline, team and outcome) but does not drive the visual direction or IA.

## 4. Success metrics
No targets yet. Collect a baseline for the first 8 weeks after launch, then set targets.

| # | Metric | What it tells us | GA4 event | Params |
|---|---|---|---|---|
| M1 | Case study views per session | Are people going beyond the home page? | `case_study_view` (on route load of `/work/$slug`) | `slug`, `category`: `work` \| `craft` |
| M2 | Case study read rate (reads ÷ views) | Is the content worth reading? | `case_study_read` (once per view, at 75% scroll) | `slug`, `category` |
| M3 | Prototype/code clicks | Does the "prototypes in code" story land? | `prototype_click` | `slug`, `destination`: `live` \| `repo` |
| M4 | Contact clicks | Is the site bringing in conversations and opportunities? (primary goal) | `contact_click` | `method`: `email` \| `linkedin`, `location`: `hero` \| `footer` \| `case_study` \| `about` |
| M5 | Outbound clicks | Is the site feeding the wider presence? | `outbound_click` | `channel`: `linkedin` \| `medium`, `location` (same values as M4) |

- Only LinkedIn and Medium count as tracked outbound channels. Other links (TikTok, GitHub, the v3 credit) aren't tracked unless they are a `prototype_click`.
- A LinkedIn link used as a contact CTA sends `contact_click`; a LinkedIn link anywhere else sends `outbound_click`. Never send both for one click.
- **Qualitative check (no custom event):** returning users and the share of traffic from referrals/social in GA4's built-in reports. A rough read on "presence" and on whether the site stays fresh.
- Page views are tracked as before (one `page_view` per navigation, PORT-502).

## 5. Tone of voice
**Playful but sharper.** Keep the v3 warmth and humour, but be more concise and confident. Casing: lower-case is fine for playful UI moments (section labels, the hero, small asides). Use sentence case for case-study body copy, page titles and anything a recruiter skims.

| Principle | Do | Don't |
|---|---|---|
| **Friendly, not filler.** Say hi, then get to the point. | "Hi, I'm Bibi. I design products, prototype them in code and build things with my hands." | "Hey there! I'm Bibi Branco and I … create stuff" (HE1/HE2: vague, and doesn't say what I do now) |
| **Specific beats generic.** Name the thing, the number or the outcome. | "Redesigned how millions of Itaú customers choose and manage card fees." | "I have also designed experiences for real life applications, experimental workshops, …" (P1.5) |
| **Jokes that age well.** Keep humour about me and my hobbies, not dated references. | "Say hi, pitch me a weird project, or ask how the rat costume works." | "…ask for my PSN so I can beat you on EAFC 24" (C2: dated within a year) |
| **Senior, not stiff.** First person, plain words, own the decisions. | "I was the only designer on the redesign, so I owned research, flows and the UI." | "Being the sole designer leading a complete= application redesign, my responsbilities ranged from…" (P1.3: wordy, typos) |
| **Polished details.** Proofread, and write link text that makes sense on its own. | "Read the Busca Resgatados write-up on Medium", "every day" | "Check it out" (LP6), "everyday" (T6) |

## 6. Open questions
- **NDA:** which momoGood and Itaú work can be shown, and how much detail (screens, numbers)? This blocks case-study choice in PORT-003 and PORT-302.
- **Sharing knowledge:** its own section (talks/notes) at launch, or only links out to Medium? Decide in PORT-003. A blog is still in the parking lot.
- **Consent banner** for GA4: decide in PORT-502.
- **Product image generation tools** and **momoGood design system:** descriptions still owed (content inventory §7a).
