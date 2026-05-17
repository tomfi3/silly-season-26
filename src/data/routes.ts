import type { DriveRoute } from './types'

/**
 * Drive routes drawn as polylines. Kept deliberately simple — straight
 * line segments between the day's anchor points, not the real road shape.
 * The stop-offs are independent markers, not route waypoints.
 */
export const driveRoutes: DriveRoute[] = [
  {
    id: 'route-lisbon-arrifana',
    tripId: 'west-coast',
    label: 'Lisbon → Arrifana',
    from: 'Lisbon',
    to: 'Arrifana / Aljezur',
    waypoints: [
      [38.72230, -9.13930], // Lisbon
      [38.16800, -8.56700], // Grândola junction (leave A2 for the coast)
      [37.29745, -8.85623], // Arrifana
    ],
    distanceKm: 265,
    driveTimeMinutes: 195,
    notes:
      'A2 motorway down to the Grândola junction, then southwest on the N120 to Aljezur. Day stops (Porto Covo, Vila Nova de Milfontes) are separate markers.',
  },
  {
    id: 'route-arrifana-alvor',
    tripId: 'west-coast',
    label: 'Arrifana → Sagres → Alvor',
    from: 'Arrifana / Aljezur',
    to: 'Alvor',
    waypoints: [
      [37.29745, -8.85623], // Arrifana
      [37.00080, -8.94770], // Sagres
      [37.13580, -8.59440], // Alvor
    ],
    distanceKm: 95,
    driveTimeMinutes: 110,
    notes:
      'Down the west coast to the SW corner, then east along the EN125 to Alvor. Cabo de São Vicente and Lagos are separate stop-off markers.',
  },
  {
    id: 'route-alvor-tavira-fao',
    tripId: 'algarve',
    label: 'Alvor → Tavira → Faro → Alvor',
    from: 'Alvor',
    to: 'Alvor',
    waypoints: [
      [37.13580, -8.59440], // Alvor
      [37.12730, -7.64910], // Tavira
      [37.01440, -7.96590], // Faro (FAO airport)
      [37.13580, -8.59440], // Alvor
    ],
    distanceKm: 230,
    driveTimeMinutes: 170,
    notes:
      'Day-trip loop on the A22 — Tavira for the morning, drop Tom at FAO for his 19:20 flight, then back to Alvor.',
  },
]
