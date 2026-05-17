# Adding a location

Every pin on the map is one entry in one of the typed `src/data/*.ts` files.
This guide shows the canonical shape for each category.

> **Before you start:** read [`content-conventions.md`](content-conventions.md) for the universal rules (IDs, coords, photos, descriptions).

## Step-by-step

1. **Pick the file** by category:
   | Category | File |
   | --- | --- |
   | accommodation | `src/data/accommodation.ts` |
   | activity | `src/data/activities.ts` |
   | beach | `src/data/beaches.ts` |
   | surf | `src/data/surf.ts` |
   | hike | `src/data/hikes.ts` |
   | scenic | `src/data/scenic.ts` |
   | restaurant | `src/data/restaurants.ts` |
   | airport | `src/data/airports.ts` |
2. **Append** an object to the exported array. Don't reorder existing entries.
3. **Fill the required fields** (`id`, `name`, `category`, `tripId`, `coords`).
4. **Fill optional fields** you actually have data for — leave the rest off.
5. `pnpm build` — must pass.
6. `pnpm dev` — verify the marker shows in the right place and the popup looks right.

## Templates

### Accommodation

```ts
{
  id: 'acc-lisbon-alfama-loft',
  name: 'Alfama loft',
  category: 'accommodation',
  tripId: 'lisbon',
  coords: [38.7115, -9.1294],
  description: 'Two-bed loft with terrace, five minutes from Largo das Portas do Sol.',
  pricePerNight: { amount: 165, currency: 'EUR' },
  checkIn: '2026-08-12',
  checkOut: '2026-08-16',
  guests: 3,
  status: 'idea',          // 'idea' | 'decided' | 'booked' — see content-conventions.md
  bookingRef: undefined,   // only set when status === 'booked'
  amenities: ['wifi', 'aircon', 'terrace'],
  links: [{ label: 'Airbnb listing', url: 'https://www.airbnb.com/rooms/...' }],
}
```

- `status: 'idea'` → hollow muted pill. `status: 'decided'` → solid pill. `status: 'booked'` → solid pill with a green check overlay. Use these to scan the map for what's confirmed vs to-do.

### Activity

```ts
{
  id: 'act-fado-night',
  name: 'Fado at Mesa de Frades',
  category: 'activity',
  tripId: 'lisbon',
  coords: [38.7137, -9.1265],
  description: 'Intimate fado venue in a tiled chapel. Two sets per night.',
  durationHours: 2.5,
  cost: { amount: 65, currency: 'EUR' },
  bookingRequired: true,
  date: '2026-08-13',     // optional — only set if pinned to a specific day
  links: [{ label: 'Mesa de Frades', url: 'https://www.mesadefrades.pt/' }],
}
```

### Beach

```ts
{
  id: 'beach-praia-da-marinha',
  name: 'Praia da Marinha',
  category: 'beach',
  tripId: 'algarve',
  coords: [37.0902, -8.4127],
  description: 'Honeycomb cliffs and clear water. Walk down 200 steps from the car park.',
  bestFor: ['swimming', 'snorkelling', 'cliffs'],
  facilities: ['parking'],
}
```

### Surf spot

```ts
{
  id: 'surf-supertubos',
  name: 'Supertubos',
  category: 'surf',
  tripId: 'west-coast',
  coords: [39.3478, -9.3753],
  description: 'Powerful beach break. WSL contest venue. For confident surfers only.',
  level: 'advanced',
  breakType: 'beach',
  bestSwellDirection: 'W / NW',
}
```

### Hike

```ts
{
  id: 'hike-seven-hanging-valleys',
  name: 'Seven Hanging Valleys',
  category: 'hike',
  tripId: 'algarve',
  coords: [37.0934, -8.4250],
  description: 'Coastal cliff trail from Praia da Marinha east to Vale Centeanes.',
  distanceKm: 11,
  durationHours: 4,
  difficulty: 'moderate',     // 'easy' | 'moderate' | 'hard'
  elevationGainM: 300,
}
```

### Scenic

```ts
{
  id: 'scenic-miradouro-graca',
  name: 'Miradouro da Graça',
  category: 'scenic',
  tripId: 'lisbon',
  coords: [38.7156, -9.1305],
  description: 'Pine-shaded terrace with a wide view across the city to the castle.',
  bestTime: 'sunset',        // 'sunrise' | 'morning' | 'midday' | 'sunset' | 'night'
}
```

### Restaurant

```ts
{
  id: 'rest-cervejaria-ramiro',
  name: 'Cervejaria Ramiro',
  category: 'restaurant',
  tripId: 'lisbon',
  coords: [38.7224, -9.1351],
  description: 'Lisbon institution for seafood. Expect a queue.',
  cuisine: 'Seafood',
  priceLevel: 3,             // 1–4 (€ to €€€€)
  reservationRequired: false,
}
```

### Airport

```ts
{
  id: 'apt-opo',
  name: 'Porto Francisco Sá Carneiro',
  iata: 'OPO',
  category: 'airport',
  tripId: 'lisbon',      // pick the trip part the airport feeds, even if not perfect
  coords: [41.2481, -8.6814],
  description: 'Porto airport. Cheap easyJet routes from UK.',
}
```

## Markers — what gets rendered

The marker pill is the **trip colour**, the icon inside is the **category glyph**.
Accommodation with `bookingStatus !== 'booked'` renders as a hollow ring instead
of a filled pill — that's the one variant you can rely on at a glance.

If you need a marker variant for any other state, raise it with the user — we'd
add it as an explicit field on the type rather than hacking it into description.
