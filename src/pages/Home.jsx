import SEO from '../components/common/SEO.jsx';
import Button from '../components/common/Button.jsx';
import SectionHeader from '../components/common/SectionHeader.jsx';
import PerfumeGrid from '../components/perfume/PerfumeGrid.jsx';
import ArticleCard from '../components/journal/ArticleCard.jsx';
import FactCard from '../components/home/FactCard.jsx';
import LocaleLink from '../components/i18n/LocaleLink.jsx';
import {
  articles,
  facts,
  getFeaturedPerfumes,
  getNewPerfumes,
  getPerfumesByCollection,
} from '../data/index.js';
import { useLanguage } from '../i18n/LanguageContext.jsx';

export default function Home() {
  const { t } = useLanguage();
  const selected = getFeaturedPerfumes().slice(0, 4);
  const arrivals = getNewPerfumes().slice(0, 3);
  const luxury = getPerfumesByCollection('luxury').slice(0, 3);
  const niche = getPerfumesByCollection('niche').slice(0, 3);
  const journal = articles.filter((a) => a.featured).slice(0, 3);

  return (
    <>
      <SEO description={t('site.description')} />

      <section className="hero">
        <div className="hero__atmosphere" aria-hidden="true" />
        <div className="container hero__content">
          <p className="hero__positioning">{t('site.positioning')}</p>
          <h1 className="hero__brand">AROMASHOP</h1>
          <p className="hero__tagline">{t('site.tagline')}</p>
          <div className="hero__actions">
            <Button to="perfumes" variant="primary">
              {t('home.discoverFragrances')}
            </Button>
            <Button to="find" variant="ghost">
              {t('home.findYourScent')}
            </Button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow={t('home.selectedEyebrow')}
            title={t('home.selectedTitle')}
            actionLabel={t('home.shopAll')}
            actionTo="perfumes"
          />
          <PerfumeGrid perfumes={selected} />
        </div>
      </section>

      {arrivals.length ? (
        <section className="section section--tight">
          <div className="container">
            <SectionHeader
              eyebrow={t('home.newEyebrow')}
              title={t('home.newTitle')}
              actionTo="perfumes"
              actionLabel={t('common.explore')}
            />
            <PerfumeGrid perfumes={arrivals} />
          </div>
        </section>
      ) : null}

      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow={t('home.collectionsEyebrow')}
            title={t('home.collectionsTitle')}
          />
          <div className="collection-strip">
            <div className="collection-teaser">
              <h3>{t('home.luxuryTitle')}</h3>
              <p>{t('home.luxuryText')}</p>
              <PerfumeGrid perfumes={luxury} />
              <Button to="luxury" variant="text">
                {t('home.viewLuxury')}
              </Button>
            </div>
            <div className="collection-teaser">
              <h3>{t('home.nicheTitle')}</h3>
              <p>{t('home.nicheText')}</p>
              <PerfumeGrid perfumes={niche} />
              <Button to="niche" variant="text">
                {t('home.viewNiche')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="find-scent-cta">
            <p className="eyebrow">{t('home.findEyebrow')}</p>
            <h2>{t('home.findTitle')}</h2>
            <p>{t('home.findText')}</p>
            <Button to="find" variant="primary">
              {t('home.findCta')}
            </Button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow={t('home.journalEyebrow')}
            title={t('home.journalTitle')}
            actionLabel={t('home.readMore')}
            actionTo="journal"
          />
          <div className="article-grid article-grid--home">
            {journal.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <SectionHeader
            eyebrow={t('home.factsEyebrow')}
            title={t('home.factsTitle')}
          />
          <div className="fact-grid">
            {facts.slice(0, 3).map((fact) => (
              <FactCard key={fact.id} fact={fact} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="authenticity-band">
            <p className="eyebrow">{t('home.authEyebrow')}</p>
            <h2>{t('home.authTitle')}</h2>
            <p>{t('home.authText')}</p>
            <LocaleLink to="authenticity" className="btn btn--text">
              {t('home.authLink')}
            </LocaleLink>
          </div>
        </div>
      </section>
    </>
  );
}
