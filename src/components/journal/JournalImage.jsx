import { useState } from 'react';
import { getJournalImage } from '../../utils/perfumeImage.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';

export default function JournalImage({ article, className = '' }) {
  const [failed, setFailed] = useState(false);
  const { tl } = useLanguage();
  const src = getJournalImage(article);

  if (!src || failed) return null;

  return (
    <img
      src={src}
      alt={tl(article.title)}
      className={`journal-image ${className}`.trim()}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
