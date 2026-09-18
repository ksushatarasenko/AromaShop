import { useLanguage } from '../../i18n/LanguageContext.jsx';
import NoteCard from './NoteCard.jsx';

/**
 * Visual fragrance pyramid — top / heart / base note cards with images.
 */
export default function PerfumeNotes({ notes }) {
  const { t } = useLanguage();

  if (!notes) return null;

  const tiers = [
    { key: 'top', labelKey: 'notes.top' },
    { key: 'heart', labelKey: 'notes.heart' },
    { key: 'base', labelKey: 'notes.base' },
  ];

  const hasAny = tiers.some((tier) => (notes[tier.key] ?? []).length > 0);
  if (!hasAny) return null;

  return (
    <div className="notes-library">
      <h2 className="notes-library__title">{t('notes.title')}</h2>
      {tiers.map((tier) => {
        const list = notes[tier.key] ?? [];
        if (!list.length) return null;
        return (
          <div key={tier.key} className="notes-tier">
            <h3 className="notes-tier__title">{t(tier.labelKey)}</h3>
            <div className="notes-grid">
              {list.map((id) => (
                <NoteCard key={id} noteId={id} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
