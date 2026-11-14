import fs from 'node:fs/promises'
import path from 'node:path'
import { gzipSync } from 'node:zlib'

// JS budget (PORT-504): the scripts a prerendered page loads up front (its module entry and
// modulepreloads), gzipped, against a limit per page. Run after `pnpm build`. Code a page loads
// later (the mobile menu, the hero play, case study bodies on other pages) doesn't count.

const kb = 1024
const budgets: Record<string, number> = {
  'index.html': 150 * kb,
}

const client = path.resolve('dist/client')
let failed = false

for (const [page, limit] of Object.entries(budgets)) {
  const html = await fs.readFile(path.join(client, page), 'utf8')
  const scripts = new Set(
    [
      ...html.matchAll(
        /<(?:link rel="modulepreload" href|script type="module"[^>]*src)="([^"]+\.js)"/g,
      ),
    ].map((match) => match[1]!),
  )
  let total = 0
  for (const src of scripts) {
    total += gzipSync(await fs.readFile(path.join(client, src))).length
  }
  const ok = total <= limit
  failed ||= !ok
  console.log(
    `${ok ? 'ok  ' : 'OVER'} ${page}: ${(total / kb).toFixed(1)} KB gzipped JS in ${scripts.size} files (budget ${limit / kb} KB)`,
  )
}

if (failed) process.exit(1)
