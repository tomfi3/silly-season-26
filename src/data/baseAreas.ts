import type { BaseArea } from './types'

/**
 * Base areas — broad zones where we're sleeping for each leg, rather than
 * specific accommodation pins. Routes terminate at the circle boundary so
 * we don't imply a particular hotel is the destination.
 *
 * Radii are chosen so the circle reaches the furthest plausible stay:
 *  - Aljezur reaches Arrifana / Vale da Telha
 *  - Portimão reaches Alvor
 */
export const baseAreas: BaseArea[] = [
  {
    id: 'base-lisbon',
    name: 'Lisbon',
    tripId: 'lisbon',
    coords: [38.72230, -9.13930],
    radiusKm: 8,
    description: 'City days base — apartments anywhere from Alfama out to Belém.',
  },
  {
    id: 'base-aljezur',
    name: 'Aljezur',
    tripId: 'west-coast',
    coords: [37.31700, -8.80300],
    radiusKm: 6,
    description:
      'West-coast surf base — covers Aljezur valley, Vale da Telha and Arrifana.',
  },
  {
    id: 'base-portimao',
    name: 'Portimão',
    tripId: 'algarve',
    coords: [37.13754, -8.53780],
    radiusKm: 6,
    description: 'Algarve base — covers Portimão, Alvor and the cliffs east of town.',
  },
]
