import type { Beach } from './types'

export const beaches: Beach[] = [
  {
    id: 'beach-caparica',
    name: 'Costa da Caparica',
    category: 'beach',
    tripId: 'lisbon',
    coords: [38.6403, -9.2358],
    description: 'Long sandy strip just south of Lisbon. Easy day trip; multiple cafés along the coast road.',
    bestFor: ['swimming', 'sunbathing'],
    facilities: ['parking', 'cafe', 'toilets'],
  },
  {
    id: 'beach-adraga',
    name: 'Praia da Adraga',
    category: 'beach',
    tripId: 'west-coast',
    coords: [38.8011, -9.4625],
    description: 'Dramatic cliff-backed beach near Sintra. Rough Atlantic — better for views than long swims.',
    bestFor: ['cliffs', 'surf-watching'],
    facilities: ['parking', 'cafe'],
  },
  {
    id: 'beach-marinha',
    name: 'Praia da Marinha',
    category: 'beach',
    tripId: 'algarve',
    coords: [37.0902, -8.4127],
    description: 'Often called the most beautiful beach in Portugal. Honeycomb cliffs, clear water.',
    bestFor: ['swimming', 'snorkelling', 'cliffs'],
    facilities: ['parking'],
  },
]
