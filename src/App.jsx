import React from 'react';
import useTheme from './hooks/useTheme';
import Navbar from './components/Navbar/Navbar';
import Hero from './sections/Hero/Hero';
import About from './sections/About/About';
import Approach from './sections/Approach/Approach';
import Services from './sections/Services/Services';
import Projects from './sections/Projects/Projects';
import Gallery from './sections/Gallery/Gallery';
import Design from './sections/Design/Design';
import Ratings from './sections/Ratings/Ratings';
import WhyUs from './sections/WhyUs/WhyUs';
import Documents from './sections/Documents/Documents';
import CTA from './sections/CTA/CTA';
import Contact from './sections/Contact/Contact';
import Newsletter from './components/Newsletter/Newsletter';
import FloatingWhatsApp from './components/FloatingWhatsApp/FloatingWhatsApp';
import Footer from './components/Footer/Footer';

export function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="app-root">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main id="main-content">
        <Hero />
        <About />
        <Approach />
        <Services />
        <Projects />
        <Gallery />
        <Design theme={theme} />
        <Ratings />
        <WhyUs />
        <Documents />
        <CTA />
        <Contact />
        <section className="newsletter-wrapper-section">
          <div className="container">
            <Newsletter />
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />

      <style>{`
        .newsletter-wrapper-section {
          padding: 2.5rem 0 4.5rem 0;
          background-color: var(--surface);
          border-top: 1px solid var(--border);
        }
      `}</style>
    </div>
  );
}

export default App;
