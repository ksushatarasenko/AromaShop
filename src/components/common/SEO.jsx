import { useEffect } from 'react';
import { useLanguage } from '../../i18n/LanguageContext.jsx';

const SITE_URL = 'https://aroma.shop.pl';

function upsertMeta(attribute, value, content) {
  let element = document.head.querySelector(`meta[${attribute}="${value}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, value);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
}

function upsertLink(rel, href, extra = {}) {
  let selector = `link[rel="${rel}"]`;

  if (extra.hreflang) {
    selector += `[hreflang="${extra.hreflang}"]`;
  }

  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);

    Object.entries(extra).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });

    document.head.appendChild(element);
  }

  element.setAttribute('href', href);
}

function removeStructuredData() {
  document
    .querySelectorAll('script[data-aromashop-seo]')
    .forEach((element) => element.remove());
}

export default function SEO({
  title,
  description,
  canonical,
  image,
  type = 'website',
  noindex = false,
  structuredData = null,
}) {
  const { t, lang } = useLanguage();

  useEffect(() => {
    const fullTitle = title
      ? t('seo.titleTemplate').replace('%s', title)
      : t('seo.defaultTitle');

    const metaDescription =
      description || t('seo.defaultDescription');

    const currentUrl =
      canonical ||
      `${SITE_URL}${window.location.pathname}${window.location.search}`;

    document.documentElement.lang = lang === 'uk' ? 'uk' : 'pl';

    // -----------------------------------------
    // TITLE
    // -----------------------------------------

    document.title = fullTitle;

    // -----------------------------------------
    // BASIC SEO
    // -----------------------------------------

    upsertMeta('name', 'description', metaDescription);

    upsertMeta(
      'name',
      'robots',
      noindex ? 'noindex, follow' : 'index, follow'
    );

    // -----------------------------------------
    // CANONICAL
    // -----------------------------------------

    upsertLink('canonical', currentUrl);

    // -----------------------------------------
    // OPEN GRAPH
    // -----------------------------------------

    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', metaDescription);
    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:url', currentUrl);
    upsertMeta('property', 'og:site_name', 'AromaShop');

    if (image) {
      upsertMeta('property', 'og:image', image);
    }

    // -----------------------------------------
    // TWITTER / SOCIAL
    // -----------------------------------------

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', metaDescription);

    if (image) {
      upsertMeta('name', 'twitter:image', image);
    }

    // -----------------------------------------
    // HREFLANG
    // -----------------------------------------

    const pathname = window.location.pathname;

    const localizedPath =
      pathname.startsWith('/uk/')
        ? pathname.replace(/^\/uk/, '/pl')
        : pathname.startsWith('/pl/')
          ? pathname.replace(/^\/pl/, '/uk')
          : pathname;

    const plUrl =
      pathname.startsWith('/pl/')
        ? currentUrl
        : `${SITE_URL}${localizedPath.replace(/^\/uk/, '/pl')}`;

    const ukUrl =
      pathname.startsWith('/uk/')
        ? currentUrl
        : `${SITE_URL}${localizedPath.replace(/^\/pl/, '/uk')}`;

    upsertLink('alternate', plUrl, {
      hreflang: 'pl',
    });

    upsertLink('alternate', ukUrl, {
      hreflang: 'uk',
    });

    upsertLink('alternate', currentUrl, {
      hreflang: 'x-default',
    });

    // -----------------------------------------
    // STRUCTURED DATA
    // -----------------------------------------

    removeStructuredData();

    if (structuredData) {
      const script = document.createElement('script');

      script.type = 'application/ld+json';
      script.setAttribute('data-aromashop-seo', 'true');
      script.textContent = JSON.stringify(structuredData);

      document.head.appendChild(script);
    }

    // -----------------------------------------
    // CLEANUP
    // -----------------------------------------

    return () => {
      removeStructuredData();
    };
  }, [
    title,
    description,
    canonical,
    image,
    type,
    noindex,
    structuredData,
    t,
    lang,
  ]);

  return null;
}