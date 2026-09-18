import { useState } from 'react';
import SEO from '../components/common/SEO.jsx';
import Button from '../components/common/Button.jsx';
import CartItem from '../components/cart/CartItem.jsx';
import CartCheckout from '../components/cart/CartCheckout.jsx';
import { site } from '../data/index.js';
import { formatPrice } from '../utils/price.js';
import { useCart } from '../context/CartContext.jsx';
import { useLanguage } from '../i18n/LanguageContext.jsx';

export default function Cart() {
  const { items, itemCount, total } = useCart();
  const { t } = useLanguage();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const openCheckout = () => {
    setCheckoutOpen(true);
    window.requestAnimationFrame(() => {
      document.getElementById('cart-checkout')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  };

  return (
    <div className="page cart-page">
      <div className="container cart-page__inner">
        <SEO title={t('cart.title')} />

        <header className="cart-page__header">
          <p className="eyebrow">{t('cart.title')}</p>
          <h1>{t('cart.title')}</h1>
        </header>

        {itemCount === 0 && !checkoutOpen ? (
          <div className="cart-empty">
            <p>{t('cart.empty')}</p>
            <Button to="perfumes" variant="primary">
              {t('cart.backToShop')}
            </Button>
          </div>
        ) : (
          <>
            {itemCount > 0 ? (
              <>
                <div className="cart-list">
                  {items.map((item) => (
                    <CartItem
                      key={`${item.perfumeId}-${item.purchaseType}-${item.ml}`}
                      item={item}
                    />
                  ))}
                </div>

                <aside className="cart-totals">
                  <div className="cart-totals__row">
                    <span>{t('cart.total')}</span>
                    <strong>{formatPrice(total, site.currency)}</strong>
                  </div>
                  <p className="cart-totals__note">{t('cart.deliveryNote')}</p>

                  {!checkoutOpen ? (
                    <Button type="button" variant="primary" onClick={openCheckout}>
                      {t('cart.proceed')}
                    </Button>
                  ) : null}
                </aside>
              </>
            ) : null}

            {checkoutOpen ? (
              <CartCheckout onComplete={() => setCheckoutOpen(false)} />
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
