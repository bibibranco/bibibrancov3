import { EventEmitter } from 'node:events'
import path from 'node:path'

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

if (errors.length > 0) {
  console.error(`\nContent build failed:\n\n${errors.join('\n\n')}\n`)
  process.exit(1)
}
console.log('Content built.')
