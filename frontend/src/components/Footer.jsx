import { Link } from 'react-router-dom';

const quickLinks = [
  { path: '/treatments', label: 'Orthodontics (Braces & Aligners)' },
  { path: '/treatments', label: 'Restorative Dentistry (Root Canal & Fillings)' },
  { path: '/treatments', label: 'Oral Surgery (Extractions)' },
  { path: '/treatments', label: 'Cosmetic Dentistry (Veneers & Smile Design)' },
  { path: '/treatments', label: 'Pediatric Dentistry' },
  { path: '/treatments', label: 'Dental Implant & Prosthetics' },
  { path: '/treatments', label: 'Gum Treatment' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col footer-about">
              <h3>Lagankhel Dental Clinic</h3>
              <p>
                Our clinic is dedicated to providing compassionate care and state-of-the-art 
                treatments to help you achieve optimal oral health and confidence in your smile.
              </p>
              <div className="footer-social">
                <a href="#" aria-label="Facebook">Facebook</a>
                <a href="#" aria-label="LinkedIn">LinkedIn</a>
                <a href="#" aria-label="Instagram">Instagram</a>
                <a href="#" aria-label="YouTube">YouTube</a>
              </div>
            </div>
            
            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul>
                {quickLinks.map((link, i) => (
                  <li key={i}><Link to={link.path}>{link.label}</Link></li>
                ))}
              </ul>
            </div>
            
            <div className="footer-col">
              <h4>Get in Touch</h4>
              <div className="footer-contact">
                <p><strong>Our Location</strong><br />Lagankhel, Lalitpur, Nepal</p>
                <p><strong>Call Today</strong><br /><a href="tel:+9779800000000">+977 9800000000</a></p>
                <p><strong>Landline</strong><br />01-1234567</p>
                <p><strong>Opening Hours</strong><br />Sunday - Friday<br />10:00 AM - 7:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Lagankhel Dental Clinic. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
