import type { Airport } from './types'

/**
 * Airports referenced by flights. Add an entry here if a flight uses a code
 * that doesn't exist yet — the flight popup looks it up by IATA.
 */
export const airports: Airport[] = [
  {
    id: 'apt-lgw',
    name: 'London Gatwick',
    category: 'airport',
    tripId: 'lisbon',
    coords: [51.15370, -0.18210],
    iata: 'LGW',
    tags: ['uk', 'home'],
  },
  {
    id: 'apt-lis',
    name: 'Lisbon Humberto Delgado',
    category: 'airport',
    tripId: 'lisbon',
    coords: [38.78130, -9.13590],
    iata: 'LIS',
    tags: ['portugal'],
  },
  {
    id: 'apt-fao',
    name: 'Faro',
    category: 'airport',
    tripId: 'algarve',
    coords: [37.01440, -7.96590],
    iata: 'FAO',
    tags: ['portugal', 'algarve'],
  },
]

export function getAirportByIata(iata: string): Airport | undefined {
  return airports.find((a) => a.iata === iata)
}
