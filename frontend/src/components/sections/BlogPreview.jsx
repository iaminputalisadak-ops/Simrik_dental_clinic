import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API_URL = '/api';
const DEFAULT_POSTS = [
  { title: 'Jaw Alignment in Children for a Healthy Smile', date: 'February 15, 2026', category: 'Dental Braces', excerpt: 'A child\'s oral development plays a crucial role...', image_url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600', author: 'Lagankhel Dental Clinic' },
  { title: 'Full Mouth Dental Implants for a Youthful Facial Appearance', date: 'February 15, 2026', category: 'Dental Implants', excerpt: 'A beautiful smile is more than just aesthetics...', image_url: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600', author: 'Lagankhel Dental Clinic' },
  { title: 'Bleeding Gums vs Periodontitis: Key Differences', date: 'February 15, 2026', category: 'Gum Treatment', excerpt: 'Gum health is a crucial part of overall oral hygiene...', image_url: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600', author: 'Lagankhel Dental Clinic' },
];

function formatDate(d) {
  if (!d) return '';
  const date = new Date(d);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function BlogPreview() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/blog.php?limit=6`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.posts?.length) setPosts(data.posts);
        else setPosts(DEFAULT_POSTS);
      })
      .catch(() => setPosts(DEFAULT_POSTS));
  }, []);

  return (
    <section className="section blog-section blog-section-new">
      <div className="container">
        <p className="section-subtitle">Our Top Articles</p>
        <h2 className="section-title">Blog</h2>
        <div className="blog-cards-grid">
          {posts.slice(0, 6).map((post, i) => (
            <article key={post.id || i} className="blog-card-new">
              <Link to={post.slug ? `/blog/${post.slug}` : '/blog'} className="blog-card-link">
                <div className="blog-card-image">
                  <img src={post.image_url} alt={post.title} loading="lazy" />
                </div>
                <div className="blog-card-body">
                  <span className="blog-category">{post.category}</span>
                  <h3>{post.title}</h3>
                  <p className="blog-meta">{post.author} • {formatDate(post.created_at) || post.date}</p>
                  <p className="blog-excerpt">{post.excerpt}...</p>
                </div>
              </Link>
            </article>
          ))}
        </div>
        <Link to="/blog" className="btn-outline">View All Posts</Link>
      </div>
    </section>
  );
}
