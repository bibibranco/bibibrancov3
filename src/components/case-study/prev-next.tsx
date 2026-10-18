import { Link } from '@tanstack/react-router'

import type { Project } from '@/lib/content'

// Keep reading within the same group (Work or Craft). No wrap-around: the first project has no
// "previous" and the last has no "next".

const groupName = { work: 'Work', craft: 'Craft' } as const

type PrevNextProps = { prev?: Project; next?: Project; category: Project['category'] }

function PrevNext({ prev, next, category }: PrevNextProps) {
  if (!prev && !next) return null
  return (
    <nav aria-label="More projects" className="grid grid-cols-2 gap-6 border-t border-border pt-8">
      {prev && (
        <Link
          to="/work/$slug"
          params={{ slug: prev.slug }}
          className="group col-start-1 flex flex-col gap-1 text-inherit no-underline"
        >
          <span className="font-mono text-label text-muted-foreground uppercase">
            ← Previous in {groupName[category]}
          </span>
          <span className="font-heading text-h3 text-balance group-hover:underline">
            {prev.title}
          </span>
        </Link>
      )}
      {next && (
        <Link
          to="/work/$slug"
          params={{ slug: next.slug }}
          className="group col-start-2 flex flex-col items-end gap-1 text-right text-inherit no-underline"
        >
          <span className="font-mono text-label text-muted-foreground uppercase">
            Next in {groupName[category]} →
          </span>
          <span className="font-heading text-h3 text-balance group-hover:underline">
            {next.title}
          </span>
        </Link>
      )}
    </nav>
  )
}

export { PrevNext }
