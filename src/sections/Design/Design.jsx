import React, { Suspense, lazy } from 'react';
import SectionHeading from '../../components/SectionHeading/SectionHeading.jsx';
import Button from '../../components/Button/Button.jsx';
import { Layers, Box, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';

const InteractiveBuilding3D = lazy(() => import('../../components/InteractiveBuilding3D/InteractiveBuilding3D.jsx'));

export function Design({ theme = 'dark' }) {
  return (
    <section id="cad-work" className="design-section">
      <div className="container">
        <SectionHeading
          badge="CAD &amp; Drafting Services"
          title="CAD Working Drawings &amp; 3D Visualization"
          subtitle="Professional computer-aided drafting and 3D architectural modeling to translate site dimensions into accurate working drawings, structural layouts, and clear exterior perspectives before pouring concrete."
        />

        <div className="design-grid">
          {/* Left Column: Interactive 3D Model with Three.js */}
          <div className="design-3d-col">
            <Suspense fallback={
              <div className="building-3d-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px', color: 'var(--text-muted)' }}>
                <Sparkles size={24} style={{ color: 'var(--accent)', animation: 'spin 2s linear infinite' }} />
                <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Loading 3D Architectural Model...</span>
              </div>
            }>
              <InteractiveBuilding3D theme={theme} />
            </Suspense>
            <div className="design-3d-caption">
              <span className="caption-dot" />
              <span>Computer-generated 3D structural massing model · Rotate, zoom, or click Reset View</span>
            </div>
          </div>

          {/* Right Column: Practical 2D & 3D Capability Cards */}
          <div className="design-content-col">
            <div className="capability-card">
              <div className="capability-header">
                <div className="capability-icon-wrap">
                  <Layers size={20} />
                </div>
                <div>
                  <h3 className="capability-title">2D CAD Architectural &amp; Working Drawings</h3>
                  <p className="capability-desc">
                    Accurate site setting-out plans, floor layouts, foundation cross-sections, and bar bending schedules prepared to prevent dimensional errors on the ground.
                  </p>
                </div>
              </div>
              <div className="capability-tags">
                <span className="capability-tag"><CheckCircle size={12} /> AutoCAD Plans</span>
                <span className="capability-tag"><CheckCircle size={12} /> Working Levels</span>
                <span className="capability-tag"><CheckCircle size={12} /> Column Layouts</span>
                <span className="capability-tag"><CheckCircle size={12} /> Bar Schedules</span>
              </div>
            </div>

            <div className="capability-card">
              <div className="capability-header">
                <div className="capability-icon-wrap">
                  <Box size={20} />
                </div>
                <div>
                  <h3 className="capability-title">3D CAD Modeling &amp; Perspective Views</h3>
                  <p className="capability-desc">
                    Clean 3D architectural massing models to evaluate fenestrations, sun orientation, entrance canopies, and façade aesthetics prior to structural procurement.
                  </p>
                </div>
              </div>
              <div className="capability-tags">
                <span className="capability-tag"><CheckCircle size={12} /> 3D Massing Models</span>
                <span className="capability-tag"><CheckCircle size={12} /> Elevation Studies</span>
                <span className="capability-tag"><CheckCircle size={12} /> Client Visualizations</span>
                <span className="capability-tag"><CheckCircle size={12} /> Structural Clearances</span>
              </div>
            </div>

            <div className="design-cta-row">
              <Button href="#contact" variant="primary" icon={ArrowRight}>
                Request CAD &amp; Drafting Consultation
              </Button>
              <span className="design-disclaimer">
                * CAD drafting and modeling services are provided as direct technical support to ensure dimensional accuracy on active contracts.
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .design-section {
          padding: var(--section-padding) 0;
          background-color: var(--surface);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          position: relative;
        }

        .design-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          margin-top: 3rem;
          align-items: center;
        }

        @media (min-width: 1024px) {
          .design-grid {
            grid-template-columns: 1.15fr 1fr;
            gap: 3.5rem;
          }
        }

        .design-3d-col {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .design-3d-caption {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8rem;
          color: var(--text-muted);
          padding-left: 4px;
        }

        .caption-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--accent);
          flex-shrink: 0;
        }

        .design-content-col {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .capability-card {
          background-color: var(--background);
          border: 1px solid var(--border);
          border-left: 3.5px solid var(--accent);
          border-radius: var(--radius-sm);
          padding: 1.5rem 1.35rem;
          box-shadow: var(--shadow-sm);
          transition: transform var(--transition-fast), border-color var(--transition-fast);
        }

        .capability-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .capability-header {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .capability-icon-wrap {
          width: 42px;
          height: 42px;
          border-radius: var(--radius-sm);
          background-color: var(--surface-secondary);
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border: 1px solid var(--border);
        }

        .capability-title {
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 0.35rem;
        }

        .capability-desc {
          font-size: 0.88rem;
          color: var(--text-muted);
          line-height: 1.55;
          margin: 0;
        }

        .capability-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          padding-top: 0.85rem;
          border-top: 1px solid var(--border);
        }

        .capability-tag {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-muted);
          background-color: var(--surface-secondary);
          padding: 3px 8px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border);
        }

        .capability-tag svg {
          color: var(--accent);
        }

        .design-cta-row {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          margin-top: 0.5rem;
        }

        .design-disclaimer {
          font-size: 0.78rem;
          color: var(--text-muted);
          font-style: italic;
        }
      `}</style>
    </section>
  );
}

export default Design;
