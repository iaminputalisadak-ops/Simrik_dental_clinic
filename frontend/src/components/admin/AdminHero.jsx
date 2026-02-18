import { useState, useEffect } from 'react';
import ImageUpload from './ImageUpload';

const API_URL = '/api';

export default function AdminHero() {
  const [slides, setSlides] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ subtitle: '', title: '', tagline: '', background_image: '', overlay_opacity: 0.5, text_position: 'center', btn1_text: 'Book Appointment', btn2_text: 'Learn More', btn2_link: '/about', sort_order: 0 });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(true);

  const fetchSlides = () => {
    fetch(`${API_URL}/admin/hero.php`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => data.success && setSlides(data.slides || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => fetchSlides(), []);

  const saveSlide = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    const payload = { ...form, overlay_opacity: parseFloat(form.overlay_opacity) };
    if (editing) payload.id = editing.id;
    try {
      const res = await fetch(`${API_URL}/hero.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'include'
      });
      const data = await res.json();
      if (data.success) {
        setMessage({ type: 'success', text: data.message });
        setEditing(null);
        setForm({ subtitle: '', title: '', tagline: '', background_image: '', overlay_opacity: 0.5, text_position: 'center', btn1_text: 'Book Appointment', btn2_text: 'Learn More', btn2_link: '/about', sort_order: 0 });
        fetchSlides();
      } else setMessage({ type: 'error', text: data.message || 'Failed' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Unable to save' });
    }
  };

  const editSlide = (slide) => {
    setEditing(slide);
    setForm({
      subtitle: slide.subtitle || '',
      title: slide.title || '',
      tagline: slide.tagline || '',
      background_image: slide.background_image || '',
      overlay_opacity: slide.overlay_opacity ?? 0.5,
      text_position: slide.text_position || 'center',
      btn1_text: slide.btn1_text || 'Book Appointment',
      btn2_text: slide.btn2_text || 'Learn More',
      btn2_link: slide.btn2_link || '/about',
      sort_order: slide.sort_order ?? 0
    });
  };

  const addNew = () => {
    setEditing(null);
    setForm({
      subtitle: 'YOUR SMILE IS OUR PRIDE',
      title: 'Lagankhel Dental Clinic',
      tagline: 'Best Dental Clinic in Lalitpur',
      background_image: '',
      overlay_opacity: 0.5,
      text_position: 'center',
      btn1_text: 'Book Appointment',
      btn2_text: 'Learn More',
      btn2_link: '/about',
      sort_order: slides.length
    });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="admin-hero">
      <h2>Hero Banner</h2>
      {message.text && <div className={`form-message ${message.type}`}>{message.text}</div>}
      <div className="admin-hero-list">
        {slides.map((s, i) => (
          <div key={s.id} className="admin-hero-item">
            <div className="admin-hero-preview" style={{ backgroundImage: `url(${s.background_image})` }} />
            <div>
              <strong>{s.title || 'Untitled'}</strong>
              <p>{s.tagline}</p>
            </div>
            <button className="btn-outline" onClick={() => editSlide(s)}>Edit</button>
          </div>
        ))}
      </div>
      <button className="btn-primary" onClick={addNew}>Add New Slide</button>

      {(editing || form.subtitle || form.background_image) && (
        <form className="admin-form" onSubmit={saveSlide}>
          <h3>{editing ? 'Edit Slide' : 'New Slide'}</h3>
          <label>Subtitle</label>
          <input value={form.subtitle} onChange={e => setForm({ ...form, subtitle: e.target.value })} />
          <label>Title</label>
          <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
          <label>Tagline</label>
          <input value={form.tagline} onChange={e => setForm({ ...form, tagline: e.target.value })} />
          <ImageUpload value={form.background_image} onChange={v => setForm({ ...form, background_image: v })} label="Background Image" required prefix="he" />
          <label>Overlay Opacity (0-1)</label>
          <input type="number" step="0.1" min="0" max="1" value={form.overlay_opacity} onChange={e => setForm({ ...form, overlay_opacity: e.target.value })} />
          <label>Text Position</label>
          <select value={form.text_position} onChange={e => setForm({ ...form, text_position: e.target.value })}>
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
          <label>Button 1 Text</label>
          <input value={form.btn1_text} onChange={e => setForm({ ...form, btn1_text: e.target.value })} />
          <label>Button 2 Text</label>
          <input value={form.btn2_text} onChange={e => setForm({ ...form, btn2_text: e.target.value })} />
          <label>Button 2 Link</label>
          <input value={form.btn2_link} onChange={e => setForm({ ...form, btn2_link: e.target.value })} />
          <label>Sort Order</label>
          <input type="number" value={form.sort_order} onChange={e => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} />
          <div className="admin-form-actions">
            <button type="submit" className="btn-primary">Save</button>
            <button type="button" className="btn-outline" onClick={() => { setEditing(null); setForm({}); }}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
}
