import { cn } from 'cn'
import type { ComponentProps } from 'react'

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

export { Image }
export type { ImageProps }
