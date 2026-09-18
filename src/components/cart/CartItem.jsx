import { getBrandById } from '../../data/index.js';
import { site } from '../../data/index.js';
import { formatPrice } from '../../utils/price.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { useCart } from '../../context/CartContext.jsx';
import LocaleLink from '../i18n/LocaleLink.jsx';

export default function CartItem({ item }) {
  const { t } = useLanguage();
  const { setQuantity, removeItem } = useCart();
  const brand = getBrandById(item.brandId);
  const lineTotal = item.price * item.quantity;
  const formatLabel =
    item.purchaseType === 'decant'
      ? t('purchase.decantLabel')
      : t('purchase.originalTitle');

  return (
    <article className="cart-item">
      <LocaleLink
        to="perfume"
        params={{ id: item.perfumeId }}
        className="cart-item__media"
      >
        {item.image ? (
          <img src={item.image} alt="" loading="lazy" />
        ) : (
          <span className="cart-item__placeholder" />
        )}
      </LocaleLink>

      <div className="cart-item__body">
        <p className="cart-item__brand">{brand?.name ?? item.brandId}</p>
        <h3 className="cart-item__name">
          <LocaleLink to="perfume" params={{ id: item.perfumeId }}>
            {item.perfumeName}
          </LocaleLink>
        </h3>
        <p className="cart-item__meta">
          {formatLabel}
          <span aria-hidden="true"> · </span>
          {item.ml} {t('common.ml')}
        </p>
        {item.purchaseType === 'original' ? (
          <p className="cart-item__caption">{t('purchase.factoryPackaging')}</p>
        ) : null}

        <div className="cart-item__controls">
          <div className="qty-stepper" aria-label={t('order.quantity')}>
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
              removeItem(item.perfumeId, item.purchaseType, item.ml)
            }
          >
            {t('cart.remove')}
          </button>
        </div>
      </div>
    </article>
  );
}
