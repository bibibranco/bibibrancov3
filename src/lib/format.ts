import type { YearMonth } from '@/content/profile'

const monthFormat = new Intl.DateTimeFormat('en-US', { month: 'short', timeZone: 'UTC' })

/** "Dec 2025", or "2020" when only the year is known. */
function formatYearMonth({ year, month }: YearMonth): string {
  if (!month) return String(year)
  return `${monthFormat.format(new Date(Date.UTC(year, month - 1)))} ${year}`
}

/** "Jun 2022 – Dec 2025", "Dec 2025 – now", or just "Jun 2023" without a start. */
function formatPeriod(start: YearMonth | undefined, end: YearMonth | 'present'): string {
  const to = end === 'present' ? 'now' : formatYearMonth(end)
  return start ? `${formatYearMonth(start)} – ${to}` : to
}

export { formatYearMonth, formatPeriod }
