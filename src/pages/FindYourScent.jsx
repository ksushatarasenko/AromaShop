import { useState } from 'react';
import SEO from '../components/common/SEO.jsx';
import Button from '../components/common/Button.jsx';
import PerfumeGrid from '../components/perfume/PerfumeGrid.jsx';
import { catalogPerfumes, taxonomy } from '../data/index.js';
import { getTopMatches } from '../utils/perfumeMatching.js';
import { useLanguage } from '../i18n/LanguageContext.jsx';

const MOOD_IDS = ['fresh', 'warm', 'soft', 'bold', 'elegant'];
const NOTE_CHOICES = [
  'vanilla', 'rose', 'oud', 'citrus', 'woody', 'coffee',
  'jasmine', 'sandalwood', 'musk', 'amber', 'lavender', 'fig',
];
const steps = ['gender', 'mood', 'character', 'season', 'occasion', 'notes'];

export default function FindYourScent() {
  const { t, taxonomyLabel } = useLanguage();
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState({
    gender: '',
    mood: '',
    sweetness: 3,
    freshness: 3,
    warmth: 3,
    intensity: 3,
    season: '',
    occasion: '',
    notes: [],
  });
  const [done, setDone] = useState(false);

  const step = steps[stepIndex];
  const matches = done ? getTopMatches(catalogPerfumes, answers, 4).map((m) => m.perfume) : [];

  const next = () => {
    if (stepIndex < steps.length - 1) setStepIndex((i) => i + 1);
    else setDone(true);
  };

  const back = () => {
    if (done) {
      setDone(false);
      return;
    }
    setStepIndex((i) => Math.max(0, i - 1));
  };

  const toggleNote = (id) => {
    setAnswers((prev) => ({
      ...prev,
      notes: prev.notes.includes(id)
        ? prev.notes.filter((n) => n !== id)
        : [...prev.notes, id],
    }));
  };

  const reset = () => {
    setDone(false);
    setStepIndex(0);
    setAnswers({
      gender: '',
      mood: '',
      sweetness: 3,
      freshness: 3,
      warmth: 3,
      intensity: 3,
      season: '',
      occasion: '',
      notes: [],
    });
  };

  return (
    <div className="page">
      <SEO title={t('find.title')} description={t('seo.findDescription')} />
      <div className="container">
        <header className="page-header">
          <p className="eyebrow">{t('find.eyebrow')}</p>
          <h1>{t('find.title')}</h1>
          <p className="lede">{t('find.lede')}</p>
        </header>

        {done ? (
          <section>
            <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>
              {t('find.yourSelection')}
            </h2>
            {matches.length ? (
              <PerfumeGrid perfumes={matches} />
            ) : (
              <p className="muted">{t('find.noMatches')}</p>
            )}
            <div className="quiz-nav" style={{ marginTop: '2rem' }}>
              <Button variant="ghost" onClick={back}>
                {t('find.adjust')}
              </Button>
              <Button variant="primary" onClick={reset}>
                {t('find.startOver')}
              </Button>
            </div>
          </section>
        ) : (
          <div className="quiz">
            <p className="muted">
              {t('find.step')} {stepIndex + 1} {t('find.of')} {steps.length}
            </p>

            {step === 'gender' && (
              <div className="quiz-step">
                <h2>{t('find.genderTitle')}</h2>
                <div className="quiz-options">
                  {taxonomy.genders.map((g) => (
                    <button
                      key={g.id}
                      type="button"
                      className={`filter-chip${answers.gender === g.id ? ' is-active' : ''}`}
                      onClick={() => setAnswers((a) => ({ ...a, gender: g.id }))}
                    >
                      {taxonomyLabel('genders', g.id)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 'mood' && (
              <div className="quiz-step">
                <h2>{t('find.moodTitle')}</h2>
                <div className="quiz-options">
                  {MOOD_IDS.map((id) => (
                    <button
                      key={id}
                      type="button"
                      className={`filter-chip${answers.mood === id ? ' is-active' : ''}`}
                      onClick={() => setAnswers((a) => ({ ...a, mood: id }))}
                    >
                      {t(`find.moods.${id}`)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 'character' && (
              <div className="quiz-step">
                <h2>{t('find.characterTitle')}</h2>
                {taxonomy.characterScales.map((scale) => (
                  <div key={scale.id} className="filter-scale" style={{ marginBottom: '1.25rem' }}>
                    <h3>
                      {taxonomyLabel('characterScales', scale.id)}: {answers[scale.id]}
                    </h3>
                    <input
                      type="range"
                      min={scale.min}
                      max={scale.max}
                      value={answers[scale.id]}
                      onChange={(e) =>
                        setAnswers((a) => ({ ...a, [scale.id]: Number(e.target.value) }))
                      }
                    />
                  </div>
                ))}
              </div>
            )}

            {step === 'season' && (
              <div className="quiz-step">
                <h2>{t('find.seasonTitle')}</h2>
                <div className="quiz-options">
                  {taxonomy.seasons.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      className={`filter-chip${answers.season === s.id ? ' is-active' : ''}`}
                      onClick={() => setAnswers((a) => ({ ...a, season: s.id }))}
                    >
                      {taxonomyLabel('seasons', s.id)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 'occasion' && (
              <div className="quiz-step">
                <h2>{t('find.occasionTitle')}</h2>
                <div className="quiz-options">
                  {taxonomy.occasions.map((o) => (
                    <button
                      key={o.id}
                      type="button"
                      className={`filter-chip${answers.occasion === o.id ? ' is-active' : ''}`}
                      onClick={() => setAnswers((a) => ({ ...a, occasion: o.id }))}
                    >
                      {taxonomyLabel('occasions', o.id)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 'notes' && (
              <div className="quiz-step">
                <h2>{t('find.notesTitle')}</h2>
                <div className="quiz-options">
                  {NOTE_CHOICES.map((id) => {
                    const label =
                      taxonomyLabel('notes', id) !== id
                        ? taxonomyLabel('notes', id)
                        : taxonomyLabel('accords', id);
                    return (
                      <button
                        key={id}
                        type="button"
                        className={`filter-chip${answers.notes.includes(id) ? ' is-active' : ''}`}
                        onClick={() => toggleNote(id)}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="quiz-nav">
              {stepIndex > 0 ? (
                <Button variant="ghost" onClick={back}>
                  {t('common.back')}
                </Button>
              ) : null}
              <Button variant="primary" onClick={next}>
                {stepIndex === steps.length - 1 ? t('find.seeSelection') : t('common.continue')}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
