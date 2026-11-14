import type { ReactNode } from 'react'

import { ExternalLink } from '@/components/ui/text-link'
import type { Project } from '@/lib/content'

// Facts at a glance, above the cover so a recruiter sees them on the first screen (PORT-005).
// Team and outcome are optional in the schema; missing ones are left out, not shown empty. Press
// coverage (PORT-205) is listed under the outcome, each outlet linking to its article.

function Press({ press }: { press: Project['press'] }) {
  return (
    <span className="mt-1 block text-muted-foreground">
      Covered by{' '}
      {press.map((item, index) => (
        <span key={item.href}>
          {index > 0 && (index === press.length - 1 ? ' and ' : ', ')}
          <ExternalLink href={item.href}>{item.name}</ExternalLink>
        </span>
      ))}
    </span>
  )
}

function ProjectSummary({ project }: { project: Project }) {
  const outcome: ReactNode =
    project.outcome || project.press.length > 0 ? (
      <>
        {project.outcome}
        {project.press.length > 0 && <Press press={project.press} />}
      </>
    ) : undefined

  const facts: { label: string; value: ReactNode }[] = [
    { label: 'Role', value: project.role },
    ...(project.timeline ? [{ label: 'Timeline', value: project.timeline }] : []),
    ...(project.team ? [{ label: 'Team', value: project.team }] : []),
    ...(outcome ? [{ label: 'Outcome', value: outcome }] : []),
  ]

  return (
    <dl
      data-slot="project-summary"
      className="m-0 grid grid-cols-2 gap-x-4 gap-y-6 py-5 md:grid-cols-4 md:gap-x-6"
    >
      {/* Ruled columns (PORT-205): mono label over a left rule, after typesafe.ai. */}
      {facts.map((fact) => (
        <div key={fact.label} className="flex flex-col gap-3 border-l border-border pl-3">
          <dt className="font-mono text-label tracking-[0.04em] text-muted-foreground">
            {fact.label}
          </dt>
          <dd className="m-0 text-small">{fact.value}</dd>
        </div>
      ))}
    </dl>
  )
}

export { ProjectSummary }
