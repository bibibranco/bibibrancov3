import { allProjects, type Project } from 'content-collections'

// Drafts never reach here in production: content-collections.ts skips them at build time.

type Category = Project['category']
type Fragment = Project['fragments'][number]

/** A featured fragment with the project it links to (home desk, PORT-403). */
type DeskFragment = Fragment & { project: Pick<Project, 'slug' | 'title'> }

const byOrder = (a: { order: number }, b: { order: number }) => a.order - b.order

/** Every project, Work before Craft, each group sorted by `order` (sitemap §1). */
function getAllProjects(category?: Category): Project[] {
  const groups: Category[] = category ? [category] : ['work', 'craft']
  return groups.flatMap((group) =>
    allProjects.filter((project) => project.category === group).sort(byOrder),
  )
}

function getFeaturedProjects(): Project[] {
  return allProjects.filter((project) => project.featured).sort(byOrder)
}

function getProjectBySlug(slug: string): Project | undefined {
  return allProjects.find((project) => project.slug === slug)
}

/** Prev and next in the same group, by `order`. No wrap-around at the ends. */
function getAdjacentProjects(slug: string): { prev?: Project; next?: Project } {
  const project = getProjectBySlug(slug)
  if (!project) return {}
  const group = getAllProjects(project.category)
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
          project: { slug: project.slug, title: project.title },
        })),
    )
    .sort((a, b) => (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER))
}

export {
  getAllProjects,
  getFeaturedProjects,
  getProjectBySlug,
  getAdjacentProjects,
  getFeaturedFragments,
}
export type { Project, Fragment, DeskFragment, Category }
