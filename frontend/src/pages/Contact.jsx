import { useState, useEffect } from 'react';
import SeoHead from '../components/SeoHead';
import BookAppointmentModal from '../components/BookAppointmentModal';

const API_URL = '/api';
const DEFAULT = {
  contact_address: 'Lagankhel, Lalitpur, Nepal',
  contact_phone: '+977 9800000000',
  contact_landline: '01-1234567',
  opening_hours: 'Sunday - Friday, 10:00 AM - 7:00 PM',
  map_embed_url: ''
};

export default function Contact() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [settings, setSettings] = useState(DEFAULT);

  useEffect(() => {
    fetch(`${API_URL}/settings.php`)
      .then(res => res.json())
      .then(data => data.success && data.settings && setSettings({ ...DEFAULT, ...data.settings }))
      .catch(() => {});
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });
    try {
      const res = await fetch(`${API_URL}/contact.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setMessage({ type: 'success', text: data.message });
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setMessage({ type: 'error', text: data.message || 'Something went wrong' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Unable to connect. Please check if the backend server is running.' });
    } finally {
      setLoading(false);
    }
  };

  const mapUrl = settings.map_embed_url?.trim();
  const isEmbedUrl = mapUrl && (mapUrl.includes('embed') || mapUrl.includes('iframe'));

  return (
    <div className="page contact-page">
      <SeoHead title="Contact Us" description="Contact Lagankhel Dental Clinic in Lalitpur. Call us, visit our clinic, or book an appointment online. We're here for your dental care." path="/contact" />
      <section className="page-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>Get in touch with our team</p>
        </div>
      </section>
      <section className="section contact-section">
        <div className="container contact-grid">
          <div className="contact-info">
            <h3>Get in Touch</h3>
            <div className="contact-details">
              <p><strong>Our Location</strong><br />{settings.contact_address}</p>
              <p><strong>Call Today</strong><br /><a href={`tel:${settings.contact_phone?.replace(/\s/g, '')}`}>{settings.contact_phone}</a></p>
              <p><strong>Landline</strong><br />{settings.contact_landline}</p>
              <p><strong>Opening Hours</strong><br />{settings.opening_hours}</p>
            </div>
            {mapUrl && (
              <div className="contact-map-wrap">
                {isEmbedUrl ? (
                  <iframe
                    src={mapUrl}
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Clinic location"
                  />
                ) : (
                  <a href={mapUrl.startsWith('http') ? mapUrl : `https://www.google.com/maps/search/${encodeURIComponent(mapUrl)}`} target="_blank" rel="noopener noreferrer" className="contact-map-link">
                    View on Map
                  </a>
                )}
              </div>
            )}
          </div>
          <div className="contact-form-wrap">
            <h3>Send us a Message</h3>
            {message.text && <div className={`form-message ${message.type}`}>{message.text}</div>}
            <form onSubmit={handleContactSubmit}>
              <input type="text" name="name" placeholder="Name *" required value={formData.name} onChange={handleChange} />
              <input type="email" name="email" placeholder="Email *" required value={formData.email} onChange={handleChange} />
              <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
              <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} />
              <textarea name="message" placeholder="Message *" rows="5" required value={formData.message} onChange={handleChange}></textarea>
              <button type="submit" className="btn-primary" disabled={loading}>{loading ? 'Sending...' : 'Send Message'}</button>
            </form>
            <p className="or-book">or</p>
            <button className="btn-outline" onClick={() => setShowModal(true)}>Book Appointment</button>
          </div>
        </div>
      </section>
      <BookAppointmentModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
