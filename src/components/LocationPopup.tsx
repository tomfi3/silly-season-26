import type { Location } from '../data/types'
import { getTrip } from '../data/trips'
import { CATEGORY_LABELS, CategoryIcon } from './icons'
import { formatDate, formatMoney } from '../utils/format'

interface Props {
  location: Location
}

/**
 * Popup body for a single location. Rendered inside Leaflet's <Popup>.
 *
 * Branches on category to show the right fields. Keep this dense and
 * readable on a phone — the popup is ~280px wide.
 */
export function LocationPopup({ location }: Props) {
  const trip = getTrip(location.tripId)
  const hero = location.photos?.[0]

  return (
    <article className="text-[13px] leading-snug text-slate-800">
      {hero ? (
        <div className="relative h-32 w-full overflow-hidden rounded-t-[14px] bg-slate-200">
          <img
            src={hero.url}
            alt={hero.caption ?? location.name}
            loading="lazy"
            className="h-full w-full object-cover"
          />
          {hero.credit && (
            <span className="absolute bottom-1 right-1 rounded bg-black/55 px-1.5 py-0.5 text-[10px] text-white">
              {hero.credit}
            </span>
          )}
        </div>
      ) : null}

      <div className="px-3.5 pb-3 pt-3">
        <header className="mb-1.5 flex items-start gap-2">
          <span
            className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white"
            style={{ background: trip.color }}
            aria-hidden="true"
          >
            <CategoryIcon category={location.category} size={13} />
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-[15px] font-semibold leading-tight text-slate-900">
              {location.name}
            </h3>
            <p className="mt-0.5 text-[11px] uppercase tracking-wide text-slate-500">
              {CATEGORY_LABELS[location.category]} · {trip.name}
            </p>
          </div>
        </header>

        {location.description && (
          <p className="mb-2 text-slate-700">{location.description}</p>
        )}

        <CategoryDetails location={location} />

        {location.links && location.links.length > 0 && (
          <ul className="mt-2 space-y-1">
            {location.links.map((link) => (
              <li key={link.url}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1 text-indigo-600 hover:underline"
                >
                  {link.label}
                  <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  )
}

function CategoryDetails({ location }: { location: Location }) {
  switch (location.category) {
    case 'accommodation':
      return (
        <FactGrid
          items={[
            ['Status', location.bookingStatus ?? '—'],
            ['Price / night', formatMoney(location.pricePerNight)],
            ['Check-in', formatDate(location.checkIn)],
            ['Check-out', formatDate(location.checkOut)],
            ['Guests', location.guests],
            ['Booking ref', location.bookingRef],
          ]}
        />
      )
    case 'activity':
      return (
        <FactGrid
          items={[
            ['Duration', location.durationHours ? `${location.durationHours} h` : ''],
            ['Cost', formatMoney(location.cost)],
            ['Date', formatDate(location.date)],
            ['Booking', location.bookingRequired ? 'Required' : ''],
          ]}
        />
      )
    case 'beach':
      return (
        <FactGrid
          items={[
            ['Best for', location.bestFor?.join(', ')],
            ['Facilities', location.facilities?.join(', ')],
          ]}
        />
      )
    case 'surf':
      return (
        <FactGrid
          items={[
            ['Level', location.level],
            ['Break', location.breakType],
            ['Swell', location.bestSwellDirection],
          ]}
        />
      )
    case 'hike':
      return (
        <FactGrid
          items={[
            ['Distance', location.distanceKm ? `${location.distanceKm} km` : ''],
            ['Duration', location.durationHours ? `${location.durationHours} h` : ''],
            ['Difficulty', location.difficulty],
            ['Climb', location.elevationGainM ? `${location.elevationGainM} m` : ''],
          ]}
        />
      )
    case 'scenic':
      return <FactGrid items={[['Best time', location.bestTime]]} />
    case 'restaurant':
      return (
        <FactGrid
          items={[
            ['Cuisine', location.cuisine],
            ['Price', location.priceLevel ? '€'.repeat(location.priceLevel) : ''],
            ['Reservation', location.reservationRequired ? 'Required' : ''],
          ]}
        />
      )
    case 'airport':
      return <FactGrid items={[['IATA', location.iata]]} />
  }
}

type FactValue = string | number | undefined | null

function FactGrid({ items }: { items: [string, FactValue][] }) {
  const filtered = items.filter(([, v]) => v !== undefined && v !== null && v !== '')
  if (filtered.length === 0) return null
  return (
    <dl className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[12px]">
      {filtered.map(([label, value]) => (
        <div key={label} className="min-w-0">
          <dt className="text-[10px] uppercase tracking-wide text-slate-500">{label}</dt>
          <dd className="truncate text-slate-800">{String(value)}</dd>
        </div>
      ))}
    </dl>
  )
}
