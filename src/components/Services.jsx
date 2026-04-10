import { useEffect, useRef } from 'react';

function LazyVideo({ src, poster }) {
  const videoRef = useRef(null);
  useEffect(() => {
    // Start loading after a short delay so hero renders first, but videos are ready before scroll
    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.src = src;
        videoRef.current.load();
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [src]);

  return <video ref={videoRef} poster={poster} autoPlay loop muted playsInline preload="none"></video>;
}

export function Services() {
  return (
    <section className="section services" id="services">
      <div>
        <div className="section-tag">What We Do</div>
        <h2 className="section-title">Turnkey Construction.</h2>
        <p className="section-desc">From foundation and dirt work to the final premium finishings. We handle the entire scope under one roof.</p>
        
        <div className="service-rows">
          <div className="service-row">
            <div className="service-img">
              <LazyVideo src="/service-residential.mp4" poster="/video-poster.webp" />
            </div>
            <div className="service-info">
              <div className="service-num">01</div>
              <h3>Residential</h3>
              <p>We provide full-service turnkey construction. Dirt work, foundation, framing, roofing, fascia, soffits, insulation, drywall, electrical, and plumbing. Everything.</p>
              <ul className="service-list">
                <li>Turnkey Homes</li>
                <li>Roofing & Fences</li>
                <li>Concrete Work</li>
              </ul>
            </div>
          </div>
          
          <div className="service-row">
            <div className="service-img">
              <LazyVideo src="/service-commercial.mp4" poster="/video-poster.webp" />
            </div>
            <div className="service-info">
              <div className="service-num">02</div>
              <h3>Commercial</h3>
              <p>We build out massive metal buildings, install TPO/PVC flat membrane roofing, and handle roof coatings.</p>
              <ul className="service-list">
                <li>Metal Buildings</li>
                <li>Flat Roofing</li>
                <li>Roof Coatings</li>
              </ul>
            </div>
          </div>

          <div className="service-row">
            <div className="service-img">
              <LazyVideo src="/service-restaurant.mp4" poster="/video-poster.webp" />
            </div>
            <div className="service-info">
              <div className="service-num">03</div>
              <h3>Interior Build-outs</h3>
              <p>Whether you need a restaurant refresher to update an older space or a brand new commercial tenant build-out, we prep the space perfectly.</p>
              <ul className="service-list">
                <li>Tenant Build-outs</li>
                <li>Restaurant Refreshers</li>
                <li>Flooring & Drywall</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section className="section process" id="process">
      <div>
        <div className="section-tag">How We Work</div>
        <h2 className="section-title">The Build Process.</h2>
        <p className="section-desc">A structured, completely transparent approach to getting your project off the ground faster.</p>
        
        <div className="process-timeline">
          <div className="process-step">
            <h3>1. The Breakdown</h3>
            <p>We start with a hyper-detailed, line-item estimate. No hidden fees. You see precisely where every dollar goes in 24 hours.</p>
          </div>
          <div className="process-step">
            <h3>2. Immediate Deployment</h3>
            <p>Our competitive advantage is speed. Once approved, our crews deploy immediately to begin foundation or prep work.</p>
          </div>
          <div className="process-step">
            <h3>3. Turnkey Execution</h3>
            <p>We manage all trades—framing, electrical, plumbing, and finishings. You deal with one contractor who runs a tight ship.</p>
          </div>
          <div className="process-step">
            <h3>4. Walkthrough & Delivery</h3>
            <p>We deliver a pristine, world-class finish on time and below the bloated market rates.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
