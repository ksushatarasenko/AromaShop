import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { catalogPerfumes, brands, getBrandById } from '../../data/index.js';
import { searchPerfumes, searchBrands } from '../../utils/perfumeSearch.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';

export default function SearchModal({ open, onClose }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { t, path, lang } = useLanguage();

  useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return searchPerfumes(catalogPerfumes, query, lang).slice(0, 8);
  }, [query, lang]);

  const brandResults = useMemo(() => {
    if (!query.trim()) return [];
    return searchBrands(brands, query).slice(0, 3);
  }, [query]);

  if (!open) return null;

  const go = (target) => {
    onClose();
    navigate(target);
  };

  return (
    <div className="search-modal" role="dialog" aria-modal="true" aria-label={t('nav.search')}>
      <div className="search-modal__panel">
        <input
          className="search-modal__input"
          autoFocus
          type="search"
          placeholder={t('common.searchModalPlaceholder')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label={t('nav.search')}
        />

        <div className="search-modal__results">
          {brandResults.map((brand) => (
            <button
              key={brand.id}
              type="button"
              className="search-result"
              onClick={() => go(`${path('perfumes')}?brand=${brand.id}`)}
            >
              <span className="search-result__brand">{t('common.brand')}</span>
              <span className="search-result__name">{brand.name}</span>
            </button>
          ))}

          {results.map((perfume) => (
            <button
              key={perfume.id}
              type="button"
              className="search-result"
              onClick={() => go(path('perfume', { id: perfume.id }))}
            >
              <span className="search-result__brand">
                {getBrandById(perfume.brandId)?.name}
              </span>
              <span className="search-result__name">{perfume.name}</span>
            </button>
          ))}

          {query.trim() && !results.length && !brandResults.length ? (
            <p className="search-empty">{t('common.noMatches')}</p>
          ) : null}
        </div>

        <div style={{ marginTop: '1rem' }}>
          <button type="button" className="btn btn--ghost" onClick={onClose}>
            {t('common.close')}
          </button>
        </div>
      </div>
    </div>
  );
}
