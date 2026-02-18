import { useState, useEffect } from 'react';

const API_URL = '/api';
const DEFAULT = {
  section_heading: 'WHAT WE DO',
  main_title: 'Why Choose us?',
  intro_text: 'At Lagankhel Dental Clinic, we believe in providing our patients with treatments which includes their involvement at all times. Our patients are the stars where we have set a standard, in providing a dental care with a feeling of being at home.',
  feature1_title: 'Comfort and Convenience', feature1_desc: 'Your comfort and convenience are our top priorities at Lagankhel Dental Clinic. From our warm and inviting office environment to our flexible scheduling options',
  feature2_title: 'Customized Treatment Plans', feature2_desc: 'We understand your smile is unique. We take the time to listen to your concerns and goals, crafting a personalized treatment plan to achieve your desired results.',
  feature3_title: 'Modern Technology', feature3_desc: 'Modern technology in dentistry has revolutionized patient care through advancements such as digital imaging, which provides precise and detailed visuals',
  feature4_title: 'Affordable Service', feature4_desc: 'We believe high-quality dentistry shouldn\'t break the bank. We offer competitive rates and transparent pricing, so you can make informed decisions about your oral health.',
  feature5_title: 'Premium Dental Care', feature5_desc: 'Experience the difference a healthy smile makes! We use top-of-the-line materials and equipment to deliver exceptional results and a comfortable experience.',
  feature6_title: '10,000+ Happy Clients', feature6_desc: 'Our commitment to exceptional care has earned the trust of over 10,000 satisfied patients. Join our growing community of happy smiles!'
};

const Icons = {
  comfort: () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
      <path d="M16 11l2 2 4-4" />
    </svg>
  ),
  customized: () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 9h6v6H9z" />
      <path d="M3 9h3M18 9h3M3 15h3M18 15h3" />
    </svg>
  ),
  modern: () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      <path d="M12 6v2l2 2" />
    </svg>
  ),
  affordable: () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
    </svg>
  ),
  premium: () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2c-2 0-4 1.5-5 4-1-2.5-3-4-5-4-3.3 0-6 2.7-6 6 0 4 4 8 6 10 2 2 4 4 5 6 1-2 3-4 5-6 2-2 6-6 6-10 0-3.3-2.7-6-6-6z" />
      <circle cx="12" cy="10" r="2" />
    </svg>
  ),
  clients: () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
};

const iconKeys = ['comfort', 'customized', 'modern', 'affordable', 'premium', 'clients'];

export default function WhyChooseUs() {
  const [content, setContent] = useState(DEFAULT);

  useEffect(() => {
    fetch(`${API_URL}/why_choose.php`)
      .then(res => res.json())
      .then(data => data.success && data.content && setContent({ ...DEFAULT, ...data.content }))
      .catch(() => {});
  }, []);

  const features = [
    { title: content.feature1_title, desc: content.feature1_desc },
    { title: content.feature2_title, desc: content.feature2_desc },
    { title: content.feature3_title, desc: content.feature3_desc },
    { title: content.feature4_title, desc: content.feature4_desc },
    { title: content.feature5_title, desc: content.feature5_desc },
    { title: content.feature6_title, desc: content.feature6_desc }
  ];

  return (
    <section className="section why-choose why-choose-new">
      <div className="container">
        <p className="section-subtitle">{content.section_heading}</p>
        <h2 className="section-title">{content.main_title}</h2>
        <p className="why-intro" dangerouslySetInnerHTML={{
          __html: (content.intro_text || '').replace(/Lagankhel Dental Clinic/g, '<strong>Lagankhel Dental Clinic</strong>')
        }} />
        <div className="why-features-grid">
          {features.map((f, i) => (
            <div key={i} className="why-feature-card">
              <div className="why-feature-icon">{Icons[iconKeys[i]]?.()}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
