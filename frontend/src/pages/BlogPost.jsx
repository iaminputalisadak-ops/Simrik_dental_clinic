import { useState, useEffect } from 'react';
import SeoHead from '../components/SeoHead';
import { useParams, Link } from 'react-router-dom';

const API_URL = '/api';

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/blog.php?slug=${encodeURIComponent(slug)}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.post) setPost(data.post);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="page"><div className="container"><p>Loading...</p></div></div>;
  if (!post) return <div className="page"><div className="container"><p>Post not found.</p><Link to="/blog">Back to Blog</Link></div></div>;

  return (
    <div className="page blog-post-page">
      {post && <SeoHead title={post.title} description={post.excerpt || post.title} path={`/blog/${post.slug}`} image={post.image_url} type="article" />}
      <article className="blog-post-full">
        <div className="container">
          <Link to="/blog" className="blog-back">← Back to Blog</Link>
          <header>
            <span className="blog-post-category">{post.category}</span>
            <h1>{post.title}</h1>
            <p className="blog-post-meta">{post.author} • {post.date}</p>
          </header>
          {post.image_url && (
            <div className="blog-post-image">
              <img src={post.image_url} alt={post.title} />
            </div>
          )}
          <div className="blog-post-content" dangerouslySetInnerHTML={{ __html: post.content || '' }} />
        </div>
      </article>
    </div>
  );
}
