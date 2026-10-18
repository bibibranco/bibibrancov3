import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

type StarProps = ComponentProps<'svg'> & {
  /** Rotate continuously, as the hero star does (PORT-007). Static with reduced motion. */
  spinning?: boolean
}

/** The brand star, also used in the favicon and focus ring colour. Decorative. */
function Star({ spinning = false, className, ...props }: StarProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={cn(spinning && 'motion-safe:animate-star', className)}
      {...props}
    >
      <path d="M16 7.25263L21.5565 0L21.2218 9.18292L30.0699 7.25263L24 14.0697L32 18.3691L23.0349 19.6263L26.4435 28.1427L18.7782 23.2559L16 32L13.2218 23.2559L5.55646 28.1427L8.96507 19.6263L0 18.3691L8 14.0697L1.93014 7.25263L10.7782 9.18292L10.4435 0L16 7.25263Z" />
    </svg>
  )
}

export { Star }
