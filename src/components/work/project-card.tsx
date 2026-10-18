import { Card, CardDescription, CardMedia, CardMeta, CardTitle } from '@/components/ui/card'
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

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card
      to="/work/$slug"
      params={{ slug: project.slug }}
      className="grid grid-cols-[6rem_minmax(0,1fr)] items-start gap-x-4 gap-y-1 md:flex md:gap-2"
    >
      <CardMedia className="row-span-3">
        <Picture
          image={project.cover}
          alt=""
          sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 96px"
          className="aspect-[4/3] w-full object-cover md:aspect-[16/10]"
        />
      </CardMedia>
      <CardTitle className="text-small md:order-2 md:text-h3">{project.title}</CardTitle>
      <CardDescription className="text-muted-foreground md:order-3 md:text-foreground">
        {project.summary}
      </CardDescription>
      <CardMeta className="md:order-1">{meta(project)}</CardMeta>
    </Card>
  )
}

export { ProjectCard }
