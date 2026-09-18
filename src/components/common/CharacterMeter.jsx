export default function CharacterMeter({ label, value, max = 5 }) {
  const safe = Math.max(0, Math.min(max, Number(value) || 0));

  return (
    <div className="meter" role="img" aria-label={`${label}: ${safe} out of ${max}`}>
      <div className="meter__label">
        <span>{label}</span>
        <span className="muted">{safe}/{max}</span>
      </div>
      <div className="meter__dots">
        {Array.from({ length: max }, (_, i) => (
          <span key={i} className={`meter__dot${i < safe ? ' is-on' : ''}`} />
        ))}
      </div>
    </div>
  );
}
