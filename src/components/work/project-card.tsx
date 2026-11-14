import { Card, CardDescription, CardMedia, CardMeta, CardTitle } from '@/components/ui/card'
import { Tag } from '@/components/ui/tag'
import { Picture } from '@/components/ui/image'
import type { Project } from '@/lib/content'

// One project on /work (PORT-405), and later on home if PORT-403 needs cards. A compact row on
// mobile (thumbnail beside the text, so nine projects stay scannable) and a stacked card from md.
// The whole card is one link to the case study; outbound links live on the case study itself.

/** Year, plus where the full story lives for short pages (copy.md "Short-page label"). */
function meta(project: Project) {
  const external = project.links.external && new URL(project.links.external).hostname
  if (external?.endsWith('medium.com')) return `${project.year} · full story on Medium`
  if (external?.endsWith('tiktok.com')) return `${project.year} · video on TikTok`
  return String(project.year)
}

const cardLayout =
  'grid grid-cols-[6rem_minmax(0,1fr)] items-start gap-x-4 gap-y-1 md:flex md:flex-col md:gap-2'

function ProjectCard({ project }: { project: Project }) {
  const media = (
    <CardMedia className="row-span-3">
      <Picture
        image={project.cover}
        alt=""
        sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 96px"
        className="aspect-[4/3] w-full object-cover md:aspect-[16/10]"
      />
    </CardMedia>
  )

  // WIP (PORT-205): listed so the work is visible, but not a link until the case study exists. A
  // dotted panel stands in for the cover, since three WIP covers are still placeholders.
  if (project.wip) {
    return (
      <div data-slot="card" data-wip className={cardLayout}>
        <div
          aria-hidden="true"
          className="row-span-3 flex aspect-[4/3] w-full items-center justify-center border border-dashed border-border bg-dots md:aspect-[16/10]"
        >
          <span className="bg-background px-2 font-mono text-label tracking-[0.06em] text-muted-foreground uppercase">
            work in progress
          </span>
        </div>
        <CardTitle className="text-small md:order-2 md:text-h3">{project.title}</CardTitle>
        <CardDescription className="text-muted-foreground md:order-3">
          {project.summary}
        </CardDescription>
        <CardMeta className="flex items-center gap-2 md:order-1">
          <Tag variant="paper">WIP</Tag>
          {project.year} · case study in progress
        </CardMeta>
      </div>
    )
  }

  return (
    <Card to="/work/$slug" params={{ slug: project.slug }} className={cardLayout}>
      {media}
      <CardTitle className="text-small md:order-2 md:text-h3">{project.title}</CardTitle>
      <CardDescription className="text-muted-foreground md:order-3 md:text-foreground">
        {project.summary}
      </CardDescription>
      <CardMeta className="md:order-1">{meta(project)}</CardMeta>
    </Card>
  )
}

export { ProjectCard }
