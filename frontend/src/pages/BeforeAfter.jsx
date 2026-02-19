import { useState, useEffect } from 'react';
import SeoHead from '../components/SeoHead';
import BeforeAfterSlider from '../components/BeforeAfterSlider';

const API_URL = '/api';
const DEFAULT_CASES = [
  { id: 0, before_image_url: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600', after_image_url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600', title: 'Dental Restoration' },
  { id: 1, before_image_url: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600', after_image_url: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=600', title: 'Smile Makeover' },
  { id: 2, before_image_url: 'https://images.unsplash.com/photo-1629909615782-3a4c1b24a8f2?w=600', after_image_url: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=600', title: 'Orthodontics' },
];

export default function BeforeAfter() {
  const [cases, setCases] = useState(DEFAULT_CASES);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/before_after.php`)
      .then(res => res.json())
      .then(data => data.success && data.cases?.length && setCases(data.cases))
      .catch(() => {});
  }, []);

  return (
    <div className="page before-after-page">
      <SeoHead title="Before-After Cases" description="View before and after dental treatment results from Simrik Dental Clinic. Real patient stories and beautiful smiles we create in Lalitpur." path="/before-after" />
      <section className="before-after-banner">
        <h1>Before - After Cases</h1>
      </section>
      <section className="section before-after-content">
        <div className="container">
          <p className="section-subtitle">Our Recent Cases</p>
          <h2 className="before-after-heading">Our Cases & Patient Stories We Create Beautiful Smiles</h2>
          {cases.length === 0 ? (
            <p className="before-after-empty">No before-after cases yet. Check back soon!</p>
          ) : (
            <div className="before-after-grid">
              {cases.map((c, i) => (
                <BeforeAfterSlider
                  key={c.id ?? i}
                  beforeImage={c.before_image_url}
                  afterImage={c.after_image_url}
                  title={c.title}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
