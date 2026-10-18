import { createFileRoute, notFound } from '@tanstack/react-router'
import { useRef } from 'react'

import { PrevNext } from '@/components/case-study/prev-next'
import { ProjectLinks } from '@/components/case-study/project-links'
import { ProjectSummary } from '@/components/case-study/project-summary'
import { ContactCta } from '@/components/site/contact-cta'
import { MdxContent } from '@/components/mdx/mdx-content'
import { Picture } from '@/components/ui/image'
import { Container } from '@/components/ui/layout'
import { Tag } from '@/components/ui/tag'
import { TextLink } from '@/components/ui/text-link'
import { getAdjacentProjects, getProjectBySlug } from '@/lib/content'
import { pageHead } from '@/lib/seo'
import { useCaseStudyAnalytics } from '@/lib/use-case-study-analytics'

// One project (PORT-406). The loader only checks the slug: the project data is already in the
// bundle (content-collections), so returning it would serialise the MDX into every page again.
// Unknown slugs throw notFound(); on the host they get 404.html with a 404 status (PORT-409).
export const Route = createFileRoute('/work/$slug')({
  staticData: { contactCta: true },
  loader: ({ params }) => {
    if (!getProjectBySlug(params.slug)) throw notFound()
  },
  head: ({ params }) => {
    const project = getProjectBySlug(params.slug)
    if (!project) return {}
    return pageHead({
      title: project.title,
      description: project.summary,
      path: `/work/${project.slug}`,
      type: 'article',
      image: { src: project.og, alt: project.cover.alt },
    })
  },
  component: CaseStudy,
})

// Body layout inside the reading card. On desktop the text runs at `measure` with a margin column
// for <MarginNote>s; a note lands beside the block before it. Full figures, image pairs and
// quotes span both columns.
const bodyLayout = [
  'grid gap-y-6 lg:grid-cols-[minmax(0,var(--measure))_var(--margin-width)] lg:justify-center lg:gap-x-10',
  'lg:[&>:not([data-slot=margin-note])]:col-start-1',
  'lg:[&>[data-slot=margin-note]]:col-start-2 lg:[&>[data-slot=margin-note]]:self-start',
  'lg:[&>[data-size=full]]:col-span-2 lg:[&>[data-slot=image-pair]]:col-span-2',
  'lg:[&>[data-slot=quote]]:col-span-2',
  // Section breaks: more air above each h2 than between paragraphs.
  '[&>h2:not(:first-child)]:mt-8',
].join(' ')

function CaseStudy() {
  const { slug } = Route.useParams()
  // The loader guarantees the slug exists.
  const project = getProjectBySlug(slug)!
  const { prev, next } = getAdjacentProjects(slug)
  const readMarker = useRef<HTMLDivElement>(null)
  useCaseStudyAnalytics(project.slug, project.category, readMarker)

  return (
    <>
      <article className="flex flex-col gap-section pb-section">
        <Container className="flex flex-col gap-6 pt-10 md:pt-16">
          <TextLink to="/work" hash={project.category} className="self-start font-mono text-meta">
            ← {project.category === 'work' ? 'Work' : 'Craft'}
          </TextLink>
          {/* Capped at 8vw so a long single word ("Woodworking") fits a 375px screen in the wide display
            face; that only bites below ~560px. Breaking inside a word is the last resort. */}
          <h1 className="m-0 max-w-[18ch] font-heading text-h1 text-[min(var(--fluid-h1),8vw)] text-balance break-words">
            {project.title}
          </h1>
          <p className="m-0 max-w-measure text-lead">{project.summary}</p>
          <ProjectSummary project={project} />
          {project.tags.length > 0 && (
            <ul aria-label="Tags" className="m-0 flex list-none flex-wrap gap-2 p-0">
              {project.tags.map((tag) => (
                <li key={tag}>
                  <Tag variant="outline">{tag}</Tag>
                </li>
              ))}
            </ul>
          )}
          <ProjectLinks project={project} />
        </Container>

        <Container>
          <Picture
            image={project.cover}
            alt={project.cover.alt}
            priority
            sizes="(min-width: 1440px) 1200px, calc(100vw - 2 * var(--fluid-gutter))"
            className="aspect-[16/10] w-full object-cover md:aspect-[2/1]"
          />
        </Container>

        <Container>
          <div className="relative bg-card bg-notebook-card px-5 py-10 text-card-foreground md:px-10 md:py-16 lg:px-16">
            <MdxContent code={project.mdx} images={project.images} className={bodyLayout} />
            {/* case_study_read fires when this reaches the viewport: 75% of the way down the body. */}
            <div
              ref={readMarker}
              aria-hidden
              className="pointer-events-none absolute top-3/4 h-px w-px"
            />
          </div>
        </Container>

        <Container>
          <PrevNext prev={prev} next={next} category={project.category} />
        </Container>
      </article>
      <ContactCta location="case_study" />
    </>
  )
}
