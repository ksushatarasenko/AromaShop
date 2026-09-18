import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { useCart } from '../../context/CartContext.jsx';

export default function CartToast() {
  const { toast, dismissToast } = useCart();
  const { t } = useLanguage();

  if (!toast) return null;

  return (
    <div className="cart-toast" role="status" aria-live="polite">
      <p>{t('cart.added')}</p>
      <button type="button" className="cart-toast__close" onClick={dismissToast} aria-label={t('common.close')}>
        ×
      </button>
    </div>
  );
}
