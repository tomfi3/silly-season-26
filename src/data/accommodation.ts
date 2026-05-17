import type { Accommodation } from './types'

/**
 * Accommodation options. Use `status: 'idea' | 'decided' | 'booked'` to mark
 * commitment. The marker renders hollow for 'idea', solid for 'decided', and
 * solid + check for 'booked'. See LocationStatus in src/data/types.ts.
 */
export const accommodation: Accommodation[] = [
  {
    id: 'acc-lisbon-placeholder',
    name: 'Lisbon apartment (placeholder)',
    category: 'accommodation',
    tripId: 'lisbon',
    coords: [38.7156, -9.1407],
    description: 'Placeholder pin near Príncipe Real. Replace with the real option once we agree.',
    pricePerNight: { amount: 140, currency: 'EUR' },
    guests: 3,
    status: 'idea',
  },
]
