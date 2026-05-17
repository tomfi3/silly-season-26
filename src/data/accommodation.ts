import type { Accommodation } from './types'

/**
 * Accommodation options. `bookingStatus` distinguishes considering vs booked —
 * the marker uses a hollow ring for "considering"/"shortlisted" and a filled
 * dot for "booked".
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
    bookingStatus: 'considering',
  },
]
