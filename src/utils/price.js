/**
 * Price helpers — never store pricePerMl in JSON.
 * It is always derived from price / ml.
 */

export function pricePerMl(price, ml) {
  if (!price || !ml) return null;
  return price / ml;
}

export function formatPrice(amount, currency = 'zł') {
  if (amount == null || Number.isNaN(amount)) return '';
  const rounded = Number.isInteger(amount)
    ? String(amount)
    : amount.toFixed(2);
  return `${rounded} ${currency}`;
}

export function formatPricePerMl(price, ml, currency = 'zł') {
  const value = pricePerMl(price, ml);
  if (value == null) return '';
  return `${value.toFixed(2)} ${currency} / ml`;
}

function pricedSizes(sizes = []) {
  return sizes.filter((s) => s?.price != null && !Number.isNaN(Number(s.price)));
}

/** Lowest in-stock size price, or lowest overall. */
export function getDisplayPrice(perfume) {
  if (!perfume?.sizes?.length) return null;
  const inStock = perfume.sizes.filter((s) => s.stock);
  const pool = pricedSizes(inStock.length ? inStock : perfume.sizes);
  if (!pool.length) return null;
  return Math.min(...pool.map((s) => s.price));
}

export function getDisplaySize(perfume) {
  if (!perfume?.sizes?.length) return null;
  const inStock = perfume.sizes.filter((s) => s.stock);
  const base = inStock.length ? inStock : perfume.sizes;
  const pool = pricedSizes(base);
  const candidates = pool.length ? pool : base;
  return candidates.reduce((a, b) => {
    if (a.price == null) return b;
    if (b.price == null) return a;
    return a.price <= b.price ? a : b;
  });
}

export function getMinMaxPrices(perfumes) {
  const prices = perfumes
    .flatMap((p) => p.sizes?.map((s) => s.price) ?? [])
    .filter((price) => price != null && !Number.isNaN(Number(price)));
  if (!prices.length) return { min: 0, max: 0 };
  return { min: Math.min(...prices), max: Math.max(...prices) };
}
