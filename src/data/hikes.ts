import type { Hike } from './types'

export const hikes: Hike[] = [
  {
    id: 'hike-seven-hanging-valleys',
    name: 'Seven Hanging Valleys Trail (PR1 LGA)',
    category: 'hike',
    tripId: 'algarve',
    coords: [37.09017, -8.41283],
    description:
      'Cliff-top path from Praia da Marinha west to Praia de Vale Centeanes, threading past arches, sea caves and the Benagil cave overhead. Officially 5.7 km one-way; an early start beats the heat and the parking crunch.',
    distanceKm: 11.4,
    durationHours: 4,
    difficulty: 'moderate',
    tags: ['carvoeiro', 'coastal', 'must-do'],
    links: [
      {
        label: 'AllTrails — PR1 LGA',
        url: 'https://www.alltrails.com/trail/portugal/faro/pr1-lga-sete-vales-suspensos',
      },
    ],
  },
]
