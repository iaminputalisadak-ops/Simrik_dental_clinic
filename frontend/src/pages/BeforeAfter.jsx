import { useState, useEffect } from 'react';
import SeoHead from '../components/SeoHead';
import BeforeAfterSlider from '../components/BeforeAfterSlider';

const API_URL = '/api';

export default function BeforeAfter() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/before_after.php`)
      .then(res => res.json())
      .then(data => data.success && setCases(data.cases || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page before-after-page">
      <SeoHead title="Before-After Cases" description="View before and after dental treatment results from Lagankhel Dental Clinic. Real patient stories and beautiful smiles we create in Lalitpur." path="/before-after" />
      <section className="before-after-banner">
        <h1>Before - After Cases</h1>
      </section>
      <section className="section before-after-content">
        <div className="container">
          <p className="section-subtitle">Our Recent Cases</p>
          <h2 className="before-after-heading">Our Cases & Patient Stories We Create Beautiful Smiles</h2>
          {loading ? (
            <p>Loading...</p>
          ) : cases.length === 0 ? (
            <p className="before-after-empty">No before-after cases yet. Check back soon!</p>
          ) : (
            <div className="before-after-grid">
              {cases.map((c) => (
                <BeforeAfterSlider
                  key={c.id}
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
