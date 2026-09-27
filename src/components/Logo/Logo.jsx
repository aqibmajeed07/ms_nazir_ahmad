import React from 'react';
import companyConfig from '../../config/company';

export function Logo({ className = '', variant = 'full', size = 'default' }) {
  const isSmall = size === 'small';
  const logoSize = isSmall ? 36 : 44;

  return (
    <a href="#hero" className={`brand-logo ${className}`} aria-label={companyConfig.companyName}>
      <img 
        src={companyConfig.logoImage} 
        alt={`${companyConfig.companyName} Logo`} 
        className="logo-img"
        style={{ width: logoSize, height: logoSize }}
      />
      {variant !== 'icon-only' && (
        <div className="logo-text-block">
          <span className="logo-title">{companyConfig.companyName}</span>
          {!isSmall && (
            <span className="logo-subtitle">
              {companyConfig.contractorClass} · J&amp;K
            </span>
          )}
        </div>
      )}
      <style>{`
        .brand-logo {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: inherit;
        }
        .logo-img {
          border-radius: 50%;
          object-fit: cover;
          flex-shrink: 0;
          border: 2px solid rgba(197, 155, 39, 0.5);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          transition: transform var(--transition-fast);
        }
        .brand-logo:hover .logo-img {
          transform: scale(1.04);
        }
        .logo-text-block {
          display: flex;
          flex-direction: column;
          line-height: 1.15;
        }
        .logo-title {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: ${isSmall ? '0.95rem' : '1.1rem'};
          letter-spacing: 0.5px;
          color: var(--text);
          white-space: nowrap;
        }
        @media (max-width: 420px) {
          .logo-title {
            font-size: ${isSmall ? '0.85rem' : '0.98rem'};
          }
        }
        .logo-subtitle {
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: var(--accent);
          margin-top: 2px;
        }
      `}</style>
    </a>
  );
}

export default Logo;
