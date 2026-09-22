import { getBrandById } from "../data/index.js";
import { getDisplayPrice } from "./price.js";

/**
 * Multi-filter engine. All active filters apply together (AND).
 * Empty / default values are ignored.
 */

const defaultFilters = {
  collection: [],
  gender: [],
  brandId: [],
  moods: [],
  families: [],
  accords: [],
  notes: [],
  seasons: [],
  timeOfDay: [],
  occasions: [],
  concentration: [],
  bottleSize: [],
  priceMin: null,
  priceMax: null,
  sweetness: null,
  freshness: null,
  warmth: null,
  intensity: null,
};

export function createEmptyFilters() {
  return {
    ...defaultFilters,
    collection: [],
    gender: [],
    brandId: [],
    moods: [],
    families: [],
    accords: [],
    notes: [],
    seasons: [],
    timeOfDay: [],
    occasions: [],
    concentration: [],
    bottleSize: [],
  };
}

function hasAny(list) {
  return Array.isArray(list) && list.length > 0;
}

function includesAny(source, selected) {
  if (!hasAny(selected)) return true;
  if (!Array.isArray(source)) return false;
  return selected.some((id) => source.includes(id));
}

function matchesCharacter(value, target) {
  if (target == null || target === "") return true;
  return Number(value) >= Number(target);
}

function matchesPrice(perfume, priceMin, priceMax) {
  if (priceMin == null && priceMax == null) return true;
  const prices = (perfume.sizes?.map((s) => s.price) ?? []).filter(
    (price) => price != null && !Number.isNaN(Number(price)),
  );
  if (!prices.length) return false;
  const minP = Math.min(...prices);
  const maxP = Math.max(...prices);
  if (priceMin != null && maxP < priceMin) return false;
  if (priceMax != null && minP > priceMax) return false;
  return true;
}

function matchesBottleSize(perfume, sizes) {
  if (!hasAny(sizes)) return true;
  return perfume.sizes?.some(
    (s) => sizes.includes(s.ml) || sizes.includes(String(s.ml)),
  );
}

export function filterPerfumes(perfumes, filters = {}) {
  const f = { ...defaultFilters, ...filters };

  return perfumes.filter((perfume) => {
    if (hasAny(f.collection) && !f.collection.includes(perfume.collection))
      return false;
    if (hasAny(f.gender) && !f.gender.includes(perfume.gender)) return false;
    if (hasAny(f.brandId) && !f.brandId.includes(perfume.brandId)) return false;
    if (
      hasAny(f.concentration) &&
      !f.concentration.includes(perfume.concentration)
    )
      return false;

    if (!includesAny(perfume.moods, f.moods)) return false;
    if (!includesAny(perfume.fragrance?.families, f.families)) return false;
    if (!includesAny(perfume.fragrance?.accords, f.accords)) return false;

    if (hasAny(f.notes)) {
      const allNotes = [
        ...(perfume.fragrance?.notes?.top ?? []),
        ...(perfume.fragrance?.notes?.heart ?? []),
        ...(perfume.fragrance?.notes?.base ?? []),
      ];
      if (!includesAny(allNotes, f.notes)) return false;
    }

    if (!includesAny(perfume.wearing?.seasons, f.seasons)) return false;
    if (!includesAny(perfume.wearing?.timeOfDay, f.timeOfDay)) return false;
    if (!includesAny(perfume.wearing?.occasions, f.occasions)) return false;

    if (!matchesBottleSize(perfume, f.bottleSize)) return false;
    if (!matchesPrice(perfume, f.priceMin, f.priceMax)) return false;

    if (!matchesCharacter(perfume.character?.sweetness, f.sweetness))
      return false;
    if (!matchesCharacter(perfume.character?.freshness, f.freshness))
      return false;
    if (!matchesCharacter(perfume.character?.warmth, f.warmth)) return false;
    if (!matchesCharacter(perfume.character?.intensity, f.intensity))
      return false;

    return true;
  });
}

export function sortPerfumes(perfumes, sortId = "recommended") {
  const list = [...perfumes];

  switch (sortId) {
    case "newest":
      return list.sort((a, b) => (b.year || 0) - (a.year || 0));
    case "price-asc":
      return list.sort(
        (a, b) => (getDisplayPrice(a) ?? 0) - (getDisplayPrice(b) ?? 0),
      );
    case "price-desc":
      return list.sort(
        (a, b) => (getDisplayPrice(b) ?? 0) - (getDisplayPrice(a) ?? 0),
      );
    case "name-asc":
      return list.sort((a, b) => a.name.localeCompare(b.name));
    case "recommended":
    default:
      return list.sort((a, b) => {
        const priority = (p) => {
          if (p.recommended) return 1;
          if (p.new) return 2;
          if (p.bestseller) return 3;
          return 4;
        };

        return priority(a) - priority(b) || a.name.localeCompare(b.name);
      });
  }
}

/** Parse URL path segments like /perfumes/women or /perfumes/luxury into filters. */
export function filtersFromPath(segment) {
  if (!segment) return createEmptyFilters();
  const filters = createEmptyFilters();
  if (["women", "men", "unisex"].includes(segment)) {
    filters.gender = [segment];
  } else if (["luxury", "niche"].includes(segment)) {
    filters.collection = [segment];
  }
  return filters;
}

export function enrichWithBrand(perfume) {
  return {
    ...perfume,
    brand: getBrandById(perfume.brandId),
  };
}
