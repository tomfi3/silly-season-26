# Trip sections

The trip has three parts. Every location on the map belongs to exactly one
via its `tripId` field, and inherits that part's colour.

## The three parts

| `tripId` | Name | Colour token | Hex | Scope |
| --- | --- | --- | --- | --- |
| `lisbon` | Lisbon | `--color-trip-lisbon` | `#d946ef` (fuchsia) | Lisbon city + day trips reachable without committing to the road trip |
| `west-coast` | West Coast road trip | `--color-trip-westcoast` | `#f59e0b` (amber) | Everything from leaving Lisbon to arriving at Alvor — Comporta, Costa Vicentina, Aljezur, the SW corner (incl. Sagres + Cabo de São Vicente), Lagos |
| `algarve` | Algarve | `--color-trip-algarve` | `#14b8a6` (teal) | Based in Alvor and east — Silves, Seven Hanging Valleys, Tavira, Faro |

## Picking the right one

The cleanest rule for this trip:

> **The West Coast leg ends when we arrive at the Alvor accommodation.**
> Anywhere we visit before then is `west-coast`. From Alvor onwards (including day trips out of Alvor) is `algarve`.

That puts a few non-obvious places on the West Coast side of the line — they sit south of the Algarve "geographic" border but happen on a drive day before we check in:

- **Cabo de São Vicente, Fortaleza de Sagres**: `west-coast`. Visited on the Arrifana → Sagres → Alvor drive day.
- **Lagos**: `west-coast`. Same drive day, the lunch / stretch stop on the way east.
- **Costa Vicentina beaches & surf (Bordeira, Amado, Arrifana, Monte Clérigo, Odeceixe)**: `west-coast`. The whole road-trip leg.
- **Comporta / Porto Covo / Vila Nova de Milfontes**: `west-coast`. Stops on the Lisbon → Arrifana drive.

And on the Algarve side:

- **Silves, Tavira, Seven Hanging Valleys, Faro**: `algarve`. Day trips out of Alvor.

Other rules of thumb that still apply:

- **Sintra / Cabo da Roca**: `west-coast`. Road-trip route, even if reached as a day trip from Lisbon.
- **Caparica / sunsets near Lisbon**: `lisbon` if you'd realistically drive back to Lisbon that evening, `west-coast` if you'd overnight up the coast.

When in doubt, ask: *"Have we checked in at Alvor yet when I'd visit this?"* No → `west-coast`. Yes → `algarve`.

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
