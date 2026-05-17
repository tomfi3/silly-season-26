import type { Trip } from './types'

/**
 * Trip sections, in chronological order.
 *
 * Colours MUST match the --color-trip-* tokens in src/index.css.
 * If you change a colour here, update the token too.
 */
export const trips: Trip[] = [
  {
    id: 'lisbon',
    name: 'Lisbon',
    blurb: 'City days — food, viewpoints, beach trips out of town.',
    color: '#6366f1',
  },
  {
    id: 'west-coast',
    name: 'West Coast road trip',
    blurb: 'Sintra → Ericeira → Peniche → Nazaré. Surf, cliffs, scenic drives.',
    color: '#f59e0b',
  },
  {
    id: 'algarve',
    name: 'Algarve',
    blurb: 'Beaches, caves, slow days in the south.',
    color: '#f43f5e',
  },
]

export function getTrip(id: Trip['id']): Trip {
  const trip = trips.find((t) => t.id === id)
  if (!trip) throw new Error(`Unknown trip id: ${id}`)
  return trip
}
