import { DEFAULT_LANG, ROUTE_SEGMENTS, CATEGORY_KEYS, isSupportedLang } from './config.js';

/**
 * Resolve a nested key: "nav.shop" → locales.nav.shop
 */
export function getMessage(messages, key, vars = {}) {
  if (!key) return '';
  const value = key.split('.').reduce((acc, part) => (acc == null ? undefined : acc[part]), messages);
  if (typeof value !== 'string') return key;
  return value.replace(/\{(\w+)\}/g, (_, name) => (vars[name] != null ? String(vars[name]) : `{${name}}`));
}

/**
 * Localized field helper.
 * Accepts string (legacy) or { pl, uk, ... }.
 * Easy to add a third language later.
 */
export function localize(value, lang = DEFAULT_LANG, fallback = DEFAULT_LANG) {
  if (value == null) return '';
  if (typeof value === 'string' || typeof value === 'number') return String(value);
  if (typeof value === 'object') {
    return (
      value[lang] ??
      value[fallback] ??
      Object.values(value).find((v) => typeof v === 'string') ??
      ''
    );
  }
  return '';
}

export function localizeList(list, lang, fallback = DEFAULT_LANG) {
  if (!Array.isArray(list)) return [];
  return list.map((item) => localize(item, lang, fallback));
}

export function buildPath(lang, routeKey, params = {}) {
  const safeLang = isSupportedLang(lang) ? lang : DEFAULT_LANG;
  const segments = ROUTE_SEGMENTS[safeLang];
  const seg = segments[routeKey] ?? routeKey;

  if (routeKey === 'home') return `/${safeLang}`;

  if (routeKey === 'perfume' && params.id) {
    return `/${safeLang}/${segments.perfume}/${params.id}`;
  }

  if (routeKey === 'article' && params.slug) {
    return `/${safeLang}/${segments.journal}/${params.slug}`;
  }

  if (routeKey === 'note' && (params.slug || params.id)) {
    return `/${safeLang}/${segments.note}/${params.slug || params.id}`;
  }

  if (CATEGORY_KEYS.includes(routeKey)) {
    return `/${safeLang}/${segments[routeKey]}`;
  }

  return `/${safeLang}/${seg}`;
}

/**
 * Parse current pathname into { lang, page, category, id, slug, search }.
 */
export function parsePath(pathname) {
  const parts = pathname.split('/').filter(Boolean);
  const lang = isSupportedLang(parts[0]) ? parts[0] : DEFAULT_LANG;
  const rest = isSupportedLang(parts[0]) ? parts.slice(1) : parts;

  if (!rest.length) {
    return { lang, page: 'home' };
  }

  const segments = ROUTE_SEGMENTS[lang];
  const [first, second] = rest;

  // Reverse-lookup category / page from segment
  const entry = Object.entries(segments).find(([, value]) => value === first);
  const key = entry?.[0];

  if (key === 'perfume' && second) {
    return { lang, page: 'perfume', id: second };
  }

  if ((key === 'note' || key === 'notes') && second) {
    return { lang, page: 'note', slug: second };
  }

  if (key === 'journal' && second) {
    return { lang, page: 'article', slug: second };
  }

  if (CATEGORY_KEYS.includes(key)) {
    return { lang, page: 'perfumes', category: key };
  }

  if (key) {
    return { lang, page: key };
  }

  return { lang, page: 'home' };
}

/**
 * Switch language while preserving page context and query string.
 */
export function switchLanguagePath(pathname, search, nextLang) {
  const parsed = parsePath(pathname);
  const target = isSupportedLang(nextLang) ? nextLang : DEFAULT_LANG;

  let path;
  if (parsed.page === 'perfume') {
    path = buildPath(target, 'perfume', { id: parsed.id });
  } else if (parsed.page === 'note') {
    // Resolve localized slug for the same note id when switching languages
    path = buildPath(target, 'note', { slug: parsed.slug });
  } else if (parsed.page === 'article') {
    path = buildPath(target, 'article', { slug: parsed.slug });
  } else if (parsed.page === 'perfumes' && parsed.category) {
    path = buildPath(target, parsed.category);
  } else if (parsed.page === 'home') {
    path = buildPath(target, 'home');
  } else {
    path = buildPath(target, parsed.page);
  }

  return `${path}${search || ''}`;
}
