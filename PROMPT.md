# Cursor prompt: sidebysideweb.gr on Astro + Sanity

> For the **existing, live** sidebysideweb.gr repo. Copy `reference/` and `.cursor/rules/sidebyside.mdc` into the repo root (if `.cursor/rules/` already exists, just add the file). Then paste everything below the line into Cursor (Agent mode).

---

You are redesigning the **live** production website of **Side by Side** (sidebysideweb.gr), a one-person senior technical partner for Greek businesses and agencies. **This repository is the live site.** A finished, approved design prototype exists. Your job is to rebuild the front end **pixel-faithfully** from it in Astro, with all content editable in **Sanity Studio**, without breaking production or losing SEO.

## ⚠️ Existing project rules (read first, they override anything below)

1. **Do not work on `main`.** Create branch `redesign/v2` and commit per phase with clear messages.
2. **Phase 0 is an audit, no code changes.** Before anything else, report back:
   - Current stack and versions (Astro? Sanity already set up? Studio embedded or separate? adapter, host, package manager, Node version).
   - Every current public URL (read the routes, the sitemap and any redirects). Produce a table old URL → new URL for §2.
   - Current Sanity: project ID, datasets, existing schema types, how many documents per type, and which existing content (e.g. case studies, services, SEO fields) should be migrated rather than re-seeded.
   - Current integrations to keep: analytics, cookie banner, contact form handler, email provider, forms, tracking pixels, env vars, webhooks, deploy hooks.
   - Anything in the prompt below that conflicts with what already exists. For each conflict, propose: reuse the existing thing, or replace it (with reason). **Prefer reusing** existing setup (host, adapter, email provider, analytics, Studio location) unless it blocks the design.
   Stop and wait for my OK after Phase 0.
3. **Sanity data safety.**
   - Never delete or overwrite existing documents in the production dataset.
   - Create a new dataset `redesign` (copy of `production` via `sanity dataset copy`) and point the branch at it with env vars. Build and seed there.
   - New schema types must not reuse the `_type` names of existing types unless they are a deliberate migration. For migrations, write a migration script (`sanity/migrations/`) that is idempotent, has a dry-run mode, and never runs against `production` without an explicit `--dataset production` flag.
   - The seed script (§5) must skip documents that already exist unless run with `--force`.
4. **Keep what works:** existing env vars names, analytics, consent banner, favicons (replace with the new logo files), `robots.txt` rules, verification meta tags (Google Search Console etc.).
5. **SEO continuity:** every old URL gets a 301 to its new URL (or keeps its path if the page stays). Keep existing page titles/descriptions as SEO field values in Sanity where no new ones exist. Keep structured data that already exists.
6. **Preview before release:** every phase must build and deploy to a preview URL (Vercel preview or the current host's equivalent). Production is only touched in the Release phase (§12).


## 0. Source of truth

- `reference/prototype.html` is the approved design. It is a single-file SPA (hash routing, `[data-page]` sections, inline CSS and JS). Read it fully before writing code. Reproduce its layout, typography, colours, spacing, copy and **every animation and interaction**. Do not "improve" or restyle it.
- `reference/*.svg` are the official logo files.
- `.cursor/rules/sidebyside.mdc` holds the brand rules. Follow them in every file.
- All user-facing copy is **Greek** (`<html lang="el">`), monotonic accents, no em dashes in running text.

## 1. Stack (target; adapt to what Phase 0 found)

- **Astro** (latest stable), TypeScript strict, `output: 'static'` with an adapter only for the contact endpoint (see §7). Target host: Vercel (keep it adapter-agnostic where possible).
- **Sanity**: latest Studio + `@sanity/astro` integration + `@sanity/client` + `@portabletext/to-html` (or `astro-portabletext`). Embed the Studio at `/studio` via `studioBasePath` (needs `@astrojs/react`, used **only** for the Studio). If embedding causes build problems, move the Studio to a `studio/` folder in the same repo and document it.
- **No front-end framework** on public pages. Interactions are small vanilla TS modules in `src/scripts/`, loaded per component with `<script>` in `.astro` files.
- Fonts self-hosted via Fontsource: `@fontsource-variable/commissioner` (must include the Greek subset) and `@fontsource/jetbrains-mono` (400, 500). Remove the Google Fonts links from the prototype.
- `@astrojs/sitemap`. Page transitions with Astro `<ClientRouter />` (View Transitions).
- Package manager: pnpm. Node 20+.

## 2. Routes (replace the prototype's hash routes)

| Prototype hash | Route | Sanity source |
|---|---|---|
| `#home` | `/` | `homePage` singleton |
| `#services` | `/ypiresies` | `servicesPage` + `service` docs |
| `#process` | `/pos-doulevo` | `processPage` + `processStep` docs |
| `#work` | `/erga` | `workPage` + `caseStudy` docs |
| `#case-<id>` | `/erga/[slug]` | `caseStudy` |
| `#about` | `/poios-eimai` | `aboutPage` |
| `#contact` | `/epikoinonia` | `contactPage` |

Also: `404.astro` in the same style, `robots.txt`, sitemap, and 301 redirects from any old URLs I list later (leave a `redirects` object in `astro.config`).

## 3. Project structure

```
src/
  layouts/Base.astro            # <head>, SEO, fonts, header, mobile menu, footer, cursor, progress bar, ClientRouter
  components/
    Header.astro  MobileMenu.astro  Footer.astro  Logo.astro  Eyebrow.astro  Button.astro (variants: m, g, p, i, sm; bars icon)
    Hero.astro (canvas field, swap word, facts)  Marquee.astro  Manifesto.astro  ValueCards.astro
    ServiceRows.astro  ServiceCard.astro  PartnerBand.astro  ProcessScroller.astro  CompareToggle.astro
    CaseCard.astro  CaseArt.astro (the 5 generative SVGs, keyed by artKey)  CaseDetail sections
    DocCards.astro (BRD/FSD/RFP)  Timeline.astro  Faq.astro  Testimonial.astro  BigCta.astro
    ContactForm.astro  CopyBox.astro  PageHero.astro  Placeholder.astro
  scripts/  field.ts  swap.ts  counters.ts  process-scroll.ts  compare.ts  magnetic.ts  tilt.ts  cursor.ts  header.ts  copy.ts  work-filter.ts  manifesto.ts  contact.ts
  styles/   tokens.css  global.css  (port the prototype CSS; split per component with scoped <style> where sensible)
  lib/      sanity.ts (client, typed GROQ queries)  portable-text.ts  placeholder.ts  seo.ts
  pages/    index.astro  ypiresies.astro  pos-doulevo.astro  erga/index.astro  erga/[slug].astro  poios-eimai.astro  epikoinonia.astro  api/contact.ts  404.astro
sanity/
  schemaTypes/  (see §4)  structure.ts  (singletons pinned at top, grouped lists)
  seed/  seed.ts  (see §5)
```

Scripts must survive Astro view transitions: initialise on `astro:page-load`, clean up listeners/RAF on `astro:before-swap`. Everything respects `prefers-reduced-motion` exactly as the prototype does.

## 4. Sanity content model

Every text the prototype shows must come from Sanity. Nothing hard-coded except UI chrome (aria labels, "Αντιγραφή", etc.).

**Reusable objects**
- `seo`: title, description, ogImage.
- `cta`: label, link (internal reference or URL), variant (`m | g | p | i`).
- `richText`: Portable Text with marks `strong`, `em`, `link`, plus custom decorators `highlight` (marigold text), `strike` (the struck-through word in the manifesto), `thin` (weight 200 in hero lines).
- `headingLines`: array of lines; each line has text + optional style (`normal | thin | marigold`). Used by every big headline so the line-by-line entrance animation keeps working.
- `fact`: value (number), prefix, suffix, label. (Counters animate from 0 to value.)
- `faqItem`, `valueCard` (kicker, title, text, bigGlyph), `compareRow` (question, typicalAnswer, ourAnswer), `result` (value string, label).

**Singletons** (one document each, pinned in the Studio structure)
- `siteSettings`: brand name, tagline, email, LinkedIn URL, legal line (ΑΦΜ etc.), primary nav items, header CTA, footer columns, endorsed products list, default SEO.
- `homePage`: hero (eyebrow, headingLines, swapPrefix/swapWords[]/swapSuffix, ctas[], facts[4]), marqueeTop[], marqueeBottom[], manifesto (eyebrow, richText), values[3], servicesSection (eyebrow, heading, intro, references to services in order), partnerBand (eyebrow, heading + highlighted part, text, bullets[{title,text}], ctas), processSection (eyebrow, heading, cta), compareSection (eyebrow, heading, intro, leftLabel, rightLabel, rows[]), featuredCases (refs, first is wide), testimonial (ref), faq (eyebrow, heading, items[]), bigCta, seo.
- `servicesPage`: hero, services (ordered refs), docsSection (eyebrow, heading, intro, docCards[{code, title, text, audience}]), techStack (eyebrow, heading, items[]), bigCta, seo.
- `processPage`: hero, steps (refs to `processStep`), rules section (eyebrow, heading, rules[valueCard]), bigCta, seo.
- `workPage`: hero, filter labels, seo.
- `aboutPage`: hero, portrait image (with alt; show the dashed placeholder when empty), bio (richText), ctas, rolesSection (eyebrow, heading, intro, roles[{title,text}]), productsSection (heading, case refs), seo.
- `contactPage`: hero, form labels + placeholders, needOptions[], budgetOptions[], privacy note, success message, "what happens next" steps[{title,text}], seo.

**Documents**
- `service`: title, slug, order, index label, badge (e.g. "Εδώ ξεκινούν οι περισσότεροι"), shortDescription (for home rows), description, bullets[], metaLabel (e.g. "6–8 εβδομάδες", "ανά έργο"), metaNote, variant (`default | featured | wide`), category (`core | docs | pm | agency`).
  **No price fields.** Prices are never shown on the site.
- `processStep`: number, title, duration label, summary (home scroller), description (process page), deliverables[], card colour (`ink | paper | marigold | ink2`), chips[].
- `caseStudy`: name, slug, kind (`product | client`), tag, sector, headline, short, role, duration, stack[], problem/approach/solution (richText), results[], artKey (`kollekta | site | audit | erp | b2b`), optional coverImage (if set, replaces the generative art), isPlaceholder (shows the yellow "Placeholder" note), reviewNote (optional text for the "Προς έλεγχο" note), order, seo.
- `testimonial`: quote, name, role, company, approved (boolean; only approved ones render; if none, render the dashed placeholder block exactly like the prototype).
- `faq` can live inline in pages as `faqItem[]` (no separate doc type needed).

Add Studio **previews** with icons, validation (required fields, max lengths for headlines), and `orderRank` or a numeric `order` for manual sorting.

## 5. Seed the content

Write `sanity/seed/seed.ts` that creates **all** documents with the exact Greek copy currently in `reference/prototype.html`: all 9 services, 4 process steps, 5 case studies (including the `[Χ]` placeholders and the 2 client placeholders), FAQ, compare rows, values, doc cards, marquee items, contact options, etc. Run with `pnpm seed` using `SANITY_API_WRITE_TOKEN`. It must be idempotent (`createOrReplace` with fixed `_id`s). After seeding, the Astro site must look identical to the prototype.

## 6. Placeholders

The prototype marks unfinished content with `[square brackets]` rendered as yellow mono chips (`.ph`). Implement `lib/placeholder.ts` that wraps any `[...]` in plain strings or Portable Text spans with `<span class="ph">`. In production builds, log a build warning listing every page that still contains a placeholder.

## 7. Contact form

- `src/pages/api/contact.ts` with `export const prerender = false` (Vercel adapter, hybrid).
- Validate server side (name, email, message required; needs[] and budget optional). Honeypot field + simple time-to-submit check.
- Send the email with Resend (`RESEND_API_KEY`, `CONTACT_TO`) and also create a `contactSubmission` document in Sanity (read-only in the Studio, listed newest first).
- Client side: progressive enhancement. Without JS the form posts and redirects to a thank-you state. With JS it submits via `fetch` and shows the success block from the prototype. Accessible error messages next to each field.

## 8. Publishing flow

- Static build. Create a Sanity webhook on publish → Vercel deploy hook, document it in the README.
- Optional phase 2 (do not block on it): Sanity Presentation tool / Visual Editing with draft mode.

## 9. SEO and performance

- Per-page `seo` with fallbacks to `siteSettings`. Canonical URLs, Open Graph, Twitter cards, `lang="el"`, `og:locale=el_GR`.
- JSON-LD: `ProfessionalService` (site-wide), `Service` for each service, `FAQPage` where FAQ renders, `BreadcrumbList` on case studies.
- Lighthouse on mobile: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO 100. The canvas field must pause when off screen or the tab is hidden (already in the prototype logic).
- Images from Sanity via `@sanity/image-url` with width/height, `srcset`, lazy loading except above the fold.

## 10. How to work

Work in phases and stop after each phase with a short summary, the preview URL and what I need to check:

0. Audit (see "Existing project rules"). No code changes.
1. Upgrade/prepare Astro + Sanity in place, tokens, fonts, Base layout, header, footer, mobile menu, cursor, progress bar, view transitions.
2. Sanity schemas + Studio structure + seed script. Run the seed.
3. Home page, section by section, compared against the prototype at 1280px and 390px.
4. Services, Process, Work, Case study template, About, Contact pages.
5. Contact API, SEO, sitemap, JSON-LD, 404, redirects.
6. QA: visual diff against the prototype, reduced-motion pass, keyboard pass, Lighthouse, broken-link check, redirect check for every old URL, README.
7. Release (see §12).

## 11. Acceptance checklist

- [ ] Every page matches the prototype at 390px, 768px and 1280px+.
- [ ] Every animation works: canvas bar field, scramble word, both marquees, manifesto word fill, value card hover, service row fill, horizontal process scroll (sticky, vertical stack on mobile), compare toggle, case card tilt, magnetic buttons, custom cursor (pointer:fine only), counters, scroll reveals with `@supports` fallback, footer bar drop, page transitions.
- [ ] `prefers-reduced-motion: reduce` disables motion as in the prototype.
- [ ] No horizontal scroll at any width.
- [ ] All copy editable in Sanity; changing a service title in the Studio and publishing updates the site after rebuild.
- [ ] No prices anywhere on the public site.
- [ ] Contact form works with and without JS, and saves to Sanity.
- [ ] README: env vars, `pnpm dev`, `pnpm seed`, Studio URL, deploy hook setup.

## 12. Release plan

1. Freeze content: I review everything in the `redesign` dataset in the Studio and fill the `[placeholders]` (a build warning lists them).
2. Migrate content to `production`: either run the migration/seed against `production` (with `--dataset production`, after a `sanity dataset export production` backup), or switch the site to the `redesign` dataset by env var. Recommend one, with reasons.
3. Deploy schema to production (`sanity schema deploy` / Studio deploy if separate).
4. Merge `redesign/v2` into `main` via PR. Deploy.
5. Post-release checks: all old URLs redirect (script that curls every URL from the Phase 0 table and asserts 200/301), contact form sends and saves, sitemap submitted in Google Search Console, Lighthouse on production, analytics receiving events.
6. Rollback plan: document how to redeploy the previous production build in one step and how to restore the dataset from the backup.

Environment variables to use (reuse existing names if the project already has equivalents): `PUBLIC_SANITY_PROJECT_ID`, `PUBLIC_SANITY_DATASET`, `SANITY_API_READ_TOKEN` (if dataset is private), `SANITY_API_WRITE_TOKEN` (seed + contact), `RESEND_API_KEY`, `CONTACT_TO`, `SITE_URL`.

Start with **Phase 0 (audit only)** and wait for my OK. After that, ask me only if something blocks you; otherwise make a sensible choice and note it in the phase summary.
