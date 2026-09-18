import { useParams } from 'react-router-dom';
import SEO from '../components/common/SEO.jsx';
import Badge from '../components/common/Badge.jsx';
import Button from '../components/common/Button.jsx';
import PerfumeNotes from '../components/perfume/PerfumeNotes.jsx';
import PerfumeCharacter from '../components/perfume/PerfumeCharacter.jsx';
import PerfumePerformance from '../components/perfume/PerfumePerformance.jsx';
import SimilarPerfumes from '../components/perfume/SimilarPerfumes.jsx';
import PerfumeGallery from '../components/perfume/PerfumeGallery.jsx';
import PurchasePanel from '../components/order/PurchasePanel.jsx';
import LocaleLink from '../components/i18n/LocaleLink.jsx';
import { getPerfumeById, getBrandById } from '../data/index.js';
import { useLanguage } from '../i18n/LanguageContext.jsx';

export default function PerfumeDetails() {
  const { id } = useParams();
  const perfume = getPerfumeById(id);
  const brand = perfume ? getBrandById(perfume.brandId) : null;
  const { t, tl, taxonomyLabel } = useLanguage();

  if (!perfume) {
    return (
      <div className="page container">
        <h1>{t('perfume.notFound')}</h1>
        <p className="muted">{t('perfume.notFoundText')}</p>
        <Button to="perfumes" variant="ghost">
          {t('perfume.backToShop')}
        </Button>
      </div>
    );
  }

  const shortDescription = tl(perfume.shortDescription);
  const story = tl(perfume.story) || tl(perfume.description);
  const storyParagraphs = story
    ? story.split(/\n\n+/).map((p) => p.trim()).filter(Boolean)
    : [];
  const facts = (perfume.facts || []).map((fact) => tl(fact)).filter(Boolean);

  return (
    <div className="page">
      <SEO
        title={`${brand?.name ?? ''} ${perfume.name}`.trim()}
        description={tl(perfume.description) || shortDescription}
      />
      <div className="container perfume-details">
        <div className="perfume-details__hero">
          <PerfumeGallery perfume={perfume} />

          <div>
            <p className="perfume-details__brand">{brand?.name}</p>
            <h1 className="perfume-details__title">{perfume.name}</h1>
            <div className="perfume-details__meta">
              <span>{perfume.concentration}</span>
              <span>{taxonomyLabel('genders', perfume.gender)}</span>
              <span>{taxonomyLabel('collections', perfume.collection)}</span>
              {perfume.year ? <span>{perfume.year}</span> : null}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              {perfume.new ? <Badge>{t('common.new')}</Badge> : null}
              {perfume.bestseller ? <Badge variant="champagne">{t('common.bestseller')}</Badge> : null}
            </div>
            {shortDescription ? (
              <p className="perfume-details__short">{shortDescription}</p>
            ) : null}

            <PurchasePanel perfume={perfume} />
          </div>
        </div>

        <div className="dossier">
          <div className="dossier-overview">
            <div className="dossier-overview__left">
              {(perfume.fragrance?.families?.length || perfume.fragrance?.accords?.length) ? (
                <section className="dossier-section">
                  <h2>{t('perfume.profile')}</h2>
                  {perfume.fragrance?.families?.length ? (
                    <>
                      <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>{t('perfume.family')}</p>
                      <div className="tag-list" style={{ marginBottom: '1.25rem' }}>
                        {perfume.fragrance.families.map((familyId) => (
                          <span key={familyId} className="tag">
                            {taxonomyLabel('families', familyId)}
                          </span>
                        ))}
                      </div>
                    </>
                  ) : null}
                  {perfume.fragrance?.accords?.length ? (
                    <>
                      <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>{t('perfume.accords')}</p>
                      <div className="tag-list">
                        {perfume.fragrance.accords.map((accordId) => (
                          <span key={accordId} className="tag">
                            {taxonomyLabel('accords', accordId)}
                          </span>
                        ))}
                      </div>
                    </>
                  ) : null}
                </section>
              ) : null}

              <section className="dossier-section">
                <h2>{t('perfume.bestFor')}</h2>
                <div style={{ display: 'grid', gap: '1rem' }}>
                  <div>
                    <p className="eyebrow" style={{ marginBottom: '0.5rem' }}>{t('perfume.seasons')}</p>
                    <div className="tag-list">
                      {(perfume.wearing?.seasons ?? []).map((seasonId) => (
                        <span key={seasonId} className="tag">{taxonomyLabel('seasons', seasonId)}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="eyebrow" style={{ marginBottom: '0.5rem' }}>{t('perfume.timeOfDay')}</p>
                    <div className="tag-list">
                      {(perfume.wearing?.timeOfDay ?? []).map((timeId) => (
                        <span key={timeId} className="tag">{taxonomyLabel('timeOfDay', timeId)}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="eyebrow" style={{ marginBottom: '0.5rem' }}>{t('perfume.occasions')}</p>
                    <div className="tag-list">
                      {(perfume.wearing?.occasions ?? []).map((occId) => (
                        <span key={occId} className="tag">{taxonomyLabel('occasions', occId)}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <section className="dossier-section dossier-overview__notes">
              <PerfumeNotes notes={perfume.fragrance?.notes} />
            </section>
          </div>

          <section className="dossier-section">
            <h2>{t('perfume.character')}</h2>
            <PerfumeCharacter character={perfume.character} />
          </section>

          <section className="dossier-section">
            <h2>{t('perfume.performance')}</h2>
            <PerfumePerformance performance={perfume.performance} />
          </section>

          {storyParagraphs.length ? (
            <section className="dossier-section dossier-section--full">
              <h2>{t('perfume.story')}</h2>
              <div className="story-prose">
                {storyParagraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 48)}
                    className="lede"
                    dangerouslySetInnerHTML={{ __html: paragraph }}
                  />
                ))}
              </div>
            </section>
          ) : null}

          {facts.length ? (
            <section className="dossier-section dossier-section--full">
              <h2>{t('perfume.facts')}</h2>
              <ul className="facts-list">
                {facts.map((fact) => (
                  <li
                    key={fact.slice(0, 48)}
                    className="muted"
                    dangerouslySetInnerHTML={{ __html: fact }}
                  />
                ))}
              </ul>
            </section>
          ) : null}

          <SimilarPerfumes perfume={perfume} />
        </div>

        <p style={{ marginTop: '2rem' }}>
          <LocaleLink to="perfumes" className="btn btn--text">
            {t('perfume.backToShop')}
          </LocaleLink>
        </p>
      </div>
    </div>
  );
}
