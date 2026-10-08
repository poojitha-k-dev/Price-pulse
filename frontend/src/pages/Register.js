import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiMapPin, FiEye, FiEyeOff } from 'react-icons/fi';
import { register as registerApi } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', pincode: '', city: '' });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const detectLocation = () => {
    if (!navigator.geolocation) { toast.error('Geolocation not supported'); return; }
    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&format=json`);
        const data = await res.json();
        setForm(f => ({
          ...f,
          city: data.address?.city || data.address?.town || '',
          pincode: data.address?.postcode || ''
        }));
        toast.success('Location detected!');
      } catch { toast.error('Could not get location details'); }
    }, () => toast.error('Location permission denied'));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    setLoading(true);
    try {
      const res = await registerApi(form);
      login(res.data.token, res.data.user);
      toast.success(`Welcome to Grocio, ${res.data.user.name}!`);
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'radial-gradient(ellipse at 50% 0%, rgba(255,215,0,0.06) 0%, transparent 60%), var(--bg)',
      padding: 20
    }}>
      <div className="card" style={{ width: '100%', maxWidth: 460, padding: 40 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16,
            background: 'linear-gradient(135deg, #FFD700, #ffa500)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 28, fontWeight: 900, color: '#000', margin: '0 auto 16px'
          }}>G</div>
          <h1 style={{ fontSize: 26, marginBottom: 8 }}>Create account</h1>
          <p style={{ color: '#a0a0c0', fontSize: 14 }}>Join Grocio to save money on groceries</p>
        </div>

        <form onSubmit={handleSubmit}>
          {[
            { key: 'name', label: 'Full Name', icon: FiUser, type: 'text', placeholder: 'Rahul Sharma' },
            { key: 'email', label: 'Email', icon: FiMail, type: 'email', placeholder: 'you@example.com' }
          ].map(({ key, label, icon: Icon, type, placeholder }) => (
            <div key={key} style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 13, color: '#a0a0c0', display: 'block', marginBottom: 8 }}>{label}</label>
              <div style={{ position: 'relative' }}>
                <Icon style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#6060a0' }} size={16} />
                <input className="input" type={type} placeholder={placeholder}
                  style={{ paddingLeft: 40 }} value={form[key]} onChange={set(key)} required />
              </div>
            </div>
          ))}

          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, color: '#a0a0c0', display: 'block', marginBottom: 8 }}>Password</label>
            <div style={{ position: 'relative' }}>
              <FiLock style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#6060a0' }} size={16} />
              <input className="input" type={showPwd ? 'text' : 'password'} placeholder="Minimum 6 characters"
                style={{ paddingLeft: 40, paddingRight: 40 }}
                value={form.password} onChange={set('password')} required />
              <button type="button" onClick={() => setShowPwd(!showPwd)} style={{
                position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', color: '#6060a0', cursor: 'pointer'
              }}>
                {showPwd ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>
          </div>

          {/* Location section */}
          <div style={{ background: '#0d0d1f', borderRadius: 14, padding: 16, marginBottom: 20, border: '1px solid #1a1a3a' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <label style={{ fontSize: 13, color: '#a0a0c0' }}>📍 Location (optional)</label>
              <button type="button" onClick={detectLocation} style={{
                background: '#FFD70015', border: '1px solid #FFD70030', color: '#FFD700',
                borderRadius: 8, padding: '4px 12px', cursor: 'pointer', fontSize: 12
              }}>Auto-detect</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div style={{ position: 'relative' }}>
                <FiMapPin style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#6060a0' }} size={14} />
                <input className="input" placeholder="Pincode" style={{ paddingLeft: 34, fontSize: 13 }}
                  value={form.pincode} onChange={set('pincode')} maxLength={6} />
              </div>
              <input className="input" placeholder="City" style={{ fontSize: 13 }}
                value={form.city} onChange={set('city')} />
            </div>
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', padding: 14, fontSize: 15 }} disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 20, color: '#6060a0', fontSize: 14 }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#FFD700', textDecoration: 'none', fontWeight: 600 }}>Login</Link>
        </p>
      </div>
    </div>
  );
}
