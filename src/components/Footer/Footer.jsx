import React, { useState } from 'react';
import companyConfig from '../../config/company';
import Logo from '../Logo/Logo';
import {
  MapPin, Phone, Mail, Clock, ShieldCheck, Download,
  ExternalLink, Code2, X, User, PhoneCall
} from 'lucide-react';

function LinkedInIcon({ size = 16, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Z" />
    </svg>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [showDevModal, setShowDevModal] = useState(false);

  return (
    <footer className="footer-wrap" aria-label="Site Footer">
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
            {companyConfig.udyamRegistration && (
              <div className="footer-badge-box" style={{ marginTop: '4px' }}>
                <ShieldCheck size={16} className="badge-icon" />
                <span>MSME: {companyConfig.udyamRegistration.number}</span>
              </div>
            )}
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

          {/* Column 3: Downloads & Documents */}
          <div className="footer-col">
            <h4 className="footer-heading">Public Documents</h4>
            <ul className="footer-links">
              {companyConfig.documents && companyConfig.documents.map((doc) => (
                <li key={doc.id}>
                  <a
                    href={doc.path}
                    className="footer-link footer-download-link"
                    download={doc.fileName}
                  >
                    <Download size={14} className="dl-icon" />
                    <span>{doc.shortTitle || doc.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Office Address & Contact */}
          <div className="footer-col contact-col">
            <h4 className="footer-heading">Registered Office</h4>
            <div className="footer-contact-item">
              <MapPin size={18} className="contact-icon" />
              <address className="contact-address">
                {companyConfig.address.line1}<br />
                {companyConfig.address.region} {companyConfig.address.pincode}
              </address>
            </div>

            <div className="footer-contact-item">
              <Clock size={16} className="contact-icon" />
              <span>{companyConfig.officeTimings}</span>
            </div>

            <div className="footer-contact-item">
              <Phone size={16} className="contact-icon" />
              <a href={`tel:${companyConfig.phone}`} className="footer-link">
                {companyConfig.phone}
              </a>
            </div>

            <div className="footer-contact-item">
              <Mail size={16} className="contact-icon" />
              <a href={`mailto:${companyConfig.email}`} className="footer-link">
                {companyConfig.email}
              </a>
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

          {/* Subtle Developer Credit */}
          <div className="footer-developer-credit">
            <button
              type="button"
              onClick={() => setShowDevModal(true)}
              className="dev-credit-btn"
              aria-label="View website developer information"
            >
              <Code2 size={13} className="dev-credit-icon" />
              <span>Website Developed by <strong>{companyConfig.developer.name}</strong></span>
            </button>
          </div>
        </div>
      </div>

      {/* Developer Contact Card Modal / Popover */}
      {showDevModal && (
        <div
          className="dev-modal-backdrop"
          onClick={() => setShowDevModal(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="dev-card-title"
        >
          <div className="dev-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="dev-modal-close"
              onClick={() => setShowDevModal(false)}
              aria-label="Close developer card"
            >
              <X size={16} />
            </button>

            <div className="dev-card-header">
              <div className="dev-avatar">
                <User size={24} />
              </div>
              <div>
                <h3 id="dev-card-title" className="dev-name">{companyConfig.developer.name}</h3>
                <span className="dev-role">{companyConfig.developer.role}</span>
              </div>
            </div>

            <p className="dev-bio">
              {companyConfig.developer.bio}
            </p>

            <div className="dev-card-links">
              <a
                href={companyConfig.developer.phoneTel}
                className="dev-contact-btn phone-btn"
              >
                <PhoneCall size={16} />
                <span>{companyConfig.developer.phone}</span>
              </a>

              <a
                href={companyConfig.developer.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="dev-contact-btn linkedin-btn"
              >
                <LinkedInIcon size={16} />
                <span>LinkedIn Profile</span>
                <ExternalLink size={12} className="btn-ext-icon" />
              </a>
            </div>
          </div>
        </div>
      )}

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
        .footer-download-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .dl-icon {
          color: var(--accent);
          flex-shrink: 0;
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
        .footer-bottom {
          padding-top: 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          flex-direction: column;
          gap: 16px;
          align-items: center;
          justify-content: space-between;
          font-size: 0.82rem;
          color: rgba(255, 255, 255, 0.5);
        }
        @media (min-width: 768px) {
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

        /* Subtle Developer Credit */
        .footer-developer-credit {
          display: flex;
          align-items: center;
        }
        .dev-credit-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.76rem;
          cursor: pointer;
          padding: 4px 8px;
          border-radius: var(--radius-sm);
          transition: all var(--transition-fast);
        }
        .dev-credit-btn:hover {
          color: var(--accent);
          background-color: rgba(197, 155, 39, 0.08);
        }
        .dev-credit-btn strong {
          color: rgba(255, 255, 255, 0.75);
          font-weight: 600;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .dev-credit-btn:hover strong {
          color: var(--accent);
        }
        .dev-credit-icon {
          color: rgba(255, 255, 255, 0.4);
        }

        /* Developer Modal Card */
        .dev-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background-color: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: devFadeIn 0.2s ease-out;
        }

        .dev-modal-card {
          position: relative;
          background-color: var(--surface);
          border: 1px solid var(--border-gold);
          border-radius: var(--radius-md);
          width: 100%;
          max-width: 420px;
          padding: 28px 24px;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(197, 155, 39, 0.12);
          animation: devScaleUp 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .dev-modal-close {
          position: absolute;
          top: 14px;
          right: 14px;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--surface-secondary);
          border: 1px solid var(--border);
          color: var(--text-muted);
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .dev-modal-close:hover {
          color: #EF4444;
          border-color: #EF4444;
        }

        .dev-card-header {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 14px;
        }

        .dev-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background-color: rgba(197, 155, 39, 0.15);
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1.5px solid var(--accent);
        }

        .dev-name {
          font-family: var(--font-heading);
          font-size: 1.2rem;
          font-weight: 800;
          color: var(--text);
          margin: 0;
        }

        .dev-role {
          font-size: 0.78rem;
          color: var(--accent);
          font-weight: 600;
          display: block;
          margin-top: 2px;
        }

        .dev-bio {
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.5;
          margin-bottom: 22px;
        }

        .dev-card-links {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .dev-contact-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 16px;
          border-radius: var(--radius-sm);
          font-size: 0.88rem;
          font-weight: 700;
          text-decoration: none;
          transition: all var(--transition-fast);
        }

        .phone-btn {
          background-color: var(--accent);
          color: #07131D;
          border: 1px solid var(--accent);
        }
        .phone-btn:hover {
          background-color: var(--accent-hover);
          transform: translateY(-2px);
          box-shadow: 0 4px 14px rgba(197, 155, 39, 0.3);
        }

        .linkedin-btn {
          background-color: #0A66C2;
          color: #FFFFFF;
          border: 1px solid #0A66C2;
          position: relative;
        }
        .linkedin-btn:hover {
          background-color: #084e96;
          transform: translateY(-2px);
          box-shadow: 0 4px 14px rgba(10, 102, 194, 0.3);
        }
        .btn-ext-icon {
          position: absolute;
          right: 14px;
        }

        @keyframes devFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes devScaleUp {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </footer>
  );
}

export default Footer;
