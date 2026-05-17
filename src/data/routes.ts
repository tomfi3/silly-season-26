import type { DriveRoute } from './types'

/**
 * Drive routes drawn as polylines. Straight schematic lines between the
 * day's anchor points — not real road shape.
 *
 * Endpoints sit on the boundary of the relevant `baseAreas.ts` circle
 * rather than at a specific accommodation, so the visual reads as
 * "drive into this area" rather than "drive to this hotel". Specific
 * stop-offs (Cabo de São Vicente, Lagos, Porto Covo, etc.) stay on the
 * map as independent markers.
 */
export const driveRoutes: DriveRoute[] = [
  {
    id: 'route-lisbon-arrifana',
    tripId: 'west-coast',
    label: 'Lisbon → Aljezur',
    from: 'Lisbon',
    to: 'Aljezur',
    waypoints: [
      [38.666, -9.081], // Lisbon area — east edge of the Lisbon circle, toward Alcácer do Sal
      [38.373, -8.513], // Alcácer do Sal — leave the A2 here for the coast road
      [37.370, -8.788], // Aljezur area — NE edge of the Aljezur circle
    ],
    distanceKm: 265,
    driveTimeMinutes: 195,
    notes:
      'A2 motorway down to Alcácer do Sal, then southwest on the IC1 / N120 to Aljezur. Porto Covo and Vila Nova de Milfontes are separate stop-off markers.',
  },
  {
    id: 'route-arrifana-alvor',
    tripId: 'west-coast',
    label: 'Aljezur → Sagres → Portimão',
    from: 'Aljezur',
    to: 'Portimão',
    waypoints: [
      [37.266, -8.826], // Aljezur area — SW edge toward Sagres
      [37.001, -8.948], // Sagres
      [37.117, -8.601], // Portimão area — SW edge toward Sagres
    ],
    distanceKm: 95,
    driveTimeMinutes: 110,
    notes:
      'Down the west coast to the SW corner, then east along the EN125 into the Portimão area. Cabo de São Vicente and Lagos are separate stop-off markers.',
  },
  {
    id: 'route-alvor-tavira-fao',
    tripId: 'algarve',
    label: 'Portimão → Tavira → Faro → Portimão',
    from: 'Portimão',
    to: 'Portimão',
    waypoints: [
      [37.137, -8.470], // Portimão area — east edge toward Tavira
      [37.127, -7.649], // Tavira
      [37.014, -7.966], // Faro (FAO airport)
      [37.137, -8.470], // back to Portimão east edge
    ],
    distanceKm: 230,
    driveTimeMinutes: 170,
    notes:
      'Day-trip loop on the A22 — Tavira for the morning, drop Tom at FAO for his 19:20 flight, then back into the Portimão area.',
  },
]
