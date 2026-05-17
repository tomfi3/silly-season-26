import type { SurfSpot } from './types'

export const surfSpots: SurfSpot[] = [
  {
    id: 'surf-arrifana',
    name: 'Praia da Arrifana',
    category: 'surf',
    tripId: 'west-coast',
    coords: [37.29218, -8.86485],
    description:
      'Cliff-tucked cove, the one sheltered surf for miles when the north wind picks up. Right-hand point for advanced, mellow beachbreak inside for everyone else. Café at the cliff base.',
    level: 'intermediate',
    breakType: 'point',
    bestSwellDirection: 'W / NW',
    tags: ['aljezur', 'costa-vicentina'],
    photos: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Praia_da_Arrifana.JPG/1280px-Praia_da_Arrifana.JPG',
        caption: 'Praia da Arrifana from the cliff above',
        credit: 'Wikimedia / CC BY-SA',
      },
    ],
  },
  {
    id: 'surf-amado',
    name: 'Praia do Amado',
    category: 'surf',
    tripId: 'west-coast',
    coords: [37.17330, -8.90500],
    description:
      'Wide-open beachbreak south of Carrapateira. Summer-friendly waves, lots of surf schools, plenty of parking. The default first session if Arrifana is crowded.',
    level: 'beginner',
    breakType: 'beach',
    bestSwellDirection: 'W / NW',
    tags: ['carrapateira', 'costa-vicentina', 'beginner-friendly'],
  },
]
