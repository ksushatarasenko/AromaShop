import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getBrandById } from '../../data/index.js';
import {
  getPerfumeGalleryImages,
  getPlaceholderImage,
  getPerfumeImageAlt,
  warnMissingPerfumeImage,
} from '../../utils/perfumeImage.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';

function useResilientSrc(candidates, onExhausted) {
  const [index, setIndex] = useState(0);
  const key = candidates.join('|');

  useEffect(() => {
    setIndex(0);
  }, [key]);

  const src = candidates[Math.min(index, candidates.length - 1)] || getPlaceholderImage();
  const isPlaceholder = src === getPlaceholderImage();

  const onError = () => {
    if (index < candidates.length - 1) {
      setIndex((i) => i + 1);
      return;
    }
    onExhausted?.();
  };

  return { src, onError, isPlaceholder };
}

/**
 * Premium perfume gallery: main image + thumbnails + fullscreen lightbox.
 */
export default function PerfumeGallery({ perfume }) {
  const { t } = useLanguage();
  const brand = getBrandById(perfume.brandId);
  const alt = getPerfumeImageAlt(perfume, brand);

  const slideDefs = useMemo(() => getPerfumeGalleryImages(perfume), [perfume]);

  const [active, setActive] = useState(0);
  // Only main starts visible; 02/03 join after a successful load (never phantom slots).
  const [available, setAvailable] = useState(() =>
    slideDefs.map((_, i) => i === 0)
  );
  const [settledExtra, setSettledExtra] = useState({});
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    setActive(0);
    setAvailable(slideDefs.map((_, i) => i === 0));
    setSettledExtra({});
    setFullscreen(false);
  }, [perfume?.id, slideDefs]);

  const markMissing = useCallback((index) => {
    setAvailable((prev) => {
      if (!prev[index]) return prev;
      const next = [...prev];
      next[index] = false;
      return next;
    });
    if (index > 0) {
      setSettledExtra((prev) =>
        prev[index] ? prev : { ...prev, [index]: true }
      );
    }
  }, []);

  const markLoaded = useCallback((index) => {
    setAvailable((prev) => {
      if (prev[index]) return prev;
      const next = [...prev];
      next[index] = true;
      return next;
    });
    if (index > 0) {
      setSettledExtra((prev) =>
        prev[index] ? prev : { ...prev, [index]: true }
      );
    }
  }, []);

  const slides = useMemo(
    () =>
      slideDefs
        .map((slide, index) => ({ ...slide, index }))
        .filter((slide) => available[slide.index]),
    [slideDefs, available]
  );

  // Keep active index valid when slides drop out
  useEffect(() => {
    if (!slides.length) return;
    if (!slides.some((s) => s.index === active)) {
      setActive(slides[0].index);
    }
  }, [slides, active]);

  const activeSlide = slideDefs[active] || slideDefs[0];
  const activeCandidates = activeSlide?.candidates || [getPlaceholderImage()];

  const main = useResilientSrc(activeCandidates, () => {
    if (active === 0 && perfume?.id) warnMissingPerfumeImage(perfume.id);
    if (active !== 0) markMissing(active);
  });

  const extraIndexes = slideDefs.slice(1).map((_, i) => i + 1);
  const extrasSettled =
    extraIndexes.length === 0 ||
    extraIndexes.every((index) => settledExtra[index]);
  const visibleExtras = slides.filter((s) => s.index > 0);
  const showThumbs = extrasSettled && visibleExtras.length > 0;

  const orderedIndexes = slides.map((s) => s.index);
  const positionInVisible = Math.max(0, orderedIndexes.indexOf(active));
  const totalVisible = orderedIndexes.length;

  const goToRelative = useCallback(
    (delta) => {
      if (orderedIndexes.length < 2) return;
      const currentPos = orderedIndexes.indexOf(active);
      const pos = currentPos < 0 ? 0 : currentPos;
      const nextPos = (pos + delta + orderedIndexes.length) % orderedIndexes.length;
      setActive(orderedIndexes[nextPos]);
    },
    [orderedIndexes, active]
  );

  const openFullscreen = () => setFullscreen(true);
  const closeFullscreen = () => setFullscreen(false);

  return (
    <div className="perfume-gallery">
      <button
        type="button"
        className="perfume-details__media perfume-gallery__main"
        onClick={openFullscreen}
        aria-label={t('perfume.galleryOpen')}
      >
        <img
          key={main.src}
          src={main.src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={`perfume-image${main.isPlaceholder ? ' perfume-image--placeholder' : ''}`}
          onError={main.onError}
        />
      </button>

      {showThumbs ? (
        <div
          className="perfume-gallery__thumbs"
          role="list"
          aria-label={t('perfume.galleryThumbs')}
        >
          {slides.map((slide) => (
            <Thumb
              key={slide.id}
              candidates={slide.candidates}
              active={active === slide.index}
              label={`${alt} ${slides.findIndex((s) => s.index === slide.index) + 1}`}
              onSelect={() => setActive(slide.index)}
              onMissing={() => markMissing(slide.index)}
              onLoaded={() => markLoaded(slide.index)}
            />
          ))}
        </div>
      ) : null}

      {/* Probe every extra slot until settled — never rely on folder dumping */}
      {!extrasSettled ? (
        <div className="perfume-gallery__probe" aria-hidden="true">
          {slideDefs.slice(1).map((slide, i) => {
            const index = i + 1;
            if (settledExtra[index]) return null;
            return (
              <Probe
                key={slide.id}
                candidates={slide.candidates}
                onMissing={() => markMissing(index)}
                onLoaded={() => markLoaded(index)}
              />
            );
          })}
        </div>
      ) : null}

      {fullscreen ? (
        <FullscreenViewer
          alt={alt}
          slides={slides}
          activeIndex={active}
          position={positionInVisible + 1}
          total={totalVisible}
          onSelect={setActive}
          onPrev={() => goToRelative(-1)}
          onNext={() => goToRelative(1)}
          onClose={closeFullscreen}
          labels={{
            close: t('perfume.galleryClose'),
            prev: t('perfume.galleryPrev'),
            next: t('perfume.galleryNext'),
          }}
        />
      ) : null}
    </div>
  );
}

function Probe({ candidates, onMissing, onLoaded }) {
  const { src, onError, isPlaceholder } = useResilientSrc(candidates, () => {
    onMissing?.();
  });

  useEffect(() => {
    if (isPlaceholder) onMissing?.();
  }, [isPlaceholder, onMissing]);

  if (isPlaceholder) return null;

  return (
    <img
      src={src}
      alt=""
      onLoad={() => onLoaded?.()}
      onError={onError}
    />
  );
}

function Thumb({ candidates, active, label, onSelect, onMissing, onLoaded }) {
  const [failed, setFailed] = useState(false);
  const { src, onError, isPlaceholder } = useResilientSrc(candidates, () => {
    setFailed(true);
    onMissing?.();
  });

  if (failed || isPlaceholder) return null;

  return (
    <button
      type="button"
      role="listitem"
      className={`perfume-gallery__thumb${active ? ' is-active' : ''}`}
      aria-label={label}
      aria-pressed={active}
      onClick={onSelect}
    >
      <img
        src={src}
        alt=""
        loading="lazy"
        onLoad={() => onLoaded?.()}
        onError={onError}
      />
    </button>
  );
}

function FullscreenViewer({
  alt,
  slides,
  activeIndex,
  position,
  total,
  onSelect,
  onPrev,
  onNext,
  onClose,
  labels,
}) {
  const touchStartX = useRef(null);
  const activeSlide = slides.find((s) => s.index === activeIndex) || slides[0];
  const { src, onError, isPlaceholder } = useResilientSrc(
    activeSlide?.candidates || [getPlaceholderImage()]
  );

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        onPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        onNext();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, onPrev, onNext]);

  const onTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0]?.clientX ?? null;
  };

  const onTouchEnd = (e) => {
    if (touchStartX.current == null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = endX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 48) return;
    if (delta < 0) onNext();
    else onPrev();
  };

  return (
    <div
      className="perfume-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div
        className="perfume-lightbox__backdrop"
        aria-hidden="true"
        onClick={onClose}
      />

      <button
        type="button"
        className="perfume-lightbox__close"
        aria-label={labels.close}
        onClick={onClose}
      >
        ×
      </button>

      {total > 1 ? (
        <button
          type="button"
          className="perfume-lightbox__nav perfume-lightbox__nav--prev"
          aria-label={labels.prev}
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
        >
          ‹
        </button>
      ) : null}

      {total > 1 ? (
        <button
          type="button"
          className="perfume-lightbox__nav perfume-lightbox__nav--next"
          aria-label={labels.next}
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
        >
          ›
        </button>
      ) : null}

      <button
        type="button"
        className="perfume-lightbox__stage"
        onClick={onClose}
        aria-label={labels.close}
      >
        <img
          key={src}
          src={src}
          alt={alt}
          className={`perfume-lightbox__image${isPlaceholder ? ' is-placeholder' : ''}`}
          onClick={(e) => {
            // Click image again closes (same as stage); stop bubble to avoid double-toggle quirks
            e.stopPropagation();
            onClose();
          }}
          onError={onError}
          draggable={false}
        />
      </button>

      {total > 1 ? (
        <p className="perfume-lightbox__counter" aria-live="polite">
          {position} / {total}
        </p>
      ) : null}

      {total > 1 ? (
        <div className="perfume-lightbox__dots" role="tablist">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={slide.index === activeIndex}
              className={`perfume-lightbox__dot${slide.index === activeIndex ? ' is-active' : ''}`}
              aria-label={`${i + 1} / ${total}`}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(slide.index);
              }}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
