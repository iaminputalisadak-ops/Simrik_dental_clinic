import { useState, useEffect } from 'react';
import SeoHead from '../components/SeoHead';
import { Link } from 'react-router-dom';
import BookAppointmentModal from '../components/BookAppointmentModal';
import Team from '../components/sections/Team';

const API_URL = '/api';
const DEFAULT = {
  section_heading: 'ABOUT',
  page_title: 'About Us',
  main_image_url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800',
  intro_paragraph: 'Lagankhel Dental Clinic is a multi-specialty dental clinic committed to quality care.',
  cta_banner_heading: 'Invisalign SmileView simulation for your new smile!',
  cta_banner_text: 'Just take a smiling selfie and we\'ll show you what Invisalign can do. Click here to try Invisalign SmileView.',
  cta_banner_link: 'https://www.invisalign.com/smileview',
  why_heading: 'Why Lagankhel Dental Clinic is the Best Dental Clinic in Lalitpur?',
  core_value_text: 'We approach every patient\'s problem with care. Our dental team is well-trained, experienced, and skillful.',
  facilities_text: 'Our clinic is equipped with modern tools and state-of-the-art technology. We maintain a sterile environment.',
  quality_text: 'We follow a quality-first principle. Best Dental Clinic In Lalitpur.',
  final_cta_text: 'Need another reason? Just book an appointment with us and experience Lagankhel Dental Clinic yourself.',
  final_cta_link: '/contact'
};

export default function About() {
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState(DEFAULT);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/about_page.php`)
      .then(res => res.json())
      .then(data => data.success && data.content && setContent({ ...DEFAULT, ...data.content }))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="page"><div className="container"><p>Loading...</p></div></div>;

  return (
    <div className="page about-page about-page-full">
      <SeoHead title="About Us" description="Learn about Lagankhel Dental Clinic - our team, values, and commitment to quality dental care in Lalitpur." path="/about" />
      <section className="section about-intro-section">
        <div className="container">
          <div className="about-intro-grid">
            <div className="about-intro-text">
              <p className="section-subtitle">{content.section_heading}</p>
              <h1 className="about-page-title">{content.page_title}</h1>
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
          {content.facilities_text && <p className="about-paragraph">{content.facilities_text}</p>}
          {content.quality_text && <p className="about-paragraph" dangerouslySetInnerHTML={{ __html: (content.quality_text || '').replace(/Best Dental Clinic In (\w+)/gi, '<strong>Best Dental Clinic In $1</strong>') }} />}
          {content.final_cta_text && (
            <div className="about-block about-block-blue">
              <p><strong>{content.final_cta_text}</strong></p>
              <Link to={content.final_cta_link || '/contact'} className="btn-primary" onClick={(e) => { e.preventDefault(); setShowModal(true); }}>Book Appointment</Link>
            </div>
          )}
        </div>
      </section>

      <Team />
      <BookAppointmentModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
