# AromaShop

Original Luxury & Niche Fragrances — a premium perfume boutique website.

## Stack

- React + Vite
- React Router
- CSS (design tokens, mobile-first)

## Images

Convention for perfume photos:

```
public/assets/perfumes/{perfume.id}/main.jpg
public/assets/perfumes/{perfume.id}/02.jpg   # optional
```

In JSON store only the filename:

```json
"image": "main.jpg",
"gallery": ["02.jpg", "03.jpg"]
```

Helpers (never hardcode paths in JSX):

- `getPerfumeImage(perfume)`
- `getPerfumeGallery(perfume)`
- `getBrandLogo(brand)`
- `getJournalImage(article)`
- `getSiteLogo()`
- `getHomeImage(key)`

Missing `main.jpg` → elegant placeholder (no broken icons).

### Adding a new perfume

1. Create `public/assets/perfumes/your-perfume-id/`
2. Add `main.jpg` (+ optional `02.jpg`…)
3. Add object to `luxury.json` or `niche.json` with `"image": "main.jpg"`

No React changes required.

## Multilingual (PL / UA)

Polish is the default language (`/pl`).

- UI strings: `src/locales/pl.json`, `src/locales/uk.json`
- Taxonomy labels: `src/data/taxonomy.json` → `{ id, pl, uk }`
- Perfume text fields: `{ "pl": "...", "uk": "..." }`
- Business data (ids, prices, notes IDs) stays language-independent

Language switcher preserves the current page and query string.

### Localized routes

| PL | UA |
|----|----|
| `/pl/perfumy` | `/uk/parfumy` |
| `/pl/perfumy-damskie` | `/uk/zhinochi` |
| `/pl/perfumy-meskie` | `/uk/cholovichi` |
| `/pl/perfumy-unisex` | `/uk/unisex` |
| `/pl/luksusowe` | `/uk/liuksovi` |
| `/pl/niszowe` | `/uk/nishevi` |
| `/pl/aromat/:id` | `/uk/aromat/:id` |

To add a third language later: add a locale JSON, extend taxonomy/perfume language keys, and register segments in `src/i18n/config.js`.

## Content management

Add a new perfume by copying an object in:

- `src/data/perfumes/luxury.json` or
- `src/data/perfumes/niche.json`

No component changes required. The perfume will appear in catalogue, search, filters, collections, and matching.

### Key data files

| File | Purpose |
|------|---------|
| `src/data/taxonomy.json` | All filter labels & classifications |
| `src/data/brands.json` | Brands (`brandId` reference) |
| `src/data/site.json` | Contacts, nav, SEO, order copy |
| `src/data/articles.json` | Journal articles |
| `src/data/facts.json` | “Did you know?” cards |

### Logo

Place your logo at:

`public/assets/brand/aromashop-logo.png`

Until then, the AS monogram wordmark is used.

### Contacts

Edit Telegram, WhatsApp, and email in `src/data/site.json`.

## Scripts

```bash
npm install
npm run dev
npm run build
```

## Routes

- `/` — Home
- `/perfumes` — Catalogue
- `/perfumes/women|men|unisex|luxury|niche` — SEO category pages
- `/perfume/:id` — Perfume dossier
- `/find-your-scent` — Interactive matcher
- `/journal` / `/journal/:slug`
- `/about`
- `/authenticity`

## GitHub Pages

The project is prepared for GitHub Pages. The workflow in `.github/workflows/deploy-pages.yml` builds the site and deploys it automatically after a push to `main`.

After enabling **Settings → Pages → Source: GitHub Actions**, the site will be available at:

`https://YOUR-GITHUB-USERNAME.github.io/REPOSITORY-NAME/`

The workflow also creates `404.html`, so direct links to localized pages and Journal articles work on GitHub Pages.

## Hiding a perfume without deleting it

Keep the perfume object in `src/data/perfumes/luxury.json` or `src/data/perfumes/niche.json` and add:

```json
"visible": false
```

>>
    "new": true,
    "bestseller": false,
    "recommended": true
>>

The perfume remains in the JSON and can still be opened by its direct product URL, but it disappears from the catalogue, search, homepage collections, and scent matching. To return it to the shop, change it to `"visible": true` or remove the field.
