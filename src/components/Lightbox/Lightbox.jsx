import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Lightbox({ isOpen, onClose, images = [], currentIndex = 0, onIndexChange, title, category }) {
  const handlePrev = useCallback((e) => {
    e?.stopPropagation();
    onIndexChange((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, onIndexChange]);

  const handleNext = useCallback((e) => {
    e?.stopPropagation();
    onIndexChange((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, onIndexChange]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') handlePrev();
      else if (e.key === 'ArrowRight') handleNext();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <div className="lightbox-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Project photo viewer">
      <div className="lightbox-container" onClick={(e) => e.stopPropagation()}>
        {/* Top Controls */}
        <div className="lightbox-header">
          <div className="lightbox-meta">
            {category && <span className="lightbox-category">{category}</span>}
            {title && <h4 className="lightbox-title">{title}</h4>}
          </div>
          <div className="lightbox-actions">
            <span className="lightbox-counter">
              {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
            </span>
            <button className="lightbox-close-btn" onClick={onClose} aria-label="Close image viewer">
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Main Stage */}
        <div className="lightbox-stage">
          {images.length > 1 && (
            <button className="lightbox-nav-btn prev" onClick={handlePrev} aria-label="Previous image">
              <ChevronLeft size={28} />
            </button>
          )}

          <div className="lightbox-image-wrap">
            <img
              src={currentImage}
              alt={`${title || 'Project'} - Image ${currentIndex + 1}`}
              className="lightbox-image"
            />
          </div>

          {images.length > 1 && (
            <button className="lightbox-nav-btn next" onClick={handleNext} aria-label="Next image">
              <ChevronRight size={28} />
            </button>
          )}
        </div>

        {/* Bottom Thumbnail Strip (if multiple) */}
        {images.length > 1 && (
          <div className="lightbox-thumbs">
            {images.map((img, idx) => (
              <button
                key={idx}
                className={`lightbox-thumb-btn ${idx === currentIndex ? 'active' : ''}`}
                onClick={() => onIndexChange(idx)}
                aria-label={`View image ${idx + 1}`}
              >
                <img src={img} alt={`Thumbnail ${idx + 1}`} className="lightbox-thumb-img" />
              </button>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .lightbox-overlay {
          position: fixed;
          inset: 0;
          z-index: 10000;
          background-color: rgba(11, 20, 30, 0.94);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          animation: lightboxFadeIn 0.25s ease-out forwards;
        }

        @keyframes lightboxFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .lightbox-container {
          width: 100%;
          max-width: 1100px;
          max-height: 94vh;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .lightbox-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 0.5rem;
          color: #FFFFFF;
        }

        .lightbox-category {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--accent);
          letter-spacing: 0.05em;
          margin-bottom: 0.25rem;
        }

        .lightbox-title {
          font-size: 1.15rem;
          font-weight: 700;
          margin: 0;
          color: #FFFFFF;
        }

        .lightbox-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .lightbox-counter {
          font-size: 0.85rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.7);
          font-family: monospace;
        }

        .lightbox-close-btn {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-sm);
          background-color: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color var(--transition-fast), color var(--transition-fast);
        }

        .lightbox-close-btn:hover {
          background-color: var(--accent);
          color: #0F2537;
        }

        .lightbox-stage {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0.5rem 0;
          min-height: 280px;
          max-height: 72vh;
        }

        .lightbox-image-wrap {
          max-width: 100%;
          max-height: 72vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .lightbox-image {
          max-width: 100%;
          max-height: 72vh;
          object-fit: contain;
          border-radius: var(--radius-sm);
          box-shadow: var(--shadow-lg);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .lightbox-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background-color: rgba(15, 37, 55, 0.75);
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          transition: background-color var(--transition-fast), transform var(--transition-fast);
        }

        .lightbox-nav-btn:hover {
          background-color: var(--accent);
          color: #0F2537;
          transform: translateY(-50%) scale(1.05);
        }

        .lightbox-nav-btn.prev {
          left: 12px;
        }

        .lightbox-nav-btn.next {
          right: 12px;
        }

        .lightbox-thumbs {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.5rem;
          overflow-x: auto;
        }

        .lightbox-thumb-btn {
          width: 64px;
          height: 44px;
          border-radius: var(--radius-sm);
          overflow: hidden;
          border: 2px solid transparent;
          background: none;
          padding: 0;
          cursor: pointer;
          opacity: 0.6;
          transition: opacity var(--transition-fast), border-color var(--transition-fast);
        }

        .lightbox-thumb-btn.active,
        .lightbox-thumb-btn:hover {
          opacity: 1;
          border-color: var(--accent);
        }

        .lightbox-thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        @media (max-width: 640px) {
          .lightbox-nav-btn {
            width: 38px;
            height: 38px;
          }
          .lightbox-nav-btn.prev { left: 4px; }
          .lightbox-nav-btn.next { right: 4px; }
        }
      `}</style>
    </div>
  );
}
