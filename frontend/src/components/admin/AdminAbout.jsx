import { useState, useEffect } from 'react';
import ImageUpload from './ImageUpload';

const API_URL = '/api';

export default function AdminAbout() {
  const [content, setContent] = useState({
    section_heading: '', main_title: '', intro_text: '',
    feature1_title: '', feature1_desc: '', feature2_title: '', feature2_desc: '',
    image_url: '', read_more_link: '/about'
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/about.php`)
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
      const res = await fetch(`${API_URL}/about.php`, {
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

  return (
    <div className="admin-about">
      <h2>About Section</h2>
      {message.text && <div className={`form-message ${message.type}`}>{message.text}</div>}
      <form className="admin-form" onSubmit={handleSubmit}>
        <label>Section Heading</label>
        <input value={content.section_heading} onChange={e => setContent({ ...content, section_heading: e.target.value })} />
        <label>Main Title</label>
        <input value={content.main_title} onChange={e => setContent({ ...content, main_title: e.target.value })} required />
        <label>Intro Text</label>
        <textarea value={content.intro_text} onChange={e => setContent({ ...content, intro_text: e.target.value })} rows="3" />
        <label>Feature 1 Title</label>
        <input value={content.feature1_title} onChange={e => setContent({ ...content, feature1_title: e.target.value })} />
        <label>Feature 1 Description</label>
        <textarea value={content.feature1_desc} onChange={e => setContent({ ...content, feature1_desc: e.target.value })} rows="2" />
        <label>Feature 2 Title</label>
        <input value={content.feature2_title} onChange={e => setContent({ ...content, feature2_title: e.target.value })} />
        <label>Feature 2 Description</label>
        <textarea value={content.feature2_desc} onChange={e => setContent({ ...content, feature2_desc: e.target.value })} rows="2" />
        <ImageUpload value={content.image_url} onChange={v => setContent({ ...content, image_url: v })} label="Image" prefix="ab" />
        <label>Read More Link</label>
        <input value={content.read_more_link} onChange={e => setContent({ ...content, read_more_link: e.target.value })} />
        <button type="submit" className="btn-primary">Save Changes</button>
      </form>
    </div>
  );
}
