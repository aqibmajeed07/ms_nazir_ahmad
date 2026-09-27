import React from 'react';
import companyConfig from '../../config/company';
import SectionHeading from '../../components/SectionHeading/SectionHeading';
import ContactForm from '../../components/ContactForm/ContactForm';
import { MapPin, Phone, Mail, Clock, ShieldCheck, ExternalLink, MessageSquare } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="section bg-grid">
      <div className="watermark" style={{ top: '10%', right: '5%' }}>
        CONTACT
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <SectionHeading
          badge="Inquiries &amp; Coordination"
          title="Contact Our Engineering Desk"
          description="Reach out directly for civil tenders, institutional building projects, pipeline distribution schemes, or drafting assistance."
        />

        <div className="contact-grid">
          
          {/* Left Column: Verified Office Details & Channel Placeholders */}
          <div className="contact-info-col">
            
            <div className="office-card">
              <div className="office-card-header">
                <MapPin size={22} className="card-header-icon" />
                <div>
                  <h3 className="office-card-title">Registered Office &amp; Yard</h3>
                  <p className="office-card-meta">{companyConfig.companyName}</p>
                </div>
              </div>

              <address className="office-full-address">
                <strong>{companyConfig.address.line1}</strong><br />
                {companyConfig.address.region}
              </address>

              <div className="office-timings">
                <Clock size={16} className="timing-icon" />
                <span>{companyConfig.officeTimings}</span>
              </div>
            </div>

            {/* Direct Communication Channels */}
            <div className="channels-card">
              <h4 className="channels-card-title">Direct Channels</h4>

              {/* Phone */}
              <div className="channel-row">
                <div className="channel-icon-box">
                  <Phone size={18} />
                </div>
                <div className="channel-details">
                  <span className="channel-label">Telephone / Mobile</span>
                  {companyConfig.phone ? (
                    <div>
                      <a href={`tel:${companyConfig.phone}`} className="channel-link">
                        {companyConfig.phone}
                      </a>
                      {companyConfig.secondaryPhones && companyConfig.secondaryPhones.length > 0 && (
                        <div style={{ marginTop: '4px', fontSize: '0.85rem' }}>
                          {companyConfig.secondaryPhones.map((sec, idx) => (
                            <span key={idx} style={{ marginRight: '8px' }}>
                              <a href={`tel:${sec}`} className="channel-link" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                {sec}
                              </a>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <span className="channel-placeholder">[Phone number to be added]</span>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="channel-row">
                <div className="channel-icon-box">
                  <Mail size={18} />
                </div>
                <div className="channel-details">
                  <span className="channel-label">Official Email</span>
                  {companyConfig.email ? (
                    <a href={`mailto:${companyConfig.email}`} className="channel-link">
                      {companyConfig.email}
                    </a>
                  ) : (
                    <span className="channel-placeholder">[Email to be added]</span>
                  )}
                </div>
              </div>

              {/* WhatsApp */}
              <div className="channel-row">
                <div className="channel-icon-box">
                  <MessageSquare size={18} />
                </div>
                <div className="channel-details">
                  <span className="channel-label">WhatsApp Desk</span>
                  {companyConfig.whatsapp ? (
                    <a
                      href={`https://wa.me/${companyConfig.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="channel-link"
                    >
                      +{companyConfig.whatsapp}
                    </a>
                  ) : (
                    <span className="channel-placeholder">[WhatsApp number to be added]</span>
                  )}
                </div>
              </div>
            </div>

            {/* Departmental Registration Verification Box */}
            <div className="registration-box">
              <div className="reg-icon-wrap">
                <ShieldCheck size={20} />
              </div>
              <div className="reg-content">
                <span className="reg-tag">GOVERNMENT CONTRACTOR VERIFICATION</span>
                <p className="reg-text">
                  Registered A Class Contractor with J&amp;K PWD &amp; Jal Shakti. Authenticated for civil, sanitary, and institutional works.
                </p>
                {companyConfig.registration.verificationPortal && (
                  <a
                    href={companyConfig.registration.verificationPortal}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="reg-link"
                  >
                    <span>Verify on {companyConfig.registration.portalName}</span>
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>

          </div>

          {/* Right Column: Customer Inquiry Form */}
          <div className="contact-form-col">
            <div className="form-card">
              <div className="form-card-header">
                <h3 className="form-card-title">Send a Project Enquiry</h3>
                <p className="form-card-sub">
                  Fill in your details below and our site engineering team will review your project requirements.
                </p>
              </div>

              <ContactForm />
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 36px;
        }
        @media (min-width: 992px) {
          .contact-grid {
            grid-template-columns: 1fr 1.35fr;
            gap: 48px;
          }
        }
        .contact-info-col {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .office-card {
          background-color: var(--surface);
          border: 1px solid var(--border);
          border-left: 4px solid var(--accent);
          border-radius: var(--radius-md);
          padding: 24px 22px;
          box-shadow: var(--shadow-sm);
        }
        .office-card-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 14px;
        }
        .card-header-icon {
          color: var(--accent);
          flex-shrink: 0;
        }
        .office-card-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text);
        }
        .office-card-meta {
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .office-full-address {
          font-style: normal;
          font-size: 0.95rem;
          color: var(--text);
          line-height: 1.5;
          margin-bottom: 16px;
        }
        .office-timings {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.82rem;
          color: var(--text-secondary);
          border-top: 1px solid var(--border-subtle);
          padding-top: 12px;
        }
        .timing-icon {
          color: var(--accent);
        }
        .channels-card {
          background-color: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 22px 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          box-shadow: var(--shadow-sm);
        }
        .channels-card-title {
          font-family: var(--font-heading);
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 1px;
          border-bottom: 1px solid var(--border-subtle);
          padding-bottom: 10px;
        }
        .channel-row {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .channel-icon-box {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-sm);
          background-color: var(--surface-secondary);
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border: 1px solid var(--border);
        }
        .channel-details {
          display: flex;
          flex-direction: column;
        }
        .channel-label {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text-muted);
        }
        .channel-link {
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text);
          text-decoration: none;
        }
        .channel-link:hover {
          color: var(--accent);
        }
        .channel-placeholder {
          font-size: 0.85rem;
          color: var(--text-muted);
          font-style: italic;
        }
        .registration-box {
          background-color: var(--surface-secondary);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 18px;
          display: flex;
          gap: 14px;
        }
        .reg-icon-wrap {
          color: var(--accent);
          flex-shrink: 0;
          margin-top: 2px;
        }
        .reg-tag {
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.8px;
          color: var(--accent);
          text-transform: uppercase;
          display: block;
          margin-bottom: 4px;
        }
        .reg-text {
          font-size: 0.82rem;
          color: var(--text-secondary);
          line-height: 1.45;
          margin-bottom: 8px;
        }
        .reg-link {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--accent);
          text-decoration: underline;
        }
        .form-card {
          background-color: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 32px 28px;
          box-shadow: var(--shadow-md);
        }
        .form-card-header {
          margin-bottom: 24px;
        }
        .form-card-title {
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--text);
          margin-bottom: 6px;
        }
        .form-card-sub {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }
      `}</style>
    </section>
  );
}

export default Contact;
