import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, MapPin, Heart, Clock, LogOut, Search, ChevronRight, Edit2 } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';
import LocationModal from '../components/LocationModal';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('profile');
  const [saved, setSaved] = useState([]);
  const [history, setHistory] = useState([]);
  const [showLocation, setShowLocation] = useState(false);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    const savedLoc = localStorage.getItem('userLocation');
    if (savedLoc) setLocation(JSON.parse(savedLoc));
    if (tab === 'saved') axios.get('/api/user/saved').then(r => setSaved(r.data));
    if (tab === 'history') axios.get('/api/user/search-history').then(r => setHistory(r.data));
  }, [user, tab, navigate]);

  if (!user) return null;

  const tabs = [
    { key: 'profile', icon: <User size={18} />, label: 'Profile' },
    { key: 'saved', icon: <Heart size={18} />, label: 'Saved' },
    { key: 'history', icon: <Clock size={18} />, label: 'History' }
  ];

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 16px' }}>
      {showLocation && <LocationModal onClose={() => setShowLocation(false)} onSet={loc => { setLocation(loc); setShowLocation(false); }} />}

      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #14532d, #16a34a)',
        borderRadius: 20, padding: '28px 32px', marginBottom: 28, color: '#fff',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>
            {user.name?.charAt(0)?.toUpperCase()}
          </div>
          <div>
            <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 24, fontWeight: 800 }}>Hey, {user.name?.split(' ')[0]}! 👋</h1>
            <p style={{ opacity: 0.8, fontSize: 14, marginTop: 4 }}>
              <MapPin size={13} style={{ marginRight: 4 }} />
              {location ? `${location.city} ${location.pincode || ''}` : user.city || 'Location not set'}
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => setShowLocation(true)} style={{
            display: 'flex', alignItems: 'center', gap: 6, padding: '10px 18px',
            background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: 12, color: '#fff', cursor: 'pointer', fontSize: 13, fontWeight: 600
          }}>
            <MapPin size={15} /> Update Location
          </button>
          <button onClick={() => { logout(); navigate('/'); }} style={{
            display: 'flex', alignItems: 'center', gap: 6, padding: '10px 18px',
            background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 12, color: '#fff', cursor: 'pointer', fontSize: 13
          }}>
            <LogOut size={15} /> Logout
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, background: '#fff', padding: 6, borderRadius: 16, marginBottom: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', width: 'fit-content' }}>
        {tabs.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 12,
            border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600, fontSize: 14,
            background: tab === t.key ? 'linear-gradient(135deg, #16a34a, #22c55e)' : 'transparent',
            color: tab === t.key ? '#fff' : '#6b7280', transition: 'all 0.2s'
          }}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {tab === 'profile' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          <div style={{ background: '#fff', borderRadius: 20, padding: 28, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: '#1a1a1a' }}>Account Details</h3>
            {[
              { label: 'Full Name', value: user.name, icon: '👤' },
              { label: 'Email', value: user.email, icon: '📧' },
              { label: 'City', value: location?.city || user.city || 'Not set', icon: '🏙️' },
              { label: 'Pincode', value: location?.pincode || user.pincode || 'Not set', icon: '📍' },
              { label: 'Member since', value: new Date(user.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }), icon: '📅' }
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f3f4f6' }}>
                <span style={{ color: '#9ca3af', fontSize: 14 }}>{item.icon} {item.label}</span>
                <span style={{ fontWeight: 600, fontSize: 14, color: '#1a1a1a' }}>{item.value}</span>
              </div>
            ))}
          </div>

          <div style={{ background: '#fff', borderRadius: 20, padding: 28, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>Quick Actions</h3>
            {[
              { icon: '🔍', label: 'Search Products', desc: 'Find best deals', link: '/search' },
              { icon: '❤️', label: 'View Saved Products', desc: 'Your wishlist', action: () => setTab('saved') },
              { icon: '📍', label: 'Update Location', desc: 'For accurate prices', action: () => setShowLocation(true) },
              { icon: '📋', label: 'Search History', desc: 'Recent searches', action: () => setTab('history') }
            ].map(item => (
              <div key={item.label}
                onClick={item.link ? undefined : item.action}
                style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px', borderRadius: 12, background: '#f9fafb', marginBottom: 10, cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#f0fdf4'; e.currentTarget.style.borderLeft = '3px solid #16a34a'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#f9fafb'; e.currentTarget.style.borderLeft = 'none'; }}>
                <span style={{ fontSize: 24 }}>{item.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: '#1a1a1a' }}>{item.label}</div>
                  <div style={{ fontSize: 12, color: '#9ca3af' }}>{item.desc}</div>
                </div>
                <ChevronRight size={16} color="#9ca3af" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Saved Tab */}
      {tab === 'saved' && (
        <div>
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>❤️ Saved Products ({saved.length})</h3>
          {saved.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 16px', background: '#fff', borderRadius: 20 }}>
              <div style={{ fontSize: 64, marginBottom: 16 }}>💔</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>No saved products yet</h3>
              <p style={{ color: '#9ca3af', marginBottom: 24 }}>Click the heart icon on any product to save it</p>
              <Link to="/search" style={{ color: '#16a34a', fontWeight: 700, textDecoration: 'none', padding: '12px 24px', background: '#f0fdf4', borderRadius: 12 }}>Browse Products</Link>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
              {saved.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      )}

      {/* History Tab */}
      {tab === 'history' && (
        <div style={{ background: '#fff', borderRadius: 20, padding: 28, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>🔍 Search History</h3>
          {history.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#9ca3af' }}>
              <Clock size={40} style={{ marginBottom: 16, opacity: 0.4 }} />
              <p>No search history yet</p>
            </div>
          ) : (
            history.map(h => (
              <Link key={h.id} to={`/search?q=${encodeURIComponent(h.query)}`} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px',
                borderRadius: 12, marginBottom: 8, background: '#f9fafb', textDecoration: 'none',
                color: '#1a1a1a', transition: 'all 0.15s'
              }}
                onMouseEnter={e => e.currentTarget.style.background = '#f0fdf4'}
                onMouseLeave={e => e.currentTarget.style.background = '#f9fafb'}>
                <Search size={16} color="#9ca3af" />
                <span style={{ flex: 1, fontSize: 14, fontWeight: 500 }}>{h.query}</span>
                <span style={{ fontSize: 12, color: '#9ca3af' }}>{new Date(h.searched_at).toLocaleDateString('en-IN')}</span>
                <ChevronRight size={14} color="#9ca3af" />
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
