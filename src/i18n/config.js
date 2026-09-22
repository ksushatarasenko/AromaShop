export const DEFAULT_LANG = 'pl';
export const SUPPORTED_LANGS = ['pl', 'uk'];

export const LANG_LABELS = {
  pl: 'PL',
  uk: 'UA',
};

/**
 * Localized path segments per language.
 * Perfume IDs stay language-independent.
 */
export const ROUTE_SEGMENTS = {
  pl: {
    home: '',
    perfumes: 'perfumy',
    women: 'perfumy-damskie',
    men: 'perfumy-meskie',
    unisex: 'perfumy-unisex',
    luxury: 'luksusowe',
    niche: 'niszowe',
    perfume: 'aromat',
    notes: 'nuty',
    note: 'nuty',
    find: 'dobierz-aromat',
    journal: 'dziennik',
    about: 'o-nas',
    authenticity: 'autentycznosc',
    howToOrder: 'jak-zamowic',
    cart: 'koszyk',    
  },
  uk: {
    home: '',
    perfumes: 'parfumy',
    women: 'zhinochi',
    men: 'cholovichi',
    unisex: 'unisex',
    luxury: 'liuksovi',
    niche: 'nishevi',
    perfume: 'aromat',
    notes: 'noty',
    note: 'noty',
    find: 'pidbir-aromatu',
    journal: 'zhurnal',
    about: 'pro-nas',
    authenticity: 'avtentichnist',
     howToOrder: 'yak-zamovyty',
    cart: 'koshyk',   
  },
};

/** Maps a catalog category segment back to filter key */
export const CATEGORY_KEYS = ['women', 'men', 'unisex', 'luxury', 'niche'];

export function isSupportedLang(lang) {
  return SUPPORTED_LANGS.includes(lang);
}
