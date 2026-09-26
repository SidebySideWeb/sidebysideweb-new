# Redesign v2 notes

## Branch
`redesign/v2` — do not merge to `main` until Release (§12).

## Sanity dataset
- Project: `y6aoacvp`
- Live CMS: `production` (Studio at https://sidebysideweb.sanity.studio)
- Branch/preview CMS: `redesign` (copy of production via export/import — plan has no `dataset copy`)

Local and Vercel preview for this branch should set:
```
PUBLIC_SANITY_DATASET=redesign
```

Production Vercel stays on `production` until release.

## Preview chrome
Phase 1 QA page: `/v2/` (noindex).
