import { getBrandById, getNoteById, getNoteLabel } from '../data/index.js';
import { localize } from '../i18n/localize.js';
import { DEFAULT_LANG } from '../i18n/config.js';
import { taxonomy } from '../data/index.js';

/**
 * Global search across name, brand, notes, accords, families, tags,
 * and localized descriptions.
 */

function normalize(value) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

function taxonomyTerms(group, ids, lang) {
  if (!Array.isArray(ids)) return [];
  const items = taxonomy[group] || [];
  return ids.flatMap((id) => {
    const found = items.find((item) => item.id === id);
    if (!found) return [id];
    return [id, localize(found, lang), localize(found, DEFAULT_LANG)];
  });
}

/** Note IDs + localized names (PL/UA) from notes.json */
function noteSearchTerms(ids, lang) {
  if (!Array.isArray(ids)) return [];
  return ids.flatMap((id) => {
    const note = getNoteById(id);
    if (!note) return [id];
    return [
      id,
      getNoteLabel(id, lang),
      getNoteLabel(id, DEFAULT_LANG),
      localize(note.name, 'pl'),
      localize(note.name, 'uk'),
      localize(note.slug, 'pl'),
      localize(note.slug, 'uk'),
    ];
  });
}

function collectSearchableText(perfume, lang = DEFAULT_LANG) {
  const brand = getBrandById(perfume.brandId);
  const notes = [
    ...(perfume.fragrance?.notes?.top ?? []),
    ...(perfume.fragrance?.notes?.heart ?? []),
    ...(perfume.fragrance?.notes?.base ?? []),
  ];

  return [
    perfume.name,
    perfume.id,
    brand?.name,
    perfume.brandId,
    perfume.collection,
    perfume.gender,
    perfume.concentration,
    localize(perfume.description, lang),
    localize(perfume.shortDescription, lang),
    localize(perfume.story, lang),
    ...taxonomyTerms('moods', perfume.moods, lang),
    ...taxonomyTerms('families', perfume.fragrance?.families, lang),
    ...taxonomyTerms('accords', perfume.fragrance?.accords, lang),
    ...noteSearchTerms(notes, lang),
    ...(perfume.tags ?? []),
  ]
    .filter(Boolean)
    .map(normalize)
    .join(' ');
}

export function searchPerfumes(perfumes, query, lang = DEFAULT_LANG) {
  const q = normalize(query);
  if (!q) return perfumes;

  const terms = q.split(/\s+/).filter(Boolean);

  return perfumes.filter((perfume) => {
    const haystack = collectSearchableText(perfume, lang);
    return terms.every((term) => haystack.includes(term));
  });
}

export function searchBrands(brands, query) {
  const q = normalize(query);
  if (!q) return [];
  return brands.filter(
    (brand) =>
      normalize(brand.name).includes(q) ||
      normalize(brand.id).includes(q)
  );
}
