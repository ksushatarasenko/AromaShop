import { Link, useParams } from "react-router-dom";
import SEO from "../components/common/SEO.jsx";
import LocaleLink from "../components/i18n/LocaleLink.jsx";
import { allPerfumes, brands, getArticleBySlug } from "../data/index.js";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import { ROUTE_SEGMENTS } from "../i18n/config.js";

function renderArticleText(text, lang) {
  if (!text) return null;

  const perfumeTagRegex = /<perfume>(.*?)<\/perfume>/gi;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = perfumeTagRegex.exec(text)) !== null) {
    // Обычный текст перед названием парфюма
    if (match.index > lastIndex) {
      parts.push({
        type: "text",
        value: text.slice(lastIndex, match.index),
      });
    }

    const perfumeName = match[1].trim();

    // Ищем парфюм по названию
    const perfume = allPerfumes.find((item) => {
      const brand = brands.find((brand) => brand.id === item.brandId);

      const fullName = `${brand?.name || ""} ${item.name || ""}`
        .trim()
        .toLowerCase();

      return fullName === perfumeName.toLowerCase();
    });

    if (perfume) {
      parts.push({
        type: "perfume",
        name: perfumeName,
        id: perfume.id,
      });
    } else {
      // Если парфюм не найден — оставляем название обычным текстом
      parts.push({
        type: "text",
        value: perfumeName,
      });
    }

    lastIndex = perfumeTagRegex.lastIndex;
  }

  // Оставшийся текст после последнего <perfume>
  if (lastIndex < text.length) {
    parts.push({
      type: "text",
      value: text.slice(lastIndex),
    });
  }

  // Если в тексте вообще нет <perfume>
  if (parts.length === 0) {
    return text;
  }

  const perfumeRoute = ROUTE_SEGMENTS[lang].perfume;

  return parts.map((part, index) => {
    if (part.type === "perfume") {
      return (
        <Link
          key={index}
          to={`/${lang}/${perfumeRoute}/${part.id}`}
          className="article-perfume-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          {part.name}
        </Link>
      );
    }

    return <span key={index}>{part.value}</span>;
  });
}

export default function Article() {
  const { slug } = useParams();
  const article = getArticleBySlug(slug);
  const { t, tl, lang } = useLanguage();

  if (!article) {
    return (
      <div className="page container">
        <h1>{t("journal.notFound")}</h1>
        <LocaleLink to="journal" className="btn btn--text">
          {t("journal.back")}
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
            {article.publishedAt} · {article.readTime} {t("journal.minRead")}
          </p>
        </header>

        <div className="article-body">
          {article.content.map((block, index) => {
            if (block.type === "heading") {
              return <h2 key={index}>{tl(block.text)}</h2>;
            }

            return <p key={index}>{renderArticleText(tl(block.text), lang)}</p>;
          })}
        </div>

        <p style={{ marginTop: "3rem" }}>
          <LocaleLink to="journal" className="btn btn--text">
            {t("journal.back")}
          </LocaleLink>
        </p>
      </article>
    </div>
  );
}
