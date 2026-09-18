import { useEffect } from 'react';

/**
 * Single-image fullscreen lightbox (zoom-in / zoom-out).
 * Click image does NOT close; backdrop, close button, and Escape do.
 */
export default function ImageLightbox({ src, alt = '', onClose, closeLabel = 'Close' }) {
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose?.();
      }
    };
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  if (!src) return null;

  return (
    <div
      className="image-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={alt || closeLabel}
    >
      <button
        type="button"
        className="image-lightbox__backdrop"
        aria-label={closeLabel}
        onClick={onClose}
      />

      <button
        type="button"
        className="image-lightbox__close"
        aria-label={closeLabel}
        onClick={onClose}
      >
        ×
      </button>

      <div className="image-lightbox__stage">
        <img
          src={src}
          alt={alt}
          className="image-lightbox__image"
          draggable={false}
        />
      </div>
    </div>
  );
}
