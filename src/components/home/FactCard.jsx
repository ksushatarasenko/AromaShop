import LocaleLink from '../i18n/LocaleLink.jsx';
import { useLanguage } from '../../i18n/LanguageContext.jsx';

export default function FactCard({ fact }) {
  const { t, tl } = useLanguage();

  return (
    <article className="fact-card">
      <h3>{tl(fact.title)}</h3>
      <p>{tl(fact.text)}</p>
      {fact.linkRoute ? (
        <LocaleLink to={fact.linkRoute} params={fact.linkParams}>
          {t('common.learnMore')}
        </LocaleLink>
      ) : null}
    </article>
  );
}
