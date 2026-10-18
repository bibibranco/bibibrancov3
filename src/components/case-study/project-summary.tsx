import type { Project } from '@/lib/content'

// Facts at a glance, above the cover so a recruiter sees them on the first screen (PORT-005).
// Team and outcome are optional in the schema; missing ones are left out, not shown empty.

function ProjectSummary({ project }: { project: Project }) {
  const facts = [
    { label: 'Role', value: project.role },
    { label: 'Timeline', value: project.timeline },
    { label: 'Team', value: project.team },
    { label: 'Outcome', value: project.outcome },
  ].filter((fact): fact is { label: string; value: string } => Boolean(fact.value))

  return (
    <dl
      data-slot="project-summary"
      className="m-0 grid grid-cols-2 gap-x-4 gap-y-4 border-y border-border py-5 md:grid-cols-4 md:gap-x-6"
    >
      {facts.map((fact) => (
        <div key={fact.label} className="flex flex-col gap-1">
          <dt className="font-mono text-label text-muted-foreground uppercase">{fact.label}</dt>
          <dd className="m-0 text-small">{fact.value}</dd>
        </div>
      ))}
    </dl>
  )
}

export { ProjectSummary }
