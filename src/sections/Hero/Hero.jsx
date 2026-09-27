import React from 'react';
import companyConfig from '../../config/company';
import Button from '../../components/Button/Button';
import { ArrowRight, PhoneCall, ChevronDown, Download } from 'lucide-react';

export function Hero() {
  return (
    <section id="hero" className="hero-section" aria-label="Hero Introduction">
      {/* Background Image with Cinematic Overlay & Architectural Texture */}
      <div className="hero-bg-wrap">
        <img
          src="/images/cover_fullbleed.png"
          alt="Jammu and Kashmir Civil Engineering Infrastructure"
          className="hero-bg-img"
        />
        <div className="hero-overlay" />
        <div className="hero-grid-overlay" />
      </div>

      <div className="container hero-container">
        <div className="hero-content">
          {/* Company Logo */}
          <div className="hero-logo-wrap">
            <img 
              src={companyConfig.logoImage} 
              alt={`${companyConfig.companyName} Logo`} 
              className="hero-logo-img" 
            />
          </div>

          {/* Eyebrow Badge */}
          <div className="hero-badge-wrap">
            <span className="hero-pill-badge">
              <span className="badge-glow-dot" />
              {companyConfig.contractorClass} · JAMMU &amp; KASHMIR
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="hero-title">
            Building with experience.<br />
            Delivering with confidence.
          </h1>

          {/* Subtitle / Company Description */}
          <p className="hero-subtext">
            {companyConfig.companyName} is an A Class registered contractor delivering civil construction, private and institutional buildings, Jal Shakti drinking water schemes, and power distribution across Jammu &amp; Kashmir.
          </p>

          {/* Primary, Secondary, and Brochure Call to Actions */}
          <div className="hero-actions">
            <Button href="#projects" variant="primary" size="large" icon={ArrowRight} className="hero-btn-primary">
              View Selected Works
            </Button>
            <Button href="#contact" variant="outline-white" size="large" icon={PhoneCall} className="hero-btn-secondary">
              Request Consultation
            </Button>
            <a
              href="/documents/company-brochure.pdf"
              download="MS-Nazir-Ahmad-Mir-Brochure.pdf"
              className="hero-btn-brochure"
              aria-label="Download official company brochure"
            >
              <Download size={16} />
              <span>Brochure</span>
            </a>
          </div>

          {/* Verified Key Metrics Grid */}
          <div className="hero-metrics-grid" role="region" aria-label="Company Key Metrics">
            <div className="hero-metric-card">
              <span className="metric-number">{companyConfig.experienceYears}</span>
              <span className="metric-label">Years Field Experience</span>
            </div>
            <div className="hero-metric-card">
              <span className="metric-number">Class A</span>
              <span className="metric-label">PWD &amp; Jal Shakti Grade</span>
            </div>
            <div className="hero-metric-card">
              <span className="metric-number">{companyConfig.projectCount}</span>
              <span className="metric-label">Completed Works</span>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <a href="#about" className="scroll-indicator" aria-label="Scroll to about section">
        <ChevronDown size={20} className="scroll-arrow" />
      </a>

      <style>{`
        /* ==========================================================================
           HERO SECTION & CINEMATIC BACKGROUND
           ========================================================================== */
        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding-top: 130px;
          padding-bottom: 90px;
          overflow: hidden;
          background-color: #07131D;
        }

        .hero-bg-wrap {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
        }

        .hero-bg-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 30%;
          filter: brightness(0.68) saturate(1.1);
          animation: heroBgZoom 1.4s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(7, 19, 29, 0.72) 0%,
            rgba(7, 19, 29, 0.88) 55%,
            rgba(7, 19, 29, 0.98) 100%
          );
        }

        .hero-grid-overlay {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(to right, rgba(197, 155, 39, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(197, 155, 39, 0.04) 1px, transparent 1px);
          background-size: 50px 50px;
          pointer-events: none;
        }

        .hero-container {
          position: relative;
          z-index: 1;
        }

        /* ==========================================================================
           CLEAN, SPACIOUS HERO CONTENT
           ========================================================================== */
        .hero-content {
          max-width: 820px;
        }

        .hero-logo-wrap {
          margin-bottom: 20px;
          animation: heroFadeSlideDown 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.05s both;
        }

        .hero-logo-img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid rgba(197, 155, 39, 0.5);
          box-shadow: 0 4px 24px rgba(197, 155, 39, 0.2), 0 0 40px rgba(197, 155, 39, 0.06);
        }

        .hero-badge-wrap {
          margin-bottom: 24px;
          animation: heroFadeSlideDown 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both;
        }

        .hero-pill-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px;
          border-radius: var(--radius-full);
          background-color: rgba(197, 155, 39, 0.14);
          border: 1px solid rgba(197, 155, 39, 0.45);
          color: #F8D882;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          backdrop-filter: blur(8px);
        }

        .badge-glow-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: #22C55E;
          box-shadow: 0 0 8px #22C55E;
        }

        .hero-title {
          font-family: var(--font-heading);
          font-size: clamp(2.5rem, 5.8vw, 4.25rem);
          font-weight: 800;
          color: #FFFFFF;
          line-height: 1.1;
          letter-spacing: -0.025em;
          margin-bottom: 24px;
          text-shadow: 0 2px 12px rgba(0, 0, 0, 0.45);
          animation: heroFadeSlideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.28s both;
        }

        .hero-subtext {
          font-size: clamp(1.05rem, 2vw, 1.25rem);
          color: rgba(240, 244, 248, 0.88);
          line-height: 1.68;
          margin-bottom: 38px;
          max-width: 720px;
          font-weight: 400;
          animation: heroFadeSlideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.42s both;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 54px;
          animation: heroFadeSlideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.56s both;
        }

        .hero-btn-primary {
          box-shadow: 0 4px 18px rgba(197, 155, 39, 0.35);
        }

        .hero-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 22px rgba(197, 155, 39, 0.5);
        }

        .hero-btn-secondary:hover {
          transform: translateY(-2px);
          background-color: rgba(255, 255, 255, 0.12);
        }

        .hero-btn-brochure {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 22px;
          border-radius: var(--radius-sm);
          font-size: 0.95rem;
          font-weight: 600;
          color: #F8D882;
          background-color: rgba(197, 155, 39, 0.15);
          border: 1px solid rgba(197, 155, 39, 0.42);
          text-decoration: none;
          backdrop-filter: blur(8px);
          transition: all var(--transition-fast);
        }

        .hero-btn-brochure:hover {
          background-color: rgba(197, 155, 39, 0.32);
          border-color: var(--accent);
          transform: translateY(-2px);
          color: #FFFFFF;
          box-shadow: 0 4px 16px rgba(197, 155, 39, 0.25);
        }

        /* Verified Metrics Grid */
        .hero-metrics-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
          padding-top: 30px;
          border-top: 1px solid rgba(255, 255, 255, 0.16);
          max-width: 680px;
          animation: heroFadeSlideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.7s both;
        }

        @media (max-width: 640px) {
          .hero-section {
            padding-top: 110px;
            padding-bottom: 70px;
          }
          .hero-metrics-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }

        .hero-metric-card {
          display: flex;
          flex-direction: column;
        }

        .metric-number {
          font-family: var(--font-heading);
          font-size: clamp(1.6rem, 2.8vw, 2.3rem);
          font-weight: 800;
          color: #E2B842;
          line-height: 1.1;
          letter-spacing: -0.01em;
        }

        .metric-label {
          font-size: 0.78rem;
          color: rgba(226, 232, 240, 0.78);
          text-transform: uppercase;
          letter-spacing: 0.6px;
          margin-top: 5px;
          font-weight: 600;
        }

        /* ==========================================================================
           SCROLL INDICATOR
           ========================================================================== */
        .scroll-indicator {
          position: absolute;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
          color: rgba(255, 255, 255, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: var(--radius-full);
          border: 1px solid rgba(255, 255, 255, 0.25);
          background-color: rgba(11, 20, 30, 0.4);
          backdrop-filter: blur(6px);
          transition: all var(--transition-fast);
        }

        .scroll-indicator:hover {
          color: #FFFFFF;
          border-color: rgba(197, 155, 39, 0.8);
          background-color: rgba(197, 155, 39, 0.15);
          transform: translateX(-50%) translateY(3px);
        }

        .scroll-arrow {
          animation: heroScrollBounce 2.2s infinite;
        }

        /* ==========================================================================
           KEYFRAME ANIMATIONS & STAGGERED ENTRANCES
           ========================================================================== */
        @keyframes heroFadeSlideDown {
          from {
            opacity: 0;
            transform: translateY(-16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes heroFadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(22px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes heroBgZoom {
          from {
            opacity: 0.35;
            transform: scale(1.05);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes heroScrollBounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(6px);
          }
          60% {
            transform: translateY(3px);
          }
        }

        /* ==========================================================================
           REDUCED MOTION ACCESSIBILITY COMPLIANCE
           ========================================================================== */
        @media (prefers-reduced-motion: reduce) {
          .hero-bg-img,
          .hero-badge-wrap,
          .hero-title,
          .hero-subtext,
          .hero-actions,
          .hero-metrics-grid,
          .scroll-arrow {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}

export default Hero;
