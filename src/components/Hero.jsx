import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Defer video loading until after the page is interactive
  useEffect(() => {
    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.src = isMobile ? "/hero-mobile-veo.mp4" : "/hero-desktop-veo.mp4";
        videoRef.current.load();
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [isMobile]);

  return (
    <section className="hero">
      <div className="hero-content">
        <motion.div 
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="hero-tag"
        >
          Charles Grey Construction
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Building with <em>Precision</em><br/> and <em>Speed</em>.
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="hero-sub"
        >
          Louisiana's premier residential and commercial general contractor. Turnkey builds from foundation to finish. Same-day estimates, competitive pricing, unmatched quality.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="hero-actions"
        >
          <Link to="/contact" className="btn btn-primary">Get a Quote</Link>
          <Link to="/services" className="btn btn-outline">Our Services</Link>
        </motion.div>
      </div>

      <div className="hero-image-wrap">
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted 
          playsInline 
          preload="none"
          className={`hero-video ${videoLoaded ? 'fade-in' : ''}`}
          onCanPlayThrough={() => setVideoLoaded(true)}
        ></video>
      </div>
    </section>
  );
}

export function Marquee() {
  const texts = Array(8).fill("BUILDING EXCELLENCE");
  return (
    <section className="marquee-wrap">
      <div className="marquee">
        {texts.map((text, idx) => (
          <span key={idx}>{text}</span>
        ))}
      </div>
    </section>
  );
}
