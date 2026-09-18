import LocaleLink from '../i18n/LocaleLink.jsx';
import { useLanguage } from '../../i18n/LanguageContext.jsx';

export default function Button({
  children,
  to,
  params,
  href,
  variant = 'primary',
  type = 'button',
  onClick,
  className = '',
  ...props
}) {
  const classes = `btn btn--${variant} ${className}`.trim();

  if (to) {
    return (
      <LocaleLink to={to} params={params} className={classes} {...props}>
        {children}
      </LocaleLink>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
