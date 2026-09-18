import SEO from '../components/common/SEO.jsx';
import ArticleList from '../components/journal/ArticleList.jsx';
import { articles } from '../data/index.js';
import { useLanguage } from '../i18n/LanguageContext.jsx';

export default function Journal() {
  const { t } = useLanguage();
  const sorted = [...articles].sort(
    (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
  );

  return (
    <div className="page">
      <SEO title={t('journal.title')} description={t('seo.journalDescription')} />
      <div className="container">
        <header className="page-header">
          <p className="eyebrow">{t('journal.eyebrow')}</p>
          <h1>{t('journal.title')}</h1>
          <p className="lede">{t('journal.lede')}</p>
        </header>
        <ArticleList articles={sorted} />
      </div>
    </div>
  );
}
