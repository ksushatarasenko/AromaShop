import { useState } from 'react';
import LocaleLink from '../i18n/LocaleLink.jsx';
import { getBrandById, site } from '../../data/index.js';
import { formatPrice, formatPricePerMl, getDisplaySize } from '../../utils/price.js';
import Badge from '../common/Badge.jsx';
import PerfumeImage from './PerfumeImage.jsx';
import { useLanguage } from '../../i18n/LanguageContext.jsx';

export default function PerfumeCard({ perfume }) {
  const brand = getBrandById(perfume.brandId);
  const size = getDisplaySize(perfume);
  const accords = (perfume.fragrance?.accords ?? []).slice(0, 3);
  const { t, taxonomyLabel } = useLanguage();

  return (
    <article className="perfume-card">
      <LocaleLink
        to="perfume"
        params={{ id: perfume.id }}
        className="perfume-card__media"
        aria-label={`${t('common.discover')} ${perfume.name}`}
      >
        <span className="perfume-card__collection">
          {taxonomyLabel('collections', perfume.collection)}
        </span>
        <div className="perfume-card__badges">
          {perfume.new ? <Badge>{t('common.new')}</Badge> : null}
          {perfume.bestseller ? <Badge variant="champagne">{t('common.bestseller')}</Badge> : null}
        </div>
        <PerfumeImage perfume={perfume} brand={brand} objectFit="contain" />
      </LocaleLink>

      <div className="perfume-card__body">
        <p className="perfume-card__brand">{brand?.name}</p>
        <h3 className="perfume-card__name">
          <LocaleLink to="perfume" params={{ id: perfume.id }}>{perfume.name}</LocaleLink>
        </h3>
        <div className="perfume-card__meta">
          <span>{perfume.concentration}</span>
          <span>·</span>
          <span>{taxonomyLabel('genders', perfume.gender)}</span>
        </div>
        {accords.length ? (
          <div className="perfume-card__accords">
            {accords.map((accordId) => (
              <span key={accordId} className="perfume-card__accord">
                {taxonomyLabel('accords', accordId)}
              </span>
            ))}
          </div>
        ) : null}
        <div className="perfume-card__price-row">
          <div>
            {size ? (
              <>
                <p className="perfume-card__price">
                  {t('common.from')} {formatPrice(size.price, site.currency)}
                </p>
                <p className="perfume-card__per-ml">
                  {formatPricePerMl(size.price, size.ml, site.currency)}
                </p>
              </>
            ) : null}
          </div>
          <LocaleLink to="perfume" params={{ id: perfume.id }} className="btn btn--text">
            {t('common.discover')}
          </LocaleLink>
        </div>
      </div>
    </article>
  );
}
