import type { Flight } from './types'

/**
 * Flights for each traveller. Inbound = first flight to Portugal,
 * Return = last flight home.
 *
 * Dates are placeholders — replace with real bookings as they're confirmed.
 * Use ISO with timezone offset so the popup shows the correct local time.
 */
export const flights: Flight[] = [
  // {
  //   id: 'fl-p1-out',
  //   travellerId: 'p1',
  //   direction: 'outbound',
  //   from: { code: 'LGW', name: 'London Gatwick' },
  //   to:   { code: 'LIS', name: 'Lisbon' },
  //   departure: '2026-08-12T07:25:00+01:00',
  //   arrival:   '2026-08-12T10:00:00+01:00',
  //   airline: 'easyJet',
  //   flightNumber: 'U28403',
  //   cost: { amount: 89, currency: 'GBP' },
  // },
]
