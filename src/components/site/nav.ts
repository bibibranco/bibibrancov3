// Primary nav from PORT-003 (tickets/artifacts/sitemap.md §2). "Say hi" jumps to the page's
// #contact block: the ContactCta where the page has one, otherwise the footer.
export const navItems = [
  { to: '/work', label: 'Work' },
  { to: '/about', label: 'About' },
] as const

export const contactHref = '#contact'

// Links stay unstyled until hover; the current page gets a thick underline (and aria-current from Link).
export const navLinkClass =
  'inline-flex min-h-tap items-center font-semibold text-foreground no-underline decoration-[3px] underline-offset-[6px] hover:underline data-[status=active]:underline'
