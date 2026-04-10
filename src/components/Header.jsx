import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <Link to="/" className="nav-logo">
        <img src="/charlesgreynewlogo.png" alt="Charles Grey Logo" className="logo-main" />
      </Link>
      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <Link to="/services" onClick={() => setMenuOpen(false)}>Services</Link>
        <Link to="/portfolio" onClick={() => setMenuOpen(false)}>Our Work</Link>
        <Link to="/about" onClick={() => setMenuOpen(false)}>Process</Link>
        <Link to="/contact" className="nav-cta" onClick={() => setMenuOpen(false)}>Get a Quote</Link>
      </div>
      <div 
        className={`menu-toggle ${menuOpen ? 'open' : ''}`} 
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span><span></span><span></span>
      </div>
    </header>
  );
}
