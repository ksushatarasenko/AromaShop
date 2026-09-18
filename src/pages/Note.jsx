import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import SEO from '../components/common/SEO.jsx';
import ImageLightbox from '../components/common/ImageLightbox.jsx';
import PerfumeGrid from '../components/perfume/PerfumeGrid.jsx';
import { getNoteById, getNoteBySlug, getPerfumesByNoteId } from '../data/index.js';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { localize } from '../i18n/localize.js';
import { DEFAULT_LANG } from '../i18n/config.js';
import { getNoteEncyclopediaContent } from '../utils/noteEncyclopedia.js';
import {
  getNoteImageCandidates,
  getNotePlaceholderImage,
} from '../utils/noteImage.js';

function noteSlugFor(noteId, lang) {
  const n = getNoteById(noteId);
  if (!n) return noteId;
  return localize(n.slug, lang, DEFAULT_LANG) || n.id;
}

/**
 * Note detail page — fragrance encyclopedia entry
 * /pl/nuty/{slug} · /uk/noty/{slug}
 */
export default function Note() {
  const { slug } = useParams();
  const { lang, t, path } = useLanguage();
  const note = getNoteBySlug(slug, lang);
  const [srcIndex, setSrcIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    setSrcIndex(0);
    setLightboxOpen(false);
  }, [note?.id]);

  if (!note) {
    return (
      <div className="note-encyclopedia">
        <div className="note-encyclopedia__inner">
          <SEO title={t('notes.notFound')} />
          <p className="muted">{t('notes.notFound')}</p>
          <Link to={path('perfumes')}>{t('common.back')}</Link>
        </div>
      </div>
    );
  }

  const content = getNoteEncyclopediaContent(note, lang);
  const perfumes = getPerfumesByNoteId(note.id);
  const candidates = getNoteImageCandidates(note);
  const imageSrc =
    candidates[Math.min(srcIndex, candidates.length - 1)] ||
    getNotePlaceholderImage();

  return (
    <div className="note-encyclopedia">
      <SEO
        title={content.name}
        description={content.shortDescription || content.name}
      />

      <div className="note-encyclopedia__inner">
        <header className="note-encyclopedia__hero">
          <button
            type="button"
            className="note-encyclopedia__media"
            onClick={() => setLightboxOpen(true)}
            aria-label={t('notes.openImage')}
          >
            <img
              key={`${note.id}-${imageSrc}`}
              src={imageSrc}
              alt={content.name}
              className="note-encyclopedia__image"
              loading="eager"
              decoding="async"
              onError={() => {
                setSrcIndex((i) => (i < candidates.length - 1 ? i + 1 : i));
              }}
            />
          </button>
          <div className="note-encyclopedia__intro">
            <p className="eyebrow">{t('notes.encyclopediaEyebrow')}</p>
            <h1 className="note-encyclopedia__title">{content.name}</h1>
            {content.shortDescription ? (
              <p className="note-encyclopedia__lede">{content.shortDescription}</p>
            ) : null}
          </div>
        </header>

        {(content.origin || content.extraction) ? (
          <section className="note-encyclopedia__section">
            <h2 className="note-encyclopedia__heading">{t('notes.originTitle')}</h2>
            <div className="note-encyclopedia__prose">
              {content.origin ? <p>{content.origin}</p> : null}
              {content.extraction ? <p>{content.extraction}</p> : null}
            </div>
          </section>
        ) : null}

        {content.effect ? (
          <section className="note-encyclopedia__section">
            <h2 className="note-encyclopedia__heading">{t('notes.effectTitle')}</h2>
            <div className="note-encyclopedia__prose">
              <p>{content.effect}</p>
            </div>
          </section>
        ) : null}

        {content.characteristics.length ? (
          <section className="note-encyclopedia__section">
            <h2 className="note-encyclopedia__heading">{t('notes.characterTitle')}</h2>
            <ul className="note-encyclopedia__chips" aria-label={t('notes.characterTitle')}>
              {content.characteristics.map((chip) => (
                <li key={chip} className="note-encyclopedia__chip">
                  {chip}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {content.pairsWith.length ? (
          <section className="note-encyclopedia__section">
            <h2 className="note-encyclopedia__heading">{t('notes.pairsTitle')}</h2>
            <ul className="note-encyclopedia__pairs">
              {content.pairsWith.map((pair) => (
                <li key={pair.id || pair.label}>
                  {pair.id ? (
                    <Link
                      to={path('note', { slug: noteSlugFor(pair.id, lang) })}
                      className="note-encyclopedia__pair"
                    >
                      {pair.label}
                    </Link>
                  ) : (
                    <span className="note-encyclopedia__pair note-encyclopedia__pair--static">
                      {pair.label}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="note-encyclopedia__section note-encyclopedia__section--perfumes">
          <h2 className="note-encyclopedia__heading">{t('notes.inCollection')}</h2>
          {perfumes.length ? (
            <PerfumeGrid perfumes={perfumes} />
          ) : (
            <p className="muted">{t('notes.noPerfumes')}</p>
          )}
        </section>
      </div>

      {lightboxOpen ? (
        <ImageLightbox
          src={imageSrc}
          alt={content.name}
          onClose={() => setLightboxOpen(false)}
          closeLabel={t('common.close')}
        />
      ) : null}
    </div>
  );
}
