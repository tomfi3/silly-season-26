# Agent guides

Everything an agent needs to add content to the Silly Season '26 trip map
correctly and consistently.

> 👋 **If the user just shared a screenshot:** read [`from-screenshots.md`](from-screenshots.md) and match the screenshot to a file in [`screenshots/`](screenshots/). That's the most common workflow.
>
> 👋 **Otherwise, start with** [`content-conventions.md`](content-conventions.md). It applies to every type of edit.

## Guides

| File | When to read it |
| --- | --- |
| **[from-screenshots.md](from-screenshots.md)** | **When the user shares a screenshot.** Workflow + how schemas self-improve. |
| **[screenshots/](screenshots/)** | One file per type of screenshot (Booking.com, Skyscanner, Google Maps, etc.). Match → read → process. |
| [content-conventions.md](content-conventions.md) | Always. Universal rules for IDs, coordinates, photos, descriptions. |
| [trip-sections.md](trip-sections.md) | When choosing which `tripId` a new entry belongs to. |
| [adding-locations.md](adding-locations.md) | Manual location adds (not from a screenshot). Has templates for every category. |
| [adding-routes.md](adding-routes.md) | When adding a drive between two places. |
| [adding-flights.md](adding-flights.md) | When adding a flight or onboarding a new traveller. |
| [deployment.md](deployment.md) | When debugging the GitHub Pages build or moving the repo. |

## Workflow at a glance

```
1. Pick the right file in src/data/ for the type of content
2. Add the entry following the type definition in src/data/types.ts
3. Run `pnpm build` to confirm it type-checks and bundles cleanly
4. `pnpm dev` and verify the marker appears in the right place with the right colour
5. Commit with a clear message: "add: <thing>" or "update: <thing>"
```

## Don't

- Don't invent a new category. If a thing genuinely needs a new category, propose it before adding — every new category needs (a) a literal in `types.ts`, (b) a glyph in `icons.tsx`, (c) a popup branch in `LocationPopup.tsx`.
- Don't put raw colours, dates, or magic numbers inline in components. Tokens in `index.css` / data in `src/data/`.
- Don't commit photo binaries larger than ~250 KB. Compress first (`squoosh`, `tinypng`) and put under `public/photos/`.
- Don't add `description` fields longer than three sentences. The popup is small.

## Verifying before commit

```bash
pnpm build      # must pass — TS type-checks + Vite production build
pnpm dev        # eyeball the marker, click the popup, check colours
```
