import { useState, useEffect, lazy, Suspense } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';

const AdminHero = lazy(() => import('../../components/admin/AdminHero'));
const AdminGallery = lazy(() => import('../../components/admin/AdminGallery'));
const AdminAbout = lazy(() => import('../../components/admin/AdminAbout'));
const AdminAboutPage = lazy(() => import('../../components/admin/AdminAboutPage'));
const AdminWhyChoose = lazy(() => import('../../components/admin/AdminWhyChoose'));
const AdminServices = lazy(() => import('../../components/admin/AdminServices'));
const AdminTeam = lazy(() => import('../../components/admin/AdminTeam'));
const AdminBlog = lazy(() => import('../../components/admin/AdminBlog'));
const AdminContact = lazy(() => import('../../components/admin/AdminContact'));
const AdminBeforeAfter = lazy(() => import('../../components/admin/AdminBeforeAfter'));

const API_URL = '/api/admin';

function TabFallback() {
  return (
    <div className="admin-tab-loading">
      <div className="admin-loading-spinner" />
      <p>Loading...</p>
    </div>
  );
}

export default function AdminDashboard() {
  const [loggedIn, setLoggedIn] = useState(null);
  const [activeTab, setActiveTab] = useState('hero');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/login.php`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => setLoggedIn(data.logged_in))
      .catch(() => setLoggedIn(false));
  }, []);

  const handleLogout = async () => {
    await fetch(`${API_URL}/logout.php`, { credentials: 'include' });
    setLoggedIn(false);
    navigate('/admin/login');
  };

  if (loggedIn === false) return <Navigate to="/admin/login" replace />;

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <div className="admin-header-actions">
          <Link to="/" className="btn-outline">View Site</Link>
          <button onClick={handleLogout} className="btn-outline">Logout</button>
        </div>
      </header>
      <nav className="admin-tabs">
        <button className={activeTab === 'hero' ? 'active' : ''} onClick={() => setActiveTab('hero')}>Hero Banner</button>
        <button className={activeTab === 'gallery' ? 'active' : ''} onClick={() => setActiveTab('gallery')}>Gallery</button>
        <button className={activeTab === 'beforeafter' ? 'active' : ''} onClick={() => setActiveTab('beforeafter')}>Before-After</button>
        <button className={activeTab === 'about' ? 'active' : ''} onClick={() => setActiveTab('about')}>About (Home)</button>
        <button className={activeTab === 'aboutpage' ? 'active' : ''} onClick={() => setActiveTab('aboutpage')}>About Page</button>
        <button className={activeTab === 'why' ? 'active' : ''} onClick={() => setActiveTab('why')}>Why Choose Us</button>
        <button className={activeTab === 'services' ? 'active' : ''} onClick={() => setActiveTab('services')}>Services</button>
        <button className={activeTab === 'team' ? 'active' : ''} onClick={() => setActiveTab('team')}>Team</button>
        <button className={activeTab === 'blog' ? 'active' : ''} onClick={() => setActiveTab('blog')}>Blog</button>
        <button className={activeTab === 'contact' ? 'active' : ''} onClick={() => setActiveTab('contact')}>Contact & Map</button>
      </nav>
      <main className="admin-content">
        {loggedIn === null ? (
          <div className="admin-loading admin-verifying">
            <div className="admin-loading-spinner" />
            <p>Verifying session...</p>
          </div>
        ) : (
          <Suspense fallback={<TabFallback />}>
            {activeTab === 'hero' && <AdminHero />}
            {activeTab === 'gallery' && <AdminGallery />}
            {activeTab === 'beforeafter' && <AdminBeforeAfter />}
            {activeTab === 'about' && <AdminAbout />}
            {activeTab === 'aboutpage' && <AdminAboutPage />}
            {activeTab === 'why' && <AdminWhyChoose />}
            {activeTab === 'services' && <AdminServices />}
            {activeTab === 'team' && <AdminTeam />}
            {activeTab === 'blog' && <AdminBlog />}
            {activeTab === 'contact' && <AdminContact />}
          </Suspense>
        )}
      </main>
    </div>
  );
}
