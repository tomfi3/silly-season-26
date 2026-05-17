import { useMemo, useState } from 'react'
import { TripMap } from './components/TripMap'
import { BottomSheet, type SheetSnap } from './components/BottomSheet'
import { TripOverview } from './components/TripOverview'
import { LocationCard, BaseAreaCard } from './components/SheetCards'
import { allLocations, baseAreas } from './data'
import type { Category, TripId } from './data/types'

// Filters default to "show all" — the dedicated filter UI was retired in
// favour of the bottom sheet doing all the heavy lifting. Reintroduce if
// we end up needing to hide trip parts or categories.
const ALL_TRIPS: ReadonlySet<TripId> = new Set<TripId>(['lisbon', 'west-coast', 'algarve'])
const ALL_CATEGORIES: ReadonlySet<Category> = new Set<Category>([
  'accommodation',
  'activity',
  'beach',
  'surf',
  'hike',
  'scenic',
  'restaurant',
  'airport',
])

export type Selection =
  | { kind: 'location'; id: string }
  | { kind: 'baseArea'; id: string }
  | null

function App() {
  const [selection, setSelection] = useState<Selection>(null)
  const [sheetSnap, setSheetSnap] = useState<SheetSnap>('peek')

  // Selecting a marker keeps the sheet at whatever snap the user already
  // left it on (so switching from one card to another is seamless). Only
  // bumps a fully-peeked sheet up to half so the card is actually visible.
  const selectLocation = (id: string) => {
    setSelection({ kind: 'location', id })
    if (sheetSnap === 'peek') setSheetSnap('half')
  }

  const selectBaseArea = (id: string) => {
    setSelection({ kind: 'baseArea', id })
    if (sheetSnap === 'peek') setSheetSnap('half')
  }

  // Clearing (tapping the map background or the close button) pushes the
  // sheet back down to peek — mirrors how Apple Maps dismisses a place card.
  const clearSelection = () => {
    setSelection(null)
    setSheetSnap('peek')
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
    <div
      className="fixed left-0 right-0 overflow-hidden"
      style={{
        // Extend the stage up behind the iOS status bar. `viewport-fit=cover`
        // lets us paint there, but `top: 0` is still relative to the safe
        // area by default — so we pull the container up by the safe-area
        // inset and add the same amount back to its height.
        top: 'calc(env(safe-area-inset-top, 0px) * -1)',
        height: 'calc(100dvh + env(safe-area-inset-top, 0px))',
      }}
    >
      <TripMap
        activeTrips={ALL_TRIPS}
        activeCategories={ALL_CATEGORIES}
        onSelectLocation={selectLocation}
        onSelectBaseArea={selectBaseArea}
        onDeselect={clearSelection}
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
