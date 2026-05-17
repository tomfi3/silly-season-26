import type { Hike } from './types'

export const hikes: Hike[] = [
  {
    id: 'hike-cabo-da-roca',
    name: 'Cabo da Roca clifftop walk',
    category: 'hike',
    tripId: 'west-coast',
    coords: [38.7806, -9.4989],
    description: 'Westernmost point of mainland Europe. Short, panoramic walks along the cliffs.',
    distanceKm: 4,
    durationHours: 1.5,
    difficulty: 'easy',
    elevationGainM: 120,
  },
  {
    id: 'hike-seven-hanging-valleys',
    name: 'Seven Hanging Valleys',
    category: 'hike',
    tripId: 'algarve',
    coords: [37.0934, -8.4250],
    description: 'Coastal clifftop trail from Praia da Marinha to Praia de Vale Centeanes. Among the best walks in Portugal.',
    distanceKm: 11,
    durationHours: 4,
    difficulty: 'moderate',
    elevationGainM: 300,
  },
]
