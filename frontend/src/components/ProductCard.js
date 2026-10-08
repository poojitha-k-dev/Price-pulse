import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Clock, Heart, ExternalLink, TrendingDown, Award } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function PlatformTag({ platform }) {
  const styles = {
    blinkit: { bg: '#f8de3b', color: '#000', name: 'Blinkit' },
    zepto: { bg: '#8b5cf6', color: '#fff', name: 'Zepto' },
    swiggy: { bg: '#fc8019', color: '#fff', name: 'Swiggy' }
  };
  const s = styles[platform];
  return (
    <span style={{
      background: s.bg, color: s.color, fontSize: 10, fontWeight: 700,
      padding: '2px 8px', borderRadius: 20
    }}>{s.name}</span>
  );
}

export default function ProductCard({ product, onSaveToggle }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);
  const [redirectModal, setRedirectModal] = useState(null);

  const prices = [
    { platform: 'blinkit', price: product.blinkit_price, rating: product.blinkit_rating, delivery: product.blinkit_delivery_time, url: product.blinkit_url, discount: product.blinkit_discount },
    { platform: 'zepto', price: product.zepto_price, rating: product.zepto_rating, delivery: product.zepto_delivery_time, url: product.zepto_url, discount: product.zepto_discount },
    { platform: 'swiggy', price: product.swiggy_price, rating: product.swiggy_rating, delivery: product.swiggy_delivery_time, url: product.swiggy_url, discount: product.swiggy_discount }
  ].sort((a, b) => a.price - b.price);

  const cheapest = prices[0];
  const mostExpensive = prices[prices.length - 1];
  const savings = mostExpensive.price - cheapest.price;

  const handleSave = async (e) => {
    e.stopPropagation();
    if (!user) return navigate('/login');
    try {
      await axios.post(`/api/user/save-product/${product.id}`);
      setSaved(!saved);
    } catch (err) { console.error(err); }
  };

  const handleCheckout = (platform, url, e) => {
    e.stopPropagation();
    setRedirectModal({ platform, url });
  };

  const platformColors = { blinkit: '#f8de3b', zepto: '#8b5cf6', swiggy: '#fc8019' };
  const platformNames = { blinkit: 'Blinkit', zepto: 'Zepto', swiggy: 'Swiggy Instamart' };

  return (
    <>
      <div
        onClick={() => navigate(`/product/${product.id}`)}
        style={{
          background: '#fff', borderRadius: 16, overflow: 'hidden',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #f0fdf4',
          cursor: 'pointer', transition: 'all 0.2s ease',
          position: 'relative'
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(22,163,74,0.15)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'; }}
      >
        {/* Deal Badge */}
        {product.is_deal_of_day && (
          <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 2, display: 'flex', alignItems: 'center', gap: 4, background: '#fef08a', borderRadius: 20, padding: '4px 10px' }}>
            <Award size={12} color="#854d0e" />
            <span style={{ fontSize: 10, fontWeight: 800, color: '#854d0e' }}>DEAL OF DAY</span>
          </div>
        )}

        {/* Save Button */}
        <button onClick={handleSave} style={{
          position: 'absolute', top: 10, right: 10, zIndex: 2,
          background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%',
          width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <Heart size={16} fill={saved ? '#ef4444' : 'none'} color={saved ? '#ef4444' : '#9ca3af'} />
        </button>

        {/* Image */}
        <div style={{ height: 160, background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <img
            src={product.image_url}
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={e => { e.target.src = `https://picsum.photos/seed/${product.id}/300/300`; }}
          />
        </div>

        {/* Content */}
        <div style={{ padding: '12px 14px 14px' }}>
          {/* Category */}
          <span style={{ fontSize: 11, color: '#16a34a', fontWeight: 600 }}>{product.category_icon} {product.category_name}</span>

          {/* Name */}
          <h3 style={{ fontSize: 13, fontWeight: 700, margin: '4px 0 2px', lineHeight: 1.4, color: '#1a1a1a' }} className="line-clamp-2">
            {product.name}
          </h3>
          <p style={{ fontSize: 11, color: '#9ca3af', marginBottom: 10 }}>{product.unit}</p>

          {/* Savings Badge */}
          {savings > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 10, background: '#dcfce7', padding: '4px 10px', borderRadius: 20, width: 'fit-content' }}>
              <TrendingDown size={12} color="#16a34a" />
              <span style={{ fontSize: 11, fontWeight: 700, color: '#166534' }}>Save ₹{savings} with {platformNames[cheapest.platform]}</span>
            </div>
          )}

          {/* Price Comparison */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {prices.map((p, i) => (
              <div key={p.platform} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '7px 10px', borderRadius: 10,
                background: i === 0 ? '#f0fdf4' : '#fafafa',
                border: i === 0 ? '1px solid #bbf7d0' : '1px solid #f3f4f6'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <PlatformTag platform={p.platform} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Clock size={10} color="#9ca3af" />
                    <span style={{ fontSize: 10, color: '#9ca3af' }}>{p.delivery}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Star size={10} color="#fbbf24" fill="#fbbf24" />
                    <span style={{ fontSize: 10, color: '#6b7280' }}>{p.rating}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: 15, fontWeight: 800, color: i === 0 ? '#16a34a' : '#1a1a1a' }}>₹{p.price}</span>
                    {p.discount > 0 && <span style={{ fontSize: 10, color: '#9ca3af', marginLeft: 4 }}>{p.discount}% off</span>}
                  </div>
                  {i === 0 && <span style={{ fontSize: 10, fontWeight: 800, color: '#16a34a', background: '#dcfce7', padding: '2px 6px', borderRadius: 6 }}>BEST</span>}
                  <button
                    onClick={(e) => handleCheckout(p.platform, p.url, e)}
                    style={{
                      background: platformColors[p.platform], border: 'none', borderRadius: 8,
                      width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <ExternalLink size={12} color={p.platform === 'blinkit' ? '#000' : '#fff'} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Redirect Modal */}
      {redirectModal && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }} onClick={() => setRedirectModal(null)}>
          <div style={{
            background: '#fff', borderRadius: 20, padding: 32, maxWidth: 400, width: '90%',
            boxShadow: '0 20px 60px rgba(0,0,0,0.2)'
          }} onClick={e => e.stopPropagation()}>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🛒</div>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: '#1a1a1a', marginBottom: 8 }}>Leaving PricePulse</h3>
              <p style={{ color: '#6b7280', fontSize: 14, lineHeight: 1.6 }}>
                You're being redirected to <strong>{platformNames[redirectModal.platform]}</strong> to complete your purchase. We don't share your data with this platform.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => setRedirectModal(null)} style={{
                flex: 1, padding: '12px', borderRadius: 12, border: '2px solid #e5e7eb',
                background: '#fff', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: '#6b7280'
              }}>Cancel</button>
              <a href={redirectModal.url} target="_blank" rel="noopener noreferrer"
                onClick={() => setRedirectModal(null)}
                style={{
                  flex: 1, padding: '12px', borderRadius: 12, border: 'none',
                  background: platformColors[redirectModal.platform], cursor: 'pointer',
                  fontSize: 14, fontWeight: 700, textDecoration: 'none', textAlign: 'center',
                  color: redirectModal.platform === 'blinkit' ? '#000' : '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6
                }}>
                Checkout Now <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
