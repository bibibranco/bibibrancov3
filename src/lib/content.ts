import { allProjects, type Project } from 'content-collections'

// Drafts never reach here in production: content-collections.ts skips them at build time.

type Category = Project['category']
type Fragment = Project['fragments'][number]

/** A featured fragment with the project it links to (home desk, PORT-403). */
type DeskFragment = Fragment & { project: Pick<Project, 'slug' | 'title' | 'wip'> }

const byOrder = (a: { order: number }, b: { order: number }) => a.order - b.order

/** Every project, Work before Craft, each group sorted by `order` (sitemap §1). */
function getAllProjects(category?: Category): Project[] {
  const groups: Category[] = category ? [category] : ['work', 'craft']
  return groups.flatMap((group) =>
    allProjects.filter((project) => project.category === group).sort(byOrder),
  )
}

/** Featured projects in /work order: Work first, then Craft (sitemap §3). */
function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((project) => project.featured)
}

function getProjectBySlug(slug: string): Project | undefined {
  return allProjects.find((project) => project.slug === slug)
}

/** A published case study: WIP projects are listed but have no page (content-collections.ts). */
function getPublishedProject(slug: string): Project | undefined {
  const project = getProjectBySlug(slug)
  return project && !project.wip ? project : undefined
}

/** Prev and next in the same group, by `order`. No wrap-around at the ends. */
function getAdjacentProjects(slug: string): { prev?: Project; next?: Project } {
  const project = getProjectBySlug(slug)
  if (!project) return {}
  const group = getAllProjects(project.category).filter((item) => !item.wip)
  const index = group.indexOf(project)
  return { prev: group[index - 1], next: group[index + 1] }
}

/**
 * Featured fragments from every project, sorted by fragment `order`. Fragments without one
 * go last, in project order.
 */
function getFeaturedFragments(): DeskFragment[] {
  return getAllProjects()
    .flatMap((project) =>
      project.fragments
        .filter((fragment) => fragment.featured)
        .map((fragment) => ({
          ...fragment,
          project: { slug: project.slug, title: project.title, wip: project.wip },
        })),
    )
    .sort((a, b) => (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER))
}

export {
  getAllProjects,
  getFeaturedProjects,
  getProjectBySlug,
  getPublishedProject,
  getAdjacentProjects,
  getFeaturedFragments,
}
export type { Project, Fragment, DeskFragment, Category }
