// Per-page <title> and description. Routes call `seo()` in `head()`; the deepest match wins.
// Copy from PORT-008; share tags, JSON-LD and the share card from PORT-501.

import { portrait } from 'content-collections'

import { contact, person, socials } from '@/content/profile'

const portraitSrc = portrait.src

export const siteName = person.name

/** Production origin. `www` is primary; the apex redirects to it (PORT-506). */
export const siteUrl = 'https://www.bibibran.co'

// Matches --blue in src/styles.css (browser UI colour on mobile).
export const themeColor = '#0055d4'

const defaultTitle = `${siteName} · Product designer`

const defaultDescription =
  'Product designer at momoGood, previously Itaú. Design, data, code, prototypes and experiments, plus the things I build with my hands.'

type SeoOptions = {
  /** Page name; rendered as "<title> · Bibi Branco". Omit for the home page. */
  title?: string
  /** Up to 155 characters. */
  description?: string
}

export function seo({ title, description = defaultDescription }: SeoOptions = {}) {
  return [
    { title: title ? `${title} · ${siteName}` : defaultTitle },
    { name: 'description', content: description },
  ]
}

type ShareImage = {
  /** Root-relative path, e.g. `/_img/aedit/og-1234abcd.jpg`. Made absolute here. */
  src: string
  alt: string
  width?: number
  height?: number
}

/** Interim card from scripts/brand-assets.ts (wordmark and star) until the PORT-007 template. */
const defaultShareImage: ShareImage = {
  src: '/og.jpg',
  alt: `${siteName}: the "bibi" wordmark and a yellow star on blue`,
}

type PageHeadOptions = SeoOptions & {
  /** Path from the site root, e.g. `/work/aedit`. Sets the canonical URL and og:url. */
  path: string
  /** `article` for case studies. */
  type?: 'website' | 'article'
  /** og:image and twitter:image. 1200×630; defaults to the site card. */
  image?: ShareImage
  /** JSON-LD objects for this page (e.g. `personJsonLd()` on home and about). */
  jsonLd?: object[]
}

/**
 * `head()` for a page with its own URL: title and description from `seo()`, canonical, Open
 * Graph and Twitter card tags, and optional JSON-LD (PORT-501).
 */
export function pageHead({
  path,
  type = 'website',
  image = defaultShareImage,
  jsonLd = [],
  ...options
}: PageHeadOptions) {
  const meta = seo(options)
  const url = `${siteUrl}${path}`
  const title = meta[0]?.title ?? defaultTitle
  const description = options.description ?? defaultDescription
  const imageUrl = `${siteUrl}${image.src}`
  return {
    meta: [
      ...meta,
      { property: 'og:type', content: type },
      { property: 'og:site_name', content: siteName },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: url },
      { property: 'og:image', content: imageUrl },
      { property: 'og:image:width', content: String(image.width ?? 1200) },
      { property: 'og:image:height', content: String(image.height ?? 630) },
      { property: 'og:image:alt', content: image.alt },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: imageUrl },
      { name: 'twitter:image:alt', content: image.alt },
    ],
    links: [{ rel: 'canonical', href: url }],
    scripts: jsonLd.map((data) => ({
      type: 'application/ld+json',
      children: JSON.stringify(data),
    })),
  }
}

/**
 * schema.org Person for name searches (PORT-005 SEO review): name, role, employer and the
 * profiles elsewhere that belong to the same person.
 */
export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteUrl}/#person`,
    name: person.name,
    url: siteUrl,
    image: `${siteUrl}${portraitSrc}`,
    jobTitle: person.role,
    worksFor: { '@type': 'Organization', name: person.company },
    address: { '@type': 'PostalAddress', addressLocality: person.location, addressCountry: 'BR' },
    email: `mailto:${contact.email}`,
    sameAs: socials.map((social) => social.href),
  }
}
