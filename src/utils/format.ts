import type { Money } from '../data/types'

const moneyFormatters: Record<string, Intl.NumberFormat> = {}

export function formatMoney(money: Money | undefined, locale = 'en-GB'): string {
  if (!money) return ''
  const key = `${locale}-${money.currency}`
  moneyFormatters[key] ??= new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: money.currency,
    maximumFractionDigits: 0,
  })
  return moneyFormatters[key].format(money.amount)
}

const longDate = new Intl.DateTimeFormat('en-GB', {
  weekday: 'short',
  day: 'numeric',
  month: 'short',
})
const timeOnly = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
})

/** ISO date → "Wed 12 Aug". */
export function formatDate(iso: string | undefined): string {
  if (!iso) return ''
  return longDate.format(new Date(iso))
}

/** ISO datetime → "Wed 12 Aug · 18:40". */
export function formatDateTime(iso: string | undefined): string {
  if (!iso) return ''
  const d = new Date(iso)
  return `${longDate.format(d)} · ${timeOnly.format(d)}`
}
