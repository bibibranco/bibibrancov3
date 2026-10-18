import fs from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

// public/sitemap.xml for the production domain (PORT-501), written after the content build so it
// lists exactly the case studies that ship (drafts excluded). TanStack Start's own sitemap uses
// its crawl list, which includes hash URLs (/work#work), both /work and /work/, and the 404.

const siteUrl = 'https://www.bibibran.co'

// Every public page that isn't a case study. Keep in step with src/routes (no 404, no /_ routes).
const staticPaths = ['/', '/work', '/about']

const generated = path.resolve('.content-collections/generated/index.js')
const { allProjects } = await import(pathToFileURL(generated).href)
const paths = [
  ...staticPaths,
  ...allProjects.map((project: { slug: string }) => `/work/${project.slug}`),
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${siteUrl}${p === '/' ? '/' : p}</loc></url>`).join('\n')}
</urlset>
`
await fs.writeFile(path.resolve('public/sitemap.xml'), xml)
console.log(`Sitemap: ${paths.length} URLs.`)
