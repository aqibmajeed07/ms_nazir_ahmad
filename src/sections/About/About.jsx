import React from 'react';
import companyConfig from '../../config/company';
import SectionHeading from '../../components/SectionHeading/SectionHeading';
import { Award, CheckCircle, ShieldCheck, MapPin, Compass } from 'lucide-react';

export function About() {
  return (
    <section id="about" className="section section-subtle bg-grid">
      <div className="watermark" style={{ top: '10%', right: '5%' }}>
        BUILD
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="about-grid">
          
          {/* Left Column: Image with Floating Experience Card */}
          <div className="about-image-column">
            <div className="about-image-frame">
              <img
                src="/images/about_us_hero.jpg"
                alt="Construction Works in Jammu and Kashmir"
                className="about-primary-img"
              />
              <div className="about-experience-badge">
                <span className="badge-exp-number">{companyConfig.experienceYears}</span>
                <span className="badge-exp-text">Years of Proven Field Execution in J&amp;K</span>
              </div>
            </div>

            {/* Owner Profile Card */}
            <div className="about-owner-card">
              <div className="about-owner-photo-wrap">
                <img
                  src="/images/owner_photo.png"
                  alt={`${companyConfig.proprietor} — Sole Proprietor`}
                  className="about-owner-photo"
                />
              </div>
              <div className="about-owner-info">
                <h4 className="about-owner-name">{companyConfig.proprietor}</h4>
                <span className="about-owner-role">Sole Proprietor & Managing Contractor</span>
                <p className="about-owner-bio">
                  Direct on-site leadership across all active project fronts in J&amp;K. Over 18 years of hands-on construction experience.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Story & 3 Verified Facts */}
          <div className="about-content-column">
            <SectionHeading
              badge="About Our Firm"
              title="A Class Contracting with Direct Field Leadership"
              description={`${companyConfig.companyName} is an established government-registered A Class contractor headquartered at ${companyConfig.address.full}. For over 18 years, our focus has remained steady: solid construction work, careful on-site supervision, and dependable project execution for government departments and private clients alike.`}
            />

            <p className="about-body-text">
              We undertake civil construction, institutional building works, water supply schemes, and power distribution projects across Jammu & Kashmir. Rather than operating as remote managers, our leadership stays directly on the ground. We understand local ground conditions, high-altitude transport logistics, and winter weather windows, coordinating closely with resident engineers to solve problems safely and keep projects moving forward.
            </p>

            {/* 3 Grounded Fact Cards */}
            <div className="about-facts-grid">
              <div className="fact-card">
                <div className="fact-icon-wrap">
                  <Award size={20} className="fact-icon" />
                </div>
                <div>
                  <h4 className="fact-title">{companyConfig.contractorClass}</h4>
                  <p className="fact-desc">Registered with PW(R&amp;B) and Jal Shakti (PHE) J&amp;K</p>
                </div>
              </div>

              <div className="fact-card">
                <div className="fact-icon-wrap">
                  <CheckCircle size={20} className="fact-icon" />
                </div>
                <div>
                  <h4 className="fact-title">{companyConfig.projectCount} Delivered Works</h4>
                  <p className="fact-desc">Institutional buildings, pipeline schemes, and power lines</p>
                </div>
              </div>

              <div className="fact-card">
                <div className="fact-icon-wrap">
                  <ShieldCheck size={20} className="fact-icon" />
                </div>
                <div>
                  <h4 className="fact-title">Quality &amp; Safety First</h4>
                  <p className="fact-desc">Strict material testing (MTC) and mandatory PPE on every site</p>
                </div>
              </div>
            </div>

            <div className="about-location-note">
              <MapPin size={16} className="loc-icon" />
              <span>Office &amp; Registered Yard: <strong>{companyConfig.address.full}</strong></span>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          align-items: center;
        }
        @media (min-width: 992px) {
          .about-grid {
            grid-template-columns: 1fr 1.15fr;
            gap: 64px;
          }
        }
        .about-image-frame {
          position: relative;
          border-radius: var(--radius-md);
          overflow: hidden;
          box-shadow: var(--shadow-lg);
          border: 1px solid var(--border);
        }
        .about-primary-img {
          width: 100%;
          height: 420px;
          object-fit: cover;
          object-position: center;
        }
        .about-experience-badge {
          position: absolute;
          bottom: 20px;
          left: 20px;
          right: 20px;
          background-color: rgba(15, 37, 55, 0.92);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(197, 155, 39, 0.4);
          border-left: 4px solid var(--accent);
          padding: 16px 20px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          gap: 16px;
          color: #FFFFFF;
        }
        .badge-exp-number {
          font-family: var(--font-heading);
          font-size: 2.2rem;
          font-weight: 900;
          color: var(--accent);
          line-height: 1;
        }
        .badge-exp-text {
          font-size: 0.85rem;
          font-weight: 600;
          line-height: 1.3;
          color: rgba(255, 255, 255, 0.9);
        }
        .about-owner-card {
          margin-top: 16px;
          background-color: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 18px;
          transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
        }
        .about-owner-card:hover {
          border-color: var(--accent);
          box-shadow: 0 4px 20px rgba(197, 155, 39, 0.1);
        }
        .about-owner-photo-wrap {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          overflow: hidden;
          flex-shrink: 0;
          border: 3px solid var(--accent);
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
        }
        .about-owner-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
        }
        .about-owner-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .about-owner-name {
          font-family: var(--font-heading);
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text);
          margin: 0;
        }
        .about-owner-role {
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--accent);
          letter-spacing: 0.3px;
        }
        .about-owner-bio {
          font-size: 0.8rem;
          color: var(--text-muted);
          line-height: 1.45;
          margin-top: 4px;
        }
        .about-body-text {
          font-size: 0.96rem;
          color: var(--text-muted);
          line-height: 1.65;
          margin-bottom: 28px;
        }
        .about-facts-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          margin-bottom: 24px;
        }
        @media (min-width: 640px) {
          .about-facts-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        .fact-card {
          background-color: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 18px 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: transform var(--transition-fast), border-color var(--transition-fast);
        }
        .fact-card:hover {
          transform: translateY(-2px);
          border-color: var(--accent);
        }
        .fact-icon-wrap {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-sm);
          background-color: var(--surface-secondary);
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .fact-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 4px;
        }
        .fact-desc {
          font-size: 0.78rem;
          color: var(--text-muted);
          line-height: 1.4;
        }
        .about-location-note {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.82rem;
          color: var(--text-muted);
          background-color: var(--surface);
          border: 1px solid var(--border);
          padding: 8px 14px;
          border-radius: var(--radius-sm);
        }
        .loc-icon {
          color: var(--accent);
          flex-shrink: 0;
        }
      `}</style>
    </section>
  );
}

export default About;
