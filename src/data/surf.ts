import type { SurfSpot } from './types'

export const surfSpots: SurfSpot[] = [
  {
    id: 'surf-arrifana',
    name: 'Praia da Arrifana',
    category: 'surf',
    tripId: 'west-coast',
    coords: [37.29218, -8.86485],
    description:
      'Sheltered cove south of Aljezur, tucked under a cliff with a ruined fort above. The right-hand point is one of the more forgiving advanced waves on this coast; the beachbreak inside is mellower.',
    level: 'intermediate',
    breakType: 'point',
    bestSwellDirection: 'W / NW',
    tags: ['aljezur', 'costa-vicentina'],
  },
  {
    id: 'surf-amado',
    name: 'Praia do Amado',
    category: 'surf',
    tripId: 'west-coast',
    coords: [37.17330, -8.90500],
    description:
      'Wide-open beachbreak just south of Carrapateira, more sheltered from north wind than Bordeira. Reliable summer waves and a strip of surf schools in the car park.',
    level: 'beginner',
    breakType: 'beach',
    bestSwellDirection: 'W / NW',
    tags: ['carrapateira', 'costa-vicentina', 'beginner-friendly'],
  },
]
