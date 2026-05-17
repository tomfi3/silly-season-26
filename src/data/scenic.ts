import type { ScenicSpot } from './types'

export const scenicSpots: ScenicSpot[] = [
  {
    id: 'scenic-belem-tower',
    name: 'Belém Tower',
    category: 'scenic',
    tripId: 'lisbon',
    coords: [38.6916, -9.2160],
    description: 'Manueline tower on the Tagus. Pair with Jerónimos Monastery and pastéis de Belém.',
    bestTime: 'sunset',
  },
  {
    id: 'scenic-benagil',
    name: 'Benagil Cave',
    category: 'scenic',
    tripId: 'algarve',
    coords: [37.0879, -8.4267],
    description: 'Famous sea cave with a hole in the roof. Reachable by SUP, kayak, or boat tour.',
    bestTime: 'morning',
  },
  {
    id: 'scenic-pena-palace',
    name: 'Pena Palace (Sintra)',
    category: 'scenic',
    tripId: 'west-coast',
    coords: [38.7876, -9.3905],
    description: 'Romantic-era hilltop palace. Buy timed tickets in advance and go early to avoid queues.',
    bestTime: 'morning',
  },
]
