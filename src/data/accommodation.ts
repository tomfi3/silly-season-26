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
      'Two-bedroom flat in Vale da Telha. Sleeps 4 across two bedrooms, 86 m², free parking. 10 min drive to Arrifana for surf, 15 to Monte Clérigo. Booking score 7.9.',
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
      'One-bedroom house in old Alvor, two streets from the riverfront and the seafood restaurants. Sleeps 3 (double + sofa bed), 62 m². 7 min to Portimão, 15 to Ponta da Piedade. Booking score 7.8.',
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
    photos: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Alvor_Harbour_-_The_Algarve,_Portugal_(1468999703).jpg/1280px-Alvor_Harbour_-_The_Algarve,_Portugal_(1468999703).jpg',
        caption: 'Alvor harbour — Casa Rosa is two streets inland',
        credit: 'Wikimedia / CC BY-SA',
      },
    ],
  },
]
