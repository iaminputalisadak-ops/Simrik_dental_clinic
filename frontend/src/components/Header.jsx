import { useState } from 'react';
import { Link } from 'react-router-dom';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { 
    path: '/treatments', 
    label: 'Treatments',
  },
  { path: '/gallery', label: 'Gallery' },
  { path: '/before-after', label: 'Before-After' },
  { path: '/blog', label: 'Blog' },
  { path: '/contact', label: 'Contact Us' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo">
          Lagankhel Dental Clinic
        </Link>
        
        <nav className={`nav ${mobileMenuOpen ? 'nav-open' : ''}`}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link to="/contact" className="btn-book" onClick={() => setMobileMenuOpen(false)}>
          Book Appointment
        </Link>

        <button
          className="mobile-toggle"
          aria-label="Toggle menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
