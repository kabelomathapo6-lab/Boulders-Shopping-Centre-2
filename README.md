# The Boulders Shopping Centre — Concept Redesign

A student concept redesign of [boulders.co.za](https://boulders.co.za/), the website for
The Boulders Shopping Centre in Midrand. Built with **React**, **React Router**, and
**Tailwind CSS**.

> This is an unofficial learning project. It is not affiliated with or endorsed by
> The Boulders Shopping Centre or Redefine Properties.

## Live site
**[ADD YOUR DEPLOYED URL HERE]**

## Run locally
```bash
npm install
npm run dev
```
- `npm run build` — production build
- `npm run lint` — ESLint

## Pages
| Route | File | What it does |
| --- | --- | --- |
| `/` | `HomePage.jsx` | Search-first hero, real centre stats, day/night toggle |
| `/directory` | `pages.jsx` | Every real tenant, searchable and filterable by category and level |
| `/whats-on` | `pages.jsx` | Real centre news and current promotions |
| `/visit` | `pages.jsx` | Trading hours, parking, address, map link |

## What this redesign fixes
See `BRIEF.md` for the full research and justification. In short:

| Problem on the current site | What this redesign does |
| --- | --- |
| Every page returns near-empty HTML titled "Redefine Retail" — Google shows no description | Real, accurate titles and meta descriptions on every route |
| Store list is a long unsearchable page | Instant search + category and level filters over the real directory |
| Mall map is a zoom/pan widget that fails on mobile | Directory grouped and filterable — no pinching |
| Trading hours are buried | Live "Open now / Closed" status in the header and on the Visit page |
| No clear reason to visit the site | The homepage leads with search, not a slogan |

## Data integrity
Every fact in this app — the address, phone number, parking count, floor area, trading
hours, and the tenant list — is taken from the centre's own published information and
was checked against the live site before being used here. Nothing is invented.

## Component structure
```
src/
├── shared.jsx     hooks (useSastTime, useDocumentMeta, useReveal) + layout (Header, Footer, Layout)
├── HomePage.jsx    the home route
├── pages.jsx       Directory, What's On, Visit routes
├── data.js         real tenant list, trading hours, centre facts
└── main.jsx        router
```

## Stack
Vite · React · React Router · Tailwind CSS
