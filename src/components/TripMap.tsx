import { useState } from 'react'
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  Circle,
  AttributionControl,
  Tooltip,
  useMap,
  useMapEvents,
} from 'react-leaflet'
import type { LatLngBoundsExpression } from 'leaflet'
import { allLocations, baseAreas, driveRoutes, trips } from '../data'
import type { Category, Location, TripId } from '../data/types'
import { buildMarkerIcon, markerSize } from './markerIcon'
import { LocationPopup } from './LocationPopup'

interface Props {
  activeTrips: Set<TripId>
  activeCategories: Set<Category>
}

// Portugal-spanning bounds — fits Lisbon, west coast, Algarve.
const INITIAL_BOUNDS: LatLngBoundsExpression = [
  [36.85, -9.70], // SW (Algarve / Atlantic)
  [39.85, -7.60], // NE (Nazaré / inland buffer)
]

// Categories whose labels are always shown. The rest only appear once the
// user has zoomed in past LABEL_ZOOM_THRESHOLD — keeps the Portugal-wide
// view from drowning in text.
const ANCHOR_CATEGORIES: ReadonlySet<Category> = new Set<Category>([
  'accommodation',
  'airport',
])
const LABEL_ZOOM_THRESHOLD = 9

export function TripMap({ activeTrips, activeCategories }: Props) {
  const visibleLocations = allLocations.filter(
    (l) => activeTrips.has(l.tripId) && activeCategories.has(l.category),
  )
  const visibleRoutes = driveRoutes.filter((r) => activeTrips.has(r.tripId))
  const visibleBaseAreas = baseAreas.filter((a) => activeTrips.has(a.tripId))

  return (
    <MapContainer
      bounds={INITIAL_BOUNDS}
      boundsOptions={{ padding: [30, 30] }}
      className="h-full w-full"
      zoomControl
      attributionControl={false}
      preferCanvas
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        maxZoom={19}
      />
      <AttributionControl position="bottomright" prefix={false} />

      {visibleBaseAreas.map((area) => {
        const trip = trips.find((t) => t.id === area.tripId)
        const color = trip?.color ?? '#64748b'
        return (
          <Circle
            key={area.id}
            center={area.coords}
            radius={area.radiusKm * 1000}
            pathOptions={{
              color,
              weight: 3,
              opacity: 0.85,
              dashArray: '4 6',
              fillColor: color,
              fillOpacity: 0.06,
            }}
          >
            <Tooltip permanent direction="center" className="base-area-label">
              {area.name}
            </Tooltip>
          </Circle>
        )
      })}

      {visibleRoutes.map((route) => {
        const trip = trips.find((t) => t.id === route.tripId)
        return (
          <Polyline
            key={route.id}
            positions={route.waypoints}
            pathOptions={{
              color: trip?.color ?? '#64748b',
              weight: 4,
              opacity: 0.75,
              dashArray: '6 8',
              lineCap: 'round',
            }}
          />
        )
      })}

      <Markers locations={visibleLocations} />
    </MapContainer>
  )
}

function Markers({ locations }: { locations: Location[] }) {
  const map = useMap()
  const [zoom, setZoom] = useState<number>(map.getZoom())
  useMapEvents({
    zoomend: (e) => setZoom(e.target.getZoom()),
  })

  return (
    <>
      {locations.map((location) => {
        const size = markerSize(location.category)
        const isAnchor = ANCHOR_CATEGORIES.has(location.category)
        const showLabel = isAnchor || zoom >= LABEL_ZOOM_THRESHOLD
        return (
          <Marker
            key={location.id}
            position={location.coords}
            icon={buildMarkerIcon(location)}
          >
            {showLabel && (
              <Tooltip
                permanent
                direction="bottom"
                offset={[0, size / 2 - 2]}
                className={`location-label location-label--${location.category}`}
              >
                {labelFor(location)}
              </Tooltip>
            )}
            <Popup>
              <LocationPopup location={location} />
            </Popup>
          </Marker>
        )
      })}
    </>
  )
}

function labelFor(location: Location): string {
  if (location.category === 'airport') return location.iata
  return location.name
}
