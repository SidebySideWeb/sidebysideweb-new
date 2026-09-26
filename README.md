# Side by Side — sidebysideweb.gr

Astro + Sanity monorepo for the live site. Redesign work happens on `redesign/v2` against the Sanity `redesign` dataset. Production stays on `main` + `production` until Release (§12 in `PROMPT.md`).

## Layout

| Path | Role |
|---|---|
| `web/` | Astro 7 site (Vercel SSR adapter) |
| `sanitycms/` | Sanity Studio + v2 schemas + seed |
| `reference/prototype.html` | Approved design source of truth |
| `REDESIGN.md` | Branch / dataset / seed notes |
| `PROMPT.md` | Full redesign brief |

## Environment (`web/.env`)

| Variable | Purpose |
|---|---|
| `PUBLIC_SANITY_PROJECT_ID` | Sanity project (`y6aoacvp`) |
| `PUBLIC_SANITY_DATASET` | `redesign` on this branch; `production` only at release |
| `SANITY_WRITE_TOKEN` | Contact form saves + seed writes |
| `SITE_URL` | Canonical origin (`https://www.sidebysideweb.gr`) |
| `PUBLIC_GTM_ID` | Google Tag Manager |
| `PUBLIC_RECAPTCHA_SITE_KEY` / `RECAPTCHA_SECRET_KEY` | Contact form |
| `CAL_COM_API_KEY` | Cal.com (kept from live) |
| `SANITY_STUDIO_URL` | Studio URL for docs / links |

Vercel preview for `redesign/v2` must set `PUBLIC_SANITY_DATASET=redesign`. Production Studio deploys must set `SANITY_STUDIO_DATASET=production`.

## Local development

```powershell
cd web
npm install
npm run dev
```

Studio (defaults to `redesign` dataset):

```powershell
cd sanitycms
npm install
npm run dev
```

Studio URL (hosted): https://sidebysideweb.sanity.studio

## Seed v2 content

Idempotent. Skips existing docs unless `--force`. Refuses `production` unless you pass `--dataset production` explicitly.

```powershell
cd sanitycms
$env:SANITY_STUDIO_DATASET="redesign"
npm run seed:v2
```

Force overwrite all 26 v2 docs:

```powershell
npx sanity exec scripts/seed-v2.ts --with-user-token -- --force --dataset redesign
```

## Build / preview

```powershell
cd web
npm run build
npm run preview
```

Build prints a `[placeholders]` warning for unfinished `[…]` strings in Sanity.

## Redirect check

Against a running local or preview URL:

```powershell
cd web
npm run check:redirects
npm run check:redirects -- https://your-preview.vercel.app
```

## Deploy

- Host: Vercel (`web/` as the project root, or monorepo root with `web` as the app directory — match the existing Vercel project).
- Branch previews deploy automatically.
- Do **not** merge `redesign/v2` → `main` until Phase 7 (Release). See `PROMPT.md` §12.
