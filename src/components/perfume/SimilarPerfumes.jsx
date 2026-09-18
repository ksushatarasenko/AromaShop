import PerfumeGrid from './PerfumeGrid.jsx';
import { getSimilarPerfumes } from '../../data/index.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';

export default function SimilarPerfumes({ perfume }) {
  const { t } = useLanguage();
  const similar = getSimilarPerfumes(perfume);
  if (!similar.length) return null;

  return (
    <section className="dossier-section dossier-section--full">
      <h2>{t('perfume.similar')}</h2>
      <PerfumeGrid perfumes={similar} />
    </section>
  );
}
