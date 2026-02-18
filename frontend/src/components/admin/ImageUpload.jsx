import { useState, useRef } from 'react';

const API_URL = '/api';

export default function ImageUpload({ value, onChange, label = 'Image', required = false, prefix = 'img' }) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef(null);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    fd.append('prefix', prefix);
    try {
      const res = await fetch(`${API_URL}/upload.php`, {
        method: 'POST',
        body: fd,
        credentials: 'include'
      });
      const data = await res.json();
      if (data.success) onChange(data.url);
    } catch (err) {}
    setUploading(false);
    e.target.value = '';
  };

  return (
    <div className="admin-upload-field">
      <label>{label}</label>
      <div className="admin-upload-row">
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp"
          onChange={handleUpload}
          style={{ display: 'none' }}
        />
        <button type="button" className="btn-outline" onClick={() => inputRef.current?.click()} disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload Image'}
        </button>
        {value && <img src={value} alt="Preview" className="admin-upload-preview" />}
      </div>
      {required && !value && <small className="admin-upload-hint">Required</small>}
    </div>
  );
}
