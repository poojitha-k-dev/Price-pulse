import React, { useState } from 'react';
import { MapPin, Navigation, Search, X } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function LocationModal({ onClose, onSet }) {
  const { user } = useAuth();
  const [pincode, setPincode] = useState('');
  const [loading, setLoading] = useState(false);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGPS = () => {
    setGpsLoading(true);
    setError('');
    if (!navigator.geolocation) {
      setError('Geolocation not supported');
      setGpsLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          // Reverse geocode using a free API
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
          const data = await res.json();
          const city = data.address?.city || data.address?.town || data.address?.village || 'Your City';
          const postcode = data.address?.postcode || '';
          if (user) {
            await axios.put('/api/user/location', { city, pincode: postcode, latitude, longitude });
          }
          onSet({ city, pincode: postcode, latitude, longitude });
          localStorage.setItem('userLocation', JSON.stringify({ city, pincode: postcode, latitude, longitude }));
          onClose();
        } catch {
          onSet({ city: 'Current Location', pincode: '', latitude, longitude });
          onClose();
        }
        setGpsLoading(false);
      },
      () => {
        setError('Location access denied. Please enter pincode manually.');
        setGpsLoading(false);
      }
    );
  };

  const handlePincode = async (e) => {
    e.preventDefault();
    if (pincode.length !== 6) { setError('Enter a valid 6-digit pincode'); return; }
    setLoading(true);
    try {
      const res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await res.json();
      if (data[0].Status === 'Success') {
        const city = data[0].PostOffice[0]?.District || 'Unknown City';
        if (user) await axios.put('/api/user/location', { city, pincode });
        onSet({ city, pincode });
        localStorage.setItem('userLocation', JSON.stringify({ city, pincode }));
        onClose();
      } else {
        setError('Invalid pincode');
      }
    } catch {
      const city = `City (${pincode})`;
      onSet({ city, pincode });
      localStorage.setItem('userLocation', JSON.stringify({ city, pincode }));
      onClose();
    }
    setLoading(false);
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 16
    }}>
      <div style={{ background: '#fff', borderRadius: 24, padding: 32, maxWidth: 420, width: '100%', boxShadow: '0 25px 60px rgba(0,0,0,0.25)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: '#1a1a1a' }}>📍 Set Location</h2>
            <p style={{ color: '#6b7280', fontSize: 13, marginTop: 4 }}>Get accurate prices for your area</p>
          </div>
          <button onClick={onClose} style={{ border: 'none', background: '#f3f4f6', borderRadius: 10, width: 36, height: 36, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={18} color="#6b7280" />
          </button>
        </div>

        <button
          onClick={handleGPS}
          disabled={gpsLoading}
          style={{
            width: '100%', padding: '16px', borderRadius: 14, border: '2px solid #16a34a',
            background: '#f0fdf4', cursor: 'pointer', display: 'flex', alignItems: 'center',
            justifyContent: 'center', gap: 10, marginBottom: 20, transition: 'all 0.2s'
          }}
        >
          <Navigation size={20} color="#16a34a" />
          <span style={{ fontSize: 15, fontWeight: 700, color: '#16a34a' }}>
            {gpsLoading ? 'Detecting...' : 'Use Current Location'}
          </span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <div style={{ flex: 1, height: 1, background: '#e5e7eb' }} />
          <span style={{ color: '#9ca3af', fontSize: 13 }}>or enter pincode</span>
          <div style={{ flex: 1, height: 1, background: '#e5e7eb' }} />
        </div>

        <form onSubmit={handlePincode}>
          <div style={{ position: 'relative', marginBottom: 12 }}>
            <MapPin size={18} color="#9ca3af" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="number"
              placeholder="Enter 6-digit pincode"
              value={pincode}
              onChange={e => setPincode(e.target.value.slice(0, 6))}
              style={{
                width: '100%', padding: '14px 14px 14px 44px',
                borderRadius: 12, border: '2px solid #e5e7eb',
                fontSize: 16, outline: 'none', color: '#1a1a1a'
              }}
            />
          </div>
          {error && <p style={{ color: '#ef4444', fontSize: 13, marginBottom: 12 }}>{error}</p>}
          <button type="submit" disabled={loading} style={{
            width: '100%', padding: '14px', borderRadius: 12, border: 'none',
            background: 'linear-gradient(135deg, #16a34a, #22c55e)', color: '#fff',
            fontSize: 15, fontWeight: 700, cursor: 'pointer'
          }}>
            {loading ? 'Setting...' : 'Confirm Location'}
          </button>
        </form>
      </div>
    </div>
  );
}
