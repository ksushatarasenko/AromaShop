import Button from '../common/Button.jsx';
import { useLanguage } from '../../i18n/LanguageContext.jsx';

export default function OrderSuccess({ onReset }) {
  const { t } = useLanguage();

  return (
    <div className="order-success" role="status">
      <h3>{t('cart.successTitle')}</h3>
      <p>{t('cart.successMessage')}</p>
      <div className="order-success__actions">
        <Button
          to="perfumes"
          variant="primary"
          onClick={() => onReset?.()}
        >
          {t('cart.backToShop')}
        </Button>
      </div>
    </div>
  );
}
