# Content conventions

Universal rules for any data added to `src/data/`. These keep the map fast,
readable, and predictable.

## Status — idea / decided / booked

Every item on the map has an optional `status: 'idea' | 'decided' | 'booked'`.
Same field name on accommodation, flights, beaches, surf spots — everything.

| Status | Meaning | Marker | When to set |
| --- | --- | --- | --- |
| `idea` | Candidate. We're considering it but not committed. | Hollow pill, muted | Default for accommodation / activity / restaurant when added. Default for anything from a screenshot. |
| `decided` | We're definitely going there / staying there / doing this. | Solid trip-coloured pill | Once the user confirms a place is on the itinerary. |
| `booked` | Paid for / reserved with a booking reference. | Solid pill + green check overlay | Only when a real booking exists (`bookingRef` for accommodation, PNR for flights, reservation confirmation for restaurants). |

**Defaults when `status` is omitted** (see `resolveStatus` in `src/components/markerIcon.ts`):

- Accommodation / activity / restaurant → treated as `idea`
- Beach / surf / hike / scenic / airport → treated as `decided`

These defaults exist because a beach pin without explicit status is "a place we'd visit", not "tentative". Bookable categories work the other way — until someone says "yes, this one", they're ideas.

**`booked` is technically valid on any item** but only makes sense for bookable categories (accommodation, flight, activity, restaurant). Don't set `booked` on a beach or hike — there's nothing to book.

## IDs

## IDs

Every entry needs a unique `id`. Lowercase, kebab-case, prefixed by category.

| Category | Prefix | Example |
| --- | --- | --- |
| accommodation | `acc-` | `acc-lisbon-alfama-loft` |
| activity | `act-` | `act-fado-show-mesa-de-frades` |
| beach | `beach-` | `beach-praia-da-marinha` |
| surf | `surf-` | `surf-supertubos-peniche` |
| hike | `hike-` | `hike-rota-vicentina-segment-3` |
| scenic | `scenic-` | `scenic-miradouro-graca` |
| restaurant | `rest-` | `rest-cervejaria-ramiro` |
| airport | `apt-` | `apt-lis` |
| route | `route-` | `route-lisbon-ericeira` |
| flight | `fl-` | `fl-p1-out` |

> ⚠️ IDs are referenced from other files (e.g. flights reference traveller IDs).
> **Once committed, treat an ID as stable.** Renaming requires updating every reference.

## Coordinates

- Always `[lat, lng]` — Leaflet ordering.
- 5 decimal places (~1 metre precision). More is noise.
- Pull from Google Maps right-click → "What's here?" or OSM. Don't guess.
- Sanity check: Portugal latitude is roughly **36.9 – 42.0**, longitude **−9.5 – −6.2**. Anything outside is wrong.

## Descriptions

- One or two short sentences. The popup is ~280 px wide.
- Plain text only — markdown is not rendered.
- No exclamation marks. Tone is informative, not salesy.
- Don't repeat the name in the description.

Good:
> Cliff-backed Atlantic beach near Sintra. Rough surf, dramatic light at sunset.

Bad:
> 🌊 Praia da Adraga is amazing!!! You have to see it!!! One of the best beaches near Sintra!!!

## Photos

Each location optionally has a `photos: Photo[]`. The first photo is the popup hero.

- **Prefer hot-linking** to Wikipedia / Wikimedia Commons / tourism-board photos. Lighter on the repo, automatically updated.
- If you must commit, put the file under `public/photos/` and reference it as `./photos/your-file.jpg` in the URL.
- Compress before committing — under 250 KB.
- Always set a meaningful `caption` and a `credit` when known.

Example:

```ts
photos: [
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/.../Praia_da_Marinha.jpg/1280px-Praia_da_Marinha.jpg',
    caption: 'Praia da Marinha from the eastern viewpoint',
    credit: 'CC BY-SA / Wikimedia',
  },
]
```

## Links

External links should go to authoritative sources: the venue's site,
visitportugal.com, surfline (for surf), wikiloc/komoot (for hikes). Avoid
aggregator pages.

## Tags

Free-form. Use lowercase, kebab-case. Examples: `michelin`, `kid-friendly`,
`free`, `viewpoint`, `early-morning`. We may filter by these later.

## Don'ts

- **No emoji in text fields.** They render inconsistently across phones.
- **No HTML.** Descriptions are rendered as text.
- **No personal opinions presented as fact** ("the best beach in Portugal"). Phrase as "often described as…" if you must.
- **No prices in description.** Use the structured `pricePerNight` / `cost` fields so the popup formats them with the user's locale.
