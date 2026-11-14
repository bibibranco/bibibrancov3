import { allProjectBodies } from 'content-collections'

// Case study bodies (compiled MDX and their images), apart from src/lib/content.ts so that only
// the case study page's chunk carries them (PORT-504). Import this from route components only.

function getProjectBody(slug: string) {
  return allProjectBodies.find((body) => body.slug === slug)
}

export { getProjectBody }
