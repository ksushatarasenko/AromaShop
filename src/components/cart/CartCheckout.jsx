import { useState } from 'react';
import { getBrandById, site } from '../../data/index.js';
import { formatPrice } from '../../utils/price.js';
import {
  buildCartOrderMessage,
  getTelegramOrderUrl,
  getWhatsAppOrderUrl,
  getEmailOrderUrl,
} from '../../utils/order.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { useCart } from '../../context/CartContext.jsx';
import Button from '../common/Button.jsx';
import OrderSuccess from '../order/OrderSuccess.jsx';

const CONTACT_METHODS = [
  { id: 'telegram', labelKey: 'common.telegram' },
  { id: 'whatsapp', labelKey: 'common.whatsapp' },
  { id: 'email', labelKey: 'common.email' },
];

const initial = {
  name: '',
  phone: '',
  email: '',
  contactMethod: 'telegram',
  comment: '',
};

export default function CartCheckout({ onComplete }) {
  const { items, total, clearCart } = useCart();
  const { t, lang } = useLanguage();
  const [form, setForm] = useState(initial);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState(false);

  const message = buildCartOrderMessage({
    items,
    total,
    name: form.name,
    phone: form.phone,
    email: form.email,
    contactMethod: form.contactMethod,
    comment: form.comment,
    lang,
  });

  const update = (field) => (e) => {
    setFormError(false);
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const validate = () =>
    Boolean(form.name.trim() && form.phone.trim() && form.email.trim());

  const handleSend = (e) => {
    if (!validate()) {
      e.preventDefault();
      setFormError(true);
      return;
    }
    // Keep href message from this render; clear after channel opens
    window.setTimeout(() => {
      clearCart();
      setSubmitted(true);
    }, 0);
  };

  if (submitted) {
    return (
      <OrderSuccess
        onReset={() => {
          setSubmitted(false);
          setForm(initial);
          onComplete?.();
        }}
      />
    );
  }

  return (
    <section className="cart-checkout" id="cart-checkout">
      <h2 className="cart-checkout__title">{t('cart.yourOrder')}</h2>

      <ul className="cart-checkout__summary">
        {items.map((item) => {
          const brand = getBrandById(item.brandId);
          const formatLabel =
            item.purchaseType === 'decant'
              ? t('purchase.decantLabel')
              : t('purchase.originalTitle');
          return (
            <li key={`${item.perfumeId}-${item.purchaseType}-${item.ml}`}>
              <div className="cart-checkout__line-main">
                <strong>{item.perfumeName}</strong>
                {brand?.name ? (
                  <span className="muted">{brand.name}</span>
                ) : null}
              </div>
              <span className="muted">
                {formatLabel} · {item.ml} {t('common.ml')}
              </span>
              <span>
                {item.quantity} × {formatPrice(item.price, site.currency)}
              </span>
            </li>
          );
        })}
      </ul>

      <p className="cart-checkout__total">
        {t('cart.total')}: {formatPrice(total, site.currency)}
      </p>

      <form className="order-form cart-checkout__form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-field">
          <label htmlFor="cart-name">{t('order.name')}</label>
          <input
            id="cart-name"
            required
            value={form.name}
            onChange={update('name')}
          />
        </div>
        <div className="form-field">
          <label htmlFor="cart-phone">{t('order.phone')}</label>
          <input
            id="cart-phone"
            required
            value={form.phone}
            onChange={update('phone')}
          />
        </div>
        <div className="form-field">
          <label htmlFor="cart-email">{t('order.email')}</label>
          <input
            id="cart-email"
            type="email"
            required
            value={form.email}
            onChange={update('email')}
          />
        </div>
        <div className="form-field">
          <label>{t('order.contact')}</label>
          <div className="contact-methods">
            {CONTACT_METHODS.map((method) => (
              <button
                key={method.id}
                type="button"
                className={`contact-method${form.contactMethod === method.id ? ' is-active' : ''}`}
                onClick={() =>
                  setForm((prev) => ({ ...prev, contactMethod: method.id }))
                }
              >
                {t(method.labelKey)}
              </button>
            ))}
          </div>
        </div>
        <div className="form-field">
          <label htmlFor="cart-comment">{t('order.comment')}</label>
          <textarea
            id="cart-comment"
            rows={3}
            value={form.comment}
            onChange={update('comment')}
            placeholder={t('order.commentPlaceholder')}
          />
        </div>
        {formError ? (
          <p className="cart-checkout__error">{t('cart.formRequired')}</p>
        ) : null}
      </form>

      <div className="order-actions">
        <Button
          href={getTelegramOrderUrl(message)}
          variant="primary"
          target="_blank"
          rel="noreferrer"
          onClick={handleSend}
        >
          {t('order.viaTelegram')}
        </Button>
        <Button
          href={getWhatsAppOrderUrl(message)}
          variant="ghost"
          target="_blank"
          rel="noreferrer"
          onClick={handleSend}
        >
          {t('order.viaWhatsApp')}
        </Button>
        <Button href={getEmailOrderUrl(message, lang)} variant="champagne" onClick={handleSend}>
          {t('order.viaEmail')}
        </Button>
      </div>
    </section>
  );
}
