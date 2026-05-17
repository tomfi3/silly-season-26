import type { Beach } from './types'

export const beaches: Beach[] = [
  {
    id: 'beach-praia-da-bordeira',
    name: 'Praia da Bordeira',
    category: 'beach',
    tripId: 'west-coast',
    coords: [37.19360, -8.90500],
    description:
      'Three-kilometre dune beach, the wildest stretch on the Costa Vicentina. Big surf and small crowds even in August — bring a windbreak.',
    bestFor: ['cliffs', 'sunbathing', 'surf-watching'],
    facilities: ['parking'],
    tags: ['costa-vicentina', 'aljezur'],
    photos: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Praia_da_Bordeira_(14304624069).jpg/1280px-Praia_da_Bordeira_(14304624069).jpg',
        caption: 'Praia da Bordeira dunes',
        credit: 'Wikimedia / CC BY-SA',
      },
    ],
  },
  {
    id: 'beach-praia-do-monte-clerigo',
    name: 'Praia do Monte Clérigo',
    category: 'beach',
    tripId: 'west-coast',
    coords: [37.34128, -8.85312],
    description:
      'Mellow cove 10 min north of Aljezur. Sheltered enough for swimming, two cafés on the sand, easy parking. The fallback when the open coast is too rough.',
    bestFor: ['swimming', 'sunbathing'],
    facilities: ['parking', 'cafe'],
    tags: ['aljezur'],
  },
  {
    id: 'beach-praia-de-odeceixe',
    name: 'Praia de Odeceixe',
    category: 'beach',
    tripId: 'west-coast',
    coords: [37.44388, -8.79750],
    description:
      'Half-moon at the mouth of the Seixe river. River-flat for paddling, full Atlantic on the seaward side — best of both halves of the family in one beach.',
    bestFor: ['swimming', 'kids', 'surf-watching'],
    facilities: ['parking', 'cafe', 'lifeguard'],
    tags: ['costa-vicentina'],
    photos: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Praia_de_Odeceixe_(7667131250).jpg/1280px-Praia_de_Odeceixe_(7667131250).jpg',
        caption: 'Praia de Odeceixe from the cliffs',
        credit: 'Wikimedia / CC BY-SA',
      },
    ],
  },
]
