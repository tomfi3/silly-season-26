import type { Flight } from './types'

/**
 * Flights for each traveller. Outbound = first flight to Portugal,
 * Return = last flight home.
 *
 * Use ISO with timezone offset so the popup shows the correct local time.
 * UK and Portugal both observe UTC+1 in June (BST / WEST).
 */
export const flights: Flight[] = [
  {
    id: 'fl-p1-out-easyjet',
    travellerId: 'p1',
    direction: 'outbound',
    from: { code: 'LGW', name: 'London Gatwick' },
    to: { code: 'LIS', name: 'Lisbon' },
    departure: '2026-06-10T20:00:00+01:00',
    arrival: '2026-06-10T22:50:00+01:00',
    status: 'idea',
    airline: 'easyJet',
    cost: { amount: 121, currency: 'GBP' },
  },
  {
    id: 'fl-p1-ret-wizz',
    travellerId: 'p1',
    direction: 'return',
    from: { code: 'FAO', name: 'Faro' },
    to: { code: 'LGW', name: 'London Gatwick' },
    departure: '2026-06-16T19:20:00+01:00',
    arrival: '2026-06-16T22:10:00+01:00',
    status: 'idea',
    airline: 'Wizz Air UK',
    cost: { amount: 50, currency: 'GBP' },
  },
]
