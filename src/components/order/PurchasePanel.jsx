import { useMemo, useState, useEffect } from 'react';
import SizeSelector from '../perfume/SizeSelector.jsx';
import Button from '../common/Button.jsx';
import { site } from '../../data/index.js';
import { formatPrice } from '../../utils/price.js';
import { getPerfumeImage } from '../../utils/perfumeImage.js';
import {
  getDecantConfig,
  getReferenceBottle,
  getEffectiveDecantPricePerMl,
  calculateDecantPrice,
} from '../../utils/decant.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { useCart } from '../../context/CartContext.jsx';

/**
 * Premium purchase format chooser — adds selection to cart (no inline order form).
 */
export default function PurchasePanel({ perfume }) {
  const { t } = useLanguage();
  const { addItem } = useCart();
  const decantConfig = useMemo(() => getDecantConfig(perfume), [perfume]);

  const firstInStock = useMemo(() => {
    if (!perfume?.sizes?.length) return null;
    return perfume.sizes.find((s) => s.stock) ?? perfume.sizes[0] ?? null;
  }, [perfume]);

  const [mode, setMode] = useState('original');
  const [bottle, setBottle] = useState(null);
  const [decantMl, setDecantMl] = useState(null);

  useEffect(() => {
    setBottle(firstInStock);
    setMode('original');
    setDecantMl(null);
  }, [perfume?.id, firstInStock]);

  const activeBottle = bottle ?? firstInStock;
  const referenceBottle = getReferenceBottle(perfume, activeBottle);
  const pricePerMlValue = getEffectiveDecantPricePerMl(perfume, referenceBottle);

  const decantPrice =
    mode === 'decant' && decantMl != null
      ? calculateDecantPrice(decantMl, pricePerMlValue)
      : null;

  const selection = useMemo(() => {
    if (mode === 'original' && activeBottle) {
      return {
        purchaseType: 'original',
        ml: activeBottle.ml,
        price: activeBottle.price,
        stock: activeBottle.stock,
      };
    }
    if (mode === 'decant' && decantMl != null && decantPrice != null) {
      return {
        purchaseType: 'decant',
        ml: decantMl,
        price: decantPrice,
        stock: true,
      };
    }
    return null;
  }, [mode, activeBottle, decantMl, decantPrice]);

  const selectBottle = (size) => {
    setBottle(size);
    setMode('original');
    setDecantMl(null);
  };

  const selectDecant = (ml) => {
    setDecantMl(ml);
    setMode('decant');
  };

  const handleAddToCart = () => {
    if (!perfume || !selection) return;
    addItem({
      perfumeId: perfume.id,
      brandId: perfume.brandId,
      perfumeName: perfume.name,
      collection: perfume.collection,
      purchaseType: selection.purchaseType,
      ml: selection.ml,
      price: selection.price,
      quantity: 1,
      image: getPerfumeImage(perfume),
    });
  };

  if (!perfume) return null;

  return (
    <div className="purchase-panel">
      <section
        className={`purchase-section${mode === 'original' ? ' is-active' : ''}`}
        aria-label={t('purchase.originalTitle')}
      >
        <h3 className="purchase-section__title">{t('purchase.originalTitle')}</h3>
        <SizeSelector
          sizes={perfume.sizes}
          selectedMl={mode === 'original' ? activeBottle?.ml : null}
          onChange={selectBottle}
        />
        <p className="purchase-section__caption">{t('purchase.factoryPackaging')}</p>
      </section>

      {decantConfig ? (
        <>
          <div className="purchase-divider" role="separator" />

          <section
            className={`purchase-section${mode === 'decant' ? ' is-active' : ''}`}
            aria-label={t('purchase.decantTitle')}
          >
            <h3 className="purchase-section__title">{t('purchase.decantTitle')}</h3>
            <p className="purchase-section__lede">{t('purchase.decantLede')}</p>
            <div
              className="size-selector"
              role="listbox"
              aria-label={t('purchase.chooseAmount')}
            >
              {decantConfig.sizes.map((ml) => {
                const price = calculateDecantPrice(ml, pricePerMlValue);
                const active = mode === 'decant' && decantMl === ml;
                return (
                  <button
                    key={ml}
                    type="button"
                    role="option"
                    aria-selected={active}
                    className={`size-option${active ? ' is-active' : ''}`}
                    onClick={() => selectDecant(ml)}
                  >
                    <span className="size-option__ml">
                      {ml} {t('common.ml')}
                    </span>
                    <span className="size-option__price">
                      {price != null ? formatPrice(price, site.currency) : '—'}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="purchase-section__caption">{t('purchase.chooseAmount')}</p>
          </section>
        </>
      ) : null}

      {selection ? (
        <div className="purchase-summary">
          <p className="purchase-summary__format">
            {selection.purchaseType === 'original'
              ? t('purchase.originalTitle')
              : t('purchase.decantLabel')}
          </p>
          <p className="purchase-summary__price">
            {formatPrice(selection.price, site.currency)}
            <span className="purchase-summary__ml">
              {selection.ml} {t('common.ml')}
            </span>
          </p>
          <p className="purchase-summary__note">
            {selection.purchaseType === 'original'
              ? t('purchase.factoryPackaging')
              : t('purchase.decantLabel')}
          </p>
        </div>
      ) : null}

      <Button
        type="button"
        variant="primary"
        disabled={!selection}
        onClick={handleAddToCart}
      >
        {t('perfume.orderCta')}
      </Button>
    </div>
  );
}
