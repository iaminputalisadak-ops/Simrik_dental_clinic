import { useState, useEffect } from 'react';

const API_URL = '/api';

export default function AdminContact() {
  const [settings, setSettings] = useState({
    contact_phone: '', contact_landline: '', contact_address: '', opening_hours: '', map_embed_url: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/settings.php`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.settings) setSettings({ ...settings, ...data.settings });
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    try {
      const res = await fetch(`${API_URL}/settings.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
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
    <div className="admin-contact">
      <h2>Contact & Map</h2>
      {message.text && <div className={`form-message ${message.type}`}>{message.text}</div>}
      <form className="admin-form" onSubmit={handleSubmit}>
        <label>Contact Phone</label>
        <input value={settings.contact_phone} onChange={e => setSettings({ ...settings, contact_phone: e.target.value })} />
        <label>Landline</label>
        <input value={settings.contact_landline} onChange={e => setSettings({ ...settings, contact_landline: e.target.value })} />
        <label>Address</label>
        <input value={settings.contact_address} onChange={e => setSettings({ ...settings, contact_address: e.target.value })} />
        <label>Opening Hours</label>
        <input value={settings.opening_hours} onChange={e => setSettings({ ...settings, opening_hours: e.target.value })} placeholder="Sunday - Friday, 10:00 AM - 7:00 PM" />
        <label>Map Embed URL</label>
        <input value={settings.map_embed_url} onChange={e => setSettings({ ...settings, map_embed_url: e.target.value })} placeholder="https://www.google.com/maps/embed?pb=..." />
        <p className="admin-form-hint">Get embed link: Google Maps → Share → Embed a map → Copy iframe src URL</p>
        <button type="submit" className="btn-primary">Save</button>
      </form>
    </div>
  );
}
