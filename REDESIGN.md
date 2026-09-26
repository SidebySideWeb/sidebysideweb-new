# Redesign v2 notes

## Branch
`redesign/v2` — do not merge to `main` until Release (§12).

## Phase 6 QA notes
- Horizontal process scroll uses `#hs` (must match `process-scroll.ts`).
- Contact form posts without JS → `/api/contact` → `?sent=1` (reCAPTCHA skipped on native posts; honeypot + rate limit still apply).
- Budget chips are scope labels, not euro amounts.
- `npm run build` warns on unfinished `[…]` strings in the active dataset.
- `npm run check:redirects -- <preview-url>` curls the Phase 5 legacy map.

## Sanity dataset
- Project: `y6aoacvp`
- Live CMS: `production` (Studio at https://sidebysideweb.sanity.studio)
- Branch/preview CMS: `redesign` (copy of production via export/import — plan has no `dataset copy`)

Local and Vercel preview for this branch should set:
```
PUBLIC_SANITY_DATASET=redesign
```

Production Vercel stays on `production` until release.

The Studio and the Sanity CLI now default to `redesign`:
`sanity.config.ts` and `sanity.cli.ts` both read `process.env.SANITY_STUDIO_DATASET ?? 'redesign'`.
**The production Studio deploy must set `SANITY_STUDIO_DATASET=production`.**

## Preview chrome
Phase 1 QA page: `/v2/` (noindex).

## Phase 2: v2 content model

Old v1 types stay registered and are reachable in the Studio under the **Legacy (v1)** group.
Nothing was deleted. New types that would have collided carry a `V2` suffix.

### Documents
| Type | Fixed seed IDs |
|---|---|
| `serviceV2` | `serviceV2-{discovery,architecture,build,cto,consulting,support,docs,pm,agency}` |
| `processStepV2` | `processStepV2-01` … `processStepV2-04` |
| `caseStudyV2` | `caseStudyV2-{kollekta,ftiaxesite,audit,erp,b2b}` |
| `testimonialV2` | `testimonialV2-placeholder` (`approved: false`) |

### Singletons
`siteSettingsV2`, `homePage`, `servicesPage`, `processPage`, `workPage`, `aboutPageV2`, `contactPage`
(document `_id` equals the type name).

### Objects
`seo`, `cta`, `headingLine` + `headingLinePart`, `fact`, `faqItem`, `valueCard`, `compareRow`,
`resultStat`, `docCard`, `bulletItem`, `linkItem`, `pageHero`, `bigCta`, `richTextV2`.

`richTextV2` decorators: `strong`, `em`, `highlight` (marigold), `strike` (manifesto), `thin` (weight 200).

All v2 strings are plain Greek (`string` / `text` / Portable Text). No `localeString` wrappers.
`serviceV2` has **no price fields**.

## Seeding

The seed is idempotent: existing documents are skipped unless `--force` is passed, and the
script refuses to write to `production` unless `--dataset production` is given explicitly.

```powershell
cd sanitycms
$env:SANITY_STUDIO_DATASET="redesign"   # windows
npm run seed:v2
```

Overwrite everything (replaces the 26 documents in place):

```powershell
npx sanity exec scripts/seed-v2.ts --with-user-token -- --force --dataset redesign
```

Seed content lives in `sanitycms/scripts/seed-v2-data.ts`, copied verbatim from
`reference/prototype.html`. Placeholders are kept as `[...]` so the build-time
placeholder warning can list them.
