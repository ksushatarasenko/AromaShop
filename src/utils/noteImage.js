import { site } from '../data/index.js';
import { IMAGE_EXTENSIONS } from './perfumeImage.js';

const BASE_URL = import.meta.env.BASE_URL;
const NOTES_ASSETS = `${BASE_URL}assets/notes`;

function withBasePath(path) {
  if (!path) return path;

  const value = String(path);

  if (value.startsWith('http://') || value.startsWith('https://')) {
    return value;
  }

  if (value.startsWith(BASE_URL)) {
    return value;
  }

  if (value.startsWith('/')) {
    return `${BASE_URL}${value.slice(1)}`;
  }

  return `${BASE_URL}${value}`;
}

function unique(list) {
  return [...new Set(list.filter(Boolean))];
}

function stripExtension(filename) {
  return String(filename || '').replace(/\.(jpe?g|png|webp|svg)$/i, '');
}

function noteFileUrl(filename) {
  if (!filename) return null;

  if (filename.startsWith('/')) {
    return withBasePath(filename);
  }

  return `${NOTES_ASSETS}/${filename}`;
}

export function getNotePlaceholderImage() {
  return withBasePath(
    site.images?.notePlaceholder ||
      site.images?.perfumePlaceholder ||
      '/assets/brand/perfume-placeholder.svg'
  );
}

/**
 * Candidate URLs for a note image from notes.json.
 * Tries configured filename, then same basename with other extensions.
 */
export function getNoteImageCandidates(note) {
  if (!note) return [getNotePlaceholderImage()];

  const candidates = [];
  const configured = note.image || `${note.id}.jpg`;

  candidates.push(noteFileUrl(configured));

  if (!String(configured).startsWith('/')) {
    const base = stripExtension(configured) || note.id;
    for (const ext of IMAGE_EXTENSIONS) {
      candidates.push(noteFileUrl(`${base}.${ext}`));
    }
    candidates.push(noteFileUrl(`${base}.svg`));
  }

  candidates.push(getNotePlaceholderImage());
  return unique(candidates);
}

export function getNoteImage(note) {
  return getNoteImageCandidates(note)[0];
}
