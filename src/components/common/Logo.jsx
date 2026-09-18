import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { getSiteLogo, getSiteLogoAlt } from '../../utils/perfumeImage.js';

export default function Logo({ compact = false, variant = 'default' }) {
  const [imgError, setImgError] = useState(false);
  const { path, t } = useLanguage();
  const resolvedVariant = compact ? 'compact' : variant;
  const src = getSiteLogo(resolvedVariant);
  const showImage = Boolean(src) && !imgError;

  return (
    <Link to={path('home')} className={`logo${compact ? ' logo--compact' : ''}`} aria-label={t('nav.home')}>
      {showImage ? (
        <img
          src={src}
          alt={getSiteLogoAlt()}
          onError={() => setImgError(true)}
        />
      ) : (
        <>
          <span className="logo__mark" aria-hidden="true">AS</span>
          <span className="logo__text">
            <span className="logo__name">AromaShop</span>
            <span className="logo__sub">{t('site.subtitle')}</span>
          </span>
        </>
      )}
    </Link>
  );
}
