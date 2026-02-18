import { useState, useEffect } from 'react';

const API_URL = '/api';
const DEFAULT_IMAGES = [
  'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400',
  'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400',
  'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400',
  'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=400',
  'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=400',
  'https://images.unsplash.com/photo-1629909615782-3a4c1b24a8f2?w=400',
];

export default function GallerySection() {
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
    <section className="section gallery-section">
      <div className="container">
        <p className="section-subtitle">Our images</p>
        <h2 className="section-title">Gallery</h2>
        <p className="gallery-subtitle">Our Clinic Showcasing</p>
        <div className="gallery-grid">
          {images.map((img, i) => (
            <div key={img.id || i} className="gallery-item gallery-item-animate">
              <img src={img.image_url} alt={img.title || `Clinic ${i + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
