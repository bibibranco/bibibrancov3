import { createFileRoute } from '@tanstack/react-router'

import { buttonVariants } from '@/components/ui/button'
import { Container, Section, SectionHeading } from '@/components/ui/layout'
import { ProjectCard } from '@/components/work/project-card'
import { getAllProjects, type Category } from '@/lib/content'
import { pageHead } from '@/lib/seo'

// Every project in two groups, Work then Craft, each sorted by `order` (PORT-003, PORT-405).
// No filters: the jump links only scroll to #work and #craft, which other pages link to
// (legacy /project/1 redirects to /work#work; case studies link back to their group).
export const Route = createFileRoute('/work/')({
  head: () =>
    pageHead({
      title: 'Work',
      description:
        'Case studies from momoGood, Itaú and earlier product work, plus craft projects in 3D printing, woodworking and data viz.',
      path: '/work',
    }),
  component: WorkIndex,
})

// copy.md "Work index"
const groups: { id: Category; title: string; line: string }[] = [
  { id: 'work', title: 'Work', line: 'Product design, from discovery to shipped.' },
  { id: 'craft', title: 'Craft', line: 'Things I build with my hands.' },
]

function WorkIndex() {
  const sections = groups.map((group) => ({ ...group, projects: getAllProjects(group.id) }))

  return (
    <>
      <Container className="flex flex-col gap-6 pt-10 md:flex-row md:items-end md:justify-between md:pt-16">
        <div className="flex flex-col gap-4">
          <h1 className="m-0 font-heading text-h1">Work</h1>
          <p className="m-0 max-w-measure text-lead">
            Product work from momoGood, Itaú and before, plus the things I make when I'm away from a
            screen.
          </p>
        </div>
        <nav aria-label="Groups" className="shrink-0">
          <ul className="m-0 flex list-none gap-3 p-0">
            {sections.map((section) => (
              <li key={section.id} className="flex-1 md:flex-none">
                <a
                  href={`#${section.id}`}
                  className={buttonVariants({ variant: 'secondary', className: 'w-full' })}
                >
                  {section.title} · {section.projects.length}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Container>

      {sections.map((section) => (
        <Section
          key={section.id}
          id={section.id}
          aria-labelledby={`${section.id}-heading`}
          className="scroll-mt-4"
        >
          <Container className="flex flex-col gap-6">
            <div className="flex flex-col gap-1 border-b border-border pb-3">
              <SectionHeading id={`${section.id}-heading`}>{section.title}</SectionHeading>
              <p className="m-0 text-muted-foreground">{section.line}</p>
            </div>
            <ul className="m-0 grid list-none gap-0 p-0 md:grid-cols-2 md:gap-x-7 md:gap-y-10 lg:grid-cols-3">
              {section.projects.map((project) => (
                <li key={project.slug} className="border-b border-border py-4 md:border-0 md:py-0">
                  <ProjectCard project={project} />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ))}
    </>
  )
}
