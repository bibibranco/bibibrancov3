import { createContext, use } from 'react'

import type { ResponsiveImage } from '@/components/ui/image'

/** The current project's images, keyed by `./file.jpg` as written in its MDX (PORT-304). */
const ProjectImagesContext = createContext<Record<string, ResponsiveImage>>({})

/** Throws on a missing file, so a typo fails the prerender instead of shipping a broken image. */
function useProjectImage(src: string): ResponsiveImage {
  const image = use(ProjectImagesContext)[src]
  if (!image) throw new Error(`MDX image ${src} not found next to the project's MDX file`)
  return image
}

export { ProjectImagesContext, useProjectImage }
