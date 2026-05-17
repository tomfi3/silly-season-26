import { useMemo, useState } from 'react'
import { TripMap } from './components/TripMap'
import { Legend } from './components/Legend'
import { BottomSheet, type SheetSnap } from './components/BottomSheet'
import { TripOverview } from './components/TripOverview'
import { LocationCard, BaseAreaCard } from './components/SheetCards'
import { allLocations, baseAreas } from './data'
import type { Category, TripId } from './data/types'

const ALL_TRIPS: TripId[] = ['lisbon', 'west-coast', 'algarve']
const ALL_CATEGORIES: Category[] = [
  'accommodation',
  'activity',
  'beach',
  'surf',
  'hike',
  'scenic',
  'restaurant',
  'airport',
]

export type Selection =
  | { kind: 'location'; id: string }
  | { kind: 'baseArea'; id: string }
  | null

function App() {
  const [activeTrips, setActiveTrips] = useState<Set<TripId>>(
    () => new Set(ALL_TRIPS),
  )
  const [activeCategories, setActiveCategories] = useState<Set<Category>>(
    () => new Set(ALL_CATEGORIES),
  )
  const [legendOpen, setLegendOpen] = useState(false)
  const [selection, setSelection] = useState<Selection>(null)
  const [sheetSnap, setSheetSnap] = useState<SheetSnap>('peek')

  const toggleTrip = (id: TripId) => {
    setActiveTrips((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const toggleCategory = (c: Category) => {
    setActiveCategories((prev) => {
      const next = new Set(prev)
      next.has(c) ? next.delete(c) : next.add(c)
      return next
    })
  }

  const selectLocation = (id: string) => {
    setSelection({ kind: 'location', id })
    if (sheetSnap === 'peek') setSheetSnap('half')
  }

  const selectBaseArea = (id: string) => {
    setSelection({ kind: 'baseArea', id })
    if (sheetSnap === 'peek') setSheetSnap('half')
  }

  const clearSelection = () => {
    setSelection(null)
  }

  const selected = useMemo(() => {
    if (!selection) return null
    if (selection.kind === 'location') {
      return {
        kind: 'location' as const,
        location: allLocations.find((l) => l.id === selection.id),
      }
    }
    return {
      kind: 'baseArea' as const,
      area: baseAreas.find((a) => a.id === selection.id),
    }
  }, [selection])

  const peek =
    selected?.kind === 'location' && selected.location ? (
      <PeekRow
        title={selected.location.name}
        subtitle={selected.location.description ?? ''}
        onClear={clearSelection}
      />
    ) : selected?.kind === 'baseArea' && selected.area ? (
      <PeekRow
        title={selected.area.name}
        subtitle={`${selected.area.nights.length} nights · base area`}
        onClear={clearSelection}
      />
    ) : (
      <OverviewPeek />
    )

  return (
    <div className="fixed inset-0 overflow-hidden">
      <TripMap
        activeTrips={activeTrips}
        activeCategories={activeCategories}
        onSelectLocation={selectLocation}
        onSelectBaseArea={selectBaseArea}
        onDeselect={clearSelection}
      />
      <Legend
        activeTrips={activeTrips}
        onToggleTrip={toggleTrip}
        activeCategories={activeCategories}
        onToggleCategory={toggleCategory}
        open={legendOpen}
        onToggleOpen={() => setLegendOpen((o) => !o)}
      />

      <BottomSheet snap={sheetSnap} onSnapChange={setSheetSnap} peek={peek}>
        {selected?.kind === 'location' && selected.location ? (
          <LocationCard location={selected.location} />
        ) : selected?.kind === 'baseArea' && selected.area ? (
          <BaseAreaCard area={selected.area} />
        ) : (
          <TripOverview
            onSelectLocation={selectLocation}
            onSelectBaseArea={selectBaseArea}
          />
        )}
      </BottomSheet>
    </div>
  )
}

function OverviewPeek() {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="min-w-0">
        <div className="truncate text-[15px] font-semibold leading-tight text-slate-900">
          Silly Season '26
        </div>
        <div className="truncate text-[12px] text-slate-500">
          Tap to see trip parts, nights, accommodation, flights
        </div>
      </div>
    </div>
  )
}

function PeekRow({
  title,
  subtitle,
  onClear,
}: {
  title: string
  subtitle: string
  onClear: () => void
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <div className="truncate text-[15px] font-semibold leading-tight text-slate-900">
          {title}
        </div>
        <div className="line-clamp-1 text-[12px] text-slate-500">{subtitle}</div>
      </div>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onClear()
        }}
        onPointerDown={(e) => e.stopPropagation()}
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
        aria-label="Close"
      >
        <svg width="12" height="12" viewBox="0 0 16 16" aria-hidden="true">
          <path
            d="M4 4l8 8M12 4l-8 8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  )
}

export default App
