/**
 * Barrel export of all trip data.
 *
 * When adding a new content file (e.g. src/data/viewpoints.ts), append its
 * array to `allLocations` below so it shows up on the map.
 */
import { airports } from './airports'
import { accommodation } from './accommodation'
import { activities } from './activities'
import { beaches } from './beaches'
import { surfSpots } from './surf'
import { hikes } from './hikes'
import { scenicSpots } from './scenic'
import { restaurants } from './restaurants'
import type { Location } from './types'

export { trips, getTrip } from './trips'
export { travellers, getTraveller } from './travellers'
export { flights } from './flights'
export { driveRoutes } from './routes'
export { baseAreas } from './baseAreas'
export { airports, getAirportByIata } from './airports'
export { accommodation } from './accommodation'
export { activities } from './activities'
export { beaches } from './beaches'
export { surfSpots } from './surf'
export { hikes } from './hikes'
export { scenicSpots } from './scenic'
export { restaurants } from './restaurants'

export const allLocations: Location[] = [
  ...accommodation,
  ...activities,
  ...beaches,
  ...surfSpots,
  ...hikes,
  ...scenicSpots,
  ...restaurants,
  ...airports,
]

export type * from './types'
