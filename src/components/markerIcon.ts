import L from 'leaflet'
import type { Category, Location } from '../data/types'
import { getTrip } from '../data/trips'
import { svgGlyphMarkup } from './icons'

/**
 * Build a Leaflet divIcon for a location. The icon is a coloured pill — trip
 * colour as background, white category glyph inside.
 *
 * Variants:
 *  - Accommodation with `bookingStatus !== 'booked'` shows a hollow ring style.
 *  - All other markers are solid.
 *
 * Keep the HTML cheap — these can be rendered hundreds of times.
 */
export function buildMarkerIcon(location: Location): L.DivIcon {
  const trip = getTrip(location.tripId)
  return markerIcon(location.category, trip.color, isHollow(location))
}

function isHollow(location: Location): boolean {
  if (location.category !== 'accommodation') return false
  return location.bookingStatus !== 'booked'
}

export function markerIcon(category: Category, color: string, hollow = false): L.DivIcon {
  const inner = svgGlyphMarkup(category, hollow ? color : '#ffffff')
  const bg = hollow ? '#ffffff' : color
  const stroke = hollow ? color : '#ffffff'
  const html = `
    <div style="
      width: 32px;
      height: 32px;
      border-radius: 999px;
      background: ${bg};
      border: 2px solid ${stroke};
      box-shadow: 0 2px 6px rgba(15, 23, 42, 0.25);
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <svg width="16" height="16" viewBox="0 0 16 16" style="display:block">${inner}</svg>
    </div>
  `
  return L.divIcon({
    html,
    className: 'trip-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  })
}

