import { useEffect } from 'react';
import Logo from '../common/Logo.jsx';
import NavLinks from '../navigation/NavLinks.jsx';
import LanguageSwitcher from '../i18n/LanguageSwitcher.jsx';
import LocaleLink from '../i18n/LocaleLink.jsx';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { useCart } from '../../context/CartContext.jsx';

export default function MobileMenu({ open, onClose }) {
  const { t } = useLanguage();
  const { itemCount } = useCart();

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="mobile-menu is-open" role="dialog" aria-modal="true" aria-label="Menu">
      <div className="mobile-menu__top">
        <Logo />
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <LanguageSwitcher />
          <button type="button" className="icon-btn" onClick={onClose} aria-label={t('nav.closeMenu')}>
            ✕
          </button>
        </div>
      </div>
      <NavLinks className="mobile-menu__nav" onNavigate={onClose} />
      <LocaleLink to="cart" className="mobile-menu__cart" onClick={onClose}>
        {t('nav.cart')}
        {itemCount > 0 ? ` ${itemCount}` : ''}
      </LocaleLink>
    </div>
  );
}
