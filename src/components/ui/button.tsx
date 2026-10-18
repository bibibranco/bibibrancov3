import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

// PORT-006 Button: pill, min 44px, one primary per view. Focus comes from the global ring.
const buttonClasses = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-pill border-[1.5px] border-transparent font-sans text-small font-semibold whitespace-nowrap no-underline transition-[background-color,color,filter,translate] duration-(--duration-fast) ease-out select-none motion-safe:active:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:brightness-105',
        secondary:
          'border-input bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground',
        ghost: 'text-foreground hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'min-h-tap px-5',
        icon: 'size-tap',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
)

type ButtonVariantProps = VariantProps<typeof buttonClasses> & { className?: string }

/**
 * Button classes, merged. Use on links styled as buttons. Raw cva output kept both
 * `border-transparent` and the variant's border colour, and the transparent one won.
 */
function buttonVariants({ className, ...variants }: ButtonVariantProps = {}) {
  return cn(buttonClasses(variants), className)
}

function Button({
  className,
  variant,
  size,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonClasses>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      // base-ui also accepts className as a function of the button's state.
      className={(state) =>
        buttonVariants({
          variant,
          size,
          className: typeof className === 'function' ? className(state) : className,
        })
      }
      {...props}
    />
  )
}

export { Button, buttonVariants }
