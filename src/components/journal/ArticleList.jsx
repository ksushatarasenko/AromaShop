import ArticleCard from './ArticleCard.jsx';
import { useLanguage } from '../../i18n/LanguageContext.jsx';

export default function ArticleList({ articles }) {
  const { t } = useLanguage();

  if (!articles?.length) {
    return <p className="muted">{t('journal.empty')}</p>;
  }

  return (
    <div className="article-grid">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}
