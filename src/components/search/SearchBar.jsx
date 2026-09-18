import { useLanguage } from '../../i18n/LanguageContext.jsx';

export default function SearchBar({ value, onChange }) {
  const { t } = useLanguage();

  return (
    <label className="form-field" style={{ minWidth: '16rem', flex: 1 }}>
      <span className="sr-only">{t('nav.search')}</span>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t('common.searchPlaceholder')}
        aria-label={t('nav.search')}
      />
    </label>
  );
}
