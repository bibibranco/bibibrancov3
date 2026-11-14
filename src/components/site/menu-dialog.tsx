import { Dialog } from '@base-ui/react/dialog'
import { Link } from '@tanstack/react-router'
import type { RefObject } from 'react'

import { Container } from '@/components/ui/layout'
import { buttonVariants } from '@/components/ui/button'
import { HomeLink } from './home-link'
import { contactHref, navItems, navLinkClass } from './nav'

// The mobile menu itself. Loaded on demand by SiteHeader's Menu button, so Base UI's dialog stays
// out of the first load (PORT-504). With no Dialog.Trigger, focus goes back to `trigger` on close.
function MenuDialog({
  open,
  onOpenChange,
  trigger,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  trigger: RefObject<HTMLButtonElement | null>
}) {
  const close = () => onOpenChange(false)

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Popup
          finalFocus={trigger}
          className="fixed inset-0 z-(--z-menu) flex flex-col overflow-y-auto bg-popover text-popover-foreground transition-[opacity,translate] duration-(--duration-base) ease-in-out data-ending-style:opacity-0 data-starting-style:opacity-0 motion-safe:data-ending-style:-translate-y-3 motion-safe:data-starting-style:-translate-y-3"
        >
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

export default MenuDialog
