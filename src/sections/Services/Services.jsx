import React from 'react';
import servicesData from '../../data/services';
import SectionHeading from '../../components/SectionHeading/SectionHeading';
import ServiceCard from '../../components/ServiceCard/ServiceCard';
import companyConfig from '../../config/company';

export function Services() {
  return (
    <section id="services" className="section">
      <div className="watermark" style={{ bottom: '5%', left: '5%' }}>
        SCOPE
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <SectionHeading
          badge="Core Services"
          title="Construction & Infrastructure Capabilities"
          description={`Registered as an ${companyConfig.contractorClass}, we execute public and private works across Kashmir with certified materials, departmental compliance, and experienced site personnel.`}
        />

        <div className="services-grid">
          {servicesData.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* Realistic Institutional Note */}
        <div className="services-footer-banner">
          <div className="banner-text">
            <strong>Private &amp; Institutional Tenders:</strong> We construct educational campuses, medical sub-centers, and private commercial facilities built to Indian Standard (IS) codes and local PWD building specifications.
          </div>
          <a href="#contact" className="banner-cta">
            Request Scope Review ↗
          </a>
        </div>
      </div>

      <style>{`
        .services-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          margin-bottom: 40px;
        }
        @media (min-width: 640px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .services-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        .services-footer-banner {
          background-color: var(--surface-secondary);
          border: 1px solid var(--border);
          border-left: 4px solid var(--accent);
          border-radius: var(--radius-sm);
          padding: 16px 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          align-items: flex-start;
          justify-content: space-between;
        }
        @media (min-width: 768px) {
          .services-footer-banner {
            flex-direction: row;
            align-items: center;
          }
        }
        .banner-text {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }
        .banner-text strong {
          color: var(--text);
        }
        .banner-cta {
          font-family: var(--font-heading);
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--accent);
          text-decoration: none;
          white-space: nowrap;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .banner-cta:hover {
          text-decoration: underline;
        }
      `}</style>
    </section>
  );
}

export default Services;
