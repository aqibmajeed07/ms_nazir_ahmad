import React from 'react';
import companyConfig from '../../config/company';
import Button from '../../components/Button/Button';
import { PhoneCall, ArrowRight } from 'lucide-react';

export function CTA() {
  return (
    <section className="cta-section">
      {/* Background Image with Dark Contrast Overlay */}
      <div className="cta-bg-wrap">
        <img
          src="/images/company_glance_bg.jpg"
          alt="Construction Site in Kashmir"
          className="cta-bg-img"
          loading="lazy"
        />
        <div className="cta-overlay" />
      </div>

      <div className="container cta-container">
        <div className="cta-content">
          <span className="cta-badge">GET IN TOUCH</span>
          <h2 className="cta-title">
            Have an upcoming construction project in mind?
          </h2>
          <p className="cta-subtext">
            Whether you are planning an institutional building, private structure, water pipeline scheme, or electrical installation, our team is ready to discuss your requirements.
          </p>
          <div className="cta-buttons">
            <Button href="#contact" variant="primary" size="large" icon={PhoneCall}>
              Contact Us Today
            </Button>
            <Button href="#services" variant="outline-white" size="large" icon={ArrowRight}>
              Explore Services
            </Button>
          </div>
        </div>
      </div>

      <style>{`
        .cta-section {
          position: relative;
          padding: 88px 0;
          overflow: hidden;
          background-color: #0F2537;
        }
        .cta-bg-wrap {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }
        .cta-bg-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center bottom;
        }
        .cta-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            180deg,
            rgba(15, 37, 55, 0.88) 0%,
            rgba(15, 37, 55, 0.94) 100%
          );
        }
        .cta-container {
          position: relative;
          z-index: 1;
        }
        .cta-content {
          max-width: 680px;
          margin: 0 auto;
          text-align: center;
        }
        .cta-badge {
          display: inline-block;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 1.5px;
          color: var(--accent);
          text-transform: uppercase;
          margin-bottom: 14px;
        }
        .cta-title {
          font-size: clamp(1.8rem, 4vw, 2.6rem);
          font-weight: 800;
          color: #FFFFFF;
          line-height: 1.2;
          margin-bottom: 16px;
        }
        .cta-subtext {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.85);
          line-height: 1.6;
          margin-bottom: 32px;
        }
        .cta-buttons {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 14px;
        }
      `}</style>
    </section>
  );
}

export default CTA;
