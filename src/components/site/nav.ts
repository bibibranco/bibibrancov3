// Primary nav from PORT-003 (tickets/artifacts/sitemap.md §2). "Say hi" jumps to the page's
// #contact block: the footer for now, the ContactCta once PORT-408 lands.
export const navItems = [
  { to: '/work', label: 'Work' },
  { to: '/about', label: 'About' },
] as const

export const contactHref = '#contact'
