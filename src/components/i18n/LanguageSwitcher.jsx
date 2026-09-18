import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { LANG_LABELS } from '../../i18n/config.js';

export default function LanguageSwitcher() {
  const { lang, languages, setLang } = useLanguage();

  return (
    <div className="lang-switcher" role="group" aria-label="Language">
      {languages.map((code, index) => (
        <span key={code} className="lang-switcher__item">
          {index > 0 ? <span className="lang-switcher__sep" aria-hidden="true">|</span> : null}
          <button
            type="button"
            className={`lang-switcher__btn${lang === code ? ' is-active' : ''}`}
            onClick={() => setLang(code)}
            aria-pressed={lang === code}
            aria-label={LANG_LABELS[code]}
          >
            {LANG_LABELS[code]}
          </button>
        </span>
      ))}
    </div>
  );
}
