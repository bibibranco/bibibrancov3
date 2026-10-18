// Primary nav from PORT-003 (tickets/artifacts/sitemap.md §2). "Say hi" jumps to the page's
// #contact block: the ContactCta where the page has one, otherwise the footer.
export const navItems = [
  { to: '/work', label: 'Work' },
  { to: '/about', label: 'About' },
] as const

export const contactHref = '#contact'
