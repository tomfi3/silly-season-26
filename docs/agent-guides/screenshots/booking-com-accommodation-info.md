# Booking.com — accommodation info page

> The property detail page on Booking.com — photo carousel, description, amenities, map. **Not** the pricing/dates view ([see that schema](booking-com-accommodation-pricing.md)).

## Visual signals

- **Header / chrome:**
  - Dark blue Booking.com bar with white "Booking.com" wordmark, top-left
  - "Sign in" / language / currency controls top-right
- **Primary content area:**
  - Large property name as H1
  - Star rating (yellow stars) and "Hotel" / "Apartment" / "Villa" type label
  - Address line with a small pin icon under the name
  - Photo grid / carousel filling most of the upper half
  - Tabbed nav: Overview · Info & prices · Facilities · House rules · Guest reviews
- **Distinguishing features:**
  - Yellow/green review score badge with single-decimal score (e.g. **8.6**) and word ("Very good") + total review count
  - Blue "Reserve" or "See availability" CTA
  - Map embed with a single pin
  - Amenities row with icons (wifi, pool, parking, etc.)

## What it tells you directly

| Field | Where it appears |
| --- | --- |
| Property name | H1 at top |
| Property type (hotel / apartment / villa) | Subtitle under name |
| Star rating | Yellow stars under name |
| Address (free text) | Under name, with pin icon |
| Amenities (list) | Icon row + "Most popular facilities" section |
| Review score | Coloured badge, top of reviews section |
| Photos | Carousel (don't commit them — see Learnings) |

## What it suggests but doesn't confirm

| Field | Inference | How to verify |
| --- | --- | --- |
| Approximate location | Map embed | Use the search bar in Google Maps with the property name to get exact `[lat, lng]` |
| Price range | "From €X per night" if shown | Use the pricing-view screenshot (separate schema) for confirmed numbers |

## What's missing — needs web search

| Field | Search strategy |
| --- | --- |
| `coords` (5 dp) | Google Maps: search property name → right-click pin → "What's here?" |
| Hero photo | Wikipedia / Wikimedia Commons (for landmark properties), or the property's own website. **Do not** screenshot/copy Booking.com photos — their TOS prohibits it. |
| Canonical name | Property's own website / Google Maps result |
| `description` | One or two sentences distilled from the property site or Wikipedia, in our own words |
| `bookingRef`, `checkIn`, `checkOut`, `guests` | Only present if user shows a confirmation — usually not on the info page |

## Mapping to our types

```ts
// Target: Accommodation
// Default: status: 'idea' (candidate, not committed)

{
  id: 'acc-<short-slug>',
  name: '<canonical name>',
  category: 'accommodation',
  tripId: '<inferred from city/area>',
  coords: [0, 0],                 // ← web-search this
  description: '<1–2 sentences>',
  pricePerNight: { amount: 0, currency: 'EUR' },   // optional — leave off if not seen
  guests: undefined,
  status: 'idea',
  amenities: ['wifi', 'aircon', 'pool'],
  links: [{ label: 'Booking.com', url: '<from URL bar if visible>' }],
}
```

## Default status

`status: 'idea'`. Promote to `'decided'` if the user says "let's go with this
one", or `'booked'` if they later share a confirmation with a `bookingRef`.

## Learnings (append-only)

- Mobile property page shows the address as plain text under the title (no pin icon on phones). Free-form address + property name is enough to find exact coords via a Google Maps search.
- Vale da Telha addresses on Booking.com only give the urbanisation block (e.g. "Sector B Bloco Q Fração L") rather than a street — that's fine for a marker, the urbanisation centroid is close enough.
- "Recommended for N adults" line under the title confirms `guests` reliably; use it rather than inferring from bed counts.
