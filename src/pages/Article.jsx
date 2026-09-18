import { useParams } from 'react-router-dom';
import SEO from '../components/common/SEO.jsx';
import LocaleLink from '../components/i18n/LocaleLink.jsx';
import { getArticleBySlug } from '../data/index.js';
import { useLanguage } from '../i18n/LanguageContext.jsx';

export default function Article() {
  const { slug } = useParams();
  const article = getArticleBySlug(slug);
  const { t, tl } = useLanguage();

  if (!article) {
    return (
      <div className="page container">
        <h1>{t('journal.notFound')}</h1>
        <LocaleLink to="journal" className="btn btn--text">
          {t('journal.back')}
        </LocaleLink>
      </div>
    );
  }

  return (
    <div className="page">
      <SEO title={tl(article.title)} description={tl(article.excerpt)} />
      <article className="container container--editorial">
        <header className="page-header">
          <p className="eyebrow">{article.category}</p>
          <h1>{tl(article.title)}</h1>
          <p className="article-meta">
            {article.publishedAt} · {article.readTime} {t('journal.minRead')}
          </p>
        </header>
        <div className="article-body">
          {article.content.map((block, index) => {
            if (block.type === 'heading') {
              return <h2 key={index}>{tl(block.text)}</h2>;
            }
            return <p key={index}>{tl(block.text)}</p>;
          })}
        </div>
        <p style={{ marginTop: '3rem' }}>
          <LocaleLink to="journal" className="btn btn--text">
            {t('journal.back')}
          </LocaleLink>
        </p>
      </article>
    </div>
  );
}
