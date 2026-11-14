import { Link } from '@tanstack/react-router'

import { Logo } from '@/components/brand/logo'
import { person } from '@/content/profile'
import { cn } from '@/lib/utils'

function HomeLink({ onClick, className }: { onClick?: () => void; className?: string }) {
  return (
    <Link
      to="/"
      aria-label={`${person.name}, home`}
      className={cn('inline-flex min-h-tap items-center text-foreground', className)}
      onClick={onClick}
    >
      <Logo className="h-6 w-auto md:h-7" />
    </Link>
  )
}

export { HomeLink }
