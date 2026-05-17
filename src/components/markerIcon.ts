import L from 'leaflet'
import type { Category, Location, LocationStatus } from '../data/types'
import { getTrip } from '../data/trips'
import { svgGlyphMarkup } from './icons'

/**
 * Two marker styles share the map.
 *
 * 1. **Trip-coloured pill** — for "anchor" categories that *are* the trip:
 *    accommodation (where we sleep) and airport (where we arrive/leave).
 *    Pill is in the trip's colour with a white category glyph and the
 *    same idea / decided / booked treatment as before.
 *
 * 2. **Emoji puck** — for "places of interest" that sit within a trip part
 *    but don't define it: beach, surf, scenic (towns / viewpoints), hike,
 *    activity, restaurant. White circle, soft shadow, single emoji. No
 *    trip colour, no status variants.
 *
 * The split matches how a planner reads the map at a glance — the
 * coloured pins are the spine of the trip; the emoji pucks are the
 * optional things to fill the days with.
 */
export function buildMarkerIcon(location: Location): L.DivIcon {
  const emoji = EMOJI_BY_CATEGORY[location.category]
  if (emoji) {
    return emojiMarkerIcon(location.category, emoji)
  }
  const trip = getTrip(location.tripId)
  return brandedMarkerIcon(location.category, trip.color, resolveStatus(location))
}

function resolveStatus(location: Location): LocationStatus {
  if (location.status) return location.status
  // Bookable categories default to 'idea', place-style default to 'decided'.
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
  hike: 28,
  beach: 28,
  surf: 28,
  scenic: 28,
  activity: 28,
  restaurant: 28,
}

const EMOJI_BY_CATEGORY: Partial<Record<Category, string>> = {
  beach: '🏖️',
  surf: '🏄',
  scenic: '🏘️',
  hike: '🥾',
  activity: '✨',
  restaurant: '🍴',
}

export function markerSize(category: Category): number {
  return MARKER_SIZE[category]
}

function emojiMarkerIcon(category: Category, emoji: string): L.DivIcon {
  const size = MARKER_SIZE[category]
  const fontSize = Math.round(size * 0.6)
  const html = `
    <div style="
      width: ${size}px;
      height: ${size}px;
      border-radius: 999px;
      background: #ffffff;
      box-shadow: 0 2px 6px rgba(15, 23, 42, 0.22);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: ${fontSize}px;
      line-height: 1;
    ">${emoji}</div>
  `
  return L.divIcon({
    html,
    className: 'trip-marker',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  })
}

export function brandedMarkerIcon(
  category: Category,
  color: string,
  status: LocationStatus,
): L.DivIcon {
  const size = MARKER_SIZE[category]
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
