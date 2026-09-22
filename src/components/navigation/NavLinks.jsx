import { NavLink } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext.jsx';

const NAV_ITEMS = [
  { id: 'shop', route: 'perfumes', labelKey: 'nav.shop' },
  { id: 'discover', route: 'find', labelKey: 'nav.discover' },
  { id: 'journal', route: 'journal', labelKey: 'nav.journal' },
  { id: 'howToOrder', route: 'howToOrder', labelKey: 'nav.howToOrder' },
  { id: 'about', route: 'about', labelKey: 'nav.about' },
];

export default function NavLinks({ onNavigate, className = '' }) {
  const { t, path } = useLanguage();

  return (
    <nav className={className} aria-label="Primary">
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.id}
          to={path(item.route)}
          className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`}
          onClick={onNavigate}
        >
          {t(item.labelKey)}
        </NavLink>
      ))}
    </nav>
  );
}
