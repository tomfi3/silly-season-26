# Adding flights and travellers

Three of us fly in and out at different times. Each traveller has flights tied
to their ID; the airport pins on the map show all three travellers' incoming
and outgoing connections.

## Travellers — `src/data/travellers.ts`

```ts
{ id: 'p1', name: 'Tom',         initials: 'T', color: '#0ea5e9' },
{ id: 'p2', name: 'Traveller 2', initials: '2', color: '#10b981' },
{ id: 'p3', name: 'Traveller 3', initials: '3', color: '#a855f7' },
```

- `id` is referenced from `flights.ts`. Treat it as stable.
- Rename via `name` and `initials` once you know who's who.
- `color` is the traveller's personal accent. Pick anything distinct from the
  trip colours (no indigo / amber / rose).

## Flights — `src/data/flights.ts`

```ts
{
  id: 'fl-p1-out',
  travellerId: 'p1',
  direction: 'outbound',           // 'outbound' | 'return'
  from: { code: 'LGW', name: 'London Gatwick' },
  to:   { code: 'LIS', name: 'Lisbon' },
  departure: '2026-08-12T07:25:00+01:00',
  arrival:   '2026-08-12T10:00:00+01:00',
  airline: 'easyJet',
  flightNumber: 'U28403',
  bookingRef: 'ABC123',
  cost: { amount: 89, currency: 'GBP' },
}
```

### Field rules

- **`id`**: `fl-<travellerId>-<out|ret>` — e.g. `fl-p2-ret`.
- **`departure` / `arrival`**: ISO 8601 with timezone offset. Use the **local** offset (London: `+01:00` summer, `+00:00` winter; Portugal: `+01:00` summer). The popup formats local time as written.
- **`from` / `to`**: full airport name in `name`, IATA in `code`. If the airport isn't in `src/data/airports.ts`, **add it there too** — airports are pinned on the map and the flight popup looks them up by IATA.
- **`bookingRef`**: only set when actually booked.
- **`cost`**: GBP for UK departures, EUR for Portugal departures. Locale-agnostic — the UI formats it.

## Adding a new traveller (a fourth person joining)

1. Add an entry to `travellers.ts` with a fresh ID (`p4`).
2. Add their flights with `fl-p4-out`, `fl-p4-ret`.
3. Pick a `color` that isn't already used.

Don't reorder existing travellers — flights reference them by ID.

## Adding a new airport

Add to `src/data/airports.ts` with an `apt-<iata>` ID, IATA code, lat/lng, and
a short description. Flights will pick it up automatically.

```ts
{
  id: 'apt-opo',
  name: 'Porto Francisco Sá Carneiro',
  iata: 'OPO',
  category: 'airport',
  tripId: 'lisbon',
  coords: [41.2481, -8.6814],
}
```
