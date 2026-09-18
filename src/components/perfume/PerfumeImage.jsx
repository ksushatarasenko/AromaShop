import { useEffect, useMemo, useState } from 'react';
import {
  getPerfumeImageCandidates,
  getPlaceholderImage,
  getPerfumeImageAlt,
  warnMissingPerfumeImage,
} from '../../utils/perfumeImage.js';

/**
 * Tries main.jpg / jpeg / png / webp (and configured filename) until one loads.
 * Falls back to elegant placeholder — never shows a broken image.
 */
export default function PerfumeImage({
  perfume,
  brand,
  className = '',
  objectFit = 'contain',
  sizes,
}) {
  const candidates = useMemo(
    () => getPerfumeImageCandidates(perfume),
    [perfume]
  );
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [perfume?.id, perfume?.image]);

  const src = candidates[index] || getPlaceholderImage();
  const isPlaceholder = src === getPlaceholderImage();
  const alt = getPerfumeImageAlt(perfume, brand);

  return (
    <img
      key={`${perfume?.id}-${src}`}
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={`perfume-image${isPlaceholder ? ' perfume-image--placeholder' : ''} ${className}`.trim()}
      style={{ objectFit: isPlaceholder ? 'cover' : objectFit }}
      sizes={sizes}
      onError={() => {
        if (index < candidates.length - 1) {
          setIndex((i) => i + 1);
          return;
        }
        if (perfume?.id) warnMissingPerfumeImage(perfume.id);
      }}
    />
  );
}
