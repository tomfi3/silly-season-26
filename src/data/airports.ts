import type { Airport } from './types'

/**
 * Airports referenced by flights. Add an entry here if a flight uses a code
 * that doesn't exist yet — the flight popup looks it up by IATA.
 */
export const airports: Airport[] = [
  {
    id: 'apt-lis',
    name: 'Lisbon Humberto Delgado',
    iata: 'LIS',
    category: 'airport',
    tripId: 'lisbon',
    coords: [38.7813, -9.1359],
    description: 'Lisbon Portela. Aerobus and metro into the centre.',
  },
  {
    id: 'apt-fao',
    name: 'Faro Airport',
    iata: 'FAO',
    category: 'airport',
    tripId: 'algarve',
    coords: [37.0144, -7.9659],
    description: 'Gateway to the Algarve. ~30 min taxi to most resorts.',
  },
]

export function getAirportByIata(iata: string): Airport | undefined {
  return airports.find((a) => a.iata === iata)
}
