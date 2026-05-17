# Adding a drive route

Routes are dashed polylines drawn between waypoints, coloured by trip part.

## Where they live

`src/data/routes.ts` — one exported array of `DriveRoute` objects.

## Template

```ts
{
  id: 'route-lisbon-ericeira',
  tripId: 'west-coast',
  label: 'Lisbon → Ericeira',
  from: 'Lisbon',
  to: 'Ericeira',
  waypoints: [
    [38.7223, -9.1393],   // Lisbon
    [38.7876, -9.3905],   // Sintra
    [38.7806, -9.4989],   // Cabo da Roca
    [38.9794, -9.4178],   // Ericeira
  ],
  distanceKm: 70,
  driveTimeMinutes: 90,
  notes: 'Loop via Sintra and Cabo da Roca — adds ~30 min but worth it.',
}
```

## Waypoint guidance

- Keep it sparse: ~5–15 points is plenty. Leaflet smooths visually at zoom-out.
- Pick **shape-defining** points: highway turns, towns you'd actually pass through, viewpoints. Don't trace every road bend.
- For a long drive (Lisbon → Algarve, ~280 km), 4–6 points is enough.
- Pull coordinates from Google Maps. Right-click → "What's here?" → copy.
- Always `[lat, lng]`. Five decimal places.

## Picking `tripId`

The route's colour comes from its trip. Rules:

- The drive **between** Lisbon and the road-trip leg is `west-coast` (it's the start of the road trip).
- The drive **from the road trip down to the Algarve** is `algarve` (it's the entry into the Algarve leg).
- Day-trip loops from Lisbon city are `lisbon`.

## Distance / time

- `distanceKm` and `driveTimeMinutes` are optional but useful — they show up in
  any future route popup or summary.
- Use Google Maps' suggested time for the "current" routing (no traffic estimate
  for August yet). Round to the nearest 5 minutes.

## Renaming or splitting a route

- Don't reuse an `id` for a different route. Pick a fresh ID; remove the old entry.
- If a route is being split into two legs, give each leg its own ID. Update any
  references (if there are any — currently routes aren't referenced elsewhere).
