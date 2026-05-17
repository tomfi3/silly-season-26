import type { DriveRoute } from './types'

/**
 * Drive routes drawn as polylines. Waypoints are sparse — add ~5–15 points
 * that capture the rough shape; Leaflet smooths them at zoom-out.
 */
export const driveRoutes: DriveRoute[] = [
  {
    id: 'route-lisbon-sintra-ericeira',
    tripId: 'west-coast',
    label: 'Lisbon → Sintra → Ericeira',
    from: 'Lisbon',
    to: 'Ericeira',
    waypoints: [
      [38.7223, -9.1393],   // Lisbon
      [38.7876, -9.3905],   // Sintra (Pena)
      [38.7806, -9.4989],   // Cabo da Roca
      [38.9794, -9.4178],   // Ericeira
    ],
    distanceKm: 70,
    driveTimeMinutes: 90,
    notes: 'Loop via Sintra and Cabo da Roca — adds ~30 min but worth it.',
  },
  {
    id: 'route-ericeira-nazare',
    tripId: 'west-coast',
    label: 'Ericeira → Peniche → Nazaré',
    from: 'Ericeira',
    to: 'Nazaré',
    waypoints: [
      [38.9794, -9.4178],   // Ericeira
      [39.3558, -9.3811],   // Peniche
      [39.4360, -9.1311],   // Óbidos detour
      [39.6080, -9.0793],   // Nazaré
    ],
    distanceKm: 95,
    driveTimeMinutes: 110,
  },
  {
    id: 'route-nazare-algarve',
    tripId: 'algarve',
    label: 'Nazaré → Algarve',
    from: 'Nazaré',
    to: 'Lagos / Carvoeiro',
    waypoints: [
      [39.6080, -9.0793],   // Nazaré
      [38.7223, -9.1393],   // Lisbon
      [38.0096, -7.8650],   // Beja (rough waypoint)
      [37.1028, -8.6724],   // Lagos
    ],
    distanceKm: 480,
    driveTimeMinutes: 320,
    notes: 'Long drive — consider breaking it with a night in Évora or Comporta.',
  },
]
