# Google Maps — place card

> The detail panel for a single place on Google Maps — beach, surf spot, viewpoint, restaurant, hike trailhead, etc. Mobile and desktop variants differ slightly but contain the same fields.

## Visual signals

- Google Maps map in the background
- A panel (left sidebar on desktop, bottom sheet on mobile) for one place:
  - Place name as the header
  - Star rating (e.g. **4.6**) and total review count in brackets
  - Category tag underneath (e.g. "Beach", "Surf school", "Restaurant", "Hiking area", "Tourist attraction")
  - Photo carousel near the top
  - Address line
  - Hours (with green "Open" / red "Closed" status)
  - Phone number / website / "Directions" buttons
  - Reviews preview at the bottom
- URL contains coordinates: `…/@37.0902,-8.4127,17z/…` ← exact `[lat, lng]`

## What it tells you directly

| Field | Where |
| --- | --- |
| Place name | Header |
| Google's category | Subtitle under name |
| Address | Address line |
| Rating + review count | Top of panel |
| Photos | Carousel (don't commit Google's photos — see Learnings) |
| Hours / website / phone | Action row + info section |
| `coords` | **In the URL**, between `@` and `z`. Format: `lat,lng,zoom`. |

## What it suggests but doesn't confirm

| Field | Inference | How to verify |
| --- | --- | --- |
| Our `category` | Google's category usually maps cleanly | See mapping table below |
| `tripId` | Geographic location | See [trip-sections.md](../trip-sections.md) |
| `bestTime` (for scenic) / `bestFor` (for beach) | Review snippets sometimes hint | Skim top reviews if needed |

## Mapping Google categories → our `category`

| Google says | Our category |
| --- | --- |
| Beach | `beach` |
| Surf school / Surf spot / Surfing | `surf` |
| Hiking area / Trail | `hike` |
| Tourist attraction / Scenic spot / Viewpoint / Lookout | `scenic` |
| Restaurant / Café / Bar | `restaurant` |
| Hotel / Hostel / Vacation rental | `accommodation` |
| Museum / Gallery / Aquarium / Theme park | `activity` |
| Airport | `airport` |

If Google's category is ambiguous or doesn't match anything, ask the user.

## What's missing — needs web search

Most fields **are** in the screenshot. Common gaps:

| Field | Search strategy |
| --- | --- |
| Hero photo | Wikipedia first (`Praia da Marinha site:en.wikipedia.org`). Don't commit Google's photos — they're Maps user uploads. |
| Canonical Portuguese name (if Google shows an anglicised version) | Wikipedia / Portuguese tourism sites |
| `description` (1–2 sentences) | Wikipedia / visitportugal.com. Rewrite in our voice. |
| Category-specific fields (difficulty for hike, level for surf, etc.) | Wikiloc / Surfline / specialised guides |

## Mapping to our types

```ts
// Pick the right interface based on the category mapping above.
// Example for a beach:

{
  id: 'beach-<slug>',
  name: '<canonical name with Portuguese spelling>',
  category: 'beach',
  tripId: 'algarve',
  coords: [37.0902, -8.4127],     // from URL @ segment
  description: '<1–2 sentences>',
  bestFor: ['swimming', 'cliffs'],
  facilities: ['parking'],
  links: [{ label: 'Google Maps', url: '<URL bar value>' }],
}
```

## Getting coords from the URL

The Google Maps URL contains the map centre, which for a clicked place is its
pin coordinates:

```
https://www.google.com/maps/place/Praia+da+Marinha/@37.08962,-8.4127,17z/data=…
                                                  ^^^^^^^^^^^^^^^^^^
                                                  lat, lng, zoom
```

Round to 5 decimal places. If the URL isn't visible in the screenshot, ask
the user to share the URL too, or search Google Maps for the name yourself.

## Default status

Omit `status` for non-bookable categories (beach, surf, hike, scenic) — the
default behaviour renders these as `'decided'` ("we'd visit here"), which is
what you want for a curated list of places.

For bookable categories (restaurant, activity, accommodation), set
`status: 'idea'` until the user confirms it's part of the plan.

## Learnings (append-only)

- _(empty)_
