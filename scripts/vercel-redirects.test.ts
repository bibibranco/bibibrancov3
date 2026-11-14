import fs from 'node:fs'

import { describe, expect, it } from 'vitest'

// Legacy URLs (PORT-409, sitemap §4). The host applies these, so `vite preview` can't test them;
// this checks the config instead: permanent 301s, in the right order, to pages that exist.
const config = JSON.parse(fs.readFileSync('vercel.json', 'utf8')) as {
  redirects: { source: string; destination: string; statusCode: number }[]
}

describe('vercel.json redirects', () => {
  it('maps the v3 project pages', () => {
    expect(config.redirects.map((r) => [r.source, r.destination])).toEqual([
      ['/project/1', '/work#work'],
      // Woodworking is WIP (no page yet), so its old URL goes to the Craft group.
      ['/project/2', '/work#craft'],
      ['/project/3', '/work/itp-mapping'],
      ['/project/:id', '/work'],
    ])
  })

  it('uses 301, not the 308 that `permanent: true` sends', () => {
    expect(config.redirects.every((r) => r.statusCode === 301)).toBe(true)
  })

  it('points at published case studies', () => {
    for (const { destination } of config.redirects) {
      const slug = destination.match(/^\/work\/([a-z0-9-]+)$/)?.[1]
      if (!slug) continue
      const file = `content/work/${slug}.mdx`
      expect(fs.existsSync(file), destination).toBe(true)
      // A WIP project has no page, so a redirect must not land on one.
      expect(/^wip:\s*true\b/m.test(fs.readFileSync(file, 'utf8')), destination).toBe(false)
    }
  })
})
