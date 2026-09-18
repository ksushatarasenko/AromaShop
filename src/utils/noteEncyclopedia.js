import { getNoteById, getNoteLabel, notesLibrary } from '../data/index.js';
import { localize } from '../i18n/localize.js';
import { DEFAULT_LANG } from '../i18n/config.js';

function localizeField(field, lang, fallback = DEFAULT_LANG) {
  if (field == null) return '';
  if (typeof field === 'string') return field.trim();
  return String(localize(field, lang, fallback) || '').trim();
}

function localizeStringArray(field, lang, fallback = DEFAULT_LANG) {
  if (!field) return [];
  if (Array.isArray(field)) return field.filter(Boolean);
  if (typeof field === 'object') {
    const list = field[lang] ?? field[fallback] ?? [];
    return Array.isArray(list) ? list.filter(Boolean) : [];
  }
  return [];
}

function findNoteIdByLabel(label, lang) {
  if (!label) return null;
  const needle = String(label).trim().toLowerCase();
  const match = notesLibrary.find((note) => {
    const name = localize(note.name, lang, DEFAULT_LANG).toLowerCase();
    const other = localize(
      note.name,
      lang === 'pl' ? 'uk' : 'pl',
      DEFAULT_LANG
    ).toLowerCase();
    return name === needle || other === needle;
  });
  return match?.id ?? null;
}

/**
 * Resolve encyclopedia content for a note page.
 * Prefers explicit note fields (pl/uk). Supports pairsWith as note IDs
 * or bilingual label lists { pl: [], uk: [] }.
 */
export function getNoteEncyclopediaContent(note, lang = DEFAULT_LANG) {
  if (!note) return null;

  const name = localize(note.name, lang, DEFAULT_LANG) || note.id;

  const shortDescription =
    localizeField(note.shortDescription, lang) ||
    localizeField(note.description, lang);

  const origin = localizeField(note.origin, lang);
  const extraction = localizeField(note.extraction, lang);
  const effect = localizeField(note.effect, lang);
  const characteristics = localizeStringArray(note.characteristics, lang);

  let pairsWith = [];

  if (Array.isArray(note.pairsWith) && note.pairsWith.every((x) => typeof x === 'string')) {
    // Language-independent note IDs
    pairsWith = note.pairsWith
      .map((id) => {
        if (getNoteById(id)) {
          return { id, label: getNoteLabel(id, lang) };
        }
        return { id: null, label: id };
      })
      .filter((p) => p.label);
  } else {
    const labels = localizeStringArray(note.pairsWith, lang);
    pairsWith = labels.map((label) => {
      const id = findNoteIdByLabel(label, lang);
      return { id, label };
    });
  }

  return {
    name,
    shortDescription,
    origin,
    extraction,
    effect,
    characteristics,
    pairsWith,
  };
}
