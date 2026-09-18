/**
 * Wholesale → AromaShop retail pricing helpers.
 * USD × 3.80 → bottle ×1.10 | decant ×1.15 + 7 PLN bottle fee
 */

export const USD_TO_PLN = 3.8;
export const BOTTLE_MARKUP = 1.1;
export const DECANT_MARKUP = 1.15;
export const DECANT_BOTTLE_FEE_PLN = 3;
export const PRICE_LIST_DATE = '2026-09-14';

export function wholesalePln(usd) {
  return Math.round(Number(usd) * USD_TO_PLN * 100) / 100;
}

export function retailBottlePrice(usd) {
  // usd × 3.80 × 1.10 → integer PLN (project convention)
  return Math.round(Number(usd) * USD_TO_PLN * BOTTLE_MARKUP);
}

export function wholesaleCostPerMl(usd, ml) {
  if (!usd || !ml) return null;
  return wholesalePln(usd) / Number(ml);
}

/** Stored as perfume.decant.pricePerMl (fee applied separately in calculateDecantPrice). */
export function decantPricePerMlFromWholesale(usd, bottleMl) {
  const cpm = wholesaleCostPerMl(usd, bottleMl);
  if (cpm == null) return null;
  return Math.round(cpm * DECANT_MARKUP * 10000) / 10000;
}

export function decantRetailPrice(usd, bottleMl, sizeMl) {
  const ppm = decantPricePerMlFromWholesale(usd, bottleMl);
  if (ppm == null || !sizeMl) return null;
  return Math.round((ppm * Number(sizeMl) + DECANT_BOTTLE_FEE_PLN) * 100) / 100;
}

/**
 * Prefer commercially sensible single bottles.
 * Excludes testers, multipacks, refills, dramming, travel minis.
 */
export function isSelectableOriginalVolume(volumeText, ml) {
  const v = String(volumeText || '').toLowerCase();
  if (/тестер|tester/.test(v)) return false;
  if (/\*|x\d|набор|set|refill|dramming|сменн/.test(v)) return false;
  if (!ml || ml < 25) return false;
  if (ml > 125) return false; // prefer ≤125; caller may allow exceptions
  return true;
}

export function parseVolume(volumeText) {
  const v = String(volumeText || '').toLowerCase().replace(',', '.');
  const tester = /тестер|tester/.test(v);
  if (/\d+\s*[*x×]\s*\d+|\d+\*\d+/.test(v)) {
    return { ml: null, tester, multipack: true };
  }
  const m = v.match(/(\d+(?:\.\d+)?)\s*мл/);
  if (!m) return { ml: null, tester, multipack: false };
  return { ml: Number(m[1]), tester, multipack: false };
}

/**
 * Pick best original option by cost/ml among commercially reasonable sizes.
 * If only large (>125) originals exist, allow them as fallback.
 */
export function selectBestProcurement(options) {
  const originals = options.filter((o) => !o.tester && !o.multipack && o.ml && o.usd > 0);

  let pool = originals.filter((o) => o.ml >= 25 && o.ml <= 125);
  if (!pool.length) {
    pool = originals.filter((o) => o.ml >= 25 && o.ml <= 200);
  }
  if (!pool.length) return null;

  const scored = pool.map((o) => ({
    ...o,
    wholesalePln: wholesalePln(o.usd),
    costPerMl: wholesaleCostPerMl(o.usd, o.ml),
    retail: retailBottlePrice(o.usd),
  }));

  scored.sort((a, b) => {
    const d = a.costPerMl - b.costPerMl;
    if (Math.abs(d) > 0.05) return d;
    return b.ml - a.ml; // tie → larger
  });

  return scored[0];
}
