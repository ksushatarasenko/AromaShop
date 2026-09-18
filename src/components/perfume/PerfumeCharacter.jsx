import { taxonomy } from '../../data/index.js';
import CharacterMeter from '../common/CharacterMeter.jsx';
import { useLanguage } from '../../i18n/LanguageContext.jsx';

export default function PerfumeCharacter({ character }) {
  const { taxonomyLabel } = useLanguage();
  if (!character) return null;

  return (
    <div className="meter-list">
      {taxonomy.characterScales.map((scale) => (
        <CharacterMeter
          key={scale.id}
          label={taxonomyLabel('characterScales', scale.id)}
          value={character[scale.id]}
          max={scale.max}
        />
      ))}
    </div>
  );
}
