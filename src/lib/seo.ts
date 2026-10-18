// Per-page <title> and description. Routes call `seo()` in `head()`; the deepest match wins.
// Final copy comes from PORT-008; OG tags and the sitemap from PORT-501.

import { person } from '@/content/profile'

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

type PageHeadOptions = SeoOptions & {
  /** Path from the site root, e.g. `/work/aedit`. Sets the canonical URL and og:url. */
  path: string
  /** `article` for case studies. */
  type?: 'website' | 'article'
}

/**
 * `head()` for a page with its own URL: title and description from `seo()`, plus canonical and
 * Open Graph basics. The OG image comes in PORT-501.
 */
export function pageHead({ path, type = 'website', ...options }: PageHeadOptions) {
  const meta = seo(options)
  const url = `${siteUrl}${path}`
  const title = meta[0]?.title ?? defaultTitle
  return {
    meta: [
      ...meta,
      { property: 'og:type', content: type },
      { property: 'og:site_name', content: siteName },
      { property: 'og:title', content: title },
      { property: 'og:description', content: options.description ?? defaultDescription },
      { property: 'og:url', content: url },
    ],
    links: [{ rel: 'canonical', href: url }],
  }
}
