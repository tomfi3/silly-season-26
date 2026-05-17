import type { Accommodation } from './types'

/**
 * Accommodation options. Use `status: 'idea' | 'decided' | 'booked'` to mark
 * commitment. The marker renders hollow for 'idea', solid for 'decided', and
 * solid + check for 'booked'. See LocationStatus in src/data/types.ts.
 */
export const accommodation: Accommodation[] = [
  {
    id: 'acc-beach-surf-flat-aljezur',
    name: 'Beach&Surf Flat',
    category: 'accommodation',
    tripId: 'west-coast',
    coords: [37.29745, -8.85623],
    description:
      'Two-bedroom apartment in Vale da Telha near Aljezur, walking distance to Arrifana / Monte Clérigo. 86 m², four beds, free parking. Booking.com review 7.9.',
    pricePerNight: { amount: 90, currency: 'GBP' },
    checkIn: '2026-06-11',
    checkOut: '2026-06-13',
    guests: 3,
    status: 'idea',
    amenities: ['wifi', 'parking', 'balcony'],
    links: [
      {
        label: 'Booking.com',
        url: 'https://www.booking.com/searchresults.html?ss=Beach%26Surf+Flat+Aljezur',
      },
    ],
    tags: ['west-coast', 'aljezur', 'surf'],
  },
  {
    id: 'acc-casa-rosa-alvor',
    name: 'Casa Rosa Alvor',
    category: 'accommodation',
    tripId: 'algarve',
    coords: [37.12958, -8.59488],
    description:
      'One-bedroom house on Rua dos Pescadores in the heart of old Alvor, a couple of streets from the riverfront. 62 m², sleeps three with a sofa bed. Booking.com review 7.8.',
    pricePerNight: { amount: 85, currency: 'GBP' },
    checkIn: '2026-06-13',
    checkOut: '2026-06-17',
    guests: 3,
    status: 'idea',
    amenities: ['wifi', 'balcony', 'private-bathroom', 'coffee-machine'],
    links: [
      {
        label: 'Booking.com',
        url: 'https://www.booking.com/hotel/pt/casa-rosa-alvor.html',
      },
    ],
    tags: ['algarve', 'alvor'],
  },
]
