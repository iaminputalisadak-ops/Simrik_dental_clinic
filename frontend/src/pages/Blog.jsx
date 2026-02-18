import { useState, useEffect } from 'react';
import SeoHead from '../components/SeoHead';
import { Link } from 'react-router-dom';

const API_URL = '/api';
const DEFAULT_POSTS = [
  { title: 'Jaw Alignment in Children for a Healthy Smile', date: 'February 15, 2026', category: 'Dental Braces', excerpt: 'A child\'s oral development plays a crucial role...', image_url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600' },
  { title: 'Full Mouth Dental Implants', date: 'February 15, 2026', category: 'Dental Implants', excerpt: 'A beautiful smile is more than just aesthetics...', image_url: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600' },
  { title: 'Bleeding Gums vs Periodontitis', date: 'February 15, 2026', category: 'Gum Treatment', excerpt: 'Gum health is a crucial part of overall oral hygiene...', image_url: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600' },
];

function formatDate(d) {
  if (!d) return '';
  const date = new Date(d);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/blog.php`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.posts?.length) setPosts(data.posts);
        else setPosts(DEFAULT_POSTS);
      })
      .catch(() => setPosts(DEFAULT_POSTS));
  }, []);

  return (
    <div className="page blog-page">
      <SeoHead title="Blog" description="Dental health tips, treatment guides, and oral care advice from Lagankhel Dental Clinic in Lalitpur." path="/blog" />
      <section className="page-hero">
        <div className="container">
          <h1>Blog</h1>
          <p>Our Top Articles on Dental Health</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="blog-cards-grid">
            {posts.map((post, i) => (
              <article key={post.id || i} className="blog-card-new">
                <Link to={post.slug ? `/blog/${post.slug}` : '/blog'} className="blog-card-link">
                  <div className="blog-card-image">
                    <img src={post.image_url} alt={post.title} loading="lazy" />
                  </div>
                  <div className="blog-card-body">
                    <span className="blog-category">{post.category}</span>
                    <h3>{post.title}</h3>
                    <p className="blog-meta">{post.author || 'Lagankhel Dental Clinic'} • {formatDate(post.created_at) || post.date}</p>
                    <p className="blog-excerpt">{post.excerpt}...</p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
