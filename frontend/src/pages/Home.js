import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, MapPin, TrendingDown, Star, Clock, ChevronRight, Zap } from 'lucide-react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import LocationModal from '../components/LocationModal';

export default function Home() {
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState([]);
  const [deals, setDeals] = useState([]);
  const [location, setLocation] = useState(null);
  const [showLocation, setShowLocation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/products/categories').then(r => setCategories(r.data)).catch(() => {});
    axios.get('/api/products/special/deals').then(r => setDeals(r.data)).catch(() => {});
    const saved = localStorage.getItem('userLocation');
    if (saved) setLocation(JSON.parse(saved));
    else setTimeout(() => setShowLocation(true), 1500);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) navigate(`/search?q=${encodeURIComponent(search.trim())}`);
  };

  const platformBadges = [
    { name: 'Blinkit', color: '#f8de3b', text: '#000', emoji: '🟡', time: '10 mins' },
    { name: 'Zepto', color: '#8b5cf6', text: '#fff', emoji: '🟣', time: '10 mins' },
    { name: 'Swiggy', color: '#fc8019', text: '#fff', emoji: '🟠', time: '15 mins' }
  ];

  return (
    <div style={{ minHeight: '100vh' }}>
      {showLocation && <LocationModal onClose={() => setShowLocation(false)} onSet={setLocation} />}

      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #14532d 0%, #15803d 40%, #16a34a 70%, #22c55e 100%)',
        padding: '60px 16px 80px', position: 'relative', overflow: 'hidden'
      }}>
        {/* Background decorations */}
        <div style={{ position: 'absolute', top: -60, right: -60, width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
        <div style={{ position: 'absolute', bottom: -80, left: -40, width: 250, height: 250, borderRadius: '50%', background: 'rgba(255,255,255,0.03)' }} />

        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          {/* Location Bar */}
          <button onClick={() => setShowLocation(true)} style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'rgba(255,255,255,0.15)', borderRadius: 30, padding: '8px 18px',
            border: '1px solid rgba(255,255,255,0.25)', cursor: 'pointer', marginBottom: 24, color: '#fff'
          }}>
            <MapPin size={14} />
            <span style={{ fontSize: 13, fontWeight: 600 }}>{location ? `📍 ${location.city} ${location.pincode || ''}` : 'Set your location'}</span>
            <ChevronRight size={14} />
          </button>

          <h1 style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(32px, 6vw, 56px)',
            color: '#fff', lineHeight: 1.1, marginBottom: 16, letterSpacing: '-1px'
          }}>
            Compare Grocery Prices<br />
            <span style={{ color: '#fbbf24' }}>Across 3 Platforms</span>
          </h1>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.85)', marginBottom: 40, maxWidth: 500, margin: '0 auto 40px' }}>
            Find the best deals on Blinkit, Zepto & Swiggy Instamart — all in one place
          </p>

          {/* Platform Badges */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 40, flexWrap: 'wrap' }}>
            {platformBadges.map(p => (
              <div key={p.name} style={{
                background: p.color, color: p.text, padding: '8px 18px',
                borderRadius: 30, display: 'flex', alignItems: 'center', gap: 6,
                fontWeight: 700, fontSize: 14, boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}>
                <span>{p.emoji}</span> {p.name}
                <span style={{ opacity: 0.7, fontSize: 12 }}>• {p.time}</span>
              </div>
            ))}
          </div>

          {/* Search Box */}
          <form onSubmit={handleSearch} style={{ maxWidth: 640, margin: '0 auto' }}>
            <div style={{ display: 'flex', gap: 0, background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.2)' }}>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                <Search size={20} color="#9ca3af" style={{ margin: '0 16px', flexShrink: 0 }} />
                <input
                  type="text"
                  placeholder="Search for milk, onions, chips..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  style={{ flex: 1, padding: '18px 0', border: 'none', outline: 'none', fontSize: 16, color: '#1a1a1a' }}
                />
              </div>
              <button type="submit" style={{
                padding: '0 28px', background: 'linear-gradient(135deg, #16a34a, #22c55e)',
                border: 'none', color: '#fff', fontWeight: 700, fontSize: 15, cursor: 'pointer'
              }}>Compare →</button>
            </div>
          </form>

          {/* Stats */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 32, marginTop: 40, flexWrap: 'wrap' }}>
            {[['25,000+', 'Products'], ['50', 'Categories'], ['3', 'Platforms'], ['₹0', 'Commission']].map(([val, label]) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: '#fbbf24', fontFamily: 'Syne, sans-serif' }}>{val}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: '#1a1a1a' }}>🛍️ Shop by Category</h2>
          <Link to="/search" style={{ color: '#16a34a', fontWeight: 600, textDecoration: 'none', fontSize: 14 }}>View all →</Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: 12 }}>
          {categories.slice(0, 24).map(cat => (
            <Link key={cat.id} to={`/category/${cat.slug}`} style={{ textDecoration: 'none' }}>
              <div style={{
                background: '#fff', borderRadius: 16, padding: '16px 8px', textAlign: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: '1px solid #f0fdf4',
                transition: 'all 0.2s', cursor: 'pointer'
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(22,163,74,0.15)'; e.currentTarget.style.borderColor = '#22c55e'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'; e.currentTarget.style.borderColor = '#f0fdf4'; }}>
                <div style={{ fontSize: 28, marginBottom: 6 }}>{cat.icon}</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#374151', lineHeight: 1.3 }}>{cat.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Deal of the Day */}
      {deals.length > 0 && (
        <div style={{ background: '#fff', padding: '40px 0' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <div>
                <h2 style={{ fontSize: 24, fontWeight: 800, color: '#1a1a1a' }}>🔥 Deal of the Day</h2>
                <p style={{ color: '#6b7280', fontSize: 13, marginTop: 4 }}>Best prices updated daily</p>
              </div>
              <Link to="/search?sort=discount" style={{ color: '#16a34a', fontWeight: 600, textDecoration: 'none', fontSize: 14, display: 'flex', alignItems: 'center', gap: 4 }}>
                View all deals <ChevronRight size={16} />
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
              {deals.slice(0, 8).map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* How it Works */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '60px 16px' }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, textAlign: 'center', marginBottom: 40 }}>How PricePulse Works</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
          {[
            { icon: '🔍', title: 'Search Products', desc: 'Type any grocery item or browse by category' },
            { icon: '⚡', title: 'Compare Prices', desc: 'See prices from Blinkit, Zepto & Swiggy side by side' },
            { icon: '💰', title: 'Find Best Deal', desc: 'We highlight the cheapest option and your savings' },
            { icon: '🛒', title: 'Checkout Instantly', desc: 'Click to go directly to the platform and buy' }
          ].map((step, i) => (
            <div key={i} style={{
              background: '#fff', borderRadius: 20, padding: 28, textAlign: 'center',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #f0fdf4'
            }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>{step.icon}</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{step.title}</h3>
              <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.6 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer style={{ background: '#14532d', color: 'rgba(255,255,255,0.7)', padding: '40px 16px', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 16 }}>
          <Zap size={20} color="#fbbf24" fill="#fbbf24" />
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 20, color: '#fff' }}>PricePulse</span>
        </div>
        <p style={{ fontSize: 13 }}>Compare grocery prices across Blinkit, Zepto & Swiggy Instamart</p>
        <p style={{ fontSize: 12, marginTop: 8, opacity: 0.5 }}>© 2025 PricePulse. Prices may vary. Always verify on the platform.</p>
      </footer>
    </div>
  );
}
