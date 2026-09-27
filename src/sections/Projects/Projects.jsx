import React, { useState } from 'react';
import projectsData from '../../data/projects';
import SectionHeading from '../../components/SectionHeading/SectionHeading';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import companyConfig from '../../config/company';

const filterCategories = [
  "All Projects",
  "Building Works",
  "Civil Construction",
  "Electrical Distribution",
  "Design Support"
];

export function Projects() {
  const [activeFilter, setActiveFilter] = useState("All Projects");

  const filteredProjects = activeFilter === "All Projects"
    ? projectsData
    : projectsData.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="section section-subtle">
      <div className="watermark" style={{ top: '8%', right: '3%' }}>
        WORKS
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="projects-header-wrap">
          <SectionHeading
            badge="Project Gallery"
            title="Selected Works Across Jammu & Kashmir"
            description={`With ${companyConfig.projectsLabel}, our track record covers institutional building frameworks, valley pipeline alignments, mass concrete retaining works, and rural power distribution.`}
          />

          {/* Category Filter Pills */}
          <div className="project-filter-pills" role="tablist" aria-label="Filter projects by category">
            {filterCategories.map((cat, idx) => (
              <button
                key={idx}
                type="button"
                role="tab"
                aria-selected={activeFilter === cat}
                onClick={() => setActiveFilter(cat)}
                className={`filter-pill ${activeFilter === cat ? 'is-active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Neutral Realistic Note */}
        <div className="projects-bottom-note">
          <span className="note-dot"></span>
          <span>
            Project photographs represent active and completed civil, institutional, and power contracts executed across the Kashmir division.
          </span>
        </div>
      </div>

      <style>{`
        .projects-header-wrap {
          margin-bottom: 32px;
        }
        .project-filter-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: -16px;
          margin-bottom: 32px;
        }
        .filter-pill {
          padding: 6px 16px;
          font-family: var(--font-heading);
          font-size: 0.8rem;
          font-weight: 700;
          border-radius: var(--radius-full);
          border: 1px solid var(--border);
          background-color: var(--surface);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .filter-pill:hover {
          border-color: var(--border-gold);
          color: var(--text);
        }
        .filter-pill.is-active {
          background-color: var(--accent);
          color: #0F2537;
          border-color: var(--accent);
          box-shadow: var(--shadow-sm);
        }
        .projects-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }
        @media (min-width: 640px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .projects-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        .projects-bottom-note {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 36px;
          padding-top: 20px;
          border-top: 1px solid var(--border);
          font-size: 0.82rem;
          color: var(--text-muted);
        }
        .note-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--accent);
          flex-shrink: 0;
        }
      `}</style>
    </section>
  );
}

export default Projects;
