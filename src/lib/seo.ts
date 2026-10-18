// Per-page <title> and description. Routes call `seo()` in `head()`; the deepest match wins.
// Final copy comes from PORT-008; OG tags and the sitemap from PORT-501.

export const siteName = 'Bibi Branco'

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
