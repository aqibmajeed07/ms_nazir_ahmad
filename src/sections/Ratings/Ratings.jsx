import React from 'react';
import ratingsData from '../../data/ratings';
import SectionHeading from '../../components/SectionHeading/SectionHeading';
import { Star, ShieldCheck, MapPin, Quote } from 'lucide-react';

export function Ratings() {
  return (
    <section id="ratings" className="ratings-section">
      <div className="container">
        <div className="ratings-header-row">
          <SectionHeading
            badge="Client Feedback"
            title="Trusted by Clients Across Kashmir"
            subtitle="Straightforward reviews from private developers, institutional trustees, and resident engineers who have worked with us on the ground."
          />

          {/* Average Rating Scorecard */}
          <div className="overall-scorecard">
            <div className="score-top">
              <span className="score-num">4.9</span>
              <div className="stars-row">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="star-filled" fill="#c59b27" />
                ))}
              </div>
            </div>
            <div className="score-bottom">
              <span className="score-label">100% Client Satisfaction</span>
              <span className="score-sub">15+ Completed Works in J&amp;K</span>
            </div>
          </div>
        </div>

        {/* Ratings Grid */}
        <div className="ratings-grid">
          {ratingsData.map((rev) => (
            <div key={rev.id} className="rating-card">
              <div className="card-top">
                <div className="stars-row">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={16} className="star-filled" fill="#c59b27" />
                  ))}
                </div>
                <div className="verified-badge">
                  <ShieldCheck size={14} className="verified-icon" />
                  <span>Verified Client</span>
                </div>
              </div>

              <div className="quote-wrap">
                <Quote size={20} className="quote-icon" />
                <p className="review-text">{rev.review}</p>
              </div>

              <div className="project-context-tag">
                <span>Scope: <strong>{rev.projectContext}</strong></span>
              </div>

              <div className="client-info-wrap">
                <div className="client-avatar">
                  {rev.clientName.charAt(0)}
                </div>
                <div>
                  <h4 className="client-name">{rev.clientName}</h4>
                  <div className="client-meta">
                    <span>{rev.designation}</span>
                    <span className="meta-sep">•</span>
                    <span className="client-loc"><MapPin size={12} /> {rev.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .ratings-section {
          padding: var(--section-padding) 0;
          background-color: var(--surface);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          position: relative;
        }

        .ratings-header-row {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }

        @media (min-width: 900px) {
          .ratings-header-row {
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-end;
          }
        }

        .overall-scorecard {
          background-color: var(--background);
          border: 1px solid var(--border);
          border-left: 4px solid var(--accent);
          border-radius: var(--radius-sm);
          padding: 1.25rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          box-shadow: var(--shadow-sm);
          width: fit-content;
        }

        .score-top {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .score-num {
          font-family: var(--font-heading);
          font-size: 2.2rem;
          font-weight: 800;
          color: var(--text);
          line-height: 1;
        }

        .stars-row {
          display: flex;
          gap: 3px;
        }

        .star-filled {
          color: var(--accent);
        }

        .score-bottom {
          display: flex;
          flex-direction: column;
          font-size: 0.78rem;
        }

        .score-label {
          font-weight: 700;
          color: var(--accent);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .score-sub {
          color: var(--text-muted);
        }

        .ratings-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        @media (min-width: 640px) {
          .ratings-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .ratings-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .rating-card {
          background-color: var(--background);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 1.75rem 1.5rem;
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-sm);
          transition: transform var(--transition-fast), border-color var(--transition-fast), box-shadow var(--transition-fast);
        }

        .rating-card:hover {
          transform: translateY(-3px);
          border-color: var(--accent);
          box-shadow: var(--shadow-md);
        }

        .card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .verified-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.72rem;
          font-weight: 700;
          color: #22c55e;
          background-color: rgba(34, 197, 94, 0.1);
          padding: 3px 8px;
          border-radius: var(--radius-sm);
        }

        .quote-wrap {
          position: relative;
          margin-bottom: 1.25rem;
          flex-grow: 1;
        }

        .quote-icon {
          color: var(--accent);
          opacity: 0.4;
          margin-bottom: 0.5rem;
        }

        .review-text {
          font-size: 0.92rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin: 0;
          font-style: italic;
        }

        .project-context-tag {
          font-size: 0.78rem;
          color: var(--text-secondary);
          background-color: var(--surface-secondary);
          padding: 6px 10px;
          border-radius: var(--radius-sm);
          margin-bottom: 1.25rem;
          border-left: 2px solid var(--accent);
        }

        .client-info-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-top: 1rem;
          border-top: 1px solid var(--border);
        }

        .client-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--accent) 0%, #0f2537 100%);
          color: #ffffff;
          font-family: var(--font-heading);
          font-size: 1.1rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .client-name {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text);
          margin: 0 0 2px 0;
        }

        .client-meta {
          font-size: 0.76rem;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 5px;
          flex-wrap: wrap;
        }

        .meta-sep {
          opacity: 0.5;
        }

        .client-loc {
          display: inline-flex;
          align-items: center;
          gap: 3px;
        }
      `}</style>
    </section>
  );
}

export default Ratings;
