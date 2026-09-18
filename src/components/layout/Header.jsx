import { useState } from 'react';
import Logo from '../common/Logo.jsx';
import NavLinks from '../navigation/NavLinks.jsx';
import MobileMenu from './MobileMenu.jsx';
import SearchModal from '../search/SearchModal.jsx';
import LanguageSwitcher from '../i18n/LanguageSwitcher.jsx';
import LocaleLink from '../i18n/LocaleLink.jsx';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { useCart } from '../../context/CartContext.jsx';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { t } = useLanguage();
  const { itemCount } = useCart();

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Logo />

        <NavLinks className="site-header__nav" />

        <div className="site-header__actions">
          <LanguageSwitcher />

          <LocaleLink
            to="cart"
            className="header-cart"
            aria-label={t('nav.cart')}
          >
            <span className="header-cart__label">{t('nav.cart')}</span>
            {itemCount > 0 ? (
              <span className="header-cart__count">{itemCount}</span>
            ) : null}
          </LocaleLink>

          <button
            type="button"
            className="icon-btn"
            aria-label={t('nav.search')}
            onClick={() => setSearchOpen(true)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
              <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          <button
            type="button"
            className="hamburger"
            aria-label={t('nav.openMenu')}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
