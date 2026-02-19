import { useState, useEffect, lazy, Suspense } from 'react';
import SeoHead from '../components/SeoHead';
import BookAppointmentModal from '../components/BookAppointmentModal';
import Hero from '../components/sections/Hero';
import BookCta from '../components/sections/BookCta';
import Team from '../components/sections/Team';
import GallerySection from '../components/sections/GallerySection';
import BlogPreview from '../components/sections/BlogPreview';

const AboutSection = lazy(() => import('../components/sections/AboutSection'));
const WhyChooseUs = lazy(() => import('../components/sections/WhyChooseUs'));
const Services = lazy(() => import('../components/sections/Services'));
const Stats = lazy(() => import('../components/sections/Stats'));
const BeforeAfterSection = lazy(() => import('../components/sections/BeforeAfterSection'));

const HOME_API = '/api/home.php';

function SectionFallback() {
  return <div style={{ minHeight: 120 }} aria-hidden="true" />;
}

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [homeData, setHomeData] = useState({ critical: null, sections: null });

  useEffect(() => {
    const criticalPromise = fetch(`${HOME_API}?part=critical`).then((r) => r.json());
    const sectionsPromise = fetch(`${HOME_API}?part=sections`).then((r) => r.json());
    Promise.all([criticalPromise, sectionsPromise]).then(([critical, sections]) => {
      setHomeData({
        critical: critical?.success ? critical : null,
        sections: sections?.success ? sections : null,
      });
    }).catch(() => {});
  }, []);

  const c = homeData.critical || {};
  const s = homeData.sections || {};
  const heroSlides = c.hero?.success && c.hero?.slides?.length ? c.hero.slides : undefined;
  const aboutContent = c.about?.success && c.about?.content ? c.about.content : undefined;
  const whyContent = c.why_choose?.success && c.why_choose?.content ? c.why_choose.content : undefined;
  const servicesList = c.services?.success && c.services?.services?.length ? c.services.services : undefined;
  const teamMembers = s.team?.success && s.team?.members?.length ? s.team.members : undefined;
  const galleryImages = s.gallery?.success && s.gallery?.images?.length ? s.gallery.images : undefined;
  const blogPosts = s.blog?.success && s.blog?.posts?.length ? s.blog.posts : undefined;
  const beforeAfterCases = s.before_after?.success && s.before_after?.cases?.length ? s.before_after.cases : undefined;

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
