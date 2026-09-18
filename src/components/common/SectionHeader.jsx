import LocaleLink from '../i18n/LocaleLink.jsx';
import { useLanguage } from '../../i18n/LanguageContext.jsx';

export default function SectionHeader({ eyebrow, title, actionLabel, actionTo }) {
  const { t } = useLanguage();

  return (
    <div className="home-section__head">
      <div>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2>{title}</h2>
      </div>
      {actionTo ? (
        <LocaleLink to={actionTo} className="btn btn--text">
          {actionLabel || t('common.viewAll')}
        </LocaleLink>
      ) : null}
    </div>
  );
}
