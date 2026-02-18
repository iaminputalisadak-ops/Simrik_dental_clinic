import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API_URL = '/api';
const DEFAULT = {
  section_heading: 'ABOUT OUR CLINIC',
  main_title: 'Welcome to Lagankhel Dental Clinic',
  intro_text: 'Welcome to Lagankhel Dental Clinic where your journey to optimal oral health and a confident smile begins. Our team of experienced dentists is committed to providing personalized care in a warm and welcoming environment.',
  feature1_title: 'Expert Care',
  feature1_desc: 'Our team of skilled dental professionals at Lagankhel Dental Clinic is dedicated to providing expert care tailored to your individual needs.',
  feature2_title: 'Personalized Approach',
  feature2_desc: 'At Lagankhel Dental Clinic, we understand that every patient is unique, which is why we take a personalized approach to your dental care.',
  image_url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800',
  read_more_link: '/about'
};

const IconExpert = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="9" cy="7" r="4" />
    <path d="M3 21v-2a4 4 0 0 1 4-4h4" />
    <path d="M16 11l2 2 4-4" />
    <path d="M16 3a4 4 0 0 1 0 8" />
  </svg>
);

const IconPersonalized = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2c-2 0-4 1.5-5 4-1-2.5-3-4-5-4-3.3 0-6 2.7-6 6 0 4 4 8 6 10 2 2 4 4 5 6 1-2 3-4 5-6 2-2 6-6 6-10 0-3.3-2.7-6-6-6z" />
    <circle cx="12" cy="10" r="2" />
  </svg>
);

export default function AboutSection() {
  const [content, setContent] = useState(DEFAULT);

  useEffect(() => {
    fetch(`${API_URL}/about.php`)
      .then(res => res.json())
      .then(data => data.success && data.content && setContent({ ...DEFAULT, ...data.content }))
      .catch(() => {});
  }, []);

  return (
    <section className="section about-section about-section-new">
      <div className="container">
        <div className="about-grid">
          <div className="about-left">
            <p className="section-subtitle">{content.section_heading}</p>
            <h2 className="section-title">{content.main_title}</h2>
            <p className="about-intro">{content.intro_text}</p>
            <div className="about-features">
              <div className="about-feature">
                <div className="about-feature-icon">
                  <IconExpert />
                </div>
                <div>
                  <h3>{content.feature1_title}</h3>
                  <p>{content.feature1_desc}</p>
                </div>
              </div>
              <div className="about-feature">
                <div className="about-feature-icon">
                  <IconPersonalized />
                </div>
                <div>
                  <h3>{content.feature2_title}</h3>
                  <p>{content.feature2_desc}</p>
                </div>
              </div>
            </div>
            <Link to={content.read_more_link || '/about'} className="btn-primary">Read More</Link>
          </div>
          <div className="about-right">
            <div className="about-image-wrap">
              <img src={content.image_url || DEFAULT.image_url} alt="Dental care" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
