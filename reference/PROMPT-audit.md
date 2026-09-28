# Cursor prompt: /audit landing page (Agent Readiness Audit)

> For the **existing, live** sidebysideweb.gr repo (Astro). Copy the `reference/` folder of this kit into the repo root, then paste everything below the line into Cursor (Agent mode).

---

Add one new page to the live Side by Side site: **`/audit`**, the landing page for the **Agent Readiness Audit** service. Only this page. Do not redesign or change other pages.

## Sources of truth

- `reference/audit-prototype.html`: the approved design of the page, a single self-contained HTML file (inline CSS and JS). Reproduce layout, typography, colours, spacing, copy and every animation and interaction faithfully.
- `reference/audit-content.json`: the final copy, structured by section. Words wrapped in `**…**` are the one highlighted (marigold) word or phrase of that section. Use this file for all text, not hard-coded strings.
- If the repo has `.cursor/rules/sidebyside.mdc` or a brand/tokens file, follow it. Reuse the site's existing layout, header, footer, fonts, tokens, buttons, eyebrow, FAQ and form components wherever they already exist. Only add what is missing.

## Rules

1. Work on a branch `feature/audit-page`. Do not touch `main`. Stop after step 1 (audit) and wait for my OK.
2. Public page: **no prices**, no client names, no numbers from real reports. The sample report in the page is generic and must stay labelled «Ενδεικτικά ευρήματα, όχι από πραγματικό πελάτη».
3. Greek copy exactly as in the JSON (`lang="el"`). No em dashes, no emoji.
4. Dark-first: Night background, Commissioner 800 headlines, mono uppercase eyebrows, one marigold word per section, light (Paper) sections alternating as in the prototype.
5. Respect `prefers-reduced-motion` exactly as the prototype does. Content must be readable without JavaScript.

## Steps

### 1. Audit the repo (no code changes)
Report: Astro version, how pages and layouts are organised, whether Sanity is set up (schema location, dataset), existing components I can reuse (header, footer, Button, Eyebrow, FAQ, contact form, tokens), how the current contact form submits (endpoint, email provider), and anything in the prototype that conflicts with the current codebase. Propose the file list you will create. Wait for my OK.

### 2. Content model
- If Sanity is used: add a singleton `auditPage` with fields matching `audit-content.json` (seo, hero, why, checks.items[] with icon key, how + visual numbers, deliverable + sample report rows, cta + form labels, faq.items[]). Support the `**highlight**` convention (render as `<span class="m">`). Add a seed script that creates the document from the JSON, idempotent, run against the non-production dataset first.
- If Sanity is not used for pages yet: load the JSON directly at build time from `src/content/audit.json`.

### 3. Page and components
Create `src/pages/audit.astro` using the site layout, with these sections (component names are suggestions):
- `AuditHero`: eyebrow, 4-line headline with line-by-line entrance, subhead, CTA that smooth-scrolls to the form and focuses the URL field, the «ΑΝΘΡΩΠΟΣ / AI ΕΡΓΑΛΕΙΟ» readers visual with the scanning line.
- `AuditWhy`: big statement + two paragraphs.
- `AuditChecks`: 5 cards grid (5 / 3 / 1 columns), AI card highlighted dark. **Icons:** use the SVG symbols from the audit tool's `report.ts` (`i-a11y`, `i-perf`, `i-geo`, `i-sec`, `i-qa`) so the page matches the reports. Ask me for the file path if you cannot find it; fall back to the prototype icons.
- `AuditHow`: text + the 400-square template grid (5 marigold squares, others dim on scroll via CSS scroll-driven animation behind `@supports`, static fallback).
- `AuditReport`: text + the sample report card (severity chips, category, priority).
- `AuditRequest` (anchor `#audit-request`): heading, body, form with URL (required, accepts with or without https), name, email, optional note, hint text, success and error states.
- `AuditFaq`: 3 items using the site's existing FAQ component.

### 4. Form handling
Reuse the existing contact endpoint if there is one, sending `{ type: "audit", url, name, email, note }`. Server-side validation, honeypot, same email provider and recipient as the contact form, subject «Αίτημα Agent Readiness Audit: {url}». If submissions are stored in Sanity, store them the same way with `type: audit`. Progressive enhancement: works without JS.

### 5. SEO and linking
- Title and meta description from `seo` in the JSON. Canonical `https://sidebysideweb.gr/audit`, Open Graph image (create one in the brand style: Night background, headline, marigold «AI;»).
- JSON-LD: `Service` (name «Agent Readiness Audit», provider Side by Side, areaServed Greece, no price) and `FAQPage` for the 3 FAQs.
- Add `/audit` to the sitemap. Link to it from: the footer «Προϊόντα» column, and the audit tool case study / product entry if one exists. Do not add it to the main navigation unless I ask.

### 6. QA
Compare against `reference/audit-prototype.html` at 390px, 768px and 1280px. Check: no horizontal scroll, keyboard navigation and visible focus, reduced motion, form with and without JS, Lighthouse mobile (Performance ≥ 90, Accessibility ≥ 95, SEO 100). Deploy to a preview URL and send it to me with a short summary. Do not merge.

Environment variables: reuse the existing ones for Sanity and email. Name any new variable clearly and list it in the summary.
