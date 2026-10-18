import { Dialog } from '@base-ui/react/dialog'
import { Link, useRouter } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

import { Logo } from '@/components/brand/logo'
import { Container } from '@/components/ui/layout'
import { buttonVariants } from '@/components/ui/button'
import { person } from '@/content/profile'
import { contactHref, navItems } from './nav'

// Links stay unstyled until hover; the current page gets a thick underline (and aria-current from Link).
const navLinkClass =
  'inline-flex min-h-tap items-center font-semibold text-foreground no-underline decoration-[3px] underline-offset-[6px] hover:underline data-[status=active]:underline'

function SkipLink() {
  return (
    <a
      href="#main"
      className={buttonVariants({
        className: 'sr-only z-(--z-menu) focus:not-sr-only focus:fixed focus:top-3 focus:left-3',
      })}
    >
      Skip to content
    </a>
  )
}

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

function MobileMenu() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  // Close when navigation happens by any route, including the back button.
  useEffect(() => router.subscribe('onResolved', () => setOpen(false)), [router])

  const close = () => setOpen(false)

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className={buttonVariants({ variant: 'secondary' })}>Menu</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Popup className="fixed inset-0 z-(--z-menu) flex flex-col overflow-y-auto bg-popover text-popover-foreground transition-opacity duration-(--duration-base) ease-in-out data-ending-style:opacity-0 data-starting-style:opacity-0">
          <Dialog.Title className="sr-only">Menu</Dialog.Title>
          <Container className="flex items-center justify-between py-4">
            <HomeLink onClick={close} />
            <Dialog.Close className={buttonVariants()}>Close</Dialog.Close>
          </Container>
          <Container className="flex grow flex-col gap-8 pt-8 pb-section">
            <nav aria-label="Main">
              <ul className="m-0 list-none p-0">
                {navItems.map((item) => (
                  <li key={item.to} className="border-b border-border">
                    <Link
                      to={item.to}
                      onClick={close}
                      className={`${navLinkClass} min-h-18 font-heading text-h1`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li className="border-b border-border">
                  <a
                    href={contactHref}
                    onClick={close}
                    className={`${navLinkClass} min-h-18 font-heading text-h1`}
                  >
                    Say hi
                  </a>
                </li>
              </ul>
            </nav>
          </Container>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function SiteHeader() {
  return (
    <header className="border-b border-border">
      <Container className="flex items-center justify-between py-3 md:py-5">
        <HomeLink />
        <nav aria-label="Main" className="hidden md:block">
          <ul className="m-0 flex list-none items-center gap-8 p-0">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className={navLinkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={contactHref} className={navLinkClass}>
                Say hi
              </a>
            </li>
          </ul>
        </nav>
        <div className="md:hidden">
          <MobileMenu />
        </div>
      </Container>
    </header>
  )
}

export { SiteHeader, SkipLink }
