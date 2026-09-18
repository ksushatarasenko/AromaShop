import { Link } from 'react-router-dom';
import { useState } from 'react';
import { getNoteById } from '../../data/index.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { localize } from '../../i18n/localize.js';
import { DEFAULT_LANG } from '../../i18n/config.js';
import { getNoteImageCandidates, getNotePlaceholderImage } from '../../utils/noteImage.js';

/**
 * Reusable fragrance note card.
 * Resolves image + localized name from notes.json by note id.
 * Clickable — prepares /pl/nuty/{slug} and /uk/noty/{slug} architecture.
 */
export default function NoteCard({ noteId, className = '' }) {
  const { lang, path } = useLanguage();
  const note = getNoteById(noteId);
  const candidates = getNoteImageCandidates(note);
  const [srcIndex, setSrcIndex] = useState(0);

  const label = note
    ? localize(note.name, lang, DEFAULT_LANG) || noteId
    : noteId;

  const slug = note
    ? localize(note.slug, lang, DEFAULT_LANG) || note.id
    : noteId;

  const src = candidates[srcIndex] || getNotePlaceholderImage();

  const handleError = () => {
    if (srcIndex < candidates.length - 1) {
      setSrcIndex((i) => i + 1);
    }
  };

  const content = (
    <>
      <span className="note-card__media">
        <img
          src={src}
          alt=""
          className="note-card__image"
          loading="lazy"
          decoding="async"
          onError={handleError}
        />
      </span>
      <span className="note-card__name">{label}</span>
    </>
  );

  if (!note) {
    return (
      <span className={`note-card note-card--missing ${className}`.trim()}>
        {content}
      </span>
    );
  }

  return (
    <Link
      to={path('note', { slug })}
      className={`note-card ${className}`.trim()}
      aria-label={label}
    >
      {content}
    </Link>
  );
}
