import type { Beach } from './types'

export const beaches: Beach[] = [
  {
    id: 'beach-praia-da-bordeira',
    name: 'Praia da Bordeira',
    category: 'beach',
    tripId: 'west-coast',
    coords: [37.19360, -8.90500],
    description:
      'Long, dune-backed Atlantic beach just north of Carrapateira, the largest stretch in the Costa Vicentina natural park. Wild and often near-empty even in summer.',
    bestFor: ['cliffs', 'sunbathing', 'surf-watching'],
    facilities: ['parking'],
    tags: ['costa-vicentina', 'aljezur'],
  },
  {
    id: 'beach-praia-do-monte-clerigo',
    name: 'Praia do Monte Clérigo',
    category: 'beach',
    tripId: 'west-coast',
    coords: [37.34128, -8.85312],
    description:
      'Family-friendly cove on the Aljezur coast with a small cluster of beach houses and a couple of seasonal cafés. Sheltered enough for a swim between surf sessions.',
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
      'Half-moon beach at the mouth of the Seixe river, on the Alentejo / Algarve border. Calm river-side flats one half, full Atlantic surf the other.',
    bestFor: ['swimming', 'kids', 'surf-watching'],
    facilities: ['parking', 'cafe', 'lifeguard'],
    tags: ['costa-vicentina'],
  },
]
