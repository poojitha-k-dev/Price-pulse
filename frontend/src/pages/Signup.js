import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, MapPin, Eye, EyeOff, Zap } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '', pincode: '', city: '' });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password.length < 6) { setError('Password must be at least 6 characters'); return; }
    setLoading(true);
    try {
      const res = await axios.post('/api/auth/signup', form);
      login(res.data.token, res.data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
    setLoading(false);
  };

  const f = (key, val) => setForm({ ...form, [key]: val });

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div style={{ background: '#fff', borderRadius: 24, padding: '48px 40px', maxWidth: 460, width: '100%', boxShadow: '0 20px 60px rgba(22,163,74,0.12)' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg,#16a34a,#22c55e)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={24} color="#fff" fill="#fff" />
            </div>
            <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 24, color: '#16a34a' }}>PricePulse</span>
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: '#1a1a1a', marginBottom: 6 }}>Create Account</h1>
          <p style={{ color: '#9ca3af', fontSize: 14 }}>Start comparing prices & saving money</p>
        </div>

        {error && <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 12, padding: '12px 16px', marginBottom: 20, color: '#ef4444', fontSize: 14 }}>⚠️ {error}</div>}

        <form onSubmit={handleSubmit}>
          {[
            { key: 'name', label: 'Full Name', icon: <User size={18} color="#9ca3af" />, type: 'text', placeholder: 'Rahul Sharma' },
            { key: 'email', label: 'Email address', icon: <Mail size={18} color="#9ca3af" />, type: 'email', placeholder: 'you@example.com' },
          ].map(field => (
            <div key={field.key} style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>{field.label}</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }}>{field.icon}</span>
                <input type={field.type} value={form[field.key]} onChange={e => f(field.key, e.target.value)} required placeholder={field.placeholder}
                  style={{ width: '100%', padding: '13px 14px 13px 44px', borderRadius: 12, border: '2px solid #e5e7eb', fontSize: 15, outline: 'none' }}
                  onFocus={e => e.target.style.borderColor = '#16a34a'}
                  onBlur={e => e.target.style.borderColor = '#e5e7eb'} />
              </div>
            </div>
          ))}

          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} color="#9ca3af" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
              <input type={showPass ? 'text' : 'password'} value={form.password} onChange={e => f('password', e.target.value)} required placeholder="Min 6 characters"
                style={{ width: '100%', padding: '13px 44px 13px 44px', borderRadius: 12, border: '2px solid #e5e7eb', fontSize: 15, outline: 'none' }}
                onFocus={e => e.target.style.borderColor = '#16a34a'}
                onBlur={e => e.target.style.borderColor = '#e5e7eb'} />
              <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'none', cursor: 'pointer' }}>
                {showPass ? <EyeOff size={18} color="#9ca3af" /> : <Eye size={18} color="#9ca3af" />}
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Pincode</label>
              <div style={{ position: 'relative' }}>
                <MapPin size={18} color="#9ca3af" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                <input type="number" value={form.pincode} onChange={e => f('pincode', e.target.value.slice(0, 6))} placeholder="400001"
                  style={{ width: '100%', padding: '13px 12px 13px 40px', borderRadius: 12, border: '2px solid #e5e7eb', fontSize: 14, outline: 'none' }}
                  onFocus={e => e.target.style.borderColor = '#16a34a'}
                  onBlur={e => e.target.style.borderColor = '#e5e7eb'} />
              </div>
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>City</label>
              <input type="text" value={form.city} onChange={e => f('city', e.target.value)} placeholder="Mumbai"
                style={{ width: '100%', padding: '13px 14px', borderRadius: 12, border: '2px solid #e5e7eb', fontSize: 14, outline: 'none' }}
                onFocus={e => e.target.style.borderColor = '#16a34a'}
                onBlur={e => e.target.style.borderColor = '#e5e7eb'} />
            </div>
          </div>

          <button type="submit" disabled={loading} style={{
            width: '100%', padding: '15px', borderRadius: 14, border: 'none',
            background: loading ? '#9ca3af' : 'linear-gradient(135deg, #16a34a, #22c55e)',
            color: '#fff', fontSize: 16, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: '0 4px 15px rgba(22,163,74,0.3)'
          }}>
            {loading ? 'Creating account...' : 'Create Account Free'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 24, fontSize: 14, color: '#6b7280' }}>
          Already have an account? <Link to="/login" style={{ color: '#16a34a', fontWeight: 700, textDecoration: 'none' }}>Login</Link>
        </p>
      </div>
    </div>
  );
}
