import type { Activity } from './types'

export const activities: Activity[] = [
  {
    id: 'act-timeout-market',
    name: 'Time Out Market',
    category: 'activity',
    tripId: 'lisbon',
    coords: [38.7068, -9.1463],
    description: 'Food hall with stalls from many of Lisbon\'s top chefs. Great first-night option.',
    durationHours: 2,
    bookingRequired: false,
    links: [{ label: 'Time Out Market', url: 'https://www.timeoutmarket.com/lisboa/en/' }],
  },
]
