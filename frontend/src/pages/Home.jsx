import { useState } from 'react';
import SeoHead from '../components/SeoHead';
import { Link } from 'react-router-dom';
import BookAppointmentModal from '../components/BookAppointmentModal';
import Hero from '../components/sections/Hero';
import AboutSection from '../components/sections/AboutSection';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import Services from '../components/sections/Services';
import Stats from '../components/sections/Stats';
import Team from '../components/sections/Team';
import BeforeAfterSection from '../components/sections/BeforeAfterSection';
import GallerySection from '../components/sections/GallerySection';
import BlogPreview from '../components/sections/BlogPreview';
import BookCta from '../components/sections/BookCta';

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <SeoHead title="Home" description="Lagankhel Dental Clinic - Best Dental Clinic in Lalitpur. Your smile is our pride. Quality dental care, orthodontics, root canal, and more. Book your appointment today." path="/" />
      <Hero onBookClick={() => setShowModal(true)} />
      <AboutSection />
      <WhyChooseUs />
      <Services />
      <Stats />
      <BeforeAfterSection />
      <Team />
      <GallerySection />
      <BlogPreview />
      <BookCta onBookClick={() => setShowModal(true)} />
      <BookAppointmentModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}
