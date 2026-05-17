# Trip sections

The trip has three parts. Every location on the map belongs to exactly one
via its `tripId` field, and inherits that part's colour.

## The three parts

| `tripId` | Name | Colour token | Hex | Scope |
| --- | --- | --- | --- | --- |
| `lisbon` | Lisbon | `--color-trip-lisbon` | `#6366f1` (indigo) | Lisbon city + day trips reachable without committing to the road trip |
| `west-coast` | West Coast road trip | `--color-trip-westcoast` | `#f59e0b` (amber) | Sintra, Ericeira, Peniche, Óbidos, Nazaré — anywhere on the road trip route |
| `algarve` | Algarve | `--color-trip-algarve` | `#f43f5e` (rose) | South coast, Lagos through Faro |

## Picking the right one

Most decisions are obvious from geography, but a few cases need a rule:

- **Sintra / Cabo da Roca**: `west-coast`. They sit on the road-trip route even though they're a day trip from Lisbon.
- **Caparica / Costa Vicentina sunsets near Lisbon**: `lisbon` if you'd realistically drive back to Lisbon that evening, `west-coast` if you'd overnight up the coast.
- **A spot near the Lisbon→Algarve drive (Évora, Comporta)**: `algarve` — they're stops on the way south, not separate.

When in doubt, ask the question: *"Which part of the trip am I most likely to be on when I visit this?"*

## Changing the colours

If you change a trip colour:

1. Update `color:` in `src/data/trips.ts`
2. Update the matching `--color-trip-*` token in `src/index.css`

The marker factory reads the value from `trips.ts`; the legend bullet uses the
same. Tokens in `index.css` are there for any future Tailwind classes that
reference them (`bg-trip-lisbon` etc.).

## Adding a new trip part

Don't, without confirming with the user first. If you must:

1. Add the literal to `TripId` in `src/data/types.ts`
2. Add the entry to `trips` in `src/data/trips.ts`
3. Add a `--color-trip-<id>` token in `src/index.css`
4. Add it to the `ALL_TRIPS` array in `src/App.tsx`
