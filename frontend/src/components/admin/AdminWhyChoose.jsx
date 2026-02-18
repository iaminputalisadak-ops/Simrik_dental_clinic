import { useState, useEffect } from 'react';

const API_URL = '/api';

export default function AdminWhyChoose() {
  const [content, setContent] = useState({
    section_heading: '', main_title: '', intro_text: '',
    feature1_title: '', feature1_desc: '',
    feature2_title: '', feature2_desc: '',
    feature3_title: '', feature3_desc: '',
    feature4_title: '', feature4_desc: '',
    feature5_title: '', feature5_desc: '',
    feature6_title: '', feature6_desc: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/why_choose.php`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.content) setContent(data.content);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    try {
      const res = await fetch(`${API_URL}/why_choose.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
        credentials: 'include'
      });
      const data = await res.json();
      if (data.success) setMessage({ type: 'success', text: data.message });
      else setMessage({ type: 'error', text: data.message || 'Failed' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Unable to save' });
    }
  };

  if (loading) return <p>Loading...</p>;

  const features = [1, 2, 3, 4, 5, 6];
  const labels = ['Comfort and Convenience', 'Customized Treatment Plans', 'Modern Technology', 'Affordable Service', 'Premium Dental Care', '10,000+ Happy Clients'];

  return (
    <div className="admin-why-choose">
      <h2>Why Choose Us</h2>
      {message.text && <div className={`form-message ${message.type}`}>{message.text}</div>}
      <form className="admin-form" onSubmit={handleSubmit}>
        <label>Section Heading</label>
        <input value={content.section_heading} onChange={e => setContent({ ...content, section_heading: e.target.value })} />
        <label>Main Title</label>
        <input value={content.main_title} onChange={e => setContent({ ...content, main_title: e.target.value })} required />
        <label>Intro Text (use &lt;strong&gt; for bold clinic name)</label>
        <textarea value={content.intro_text} onChange={e => setContent({ ...content, intro_text: e.target.value })} rows="3" />
        {features.map((i) => (
          <div key={i} className="admin-form-group">
            <h4>Feature {i}: {labels[i - 1]}</h4>
            <label>Title</label>
            <input value={content[`feature${i}_title`]} onChange={e => setContent({ ...content, [`feature${i}_title`]: e.target.value })} />
            <label>Description</label>
            <textarea value={content[`feature${i}_desc`]} onChange={e => setContent({ ...content, [`feature${i}_desc`]: e.target.value })} rows="2" />
          </div>
        ))}
        <button type="submit" className="btn-primary">Save Changes</button>
      </form>
    </div>
  );
}
