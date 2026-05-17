import type { DriveRoute } from './types'

/**
 * Drive routes drawn as polylines. Waypoints are sparse — add ~5–15 points
 * that capture the rough shape; Leaflet smooths them at zoom-out.
 *
 * Routes are the overnight-to-overnight arcs. Stop-offs (beaches, towns,
 * surf spots) belong as their own markers, not as waypoints here.
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
      [38.51600, -8.89400], // A2 toll plaza south of the Tagus bridge
      [38.01270, -8.69220], // Grândola junction
      [37.72500, -8.78100], // Vila Nova de Milfontes (rough midpoint of the coastal leg)
      [37.31500, -8.80300], // Aljezur town
      [37.29745, -8.85623], // Vale da Telha / Arrifana
    ],
    distanceKm: 265,
    driveTimeMinutes: 195,
    notes:
      'A2 motorway most of the way, dropping onto the N120 from around Grândola to follow the coast down through Porto Covo and Vila Nova de Milfontes. Day stops along the way are mapped as separate markers.',
  },
  {
    id: 'route-arrifana-alvor',
    tripId: 'west-coast',
    label: 'Arrifana → Sagres → Alvor',
    from: 'Arrifana / Aljezur',
    to: 'Alvor',
    waypoints: [
      [37.29745, -8.85623], // Vale da Telha / Arrifana
      [37.17330, -8.90500], // Carrapateira (Amado)
      [37.02300, -8.99644], // Cabo de São Vicente
      [37.00080, -8.94770], // Sagres
      [37.10280, -8.67350], // Lagos
      [37.13580, -8.59440], // Alvor
    ],
    distanceKm: 95,
    driveTimeMinutes: 110,
    notes:
      'Hugs the SW corner via Carrapateira, the cape and Sagres, then picks up the EN125 east through Lagos to Alvor. Plenty of natural stop-offs on the cape itself.',
  },
  {
    id: 'route-alvor-tavira-fao',
    tripId: 'algarve',
    label: 'Alvor → Tavira → Faro airport → Alvor',
    from: 'Alvor',
    to: 'Alvor',
    waypoints: [
      [37.13580, -8.59440], // Alvor
      [37.19010, -8.43840], // Silves (north on A22 from Portimão)
      [37.07560, -8.10700], // Albufeira junction
      [37.01440, -7.93530], // Faro
      [37.12730, -7.64910], // Tavira
      [37.01440, -7.96590], // FAO airport — Tom drops off
      [37.13580, -8.59440], // back to Alvor
    ],
    distanceKm: 230,
    driveTimeMinutes: 170,
    notes:
      'Day-trip loop on the A22 — Tavira for the morning/lunch, then back via FAO to drop Tom for his 19:20 flight. The other two carry on west to Alvor.',
  },
]
