import { describe, expect, it } from 'vitest'

import { cn } from './utils'

// Regression (PORT-405): stock tailwind-merge read custom sizes as colours and dropped them.
describe('cn', () => {
  it('keeps a theme font size next to a text colour', () => {
    expect(cn('text-small', 'text-muted-foreground')).toBe('text-small text-muted-foreground')
    expect(cn('text-label', 'text-foreground')).toBe('text-label text-foreground')
  })

  it('lets a later theme size win over an earlier one', () => {
    expect(cn('text-h3', 'text-small')).toBe('text-small')
  })

  it('merges theme spacing, radius and widths', () => {
    expect(cn('py-4', 'py-section')).toBe('py-section')
    expect(cn('rounded-md', 'rounded-pill')).toBe('rounded-pill')
    expect(cn('max-w-xl', 'max-w-measure')).toBe('max-w-measure')
  })
})
