import type {
  BaseArea,
  Location,
  LocationStatus,
} from '../data/types'
import { trips } from '../data/trips'
import { CATEGORY_LABELS, CategoryIcon } from './icons'
import { formatDate, formatMoney } from '../utils/format'

const STATUS_LABEL: Record<LocationStatus, string> = {
  idea: 'Idea',
  decided: 'Decided',
  booked: 'Booked',
}

const STATUS_STYLE: Record<LocationStatus, string> = {
  idea: 'border-slate-300 bg-white text-slate-600',
  decided: 'border-slate-900 bg-slate-900 text-white',
  booked: 'border-emerald-700 bg-emerald-600 text-white',
}

/**
 * Apple Maps-style detail card for a selected map location. Used inside
 * the BottomSheet, so it fills the available width rather than being
 * constrained to a 280px popup balloon.
 *
 * Layout, top to bottom:
 *   - Hero photo (if any), 16:9-ish
 *   - Title row with category icon + status badge
 *   - Sub-line: category · trip part
 *   - Key facts grid (per-category)
 *   - Description
 *   - Links
 */
export function LocationCard({ location }: { location: Location }) {
  const trip = trips.find((t) => t.id === location.tripId)
  const tripColor = trip?.color ?? '#64748b'
  const hero = location.photos?.[0]
  const status = location.status

  return (
    <article className="text-slate-800">
      {hero && (
        <div className="relative -mx-4 mb-3 h-48 overflow-hidden bg-slate-200">
          <img
            src={hero.url}
            alt={hero.caption ?? location.name}
            loading="lazy"
            className="h-full w-full object-cover"
          />
          {hero.credit && (
            <span className="absolute bottom-1.5 right-1.5 rounded bg-black/55 px-1.5 py-0.5 text-[10px] text-white">
              {hero.credit}
            </span>
          )}
        </div>
      )}

      <header className="mb-2 flex items-start gap-2.5">
        <span
          className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white"
          style={{ background: tripColor }}
          aria-hidden="true"
        >
          <CategoryIcon category={location.category} size={14} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h2 className="min-w-0 flex-1 text-[17px] font-semibold leading-tight text-slate-900">
              {location.name}
            </h2>
            {status && (
              <span
                className={`inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${STATUS_STYLE[status]}`}
              >
                {status === 'booked' && (
                  <svg width="9" height="9" viewBox="0 0 8 8" aria-hidden="true">
                    <path
                      d="M1.5 4.2 3.2 5.8 6.5 2.4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
                {STATUS_LABEL[status]}
              </span>
            )}
          </div>
          <p className="mt-0.5 text-[11px] uppercase tracking-wide text-slate-500">
            {CATEGORY_LABELS[location.category]}
            {trip && ` · ${trip.name}`}
          </p>
        </div>
      </header>

      <CategoryFacts location={location} />

      {location.description && (
        <p className="mt-3 text-[13px] leading-snug text-slate-700">
          {location.description}
        </p>
      )}

      {location.links && location.links.length > 0 && (
        <ul className="mt-3 space-y-1">
          {location.links.map((link) => (
            <li key={link.url}>
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1 text-[13px] text-indigo-600 hover:underline"
              >
                {link.label}
                <span aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}

/**
 * Apple Maps-style detail card for a selected base area circle. Shows the
 * area metadata up top and the per-night list with weekdays.
 */
export function BaseAreaCard({ area }: { area: BaseArea }) {
  const trip = trips.find((t) => t.id === area.tripId)
  const color = trip?.color ?? '#64748b'

  return (
    <article className="text-slate-800">
      <header className="mb-3 flex items-start gap-2.5">
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-white"
          style={{ background: color }}
        >
          {area.nights.length}N
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-[17px] font-semibold leading-tight text-slate-900">
            {area.name}
          </h2>
          <p className="mt-0.5 text-[11px] uppercase tracking-wide text-slate-500">
            {trip?.name ?? 'Base area'} · base area
          </p>
        </div>
      </header>

      {area.description && (
        <p className="mb-3 text-[13px] leading-snug text-slate-700">
          {area.description}
        </p>
      )}

      <h3 className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
        Nights here
      </h3>
      <ul className="space-y-1">
        {area.nights.map((iso) => (
          <li
            key={iso}
            className="flex items-center gap-2.5 rounded-lg border border-slate-100 bg-white px-3 py-2 text-[13px]"
          >
            <span
              className="h-2 w-2 shrink-0 rounded-full"
              style={{ background: color }}
              aria-hidden="true"
            />
            <span className="font-medium text-slate-800">{formatDate(iso)}</span>
          </li>
        ))}
      </ul>
    </article>
  )
}

interface FactGridItem {
  label: string
  value: string | number | null | undefined
}

function FactGrid({ items }: { items: FactGridItem[] }) {
  const filtered = items.filter(
    (i) => i.value !== undefined && i.value !== null && i.value !== '',
  )
  if (filtered.length === 0) return null
  return (
    <dl className="grid grid-cols-2 gap-x-3 gap-y-2 rounded-xl bg-slate-50 px-3 py-2.5 text-[13px]">
      {filtered.map((i) => (
        <div key={i.label} className="min-w-0">
          <dt className="text-[10px] uppercase tracking-wide text-slate-500">
            {i.label}
          </dt>
          <dd className="truncate font-medium text-slate-900">
            {String(i.value)}
          </dd>
        </div>
      ))}
    </dl>
  )
}

function CategoryFacts({ location }: { location: Location }) {
  switch (location.category) {
    case 'accommodation':
      return (
        <FactGrid
          items={[
            { label: 'Price / night', value: formatMoney(location.pricePerNight) },
            { label: 'Check-in', value: formatDate(location.checkIn) },
            { label: 'Check-out', value: formatDate(location.checkOut) },
            { label: 'Guests', value: location.guests },
            { label: 'Booking ref', value: location.bookingRef },
          ]}
        />
      )
    case 'activity':
      return (
        <FactGrid
          items={[
            {
              label: 'Duration',
              value: location.durationHours ? `${location.durationHours} h` : '',
            },
            { label: 'Cost', value: formatMoney(location.cost) },
            { label: 'Date', value: formatDate(location.date) },
            { label: 'Booking', value: location.bookingRequired ? 'Required' : '' },
          ]}
        />
      )
    case 'beach':
      return (
        <FactGrid
          items={[
            { label: 'Best for', value: location.bestFor?.join(', ') },
            { label: 'Facilities', value: location.facilities?.join(', ') },
          ]}
        />
      )
    case 'surf':
      return (
        <FactGrid
          items={[
            { label: 'Level', value: location.level },
            { label: 'Break', value: location.breakType },
            { label: 'Swell', value: location.bestSwellDirection },
          ]}
        />
      )
    case 'hike':
      return (
        <FactGrid
          items={[
            {
              label: 'Distance',
              value: location.distanceKm ? `${location.distanceKm} km` : '',
            },
            {
              label: 'Duration',
              value: location.durationHours ? `${location.durationHours} h` : '',
            },
            { label: 'Difficulty', value: location.difficulty },
            {
              label: 'Climb',
              value: location.elevationGainM ? `${location.elevationGainM} m` : '',
            },
          ]}
        />
      )
    case 'scenic':
      return (
        <FactGrid items={[{ label: 'Best time', value: location.bestTime }]} />
      )
    case 'restaurant':
      return (
        <FactGrid
          items={[
            { label: 'Cuisine', value: location.cuisine },
            {
              label: 'Price',
              value: location.priceLevel ? '€'.repeat(location.priceLevel) : '',
            },
            {
              label: 'Reservation',
              value: location.reservationRequired ? 'Required' : '',
            },
          ]}
        />
      )
    case 'airport':
      return <FactGrid items={[{ label: 'IATA', value: location.iata }]} />
  }
}
