# Brand assets

Place files here:

- aromashop-logo.png          → main logo
- aromashop-logo-light.png    → light / gold version for dark backgrounds
- favicon.png                 → optional favicon
- perfume-placeholder.svg     → elegant fallback (already included)
- perfume-placeholder.jpg     → optional JPG fallback (set in site.json)

Then enable logo in src/data/site.json:

"logo": {
  "enabled": true,
  "src": "aromashop-logo.png",
  "light": "aromashop-logo-light.png",
  "alt": "AromaShop — Original Luxury & Niche Fragrances"
}
