# Deployment

The map lives at:

```
https://<github-user>.github.io/silly-season-26/
```

It's built by GitHub Actions on every push to `main` and published to GitHub
Pages. There is no separate hosting bill, no API keys, no secrets — public
tiles only.

## How it works

1. Push to `main` triggers `.github/workflows/deploy.yml`.
2. The workflow installs deps with pnpm, runs `pnpm build`, and uploads `dist/`.
3. GitHub Pages serves the uploaded artefact.

The `base` path in `vite.config.ts` (`/silly-season-26/`) MUST match the repo
name — otherwise asset URLs 404.

## First-time setup (one-off)

When the repo is first created:

1. **Settings → Pages** → set **Source** to **GitHub Actions**.
2. Push to `main`. The first workflow run takes ~1–2 min.
3. After the first successful deploy, the URL appears in the Pages settings.

If you renamed the repo:

- Update `base:` in `vite.config.ts` to match the new repo name.
- Update the URL in the `CLAUDE.md` and `README.md`.

## Local preview of the production build

```bash
pnpm build
pnpm preview
# → http://localhost:4173/silly-season-26/
```

This is the truest test of "will this work on GitHub Pages" — same `base`, same
bundling.

## Debugging a broken deploy

- **Workflow failed**: check the **Actions** tab on GitHub. The TypeScript step
  is the usual suspect — `pnpm build` locally to reproduce.
- **Page loads but assets 404**: `base` in `vite.config.ts` doesn't match the
  repo name, OR you used absolute `/foo.png` paths in code (use `./foo.png` or
  Vite's `import` syntax).
- **Map tiles don't load**: CARTO blocking; switch to an alternative in
  `src/components/TripMap.tsx`. OSM standard tiles are a safe fallback.
- **Old version cached**: GitHub Pages serves with short TTL, but browsers cache
  hard. Force-refresh on mobile (Safari: long-press the reload button).

## Branching

- Work on feature branches.
- Open PRs into `main`.
- `main` is the live branch — keep it green.

Do **not** force-push to `main`.
