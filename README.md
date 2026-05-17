# Silly Season '26 — Portugal

Interactive map for planning a three-person Portugal trip: **Lisbon → West Coast
road trip → Algarve**. Mobile-first, shareable, lives on GitHub Pages.

## What's on the map

- Accommodation (considering / shortlisted / booked)
- Things to do
- Beaches, surf spots, hikes, scenic viewpoints, restaurants
- Airports and each traveller's flight times
- Drive routes between legs, dashed and colour-coded by trip part

Each marker opens a popup with photo, description, structured details and links.

## Quick start

```bash
pnpm install
pnpm dev
# open http://localhost:5173/silly-season-26/
```

## Adding content

**Read [`docs/agent-guides/`](docs/agent-guides/) first.** Every type of entry
has a template; the rules keep the codebase tidy as it grows.

Most common task: add a place you found.

1. Open `src/data/` and pick the right file (`beaches.ts`, `surf.ts`, etc.)
2. Add a new object following the template in [`docs/agent-guides/adding-locations.md`](docs/agent-guides/adding-locations.md)
3. `pnpm build` to confirm it type-checks
4. `pnpm dev` to eyeball the marker

## Deployment

Pushing to `main` builds and publishes to GitHub Pages automatically. See
[`docs/agent-guides/deployment.md`](docs/agent-guides/deployment.md).

## Stack

- React 19 + TypeScript + Vite 8
- Tailwind v4
- React-Leaflet + Leaflet (CARTO Voyager tiles, no API keys)
- GitHub Pages via GitHub Actions

## Repo layout

See [`CLAUDE.md`](CLAUDE.md).
