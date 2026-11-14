import { Link } from '@tanstack/react-router'

import { Logo } from '@/components/brand/logo'
import { person } from '@/content/profile'

function HomeLink({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      to="/"
      aria-label={`${person.name}, home`}
      className="inline-flex min-h-tap items-center text-foreground"
      onClick={onClick}
    >
      <Logo className="h-6 w-auto md:h-7" />
    </Link>
  )
}

export { HomeLink }
