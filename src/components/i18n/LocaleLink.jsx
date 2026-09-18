import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext.jsx';

/**
 * Link that builds localized paths from route keys.
 * <LocaleLink to="perfumes"> or <LocaleLink to="perfume" params={{ id }}> 
 */
export default function LocaleLink({ to, params, children, className, ...props }) {
  const { path } = useLanguage();
  const href = typeof to === 'string' && to.startsWith('/')
    ? to
    : path(to, params);

  return (
    <Link to={href} className={className} {...props}>
      {children}
    </Link>
  );
}
