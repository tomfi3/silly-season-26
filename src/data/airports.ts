import type { Airport } from './types'

/**
 * Airports referenced by flights. Add an entry here if a flight uses a code
 * that doesn't exist yet — the flight popup looks it up by IATA.
 */
export const airports: Airport[] = []

export function getAirportByIata(iata: string): Airport | undefined {
  return airports.find((a) => a.iata === iata)
}
