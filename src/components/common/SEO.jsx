import { useEffect } from 'react';
import { useLanguage } from '../../i18n/LanguageContext.jsx';

export default function SEO({ title, description }) {
  const { t } = useLanguage();

  useEffect(() => {
    const fullTitle = title
      ? t('seo.titleTemplate').replace('%s', title)
      : t('seo.defaultTitle');
    document.title = fullTitle;

    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', description || t('seo.defaultDescription'));
    }
  }, [title, description, t]);

  return null;
}
