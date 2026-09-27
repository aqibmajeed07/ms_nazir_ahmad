import React, { useState } from 'react';
import companyConfig from '../../config/company';
import SectionHeading from '../../components/SectionHeading/SectionHeading';
import Button from '../../components/Button/Button';
import {
  FileText, Award, ShieldCheck, FileCheck, Building,
  Download, Eye, ExternalLink, X, CheckCircle2, AlertCircle
} from 'lucide-react';

const iconMap = {
  FileText: FileText,
  Award: Award,
  ShieldCheck: ShieldCheck,
  FileCheck: FileCheck,
  Building: Building
};

export function Documents() {
  const [activeModalDoc, setActiveModalDoc] = useState(null);

  const openViewer = (doc) => {
    setActiveModalDoc(doc);
    document.body.style.overflow = 'hidden';
  };

  const closeViewer = () => {
    setActiveModalDoc(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="documents" className="section bg-grid documents-section" aria-label="Company Documents & Credentials">
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <SectionHeading
          badge="Verified Credentials"
          title="Company Documents & Registrations"
          subtitle="Official registrations, statutory certifications, and company capability profile verified by Jammu & Kashmir authorities and the Government of India."
        />

        <div className="documents-grid">
          {companyConfig.documents.map((doc) => {
            const IconComponent = iconMap[doc.icon] || FileText;
            const isFeatured = doc.highlight;

            return (
              <div
                key={doc.id}
                className={`document-card ${isFeatured ? 'is-featured' : ''}`}
              >
                <div className="doc-card-header">
                  <div className="doc-icon-wrap">
                    <IconComponent size={22} className="doc-icon" />
                  </div>
                  <div className="doc-category-badge">
                    {doc.category}
                  </div>
                </div>

                <div className="doc-card-body">
                  <h3 className="doc-title">{doc.title}</h3>
                  <p className="doc-desc">{doc.description}</p>

                  <div className="doc-meta-list">
                    {doc.regNo && (
                      <div className="doc-meta-item">
                        <span className="meta-label">Identifier:</span>
                        <code className="meta-value meta-mono">{doc.regNo}</code>
                      </div>
                    )}
                    <div className="doc-meta-item">
                      <span className="meta-label">Authority:</span>
                      <span className="meta-value">{doc.department}</span>
                    </div>
                    <div className="doc-meta-item">
                      <span className="meta-label">Validity / Standing:</span>
                      <span className="meta-value meta-validity">
                        <CheckCircle2 size={13} className="validity-icon" />
                        {doc.validity}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="doc-card-actions">
                  <button
                    type="button"
                    onClick={() => openViewer(doc)}
                    className="doc-action-btn btn-view"
                    aria-label={`View ${doc.title}`}
                  >
                    <Eye size={15} />
                    <span>View Document</span>
                  </button>

                  <a
                    href={doc.path}
                    download={doc.fileName}
                    className="doc-action-btn btn-download"
                    aria-label={`Download ${doc.title} PDF`}
                  >
                    <Download size={15} />
                    <span>Download PDF</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Strategic Notice / Tendering Information Bar */}
        <div className="documents-notice-bar">
          <div className="notice-left">
            <ShieldCheck size={20} className="notice-icon" />
            <div className="notice-text">
              <strong>Statutory Compliance &amp; Tender Pre-Qualification:</strong> All documents above are verified active credentials for central, state, and private infrastructure tendering.
            </div>
          </div>
          <div className="notice-right">
            <a
              href="https://jkpwdoms.jk.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="portal-link-btn"
            >
              Verify on PWDOMS <ExternalLink size={13} />
            </a>
          </div>
        </div>
      </div>

      {/* Lightweight Accessible PDF Viewer Modal */}
      {activeModalDoc && (
        <div className="pdf-modal-backdrop" onClick={closeViewer} role="dialog" aria-modal="true">
          <div className="pdf-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="pdf-modal-header">
              <div className="pdf-modal-title-group">
                <FileText size={18} className="modal-title-icon" />
                <div>
                  <h4 className="modal-doc-title">{activeModalDoc.title}</h4>
                  <span className="modal-doc-sub">{activeModalDoc.department} · {activeModalDoc.fileSize}</span>
                </div>
              </div>

              <div className="pdf-modal-controls">
                <a
                  href={activeModalDoc.path}
                  download={activeModalDoc.fileName}
                  className="modal-action-btn"
                  title="Download PDF"
                >
                  <Download size={15} />
                  <span>Download</span>
                </a>
                <a
                  href={activeModalDoc.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-action-btn"
                  title="Open in new window"
                >
                  <ExternalLink size={15} />
                  <span>Open Fullscreen</span>
                </a>
                <button
                  type="button"
                  onClick={closeViewer}
                  className="modal-close-btn"
                  aria-label="Close document viewer"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="pdf-modal-body">
              <iframe
                src={`${activeModalDoc.path}#toolbar=1&navpanes=0`}
                title={activeModalDoc.title}
                className="pdf-iframe"
              />
              <div className="pdf-mobile-fallback">
                <p>Mobile browsers may restrict inline PDF preview.</p>
                <div className="fallback-buttons">
                  <a
                    href={activeModalDoc.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fallback-btn"
                  >
                    <ExternalLink size={14} /> Open in New Tab
                  </a>
                  <a
                    href={activeModalDoc.path}
                    download={activeModalDoc.fileName}
                    className="fallback-btn fallback-download"
                  >
                    <Download size={14} /> Direct Download
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .documents-section {
          padding-top: 80px;
          padding-bottom: 90px;
          position: relative;
        }

        .documents-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          margin-top: 36px;
        }

        @media (min-width: 680px) {
          .documents-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1080px) {
          .documents-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .document-card {
          background-color: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: transform var(--transition-fast), border-color var(--transition-fast), box-shadow var(--transition-fast);
          position: relative;
        }

        .document-card:hover {
          transform: translateY(-3px);
          border-color: var(--accent);
          box-shadow: 0 8px 28px rgba(0, 0, 0, 0.12);
        }

        .document-card.is-featured {
          border-color: rgba(197, 155, 39, 0.5);
          background: linear-gradient(180deg, var(--surface) 0%, var(--surface-secondary) 100%);
          box-shadow: 0 4px 20px rgba(197, 155, 39, 0.08);
        }

        .doc-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 18px;
        }

        .doc-icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-sm);
          background-color: var(--surface-secondary);
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--border);
        }

        .is-featured .doc-icon-wrap {
          border-color: rgba(197, 155, 39, 0.35);
          background-color: rgba(197, 155, 39, 0.12);
        }

        .doc-category-badge {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.6px;
          padding: 4px 10px;
          border-radius: var(--radius-full);
          background-color: var(--surface-secondary);
          color: var(--accent);
          border: 1px solid var(--border);
        }

        .is-featured .doc-category-badge {
          background-color: rgba(197, 155, 39, 0.18);
          border-color: rgba(197, 155, 39, 0.4);
        }

        .doc-card-body {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .doc-title {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 8px;
          line-height: 1.3;
        }

        .doc-desc {
          font-size: 0.86rem;
          color: var(--text-muted);
          line-height: 1.55;
          margin-bottom: 18px;
          flex: 1;
        }

        .doc-meta-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding-top: 14px;
          border-top: 1px solid var(--border);
          margin-bottom: 20px;
        }

        .doc-meta-item {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          font-size: 0.78rem;
          gap: 8px;
        }

        .meta-label {
          color: var(--text-muted);
          font-weight: 500;
          flex-shrink: 0;
        }

        .meta-value {
          color: var(--text);
          font-weight: 600;
          text-align: right;
          word-break: break-all;
        }

        .meta-mono {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: var(--accent);
        }

        .meta-validity {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          color: #22C55E;
        }

        .validity-icon {
          flex-shrink: 0;
        }

        .doc-card-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .doc-action-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 10px 14px;
          border-radius: var(--radius-sm);
          font-size: 0.82rem;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .btn-view {
          background-color: var(--surface-secondary);
          color: var(--text);
          border: 1px solid var(--border);
        }

        .btn-view:hover {
          background-color: var(--accent);
          color: #07131D;
          border-color: var(--accent);
        }

        .btn-download {
          background-color: rgba(197, 155, 39, 0.12);
          color: var(--accent);
          border: 1px solid rgba(197, 155, 39, 0.35);
        }

        .btn-download:hover {
          background-color: var(--accent);
          color: #07131D;
          border-color: var(--accent);
        }

        /* Notice Bar */
        .documents-notice-bar {
          margin-top: 36px;
          background-color: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 18px 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          align-items: center;
          justify-content: space-between;
        }

        @media (min-width: 768px) {
          .documents-notice-bar {
            flex-direction: row;
          }
        }

        .notice-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .notice-icon {
          color: var(--accent);
          flex-shrink: 0;
        }

        .notice-text {
          font-size: 0.88rem;
          color: var(--text-muted);
          line-height: 1.45;
        }

        .notice-text strong {
          color: var(--text);
        }

        .portal-link-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border-radius: var(--radius-sm);
          background-color: var(--surface-secondary);
          border: 1px solid var(--border);
          color: var(--accent);
          font-size: 0.82rem;
          font-weight: 700;
          text-decoration: none;
          white-space: nowrap;
          transition: all var(--transition-fast);
        }

        .portal-link-btn:hover {
          border-color: var(--accent);
          background-color: rgba(197, 155, 39, 0.1);
        }

        /* ==========================================================================
           MODAL VIEWER
           ========================================================================== */
        .pdf-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background-color: rgba(0, 0, 0, 0.82);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: modalFadeIn 0.2s ease-out;
        }

        .pdf-modal-dialog {
          background-color: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          width: 100%;
          max-width: 960px;
          height: 88vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
          animation: modalScaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .pdf-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 20px;
          border-bottom: 1px solid var(--border);
          background-color: var(--surface-secondary);
          flex-shrink: 0;
          gap: 12px;
        }

        .pdf-modal-title-group {
          display: flex;
          align-items: center;
          gap: 12px;
          overflow: hidden;
        }

        .modal-title-icon {
          color: var(--accent);
          flex-shrink: 0;
        }

        .modal-doc-title {
          font-family: var(--font-heading);
          font-size: 1rem;
          font-weight: 700;
          color: var(--text);
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .modal-doc-sub {
          font-size: 0.76rem;
          color: var(--text-muted);
          display: block;
        }

        .pdf-modal-controls {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }

        .modal-action-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: var(--radius-sm);
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text);
          background-color: var(--surface);
          border: 1px solid var(--border);
          text-decoration: none;
          transition: all var(--transition-fast);
        }

        .modal-action-btn:hover {
          color: var(--accent);
          border-color: var(--accent);
        }

        .modal-close-btn {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: 1px solid var(--border);
          color: var(--text-muted);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .modal-close-btn:hover {
          color: #EF4444;
          border-color: #EF4444;
          background-color: rgba(239, 68, 68, 0.1);
        }

        .pdf-modal-body {
          flex: 1;
          background-color: #1A232E;
          position: relative;
          display: flex;
          flex-direction: column;
        }

        .pdf-iframe {
          width: 100%;
          height: 100%;
          border: none;
          flex: 1;
        }

        .pdf-mobile-fallback {
          display: none;
          padding: 16px;
          text-align: center;
          background-color: var(--surface);
          border-top: 1px solid var(--border);
          font-size: 0.82rem;
          color: var(--text-muted);
        }

        .fallback-buttons {
          display: flex;
          gap: 12px;
          justify-content: center;
          margin-top: 8px;
        }

        .fallback-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          border-radius: var(--radius-sm);
          font-size: 0.82rem;
          font-weight: 600;
          background-color: var(--surface-secondary);
          color: var(--text);
          border: 1px solid var(--border);
          text-decoration: none;
        }

        .fallback-download {
          background-color: var(--accent);
          color: #07131D;
          border-color: var(--accent);
        }

        @media (max-width: 768px) {
          .pdf-modal-dialog {
            height: 94vh;
          }
          .modal-action-btn span {
            display: none;
          }
          .pdf-mobile-fallback {
            display: block;
          }
        }

        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes modalScaleUp {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </section>
  );
}

export default Documents;
