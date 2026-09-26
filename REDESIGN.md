# Redesign v2 notes

Released to `main`. Single Sanity dataset: **`production`**.

## Phase 7 release (done)

- Backed up production to local `backups/production-*.tar.gz` (gitignored)
- Copied 26 v2 docs from temporary `redesign` → `production` via `scripts/migrate-v2-to-production.ts`
- Merged `redesign/v2` → `main`
- `redesign` dataset removed after consolidation

## Sanity

- Project: `y6aoacvp`
- Dataset: `production` only
- Studio: https://sidebysideweb.sanity.studio

```
PUBLIC_SANITY_DATASET=production
```

Studio / CLI default to `production` (`sanity.config.ts`, `sanity.cli.ts`).

## Rollback

1. Vercel → previous production deployment → Promote to Production
2. Dataset (only if needed): `npx sanity dataset import ../backups/production-YYYYMMDD.tar.gz production --replace`

## v2 content model

Old v1 types stay registered under **Legacy (v1)** in the Studio.

### Documents
| Type | Fixed seed IDs |
|---|---|
| `serviceV2` | `serviceV2-{discovery,architecture,build,cto,consulting,support,docs,pm,agency}` |
| `processStepV2` | `processStepV2-01` … `processStepV2-04` |
| `caseStudyV2` | `caseStudyV2-{kollekta,ftiaxesite,audit,erp,b2b}` |
| `testimonialV2` | `testimonialV2-placeholder` (`approved: false`) |

### Singletons
`siteSettingsV2`, `homePage`, `servicesPage`, `processPage`, `workPage`, `aboutPageV2`, `contactPage`

## Seeding

```powershell
cd sanitycms
npx sanity exec scripts/seed-v2.ts --with-user-token -- --force --dataset production
```

Seed content: `sanitycms/scripts/seed-v2-data.ts`.
