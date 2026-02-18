import { useState, useEffect } from 'react';
import RichTextEditor from './RichTextEditor';
import ImageUpload from './ImageUpload';

const API_URL = '/api';

export default function AdminAboutPage() {
  const [content, setContent] = useState({
    section_heading: '', page_title: '', main_image_url: '', intro_paragraph: '',
    cta_banner_heading: '', cta_banner_text: '', cta_banner_link: '',
    why_heading: '', core_value_text: '', facilities_text: '', quality_text: '',
    final_cta_text: '', final_cta_link: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/about_page.php`)
      .then(res => res.json())
      .then(data => data.success && data.content && setContent(data.content))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    try {
      const res = await fetch(`${API_URL}/about_page.php`, {
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
    <div className="admin-about-page">
      <h2>About Page</h2>
      {message.text && <div className={`form-message ${message.type}`}>{message.text}</div>}
      <form className="admin-form" onSubmit={handleSubmit}>
        <label>Section Heading</label>
        <input value={content.section_heading} onChange={e => setContent({ ...content, section_heading: e.target.value })} />
        <label>Page Title</label>
        <input value={content.page_title} onChange={e => setContent({ ...content, page_title: e.target.value })} />
        <ImageUpload value={content.main_image_url} onChange={v => setContent({ ...content, main_image_url: v })} label="Main Image" prefix="ap" />
        <label>Intro Paragraph</label>
        <RichTextEditor value={content.intro_paragraph} onChange={v => setContent({ ...content, intro_paragraph: v })} placeholder="Clinic introduction..." simple />
        <h4>CTA Banner (Invisalign)</h4>
        <label>Banner Heading</label>
        <input value={content.cta_banner_heading} onChange={e => setContent({ ...content, cta_banner_heading: e.target.value })} />
        <label>Banner Text (intro only; “Click here...” link is added if link URL is set)</label>
        <textarea value={content.cta_banner_text} onChange={e => setContent({ ...content, cta_banner_text: e.target.value })} rows="2" placeholder="e.g. Just take a smiling selfie and we'll show you..." />
        <label>Banner Link</label>
        <input value={content.cta_banner_link} onChange={e => setContent({ ...content, cta_banner_link: e.target.value })} placeholder="https://..." />
        <h4>Why Section</h4>
        <label>Why Heading</label>
        <input value={content.why_heading} onChange={e => setContent({ ...content, why_heading: e.target.value })} />
        <label>Core Value Block (blue border)</label>
        <RichTextEditor value={content.core_value_text} onChange={v => setContent({ ...content, core_value_text: v })} placeholder="Core values..." simple />
        <label>Facilities Paragraph</label>
        <textarea value={content.facilities_text} onChange={e => setContent({ ...content, facilities_text: e.target.value })} rows="3" />
        <label>Quality Paragraph</label>
        <textarea value={content.quality_text} onChange={e => setContent({ ...content, quality_text: e.target.value })} rows="2" />
        <h4>Final CTA</h4>
        <label>Final CTA Text</label>
        <textarea value={content.final_cta_text} onChange={e => setContent({ ...content, final_cta_text: e.target.value })} rows="2" />
        <label>Final CTA Link</label>
        <input value={content.final_cta_link} onChange={e => setContent({ ...content, final_cta_link: e.target.value })} />
        <button type="submit" className="btn-primary">Save</button>
      </form>
    </div>
  );
}
