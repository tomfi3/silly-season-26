import type { SurfSpot } from './types'

export const surfSpots: SurfSpot[] = [
  {
    id: 'surf-ericeira',
    name: 'Ericeira (Ribeira d\'Ilhas)',
    category: 'surf',
    tripId: 'west-coast',
    coords: [38.9794, -9.4178],
    description: 'World Surfing Reserve. Consistent right-hander, suits intermediate up.',
    level: 'intermediate',
    breakType: 'reef',
  },
  {
    id: 'surf-nazare',
    name: 'Nazaré — Praia do Norte',
    category: 'surf',
    tripId: 'west-coast',
    coords: [39.6080, -9.0793],
    description: 'Big-wave legend. Spectator only unless you really know what you\'re doing.',
    level: 'pro',
    breakType: 'beach',
  },
]
