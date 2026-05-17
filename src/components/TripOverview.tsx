import {
  accommodation,
  airports,
  baseAreas,
  flights,
  trips,
  getTraveller,
} from '../data'
import type {
  Accommodation,
  BaseArea,
  Flight,
  TripId,
} from '../data/types'
import { formatDate, formatDateTime, formatMoney } from '../utils/format'

interface Props {
  onSelectLocation: (id: string) => void
  onSelectBaseArea: (id: string) => void
}

/**
 * Default sheet content shown when nothing on the map is selected. Lays
 * out the whole trip at a glance — sections in chronological order so
 * a quick glance tells you what's happening when.
 */
export function TripOverview({ onSelectLocation, onSelectBaseArea }: Props) {
  const totalNights = baseAreas.reduce((sum, a) => sum + a.nights.length, 0)
  const allDates = baseAreas
    .flatMap((a) => a.nights)
    .sort((a, b) => a.localeCompare(b))
  const firstDate = allDates[0]
  const lastDate = allDates[allDates.length - 1]

  return (
    <div className="space-y-5 pt-1">
      <Stat label="Trip total" value={`${totalNights} nights · ${formatDate(firstDate)} → ${formatDate(lastDate)}`} />

      <Section title="Where we're based">
        <ul className="space-y-1.5">
          {baseAreas.map((area) => (
            <BaseAreaRow
              key={area.id}
              area={area}
              onSelect={() => onSelectBaseArea(area.id)}
            />
          ))}
        </ul>
      </Section>

      <Section title="Accommodation ideas">
        <ul className="space-y-1.5">
          {accommodation.map((a) => (
            <AccommodationRow
              key={a.id}
              acc={a}
              onSelect={() => onSelectLocation(a.id)}
            />
          ))}
        </ul>
      </Section>

      <Section title="Flights">
        {flights.length === 0 ? (
          <p className="text-[12px] text-slate-500">No flights yet.</p>
        ) : (
          <ul className="space-y-1.5">
            {flights.map((f) => (
              <FlightRow key={f.id} flight={f} />
            ))}
          </ul>
        )}
      </Section>
    </div>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section>
      <h3 className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
        {title}
      </h3>
      {children}
    </section>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 px-3 py-2.5">
      <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </div>
      <div className="text-[13px] font-medium text-slate-900">{value}</div>
    </div>
  )
}

function BaseAreaRow({ area, onSelect }: { area: BaseArea; onSelect: () => void }) {
  const trip = trips.find((t) => t.id === area.tripId)
  const color = trip?.color ?? '#64748b'
  const first = area.nights[0]
  const last = area.nights[area.nights.length - 1]
  const range = first === last ? formatDate(first) : `${formatDate(first)} → ${formatDate(last)}`
  return (
    <li>
      <button
        type="button"
        onClick={onSelect}
        className="flex w-full items-center gap-3 rounded-xl border border-slate-100 bg-white px-3 py-2.5 text-left hover:bg-slate-50"
      >
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
          style={{ background: `${color}1a`, color }}
        >
          {area.nights.length}N
        </span>
        <div className="min-w-0 flex-1">
          <div className="truncate text-[13px] font-semibold text-slate-900">
            {area.name}
          </div>
          <div className="truncate text-[11px] text-slate-500">{range}</div>
        </div>
        <ChevronRight />
      </button>
    </li>
  )
}

function AccommodationRow({
  acc,
  onSelect,
}: {
  acc: Accommodation
  onSelect: () => void
}) {
  const trip = trips.find((t) => t.id === acc.tripId)
  const color = trip?.color ?? '#64748b'
  const range =
    acc.checkIn && acc.checkOut
      ? `${formatDate(acc.checkIn)} → ${formatDate(acc.checkOut)}`
      : ''
  const price = formatMoney(acc.pricePerNight)
  const sub = [range, price && `${price}/N`, acc.status === 'idea' && 'Idea']
    .filter(Boolean)
    .join(' · ')
  return (
    <li>
      <button
        type="button"
        onClick={onSelect}
        className="flex w-full items-center gap-3 rounded-xl border border-slate-100 bg-white px-3 py-2.5 text-left hover:bg-slate-50"
      >
        <span
          className="h-2 w-2 shrink-0 rounded-full"
          style={{ background: color }}
          aria-hidden="true"
        />
        <div className="min-w-0 flex-1">
          <div className="truncate text-[13px] font-semibold text-slate-900">
            {acc.name}
          </div>
          <div className="truncate text-[11px] text-slate-500">{sub}</div>
        </div>
        <ChevronRight />
      </button>
    </li>
  )
}

function FlightRow({ flight }: { flight: Flight }) {
  const traveller = getTraveller(flight.travellerId)
  const fromAirport = airports.find((a) => a.iata === flight.from.code)
  const toAirport = airports.find((a) => a.iata === flight.to.code)
  const trip = trips.find((t) => t.id === (toAirport?.tripId ?? fromAirport?.tripId ?? ('lisbon' as TripId)))
  const accent = traveller?.color ?? trip?.color ?? '#64748b'
  return (
    <li className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white px-3 py-2.5">
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
        style={{ background: accent }}
      >
        {traveller?.initials ?? '?'}
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-[13px] font-semibold text-slate-900">
          {flight.from.code} → {flight.to.code}
          {flight.airline && (
            <span className="ml-1.5 text-[11px] font-medium text-slate-500">
              · {flight.airline}
            </span>
          )}
        </div>
        <div className="truncate text-[11px] text-slate-500">
          {formatDateTime(flight.departure)} → {formatDateTime(flight.arrival).split(' · ')[1]}
        </div>
      </div>
      {flight.cost && (
        <div className="shrink-0 text-[12px] font-semibold text-slate-700">
          {formatMoney(flight.cost)}
        </div>
      )}
    </li>
  )
}

function ChevronRight() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      className="shrink-0 text-slate-400"
      aria-hidden="true"
    >
      <path
        d="M6 3l5 5-5 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
