import { pricePerMl as derivePricePerMl } from './price.js';
import { DECANT_BOTTLE_FEE_PLN } from './wholesalePricing.js';

/** Default decant volumes (ml) when perfume.decant.sizes is omitted */
export const DEFAULT_DECANT_SIZES = [1, 5, 10, 15, 20];

/** Physical empty decant bottle cost added once per unit */
export const DECANT_BOTTLE_FEE = DECANT_BOTTLE_FEE_PLN;

/**
 * Resolve decant config from perfume JSON.
 *
 * Example:
 * "decant": { "enabled": true, "sizes": [1, 5, 10, 15, 20], "pricePerMl": null }
 *
 * - enabled: false → hide na rozlew
 * - pricePerMl: number → use manual rate
 * - pricePerMl: null / omitted → derive from selected original bottle
 */
export function getDecantConfig(perfume) {
  const decant = perfume?.decant;
  if (decant?.enabled === false) return null;

  return {
    enabled: true,
    sizes: Array.isArray(decant?.sizes) && decant.sizes.length
      ? decant.sizes
      : DEFAULT_DECANT_SIZES,
    pricePerMl:
      decant?.pricePerMl != null && Number(decant.pricePerMl) > 0
        ? Number(decant.pricePerMl)
        : null,
  };
}

/** Reference bottle for automatic price-per-ml (prefer in-stock, then largest). */
export function getReferenceBottle(perfume, preferredSize = null) {
  if (preferredSize?.ml && preferredSize?.price != null) return preferredSize;
  if (!perfume?.sizes?.length) return null;

  const inStock = perfume.sizes.filter((s) => s.stock);
  const pool = inStock.length ? inStock : perfume.sizes;
  return pool.reduce((best, size) => (!best || size.ml > best.ml ? size : best), null);
}

/**
 * Effective zł/ml for decant pricing.
 * Manual perfume.decant.pricePerMl wins; otherwise bottle price / ml.
 */
export function getEffectiveDecantPricePerMl(perfume, referenceBottle) {
  const config = getDecantConfig(perfume);
  if (!config) return null;
  if (config.pricePerMl != null) return config.pricePerMl;

  const bottle = getReferenceBottle(perfume, referenceBottle);
  return derivePricePerMl(bottle?.price, bottle?.ml);
}

/**
 * Decant retail = (zł/ml × ml) + bottle fee.
 * Fee is once per physical decant, not per ml.
 */
export function calculateDecantPrice(ml, pricePerMlValue) {
  if (!ml || pricePerMlValue == null || Number.isNaN(pricePerMlValue)) return null;
  const liquid = Number(ml) * Number(pricePerMlValue);
  return Math.round((liquid + DECANT_BOTTLE_FEE) * 100) / 100;
}
