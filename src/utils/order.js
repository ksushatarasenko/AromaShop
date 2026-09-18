import site from '../data/site.json';
import { getBrandById } from '../data/index.js';
import { formatPrice } from './price.js';
import { getMessage } from '../i18n/localize.js';
import pl from '../locales/pl.json';
import uk from '../locales/uk.json';

const dictionaries = { pl, uk };

function contactLabel(t, method) {
  if (method === 'whatsapp') return t('common.whatsapp');
  if (method === 'email') return t('common.email');
  return t('common.telegram');
}

/**
 * Multi-item cart order message for Telegram / WhatsApp / Email.
 */
export function buildCartOrderMessage({
  items = [],
  total = 0,
  name = '',
  phone = '',
  email = '',
  contactMethod = 'telegram',
  comment = '',
  lang = 'pl',
}) {
  const messages = dictionaries[lang] ?? dictionaries.pl;
  const t = (key) => getMessage(messages, key);

  const lines = [
    t('order.messageHeader'),
    '',
    `${t('order.messageClient')}:`,
    name || '—',
    '',
    `${t('order.messagePhone')}:`,
    phone || '—',
    '',
    `${t('order.messageEmail')}:`,
    email || '—',
    '',
    `${t('order.contact')}:`,
    contactLabel(t, contactMethod),
    '',
    `${t('order.messageOrderSection')}:`,
    '',
  ];

  items.forEach((item, index) => {
    const brand = getBrandById(item.brandId);
    const formatLabel =
      item.purchaseType === 'decant'
        ? t('purchase.decantLabel')
        : t('purchase.originalTitle');
    const linePrice = formatPrice(item.price * item.quantity, site.currency);

    lines.push(
      `${index + 1}. ${brand?.name ?? item.brandId} — ${item.perfumeName}`
    );
    lines.push(`   ${formatLabel}`);
    lines.push(`   ${item.ml} ${t('common.ml')}`);
    if (item.purchaseType === 'original') {
      lines.push(`   ${t('purchase.factoryPackaging')}`);
    }
    lines.push(`   ${t('order.messageQuantity')}: ${item.quantity}`);
    lines.push(`   ${t('order.messagePrice')}: ${linePrice}`);
    lines.push('');
  });

  lines.push(`${t('cart.total')}: ${formatPrice(total, site.currency)}`);

  if (comment) {
    lines.push('');
    lines.push(`${t('order.messageComment')}:`);
    lines.push(comment);
  }

  return lines.join('\n');
}

/** @deprecated single-item helper kept for compatibility */
export function buildOrderMessage(args) {
  if (args?.items) return buildCartOrderMessage(args);

  const {
    perfume,
    selection,
    size,
    quantity = 1,
    phone = '',
    name = '',
    comment = '',
    lang = 'pl',
  } = args || {};

  const resolved = selection || (size
    ? { purchaseType: 'original', format: 'original', ml: size.ml, price: size.price }
    : null);

  if (!perfume || !resolved) return '';

  return buildCartOrderMessage({
    items: [
      {
        perfumeId: perfume.id,
        brandId: perfume.brandId,
        perfumeName: perfume.name,
        purchaseType: resolved.purchaseType || resolved.format || 'original',
        ml: resolved.ml,
        price: resolved.price,
        quantity,
      },
    ],
    total: (resolved.price || 0) * quantity,
    name,
    phone,
    comment,
    lang,
  });
}

function resolveTelegramBase(raw) {
  if (!raw) return '';
  const value = String(raw).trim();
  if (value.startsWith('@')) {
    return `https://t.me/${value.slice(1)}`;
  }
  if (value.startsWith('http')) return value;
  if (/^t\.me\//i.test(value)) return `https://${value}`;
  return `https://t.me/${value.replace(/^@/, '')}`;
}

export function getTelegramOrderUrl(message) {
  const base = resolveTelegramBase(site.contacts.telegram);
  const text = encodeURIComponent(message);
  if (!base) return '#';
  if (base.includes('t.me')) {
    return `${base}${base.includes('?') ? '&' : '?'}text=${text}`;
  }
  return base;
}

export function getWhatsAppOrderUrl(message) {
  let base = site.contacts.whatsapp || '';
  const text = encodeURIComponent(message);
  if (!base) return '#';
  if (!base.startsWith('http')) {
    const digits = base.replace(/\D/g, '');
    base = `https://wa.me/${digits}`;
  }
  if (base.includes('wa.me') || base.includes('whatsapp')) {
    return `${base}${base.includes('?') ? '&' : '?'}text=${text}`;
  }
  return base;
}

export function getEmailOrderUrl(message, lang = 'pl') {
  const messages = dictionaries[lang] ?? dictionaries.pl;
  const email = site.contacts.email;
  const subject = encodeURIComponent(getMessage(messages, 'order.emailSubject'));
  const body = encodeURIComponent(message);
  return `mailto:${email}?subject=${subject}&body=${body}`;
}
