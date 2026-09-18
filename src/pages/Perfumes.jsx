import { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SEO from '../components/common/SEO.jsx';
import SearchBar from '../components/search/SearchBar.jsx';
import FilterPanel from '../components/filters/FilterPanel.jsx';
import PerfumeGrid from '../components/perfume/PerfumeGrid.jsx';
import { catalogPerfumes, taxonomy } from '../data/index.js';
import {
  createEmptyFilters,
  filterPerfumes,
  sortPerfumes,
} from '../utils/perfumeFilters.js';
import { searchPerfumes } from '../utils/perfumeSearch.js';
import { getMinMaxPrices } from '../utils/price.js';
import { useLanguage } from '../i18n/LanguageContext.jsx';

const TITLE_KEYS = {
  women: 'catalog.titleWomen',
  men: 'catalog.titleMen',
  unisex: 'catalog.titleUnisex',
  luxury: 'catalog.titleLuxury',
  niche: 'catalog.titleNiche',
};

export default function Perfumes({ categoryKey }) {
  const { t, taxonomyLabel, lang } = useLanguage();
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState(() => createEmptyFilters());
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('recommended');
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    const next = createEmptyFilters();
    if (['women', 'men', 'unisex'].includes(categoryKey)) {
      next.gender = [categoryKey];
    } else if (['luxury', 'niche'].includes(categoryKey)) {
      next.collection = [categoryKey];
    }
    const brand = searchParams.get('brand');
    if (brand) next.brandId = [brand];
    setFilters(next);
  }, [categoryKey, searchParams]);

  const priceBounds = useMemo(() => getMinMaxPrices(catalogPerfumes), []);

  const results = useMemo(() => {
    const filtered = filterPerfumes(catalogPerfumes, filters);
    const searched = searchPerfumes(filtered, query, lang);
    return sortPerfumes(searched, sort);
  }, [filters, query, sort, lang]);

  const pageTitle = categoryKey && TITLE_KEYS[categoryKey]
    ? t(TITLE_KEYS[categoryKey])
    : t('catalog.title');

  return (
    <div className="page">
      <SEO title={pageTitle} description={t('seo.catalogDescription')} />
      <div className="container">
        <header className="page-header">
          <p className="eyebrow">{t('catalog.eyebrow')}</p>
          <h1>{pageTitle}</h1>
          <p className="lede">{t('catalog.lede')}</p>
        </header>

        <div className="catalog-layout">
          <FilterPanel
            filters={filters}
            onChange={setFilters}
            open={filtersOpen}
            priceBounds={priceBounds}
          />

          <div>
            <div className="catalog-toolbar">
              <div className="catalog-toolbar__row">
                <SearchBar value={query} onChange={setQuery} />
                <button
                  type="button"
                  className="btn btn--ghost filters-toggle"
                  onClick={() => setFiltersOpen((v) => !v)}
                >
                  {filtersOpen ? t('common.hideFilters') : t('common.filters')}
                </button>
              </div>
              <div className="catalog-toolbar__row">
                <p className="catalog-count">
                  {results.length === 1
                    ? `1 ${t('common.fragrance')}`
                    : `${results.length} ${t('common.fragrances')}`}
                </p>
                <label className="catalog-sort">
                  <span className="sr-only">{t('common.sortBy')}</span>
                  <select value={sort} onChange={(e) => setSort(e.target.value)}>
                    {taxonomy.sortOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {taxonomyLabel('sortOptions', option.id)}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>

            <PerfumeGrid perfumes={results} />
          </div>
        </div>
      </div>
    </div>
  );
}
