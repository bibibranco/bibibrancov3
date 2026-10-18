import { EventEmitter } from 'node:events'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

import { createBuilder } from '@content-collections/core'

// Builds content/ and exits 1 on any error, so `pnpm build` and `pnpm typecheck` fail on bad
// content. Replaces `content-collections build`: the CLI subscribes to errors only after
// createBuilder() returns, but files are read and parsed inside it, so a YAML syntax error
// (an unquoted ": " in a value, say) dropped the file silently. Our emitter listens from the start.

type Emitter = NonNullable<Parameters<typeof createBuilder>[2]>

const events = new EventEmitter()
const errors: string[] = []

function describe(key: string, event: Record<string, unknown>) {
  const error = event.error instanceof Error ? event.error.message : String(event.error)
  const file =
    (event.filePath as string | undefined) ??
    ((event.file as { path?: string } | undefined)?.path &&
      path.join(
        (event.collection as { directory: string }).directory,
        (event.file as { path: string }).path,
      ))
  return `${key}${file ? ` in ${file}` : ''}:\n${error}`
}

const emitter = {
  on: (key: string, listener: (event: unknown) => void) => events.on(key, listener),
  emit: (key: string, event: Record<string, unknown>) => {
    if ('error' in event) errors.push(describe(key, event))
    events.emit(key, event)
  },
} as unknown as Emitter

const builder = await createBuilder(path.resolve('content-collections.ts'), undefined, emitter)
await builder.build()

// Links from src/content/profile.ts into case studies must point at a project that ships in this
// build (drafts are gone in production). A render-time check isn't enough: the error boundary
// catches it and the page still prerenders.
const load = (file: string) => import(pathToFileURL(path.resolve(file)).href)
const { allProjects } = await load('.content-collections/generated/index.js')
const { interests } = await load('src/content/profile.ts')
const slugs = new Set(allProjects.map((project: { slug: string }) => project.slug))
for (const interest of interests) {
  const slug = interest.link?.to === '/work/$slug' ? interest.link.params.slug : undefined
  if (slug && !slugs.has(slug)) {
    errors.push(
      `profile.ts: interest "${interest.label}" links to /work/${slug}, which isn't a project`,
    )
  }
}

if (errors.length > 0) {
  console.error(`\nContent build failed:\n\n${errors.join('\n\n')}\n`)
  process.exit(1)
}
console.log('Content built.')
