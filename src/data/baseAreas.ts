import type { BaseArea } from './types'

/**
 * Base areas — broad zones where we're sleeping for each leg, rather than
 * specific accommodation pins. Routes terminate at the circle boundary so
 * we don't imply a particular hotel is the destination.
 *
 * `nights` is the ISO date of each overnight in chronological order. The
 * count drives the on-circle badge; the list is shown in the circle's
 * popup when clicked.
 */
export const baseAreas: BaseArea[] = [
  {
    id: 'base-lisbon',
    name: 'Lisbon',
    tripId: 'lisbon',
    coords: [38.72230, -9.13930],
    radiusKm: 8,
    description: 'City days base — apartments anywhere from Alfama out to Belém.',
    nights: [
      '2026-06-07', // Sun — arrival night (other two travellers)
      '2026-06-08', // Mon
      '2026-06-09', // Tue
      '2026-06-10', // Wed — Tom arrives this evening
    ],
  },
  {
    id: 'base-aljezur',
    name: 'Aljezur',
    tripId: 'west-coast',
    coords: [37.31700, -8.80300],
    radiusKm: 6,
    description:
      'West-coast surf base — covers Aljezur valley, Vale da Telha and Arrifana.',
    nights: [
      '2026-06-11', // Thu — drive-down night
      '2026-06-12', // Fri
    ],
  },
  {
    id: 'base-portimao',
    name: 'Portimão',
    tripId: 'algarve',
    coords: [37.13754, -8.53780],
    radiusKm: 6,
    description: 'Algarve base — covers Portimão, Alvor and the cliffs east of town.',
    nights: [
      '2026-06-13', // Sat — SW-corner drive day, arrive Alvor
      '2026-06-14', // Sun
      '2026-06-15', // Mon
      '2026-06-16', // Tue — Tom flies out, other two stay
    ],
  },
]
