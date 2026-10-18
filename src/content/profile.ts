// Bibi's CV and contact details in one place (PORT-303). Copy comes from
// tickets/artifacts/copy.md (PORT-008); [brackets] there are facts still owed, and those fields
// are left out here rather than guessed. Pages render from this file, never their own copies.

/** A month in history. `month` is 1–12; leave it out when only the year is known. */
type YearMonth = { year: number; month?: number }

type Experience = {
  role: string
  org: string
  start: YearMonth
  end: YearMonth | 'present'
  /** One line on the work (copy.md "Experience"). */
  summary?: string
}

type Education = {
  what: string
  where: string
  /** Omitted for one-off programmes that only have an end date. */
  start?: YearMonth
  end: YearMonth
  note?: string
}

/**
 * Where an interest links. Pages with hashes are typed against the routes that exist; project
 * slugs follow sitemap §3 and become typed `/work/$slug` links when PORT-406 adds the route.
 */
type InterestLink =
  { to: '/work'; hash: 'work' | 'craft' } | { to: '/about'; hash: 'talks' } | { project: string }

type Interest = { label: string; line: string; link: InterestLink }

type Social = {
  /** Matches the analytics `channel` / `method` names (src/lib/analytics.ts). */
  id: 'linkedin' | 'medium'
  label: string
  href: string
}

const person = {
  name: 'Bibi Branco',
  role: 'Product designer',
  company: 'momoGood',
  location: 'São Paulo',
} as const

const contact = {
  email: 'oi@bibibran.co',
} as const

const socials = [
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/bibibranco/' },
  { id: 'medium', label: 'Medium', href: 'https://medium.com/@bibianabranco' },
] as const satisfies readonly Social[]

/** Newest first. */
const experience: Experience[] = [
  {
    role: 'Product Designer',
    org: 'momoGood',
    start: { year: 2025, month: 12 },
    end: 'present',
    summary:
      'Designing the momoGood giving platform from the ground up, bringing AI into Tatango’s messaging workflows, and prototyping in code with momoProto.',
  },
  {
    role: 'Product Designer',
    org: 'Itaú Unibanco',
    start: { year: 2022, month: 6 },
    end: { year: 2025, month: 12 },
    summary:
      'Led the credit card annuity redesign and designed the upgrade/downgrade flow between card tiers. Built AI-powered Figma plugins that write SQL, so designers and product teams get data without waiting on data engineering.',
  },
  // TODO: summary (copy.md), and whether to keep v3's "junior/mid-level" in the title.
  { role: 'Product Designer', org: 'Melhor Envio', start: { year: 2020 }, end: { year: 2022 } },
  // TODO: summary (copy.md).
  { role: 'Designer', org: 'Agência Ursa', start: { year: 2018 }, end: { year: 2020 } },
]

/** Newest first. */
const education: Education[] = [
  {
    what: 'ITP Camp',
    where: 'NYU',
    end: { year: 2023, month: 6 },
    note: 'Summer program on interactive technology',
  },
  { what: 'Programming For All', where: 'Le Wagon', end: { year: 2020 } },
  {
    what: 'Bachelor’s in Graphic Design',
    where: 'Universidade Federal de Pelotas',
    start: { year: 2017 },
    end: { year: 2022 },
  },
]

/** Whole years since the first role started, for "8+ years" lines. Updates on each build. */
const yearsOfExperience =
  new Date().getFullYear() - Math.min(...experience.map((entry) => entry.start.year))

type Talk = { title: string; where: string; year: number; href?: string }

// TODO: talks and workshops for /about#talks (copy.md "Talks & teaching"). /about leaves the
// list out while it's empty.
const talks: Talk[] = []

/** /about long bio, one string per paragraph (copy.md "About"). */
const bio = [
  `I'm Bibi Branco, a product designer with ${yearsOfExperience}+ years of experience. I started in graphic design, at Universidade Federal de Pelotas and Agência Ursa, moved into product at Melhor Envio, and spent three and a half years at Itaú, Brazil's largest private bank, working on credit card experiences used by millions of customers.`,
  "Since December 2025 I've been at momoGood, designing a workplace giving platform from the ground up and bringing AI into Tatango's messaging tools. I work AI-first: intelligence built into the workflow, not bolted on as a chat box. And I prototype in code, because a clickable thing answers questions a static screen can't.",
  "The other half of me makes things. Woodworking, glass cutting, 3D printing, Arduino, and one rat costume. At ITP Camp at NYU in 2023 I logged my own interactions and turned them into 3D prisms. I'm always adding to the toolbox.",
]

/** Home "count me in for", in order. */
const interests: Interest[] = [
  {
    label: 'product design',
    line: `${yearsOfExperience}+ years designing products end to end. These days AI-first and prototyped in code.`,
    link: { to: '/work', hash: 'work' },
  },
  {
    label: 'crafting',
    line: 'playing around with woodworking, glass cutting and circuits since I was a child',
    link: { project: 'woodworking' },
  },
  {
    label: 'data viz',
    line: 'turning spreadsheets and collected data into visual things is one of my passions',
    link: { project: 'itp-mapping' },
  },
  {
    label: 'sharing knowledge',
    line: 'talking about my passions and curiosities with other people keeps me moving',
    link: { to: '/about', hash: 'talks' },
  },
]

/** Footer credit for v3. */
const credit = { name: 'Amanda Medeiros', href: 'https://asmdrs.vercel.app/' } as const

export {
  person,
  contact,
  socials,
  experience,
  education,
  interests,
  talks,
  bio,
  credit,
  yearsOfExperience,
}
export type { YearMonth, Experience, Education, Interest, InterestLink, Social, Talk }
