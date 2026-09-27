import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import Lightbox from '../Lightbox/Lightbox.jsx';

export function ProjectCard({ project }) {
  const images = project.images && project.images.length > 0 ? project.images : [project.image];
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const timerRef = useRef(null);

  // Auto-slideshow loop (every 3.5s when not hovered and has multiple images)
  useEffect(() => {
    if (images.length <= 1 || isHovered || isLightboxOpen) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % images.length);
    }, 3600);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [images.length, isHovered, isLightboxOpen]);

  const handlePrev = (e) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev + 1) % images.length);
  };

  const handleDotClick = (e, index) => {
    e.stopPropagation();
    setActiveIdx(index);
  };

  return (
    <>
      <div
        className="project-card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="project-image-wrap" onClick={() => setIsLightboxOpen(true)}>
          {/* Images with crossfade transition */}
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`${project.title} - View ${idx + 1}`}
              className={`project-image ${idx === activeIdx ? 'active' : ''}`}
            />
          ))}

          {/* Top badges */}
          <div className="project-category-badge">{project.category}</div>

          {/* Image counter indicator (e.g. 01 / 03) */}
          {images.length > 1 && (
            <div className="project-counter-badge">
              {String(activeIdx + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
            </div>
          )}

          {/* Expand hover button */}
          <div className="project-zoom-badge" title="Click to view full photo">
            <Maximize2 size={16} />
          </div>

          {/* Navigation arrows (shown on hover or mobile) */}
          {images.length > 1 && (
            <div className="project-slide-nav">
              <button
                className="slide-arrow prev"
                onClick={handlePrev}
                aria-label={`Previous image of ${project.title}`}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                className="slide-arrow next"
                onClick={handleNext}
                aria-label={`Next image of ${project.title}`}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}

          {/* Dot navigation */}
          {images.length > 1 && (
            <div className="slide-dots">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  className={`slide-dot ${idx === activeIdx ? 'active' : ''}`}
                  onClick={(e) => handleDotClick(e, idx)}
                  aria-label={`Switch to image ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="project-content">
          <h3 className="project-title">{project.title}</h3>
          <p className="project-scope">{project.scope}</p>

          {project.keyDetails && (
            <p className="project-key-detail">
              <strong>Standard:</strong> {project.keyDetails}
            </p>
          )}

          {project.tags && project.tags.length > 0 && (
            <div className="project-tags">
              {project.tags.map((tag, idx) => (
                <span key={idx} className="project-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        images={images}
        currentIndex={activeIdx}
        onIndexChange={setActiveIdx}
        title={project.title}
        category={project.category}
      />

      <style>{`
        .project-card {
          background-color: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform var(--transition), box-shadow var(--transition), border-color var(--transition);
        }

        .project-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
          border-color: var(--accent);
        }

        .project-image-wrap {
          position: relative;
          width: 100%;
          height: 240px;
          overflow: hidden;
          background-color: var(--surface-secondary);
          cursor: pointer;
        }

        .project-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          opacity: 0;
          transition: opacity 0.5s ease-in-out, transform 0.6s ease;
          pointer-events: none;
        }

        .project-image.active {
          opacity: 1;
          pointer-events: auto;
        }

        .project-card:hover .project-image.active {
          transform: scale(1.03);
        }

        .project-category-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background-color: rgba(15, 37, 55, 0.88);
          backdrop-filter: blur(6px);
          color: #FFFFFF;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          padding: 4px 10px;
          border-radius: var(--radius-sm);
          border: 1px solid rgba(197, 155, 39, 0.4);
          z-index: 2;
        }

        .project-counter-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background-color: rgba(15, 37, 55, 0.85);
          backdrop-filter: blur(4px);
          color: #FFFFFF;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: var(--radius-sm);
          border: 1px solid rgba(255, 255, 255, 0.15);
          z-index: 2;
          font-family: monospace;
        }

        .project-zoom-badge {
          position: absolute;
          bottom: 12px;
          right: 12px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: rgba(15, 37, 55, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transform: scale(0.85);
          transition: opacity var(--transition-fast), transform var(--transition-fast);
          z-index: 3;
        }

        .project-card:hover .project-zoom-badge {
          opacity: 1;
          transform: scale(1);
        }

        .project-slide-nav {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 8px;
          opacity: 0;
          transition: opacity var(--transition-fast);
          z-index: 3;
          pointer-events: none;
        }

        .project-card:hover .project-slide-nav {
          opacity: 1;
        }

        .slide-arrow {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background-color: rgba(15, 37, 55, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          pointer-events: auto;
          transition: background-color var(--transition-fast), transform var(--transition-fast);
        }

        .slide-arrow:hover {
          background-color: var(--accent);
          color: #0F2537;
          transform: scale(1.1);
        }

        .slide-dots {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 6px;
          z-index: 3;
        }

        .slide-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.4);
          border: none;
          padding: 0;
          cursor: pointer;
          transition: background-color var(--transition-fast), transform var(--transition-fast);
        }

        .slide-dot.active {
          background-color: var(--accent);
          transform: scale(1.25);
        }

        .project-content {
          padding: 1.5rem 1.25rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .project-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 0.5rem;
          line-height: 1.3;
        }

        .project-scope {
          font-size: 0.88rem;
          color: var(--text-muted);
          line-height: 1.5;
          margin-bottom: 0.75rem;
        }

        .project-key-detail {
          font-size: 0.8rem;
          color: var(--text-muted);
          background-color: var(--surface-secondary);
          border-left: 2px solid var(--accent);
          padding: 6px 10px;
          border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
          margin-bottom: 1rem;
          line-height: 1.4;
        }

        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          border-top: 1px solid var(--border);
          padding-top: 0.85rem;
          margin-top: auto;
        }

        .project-tag {
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--text-muted);
          background-color: var(--surface-secondary);
          padding: 3px 8px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border);
        }

        @media (max-width: 768px) {
          .project-slide-nav {
            opacity: 1;
          }
          .slide-arrow {
            width: 30px;
            height: 30px;
          }
        }
      `}</style>
    </>
  );
}

export default ProjectCard;
