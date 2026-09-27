import React from 'react';

export function SectionHeading({
  badge,
  title,
  description,
  centered = false,
  className = ''
}) {
  return (
    <div className={`section-heading ${centered ? 'text-center' : ''} ${className}`}>
      {badge && (
        <div className="heading-badge-wrap">
          <span className="badge">{badge}</span>
        </div>
      )}
      <h2 className="heading-title">{title}</h2>
      <div className={`heading-accent-bar ${centered ? 'mx-auto' : ''}`} />
      {description && <p className="heading-description">{description}</p>}

      <style>{`
        .section-heading {
          margin-bottom: 40px;
        }
        @media (min-width: 768px) {
          .section-heading {
            margin-bottom: 56px;
          }
        }
        .section-heading.text-center {
          text-align: center;
        }
        .heading-badge-wrap {
          margin-bottom: 12px;
        }
        .heading-title {
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          font-weight: 800;
          color: var(--text);
          letter-spacing: -0.5px;
          line-height: 1.15;
        }
        .heading-accent-bar {
          width: 48px;
          height: 3px;
          background-color: var(--accent);
          border-radius: 2px;
          margin-top: 12px;
          margin-bottom: 16px;
        }
        .heading-accent-bar.mx-auto {
          margin-left: auto;
          margin-right: auto;
        }
        .heading-description {
          font-size: 1rem;
          color: var(--text-secondary);
          max-width: 640px;
          line-height: 1.6;
        }
        .text-center .heading-description {
          margin-left: auto;
          margin-right: auto;
        }
      `}</style>
    </div>
  );
}

export default SectionHeading;
