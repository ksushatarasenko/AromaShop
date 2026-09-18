import SEO from '../components/common/SEO.jsx';
import Button from '../components/common/Button.jsx';
import { useLanguage } from '../i18n/LanguageContext.jsx';

export default function Authenticity() {
  const { t } = useLanguage();

  return (
    <div className="page">
      <SEO title={t('authenticity.title')} description={t('seo.authDescription')} />
      <div className="container">
        <header className="page-header">
          <p className="eyebrow">{t('authenticity.eyebrow')}</p>
          <h1>{t('authenticity.title')}</h1>
          <p className="lede">{t('authenticity.lede')}</p>
        </header>

        <div className="prose-page">
          <p>{t('authenticity.p1')}</p>
          <h2>{t('authenticity.h2original')}</h2>
          <p>{t('authenticity.p2')}</p>
          <h2>{t('authenticity.h2transparent')}</h2>
          <p>{t('authenticity.p3')}</p>
          <h2>{t('authenticity.h2confirm')}</h2>
          <p>{t('authenticity.p4')}</p>
          <h2>{t('authenticity.h2standard')}</h2>
          <p>{t('authenticity.p5')}</p>
          <Button to="perfumes" variant="ghost">
            {t('authenticity.cta')}
          </Button>
        </div>
      </div>
    </div>
  );
}
