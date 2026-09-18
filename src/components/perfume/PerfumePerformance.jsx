import { taxonomy } from '../../data/index.js';
import CharacterMeter from '../common/CharacterMeter.jsx';
import { useLanguage } from '../../i18n/LanguageContext.jsx';

export default function PerfumePerformance({ performance }) {
  const { taxonomyLabel } = useLanguage();
  if (!performance) return null;

  return (
    <div className="meter-list">
      {taxonomy.performanceScales.map((scale) => (
        <CharacterMeter
          key={scale.id}
          label={taxonomyLabel('performanceScales', scale.id)}
          value={performance[scale.id]}
          max={scale.max}
        />
      ))}
    </div>
  );
}
