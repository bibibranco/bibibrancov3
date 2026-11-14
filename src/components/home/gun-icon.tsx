import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

// The hero's toy gun (PORT-205): a chunky line drawing in star yellow that replaced the star. It
// points left, at the copy, and the guns fly out of its muzzle. A tiny star on the grip keeps the
// old motif. Decorative: the button around it carries the name.

// The muzzle tip is at (4, 22) in the 120×80 viewBox; hero.tsx aims from there (MUZZLE).

function GunIcon({ className, ...props }: ComponentProps<'svg'>) {
  return (
    <svg
      viewBox="0 0 120 80"
      fill="none"
      stroke="currentColor"
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={cn('overflow-visible', className)}
      {...props}
    >
      {/* barrel and body */}
      <path d="M4 14 H76 a12 12 0 0 1 12 12 v6 a12 12 0 0 1 -12 12 H4 Z" />
      {/* muzzle ring */}
      <path d="M12 14 v30" />
      {/* rear sight and hammer */}
      <path d="M70 14 v-6 h10 l4 6" />
      {/* grip */}
      <path d="M62 44 l10 30 h18 l-6 -30" />
      {/* trigger guard and trigger */}
      <path d="M44 44 v8 a10 10 0 0 0 10 10 h10" />
      <path d="M54 44 q2 7 -3 10" />
      {/* a little star on the grip, for old times' sake */}
      <path
        fill="currentColor"
        stroke="none"
        d="M80 55 l1.8 3.6 4 .6 -2.9 2.8 .7 4 -3.6 -1.9 -3.6 1.9 .7 -4 -2.9 -2.8 4 -.6 Z"
      />
      {/* speed lines behind the body */}
      <path d="M96 24 h14 M100 32 h16 M96 40 h10" strokeWidth={3} opacity={0.6} />
    </svg>
  )
}

export { GunIcon }
