import { MDXContent } from '@content-collections/mdx/react'
import { cn } from 'cn'
import type { ComponentProps } from 'react'

import { Figure, ImagePair, MarginNote, Quote, Specs, Stats } from '@/components/mdx/blocks'
import type { ResponsiveImage } from '@/components/ui/image'
import { ExternalLink, TextLink, textLinkClass } from '@/components/ui/text-link'
import { ProjectImagesContext } from '@/lib/project-images'

// Markdown elements, so plain MDX text gets the reading-column styles.
const components = {
  h2: ({ className, ...props }: ComponentProps<'h2'>) => (
    <h2 className={cn('m-0 font-heading text-h2 text-balance', className)} {...props} />
  ),
  h3: ({ className, ...props }: ComponentProps<'h3'>) => (
    <h3 className={cn('m-0 font-heading text-h3 text-balance', className)} {...props} />
  ),
  p: ({ className, ...props }: ComponentProps<'p'>) => (
    <p className={cn('m-0 max-w-measure', className)} {...props} />
  ),
  // Preflight strips list styles; body lists need their markers back.
  ul: ({ className, ...props }: ComponentProps<'ul'>) => (
    <ul
      className={cn('m-0 flex max-w-measure list-disc flex-col gap-1 pl-6', className)}
      {...props}
    />
  ),
  ol: ({ className, ...props }: ComponentProps<'ol'>) => (
    <ol
      className={cn('m-0 flex max-w-measure list-decimal flex-col gap-1 pl-6', className)}
      {...props}
    />
  ),
  // External links open in a new tab and say so; internal ones go through the router.
  a: ({ href = '', className, ...props }: ComponentProps<'a'>) =>
    /^https?:\/\//.test(href) ? (
      <ExternalLink href={href} className={className} {...props} />
    ) : href.startsWith('/') ? (
      <TextLink to={href} className={className} {...props} />
    ) : (
      <a href={href} className={cn(textLinkClass, className)} {...props} />
    ),
  Figure,
  ImagePair,
  Quote,
  Stats,
  Specs,
  MarginNote,
}

type MdxContentProps = {
  code: string
  /** The project's `images`, so blocks can resolve `./file.jpg`. */
  images: Record<string, ResponsiveImage>
  /** Replaces the default single-column stack, e.g. with the case-study grid. */
  className?: string
}

/** A project's compiled MDX body with the case-study blocks. */
function MdxContent({ code, images, className }: MdxContentProps) {
  return (
    <div data-slot="mdx" className={cn('[counter-reset:fig]', className ?? 'flex flex-col gap-6')}>
      <ProjectImagesContext value={images}>
        <MDXContent code={code} components={components} />
      </ProjectImagesContext>
    </div>
  )
}

export { MdxContent }
