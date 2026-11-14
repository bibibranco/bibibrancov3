import { describe, expect, it } from 'vitest'

import { deskHeightFor, slotStyle, slots } from './desk-layout'

describe('desk layout', () => {
  it('places the first fragment in the first slot', () => {
    expect(slotStyle(0, slots.length)).toMatchObject({ '--y': '5%', '--r': '3deg' })
  })

  it('repeats the slots one desk lower once they run out', () => {
    const first = slotStyle(1, slots.length + 1)
    const eleventh = slotStyle(slots.length + 1, slots.length + 1)
    expect(eleventh['--x']).toBe(first['--x'])
    expect(first['--y']).toBe('1%')
    expect(eleventh['--y']).toBe('51%')
  })

  it('sizes one desk to the viewport, and stacks desks when the slots run out', () => {
    expect(deskHeightFor(slots.length)).toBe('clamp(480px, 100svh - 15rem, 760px)')
    expect(deskHeightFor(slots.length + 1)).toBe('calc(2 * clamp(480px, 100svh - 15rem, 760px))')
  })

  it('keeps every slot inside the 900px object area', () => {
    for (const slot of slots) expect(slot.x + slot.w).toBeLessThanOrEqual(900)
  })
})
