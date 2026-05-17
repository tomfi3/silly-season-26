import type { Category, TripId } from '../data/types'
import { trips } from '../data/trips'
import { CATEGORY_LABELS, CategoryIcon } from './icons'

interface Props {
  activeTrips: Set<TripId>
  onToggleTrip: (id: TripId) => void
  activeCategories: Set<Category>
  onToggleCategory: (c: Category) => void
  open: boolean
  onToggleOpen: () => void
}

const CATEGORY_ORDER: Category[] = [
  'accommodation',
  'activity',
  'beach',
  'surf',
  'hike',
  'scenic',
  'restaurant',
  'airport',
]

/**
 * Floating legend / filter panel. Collapses to a compact bar on mobile;
 * tapping it expands the full list of trip + category toggles.
 */
export function Legend({
  activeTrips,
  onToggleTrip,
  activeCategories,
  onToggleCategory,
  open,
  onToggleOpen,
}: Props) {
  return (
    <div className="pointer-events-auto absolute left-3 top-3 z-[1000] flex max-w-[calc(100vw-1.5rem)] flex-col gap-2 rounded-2xl bg-white/95 p-3 shadow-[0_8px_24px_-8px_rgba(15,23,42,0.18)] backdrop-blur md:left-4 md:top-4 md:max-w-sm md:p-4">
      <button
        type="button"
        onClick={onToggleOpen}
        className="flex w-full items-center justify-between gap-2 text-left"
        aria-expanded={open}
      >
        <div className="min-w-0">
          <h1 className="truncate text-[15px] font-semibold leading-tight text-slate-900">
            Silly Season '26 — Portugal
          </h1>
          <p className="truncate text-[11px] text-slate-500">
            {summary(activeTrips, activeCategories)}
          </p>
        </div>
        <span className="ml-2 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600">
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 150ms' }}
            aria-hidden="true"
          >
            <path
              d="M3 6l5 5 5-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      {open && (
        <div className="space-y-3 pt-1">
          <section>
            <h2 className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              Trip parts
            </h2>
            <ul className="space-y-1">
              {trips.map((trip) => {
                const active = activeTrips.has(trip.id)
                return (
                  <li key={trip.id}>
                    <button
                      type="button"
                      onClick={() => onToggleTrip(trip.id)}
                      aria-pressed={active}
                      className={`flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left text-[13px] transition ${
                        active ? 'bg-slate-100' : 'opacity-50 hover:opacity-80'
                      }`}
                    >
                      <span
                        className="h-3 w-3 shrink-0 rounded-full"
                        style={{ background: trip.color }}
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-medium text-slate-900">{trip.name}</span>
                        <span className="block truncate text-[11px] text-slate-500">{trip.blurb}</span>
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </section>

          <section>
            <h2 className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              Categories
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {CATEGORY_ORDER.map((cat) => {
                const active = activeCategories.has(cat)
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => onToggleCategory(cat)}
                    aria-pressed={active}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[12px] transition ${
                      active
                        ? 'border-slate-900 bg-slate-900 text-white'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <CategoryIcon category={cat} size={12} />
                    {CATEGORY_LABELS[cat]}
                  </button>
                )
              })}
            </div>
          </section>
        </div>
      )}
    </div>
  )
}

function summary(activeTrips: Set<TripId>, activeCategories: Set<Category>): string {
  const tripCount = activeTrips.size
  const totalTrips = trips.length
  const catCount = activeCategories.size
  const totalCats = 8
  return `${tripCount}/${totalTrips} trip parts · ${catCount}/${totalCats} categories`
}
