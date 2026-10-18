import { describe, expect, it } from 'vitest'

import { formatPeriod, formatYearMonth, isoYearMonth } from './format'

describe('formatYearMonth', () => {
  it('shows the short month and year', () => {
    expect(formatYearMonth({ year: 2025, month: 12 })).toBe('Dec 2025')
    expect(formatYearMonth({ year: 2022, month: 6 })).toBe('Jun 2022')
  })

  it('shows only the year when there is no month', () => {
    expect(formatYearMonth({ year: 2020 })).toBe('2020')
  })
})

describe('formatPeriod', () => {
  it('joins start and end', () => {
    expect(formatPeriod({ year: 2022, month: 6 }, { year: 2025, month: 12 })).toBe(
      'Jun 2022 – Dec 2025',
    )
  })

  it('says "now" for an ongoing role', () => {
    expect(formatPeriod({ year: 2025, month: 12 }, 'present')).toBe('Dec 2025 – now')
  })

  it('shows only the end without a start', () => {
    expect(formatPeriod(undefined, { year: 2023, month: 6 })).toBe('Jun 2023')
  })
})

describe('isoYearMonth', () => {
  it('pads the month for <time dateTime>', () => {
    expect(isoYearMonth({ year: 2022, month: 6 })).toBe('2022-06')
    expect(isoYearMonth({ year: 2020 })).toBe('2020')
  })
})
