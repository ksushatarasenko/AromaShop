import LocaleLink from '../i18n/LocaleLink.jsx';
import JournalImage from './JournalImage.jsx';
import { useLanguage } from '../../i18n/LanguageContext.jsx';

export default function ArticleCard({ article }) {
  const { tl, t } = useLanguage();

  return (
    <article className="article-card">
      <LocaleLink
        to="article"
        params={{ slug: article.slug }}
        className="article-card__image-link"
      >
        <JournalImage
          article={article}
          className="article-card__image"
        />
      </LocaleLink>

      <h3 className="article-card__title">
        <LocaleLink
          to="article"
          params={{ slug: article.slug }}
        >
          {tl(article.title)}
        </LocaleLink>
      </h3>

      <p className="article-card__excerpt">
        {tl(article.excerpt)}
      </p>

      <LocaleLink
        to="article"
        params={{ slug: article.slug }}
        className="article-card__read-more"
      >
        {t('home.readMore')}
        <span aria-hidden="true">→</span>
      </LocaleLink>
    </article>
  );
}
