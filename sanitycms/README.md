# Sanity Studio (`sanitycms/`)

Project `y6aoacvp`, dataset **`production`** (single dataset).

```powershell
npm install
npm run dev
```

Hosted Studio: https://sidebysideweb.sanity.studio

Seed (explicit flag required for production writes):

```powershell
npx sanity exec scripts/seed-v2.ts --with-user-token -- --force --dataset production
```

Full notes: [repo README](../README.md) and [REDESIGN.md](../REDESIGN.md).
