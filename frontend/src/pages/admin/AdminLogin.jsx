import { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';

const API_URL = '/api/admin';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    import('./AdminDashboard').catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);
    try {
      const res = await fetch(`${API_URL}/login.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      const data = await res.json().catch(() => ({ success: false, message: 'Invalid response' }));
      if (data.success) {
        navigate('/admin');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      clearTimeout(timeoutId);
      if (err.name === 'AbortError') {
        setError('Request timed out. Is the backend running on port 8000?');
      } else {
        setError('Unable to connect. Start backend with: npm run start');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <h1>Admin Login</h1>
        <p className="admin-login-sub">Simrik Dental Clinic</p>
        {error && <div className="form-message error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="admin-login-hint">Default: admin / admin123</p>
      </div>
    </div>
  );
}
