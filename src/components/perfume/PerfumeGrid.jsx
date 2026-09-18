import PerfumeCard from './PerfumeCard.jsx';
import { useLanguage } from '../../i18n/LanguageContext.jsx';

export default function PerfumeGrid({ perfumes }) {
  const { t } = useLanguage();

  if (!perfumes?.length) {
    return <p className="muted">{t('common.noFragrances')}</p>;
  }

  return (
    <div className="perfume-grid">
      {perfumes.map((perfume) => (
        <PerfumeCard key={perfume.id} perfume={perfume} />
      ))}
    </div>
  );
}
