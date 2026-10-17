# Wireframes (PORT-005)

Low-fi, greyscale, mobile-first wireframes at 375 px and 1440 px. Drafted 2026-10-17 from the [sitemap](sitemap.md). Colour, type and imagery come later, in PORT-006 and PORT-007. Blue mono labels are annotations.

**Canvas:** https://claude.ai/artifact/H3VKFT1fZvBeRwbSU9AVd3 (private; share it from the page's Share menu before asking someone to review it).

| Page | 375 | 1440 |
|---|---|---|
| Home `/` | ✅ | ✅ |
| Work index `/work` | ✅ | ✅ |
| Case study `/work/$slug` (template) | ✅ | ✅ |
| About `/about` | ✅ | ✅ |
| 404 | ✅ | ✅ |
| Nav | menu open | default · current page · skip link + focus |

## Layout decisions
- **Grid:** desktop uses 12 columns with a 24 px gutter and 120 px side margins. Mobile is one column with 20 px gutters.
- **Home order:** hero → "bits and pieces on my desk" (featured fragments, A + C) → "count me in for" → short about → contact CTA → footer.
- **Hero (SEO):** the h1 starts with a small mono line, "Bibi Branco, product designer", followed by the headline. The meta line is `at momoGood · previously Itaú · são paulo`.
- **`/work`:** "Work · 6" and "Craft · 3" jump links at the top, then one section per group. Desktop shows 3-column cards; mobile uses compact rows (thumbnail + text), so 9 projects fit without endless scrolling. There are no filters (PORT-003), so the "filter state" scope item is replaced by the group anchors `#work` and `#craft`.
- **Case study:** the summary block (role, timeline, team, outcome) sits right under the title, above the cover, so the basic facts are on the first screen. Body text runs in columns 3–10 (about 65 characters per line). Figures can break out to full-bleed.
- **Nav:** header with logo + Work · About · Say hi. Below 768 px it collapses to a Menu button that opens a full-screen sheet with focus trapped and Esc to close. A skip link appears on the first Tab. The header is static for now; whether it becomes sticky is a PORT-007 call.
- **ContactCta:** one component used on home, case study and about, with `location` passed to `contact_click`. The email address is shown as text, with a copy button.

## Case-study content blocks (input for PORT-301)
These are the MDX components the case-study template needs. Frontmatter-driven parts are rendered by the route, not written in MDX.

| Block | Source | Purpose | Notes |
|---|---|---|---|
| `Summary` | frontmatter: `role`, `timeline`, `team`, `outcome` | Facts at a glance | Rendered as a `<dl>`. 2 × 2 on mobile, 4 across on desktop |
| Cover | frontmatter: `cover { src, alt }` | First image | Full-bleed. 16:10 on mobile, 2:1 crop on desktop |
| Headings + text | Markdown (`##`, paragraphs, lists, links) | Narrative | Text column width |
| `<Figure>` | MDX: `src`, `alt`, `caption?`, `size: "column" \| "full"` | Single image | `full` breaks out to full-bleed |
| `<ImagePair>` | MDX: two images, `caption?` | Before/after, comparisons | Stacks below 360 px |
| `<Quote>` | MDX: children, `cite?` | User quote or key insight | |
| `<Stats>` | MDX: 2–4 `{ value, label }` | Outcomes | Real, NDA-cleared numbers only |
| `<Specs>` | MDX: rows `{ label, value }` | Craft projects: materials, tools, time | Borrowed from direction C. A `<table>` with row headers |
| `ProjectLinks` | frontmatter: `links { live?, repo?, external? }` | Live prototype, code, Medium/TikTok | Sends `prototype_click` / `outbound_click` (brief §4) |
| Prev / next | Derived: same `category`, by `order` | Keep reading | |

**Short page variant** (`busca-resgatados`, `rato-tulio`): the same template with a summary, cover, 2–3 paragraphs and one prominent `ProjectLinks.external`.

**Schema additions for PORT-301:** `timeline`, `team`, `outcome` and `links { live?, repo?, external? }`. `externalUrl` folds into `links.external`.

## SEO evaluation (2026-10-17)
Checked against the goal of being findable and shareable (README goal 3). Most visitors will search for "Bibi Branco" or click a shared link. A few will arrive from long-tail searches that land on case studies.

| Area | Wireframes today | Verdict | Fix (ticket) |
|---|---|---|---|
| Home `<h1>` | "Whatever works. And sometimes whatever doesn't." No name, no role | ⚠️ Weak signal for name searches | Keep the line as the visual h1, but put the name in the h1 too: `<h1><span>Bibi Branco, product designer.</span> Whatever works…</h1>`. The first span can be small (an eyebrow) or visually hidden. Google weights `<title>` more, so `<title>` = "Bibi Branco · Product designer" (PORT-401/501) |
| Name entity | Only the logo's `aria-label` | ⚠️ | JSON-LD `Person` on `/` and `/about`: `name`, `jobTitle`, `worksFor` (momoGood), `sameAs` (LinkedIn, Medium, GitHub). This does more for name searches than any layout change (PORT-501) |
| Meta + previews | Not in the wireframes | — | A unique title and description per page, and an OG image per case study (PORT-008/501) |
| Case studies | Real text in an h1, a summary `<dl>`, long-form body | ✅ The best SEO pages on the site | Each one targets its own phrase ("credit card fee redesign", "prototype hub design system"). Use `alt` text, captions and readable slugs (already defined) |
| Short pages (Busca Resgatados, Rato Túlio) | Summary + link out | ✅/⚠️ | Thin content is fine. Use `rel="noopener"` on external links, and don't add `rel="canonical"` to Medium, since our page is a summary, not a copy |
| Featured work | Cards with real titles + summaries as links | ✅ | Whichever messy option is chosen has to keep its project names as real link text in the HTML (not canvas, not images). All three explorations do |
| Internal links | Home → case studies, prev/next, `/work` groups | ✅ | Prev/next gives every case study at least two internal links |
| Headings | One h1 per page, h2 per section | ✅ | v3 used several h1s on `/about` (A9); the wireframes fix that |
| Performance | Hero text is LCP; covers below the fold | ✅ | Lazy-load featured images. Text-first options (B, C) are lighter than A (PORT-504) |

### Should experience appear first?
**No.** Experience-first doesn't help SEO: search engines read the whole page, and `Person` structured data plus `/about` cover "who is she" searches. It also works against the brief now that recruiters aren't a target. Lead with the work and the personality. Give credibility in one line, by adding "previously Itaú" to the hero meta line: `product designer at momoGood · previously Itaú · são paulo`. Real company names in the first screen carry both keywords and trust, without turning the home page into a CV.

## Featured work explorations (messy)
Bibi doesn't have strong images for every project, so these three options for the home "featured work" section (canvas section "Featured work explorations") don't depend on covers:

| | Option | Idea | Images needed | Mobile | Risk |
|---|---|---|---|---|---|
| **A** | **The desk** | Projects as objects scattered on a desk: a terminal (momoProto), an index card (Itaú), a polaroid (Rato Túlio, so the low-res photo works), a sticky note, a clipping (Medium). Overlapping, tilted, hand-placed | Some. Small polaroid sizes hide low resolution | Stack with alternating tilt | Each object type needs designing. Positions are hand-set per breakpoint |
| **B** | **Type pile** | Every project name set in mixed sizes, weights and slight rotations, wrapped like a poster. Hovering shows a floating preview, but only when an image exists | None | Same pile, smaller, no preview | Leans on type craft (PORT-007). Hover previews aren't available on touch |
| **C** | **Fragments** | A masonry of evidence pulled from each project: a code line, a quote, a stat, a spec table, a crop, a sketch. Each fragment links to its project | Crops only | 2 narrow columns | Needs a `fragment` field in MDX (PORT-301), and stats need NDA-cleared numbers |

### Direction: A + C, "bits and pieces on my desk" (Bibi, 2026-10-17)
Canvas section "Featured · A + C". **Each fragment of a project (C) is drawn as a desk object (A)**, and the fragment type decides the object:

| Fragment type | Object | Example |
|---|---|---|
| `code` | Terminal window | momoProto: `$ pnpm ds:check` |
| `quote` | Sticky note (handwritten face) | momoGood platform |
| `stat` | Receipt (outcome lines + total) | Itaú card fees, with NDA-cleared numbers only |
| `spec` | Shop tag | Woodworking: wood, tools, time |
| `image` | Taped polaroid, or a printed screenshot for UI | Rato Túlio, ITP prisms, AEDIT |
| `writing` | Newspaper clipping, or an index card | Busca Resgatados (Medium), the momoProto summary |
| `sketch` | Notebook page | Thomé |

- **Desktop:** a hand-placed scatter with slight overlap, tilts within ±6° and a star sticker. Positions are set per breakpoint, not random, so it looks the same on every load and doesn't shift the layout.
- **Mobile:** 2-column masonry with alternating ±3° tilt and no overlap, so tap targets stay clear.
- **Content:** a project can contribute several fragments (Rato Túlio: a polaroid and specs). A project with no fragment just doesn't appear here; it's still on `/work`. Low-res images work, because they're shown at polaroid size.
- **Replaces** the 2 × 2 featured cards. Both Home artboards were redrawn with it on 2026-10-17. "See all work" becomes "Everything, tidy →".
- **Schema (PORT-301):** add `fragments[]` to the project frontmatter: `{ type: code | quote | stat | spec | image | writing | sketch, …type fields, featured?: boolean, order?: number }`. The home page collects every featured fragment, sorted by `order`.

All the explorations keep a plain `<ul>` of real links in reading order, use transform-only tilt, raise the focused item above the rest, and are static under reduced motion. Options can be mixed: for example, A's objects in B's pile, or C's fragments with A's tilt.

## Review feedback
_Criterion 3 is still open: get at least one outside person (a peer or friend) to review the wireframes and log their feedback here._

| Date | Who (role) | Feedback | Action |
|---|---|---|---|
| | | | |
