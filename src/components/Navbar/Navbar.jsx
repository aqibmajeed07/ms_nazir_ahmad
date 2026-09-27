import React, { useState, useEffect } from 'react';
import companyConfig from '../../config/company';
import Logo from '../Logo/Logo';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import Button from '../Button/Button';
import {
  Menu, X, PhoneCall, ChevronDown, Building2, Hammer, Droplets, Zap,
  Compass, ArrowRight, Image as ImageIcon
} from 'lucide-react';

const servicesList = [
  {
    title: "Private & Institutional Buildings",
    desc: "Schools, hospitals, campuses, and commercial RCC frameworks.",
    href: "#services",
    icon: Building2
  },
  {
    title: "General Civil & Structural Works",
    desc: "Reinforced concrete foundations, masonry, and retaining walls.",
    href: "#services",
    icon: Hammer
  },
  {
    title: "Drinking Water & PHE Schemes",
    desc: "HDPE/GI pipelines, reservoirs, and Jal Shakti schemes.",
    href: "#services",
    icon: Droplets
  },
  {
    title: "Electrical & Power Distribution",
    desc: "11kV/33kV HT/LT lines, substations, and transformers.",
    href: "#services",
    icon: Zap
  },
  {
    title: "CAD & Structural Drafting",
    desc: "2D AutoCAD working drawings and 3D exterior building models.",
    href: "#cad-work",
    icon: Compass
  }
];

const selectedWorksList = [
  {
    title: "Institutional Building Framework",
    desc: "RCC columns, beams, and slabs for campus facilities.",
    href: "#projects"
  },
  {
    title: "Valley River Crossing Foundations",
    desc: "Deep pier foundations and scour protection works.",
    href: "#projects"
  },
  {
    title: "Power Distribution & Overhead Lines",
    desc: "HT/LT pole erection and distribution transformers.",
    href: "#projects"
  },
  {
    title: "Multi-Storey Civil Works & Safety",
    desc: "Edge protection, staging, and structural cube testing.",
    href: "#projects"
  },
  {
    title: "Site Earthmoving & Retaining Walls",
    desc: "Slope cutting, hillside grading, and footing casting.",
    href: "#projects"
  }
];

export function Navbar({ theme, toggleTheme }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <header className={`navbar-header ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="container navbar-container">
        <Logo size="small" />

        {/* Desktop Navigation with Hover Flyout Menus */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-list">
            {companyConfig.navLinks.map((link, idx) => {
              if (link.type === 'services-dropdown') {
                return (
                  <li
                    key={idx}
                    className="nav-item-dropdown"
                    onMouseEnter={() => setActiveDropdown('services')}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <a href={link.href} className="nav-link dropdown-trigger">
                      <span>{link.label}</span>
                      <ChevronDown size={14} className="dropdown-arrow" />
                    </a>

                    {/* Services Hover Menu */}
                    <div className="dropdown-flyout services-flyout">
                      <div className="flyout-header">
                        <span className="flyout-badge">A Class Capabilities</span>
                        <h4 className="flyout-title">Total Contracting Services</h4>
                      </div>
                      <div className="flyout-items-grid">
                        {servicesList.map((srv, sIdx) => {
                          const Icon = srv.icon;
                          return (
                            <a
                              key={sIdx}
                              href={srv.href}
                              className="flyout-item"
                              onClick={() => setActiveDropdown(null)}
                            >
                              <div className="flyout-icon-box">
                                <Icon size={18} />
                              </div>
                              <div className="flyout-text">
                                <span className="flyout-item-title">{srv.title}</span>
                                <span className="flyout-item-desc">{srv.desc}</span>
                              </div>
                            </a>
                          );
                        })}
                      </div>
                      <div className="flyout-footer">
                        <a href="#services" className="flyout-footer-link" onClick={() => setActiveDropdown(null)}>
                          <span>View detailed service specifications</span>
                          <ArrowRight size={13} />
                        </a>
                      </div>
                    </div>
                  </li>
                );
              }

              if (link.type === 'projects-dropdown') {
                return (
                  <li
                    key={idx}
                    className="nav-item-dropdown"
                    onMouseEnter={() => setActiveDropdown('projects')}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <a href={link.href} className="nav-link dropdown-trigger">
                      <span>{link.label}</span>
                      <ChevronDown size={14} className="dropdown-arrow" />
                    </a>

                    {/* Selected Works Hover Menu */}
                    <div className="dropdown-flyout projects-flyout">
                      <div className="flyout-header">
                        <span className="flyout-badge">Project Showcase</span>
                        <h4 className="flyout-title">Our Work Across Kashmir</h4>
                      </div>
                      <div className="flyout-items-list">
                        {selectedWorksList.map((pw, pIdx) => (
                          <a
                            key={pIdx}
                            href={pw.href}
                            className="flyout-simple-item"
                            onClick={() => setActiveDropdown(null)}
                          >
                            <span className="flyout-item-title">{pw.title}</span>
                            <span className="flyout-item-desc">{pw.desc}</span>
                          </a>
                        ))}
                      </div>
                      <div className="flyout-footer flyout-footer-highlight">
                        <a href="#gallery" className="flyout-footer-link gold-link" onClick={() => setActiveDropdown(null)}>
                          <ImageIcon size={14} />
                          <span>Browse Full Work Gallery (16+ Site Photos)</span>
                          <ArrowRight size={13} />
                        </a>
                      </div>
                    </div>
                  </li>
                );
              }

              return (
                <li key={idx}>
                  <a href={link.href} className="nav-link">
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Desktop Actions */}
        <div className="desktop-actions">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <Button href="#contact" variant="primary" size="small" icon={PhoneCall}>
            Get in Touch
          </Button>
        </div>

        {/* Mobile Nav Toggle */}
        <div className="mobile-actions">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${mobileMenuOpen ? 'is-open' : ''}`}>
        <nav className="mobile-nav" aria-label="Mobile Navigation">
          <ul className="mobile-nav-list">
            {companyConfig.navLinks.map((link, idx) => (
              <li key={idx}>
                <a
                  href={link.href}
                  className="mobile-nav-link"
                  onClick={closeMenu}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mobile-drawer-cta">
            <Button
              href="#contact"
              variant="primary"
              size="default"
              onClick={closeMenu}
              className="w-full"
              icon={PhoneCall}
            >
              Contact Us
            </Button>
          </div>
        </nav>
      </div>

      <style>{`
        .navbar-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background-color: var(--navbar-bg);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--navbar-border);
          transition: all var(--transition-fast);
        }
        .navbar-header.is-scrolled {
          box-shadow: var(--shadow-md);
        }
        .navbar-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 68px;
        }

        /* Desktop Nav */
        .desktop-nav {
          display: none;
        }
        @media (min-width: 990px) {
          .desktop-nav {
            display: block;
          }
        }
        .nav-list {
          display: flex;
          align-items: center;
          gap: 20px;
          list-style: none;
        }
        .nav-link {
          font-family: var(--font-heading);
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-secondary);
          text-decoration: none;
          padding: 8px 4px;
          transition: color var(--transition-fast);
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .nav-link:hover {
          color: var(--accent);
        }

        /* Dropdowns */
        .nav-item-dropdown {
          position: relative;
        }
        .dropdown-trigger {
          cursor: pointer;
        }
        .dropdown-arrow {
          transition: transform 0.2s ease;
        }
        .nav-item-dropdown:hover .dropdown-arrow {
          transform: rotate(180deg);
        }

        .dropdown-flyout {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(8px);
          background-color: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.22);
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transition: opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1), transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.2s;
          z-index: 1010;
        }

        .nav-item-dropdown:hover .dropdown-flyout {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
          transform: translateX(-50%) translateY(0);
        }

        .services-flyout {
          width: 580px;
          padding: 1.25rem;
        }

        .projects-flyout {
          width: 440px;
          padding: 1.25rem;
        }

        .flyout-header {
          padding-bottom: 0.75rem;
          margin-bottom: 0.75rem;
          border-bottom: 1px solid var(--border);
        }

        .flyout-badge {
          display: inline-block;
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--accent);
          margin-bottom: 2px;
        }

        .flyout-title {
          font-size: 0.98rem;
          font-weight: 700;
          color: var(--text);
          margin: 0;
        }

        .flyout-items-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .flyout-items-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .flyout-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 8px 10px;
          border-radius: var(--radius-sm);
          text-decoration: none;
          transition: background-color var(--transition-fast);
        }

        .flyout-item:hover {
          background-color: var(--surface-secondary);
        }

        .flyout-simple-item {
          display: flex;
          flex-direction: column;
          padding: 6px 10px;
          border-radius: var(--radius-sm);
          text-decoration: none;
          transition: background-color var(--transition-fast);
        }

        .flyout-simple-item:hover {
          background-color: var(--surface-secondary);
        }

        .flyout-icon-box {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-sm);
          background-color: var(--surface-secondary);
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border: 1px solid var(--border);
        }

        .flyout-text {
          display: flex;
          flex-direction: column;
        }

        .flyout-item-title {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text);
          line-height: 1.3;
        }

        .flyout-item:hover .flyout-item-title,
        .flyout-simple-item:hover .flyout-item-title {
          color: var(--accent);
        }

        .flyout-item-desc {
          font-size: 0.74rem;
          color: var(--text-muted);
          line-height: 1.4;
          margin-top: 2px;
        }

        .flyout-footer {
          margin-top: 0.85rem;
          padding-top: 0.75rem;
          border-top: 1px solid var(--border);
        }

        .flyout-footer-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-muted);
          text-decoration: none;
          transition: color var(--transition-fast);
        }

        .flyout-footer-link:hover {
          color: var(--accent);
        }

        .gold-link {
          color: var(--accent);
          font-weight: 700;
        }

        /* Actions */
        .desktop-actions {
          display: none;
          align-items: center;
          gap: 12px;
        }
        @media (min-width: 990px) {
          .desktop-actions {
            display: flex;
          }
        }

        /* Mobile controls */
        .mobile-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        @media (min-width: 990px) {
          .mobile-actions {
            display: none;
          }
        }
        .mobile-menu-btn {
          width: 38px;
          height: 38px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border);
          background-color: var(--surface-secondary);
          color: var(--text);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        /* Mobile Drawer */
        .mobile-drawer {
          position: fixed;
          top: 68px;
          left: 0;
          right: 0;
          height: calc(100vh - 68px);
          background-color: var(--background);
          transform: translateY(-100%);
          opacity: 0;
          pointer-events: none;
          transition: transform 0.25s ease-out, opacity 0.25s ease-out;
          overflow-y: auto;
          padding: 24px 20px 40px 20px;
          border-bottom: 1px solid var(--border);
          box-shadow: var(--shadow-xl);
          z-index: 9999;
        }
        .mobile-drawer.is-open {
          transform: translateY(0);
          opacity: 1;
          pointer-events: auto;
        }
        @media (min-width: 990px) {
          .mobile-drawer {
            display: none;
          }
        }
        .mobile-nav-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .mobile-nav-link {
          display: block;
          font-family: var(--font-heading);
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text);
          padding: 10px 0;
          border-bottom: 1px solid var(--border-subtle);
          text-decoration: none;
        }
        .mobile-nav-link:hover {
          color: var(--accent);
        }
        .mobile-drawer-cta {
          margin-top: 24px;
        }
        .w-full {
          width: 100%;
        }
      `}</style>
    </header>
  );
}

export default Navbar;
