import { useState, useEffect, useRef } from 'react';

const API_URL = '/api';

export default function AdminBeforeAfter() {
  const [cases, setCases] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ before_image_url: '', after_image_url: '', title: '', category: 'general', sort_order: 0 });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState({ before: false, after: false });
  const beforeInputRef = useRef(null);
  const afterInputRef = useRef(null);

  const uploadFile = async (file, field) => {
    if (!file || !file.type.startsWith('image/')) {
      setMessage({ type: 'error', text: 'Please select an image (JPG, PNG, GIF, WebP)' });
      return;
    }
    setUploading(prev => ({ ...prev, [field]: true }));
    setMessage({ type: '', text: '' });
    const fd = new FormData();
    fd.append('file', file);
    fd.append('prefix', 'ba');
    try {
      const res = await fetch(`${API_URL}/upload.php`, {
        method: 'POST',
        body: fd,
        credentials: 'include'
      });
      const data = await res.json();
      if (data.success) {
        setForm(prev => ({ ...prev, [field === 'before' ? 'before_image_url' : 'after_image_url']: data.url }));
      } else {
        setMessage({ type: 'error', text: data.message || 'Upload failed' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Upload failed. Is the PHP server running?' });
    } finally {
      setUploading(prev => ({ ...prev, [field]: false }));
    }
  };

  const fetchCases = () => {
    fetch(`${API_URL}/admin/before_after.php`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => data.success && setCases(data.cases || []))
      .catch(() => setCases([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => fetchCases(), []);

  const saveCase = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    const payload = { ...form };
    if (editing) payload.id = editing.id;
    try {
      const res = await fetch(`${API_URL}/before_after.php`, {
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
        setForm({ before_image_url: '', after_image_url: '', title: '', category: 'general', sort_order: 0 });
        fetchCases();
      } else setMessage({ type: 'error', text: data.message || 'Failed' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Unable to save' });
    }
  };

  const editCase = (c) => {
    setShowForm(true);
    setEditing(c);
    setForm({
      before_image_url: c.before_image_url || '',
      after_image_url: c.after_image_url || '',
      title: c.title || '',
      category: c.category || 'general',
      sort_order: c.sort_order ?? 0
    });
  };

  const addNew = () => {
    setShowForm(true);
    setEditing(null);
    setForm({
      before_image_url: '',
      after_image_url: '',
      title: '',
      category: 'general',
      sort_order: cases.length
    });
  };

  const removeCase = async (id) => {
    if (!confirm('Remove this case?')) return;
    try {
      const res = await fetch(`${API_URL}/before_after.php?id=${id}`, { method: 'DELETE', credentials: 'include' });
      const data = await res.json();
      if (data.success) { setMessage({ type: 'success', text: data.message }); fetchCases(); }
      else setMessage({ type: 'error', text: data.message });
    } catch (err) {
      setMessage({ type: 'error', text: 'Unable to remove' });
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="admin-before-after">
      <h2>Before - After Cases</h2>
      {message.text && <div className={`form-message ${message.type}`}>{message.text}</div>}
      <div className="admin-before-after-grid">
        {cases.map((c) => (
          <div key={c.id} className="admin-ba-item">
            <div className="admin-ba-preview">
              <div className="admin-ba-preview-before" style={{ backgroundImage: `url(${c.before_image_url})` }} />
              <div className="admin-ba-preview-after" style={{ backgroundImage: `url(${c.after_image_url})` }} />
            </div>
            <p>{c.title || 'Untitled'}</p>
            <div>
              <button className="btn-outline" onClick={() => editCase(c)}>Edit</button>
              <button className="btn-outline" onClick={() => removeCase(c.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      <button className="btn-primary" onClick={addNew}>Add New Case</button>

      {showForm && (
        <form className="admin-form" onSubmit={saveCase}>
          <h3>{editing ? 'Edit Case' : 'New Case'}</h3>
          <label>Before Image</label>
          <div className="admin-upload-row">
            <input
              ref={beforeInputRef}
              type="file"
              accept="image/jpeg,image/png,image/gif,image/webp"
              onChange={e => { const f = e.target.files?.[0]; if (f) uploadFile(f, 'before'); e.target.value = ''; }}
              style={{ display: 'none' }}
            />
            <button type="button" className="btn-outline" onClick={() => beforeInputRef.current?.click()} disabled={uploading.before}>
              {uploading.before ? 'Uploading...' : 'Choose Before Image'}
            </button>
            {form.before_image_url && <img src={form.before_image_url} alt="Before preview" className="admin-upload-preview" />}
          </div>
          <label>After Image</label>
          <div className="admin-upload-row">
            <input
              ref={afterInputRef}
              type="file"
              accept="image/jpeg,image/png,image/gif,image/webp"
              onChange={e => { const f = e.target.files?.[0]; if (f) uploadFile(f, 'after'); e.target.value = ''; }}
              style={{ display: 'none' }}
            />
            <button type="button" className="btn-outline" onClick={() => afterInputRef.current?.click()} disabled={uploading.after}>
              {uploading.after ? 'Uploading...' : 'Choose After Image'}
            </button>
            {form.after_image_url && <img src={form.after_image_url} alt="After preview" className="admin-upload-preview" />}
          </div>
          <label>Title</label>
          <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g. Dental Restoration" />
          <label>Category</label>
          <input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
          <label>Sort Order</label>
          <input type="number" value={form.sort_order} onChange={e => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} />
          <div className="admin-form-actions">
            <button type="submit" className="btn-primary" disabled={!form.before_image_url || !form.after_image_url}>Save</button>
            <button type="button" className="btn-outline" onClick={() => { setShowForm(false); setEditing(null); setForm({ before_image_url: '', after_image_url: '', title: '', category: 'general', sort_order: 0 }); }}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
}
