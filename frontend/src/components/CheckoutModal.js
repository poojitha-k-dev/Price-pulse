import { useState } from 'react';
import { FiX, FiExternalLink, FiShield } from 'react-icons/fi';

const PLATFORM_INFO = {
  blinkit: { name: 'Blinkit', color: '#f8cb06', logo: '⚡', tagline: '10-min delivery' },
  zepto:   { name: 'Zepto',   color: '#8b5cf6', logo: '🟣', tagline: 'Super fast delivery' },
  swiggy:  { name: 'Swiggy Instamart', color: '#fc8019', logo: '🟠', tagline: 'Quick commerce' }
};

export default function CheckoutModal({ product, platform, onClose }) {
  const [consented, setConsented] = useState(false);
  const cfg = PLATFORM_INFO[platform];
  const price = product[`${platform}Price`];
  const url = product[`${platform}Url`] || `https://${platform === 'zepto' ? 'zeptonow' : platform === 'swiggy' ? 'www.swiggy.com/instamart' : 'blinkit'}.com`;

  const handleRedirect = () => {
    if (!consented) return;
    window.open(url, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000, padding: 20
    }}>
      <div className="card" style={{ width: '100%', maxWidth: 440, padding: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
          <h2 style={{ fontSize: 20 }}>Checkout on {cfg.name}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#a0a0c0', cursor: 'pointer' }}>
            <FiX size={20} />
          </button>
        </div>

        {/* Product preview */}
        <div style={{
          display: 'flex', gap: 14, padding: 16, background: '#0d0d1f',
          borderRadius: 12, border: '1px solid #2a2a4a', marginBottom: 20
        }}>
          <img src={product.image} alt={product.name}
            style={{ width: 60, height: 60, borderRadius: 8, objectFit: 'cover' }} />
          <div>
            <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{product.name}</p>
            <p style={{ color: '#6060a0', fontSize: 12 }}>{product.unit}</p>
            <p style={{ color: '#22c55e', fontWeight: 700, marginTop: 4 }}>₹{parseFloat(price).toFixed(0)}</p>
          </div>
        </div>

        {/* Platform info */}
        <div style={{
          padding: 16, borderRadius: 12,
          background: `${cfg.color}12`, border: `1px solid ${cfg.color}30`,
          marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: `${cfg.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22
          }}>{cfg.logo}</div>
          <div>
            <p style={{ fontWeight: 700, color: cfg.color }}>{cfg.name}</p>
            <p style={{ fontSize: 13, color: '#a0a0c0' }}>{cfg.tagline}</p>
          </div>
          <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
            <p style={{ fontSize: 20, fontWeight: 800, color: '#22c55e' }}>₹{parseFloat(price).toFixed(0)}</p>
          </div>
        </div>

        {/* Consent */}
        <label style={{
          display: 'flex', gap: 12, cursor: 'pointer',
          padding: 16, background: '#ffffff06', borderRadius: 12,
          border: `1px solid ${consented ? '#22c55e40' : '#2a2a4a'}`,
          marginBottom: 20, transition: 'border-color 0.2s'
        }}>
          <input
            type="checkbox"
            checked={consented}
            onChange={e => setConsented(e.target.checked)}
            style={{ width: 18, height: 18, accentColor: '#22c55e', flexShrink: 0, marginTop: 1 }}
          />
          <div>
            <p style={{ fontSize: 13, fontWeight: 500, marginBottom: 4 }}>I consent to being redirected</p>
            <p style={{ fontSize: 12, color: '#6060a0', lineHeight: 1.5 }}>
              You will be taken to {cfg.name}'s website/app to complete your purchase. Grocio does not handle any payments.
            </p>
          </div>
        </label>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <FiShield size={14} color="#22c55e" />
          <span style={{ fontSize: 12, color: '#6060a0' }}>Grocio never stores your payment information</span>
        </div>

        <button
          onClick={handleRedirect}
          disabled={!consented}
          style={{
            width: '100%', padding: 14, borderRadius: 12, fontWeight: 700, fontSize: 15,
            background: consented ? `linear-gradient(135deg, ${cfg.color}, ${cfg.color}cc)` : '#2a2a4a',
            color: consented ? '#000' : '#6060a0', border: 'none', cursor: consented ? 'pointer' : 'not-allowed',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            transition: 'all 0.2s', fontFamily: 'Space Grotesk, sans-serif'
          }}
        >
          <FiExternalLink size={16} />
          Checkout on {cfg.name}
        </button>
      </div>
    </div>
  );
}
