/**
 * Find Your Scent matching algorithm.
 * Score-based — easy to replace later with AI matching.
 */

function overlapScore(selected, source, weight = 1) {
  if (!selected?.length || !source?.length) return 0;
  const hits = selected.filter((id) => source.includes(id)).length;
  return (hits / selected.length) * weight;
}

function characterScore(selected, actual, weight = 1) {
  if (selected == null || selected === '') return 0;
  const diff = Math.abs(Number(selected) - Number(actual ?? 0));
  // Closer = better; exact match = full weight
  return Math.max(0, 1 - diff / 4) * weight;
}

/**
 * @param {object[]} perfumes
 * @param {object} answers - from the Find Your Scent quiz
 * @returns {{ perfume, score }[]} sorted by score desc
 */
export function matchPerfumes(perfumes, answers = {}) {
  const scored = perfumes.map((perfume) => {
    let score = 0;

    if (answers.gender && perfume.gender === answers.gender) {
      score += 3;
    } else if (answers.gender && perfume.gender === 'unisex') {
      score += 1.5;
    }

    if (answers.mood) {
      const moodMap = {
        fresh: { freshness: 4, sweetness: 1 },
        warm: { warmth: 4, sweetness: 3 },
        soft: { intensity: 2, sweetness: 2 },
        bold: { intensity: 4, warmth: 3 },
        elegant: { intensity: 3, freshness: 2 },
      };
      const target = moodMap[answers.mood];
      if (target) {
        Object.entries(target).forEach(([key, value]) => {
          score += characterScore(value, perfume.character?.[key], 1.2);
        });
      }
    }

    score += characterScore(answers.sweetness, perfume.character?.sweetness, 1.5);
    score += characterScore(answers.freshness, perfume.character?.freshness, 1.5);
    score += characterScore(answers.warmth, perfume.character?.warmth, 1.5);
    score += characterScore(answers.intensity, perfume.character?.intensity, 1.5);

    if (answers.season) {
      score += overlapScore([answers.season], perfume.wearing?.seasons, 2);
    }

    if (answers.occasion) {
      score += overlapScore([answers.occasion], perfume.wearing?.occasions, 2);
    }

    if (answers.notes?.length) {
      const allNotes = [
        ...(perfume.fragrance?.notes?.top ?? []),
        ...(perfume.fragrance?.notes?.heart ?? []),
        ...(perfume.fragrance?.notes?.base ?? []),
        ...(perfume.fragrance?.accords ?? []),
      ];
      score += overlapScore(answers.notes, allNotes, 3);
    }

    if (answers.collection && perfume.collection === answers.collection) {
      score += 1;
    }

    return { perfume, score };
  });

  return scored
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);
}

export function getTopMatches(perfumes, answers, limit = 4) {
  return matchPerfumes(perfumes, answers).slice(0, limit);
}
