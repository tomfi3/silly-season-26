# Airline website — flight booking confirmation

> A confirmation page or email from an airline (easyJet, Ryanair, TAP, BA, Vueling, etc.) showing a real booked flight with a PNR. This is the only screenshot type that promotes a flight from `option` to `booked`.

## Visual signals

Varies wildly by airline. Common across most:

- Strong airline branding (orange for easyJet, blue/yellow for Ryanair, red/white for TAP, navy for BA, yellow for Vueling)
- **Booking reference / PNR** prominently displayed — usually 6 alphanumeric characters (e.g. `K4F8M2`)
- "Booking confirmed" / "Reservation confirmation" / similar header
- Passenger names listed
- Flight legs with: flight number (e.g. `U28403`, `FR8231`, `TP1364`), date, route, scheduled departure / arrival, terminal (sometimes)
- Total fare paid, payment confirmation
- "Manage booking" / "Check in" CTAs

Email versions look slightly different from web versions but contain the same fields.

## What it tells you directly

| Field | Where |
| --- | --- |
| `bookingRef` | The PNR — always 6 characters, very visible |
| `airline` | Branding / "operated by" line |
| `flightNumber` | Per-leg label (IATA airline code + digits) |
| `from` / `to` | Per-leg route, with IATA codes |
| `departure` / `arrival` (date + local time) | Per-leg schedule |
| Passenger names (which traveller it's for) | Names section — match to `travellers.ts` by name |
| `cost` (total fare, often per booking not per pax) | Total at the bottom |

## What it suggests but doesn't confirm

| Field | Inference | How to verify |
| --- | --- | --- |
| Whether the cost is per passenger or total | Look for "Total" vs "Per passenger" labels. Multi-pax bookings usually show the total only. | Divide by passenger count if total is shown. |
| Outbound vs return | Usually labelled. If two legs are listed back-to-back, the first is outbound. | Check dates. |

## What's missing — needs web search

Rare for a confirmation screenshot — most fields are explicit.

| Field | Search strategy |
| --- | --- |
| Timezone offset for the dates | UK summer = `+01:00`, winter = `+00:00`. Portugal summer = `+01:00`, winter = `+00:00`. (Same offsets; both observe DST on the same dates.) |
| Airport in `airports.ts` (if a new one) | Add it — see [adding-flights.md](../adding-flights.md). |

## Mapping to our types

```ts
// Target: Flight
// Status: 'booked' (because we have a PNR)

{
  id: 'fl-<travellerId>-<out|ret>',     // can drop the airline suffix once booked
  travellerId: 'p1',
  direction: 'outbound',
  from: { code: 'LGW', name: 'London Gatwick' },
  to:   { code: 'LIS', name: 'Lisbon' },
  departure: '2026-08-12T07:25:00+01:00',
  arrival:   '2026-08-12T10:00:00+01:00',
  status: 'booked',
  airline: 'easyJet',
  flightNumber: 'U28403',
  bookingRef: 'K4F8M2',
  cost: { amount: 89, currency: 'GBP' },
}
```

## When this comes in

A confirmation screenshot usually arrives after one or more Skyscanner options
are already in `flights.ts`. Workflow:

1. Identify the matching option by airline + departure time.
2. Update it in place — set `status: 'booked'`, fill `bookingRef` and any
   previously-unknown `flightNumber`.
3. Remove the OTHER candidate options for the same traveller/direction (or
   move them to a commented-out block at the bottom of `flights.ts` if the
   user wants a record).
4. Commit with message: `book: <traveller> <direction> — <airline> <flightNumber>`.

## Default status

`status: 'booked'`. This is the *only* schema that defaults to booked.

## Learnings (append-only)

- _(empty)_
