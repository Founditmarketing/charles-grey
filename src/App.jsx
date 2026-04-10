import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import ScrollToTop from './components/ScrollToTop';
import { Nav } from './components/Header';
import { Footer } from './components/Gallery';
import { FloatingChat } from './components/FloatingChat';

import { Home } from './pages/Home';

// Lazy-load secondary pages — only download when navigated to
const ServicesPage = lazy(() => import('./pages/ServicesPage').then(m => ({ default: m.ServicesPage })));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage').then(m => ({ default: m.PortfolioPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const CitySEOPage = lazy(() => import('./pages/CitySEOPage').then(m => ({ default: m.CitySEOPage })));

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Nav />
      <Suspense fallback={<div className="page-padding" style={{minHeight:'100svh'}} />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/service-areas/:citySlug" element={<CitySEOPage />} />
        </Routes>
      </Suspense>
      <Footer />
      <FloatingChat />
    </BrowserRouter>
  );
}

export default App;
