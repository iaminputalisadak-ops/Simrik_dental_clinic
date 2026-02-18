import { useState, useEffect } from 'react';
import SeoHead from '../components/SeoHead';

const API_URL = '/api';
const DEFAULT_IMAGES = [
  'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600',
  'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600',
  'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600',
  'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=600',
  'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=600',
  'https://images.unsplash.com/photo-1629909615782-3a4c1b24a8f2?w=600',
];

export default function Gallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/gallery.php`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.images?.length) setImages(data.images);
        else setImages(DEFAULT_IMAGES.map((url, i) => ({ image_url: url, title: `Clinic ${i + 1}` })));
      })
      .catch(() => setImages(DEFAULT_IMAGES.map((url, i) => ({ image_url: url, title: `Clinic ${i + 1}` }))));
  }, []);

  return (
    <div className="page gallery-page">
      <SeoHead title="Gallery" description="View photos of Lagankhel Dental Clinic - our facilities, equipment, and patient care environment in Lalitpur." path="/gallery" />
      <section className="page-hero">
        <div className="container">
          <h1>Gallery</h1>
          <p>Our Clinic Showcasing</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="gallery-grid gallery-page-grid">
            {images.map((img, i) => (
              <div key={img.id || i} className="gallery-item">
                <img src={img.image_url} alt={img.title || `Clinic ${i + 1}`} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
