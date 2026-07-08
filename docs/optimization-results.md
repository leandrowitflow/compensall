# Optimization results (post-implementation)

Date: 2026-07-08  
Production URL: https://compensall.vercel.app  
Local verification: `npm run build && npm run start` (Next.js 16.2.9)

## Build

| Check | Result |
|-------|--------|
| `npm run build` | Pass (107 static/SSG routes) |
| TypeScript | Pass |
| Sitemap `/sitemap.xml` | 200, 16.5 KB |
| Robots `/robots.txt` | 200, sitemap linked, `/api/` and `/track/` blocked |
| `llms.txt` | 200 |

## PageSpeed Insights

Google PSI API returned **HTTP 429** (rate limited) for both baseline and post-implementation automated runs. Re-run manually at [PageSpeed Insights](https://pagespeed.web.dev/) after production deploy.

**Expected improvements from code changes:**

- Removed 404 hero/trustpilot/catalog PNG requests
- `next/font` replaces render-blocking CSS `@import`
- Shared CSS-gradient `HeroBackground` (single hero layer per page)
- `next/image` on blog listing, blog posts, homepage bento, know-your-rights grid
- Dynamic import of claim Steps 2–3 and sidebar (smaller homepage JS on first paint)
- FAQ answers in SSR `<details>` markup for extractability

## HTML extractability (local curl)

| URL | Checks |
|-----|--------|
| `/` | EC 261/2004 answer text, FAQPage + HowTo JSON-LD, `schema.org` |
| `/airlines/ryanair` | Entity name, FAQPage + BreadcrumbList JSON-LD, EC 261/2004 |
| `/blog/flight-cancellation` | Article + Breadcrumb JSON-LD, excerpt in HTML |
| `/know-your-rights` | Direct-answer hero copy, FAQPage JSON-LD |

## SEO / structured data

| Schema | Pages |
|--------|-------|
| Organization + WebSite | Root layout |
| FAQPage + HowTo | Homepage |
| FAQPage | Airlines index, know-your-rights, catalog detail |
| Article + BreadcrumbList | Blog posts |
| BreadcrumbList | Catalog detail |
| ProfessionalService | About |

Validate with [Google Rich Results Test](https://search.google.com/test/rich-results) after deploy.

## Metadata

Per-route `metadata` / `generateMetadata` added for:

- `/`, `/about`, `/blog`, `/blog/[slug]`, `/airlines`, `/airlines/[slug]`, `/airports/[slug]`, `/know-your-rights`
- Legal documents (`noindex`)
- Track pages (`noindex`)

## GEO

- `public/llms.txt` with canonical Compensall URLs and key guides
- `robots.ts`: allow citation bots (`OAI-SearchBot`, `PerplexityBot`, `Google-Extended`, `ClaudeBot`); disallow `GPTBot` and `CCBot` from training crawl

## Accepted tradeoffs

- Hero uses CSS gradient instead of photographic `hero-bg.png` (asset was missing on production; gradient preserves blue hero look without extra payload)
- Compensation tier cards show typography-only amounts (missing `/assets/compensation/*.png` removed to eliminate 404s)
- Airline catalog cards without SVG logos show airline name text instead of broken PNG waterfall
- PSI scores pending manual re-run due to API rate limits

## Post-deploy checklist

**Deployed:** 2026-07-08 to https://compensall.vercel.app (commit `0426acd`)

1. Re-run PSI on 6 priority URLs (mobile + desktop) — API rate-limited during automation
2. Submit `/sitemap.xml` in Google Search Console and Bing Webmaster Tools
3. Rich Results Test on `/`, `/blog/flight-cancellation`, `/airlines/ryanair`
4. Visual regression at 390px / 1024px / 1440px on `/`, `/about`, `/blog`, `/airlines/ryanair`, claim step 1

**Production verification (post-deploy):**

| URL | Status |
|-----|--------|
| `/sitemap.xml` | 200 |
| `/robots.txt` | 200 |
| `/llms.txt` | 200 |
| `/` HTML | No `hero-bg.png` or `trustpilot-score.png` references; FAQPage JSON-LD present |
