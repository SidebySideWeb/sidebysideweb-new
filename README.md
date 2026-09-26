# Side by Side — sidebysideweb.gr

Astro + Sanity monorepo for the live site. One Sanity dataset: **`production`**.

## Layout

| Path | Role |
|---|---|
| `web/` | Astro 7 site (Vercel SSR adapter) |
| `sanitycms/` | Sanity Studio + schemas + seed |
| `reference/prototype.html` | Approved design source of truth |
| `REDESIGN.md` | Redesign / release notes |

## Environment (`web/.env`)

| Variable | Purpose |
|---|---|
| `PUBLIC_SANITY_PROJECT_ID` | Sanity project (`y6aoacvp`) |
| `PUBLIC_SANITY_DATASET` | Always `production` |
| `SANITY_WRITE_TOKEN` | Contact form saves + seed writes |
| `SITE_URL` | Canonical origin (`https://www.sidebysideweb.gr`) |
| `PUBLIC_GTM_ID` | Google Tag Manager |
| `PUBLIC_RECAPTCHA_SITE_KEY` / `RECAPTCHA_SECRET_KEY` | Contact form |
| `CAL_COM_API_KEY` | Cal.com |
| `SANITY_STUDIO_URL` | https://sidebysideweb.sanity.studio |

## Local development

```powershell
cd web
npm install
npm run dev
```

Studio:

```powershell
cd sanitycms
npm install
npm run dev
```

## Seed v2 content

Refuses `production` unless you pass `--dataset production` explicitly.

```powershell
cd sanitycms
npx sanity exec scripts/seed-v2.ts --with-user-token -- --force --dataset production
```

## Build / checks

```powershell
cd web
npm run build
npm run check:redirects -- https://www.sidebysideweb.gr
```

## Deploy

- Host: Vercel (`web/` app)
- Studio: `cd sanitycms; $env:SANITY_STUDIO_DATASET="production"; npx sanity deploy -y`
- Rollback: Vercel → previous production deployment → Promote. Dataset restore from local `backups/` if needed.
