import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { seoCities } from '../data/seoCities';
import { useLocalSEO } from '../hooks/useLocalSEO';
import { WhyUs, Stats } from '../components/WhyUs';
import { Services } from '../components/Services';
import { CTA } from '../components/Gallery';

export function CitySEOPage() {
  const { citySlug } = useParams();
  
  // Find the requested city in our SEO database
  const cityData = seoCities.find(c => c.slug === citySlug);
  
  // Activate the native dynamic SEO injection
  useLocalSEO(cityData);

  // If the user manually navigated to an invalid city slug, safely bump them to the Home page
  if (!cityData) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="page-padding">
      
      {/* Hyper-Localized Header */}
      <section className="section" style={{ background: 'var(--bg-elevated)', paddingTop: '160px' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="section-tag">Service Area</div>
          <h1 className="section-title">Premier Builders in {cityData.name}.</h1>
          <p className="section-desc" style={{ maxWidth: '800px', fontSize: '1.15rem' }}>
            {cityData.description}
          </p>
        </motion.div>
      </section>

      {/* Re-use core components to demonstrate authority */}
      <WhyUs />
      <Services />
      <Stats />
      
      {/* Localized Call to Action */}
      <CTA />
    </main>
  );
}
