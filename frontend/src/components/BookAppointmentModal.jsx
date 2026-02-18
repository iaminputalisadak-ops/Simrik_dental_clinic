import { useState } from 'react';

const API_URL = '/api';

const services = [
  'Orthodontics (Braces & Aligners)',
  'Restorative Dentistry (Root Canal & Fillings)',
  'Oral Surgery (Extractions)',
  'Cosmetic Dentistry (Veneers & Smile Design)',
  'Pediatric Dentistry',
  'Dental Implant & Prosthetics',
  'Gum Treatment',
  'General Checkup',
];

const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '6:00 PM'
];

export default function BookAppointmentModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    patient_name: '',
    email: '',
    phone: '',
    appointment_date: '',
    appointment_time: '',
    service: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });
    
    try {
      const res = await fetch(`${API_URL}/appointments.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      
      if (data.success) {
        setMessage({ type: 'success', text: data.message });
        setFormData({ patient_name: '', email: '', phone: '', appointment_date: '', appointment_time: '', service: '', message: '' });
        setTimeout(() => { onClose(); setMessage({ type: '', text: '' }); }, 2000);
      } else {
        setMessage({ type: 'error', text: data.message || 'Something went wrong' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Unable to connect. Please check if the backend server is running.' });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">&times;</button>
        <h2>Book Your Appointment</h2>
        {message.text && (
          <div className={`form-message ${message.type}`}>{message.text}</div>
        )}
        <form onSubmit={handleSubmit}>
          <input type="text" name="patient_name" placeholder="Full Name *" required value={formData.patient_name} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email *" required value={formData.email} onChange={handleChange} />
          <input type="tel" name="phone" placeholder="Phone *" required value={formData.phone} onChange={handleChange} />
          <input type="date" name="appointment_date" required value={formData.appointment_date} onChange={handleChange} min={new Date().toISOString().split('T')[0]} />
          <select name="appointment_time" required value={formData.appointment_time} onChange={handleChange}>
            <option value="">Select Time *</option>
            {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <select name="service" required value={formData.service} onChange={handleChange}>
            <option value="">Select Service *</option>
            {services.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <textarea name="message" placeholder="Message (optional)" rows="3" value={formData.message} onChange={handleChange}></textarea>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Booking...' : 'Book Appointment'}
          </button>
        </form>
      </div>
    </div>
  );
}
