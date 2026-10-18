import { describe, expect, it } from 'vitest'

import { deskHeightFor, slotStyle, slots } from './desk-layout'

describe('desk layout', () => {
  it('places the first fragment in the first canvas slot', () => {
    expect(slotStyle(0)).toMatchObject({ '--x': '0%', '--y': '20px', '--w': '30%', '--r': '-2deg' })
  })

  it('repeats the slots one desk lower past ten fragments', () => {
    const first = slotStyle(1)
    const eleventh = slotStyle(slots.length + 1)
    expect(eleventh['--x']).toBe(first['--x'])
    expect(eleventh['--y']).toBe(`${50 + 900}px`)
    expect(deskHeightFor(slots.length)).toBe('900px')
    expect(deskHeightFor(slots.length + 1)).toBe('1800px')
  })

  it('keeps every slot inside the 1200px desk', () => {
    for (const slot of slots) expect(slot.x + slot.w).toBeLessThanOrEqual(1200)
  })
})
