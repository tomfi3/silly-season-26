/**
 * Shared types for trip data.
 *
 * When agents add new content, every entry MUST conform to one of these types.
 * The map UI relies on `category` to render the right marker and popup fields.
 *
 * See docs/agent-guides/adding-locations.md for end-to-end instructions.
 */

// Three trip parts. Add new trips by extending TripId AND src/data/trips.ts.
export type TripId = 'lisbon' | 'west-coast' | 'algarve'

// Category drives marker icon + popup template. Adding a new category requires:
//  1. add the literal here
//  2. add the icon glyph in src/components/icons.tsx
//  3. add the popup template branch in src/components/LocationPopup.tsx
export type Category =
  | 'accommodation'
  | 'activity'
  | 'beach'
  | 'surf'
  | 'hike'
  | 'scenic'
  | 'restaurant'
  | 'airport'

export type Currency = 'EUR' | 'GBP' | 'USD'

export interface Money {
  amount: number
  currency: Currency
}

export interface Photo {
  /** Absolute URL or path under /public. Keep one landscape photo first — used as the popup hero. */
  url: string
  caption?: string
  credit?: string
}

export interface ExternalLink {
  label: string
  url: string
}

/** Fields shared by every location-style entry. */
export interface BaseLocation {
  /** Unique slug across ALL locations. Lowercase, kebab-case. */
  id: string
  name: string
  category: Category
  tripId: TripId
  /** [lat, lng] — Leaflet ordering. Use 5 decimal places (~1m precision). */
  coords: [number, number]
  /** 1–3 sentence summary shown in the popup body. Markdown is NOT rendered — plain text only. */
  description?: string
  photos?: Photo[]
  links?: ExternalLink[]
  /** Free-form tags. Useful for future filtering. */
  tags?: string[]
}

export type BookingStatus = 'considering' | 'shortlisted' | 'booked'

export interface Accommodation extends BaseLocation {
  category: 'accommodation'
  pricePerNight?: Money
  /** ISO date, e.g. "2026-08-12". */
  checkIn?: string
  /** ISO date. */
  checkOut?: string
  guests?: number
  bookingStatus?: BookingStatus
  /** Provider reference number, if booked. */
  bookingRef?: string
  amenities?: string[]
}

export interface Activity extends BaseLocation {
  category: 'activity'
  durationHours?: number
  cost?: Money
  bookingRequired?: boolean
  /** ISO date if pinned to a specific day. */
  date?: string
}

export interface Beach extends BaseLocation {
  category: 'beach'
  bestFor?: ('swimming' | 'snorkelling' | 'sunbathing' | 'kids' | 'cliffs' | 'surf-watching')[]
  facilities?: ('parking' | 'cafe' | 'toilets' | 'lifeguard' | 'shower')[]
}

export interface SurfSpot extends BaseLocation {
  category: 'surf'
  level?: 'beginner' | 'intermediate' | 'advanced' | 'pro'
  bestSwellDirection?: string
  breakType?: 'beach' | 'reef' | 'point'
}

export interface Hike extends BaseLocation {
  category: 'hike'
  distanceKm?: number
  durationHours?: number
  difficulty?: 'easy' | 'moderate' | 'hard'
  elevationGainM?: number
}

export interface ScenicSpot extends BaseLocation {
  category: 'scenic'
  bestTime?: 'sunrise' | 'morning' | 'midday' | 'sunset' | 'night'
}

export interface Restaurant extends BaseLocation {
  category: 'restaurant'
  cuisine?: string
  priceLevel?: 1 | 2 | 3 | 4    // 1 = cheap, 4 = splurge
  reservationRequired?: boolean
}

export interface Airport extends BaseLocation {
  category: 'airport'
  iata: string
}

export type Location =
  | Accommodation
  | Activity
  | Beach
  | SurfSpot
  | Hike
  | ScenicSpot
  | Restaurant
  | Airport

// ---------- Trip section ----------

export interface Trip {
  id: TripId
  name: string
  /** One-line subtitle shown in the legend. */
  blurb: string
  /** Hex colour. Must match a --color-trip-* token in src/index.css. */
  color: string
  /** Optional ISO date bounds for the section. */
  startDate?: string
  endDate?: string
}

// ---------- Travellers + flights ----------

export interface Traveller {
  id: string
  name: string
  initials: string
  /** Hex colour for personal markers (flight pins etc). */
  color: string
}

export type FlightDirection = 'outbound' | 'return'

export interface Flight {
  id: string
  travellerId: Traveller['id']
  direction: FlightDirection
  from: { code: string; name: string }
  to: { code: string; name: string }
  /** ISO datetime with timezone offset, e.g. "2026-08-12T18:40:00+01:00". */
  departure: string
  arrival: string
  airline?: string
  flightNumber?: string
  bookingRef?: string
  cost?: Money
}

// ---------- Drive routes ----------

export interface DriveRoute {
  id: string
  tripId: TripId
  label: string
  /** Free text, e.g. "Lisbon" or a location id. */
  from: string
  to: string
  /** Polyline points as [lat, lng]. Keep ≤ ~50 points; agents can simplify by hand. */
  waypoints: [number, number][]
  distanceKm?: number
  driveTimeMinutes?: number
  notes?: string
}
