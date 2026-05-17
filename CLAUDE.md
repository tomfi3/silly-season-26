# CLAUDE.md — Agent instructions for Silly Season '26

You are an agent helping plan a three-person trip to Portugal. The deliverable is a
**shareable interactive map**, hosted on GitHub Pages, that anyone with the link can
open on their phone and explore.

The trip is split into three parts:

| Trip part | Colour | Where |
| --- | --- | --- |
| **Lisbon** | fuchsia `#d946ef` | City days, day trips out of town |
| **West Coast road trip** | amber `#f59e0b` | Sintra → Ericeira → Peniche → Nazaré |
| **Algarve** | teal `#14b8a6` | Beaches, caves, south coast |

Three travellers fly in/out at different times. The map shows accommodation,
things to do, beaches, surf spots, hikes, scenic spots, restaurants, drive routes
and airports.

---

## Most content arrives as screenshots

The user typically shares a Booking.com page, Skyscanner result, airline
confirmation, or Google Maps place card — and you turn it into an entry in
`src/data/`. There is a dedicated, self-evolving system for this:

- **[`docs/agent-guides/from-screenshots.md`](docs/agent-guides/from-screenshots.md)** — the end-to-end workflow (read this first when handed a screenshot)
- **[`docs/agent-guides/screenshots/`](docs/agent-guides/screenshots/)** — one schema file per known screenshot type. Each schema describes how to recognise the type, what fields are reliable, what to web-search, and how it maps to our data types. Agents **append to the schema's Learnings section** after every extraction so the system gets sharper over time.

If a screenshot doesn't fit any existing schema: **stop and propose a new one** to the user before processing — see the "Adding a new schema" section of `from-screenshots.md`.

Items from screenshots are almost always **options**, not confirmed plans. The
default for accommodation is `bookingStatus: 'considering'`; for flights,
`status: 'option'`. Only promote to `'booked'` when an actual confirmation /
PNR appears.

## Other guides

Read these as needed — they are the contract for how the codebase stays clean
and the map stays useful:

1. **[`docs/agent-guides/README.md`](docs/agent-guides/README.md)** — index of all guides
2. **[`docs/agent-guides/content-conventions.md`](docs/agent-guides/content-conventions.md)** — universal rules (coords precision, photos, descriptions, IDs)
3. **[`docs/agent-guides/trip-sections.md`](docs/agent-guides/trip-sections.md)** — the three trip parts and their colours
4. **[`docs/agent-guides/adding-locations.md`](docs/agent-guides/adding-locations.md)** — manual location adds (when you're not working from a screenshot)
5. **[`docs/agent-guides/adding-routes.md`](docs/agent-guides/adding-routes.md)** — how to add a drive route
6. **[`docs/agent-guides/adding-flights.md`](docs/agent-guides/adding-flights.md)** — flights / travellers structure
7. **[`docs/agent-guides/deployment.md`](docs/agent-guides/deployment.md)** — how the GitHub Pages deploy works

Always verify your change compiles before claiming you're done:

```bash
pnpm build
```

---

## Repository layout

```
silly-season-26/
├── src/
│   ├── App.tsx                     # Top-level — wires filters into the map
│   ├── main.tsx                    # React entry
│   ├── index.css                   # Tailwind import + Leaflet CSS + design tokens
│   ├── components/
│   │   ├── TripMap.tsx             # MapContainer + markers + routes
│   │   ├── Legend.tsx              # Filter / trip toggle panel
│   │   ├── LocationPopup.tsx       # Popup content per category
│   │   ├── markerIcon.ts           # divIcon factory (trip-coloured pills)
│   │   └── icons.tsx               # Inline SVG glyphs per category
│   ├── data/                       # CONTENT GOES HERE — typed TS files
│   │   ├── types.ts                # ⚠️ Source of truth for shapes
│   │   ├── trips.ts                # The 3 trip parts + colours
│   │   ├── travellers.ts           # The 3 of us
│   │   ├── flights.ts
│   │   ├── airports.ts
│   │   ├── accommodation.ts
│   │   ├── activities.ts
│   │   ├── beaches.ts
│   │   ├── surf.ts
│   │   ├── hikes.ts
│   │   ├── scenic.ts
│   │   ├── restaurants.ts
│   │   ├── routes.ts               # Drive route polylines
│   │   └── index.ts                # Barrel — aggregates allLocations
│   └── utils/
│       └── format.ts               # Money + date formatting
├── docs/
│   └── agent-guides/               # 📘 READ THESE BEFORE EDITING DATA
├── public/                         # Static assets (favicons, photos)
├── .github/workflows/deploy.yml    # Builds + publishes to GitHub Pages
├── vite.config.ts                  # `base` MUST match the repo name
├── tailwind / postcss configs are inline (Tailwind v4 plugin)
└── package.json
```

## Tech stack

- **React 19** + **TypeScript** + **Vite 8**
- **Tailwind v4** via the `@tailwindcss/vite` plugin (`@import "tailwindcss"` in `index.css`)
- **React-Leaflet 5** + **Leaflet 1.9** for the map
- **CARTO Voyager** tiles (no API key)
- **GitHub Pages** for hosting — built by GitHub Actions on push to `main`

## Mobile use

A lot of edits will happen via Claude Code on mobile — slower at file reads
and web searches. Optimise: one screenshot per turn, read the schema once,
batch web searches, use `// TODO verify on desktop` comments rather than
blocking on a hard-to-resolve field. Commit after each screenshot.

## Rules of the road

1. **Never add a raw hex colour for trip parts** — use the value in `src/data/trips.ts`. If you change a trip colour, also update the matching `--color-trip-*` token in `src/index.css`.
2. **Coordinates are `[lat, lng]`** (Leaflet ordering). Use 5 decimal places.
3. **Every new content item needs a unique `id`** — lowercase, kebab-case, prefixed by category (`acc-`, `act-`, `beach-`, `surf-`, `hike-`, `scenic-`, `rest-`, `apt-`).
4. **Photos**: prefer hot-linking the source (Wikipedia, official tourism boards) over committing binaries. If you commit a photo, put it in `public/photos/` and use `./photos/foo.jpg` as the URL.
5. **Keep popups short** — one or two sentences. Detail belongs in linked sources.
6. **No `any`** — every entry conforms to a type in `src/data/types.ts`.
7. **Commit after each logical unit** (one trip's beaches, one route, etc.) so diffs stay reviewable.
8. **Don't push to `main`** unless the user explicitly tells you to. PRs target `main` only on instruction; otherwise work on a feature branch.

## Quick commands

```bash
pnpm install        # install deps
pnpm dev            # local dev server on http://localhost:5173/silly-season-26/
pnpm build          # type-check + production build into dist/
pnpm preview        # preview the production build locally
```
