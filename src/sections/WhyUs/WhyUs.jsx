import React from 'react';
import SectionHeading from '../../components/SectionHeading/SectionHeading';
import { UserCheck, Shield, FileCheck2, HardHat } from 'lucide-react';
import companyConfig from '../../config/company';

const pillars = [
  {
    icon: UserCheck,
    title: "18+ Years Field Experience",
    description: "Direct proprietor oversight on active fronts. We know local terrain conditions, winter logistics, and departmental execution standards across Kashmir."
  },
  {
    icon: FileCheck2,
    title: "Certified Materials & Testing",
    description: "Compulsory Manufacturer Test Certificates (MTC) for steel, cement, and pipes, backed by regular cube compressive strength testing before structural sign-off."
  },
  {
    icon: HardHat,
    title: "Safety & PPE Compliance",
    description: "Mandatory protective equipment on all active work fronts, safe trenching practices, and daily morning briefings before hazardous work begins."
  },
  {
    icon: Shield,
    title: "A Class Departmental Standing",
    description: "Fully registered with J&K PWD (R&B) and Jal Shakti (PHE) with 100% active tax compliance (GST & PAN) and transparent billing."
  }
];

export function WhyUs() {
  return (
    <section id="why-us" className="section section-subtle">
      <div className="watermark" style={{ bottom: '8%', right: '4%' }}>
        TRUST
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <SectionHeading
          badge="Our Working Approach"
          title="Practical Construction Built to Last"
          description="We do not make inflated promises. We rely on sound engineering fundamentals, reliable machinery, and straightforward coordination with our clients."
          centered
        />

        <div className="why-grid">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="why-card">
                <div className="why-icon-wrap">
                  <Icon size={22} className="why-icon" />
                </div>
                <h3 className="why-card-title">{item.title}</h3>
                <p className="why-card-desc">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .why-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }
        @media (min-width: 640px) {
          .why-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .why-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        .why-card {
          background-color: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 28px 22px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          transition: transform var(--transition-base), box-shadow var(--transition-base), border-color var(--transition-base);
        }
        .why-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
          border-color: var(--border-gold);
        }
        .why-icon-wrap {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-sm);
          background-color: var(--surface-secondary);
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          border: 1px solid var(--border);
        }
        .why-card:hover .why-icon-wrap {
          background-color: var(--accent);
          color: #0F2537;
        }
        .why-card-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 10px;
          line-height: 1.3;
        }
        .why-card-desc {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.55;
        }
      `}</style>
    </section>
  );
}

export default WhyUs;
