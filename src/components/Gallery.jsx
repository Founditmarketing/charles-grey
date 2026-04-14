import { useState } from 'react';
import { Link } from 'react-router-dom';
import { seoCities } from '../data/seoCities';
import { Phone, Mail, ShieldCheck } from 'lucide-react';
import { ContactForm } from './Contact';

export function Gallery() {
  const [lightboxImg, setLightboxImg] = useState(null);

  const images = [
    { src: "/gallery/finished-home.webp", label: "Completed Residential", class: "g-wide" },
    { src: "/gallery/framing.webp", label: "Wood Framing", class: "" },
    { src: "/gallery/metal-building.webp", label: "Metal Building Erection", class: "g-tall" },
    { src: "/gallery/concrete-pour.webp", label: "Foundation Pour", class: "" },
    { src: "/gallery/roofing.webp", label: "Roofing Install", class: "" },
    { src: "/gallery/interior-buildout.webp", label: "Restaurant Build-Out", class: "g-wide" },
    { src: "/gallery/electrical-roughin.webp", label: "Electrical Rough-In", class: "" },
    { src: "/gallery/completed-metal.webp", label: "Completed Metal Building", class: "" }
  ];

  return (
    <>
      <section className="section gallery" id="work">
        <div>
          <div className="section-tag">Featured Work</div>
          <h2 className="section-title">Recent Projects.</h2>
          <p className="section-desc">A selection of our completed builds and active job sites across the state.</p>
          
          <div className="gallery-grid">
            {images.map((img, i) => (
              <div 
                key={i} 
                className={`g-item ${img.class}`} 
                onClick={() => setLightboxImg(img.src)}
              >
                <img src={img.src} alt={img.label} width="600" height="400" loading="lazy" />
                <div className="g-label">{img.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <div 
        className={`lightbox ${lightboxImg ? 'active' : ''}`} 
        onClick={() => setLightboxImg(null)}
      >
        {lightboxImg && (
          <>
            <button className="lb-close" onClick={() => setLightboxImg(null)}>
              <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
            <img src={lightboxImg} alt="Enlarged view" onClick={(e) => e.stopPropagation()} />
          </>
        )}
      </div>
    </>
  );
}

export function CTA() {
  return (
    <section className="conversion-block" id="contact">
      
      {/* Trust Stats Strip */}
      <div className="conv-trust-strip">
        <div className="conv-stat">
          <span className="conv-stat-value">5.0★</span>
          <span className="conv-stat-label">HomeAdvisor Rating</span>
        </div>
        <div className="conv-stat">
          <span className="conv-stat-value">100%</span>
          <span className="conv-stat-label">Clients Recommend</span>
        </div>
        <div className="conv-stat">
          <span className="conv-stat-value">24hr</span>
          <span className="conv-stat-label">Estimate Turnaround</span>
        </div>
        <div className="conv-stat">
          <span className="conv-stat-value">$0</span>
          <span className="conv-stat-label">Hidden Fees</span>
        </div>
      </div>

      {/* Main CTA Content */}
      <div className="conv-main">
        <div className="conv-copy">
          <div className="section-tag">Let's Build</div>
          <h2 className="section-title">Ready to Start<br/>Your Project?</h2>
          <p className="conv-desc">Get your hyper-detailed, line-item estimate in 24 hours. We deploy faster, build smarter, and deliver premium quality — every time.</p>
          
          <div className="conv-actions">
            <a href="tel:9858606725" className="conv-phone">
              <Phone size={22} /> (985) 860-6725
            </a>
            <a href="mailto:admin@charlesgreyconstruction.com" className="conv-email">
              <Mail size={16} /> admin@charlesgreyconstruction.com
            </a>
          </div>

          <div className="conv-badges">
            <div className="conv-badge">
              <ShieldCheck size={16} /> Licensed & Insured
            </div>
            <div className="conv-badge">
              <ShieldCheck size={16} /> 488 Corporate Dr, Houma LA
            </div>
          </div>
        </div>

        {/* Desktop-only inline AI chat */}
        <div className="conv-chat-desktop">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="footer-main">
        <div className="footer-brand">
          <img src="/charlesgreynewlogo.png" alt="Charles Grey Construction" style={{ height: '60px', marginBottom: '20px', display: 'block' }} />
          <p>Louisiana's premier commercial and residential general contractor. Turnkey execution with unparalleled speed.</p>
          <div className="badge-wrapper" style={{marginTop: '20px'}}>
              <ShieldCheck size={16} />
              <span style={{fontSize: '0.75rem'}}>Licensed, Bonded & Insured</span>
          </div>
        </div>
        <div className="footer-col">
          <h5>Company</h5>
          <Link to="/about">Our Process</Link>
          <Link to="/portfolio">Featured Work</Link>
          <Link to="/services">Services</Link>
        </div>
        <div className="footer-col">
          <h5>Areas We Serve</h5>
          {seoCities.map((city, idx) => (
            <Link key={idx} to={`/service-areas/${city.slug}`}>
              {city.name} Construction
            </Link>
          ))}
        </div>
        <div className="footer-col">
          <h5>Contact</h5>
          <a href="mailto:quotes@charlesgrey.com">quotes@charlesgrey.com</a>
          <a href="tel:9858606725">985-860-6725</a>
        </div>
      </div>
      <div className="footer-bottom">
        <div>&copy; {new Date().getFullYear()} Charles Grey Construction Co. All rights reserved.</div>
        <div>Built for Excellence</div>
      </div>
    </footer>
  );
}
