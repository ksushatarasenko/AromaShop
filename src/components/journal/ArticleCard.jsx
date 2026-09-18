import LocaleLink from '../i18n/LocaleLink.jsx';
import JournalImage from './JournalImage.jsx';
import { useLanguage } from '../../i18n/LanguageContext.jsx';

export default function ArticleCard({ article }) {
  const { t, tl } = useLanguage();

  return (
    <article className="article-card">
      <JournalImage article={article} className="article-card__image" />
      <p className="article-card__category">{article.category}</p>
      <h3>
        <LocaleLink to="article" params={{ slug: article.slug }}>
          {tl(article.title)}
        </LocaleLink>
      </h3>
      <p>{tl(article.excerpt)}</p>
      <p className="article-meta">
        {article.publishedAt} · {article.readTime} {t('journal.minRead')}
      </p>
    </article>
  );
}
