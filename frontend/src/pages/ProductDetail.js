import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Clock, ExternalLink, ArrowLeft, Heart, TrendingDown, Award, Package } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [redirectModal, setRedirectModal] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    axios.get(`/api/products/${id}`).then(r => setProduct(r.data)).finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 40, height: 40, border: '4px solid #16a34a', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }} />
        <p style={{ color: '#9ca3af' }}>Loading product...</p>
      </div>
    </div>
  );

  if (!product) return <div style={{ textAlign: 'center', padding: 60 }}>Product not found</div>;

  const platforms = [
    { key: 'blinkit', name: 'Blinkit', color: '#f8de3b', textColor: '#000', emoji: '🟡', price: product.blinkit_price, mrp: product.blinkit_mrp, discount: product.blinkit_discount, rating: product.blinkit_rating, delivery: product.blinkit_delivery_time, url: product.blinkit_url },
    { key: 'zepto', name: 'Zepto', color: '#8b5cf6', textColor: '#fff', emoji: '🟣', price: product.zepto_price, mrp: product.zepto_mrp, discount: product.zepto_discount, rating: product.zepto_rating, delivery: product.zepto_delivery_time, url: product.zepto_url },
    { key: 'swiggy', name: 'Swiggy Instamart', color: '#fc8019', textColor: '#fff', emoji: '🟠', price: product.swiggy_price, mrp: product.swiggy_mrp, discount: product.swiggy_discount, rating: product.swiggy_rating, delivery: product.swiggy_delivery_time, url: product.swiggy_url }
  ].sort((a, b) => a.price - b.price);

  const cheapest = platforms[0];
  const mostExp = platforms[platforms.length - 1];
  const savings = mostExp.price - cheapest.price;

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 16px' }}>
      <Link to="/search" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#16a34a', textDecoration: 'none', fontWeight: 600, marginBottom: 24, fontSize: 14 }}>
        <ArrowLeft size={16} /> Back to Search
      </Link>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 32, alignItems: 'start' }}>
        {/* Left - Image */}
        <div>
          <div style={{ borderRadius: 24, overflow: 'hidden', boxShadow: '0 8px 30px rgba(0,0,0,0.1)', background: '#f8fafc', aspectRatio: '1', position: 'relative' }}>
            <img src={product.image_url} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={e => { e.target.src = `https://picsum.photos/seed/${id}/500/500`; }} />
            {product.is_deal_of_day && (
              <div style={{ position: 'absolute', top: 16, left: 16, background: '#fef08a', borderRadius: 20, padding: '6px 14px', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Award size={14} color="#854d0e" />
                <span style={{ fontSize: 12, fontWeight: 800, color: '#854d0e' }}>DEAL OF THE DAY</span>
              </div>
            )}
          </div>

          {/* Best Deal Highlight */}
          {savings > 0 && (
            <div style={{ marginTop: 16, background: 'linear-gradient(135deg, #14532d, #16a34a)', borderRadius: 16, padding: '16px 20px', color: '#fff', display: 'flex', alignItems: 'center', gap: 12 }}>
              <TrendingDown size={24} color="#fbbf24" />
              <div>
                <div style={{ fontWeight: 800, fontSize: 16 }}>Save ₹{savings} with {cheapest.name}</div>
                <div style={{ opacity: 0.8, fontSize: 13 }}>Compared to {mostExp.name}</div>
              </div>
            </div>
          )}
        </div>

        {/* Right - Details */}
        <div>
          {/* Category Badge */}
          <Link to={`/category/${product.category_slug}`} style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, background: '#f0fdf4', borderRadius: 20, padding: '6px 14px', color: '#16a34a', fontSize: 13, fontWeight: 600, marginBottom: 16 }}>
            {product.category_name}
          </Link>

          <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 28, fontWeight: 800, color: '#1a1a1a', marginBottom: 8, lineHeight: 1.2 }}>{product.name}</h1>
          
          <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
            {product.unit && <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: '#6b7280', background: '#f9fafb', padding: '4px 12px', borderRadius: 20 }}><Package size={13} /> {product.unit}</span>}
            {product.brand && <span style={{ fontSize: 13, color: '#6b7280', background: '#f9fafb', padding: '4px 12px', borderRadius: 20 }}>🏷️ {product.brand}</span>}
          </div>

          {/* Price range */}
          <div style={{ marginBottom: 24, padding: '16px 20px', background: '#f0fdf4', borderRadius: 14, border: '1px solid #bbf7d0' }}>
            <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 4 }}>Best Price Range</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 32, fontWeight: 800, color: '#16a34a' }}>₹{cheapest.price}</span>
              <span style={{ color: '#9ca3af' }}>—</span>
              <span style={{ fontSize: 32, fontWeight: 800, color: '#6b7280' }}>₹{mostExp.price}</span>
            </div>
            <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 4 }}>MRP: ₹{product.blinkit_mrp}</div>
          </div>

          {/* Platform Comparison */}
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#1a1a1a' }}>Price Comparison</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
            {platforms.map((p, i) => (
              <div key={p.key} style={{
                border: i === 0 ? '2px solid #16a34a' : '2px solid #f3f4f6',
                borderRadius: 16, padding: '16px 20px', background: i === 0 ? '#f0fdf4' : '#fff',
                position: 'relative'
              }}>
                {i === 0 && (
                  <div style={{ position: 'absolute', top: -10, right: 16, background: '#16a34a', color: '#fff', fontSize: 11, fontWeight: 800, padding: '3px 10px', borderRadius: 20 }}>
                    BEST PRICE ✓
                  </div>
                )}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: p.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{p.emoji}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15, color: '#1a1a1a' }}>{p.name}</div>
                      <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#9ca3af' }}>
                          <Clock size={12} />{p.delivery}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#9ca3af' }}>
                          <Star size={12} fill="#fbbf24" color="#fbbf24" />{p.rating}
                        </div>
                        {p.discount > 0 && <span style={{ fontSize: 12, color: '#16a34a', fontWeight: 700 }}>{p.discount}% off</span>}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 22, fontWeight: 800, color: i === 0 ? '#16a34a' : '#1a1a1a' }}>₹{p.price}</div>
                      <div style={{ fontSize: 12, color: '#9ca3af', textDecoration: 'line-through' }}>₹{p.mrp}</div>
                    </div>
                    <button onClick={() => setRedirectModal(p)} style={{
                      display: 'flex', alignItems: 'center', gap: 6, padding: '10px 16px',
                      background: p.color, border: 'none', borderRadius: 12, cursor: 'pointer',
                      color: p.textColor, fontWeight: 700, fontSize: 13
                    }}>
                      Buy <ExternalLink size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Redirect Modal */}
      {redirectModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}
          onClick={() => setRedirectModal(null)}>
          <div style={{ background: '#fff', borderRadius: 24, padding: 36, maxWidth: 400, width: '90%' }} onClick={e => e.stopPropagation()}>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <div style={{ fontSize: 56, marginBottom: 12 }}>🛒</div>
              <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Ready to Buy?</h3>
              <p style={{ color: '#6b7280', lineHeight: 1.6 }}>
                You'll be redirected to <strong>{redirectModal.name}</strong> to complete your purchase of <strong>{product.name}</strong> at <strong style={{ color: '#16a34a' }}>₹{redirectModal.price}</strong>.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => setRedirectModal(null)} style={{ flex: 1, padding: '14px', borderRadius: 12, border: '2px solid #e5e7eb', background: '#fff', cursor: 'pointer', fontWeight: 600, color: '#6b7280' }}>Cancel</button>
              <a href={redirectModal.url} target="_blank" rel="noopener noreferrer" onClick={() => setRedirectModal(null)}
                style={{ flex: 1, padding: '14px', borderRadius: 12, border: 'none', background: redirectModal.color, cursor: 'pointer', fontWeight: 700, textDecoration: 'none', textAlign: 'center', color: redirectModal.textColor, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                Checkout Now <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
