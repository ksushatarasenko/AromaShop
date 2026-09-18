import { useState } from 'react';
import { getBrandLogo } from '../../utils/perfumeImage.js';

/**
 * Brand mark from /assets/brands/{logo}.
 * Falls back to elegant text if logo file is missing.
 */
export default function BrandLogo({ brand, className = '' }) {
  const [failed, setFailed] = useState(false);
  const src = getBrandLogo(brand);

  if (!src || failed) {
    return (
      <span className={`brand-logo brand-logo--text ${className}`.trim()}>
        {brand?.name}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={brand?.name || ''}
      className={`brand-logo ${className}`.trim()}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
