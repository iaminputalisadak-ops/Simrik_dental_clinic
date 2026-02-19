import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BeforeAfterSlider from '../BeforeAfterSlider';

const API_URL = '/api';

function preloadImage(src) {
  if (!src) return;
  const img = new Image();
  img.src = src;
}

export default function BeforeAfterSection({ initialCases }) {
  const [cases, setCases] = useState(initialCases?.length ? (initialCases.slice(0, 6)) : []);
  const [loading, setLoading] = useState(!initialCases?.length);

  useEffect(() => {
    if (initialCases?.length) {
      setCases(initialCases.slice(0, 6));
      setLoading(false);
    }
  }, [initialCases]);
  useEffect(() => {
    if (initialCases?.length) return;
    fetch(`${API_URL}/before_after.php`)
      .then(res => res.json())
      .then(data => data.success && setCases((data.cases || []).slice(0, 6)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [initialCases]);

  useEffect(() => {
    cases.slice(0, 2).forEach((c) => {
      preloadImage(c.before_image_url);
      preloadImage(c.after_image_url);
    });
  }, [cases]);

  if (loading || cases.length === 0) return null;

  return (
    <section className="section before-after-section-home">
      <div className="before-after-banner">
        <h2>Before - After Cases</h2>
      </div>
      <div className="container">
        <p className="section-subtitle before-after-subtitle">Our Recent Cases</p>
        <h3 className="before-after-heading">Our Cases & Patient Stories We Create Beautiful Smiles</h3>
        <div className="before-after-grid">
          {cases.map((c, i) => (
            <BeforeAfterSlider
              key={c.id ?? i}
              beforeImage={c.before_image_url}
              afterImage={c.after_image_url}
              title={c.title}
              priority={i < 2}
            />
          ))}
        </div>
        <div className="before-after-cta">
          <Link to="/before-after" className="btn-outline">View All Cases</Link>
        </div>
      </div>
    </section>
  );
}
