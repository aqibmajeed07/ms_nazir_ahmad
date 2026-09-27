import React, { useState } from 'react';
import galleryItems from '../../data/gallery';
import SectionHeading from '../../components/SectionHeading/SectionHeading';
import Lightbox from '../../components/Lightbox/Lightbox';
import { Maximize2, MapPin } from 'lucide-react';

const categories = [
  "All Works",
  "Building Works",
  "Civil Construction",
  "PHE & Water Networks",
  "Electrical Distribution",
  "CAD & Drafting"
];

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All Works");
  const [lightboxState, setLightboxState] = useState({
    isOpen: false,
    index: 0
  });

  const filteredItems = activeCategory === "All Works"
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  const imagesList = filteredItems.map(item => item.image);

  const openLightbox = (index) => {
    setLightboxState({ isOpen: true, index });
  };

  const closeLightbox = () => {
    setLightboxState(prev => ({ ...prev, isOpen: false }));
  };

  const handleIndexChange = (newIndex) => {
    setLightboxState(prev => ({ ...prev, index: newIndex }));
  };

  const currentItem = filteredItems[lightboxState.index] || {};

  return (
    <section id="gallery" className="gallery-section">
      <div className="container">
        <div className="gallery-header-wrap">
          <SectionHeading
            badge="Complete Works Portfolio"
            title="Our Complete Work Gallery"
            subtitle="Explore our complete photo archive of ongoing and completed contracts, civil foundations, water networks, and CAD drafting across Jammu & Kashmir."
          />

          {/* Category Filter Tabs */}
          <div className="gallery-filter-tabs" role="tablist" aria-label="Filter gallery works">
            {categories.map((cat, idx) => {
              const count = cat === "All Works"
                ? galleryItems.length
                : galleryItems.filter(i => i.category === cat).length;

              return (
                <button
                  key={idx}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`gallery-filter-btn ${activeCategory === cat ? 'is-active' : ''}`}
                >
                  <span>{cat}</span>
                  <span className="tab-count">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="gallery-card"
              onClick={() => openLightbox(index)}
              role="button"
              tabIndex={0}
              aria-label={`View ${item.title}`}
              onKeyDown={(e) => { if (e.key === 'Enter') openLightbox(index); }}
            >
              <div className="gallery-img-wrap">
                <img
                  src={item.image}
                  alt={item.title}
                  className="gallery-img"
                  loading="lazy"
                />
                <div className="gallery-card-overlay">
                  <div className="gallery-zoom-icon">
                    <Maximize2 size={18} />
                  </div>
                </div>
                <div className="gallery-category-pill">{item.category}</div>
              </div>

              <div className="gallery-card-content">
                <div className="gallery-location">
                  <MapPin size={13} className="loc-icon" />
                  <span>{item.location}</span>
                </div>
                <h3 className="gallery-card-title">{item.title}</h3>
                <p className="gallery-card-desc">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        isOpen={lightboxState.isOpen}
        onClose={closeLightbox}
        images={imagesList}
        currentIndex={lightboxState.index}
        onIndexChange={handleIndexChange}
        title={currentItem.title}
        category={currentItem.category}
      />

      <style>{`
        .gallery-section {
          padding: var(--section-padding) 0;
          background-color: var(--surface);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          position: relative;
        }

        .gallery-header-wrap {
          margin-bottom: 2.5rem;
        }

        .gallery-filter-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: -10px;
        }

        .gallery-filter-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: var(--radius-full);
          border: 1px solid var(--border);
          background-color: var(--background);
          color: var(--text-muted);
          font-family: var(--font-heading);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .gallery-filter-btn:hover {
          border-color: var(--accent);
          color: var(--text);
        }

        .gallery-filter-btn.is-active {
          background-color: var(--accent);
          color: #0f2537;
          border-color: var(--accent);
          box-shadow: var(--shadow-sm);
        }

        .tab-count {
          font-size: 0.72rem;
          font-weight: 700;
          background: rgba(0, 0, 0, 0.12);
          padding: 1px 6px;
          border-radius: var(--radius-full);
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        @media (min-width: 640px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .gallery-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 1.25rem;
          }
        }

        .gallery-card {
          background-color: var(--background);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          cursor: pointer;
          box-shadow: var(--shadow-sm);
          transition: transform var(--transition-fast), border-color var(--transition-fast), box-shadow var(--transition-fast);
        }

        .gallery-card:hover {
          transform: translateY(-4px);
          border-color: var(--accent);
          box-shadow: var(--shadow-md);
        }

        .gallery-img-wrap {
          position: relative;
          width: 100%;
          height: 190px;
          overflow: hidden;
          background-color: var(--surface-secondary);
        }

        .gallery-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform var(--transition-slow);
        }

        .gallery-card:hover .gallery-img {
          transform: scale(1.06);
        }

        .gallery-card-overlay {
          position: absolute;
          inset: 0;
          background: rgba(15, 37, 55, 0.4);
          opacity: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity var(--transition-fast);
        }

        .gallery-card:hover .gallery-card-overlay {
          opacity: 1;
        }

        .gallery-zoom-icon {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background-color: rgba(15, 37, 55, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: scale(0.85);
          transition: transform var(--transition-fast);
        }

        .gallery-card:hover .gallery-zoom-icon {
          transform: scale(1);
        }

        .gallery-category-pill {
          position: absolute;
          top: 10px;
          left: 10px;
          background-color: rgba(15, 37, 55, 0.85);
          backdrop-filter: blur(4px);
          color: #ffffff;
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          padding: 3px 8px;
          border-radius: var(--radius-sm);
          border: 1px solid rgba(197, 155, 39, 0.4);
        }

        .gallery-card-content {
          padding: 1.15rem 1rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .gallery-location {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--accent);
          margin-bottom: 0.35rem;
        }

        .loc-icon {
          color: var(--accent);
        }

        .gallery-card-title {
          font-size: 0.98rem;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 0.45rem;
          line-height: 1.35;
        }

        .gallery-card-desc {
          font-size: 0.8rem;
          color: var(--text-muted);
          line-height: 1.45;
          margin: 0;
          flex-grow: 1;
        }
      `}</style>
    </section>
  );
}

export default Gallery;
