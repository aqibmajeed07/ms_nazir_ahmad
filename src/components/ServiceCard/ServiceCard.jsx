import React from 'react';
import { Building2, Hammer, Droplets, Zap, Compass, CheckCircle2 } from 'lucide-react';

const iconMap = {
  Building2,
  Hammer,
  Droplets,
  Zap,
  Compass
};

export function ServiceCard({ service }) {
  const IconComponent = iconMap[service.icon] || Building2;

  return (
    <div className="service-card">
      <div className="service-card-top">
        <div className="service-icon-box">
          <IconComponent size={24} className="service-icon" />
        </div>
        <span className="service-category">{service.category}</span>
      </div>

      <h3 className="service-title">{service.title}</h3>
      <p className="service-desc">{service.shortDesc}</p>

      {service.highlights && service.highlights.length > 0 && (
        <ul className="service-highlights">
          {service.highlights.map((item, idx) => (
            <li key={idx} className="service-highlight-item">
              <CheckCircle2 size={14} className="highlight-icon" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}

      <style>{`
        .service-card {
          background-color: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
          transition: transform var(--transition-base), box-shadow var(--transition-base), border-color var(--transition-base);
          position: relative;
        }
        .service-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
          border-color: var(--border-gold);
        }
        .service-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .service-icon-box {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-sm);
          background-color: var(--surface-secondary);
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--border);
          transition: background-color var(--transition-fast), color var(--transition-fast);
        }
        .service-card:hover .service-icon-box {
          background-color: var(--accent);
          color: #0F2537;
        }
        .service-category {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          color: var(--text-muted);
        }
        .service-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 12px;
          line-height: 1.3;
        }
        .service-desc {
          font-size: 0.92rem;
          color: var(--text-secondary);
          line-height: 1.55;
          margin-bottom: 20px;
          flex-grow: 1;
        }
        .service-highlights {
          list-style: none;
          padding: 0;
          margin: 0;
          border-top: 1px solid var(--border-subtle);
          padding-top: 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .service-highlight-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.82rem;
          color: var(--text-secondary);
        }
        .highlight-icon {
          color: var(--accent);
          flex-shrink: 0;
        }
      `}</style>
    </div>
  );
}

export default ServiceCard;
