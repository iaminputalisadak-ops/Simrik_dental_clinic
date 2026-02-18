import { useState, useEffect, lazy, Suspense } from 'react';
import SeoHead from '../components/SeoHead';
import BookAppointmentModal from '../components/BookAppointmentModal';
import Hero from '../components/sections/Hero';
import BookCta from '../components/sections/BookCta';

const AboutSection = lazy(() => import('../components/sections/AboutSection'));
const WhyChooseUs = lazy(() => import('../components/sections/WhyChooseUs'));
const Services = lazy(() => import('../components/sections/Services'));
const Stats = lazy(() => import('../components/sections/Stats'));
const Team = lazy(() => import('../components/sections/Team'));
const BeforeAfterSection = lazy(() => import('../components/sections/BeforeAfterSection'));
const GallerySection = lazy(() => import('../components/sections/GallerySection'));
const BlogPreview = lazy(() => import('../components/sections/BlogPreview'));

const HOME_API = '/api/home.php';

function SectionFallback() {
  return <div style={{ minHeight: 120 }} aria-hidden="true" />;
}

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [homeData, setHomeData] = useState(null);

  useEffect(() => {
    fetch(HOME_API)
      .then(res => res.json())
      .then(data => data.success && setHomeData(data))
      .catch(() => {});
  }, []);

  const h = homeData || {};
  const heroSlides = h.hero?.success && h.hero?.slides?.length ? h.hero.slides : undefined;
  const aboutContent = h.about?.success && h.about?.content ? h.about.content : undefined;
  const whyContent = h.why_choose?.success && h.why_choose?.content ? h.why_choose.content : undefined;
  const servicesList = h.services?.success && h.services?.services?.length ? h.services.services : undefined;
  const teamMembers = h.team?.success && h.team?.members?.length ? h.team.members : undefined;
  const galleryImages = h.gallery?.success && h.gallery?.images?.length ? h.gallery.images : undefined;
  const blogPosts = h.blog?.success && h.blog?.posts?.length ? h.blog.posts : undefined;
  const beforeAfterCases = h.before_after?.success && h.before_after?.cases?.length ? h.before_after.cases : undefined;

  return (
    <>
      <SeoHead title="Home" description="Simrik Dental Clinic - Best Dental Clinic in Lalitpur. Your smile is our pride. Quality dental care, orthodontics, root canal, and more. Book your appointment today." path="/" />
      <Hero onBookClick={() => setShowModal(true)} initialSlides={heroSlides} />
      <Suspense fallback={<SectionFallback />}>
        <AboutSection initialContent={aboutContent} />
        <WhyChooseUs initialContent={whyContent} />
        <Services initialServices={servicesList} />
        <Stats />
        <BeforeAfterSection initialCases={beforeAfterCases} />
        <Team initialMembers={teamMembers} />
        <GallerySection initialImages={galleryImages} />
        <BlogPreview initialPosts={blogPosts} />
      </Suspense>
      <BookCta onBookClick={() => setShowModal(true)} />
      <BookAppointmentModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}
