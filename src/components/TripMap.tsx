import { useMemo, useState } from 'react'
import {
  MapContainer,
  TileLayer,
  Marker,
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

interface Props {
  activeTrips: Set<TripId>
  activeCategories: Set<Category>
  onSelectLocation: (id: string) => void
  onSelectBaseArea: (id: string) => void
  onDeselect: () => void
}

// Portugal-spanning bounds — fits Lisbon, west coast, Algarve.
const INITIAL_BOUNDS: LatLngBoundsExpression = [
  [36.85, -9.70], // SW (Algarve / Atlantic)
  [39.85, -7.60], // NE (Nazaré / inland buffer)
]

const ANCHOR_CATEGORIES: ReadonlySet<Category> = new Set<Category>([
  'accommodation',
  'airport',
])
const LABEL_ZOOM_THRESHOLD = 9

const LABEL_PRIORITY: Record<Category, number> = {
  accommodation: 100,
  airport: 90,
  hike: 70,
  scenic: 60,
  surf: 55,
  beach: 50,
  activity: 40,
  restaurant: 35,
}

export function TripMap({
  activeTrips,
  activeCategories,
  onSelectLocation,
  onSelectBaseArea,
  onDeselect,
}: Props) {
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

      <MapClickHandler onDeselect={onDeselect} />

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
            eventHandlers={{
              click: (e) => {
                e.originalEvent?.stopPropagation?.()
                onSelectBaseArea(area.id)
              },
            }}
          >
            <Tooltip permanent direction="center" className="base-area-badge">
              <span
                className="base-area-badge__pill"
                style={{ borderColor: color, color }}
              >
                {area.nights.length}N
              </span>
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

      <Markers locations={visibleLocations} onSelect={onSelectLocation} />
    </MapContainer>
  )
}

function MapClickHandler({ onDeselect }: { onDeselect: () => void }) {
  useMapEvents({
    click: () => onDeselect(),
  })
  return null
}

type LabelBBox = { minX: number; maxX: number; minY: number; maxY: number }

function estimateLabelBBox(
  point: { x: number; y: number },
  text: string,
  category: Category,
): LabelBBox {
  const charWidth =
    category === 'accommodation' ? 7.2 : category === 'airport' ? 7.0 : 5.8
  const height = category === 'accommodation' ? 16 : 14
  const padding = 3
  const width = text.length * charWidth
  const size = markerSize(category)
  const top = point.y + size / 2 - 2
  return {
    minX: point.x - width / 2 - padding,
    maxX: point.x + width / 2 + padding,
    minY: top - padding,
    maxY: top + height + padding,
  }
}

function boxesOverlap(a: LabelBBox, b: LabelBBox): boolean {
  return a.minX < b.maxX && a.maxX > b.minX && a.minY < b.maxY && a.maxY > b.minY
}

function Markers({
  locations,
  onSelect,
}: {
  locations: Location[]
  onSelect: (id: string) => void
}) {
  const map = useMap()
  const [zoom, setZoom] = useState<number>(() => map.getZoom())
  useMapEvents({
    zoomend: (e) => setZoom(e.target.getZoom()),
  })

  const visibleLabelIds = useMemo(() => {
    const sorted = [...locations].sort(
      (a, b) => LABEL_PRIORITY[b.category] - LABEL_PRIORITY[a.category],
    )
    const placed: LabelBBox[] = []
    const visible = new Set<string>()
    for (const loc of sorted) {
      const isAnchor = ANCHOR_CATEGORIES.has(loc.category)
      if (!isAnchor && zoom < LABEL_ZOOM_THRESHOLD) continue
      const point = map.latLngToLayerPoint(loc.coords)
      const box = estimateLabelBBox(point, labelFor(loc), loc.category)
      if (placed.some((p) => boxesOverlap(p, box))) continue
      placed.push(box)
      visible.add(loc.id)
    }
    return visible
  }, [locations, zoom, map])

  return (
    <>
      {locations.map((location) => {
        const size = markerSize(location.category)
        const showLabel = visibleLabelIds.has(location.id)
        return (
          <Marker
            key={location.id}
            position={location.coords}
            icon={buildMarkerIcon(location)}
            eventHandlers={{
              click: (e) => {
                e.originalEvent?.stopPropagation?.()
                onSelect(location.id)
              },
            }}
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
