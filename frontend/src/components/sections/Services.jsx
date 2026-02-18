import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API_URL = '/api';
const DEFAULT_SERVICES = [
  { title: 'Orthodontics', image_url: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600', link: '/treatments' },
  { title: 'Root Canal', image_url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600', link: '/treatments' },
  { title: 'Dental Oral Surgery', image_url: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600', link: '/treatments' },
  { title: 'Cosmetic Dentistry', image_url: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=600', link: '/treatments' },
  { title: 'Dental Implant And Prosthetics', image_url: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=600', link: '/treatments' },
  { title: 'Restorative Dentistry', image_url: 'https://images.unsplash.com/photo-1629909615782-3a4c1b24a8f2?w=600', link: '/treatments' },
];

export default function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/services.php`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.services?.length) setServices(data.services);
        else setServices(DEFAULT_SERVICES);
      })
      .catch(() => setServices(DEFAULT_SERVICES));
  }, []);

  return (
    <section className="section services-section services-section-new">
      <div className="container">
        <p className="section-subtitle">SERVICES</p>
        <h2 className="section-title">Our Dental Services</h2>
        <div className="services-cards-grid">
          {services.map((s) => (
            <Link to={s.link || '/treatments'} key={s.id} className="service-image-card">
              <div className="service-image-wrap">
                <img src={s.image_url} alt={s.title} loading="lazy" />
                <div className="service-image-overlay" />
                <div className="service-card-overlay-content">
                  <h3>{s.title}</h3>
                  <span className="service-learn-btn">Learn More</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <p className="services-footer">
          Welcome to Lagankhel Dental Clinic where your journey to optimal oral health and a confident smile begins.
        </p>
        <Link to="/contact" className="btn-primary">Book Appointment</Link>
      </div>
    </section>
  );
}
