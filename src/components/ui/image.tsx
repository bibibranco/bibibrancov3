import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

const ratios = {
  '16/10': 'aspect-[16/10]',
  '2/1': 'aspect-[2/1]',
  '4/3': 'aspect-[4/3]',
  '1/1': 'aspect-square',
} as const

type ImageProps = Omit<ComponentProps<'img'>, 'alt' | 'loading'> & {
  /** Required. Use `alt=""` only for purely decorative images. */
  alt: string
  /** Reserves space before load, so there's no layout shift. */
  ratio?: keyof typeof ratios
  /** Above the fold (e.g. the LCP image): load eagerly with high priority. */
  priority?: boolean
}

function Image({ alt, ratio, priority = false, className, ...props }: ImageProps) {
  return (
    <img
      data-slot="image"
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : undefined}
      className={cn(
        'block h-auto max-w-full object-cover',
        ratio && ['w-full', ratios[ratio]],
        className,
      )}
      {...props}
    />
  )
}

/** A content image after the build pipeline (PORT-304): AVIF + WebP variants and its real size. */
type ResponsiveImage = {
  src: string
  srcset: { avif: string; webp: string }
  width: number
  height: number
  color: string
}

type PictureProps = Omit<ImageProps, 'src' | 'srcSet' | 'width' | 'height'> & {
  image: ResponsiveImage
  /** Rendered width per breakpoint, so the browser picks the right variant. */
  sizes?: string
}

/**
 * `<picture>` with AVIF and WebP sources. Width and height come from the file, so the box is
 * reserved before load; the dominant colour fills it meanwhile.
 */
function Picture({ image, sizes = '100vw', className, style, ...props }: PictureProps) {
  return (
    <picture data-slot="picture" className="contents">
      <source type="image/avif" srcSet={image.srcset.avif} sizes={sizes} />
      <source type="image/webp" srcSet={image.srcset.webp} sizes={sizes} />
      <Image
        src={image.src}
        width={image.width}
        height={image.height}
        style={{ backgroundColor: image.color, ...style }}
        className={className}
        {...props}
      />
    </picture>
  )
}

export { Image, Picture }
export type { ImageProps, PictureProps, ResponsiveImage }
