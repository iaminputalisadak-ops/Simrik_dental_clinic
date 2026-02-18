import { useState } from 'react';
import SeoHead from '../components/SeoHead';
import BookAppointmentModal from '../components/BookAppointmentModal';

const treatments = [
  { title: 'Orthodontics (Braces & Aligners)', desc: 'Straighten your teeth with traditional braces or clear aligners. We offer personalized treatment plans for all ages.' },
  { title: 'Restorative Dentistry (Root Canal & Fillings)', desc: 'Save your natural teeth with pain-free root canal treatment and high-quality dental fillings.' },
  { title: 'Oral Surgery (Extractions)', desc: 'Safe and comfortable tooth extractions including wisdom teeth removal.' },
  { title: 'Cosmetic Dentistry (Veneers & Smile Design)', desc: 'Transform your smile with veneers, teeth whitening, and complete smile makeovers.' },
  { title: 'Pediatric Dentistry', desc: 'Gentle dental care for children, focusing on prevention and building healthy habits.' },
  { title: 'Dental Implant & Prosthetics', desc: 'Replace missing teeth with durable dental implants and natural-looking prosthetics.' },
  { title: 'Gum Treatment', desc: 'Comprehensive gum care including scaling, root planing, and treatment for periodontal disease.' },
];

export default function Treatments() {
  const [showModal, setShowModal] = useState(false);
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="page treatments-page">
      <SeoHead title="Treatments" description="Dental treatments at Lagankhel Dental Clinic: Orthodontics, Root Canal, Oral Surgery, Cosmetic Dentistry, Implants, Gum Treatment. Quality care in Lalitpur." path="/treatments" />
      <section className="page-hero">
        <div className="container">
          <h1>Our Dental Treatments</h1>
          <p>Comprehensive dental care for you and your family</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="treatments-list">
            {treatments.map((t, i) => (
              <div key={i} className="treatment-card" onClick={() => setExpanded(expanded === i ? null : i)}>
                <h3>{t.title}</h3>
                <p className={expanded === i ? 'expanded' : ''}>{t.desc}</p>
              </div>
            ))}
          </div>
          <button className="btn-primary" onClick={() => setShowModal(true)}>Book Appointment</button>
        </div>
      </section>
      <BookAppointmentModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
