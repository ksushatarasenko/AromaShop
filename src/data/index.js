import notesLibrary from './notes.json';
import luxury from './perfumes/luxury.json';
import niche from './perfumes/niche.json';
import brands from './brands.json';
import taxonomy from './taxonomy.json';
import site from './site.json';
import articles from './articles.json';
import facts from './facts.json';
import { DEFAULT_LANG } from '../i18n/config.js';
import { localize } from '../i18n/localize.js';

/** All perfumes from every collection — add a new JSON file here when expanding. */
export const allPerfumes = [...luxury, ...niche];

/** Catalog-visible perfumes. Set `visible: false` in JSON to keep a perfume
 * in the data (and direct product URL) without showing it in the shop. */
export const catalogPerfumes = allPerfumes.filter((perfume) => perfume.visible !== false);

export {
  luxury,
  niche,
  brands,
  taxonomy,
  site,
  articles,
  facts,
  notesLibrary,
};

export function getBrandById(brandId) {
  return brands.find((brand) => brand.id === brandId) ?? null;
}

export function getPerfumeById(id) {
  return allPerfumes.find((perfume) => perfume.id === id) ?? null;
}

export function getArticleBySlug(slug) {
  return articles.find((article) => article.slug === slug) ?? null;
}

export function getNoteById(id) {
  return notesLibrary.find((note) => note.id === id) ?? null;
}

export function getNoteBySlug(slug, lang = DEFAULT_LANG) {
  if (!slug) return null;
  return (
    notesLibrary.find((note) => note.slug?.[lang] === slug) ||
    notesLibrary.find((note) =>
      Object.values(note.slug || {}).includes(slug)
    ) ||
    notesLibrary.find((note) => note.id === slug) ||
    null
  );
}

export function getNoteLabel(id, lang = DEFAULT_LANG) {
  const note = getNoteById(id);
  if (!note) return id;
  return localize(note.name, lang, DEFAULT_LANG) || id;
}

/** Perfumes that contain a note in top / heart / base */
export function getPerfumesByNoteId(noteId) {
  if (!noteId) return [];
  return catalogPerfumes.filter((perfume) => {
    const n = perfume.fragrance?.notes;
    if (!n) return false;
    return (
      (n.top || []).includes(noteId) ||
      (n.heart || []).includes(noteId) ||
      (n.base || []).includes(noteId)
    );
  });
}

export function getTaxonomyLabel(group, id, lang = DEFAULT_LANG) {
  if (group === 'notes') {
    return getNoteLabel(id, lang);
  }
  const items = taxonomy[group];
  if (!Array.isArray(items)) return id;
  const found = items.find((item) => item.id === id);
  if (!found) return id;
  return localize(found, lang, DEFAULT_LANG) || found.id;
}

export function getPerfumesByCollection(collectionId) {
  return catalogPerfumes.filter((perfume) => perfume.collection === collectionId);
}

export function getFeaturedPerfumes() {
  return catalogPerfumes
    .filter((perfume) => perfume.featured)
    .sort((a, b) => {
      const priority = (perfume) => {
        if (perfume.new) return 1;
        if (perfume.bestseller) return 2;
        if (perfume.recommended) return 3;
        return 4;
      };

      return priority(a) - priority(b);
    });
}
export function getNewPerfumes() {
  return catalogPerfumes.filter((perfume) => perfume.new);
}

export function getBestsellers() {
  return catalogPerfumes.filter((perfume) => perfume.bestseller);
}

export function getSimilarPerfumes(perfume) {
  if (!perfume?.similar?.length) return [];
  return perfume.similar
    .map((id) => getPerfumeById(id))
    .filter((item) => item && item.visible !== false);
}
