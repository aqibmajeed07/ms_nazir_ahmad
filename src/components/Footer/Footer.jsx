import React from 'react';
import companyConfig from '../../config/company';
import Logo from '../Logo/Logo';
import { MapPin, Phone, Mail, Clock, ShieldCheck } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-wrap">
      <div className="container footer-container">
        <div className="footer-grid">
          
          {/* Column 1: Company Profile & Verification */}
          <div className="footer-col company-col">
            <Logo size="default" />
            <p className="footer-tagline">
              {companyConfig.subTagline}
            </p>
            <div className="footer-badge-box">
              <ShieldCheck size={16} className="badge-icon" />
              <span>{companyConfig.contractorClass} · Verified Standing</span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Navigation</h4>
            <ul className="footer-links">
              {companyConfig.navLinks.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="footer-link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Core Disciplines */}
          <div className="footer-col">
            <h4 className="footer-heading">Capabilities</h4>
            <ul className="footer-links">
              <li><a href="#services" className="footer-link">Private &amp; Institutional Buildings</a></li>
              <li><a href="#services" className="footer-link">General Civil &amp; Foundations</a></li>
              <li><a href="#services" className="footer-link">Water Supply &amp; PHE Schemes</a></li>
              <li><a href="#services" className="footer-link">Electrical &amp; Power Distribution</a></li>
              <li><a href="#cad-work" className="footer-link">CAD &amp; Structural Drafting</a></li>
              <li><a href="#gallery" className="footer-link">Complete Works Gallery</a></li>
            </ul>
          </div>

          {/* Column 4: Office Address & Contact */}
          <div className="footer-col contact-col">
            <h4 className="footer-heading">Office Location</h4>
            <div className="footer-contact-item">
              <MapPin size={18} className="contact-icon" />
              <address className="contact-address">
                {companyConfig.address.line1}<br />
                {companyConfig.address.region}
              </address>
            </div>

            <div className="footer-contact-item">
              <Clock size={16} className="contact-icon" />
              <span>{companyConfig.officeTimings}</span>
            </div>

            <div className="footer-contact-item">
              <Phone size={16} className="contact-icon" />
              {companyConfig.phone ? (
                <a href={`tel:${companyConfig.phone}`} className="footer-link">
                  {companyConfig.phone}
                </a>
              ) : (
                <span className="placeholder-text">[Phone available upon inquiry]</span>
              )}
            </div>

            <div className="footer-contact-item">
              <Mail size={16} className="contact-icon" />
              {companyConfig.email ? (
                <a href={`mailto:${companyConfig.email}`} className="footer-link">
                  {companyConfig.email}
                </a>
              ) : (
                <span className="placeholder-text">[Email available upon inquiry]</span>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Bar with Dynamic Year */}
        <div className="footer-bottom">
          <p className="copyright-text">
            © {currentYear} {companyConfig.companyName}. All rights reserved.
          </p>
          <div className="footer-badges">
            <span className="footer-micro-badge">{companyConfig.experienceLabel}</span>
            <span className="footer-micro-badge">{companyConfig.projectsLabel}</span>
          </div>
        </div>
      </div>

      <style>{`
        .footer-wrap {
          background-color: var(--footer-bg);
          color: var(--footer-text);
          padding-top: 64px;
          padding-bottom: 32px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          position: relative;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          margin-bottom: 48px;
        }
        @media (min-width: 640px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1.5fr 1fr 1.2fr 1.3fr;
          }
        }
        .company-col {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .footer-tagline {
          font-size: 0.88rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.55;
          max-width: 320px;
        }
        .footer-badge-box {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--accent);
          background-color: rgba(197, 155, 39, 0.12);
          border: 1px solid var(--border-gold);
          padding: 6px 12px;
          border-radius: var(--radius-sm);
          width: fit-content;
        }
        .footer-heading {
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 700;
          color: #FFFFFF;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 18px;
        }
        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .footer-link {
          font-size: 0.88rem;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          transition: color var(--transition-fast);
        }
        .footer-link:hover {
          color: var(--accent);
        }
        .footer-contact-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 0.86rem;
          color: rgba(255, 255, 255, 0.75);
          margin-bottom: 12px;
        }
        .contact-icon {
          color: var(--accent);
          flex-shrink: 0;
          margin-top: 2px;
        }
        .contact-address {
          font-style: normal;
          line-height: 1.4;
        }
        .placeholder-text {
          color: rgba(255, 255, 255, 0.45);
          font-size: 0.82rem;
          font-style: italic;
        }
        .footer-bottom {
          padding-top: 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          flex-direction: column;
          gap: 12px;
          align-items: center;
          justify-content: space-between;
          font-size: 0.82rem;
          color: rgba(255, 255, 255, 0.5);
        }
        @media (min-width: 640px) {
          .footer-bottom {
            flex-direction: row;
          }
        }
        .footer-badges {
          display: flex;
          gap: 12px;
        }
        .footer-micro-badge {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: rgba(255, 255, 255, 0.6);
          background: rgba(255, 255, 255, 0.05);
          padding: 2px 8px;
          border-radius: var(--radius-sm);
        }
      `}</style>
    </footer>
  );
}

export default Footer;
