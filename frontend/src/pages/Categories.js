import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { getCategories } from '../utils/api';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getCategories().then(r => setCategories(r.data)).catch(() => {});
  }, []);

  const filtered = categories.filter(c =>
    c.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div style={{ minHeight: '100vh', padding: '40px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h1 style={{ fontSize: 36, marginBottom: 12 }}>All Categories</h1>
          <p style={{ color: '#a0a0c0', fontSize: 16, marginBottom: 28 }}>
            {categories.length} categories • 25,000+ products across all platforms
          </p>
          <div style={{ maxWidth: 400, margin: '0 auto', position: 'relative' }}>
            <FiSearch style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#6060a0' }} size={16} />
            <input
              className="input"
              placeholder="Search categories..."
              style={{ paddingLeft: 44 }}
              value={filter}
              onChange={e => setFilter(e.target.value)}
            />
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: 16
        }}>
          {filtered.map(cat => (
            <button
              key={cat.slug}
              onClick={() => navigate(`/category/${cat.slug}`)}
              style={{
                background: '#16162e', border: '1px solid #2a2a4a',
                borderRadius: 16, overflow: 'hidden', cursor: 'pointer',
                textAlign: 'left', transition: 'all 0.2s'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#FFD700';
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(255,215,0,0.1)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#2a2a4a';
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ height: 100, overflow: 'hidden', background: '#0d0d1f', position: 'relative' }}>
                <img
                  src={cat.image}
                  alt={cat.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.75 }}
                  onError={e => { e.target.style.display = 'none'; }}
                />
                <div style={{
                  position: 'absolute', top: 8, right: 8,
                  fontSize: 24, lineHeight: 1
                }}>{cat.icon}</div>
              </div>
              <div style={{ padding: '14px 16px' }}>
                <p style={{ fontWeight: 600, fontSize: 14, color: '#f0f0ff', marginBottom: 4 }}>{cat.name}</p>
                <p style={{ fontSize: 12, color: '#6060a0' }}>500+ products</p>
              </div>
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <p style={{ fontSize: 40, marginBottom: 12 }}>🔍</p>
            <p style={{ color: '#6060a0' }}>No categories match "{filter}"</p>
          </div>
        )}
      </div>
    </div>
  );
}
