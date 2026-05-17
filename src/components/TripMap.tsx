import { useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline, AttributionControl, Tooltip } from 'react-leaflet'
import type { LatLngBoundsExpression } from 'leaflet'
import { allLocations, driveRoutes, trips } from '../data'
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

export function TripMap({ activeTrips, activeCategories }: Props) {
  const visibleLocations = useMemo(
    () =>
      allLocations.filter(
        (l) => activeTrips.has(l.tripId) && activeCategories.has(l.category),
      ),
    [activeTrips, activeCategories],
  )

  const visibleRoutes = useMemo(
    () => driveRoutes.filter((r) => activeTrips.has(r.tripId)),
    [activeTrips],
  )

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

      {visibleLocations.map((location) => {
        const size = markerSize(location.category)
        return (
          <Marker
            key={location.id}
            position={location.coords}
            icon={buildMarkerIcon(location)}
          >
            <Tooltip
              permanent
              direction="bottom"
              offset={[0, size / 2 - 2]}
              className={`location-label location-label--${location.category}`}
            >
              {labelFor(location)}
            </Tooltip>
            <Popup>
              <LocationPopup location={location} />
            </Popup>
          </Marker>
        )
      })}
    </MapContainer>
  )
}

function labelFor(location: Location): string {
  if (location.category === 'airport') return location.iata
  return location.name
}
