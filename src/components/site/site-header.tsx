import { Link, useRouter } from '@tanstack/react-router'
import { lazy, Suspense, useEffect, useRef, useState } from 'react'

import { Container } from '@/components/ui/layout'
import { buttonVariants } from '@/components/ui/button'
import { HomeLink } from './home-link'
import { contactHref, navItems } from './nav'

const loadMenuDialog = () => import('./menu-dialog')
const MenuDialog = lazy(loadMenuDialog)

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

// The Menu button is plain HTML; the dialog behind it loads when the page goes idle or the button
// is touched or focused, so a tap rarely waits on the network (PORT-504).
function MobileMenu() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const trigger = useRef<HTMLButtonElement>(null)
  const router = useRouter()

  // Close when navigation happens by any route, including the back button.
  useEffect(() => router.subscribe('onResolved', () => setOpen(false)), [router])

  // Safari has no requestIdleCallback; a timeout after load does the same job there.
  useEffect(() => {
    const load = () => void loadMenuDialog()
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(load)
      return () => cancelIdleCallback(id)
    }
    const id = setTimeout(load, 2000)
    return () => clearTimeout(id)
  }, [])

  return (
    <>
      <button
        ref={trigger}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onPointerEnter={() => void loadMenuDialog()}
        onFocus={() => void loadMenuDialog()}
        onClick={() => {
          setMounted(true)
          setOpen(true)
        }}
        className={buttonVariants({ variant: 'chip', size: 'chip' })}
      >
        Menu
      </button>
      {/* Stays mounted after the first open, so closing can animate. */}
      {mounted && (
        <Suspense fallback={null}>
          <MenuDialog open={open} onOpenChange={setOpen} trigger={trigger} />
        </Suspense>
      )}
    </>
  )
}

function SiteHeader() {
  return (
    // Chip nav (PORT-205, typesafe.ai reference): each page and "Say hi" sit in small boxes; the
    // current page inverts to Deep. The logo stays bare and white: the block stands for "branco".
    <header className="relative">
      <Container className="flex items-center justify-between py-3 md:py-4">
        <HomeLink className="text-white" />
        <nav aria-label="Main" className="hidden md:block">
          <ul className="m-0 flex list-none items-center gap-1.5 p-0">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className={buttonVariants({ variant: 'chip', size: 'chip' })}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="ml-3">
              <a
                href={contactHref}
                className={buttonVariants({ variant: 'chip-solid', size: 'chip' })}
              >
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
