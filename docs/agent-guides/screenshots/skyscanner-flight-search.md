# Skyscanner — flight search results

> Skyscanner search-results page or app screen showing a list of flight options. **Not** a confirmation — those come from airline sites ([see schema](airline-flight-booking.md)).

## Visual signals

- Skyscanner blue / dark header with the magnifying-glass + plane logo
- Search summary bar at the top: From / To / Date / Pax / Cabin
- Tabs: **Best · Cheapest · Fastest**
- Stacked flight cards, each containing:
  - Airline logo (often coloured) and name
  - **Outbound** strip: departure time → arrival time, duration, "Direct" or "1 stop"
  - **Return** strip (if round-trip): same layout
  - Price on the right, large
  - "Select" / blue CTA button
- Filter sidebar on desktop (price slider, stops, times, airlines)

## What it tells you directly

| Field | Where |
| --- | --- |
| Origin / destination airports (codes or full names) | Search bar; sometimes truncated on mobile |
| Date(s) | Search bar |
| Number of passengers | Search bar |
| Airline | Card row |
| Outbound departure / arrival times | Card |
| Return departure / arrival times | Card |
| Direct / N stops | Card |
| Duration | Card |
| Price (per passenger, usually) | Card |
| Currency | Inferred from the user's local view — usually GBP if Tom searched, EUR if a Portugal-based view |

## What it suggests but doesn't confirm

| Field | Inference | How to verify |
| --- | --- | --- |
| Flight number | Sometimes shown on hover/expand; missing from most card views | Click through to the airline site to confirm |
| Specific terminal | Not shown | Skip until booking |
| Per-passenger vs total price | Skyscanner usually shows per pax for searches; "Total" if explicitly labelled | Look for "per adult" / "total" labels |
| Timezone offset | Skyscanner shows local time at each airport | Departures: use origin TZ; arrivals: use destination TZ |

## What's missing — needs web search

| Field | Search strategy |
| --- | --- |
| IATA codes (if only city names shown) | `<city> airport IATA` or the airline's own route page |
| Airport `coords` | Already in `src/data/airports.ts` if it's a Portugal airport. If a new airport — add it (see [adding-flights.md](../adding-flights.md)). |
| `flightNumber` | Airline's site / Flightradar24. Not strictly required for option-status flights. |

## Mapping to our types

```ts
// Target: Flight
// Default status: 'option'

{
  id: 'fl-<travellerId>-<out|ret>-<airline-suffix>',  // e.g. 'fl-p1-out-easyjet'
  travellerId: 'p1',                  // ask the user which traveller this is for
  direction: 'outbound',              // or 'return'
  from: { code: 'LGW', name: 'London Gatwick' },
  to:   { code: 'LIS', name: 'Lisbon' },
  departure: '2026-08-12T07:25:00+01:00',
  arrival:   '2026-08-12T10:00:00+01:00',
  status: 'option',
  airline: 'easyJet',
  flightNumber: undefined,             // often not on Skyscanner — leave off
  cost: { amount: 89, currency: 'GBP' },
}
```

## ID convention for multiple options

When tracking several candidate flights for the same traveller + direction,
disambiguate the ID with an airline / time suffix:

```
fl-p1-out-easyjet-0725
fl-p1-out-tap-1310
```

Once the user picks one, demote the others (delete or move to a commented-out
block at the bottom of `flights.ts`).

## Default status

`status: 'option'`. Promote to `'booked'` only on an airline confirmation
screenshot with a PNR.

## Learnings (append-only)

- _(empty)_
