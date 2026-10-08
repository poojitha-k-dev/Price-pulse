import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SlidersHorizontal, ChevronLeft } from 'lucide-react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

export default function CategoryPage() {
  const { slug } = useParams();
  const [data, setData] = useState({ products: [], category: null, total: 0, totalPages: 0 });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('price');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    setLoading(true);
    const params = { page, limit: 24, sort };
    if (minPrice) params.minPrice = minPrice;
    if (maxPrice) params.maxPrice = maxPrice;
    axios.get(`/api/products/category/${slug}`, { params })
      .then(r => setData(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug, page, sort, minPrice, maxPrice]);

  const { products, category, total, totalPages } = data;

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 16px' }}>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24, color: '#9ca3af', fontSize: 14 }}>
        <Link to="/" style={{ color: '#16a34a', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
          <ChevronLeft size={16} /> Home
        </Link>
        <span>/</span>
        <span style={{ color: '#1a1a1a', fontWeight: 600 }}>{category?.icon} {category?.name}</span>
      </div>

      {/* Category Header */}
      {category && (
        <div style={{
          background: 'linear-gradient(135deg, #14532d, #16a34a)',
          borderRadius: 20, padding: '28px 32px', marginBottom: 24, color: '#fff'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontSize: 48 }}>{category.icon}</span>
            <div>
              <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 28, fontWeight: 800, marginBottom: 6 }}>{category.name}</h1>
              <p style={{ opacity: 0.8, fontSize: 14 }}>{category.description}</p>
              <p style={{ marginTop: 8, fontSize: 13, background: 'rgba(255,255,255,0.15)', display: 'inline-block', padding: '4px 12px', borderRadius: 20 }}>
                {total.toLocaleString()} products
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap', alignItems: 'center', background: '#fff', padding: '16px 20px', borderRadius: 14, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#6b7280', fontSize: 13, fontWeight: 600 }}>
          <SlidersHorizontal size={16} /> Sort & Filter:
        </div>
        <select value={sort} onChange={e => { setSort(e.target.value); setPage(1); }} style={{ padding: '8px 16px', borderRadius: 10, border: '2px solid #e5e7eb', fontSize: 14, background: '#fff', cursor: 'pointer', fontFamily: 'inherit' }}>
          <option value="price">Lowest Price</option>
          <option value="discount">Best Discount</option>
          <option value="rating">Highest Rated</option>
          <option value="name">Name A-Z</option>
        </select>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 13, color: '#9ca3af' }}>Price:</span>
          <input type="number" placeholder="Min ₹" value={minPrice} onChange={e => { setMinPrice(e.target.value); setPage(1); }}
            style={{ width: 80, padding: '8px 12px', borderRadius: 10, border: '2px solid #e5e7eb', fontSize: 13 }} />
          <span style={{ color: '#9ca3af' }}>—</span>
          <input type="number" placeholder="Max ₹" value={maxPrice} onChange={e => { setMaxPrice(e.target.value); setPage(1); }}
            style={{ width: 80, padding: '8px 12px', borderRadius: 10, border: '2px solid #e5e7eb', fontSize: 13 }} />
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px,1fr))', gap: 16 }}>
          {Array(12).fill(0).map((_, i) => (
            <div key={i} style={{ height: 400, borderRadius: 16, background: '#f3f4f6' }} />
          ))}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px,1fr))', gap: 16 }}>
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 40, flexWrap: 'wrap' }}>
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
            style={{ padding: '10px 20px', borderRadius: 10, border: '2px solid #e5e7eb', background: '#fff', cursor: 'pointer', opacity: page === 1 ? 0.5 : 1 }}>← Prev</button>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const p = Math.max(1, Math.min(page - 2, totalPages - 4)) + i;
            return p <= totalPages ? (
              <button key={p} onClick={() => setPage(p)}
                style={{ padding: '10px 16px', borderRadius: 10, border: `2px solid ${p === page ? '#16a34a' : '#e5e7eb'}`, background: p === page ? '#16a34a' : '#fff', color: p === page ? '#fff' : '#1a1a1a', cursor: 'pointer', fontWeight: p === page ? 700 : 400 }}>{p}</button>
            ) : null;
          })}
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
            style={{ padding: '10px 20px', borderRadius: 10, border: '2px solid #e5e7eb', background: '#fff', cursor: 'pointer', opacity: page === totalPages ? 0.5 : 1 }}>Next →</button>
        </div>
      )}
    </div>
  );
}
