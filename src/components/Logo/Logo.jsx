import React from 'react';
import companyConfig from '../../config/company';

export function Logo({ className = '', variant = 'full', size = 'default' }) {
  const isSmall = size === 'small';

  return (
    <a href="#hero" className={`brand-logo ${className}`} aria-label={companyConfig.companyName}>
      <div className="logo-symbol">
        <span className="logo-letter">N</span>
      </div>
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
        .logo-symbol {
          width: ${isSmall ? '32px' : '40px'};
          height: ${isSmall ? '32px' : '40px'};
          background-color: var(--accent);
          color: #0F2537;
          font-family: var(--font-heading);
          font-weight: 900;
          font-size: ${isSmall ? '1.1rem' : '1.35rem'};
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-sm);
          box-shadow: var(--shadow-sm);
          flex-shrink: 0;
          transition: transform var(--transition-fast);
        }
        .brand-logo:hover .logo-symbol {
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
