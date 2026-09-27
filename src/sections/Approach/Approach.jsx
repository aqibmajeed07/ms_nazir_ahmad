import React from 'react';
import SectionHeading from '../../components/SectionHeading/SectionHeading.jsx';
import { ClipboardList, CalendarClock, HardHat, ShieldCheck, CheckCircle2 } from 'lucide-react';

const approachSteps = [
  {
    step: "01",
    title: "Understanding the Requirement",
    icon: ClipboardList,
    description: "Every contract begins on the ground. We inspect site topography, review soil and access conditions, study drawings thoroughly, and align on timeline and departmental expectations before mobilizing plant or labor."
  },
  {
    step: "02",
    title: "Planning the Work",
    icon: CalendarClock,
    description: "In Jammu & Kashmir, weather and seasonal road access dictate realistic schedules. We sequence material procurement, stage certified cement and steel early, and plan earthwork around seasonal rains and winter freezes."
  },
  {
    step: "03",
    title: "Execution with Direct Supervision",
    icon: HardHat,
    description: "Work is directly supervised on-site by experienced foremen and field leadership. From trench excavation to shuttering, steel binding, and concrete pouring, we ensure accurate levels, alignments, and curing cycles."
  },
  {
    step: "04",
    title: "Quality & Safety Verification",
    icon: ShieldCheck,
    description: "We enforce mandatory safety gear across active fronts. Concrete batches undergo regular compressive cube testing, rebar certificates are logged, and PHE pipelines undergo hydrostatic pressure testing before backfilling."
  },
  {
    step: "05",
    title: "Completion & Transparent Handover",
    icon: CheckCircle2,
    description: "Upon structural completion, we conduct final level checks, clean up site debris, and facilitate joint departmental measurements (MB) for smooth verification, certification, and permanent commissioning."
  }
];

export default function Approach() {
  return (
    <section id="approach" className="approach-section">
      <div className="container">
        <SectionHeading
          badge="Our Working Method"
          title="Practical Construction From Ground to Handover"
          subtitle="How our team coordinates site logistics, departmental specifications, and quality controls on active works across Kashmir."
        />

        <div className="approach-timeline">
          {approachSteps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={item.step} className="approach-card">
                <div className="step-header">
                  <span className="step-number">{item.step}</span>
                  <div className="step-icon-wrap">
                    <Icon size={22} className="step-icon" />
                  </div>
                </div>
                <h3 className="step-title">{item.title}</h3>
                <p className="step-desc">{item.description}</p>
                {index < approachSteps.length - 1 && <div className="step-connector" aria-hidden="true" />}
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .approach-section {
          padding: var(--section-padding) 0;
          background-color: var(--surface);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          position: relative;
        }

        .approach-timeline {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          margin-top: 3rem;
          position: relative;
        }

        @media (min-width: 640px) {
          .approach-timeline {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .approach-timeline {
            grid-template-columns: repeat(5, 1fr);
            gap: 1.25rem;
          }
        }

        .approach-card {
          background-color: var(--background);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 1.75rem 1.5rem;
          position: relative;
          transition: transform var(--transition), box-shadow var(--transition), border-color var(--transition);
          display: flex;
          flex-direction: column;
        }

        .approach-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
          border-color: var(--accent);
        }

        .step-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
        }

        .step-number {
          font-family: var(--font-heading);
          font-size: 1.75rem;
          font-weight: 800;
          color: var(--accent);
          line-height: 1;
          letter-spacing: -0.02em;
        }

        .step-icon-wrap {
          width: 42px;
          height: 42px;
          border-radius: var(--radius-sm);
          background-color: var(--surface-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--border);
        }

        .step-icon {
          color: var(--accent);
        }

        .step-title {
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 0.75rem;
          line-height: 1.35;
        }

        .step-desc {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin: 0;
          flex-grow: 1;
        }
      `}</style>
    </section>
  );
}
