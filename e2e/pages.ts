import fs from 'node:fs'
import path from 'node:path'

// Routes come from the build, not a hand-kept list: the sitemap lists every public page,
// including each case study that ships, so a new MDX project is covered automatically.
export function publicPaths(): string[] {
  const sitemap = fs.readFileSync(path.resolve('dist/client/sitemap.xml'), 'utf8')
  return [...sitemap.matchAll(/<loc>https:\/\/www\.bibibran\.co([^<]*)<\/loc>/g)].map(
    (match) => match[1] || '/',
  )
}

/** Projects with `draft: true`; they must not exist in the production build. */
export function draftSlugs(): string[] {
  const dir = path.resolve('content/work')
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.mdx'))
    .filter((file) => /^draft:\s*true\s*$/m.test(fs.readFileSync(path.join(dir, file), 'utf8')))
    .map((file) => file.replace(/\.mdx$/, ''))
}

/** Featured fragments across published projects: one desk object each on home (PORT-403). */
export function featuredFragmentCount(): number {
  const dir = path.resolve('content/work')
  const drafts = new Set(draftSlugs())
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.mdx') && !drafts.has(file.replace(/\.mdx$/, '')))
    .map((file) => fs.readFileSync(path.join(dir, file), 'utf8'))
    .reduce((sum, source) => sum + (source.match(/^ {4}featured: true\s*$/gm)?.length ?? 0), 0)
}
