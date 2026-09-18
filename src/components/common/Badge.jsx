export default function Badge({ children, variant = 'default' }) {
  const className = variant === 'champagne' ? 'badge badge--champagne' : 'badge';
  return <span className={className}>{children}</span>;
}
