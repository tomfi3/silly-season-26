# Booking.com — accommodation pricing / dates view

> The pricing tab on a Booking.com property page, or the date-selection / reservation summary view. Shows specific prices for specific dates.

## Visual signals

- Dark blue Booking.com header (same as info schema)
- A pricing **table** with:
  - Rows: room / unit types ("Studio", "1-bedroom apartment", etc.)
  - Columns or cells: "Number of guests", "Today's price" (often with a strikethrough original price), totals
- "Genius" badge (red diamond) or "Member price" pill on discounted rows
- Date pickers near the top showing selected check-in / check-out
- Blue **Reserve** button per row
- "Includes taxes and charges" or "Excludes €X city tax" small print

## What it tells you directly

| Field | Where it appears |
| --- | --- |
| Check-in / check-out dates | Date picker at the top |
| Number of guests | Guest selector at the top |
| Price for selected stay | Highlighted total per room type |
| Per-night price | Sometimes shown as "€X x N nights" |
| Currency | Usually EUR; check the selector top-right |
| Tax / city-tax notes | Fine print |
| Unit type (room / studio / apt) | Row label |

## What it suggests but doesn't confirm

| Field | Inference | How to verify |
| --- | --- | --- |
| Property name | Header / breadcrumb if visible | Cross-reference with the info-page schema if you have one |
| Property location | Not on this view | Use the info page or Google Maps |

## What's missing — needs web search

Pricing screenshots are almost always partnered with an info screenshot from
the same property. If only the pricing view exists:

| Field | Search strategy |
| --- | --- |
| `name`, `coords`, `description`, `amenities` | Process this as an UPDATE to an existing accommodation entry if one exists. Otherwise, ask the user for the property name / URL — pricing alone isn't enough to add a new entry. |

## Mapping to our types

Two cases.

### Case A — property already has an entry

Update its `pricePerNight`, `checkIn`, `checkOut`, `guests`. Leave `status`
as `'idea'` unless the user has already promoted it.

```ts
// Edit src/data/accommodation.ts in place
{
  id: 'acc-existing-id',
  // ... existing fields kept
  pricePerNight: { amount: 142, currency: 'EUR' },   // from screenshot
  checkIn: '2026-08-12',
  checkOut: '2026-08-16',
  guests: 3,
}
```

### Case B — property has no entry yet

Don't add it. Ask the user for the corresponding info screenshot or the
Booking.com URL. Pricing without an identifiable property is not actionable.

## Default status

`status: 'idea'`. Pricing screenshots are search-results artefacts, not
bookings. Promote to `'decided'` once the user picks this option, and
`'booked'` only when a confirmation screenshot follows.

## Computing per-night price

If the screenshot shows "€568 total for 4 nights, 3 guests":

```
pricePerNight: { amount: 142, currency: 'EUR' }   // 568 / 4
```

Round to whole units. If tax is shown separately, **exclude** it from
`pricePerNight` — note it in `description` if material.

## Learnings (append-only)

- When the pricing screenshot comes paired with an info screenshot (same property, same session), process them as one entry — extract `name`/address from the info shot, dates/price from the pricing shot. The "Beach&Surf Flat" + "Casa Rosa Alvor" pair was a clean example.
- Prices on the mobile Booking.com view default to the user's home currency ("Prices converted to GBP" banner near the top). Use the displayed currency rather than assuming EUR.
- The "Price for N nights (date — date)" line in the unit card is the most reliable place to read both the date range and the total — more reliable than the header date which can wrap on small screens.
