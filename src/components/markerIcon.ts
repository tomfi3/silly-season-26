import L from 'leaflet'
import type { Category, Location, LocationStatus } from '../data/types'
import { getTrip } from '../data/trips'
import { svgGlyphMarkup } from './icons'

/**
 * Build a Leaflet divIcon for a location. The icon is a coloured pill — trip
 * colour as background, white category glyph inside.
 *
 * Size hierarchy keeps accommodation as the dominant marker (it's where the
 * trip pivots from one section to the next), with airports a step down, and
 * everything else compact so the map doesn't feel crowded.
 *
 * Three visual states driven by `location.status`:
 *   - 'idea'    → hollow pill (muted; trip colour as ring + glyph on white)
 *   - 'decided' → solid pill (default look)
 *   - 'booked'  → solid pill with a small white check badge in the top-right
 *
 * An unset `status` is treated as 'idea' for accommodation / flights / activities
 * / restaurants (the bookable categories), and as 'decided' for beach / surf /
 * hike / scenic / airport. See resolveStatus().
 */
export function buildMarkerIcon(location: Location): L.DivIcon {
  const trip = getTrip(location.tripId)
  return markerIcon(location.category, trip.color, resolveStatus(location))
}

function resolveStatus(location: Location): LocationStatus {
  if (location.status) return location.status
  // Defaults when not set: bookable categories default to 'idea'; place-style
  // categories default to 'decided' (a beach pin without explicit status is
  // "here's a place we'd visit", not "tentative").
  switch (location.category) {
    case 'accommodation':
    case 'activity':
    case 'restaurant':
      return 'idea'
    default:
      return 'decided'
  }
}

const MARKER_SIZE: Record<Category, number> = {
  accommodation: 38,
  airport: 30,
  hike: 24,
  beach: 24,
  surf: 24,
  scenic: 24,
  activity: 24,
  restaurant: 24,
}

export function markerSize(category: Category): number {
  return MARKER_SIZE[category]
}

export function markerIcon(
  category: Category,
  color: string,
  status: LocationStatus,
): L.DivIcon {
  const size = MARKER_SIZE[category]
  // Glyph scales with the pill, but with a slight floor so small markers stay legible.
  const glyphSize = Math.max(13, Math.round(size * 0.54))
  const hollow = status === 'idea'
  const showCheck = status === 'booked'
  const inner = svgGlyphMarkup(category, hollow ? color : '#ffffff')
  const bg = hollow ? '#ffffff' : color
  const stroke = hollow ? color : '#ffffff'
  const opacity = hollow ? 0.9 : 1
  const checkBadge = showCheck
    ? `
      <div style="
        position: absolute;
        top: -3px;
        right: -3px;
        width: 14px;
        height: 14px;
        border-radius: 999px;
        background: #16a34a;
        border: 2px solid #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 1px 2px rgba(0,0,0,0.2);
      ">
        <svg width="8" height="8" viewBox="0 0 8 8" style="display:block">
          <path d="M1.5 4.2 3.2 5.8 6.5 2.4" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>`
    : ''
  const html = `
    <div style="position: relative; width: ${size}px; height: ${size}px;">
      <div style="
        width: ${size}px;
        height: ${size}px;
        border-radius: 999px;
        background: ${bg};
        border: 2px solid ${stroke};
        opacity: ${opacity};
        box-shadow: 0 2px 6px rgba(15, 23, 42, 0.25);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <svg width="${glyphSize}" height="${glyphSize}" viewBox="0 0 16 16" style="display:block">${inner}</svg>
      </div>
      ${checkBadge}
    </div>
  `
  return L.divIcon({
    html,
    className: 'trip-marker',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  })
}
