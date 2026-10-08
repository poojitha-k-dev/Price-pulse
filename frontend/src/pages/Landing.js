import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiMapPin, FiTrendingUp, FiZap, FiChevronRight } from 'react-icons/fi';
import { getCategories, getFeaturedProducts, getPopularProducts } from '../utils/api';
import ProductCard from '../components/ProductCard';
import LocationModal from '../components/LocationModal';
import toast from 'react-hot-toast';

const HERO_CATEGORIES = [
  { name: 'Vegetables', slug: 'fresh-vegetables', icon: '🥦' },
  { name: 'Fruits', slug: 'fresh-fruits', icon: '🍎' },
  { name: 'Dairy', slug: 'dairy-eggs', icon: '🥛' },
  { name: 'Snacks', slug: 'snacks-chips', icon: '🍟' },
  { name: 'Beverages', slug: 'beverages', icon: '🧃' },
  { name: 'Rice', slug: 'rice-grains', icon: '🌾' },
  { name: 'Spices', slug: 'spices-masala', icon: '🌶️' },
  { name: 'Personal Care', slug: 'personal-care', icon: '🧴' },
];

export default function Landing() {
  const [q, setQ] = useState('');
  const [location, setLocation] = useState(null);
  const [showLocation, setShowLocation] = useState(false);
  const [categories, setCategories] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [popular, setPopular] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Ask for location on first visit
    const loc = localStorage.getItem('location');
    if (loc) setLocation(JSON.parse(loc));
    else setTimeout(() => setShowLocation(true), 2000);

    getCategories().then(r => setCategories(r.data.slice(0, 50))).catch(() => {});
    getFeaturedProducts(8).then(r => setFeatured(r.data)).catch(() => {});
    getPopularProducts(8).then(r => setPopular(r.data)).catch(() => {});
  }, []);

  const handleLocation = (loc) => {
    setLocation(loc);
    localStorage.setItem('location', JSON.stringify(loc));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (q.trim()) navigate(`/search?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      {showLocation && <LocationModal onClose={() => setShowLocation(false)} onLocation={handleLocation} />}

      {/* ── Hero ─────────────────────────────────── */}
      <section className="hero-gradient" style={{ padding: '80px 0 60px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          {/* Location bar */}
          <button
            onClick={() => setShowLocation(true)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: '#16162e', border: '1px solid #2a2a4a',
              borderRadius: 20, padding: '8px 16px', cursor: 'pointer',
              color: '#a0a0c0', fontSize: 13, marginBottom: 32,
              transition: 'border-color 0.2s'
            }}
          >
            <FiMapPin size={14} color="#FFD700" />
            <span>{location ? `📍 ${location.city || location.pincode}` : 'Set your location'}</span>
          </button>

          {/* Headline */}
          <h1 style={{ fontSize: 'clamp(36px, 6vw, 72px)', lineHeight: 1.1, marginBottom: 20 }}>
            Compare Grocery Prices<br />
            <span className="gradient-text">Across All Platforms</span>
          </h1>

          <p style={{ fontSize: 18, color: '#a0a0c0', marginBottom: 40, maxWidth: 520, margin: '0 auto 40px' }}>
            Find the best deals on Blinkit, Zepto & Swiggy Instamart — all in one place. Save money on every order.
          </p>

          {/* Search bar */}
          <form onSubmit={handleSearch} style={{ maxWidth: 640, margin: '0 auto 48px', position: 'relative' }}>
            <div style={{
              display: 'flex', background: '#13132a',
              borderRadius: 16, border: '1px solid #3a3a6a',
              boxShadow: '0 0 40px rgba(255,215,0,0.08)',
              overflow: 'hidden'
            }}>
              <FiSearch size={20} color="#6060a0" style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)' }} />
              <input
                value={q}
                onChange={e => setQ(e.target.value)}
                placeholder="Search for milk, bread, tomatoes..."
                style={{
                  flex: 1, background: 'none', border: 'none', color: '#f0f0ff',
                  padding: '18px 20px 18px 52px', fontSize: 16, outline: 'none',
                  fontFamily: 'Space Grotesk, sans-serif'
                }}
              />
              <button type="submit" className="btn-primary" style={{ borderRadius: '0 15px 15px 0', padding: '0 28px', fontSize: 15 }}>
                Search
              </button>
            </div>

            {/* Quick searches */}
            <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
              {['Milk', 'Onion', 'Rice', 'Bread', 'Eggs', 'Paneer'].map(term => (
                <button key={term} onClick={() => navigate(`/search?q=${term}`)} style={{
                  background: '#ffffff08', border: '1px solid #ffffff15', color: '#a0a0c0',
                  borderRadius: 20, padding: '4px 14px', fontSize: 13, cursor: 'pointer'
                }}>{term}</button>
              ))}
            </div>
          </form>

          {/* Platform logos */}
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { name: 'Blinkit', color: '#f8cb06', logo: '⚡', desc: 'Fastest delivery' },
              { name: 'Zepto', color: '#8b5cf6', logo: '🟣', desc: 'Best prices' },
              { name: 'Swiggy Instamart', color: '#fc8019', logo: '🟠', desc: 'Wide selection' }
            ].map(p => (
              <div key={p.name} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                background: `${p.color}10`, border: `1px solid ${p.color}30`,
                borderRadius: 12, padding: '10px 20px'
              }}>
                <span style={{ fontSize: 20 }}>{p.logo}</span>
                <div>
                  <p style={{ fontWeight: 700, color: p.color, fontSize: 14 }}>{p.name}</p>
                  <p style={{ color: '#6060a0', fontSize: 11 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quick categories ─────────────────────── */}
      <section style={{ padding: '40px 0', borderBottom: '1px solid #1a1a3a' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
            gap: 12
          }}>
            {HERO_CATEGORIES.map(cat => (
              <button key={cat.slug} onClick={() => navigate(`/category/${cat.slug}`)} style={{
                background: '#16162e', border: '1px solid #2a2a4a',
                borderRadius: 14, padding: '16px 8px', cursor: 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                transition: 'all 0.2s', color: '#f0f0ff'
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#FFD700'; e.currentTarget.style.background = '#FFD70010'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#2a2a4a'; e.currentTarget.style.background = '#16162e'; }}
              >
                <span style={{ fontSize: 28 }}>{cat.icon}</span>
                <span style={{ fontSize: 12, fontWeight: 500 }}>{cat.name}</span>
              </button>
            ))}
            <button onClick={() => navigate('/categories')} style={{
              background: '#0d0d1f', border: '1px dashed #2a2a4a',
              borderRadius: 14, padding: '16px 8px', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
              color: '#6060a0', transition: 'all 0.2s'
            }}>
              <FiChevronRight size={28} />
              <span style={{ fontSize: 12 }}>View All</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── All 50 categories grid ───────────────── */}
      {categories.length > 0 && (
        <section className="section">
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
              <div>
                <h2 style={{ fontSize: 28, marginBottom: 6 }}>All Categories</h2>
                <p style={{ color: '#a0a0c0', fontSize: 14 }}>{categories.length} categories • 25,000+ products</p>
              </div>
              <button onClick={() => navigate('/categories')} style={{
                color: '#FFD700', background: 'none', border: '1px solid #FFD70040',
                borderRadius: 10, padding: '8px 16px', cursor: 'pointer', fontSize: 13
              }}>View All</button>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
              gap: 12
            }}>
              {categories.map(cat => (
                <button key={cat.slug} onClick={() => navigate(`/category/${cat.slug}`)} style={{
                  background: '#16162e', border: '1px solid #2a2a4a', borderRadius: 14,
                  overflow: 'hidden', cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left'
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#3a3a6a'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#2a2a4a'; e.currentTarget.style.transform = 'none'; }}
                >
                  <div style={{ height: 80, overflow: 'hidden', background: '#0d0d1f' }}>
                    <img src={cat.image} alt={cat.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
                      onError={e => e.target.style.display = 'none'} />
                  </div>
                  <div style={{ padding: '10px 12px' }}>
                    <div style={{ fontSize: 16, marginBottom: 4 }}>{cat.icon}</div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#f0f0ff', lineHeight: 1.3 }}>{cat.name}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Featured Products ────────────────────── */}
      {featured.length > 0 && (
        <section className="section" style={{ borderTop: '1px solid #1a1a3a' }}>
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <FiZap color="#FFD700" size={20} />
                  <h2 style={{ fontSize: 28 }}>Today's Best Deals</h2>
                </div>
                <p style={{ color: '#a0a0c0', fontSize: 14 }}>Biggest savings across platforms right now</p>
              </div>
            </div>
            <div className="product-grid">
              {featured.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* ── Popular Products ─────────────────────── */}
      {popular.length > 0 && (
        <section className="section" style={{ borderTop: '1px solid #1a1a3a' }}>
          <div className="container">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 28 }}>
              <FiTrendingUp color="#22c55e" size={20} />
              <h2 style={{ fontSize: 28 }}>Most Popular</h2>
            </div>
            <div className="product-grid">
              {popular.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* ── Footer ──────────────────────────────── */}
      <footer style={{ borderTop: '1px solid #1a1a3a', padding: '40px 0', background: '#0d0d1f' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ color: '#6060a0', fontSize: 13 }}>
            Grocio compares prices from Blinkit, Zepto & Swiggy Instamart.
            Prices may vary. Always verify on the platform before purchasing.
          </p>
          <p style={{ color: '#404060', fontSize: 12, marginTop: 8 }}>
            © 2024 Grocio. Made with ❤️ for smart shoppers in India.
          </p>
        </div>
      </footer>
    </div>
  );
}
