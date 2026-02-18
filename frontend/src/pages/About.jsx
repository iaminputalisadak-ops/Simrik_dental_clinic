import { useState, useEffect } from 'react';
import SeoHead from '../components/SeoHead';
import { Link } from 'react-router-dom';
import BookAppointmentModal from '../components/BookAppointmentModal';
import Team from '../components/sections/Team';

const API_URL = '/api';
const DEFAULT = {
  section_heading: 'ABOUT',
  page_title: 'About Us',
  hero_pill_text: '# Dental Hospital',
  hero_clinic_name: 'Simrik Dental Clinic',
  hero_tagline: 'Offering Quality Dental Services With Zero Compromise',
  hero_background_image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1920',
  main_image_url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800',
  intro_paragraph: 'Simrik Dental Clinic was founded with a vision to provide quality dental care. Located in Lalitpur, we are a multi-specialty dental clinic offering orthodontic and comprehensive dental treatments. Our team is committed to delivering personalized care with modern technology in a comfortable environment.',
  cta_banner_heading: 'Invisalign SmileView simulation for your new smile!',
  cta_banner_text: "Just take a smiling selfie and we'll show you what and how Invisalign treatment can do for you. Click here to try Invisalign SmileView right now.",
  cta_banner_link: 'https://www.invisalign.com/smileview',
  why_heading: 'Why Simrik Dental Clinic is the Best Dental Clinic in Lalitpur?',
  core_value_text: 'We approach every patient\'s problem with care. Our dental team is well-trained, experienced, and skillful. We provide a comfortable environment and conduct regular training sessions for a patient-friendly approach.',
  facilities_text: 'Our clinic is equipped with modern tools and state-of-the-art technology. We maintain a sterile environment with infection control standards. We welcome all your queries and ensure a warm, reassuring experience.',
  quality_text: 'We follow a quality-first principle. Regardless of cost, we ensure you receive the best dental treatment. Best Dental Clinic In Lalitpur.',
  final_cta_text: 'Need another reason? Just book an appointment with us and experience Simrik Dental Clinic yourself.',
  final_cta_link: '/contact',
  footer_cta_title: 'Book Your Appointment',
  footer_cta_description: 'Prioritize your oral health with our General Dentistry services. Schedule your appointment today. Our dedicated team is here to ensure your smile stays bright and healthy.'
};

export default function About() {
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState(DEFAULT);

  useEffect(() => {
    fetch(`${API_URL}/about_page.php`)
      .then(res => res.json())
      .then(data => data.success && data.content && setContent({ ...DEFAULT, ...data.content }))
      .catch(() => {});
  }, []);

  const heroBg = content.hero_background_image || DEFAULT.hero_background_image;

  return (
    <div className="page about-page about-page-full">
      <SeoHead title="About Us" description="Learn about Simrik Dental Clinic - our team, values, and commitment to quality dental care in Lalitpur." path="/about" />

      <section className="about-hero" style={{ backgroundImage: `url(${heroBg})` }}>
        <div className="about-hero-overlay" />
        <div className="container about-hero-inner">
          {content.hero_pill_text && <span className="about-hero-pill">{content.hero_pill_text}</span>}
          <h1 className="about-hero-title">
            <span className="about-hero-title-line1">About</span>
            <span className="about-hero-title-line2">{content.hero_clinic_name || 'Simrik Dental Clinic'}</span>
          </h1>
          {content.hero_tagline && <p className="about-hero-tagline">{content.hero_tagline}</p>}
        </div>
      </section>

      <section className="section about-intro-section">
        <div className="container">
          <div className="about-intro-grid">
            <div className="about-intro-text">
              <p className="section-subtitle">{content.section_heading}</p>
              <h2 className="about-page-title">{content.page_title}</h2>
              <div className="about-intro-p" dangerouslySetInnerHTML={{ __html: content.intro_paragraph || '' }} />
            </div>
            <div className="about-intro-image">
              <img src={content.main_image_url} alt="Dental care" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {content.cta_banner_heading && (
        <section className="about-cta-banner">
          <div className="container">
            <h2>{content.cta_banner_heading}</h2>
            <p>
              {content.cta_banner_text}
              {content.cta_banner_link && (
                <> {' '}<a href={content.cta_banner_link} target="_blank" rel="noopener noreferrer">Click here to try Invisalign SmileView right now.</a></>
              )}
            </p>
          </div>
        </section>
      )}

      <section className="section about-detail-section">
        <div className="container">
          {content.why_heading && <h2 className="about-why-heading">{content.why_heading}</h2>}
          <div className="about-repeat-intro" dangerouslySetInnerHTML={{ __html: content.intro_paragraph || '' }} />
          {content.core_value_text && (
            <div className="about-block about-block-blue">
              <div dangerouslySetInnerHTML={{ __html: content.core_value_text || '' }} />
            </div>
          )}
          {content.facilities_text && (
            <div className="about-block about-block-blue">
              <div dangerouslySetInnerHTML={{ __html: content.facilities_text || '' }} />
            </div>
          )}
          {content.quality_text && <p className="about-paragraph" dangerouslySetInnerHTML={{ __html: (content.quality_text || '').replace(/Best Dental Clinic In (\w+)/gi, '<strong>Best Dental Clinic In $1</strong>') }} />}
          {content.final_cta_text && (
            <p className="about-final-cta-text"><strong>{content.final_cta_text}</strong></p>
          )}
        </div>
      </section>

      <section className="about-footer-cta">
        <div className="container about-footer-cta-inner">
          <div className="about-footer-cta-content">
            <span className="about-footer-cta-icon" aria-hidden="true">🦷</span>
            <div>
              <h2 className="about-footer-cta-title">{content.footer_cta_title || 'Book Your Appointment'}</h2>
              <p className="about-footer-cta-desc">{content.footer_cta_description || DEFAULT.footer_cta_description}</p>
            </div>
          </div>
          <Link to={content.final_cta_link || '/contact'} className="btn btn-about-book" onClick={(e) => { e.preventDefault(); setShowModal(true); }}>Book Appointment</Link>
        </div>
      </section>

      <Team />
      <BookAppointmentModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
