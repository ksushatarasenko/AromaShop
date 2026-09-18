import { site, getBrandById } from '../data/index.js';

const BASE_URL = import.meta.env.BASE_URL;

const ASSETS = {
  perfumes: `${BASE_URL}assets/perfumes`,
  brands: `${BASE_URL}assets/brands`,
  journal: `${BASE_URL}assets/journal`,
  home: `${BASE_URL}assets/home`,
  brand: `${BASE_URL}assets/brand`,
};

function withBasePath(path) {
  if (!path) return path;

  const value = String(path);

  if (value.startsWith('http://') || value.startsWith('https://')) {
    return value;
  }

  if (value.startsWith(BASE_URL)) {
    return value;
  }

  if (value.startsWith('/')) {
    return `${BASE_URL}${value.slice(1)}`;
  }

  return `${BASE_URL}${value}`;
}

/**
 * Preferred order: PNG first, then other still formats for fallback.
 */
export const IMAGE_EXTENSIONS = ['png', 'webp', 'jpg', 'jpeg'];

/**
 * Global gallery rule: every perfume may show at most main + 02 + 03.
 * Never probe or display 04, 05, 06, …
 */
export const MAX_PERFUME_GALLERY_IMAGES = 3;
export const PERFUME_GALLERY_SLOTS = Object.freeze(['main', '02', '03']);

const warnedMissing = new Set();

function warnOnce(key, message) {
  if (!import.meta.env.DEV) return;
  if (warnedMissing.has(key)) return;
  warnedMissing.add(key);
  console.warn(message);
}

function stripExtension(filename) {
  return String(filename || '').replace(/\.(jpe?g|png|webp)$/i, '');
}

function unique(list) {
  return [...new Set(list.filter(Boolean))];
}

/**
 * Brand folder slug from brands.json (fallback: brandId).
 */
export function getBrandSlug(perfume) {
  if (!perfume?.brandId) return '_unknown';
  const brand = getBrandById(perfume.brandId);
  return brand?.slug || brand?.id || perfume.brandId;
}

/**
 * Directory for a perfume:
 * /assets/perfumes/{brand.slug}/{perfume.id}
 */
export function getPerfumeAssetDir(perfume) {
  if (!perfume?.id) return null;
  return `${ASSETS.perfumes}/${getBrandSlug(perfume)}/${perfume.id}`;
}

/**
 * Build perfume file URL under brand/perfume folder.
 * Absolute paths (starting with /) are returned as-is.
 */
export function perfumeFileUrl(perfume, filename) {
  if (!filename) return null;

  if (String(filename).startsWith('/')) {
    return withBasePath(filename);
  }

  const dir = getPerfumeAssetDir(perfume);
  if (!dir) return null;

  return `${dir}/${filename}`;
}

/**
 * Reusable helper — primary image path for a perfume asset basename.
 * Prefer PNG; callers that need format fallback should use candidates.
 *
 * getPerfumeImage(perfume) → main.png path
 * getPerfumeImage(perfume, '02') → 02.png path
 */
export function getPerfumeImage(perfume, imageName = 'main') {
  if (!perfume?.id) return getPlaceholderImage();

  // Legacy call: getPerfumeImage(perfume) used configured main image candidates
  if (imageName === 'main' && arguments.length < 2) {
    return getPerfumeImageCandidates(perfume)[0];
  }

  const base = stripExtension(imageName) || 'main';
  return perfumeFileUrl(perfume, `${base}.png`) || getPlaceholderImage();
}

export function getPlaceholderImage() {
  return withBasePath(
    site.images?.perfumePlaceholder ||
      `${ASSETS.brand}/perfume-placeholder.svg`
  );
}

/**
 * Candidates for a named slot (main, 02, 03, …) under brand/perfume folder.
 */
export function getPerfumeImageSlotCandidates(perfume, slot = 'main') {
  if (!perfume?.id) return [getPlaceholderImage()];

  if (String(slot).startsWith('/')) return [slot, getPlaceholderImage()];

  const base = stripExtension(slot) || 'main';
  const urls = [];

  // Prefer explicit extension if provided
  if (/\.(jpe?g|png|webp)$/i.test(String(slot))) {
    urls.push(perfumeFileUrl(perfume, slot));
  }

  for (const ext of IMAGE_EXTENSIONS) {
    urls.push(perfumeFileUrl(perfume, `${base}.${ext}`));
  }

  urls.push(getPlaceholderImage());
  return unique(urls);
}

/**
 * Candidate URLs for a perfume main image.
 * Tries configured filename, then basename across extensions (PNG first).
 */
export function getPerfumeImageCandidates(perfume) {
  if (!perfume?.id) return [getPlaceholderImage()];

  const configured = perfume.image || 'main.png';
  if (String(configured).startsWith('/')) {
    return unique([configured, getPlaceholderImage()]);
  }

  return getPerfumeImageSlotCandidates(perfume, configured);
}

/**
 * Extra gallery slides beyond main — only slots 02 and 03, in that order.
 * Ignores 04+ even if files exist on disk or are listed in perfume.gallery.
 */
export function getPerfumeGalleryGroups(perfume) {
  if (!perfume?.id) return [];

  return PERFUME_GALLERY_SLOTS.slice(1, MAX_PERFUME_GALLERY_IMAGES).map((slot) =>
    getPerfumeImageSlotCandidates(perfume, slot)
  );
}

/**
 * All slides including main — for carousel / fullscreen.
 * Hard cap: MAX_PERFUME_GALLERY_IMAGES (main, 02, 03).
 * Each item: { id, candidates }
 */
export function getPerfumeSlides(perfume) {
  return getPerfumeGalleryImages(perfume);
}

/**
 * Canonical perfume gallery helper — max 3 images in fixed order:
 * main → 02 → 03 (only slots that resolve; missing files drop out in UI).
 */
export function getPerfumeGalleryImages(perfume) {
  if (!perfume?.id) return [];

  return PERFUME_GALLERY_SLOTS.slice(0, MAX_PERFUME_GALLERY_IMAGES).map((slot) => ({
    id: slot,
    candidates:
      slot === 'main'
        ? getPerfumeImageCandidates(perfume)
        : getPerfumeImageSlotCandidates(perfume, slot),
  }));
}

export function getPerfumeGallery(perfume) {
  return getPerfumeGalleryGroups(perfume).map((group) => group[0]);
}

export function getPerfumeImageAlt(perfume, brand) {
  const brandName = brand?.name || '';
  const concentration = perfume?.concentration || '';
  return [brandName, perfume?.name, concentration].filter(Boolean).join(' ');
}

export function getBrandLogo(brand) {
  if (!brand?.logo) return null;
  if (brand.logo.startsWith('/')) return brand.logo;
  return `${ASSETS.brands}/${brand.logo}`;
}

export function getJournalImage(article) {
  const file = article?.image || article?.cover;
  if (!file) return null;
  if (file.startsWith('/')) return file;
  return `${ASSETS.journal}/${file}`;
}

export function getHomeImage(key) {
  const configured = site.images?.home?.[key];
  if (configured) {
    return configured.startsWith('/')
      ? configured
      : `${ASSETS.home}/${configured}`;
  }
  return `${ASSETS.home}/${key}.jpg`;
}

function resolveBrandAsset(file) {
  if (!file) return null;
  return file.startsWith('/') ? file : `${ASSETS.brand}/${file}`;
}

export function getSiteLogo(variant = 'default') {
  const logo = site.logo || {};
  const primary = resolveBrandAsset(logo.src || logo.full);
  const compact = resolveBrandAsset(logo.compact || logo.mark);
  const light = resolveBrandAsset(logo.light);

  if (logo.enabled === false && !primary) return null;

  if (variant === 'compact') {
    return compact || primary;
  }

  if (variant === 'light') {
    return light || primary;
  }

  return primary;
}

export function getSiteLogoAlt() {
  return site.logo?.alt || 'AromaShop';
}

export function warnMissingPerfumeImage(perfumeId) {
  warnOnce(
    `perfume:${perfumeId}`,
    `AromaShop: image not found for perfume: ${perfumeId}`
  );
}

export { ASSETS as IMAGE_ASSETS };
