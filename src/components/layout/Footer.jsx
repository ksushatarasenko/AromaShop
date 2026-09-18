import Logo from '../common/Logo.jsx';
import LocaleLink from '../i18n/LocaleLink.jsx';
import { site } from '../../data/index.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';

const FOOTER_LINKS = [
  { route: 'perfumes', labelKey: 'nav.shop' },
  { route: 'find', labelKey: 'nav.discover' },
  { route: 'journal', labelKey: 'nav.journal' },
  { route: 'about', labelKey: 'nav.about' },
  { route: 'authenticity', labelKey: 'nav.authenticity' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <Logo />
            <p>{t('site.positioning')}</p>
            <div className="site-footer__contacts" style={{ marginTop: '1.5rem' }}>
              <a href={site.contacts.telegram} target="_blank" rel="noreferrer">{t('common.telegram')}</a>
              <a href={site.contacts.whatsapp} target="_blank" rel="noreferrer">{t('common.whatsapp')}</a>
              <a href={`mailto:${site.contacts.email}`}>{t('common.email')}</a>
            </div>
          </div>

          <div>
            <p className="eyebrow" style={{ marginBottom: '1rem' }}>{t('footer.explore')}</p>
            <div className="site-footer__links">
              {FOOTER_LINKS.map((item) => (
                <LocaleLink key={item.route} to={item.route}>{t(item.labelKey)}</LocaleLink>
              ))}
            </div>
          </div>

          <div>
            <p className="eyebrow" style={{ marginBottom: '1rem' }}>AromaShop</p>
            <p className="muted" style={{ fontSize: '0.9rem' }}>{t('site.tagline')}</p>
          </div>
        </div>

        <div className="site-footer__bottom">
          © {year} AromaShop. {t('common.copyright')}
        </div>
      </div>
    </footer>
  );
}
