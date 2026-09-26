import { useMemo, useState } from 'react';
import { getBrandById, getPerfumeById } from '../../data/index.js';
import { site } from '../../data/index.js';
import {
  getPerfumeImageCandidates,
  getPlaceholderImage,
} from '../../utils/perfumeImage.js';
import { formatPrice } from '../../utils/price.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { useCart } from '../../context/CartContext.jsx';
import LocaleLink from '../i18n/LocaleLink.jsx';

export default function CartItem({ item }) {
  const { t } = useLanguage();
  const { setQuantity, removeItem } = useCart();

  const brand = getBrandById(item.brandId);
  const perfume = getPerfumeById(item.perfumeId);

  const lineTotal = item.price * item.quantity;

  const formatLabel =
    item.purchaseType === 'decant'
      ? t('purchase.decantLabel')
      : t('purchase.originalTitle');

  const candidates = useMemo(() => {
    const perfumeCandidates = perfume
      ? getPerfumeImageCandidates(perfume)
      : [];

    return [
      ...(item.image ? [item.image] : []),
      ...perfumeCandidates,
      getPlaceholderImage(),
    ].filter((url, index, array) => url && array.indexOf(url) === index);
  }, [item.image, perfume]);

  const [imageIndex, setImageIndex] = useState(0);

  const imageSrc =
    candidates[imageIndex] || getPlaceholderImage();

  return (
    <article className="cart-item">
      <LocaleLink
        to="perfume"
        params={{ id: item.perfumeId }}
        className="cart-item__media"
      >
        <img
          src={imageSrc}
          alt=""
          loading="lazy"
          onError={() => {
            if (imageIndex < candidates.length - 1) {
              setImageIndex((index) => index + 1);
            }
          }}
        />
      </LocaleLink>

      <div className="cart-item__body">
        <p className="cart-item__brand">
          {brand?.name ?? item.brandId}
        </p>

        <h3 className="cart-item__name">
          <LocaleLink
            to="perfume"
            params={{ id: item.perfumeId }}
          >
            {item.perfumeName}
          </LocaleLink>
        </h3>

        <p className="cart-item__meta">
          {formatLabel}
          <span aria-hidden="true"> · </span>
          {item.ml} {t('common.ml')}
        </p>

        {item.purchaseType === 'original' ? (
          <p className="cart-item__caption">
            {t('purchase.factoryPackaging')}
          </p>
        ) : null}

        <div className="cart-item__controls">
          <div
            className="qty-stepper"
            aria-label={t('order.quantity')}
          >
            <button
              type="button"
              onClick={() =>
                setQuantity(
                  item.perfumeId,
                  item.purchaseType,
                  item.ml,
                  item.quantity - 1
                )
              }
              aria-label="−"
            >
              −
            </button>

            <span>{item.quantity}</span>

            <button
              type="button"
              onClick={() =>
                setQuantity(
                  item.perfumeId,
                  item.purchaseType,
                  item.ml,
                  item.quantity + 1
                )
              }
              aria-label="+"
            >
              +
            </button>
          </div>

          <div className="cart-item__prices">
            <span className="cart-item__unit">
              {formatPrice(item.price, site.currency)}
            </span>

            <span className="cart-item__line">
              {formatPrice(lineTotal, site.currency)}
            </span>
          </div>

          <button
            type="button"
            className="cart-item__remove"
            onClick={() =>
              removeItem(
                item.perfumeId,
                item.purchaseType,
                item.ml
              )
            }
          >
            {t('cart.remove')}
          </button>
        </div>
      </div>
    </article>
  );
}
