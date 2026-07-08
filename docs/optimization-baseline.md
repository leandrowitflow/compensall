# Optimization baseline (pre-implementation)

Date: 2026-07-08  
Production URL: https://compensall.vercel.app

## PageSpeed Insights

Google PSI API returned HTTP 429 (rate limited) during automated baseline capture. Post-implementation scores are recorded in `docs/optimization-results.md`.

## Known issues identified in codebase + production checks

| Issue | Impact |
|-------|--------|
| `/assets/hero-bg.png` returns **404** on production | Broken LCP, layout relies on missing hero image |
| `/assets/icons/trustpilot-score.png` returns **404** | Broken trust badge on hero pages |
| `/assets/airlines/*.png` return **404** | Catalog logo waterfall + wasted requests |
| `/assets/icons/flight-delay-bg.png` and home icon PNGs missing | 404s on homepage bento grid |
| Google Fonts loaded via CSS `@import` (3 families, 18 weights) | Render-blocking |
| Zero `next/image` usage | No WebP/AVIF, no priority LCP, CLS risk |
| Hero background duplicated 2–3× per page | Redundant network/render work |
| Full claim wizard bundled on homepage | Unused JS on first paint |
| FAQ answers hidden when accordion closed (client-only) | Poor AEO/GEO HTML extractability |
| No sitemap, robots.txt, canonical URLs, JSON-LD | SEO + AI crawler gaps |
| Only root layout metadata | Duplicate titles/descriptions on most routes |

## Priority URL test matrix

| URL | Focus |
|-----|-------|
| `/` | LCP, claim wizard JS |
| `/about` | Marketing metadata |
| `/blog/flight-cancellation` | Article schema + metadata |
| `/airlines/ryanair` | Catalog FAQ + metadata |
| `/know-your-rights` | Image grid + content |
| `/documents/no-win-no-fee` | Legal page metadata |

## Asset inventory (repo)

- 71 files under `public/assets/` — mostly SVG; PNGs only in `blog/` and `documents/`
- No `hero-bg.png` committed
