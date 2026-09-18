import { formatPrice } from '../../utils/price.js';
import { site } from '../../data/index.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';

export default function SizeSelector({ sizes = [], selectedMl, onChange }) {
  const { t } = useLanguage();

  return (
    <div className="size-selector" role="listbox" aria-label={t('perfume.availableSizes')}>
      {sizes.map((size) => {
        const active = selectedMl === size.ml;
        return (
          <button
            key={size.ml}
            type="button"
            role="option"
            aria-selected={active}
            disabled={!size.stock}
            className={`size-option${active ? ' is-active' : ''}${!size.stock ? ' is-disabled' : ''}`}
            onClick={() => size.stock && onChange(size)}
          >
            <span className="size-option__ml">{size.ml} {t('common.ml')}</span>
            <span className="size-option__price">
              {size.stock
                ? formatPrice(size.price, site.currency)
                : t('common.outOfStock')}
            </span>
          </button>
        );
      })}
    </div>
  );
}
