import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search as SearchIcon, Filter, SlidersHorizontal, X } from 'lucide-react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState(searchParams.get('sort') || 'price');
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState('');
  const totalPages = Math.ceil(total / 24);

  useEffect(() => {
    axios.get('/api/products/categories').then(r => setCategories(r.data));
  }, []);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const q = searchParams.get('q') || '';
      const params = { page, limit: 24, sort };
      if (q) params.q = q;
      if (selectedCat) params.category = selectedCat;
      const res = await axios.get('/api/products/search', { params });
      setProducts(res.data.products);
      setTotal(res.data.total);
    } catch (err) { console.error(err); }
    setLoading(false);
  }, [searchParams, page, sort, selectedCat]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    setSearchParams(search ? { q: search } : {});
  };

  const query = searchParams.get('q');

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 16px' }}>
      {/* Search Bar */}
      <form onSubmit={handleSearch} style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <SearchIcon size={18} color="#9ca3af" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search products..."
              style={{
                width: '100%', padding: '14px 16px 14px 48px', borderRadius: 14,
                border: '2px solid #e5e7eb', fontSize: 15, outline: 'none', background: '#fff'
              }}
              onFocus={e => e.target.style.borderColor = '#16a34a'}
              onBlur={e => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>
          <button type="submit" style={{
            padding: '0 24px', background: 'linear-gradient(135deg,#16a34a,#22c55e)',
            border: 'none', borderRadius: 14, color: '#fff', fontWeight: 700, cursor: 'pointer'
          }}>Search</button>
        </div>
      </form>

      {/* Filters Bar */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#6b7280', fontSize: 14 }}>
          <SlidersHorizontal size={16} /> Filters:
        </div>
        <select value={sort} onChange={e => { setSort(e.target.value); setPage(1); }} style={{
          padding: '8px 16px', borderRadius: 10, border: '2px solid #e5e7eb',
          fontSize: 14, background: '#fff', cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif'
        }}>
          <option value="price">Lowest Price</option>
          <option value="discount">Best Discount</option>
          <option value="rating">Highest Rated</option>
          <option value="name">Name A-Z</option>
        </select>
        <select value={selectedCat} onChange={e => { setSelectedCat(e.target.value); setPage(1); }} style={{
          padding: '8px 16px', borderRadius: 10, border: '2px solid #e5e7eb',
          fontSize: 14, background: '#fff', cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif', maxWidth: 200
        }}>
          <option value="">All Categories</option>
          {categories.map(c => <option key={c.id} value={c.slug}>{c.icon} {c.name}</option>)}
        </select>
        {(query || selectedCat) && (
          <button onClick={() => { setSearch(''); setSelectedCat(''); setPage(1); setSearchParams({}); }}
            style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '8px 14px', borderRadius: 10, border: '2px solid #fecaca', background: '#fef2f2', color: '#ef4444', fontSize: 13, cursor: 'pointer', fontWeight: 600 }}>
            <X size={14} /> Clear
          </button>
        )}
      </div>

      {/* Results Header */}
      <div style={{ marginBottom: 20 }}>
        {loading ? (
          <p style={{ color: '#9ca3af', fontSize: 14 }}>Searching...</p>
        ) : (
          <p style={{ color: '#6b7280', fontSize: 14 }}>
            {total > 0 ? <><strong style={{ color: '#1a1a1a' }}>{total.toLocaleString()}</strong> products found {query && <>for "<strong style={{ color: '#16a34a' }}>{query}</strong>"</>}</> : 'No products found'}
          </p>
        )}
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
          {Array(8).fill(0).map((_, i) => (
            <div key={i} style={{ height: 400, borderRadius: 16, background: 'linear-gradient(90deg, #f3f4f6 0%, #e5e7eb 50%, #f3f4f6 100%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite' }} />
          ))}
        </div>
      )}

      {/* Products Grid */}
      {!loading && products.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}

      {!loading && products.length === 0 && (
        <div style={{ textAlign: 'center', padding: '80px 16px' }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>🔍</div>
          <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>No products found</h3>
          <p style={{ color: '#9ca3af', marginBottom: 24 }}>Try a different search term or browse by category</p>
          <Link to="/" style={{ color: '#16a34a', fontWeight: 700, textDecoration: 'none' }}>← Back to Home</Link>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 40, flexWrap: 'wrap' }}>
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
            style={{ padding: '10px 20px', borderRadius: 10, border: '2px solid #e5e7eb', background: '#fff', cursor: page === 1 ? 'not-allowed' : 'pointer', opacity: page === 1 ? 0.5 : 1 }}>← Prev</button>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const p = Math.max(1, Math.min(page - 2, totalPages - 4)) + i;
            return (
              <button key={p} onClick={() => setPage(p)}
                style={{ padding: '10px 16px', borderRadius: 10, border: `2px solid ${p === page ? '#16a34a' : '#e5e7eb'}`, background: p === page ? '#16a34a' : '#fff', color: p === page ? '#fff' : '#1a1a1a', cursor: 'pointer', fontWeight: p === page ? 700 : 400 }}>{p}</button>
            );
          })}
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
            style={{ padding: '10px 20px', borderRadius: 10, border: '2px solid #e5e7eb', background: '#fff', cursor: page === totalPages ? 'not-allowed' : 'pointer', opacity: page === totalPages ? 0.5 : 1 }}>Next →</button>
        </div>
      )}
    </div>
  );
}
