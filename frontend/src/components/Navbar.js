import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Search, MapPin, User, LogOut, ShoppingBag, Menu, X, Zap } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) navigate(`/search?q=${encodeURIComponent(search.trim())}`);
  };

  return (
    <nav style={{
      background: 'linear-gradient(135deg, #15803d 0%, #16a34a 50%, #22c55e 100%)',
      boxShadow: '0 4px 20px rgba(22,163,74,0.3)',
      position: 'sticky', top: 0, zIndex: 100
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, height: 64 }}>
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <div style={{
              width: 38, height: 38, borderRadius: 10, background: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
            }}>
              <Zap size={22} color="#16a34a" fill="#16a34a" />
            </div>
            <div>
              <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 20, color: '#fff', letterSpacing: '-0.5px' }}>Buy</span>
              <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 20, color: '#fbbf24', letterSpacing: '-0.5px' }}>Wise</span>
            </div>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} style={{ flex: 1, maxWidth: 500 }}>
            <div style={{ position: 'relative' }}>
              <Search size={18} color="#9ca3af" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
              <input
                type="text"
                placeholder="Search groceries, brands..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  width: '100%', padding: '10px 14px 10px 44px',
                  borderRadius: 12, border: 'none',
                  background: 'rgba(255,255,255,0.95)',
                  fontSize: 14, outline: 'none',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                  color: '#1a1a1a'
                }}
              />
            </div>
          </form>

          {/* Right Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto' }}>
            {user ? (
              <>
                <Link to="/dashboard" style={{
                  display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px',
                  background: 'rgba(255,255,255,0.15)', borderRadius: 10, textDecoration: 'none',
                  color: '#fff', fontSize: 14, fontWeight: 600, border: '1px solid rgba(255,255,255,0.2)'
                }}>
                  <User size={16} />
                  <span style={{ display: window.innerWidth > 640 ? 'block' : 'none' }}>{user.name?.split(' ')[0]}</span>
                </Link>
                <button onClick={logout} style={{
                  display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px',
                  background: 'rgba(255,255,255,0.1)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.2)',
                  color: '#fff', cursor: 'pointer', fontSize: 14
                }}>
                  <LogOut size={16} />
                </button>
              </>
            ) : (
              <>
                <Link to="/login" style={{
                  padding: '8px 18px', borderRadius: 10, textDecoration: 'none',
                  color: '#fff', fontSize: 14, fontWeight: 600,
                  border: '1px solid rgba(255,255,255,0.4)',
                  background: 'rgba(255,255,255,0.1)'
                }}>Login</Link>
                <Link to="/signup" style={{
                  padding: '8px 18px', borderRadius: 10, textDecoration: 'none',
                  color: '#16a34a', fontSize: 14, fontWeight: 700,
                  background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
