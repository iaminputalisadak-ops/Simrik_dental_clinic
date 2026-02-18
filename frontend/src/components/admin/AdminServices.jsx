import { useState, useEffect } from 'react';
import ImageUpload from './ImageUpload';

const API_URL = '/api';

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', image_url: '', link: '/treatments', sort_order: 0 });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(true);

  const fetchServices = () => {
    fetch(`${API_URL}/admin/services.php`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => data.success && setServices(data.services || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => fetchServices(), []);

  const saveService = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    const payload = { ...form };
    if (editing) payload.id = editing.id;
    try {
      const res = await fetch(`${API_URL}/services.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'include'
      });
      const data = await res.json();
      if (data.success) {
        setMessage({ type: 'success', text: data.message });
        setEditing(null);
        setShowForm(false);
        setForm({ title: '', image_url: '', link: '/treatments', sort_order: 0 });
        fetchServices();
      } else setMessage({ type: 'error', text: data.message || 'Failed' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Unable to save' });
    }
  };

  const editService = (s) => {
    setShowForm(true);
    setEditing(s);
    setForm({
      title: s.title || '',
      image_url: s.image_url || '',
      link: s.link || '/treatments',
      sort_order: s.sort_order ?? 0
    });
  };

  const addNew = () => {
    setShowForm(true);
    setEditing(null);
    setForm({
      title: '',
      image_url: '',
      link: '/treatments',
      sort_order: services.length
    });
  };

  const removeService = async (id) => {
    if (!confirm('Remove this service?')) return;
    try {
      const res = await fetch(`${API_URL}/services.php?id=${id}`, { method: 'DELETE', credentials: 'include' });
      const data = await res.json();
      if (data.success) { setMessage({ type: 'success', text: data.message }); fetchServices(); }
      else setMessage({ type: 'error', text: data.message });
    } catch (err) {
      setMessage({ type: 'error', text: 'Unable to remove' });
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="admin-services">
      <h2>Dental Services</h2>
      {message.text && <div className={`form-message ${message.type}`}>{message.text}</div>}
      <div className="admin-services-grid">
        {services.map((s) => (
          <div key={s.id} className="admin-service-item">
            <div className="admin-service-preview" style={{ backgroundImage: `url(${s.image_url})` }} />
            <p><strong>{s.title}</strong></p>
            <div>
              <button className="btn-outline" onClick={() => editService(s)}>Edit</button>
              <button className="btn-outline" onClick={() => removeService(s.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <button className="btn-primary" onClick={addNew}>Add New Service</button>

      {showForm && (
        <form className="admin-form" onSubmit={saveService}>
          <h3>{editing ? 'Edit Service' : 'New Service'}</h3>
          <label>Title</label>
          <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
          <ImageUpload value={form.image_url} onChange={v => setForm({ ...form, image_url: v })} label="Image" required prefix="sv" />
          <label>Link (Learn More)</label>
          <input value={form.link} onChange={e => setForm({ ...form, link: e.target.value })} />
          <label>Sort Order</label>
          <input type="number" value={form.sort_order} onChange={e => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} />
          <div className="admin-form-actions">
            <button type="submit" className="btn-primary">Save</button>
            <button type="button" className="btn-outline" onClick={() => { setShowForm(false); setEditing(null); setForm({ title: '', image_url: '', link: '/treatments', sort_order: 0 }); }}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
}
