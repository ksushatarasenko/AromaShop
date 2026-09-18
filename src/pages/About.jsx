import SEO from '../components/common/SEO.jsx';
import { useLanguage } from '../i18n/LanguageContext.jsx';

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="page">
      <SEO title={t('about.title')} description={t('seo.aboutDescription')} />
      <div className="container">
        <header className="page-header">
          <p className="eyebrow">{t('about.eyebrow')}</p>
          <h1>{t('about.title')}</h1>
          <p className="lede">{t('site.positioning')}</p>
        </header>

        <div className="prose-page">
          <p>{t('about.p1')}</p>
          <h2>{t('about.h2perspective')}</h2>
          <p>{t('about.p2')}</p>
          <h2>{t('about.h2expertise')}</h2>
          <p>{t('about.p3')}</p>
          <h2>{t('about.h2boutique')}</h2>
          <p>{t('about.p4')}</p>
          <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '1.35rem' }}>
            {t('site.tagline')}
          </p>
        </div>
      </div>
    </div>
  );
}
