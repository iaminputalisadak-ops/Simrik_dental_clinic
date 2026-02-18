import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BeforeAfterSlider from '../BeforeAfterSlider';

const API_URL = '/api';

export default function BeforeAfterSection() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/before_after.php`)
      .then(res => res.json())
      .then(data => data.success && setCases((data.cases || []).slice(0, 6)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

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
          {cases.map((c) => (
            <BeforeAfterSlider
              key={c.id}
              beforeImage={c.before_image_url}
              afterImage={c.after_image_url}
              title={c.title}
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
