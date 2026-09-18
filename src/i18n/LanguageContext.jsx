import { createContext, useContext, useMemo, useEffect, useCallback } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import pl from '../locales/pl.json';
import uk from '../locales/uk.json';
import { taxonomy, getNoteBySlug, getNoteLabel } from '../data/index.js';
import { DEFAULT_LANG, SUPPORTED_LANGS, isSupportedLang } from './config.js';
import {
  getMessage,
  localize,
  localizeList,
  buildPath,
  parsePath,
  switchLanguagePath,
} from './localize.js';

const dictionaries = { pl, uk };

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const lang = isSupportedLang(params.lang) ? params.lang : DEFAULT_LANG;
  const messages = dictionaries[lang] ?? dictionaries[DEFAULT_LANG];

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = useCallback(
    (key, vars) => getMessage(messages, key, vars),
    [messages]
  );

  const tl = useCallback(
    (value) => localize(value, lang, DEFAULT_LANG),
    [lang]
  );

  const taxonomyLabel = useCallback(
    (group, id) => {
      if (group === 'notes') {
        return getNoteLabel(id, lang);
      }
      const items = taxonomy[group];
      if (!Array.isArray(items)) return id;
      const found = items.find((item) => item.id === id);
      if (!found) return id;
      return localize(found, lang, DEFAULT_LANG) || found.id;
    },
    [lang]
  );

  const path = useCallback(
    (routeKey, routeParams) => buildPath(lang, routeKey, routeParams),
    [lang]
  );

  const setLang = useCallback(
    (nextLang) => {
      if (!isSupportedLang(nextLang) || nextLang === lang) return;

      const parsed = parsePath(location.pathname);
      if (parsed.page === 'note' && parsed.slug) {
        const note = getNoteBySlug(parsed.slug, lang);
        if (note) {
          const nextSlug = localize(note.slug, nextLang, DEFAULT_LANG) || note.id;
          navigate(`${buildPath(nextLang, 'note', { slug: nextSlug })}${location.search || ''}`);
          return;
        }
      }

      const next = switchLanguagePath(location.pathname, location.search, nextLang);
      navigate(next);
    },
    [lang, location.pathname, location.search, navigate]
  );

  const value = useMemo(
    () => ({
      lang,
      languages: SUPPORTED_LANGS,
      messages,
      t,
      tl,
      taxonomyLabel,
      path,
      setLang,
      localizeList: (list) => localizeList(list, lang),
    }),
    [lang, messages, t, tl, taxonomyLabel, path, setLang]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return ctx;
}
