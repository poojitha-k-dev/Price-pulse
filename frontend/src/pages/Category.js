import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCategoryProducts } from '../utils/api';
import ProductCard from '../components/ProductCard';
import { FiFilter } from 'react-icons/fi';

export default function Category() {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState('lowest');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    getCategoryProducts(slug, { sort, page: 1, limit: 24 })
      .then(r => {
        setData(r.data);
        setProducts(r.data.products || []);
        setTotalPages(r.data.totalPages || 1);
        setPage(1);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug, sort]);

  const loadMore = () => {
    const next = page + 1;
    getCategoryProducts(slug, { sort, page: next, limit: 24 })
      .then(r => { setProducts(prev => [...prev, ...(r.data.products || [])]);  setPage(next); });
  };

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '100px 0' }}>
      <div className="spinner" />
    </div>
  );

  const cat = data?.category;

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Category header */}
      <div style={{
        background: 'linear-gradient(135deg, #13132a, #1e1e3a)',
        borderBottom: '1px solid #2a2a4a', padding: '32px 0'
      }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{
              width: 64, height: 64, borderRadius: 16,
              background: '#FFD70015', border: '1px solid #FFD70030',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32
            }}>{cat?.icon}</div>
            <div>
              <h1 style={{ fontSize: 28, marginBottom: 4 }}>{cat?.name}</h1>
              <p style={{ color: '#a0a0c0', fontSize: 14 }}>{data?.total} products available</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '32px 24px' }}>
        {/* Sort */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
          <span style={{ color: '#6060a0', fontSize: 14, display: 'flex', alignItems: 'center', gap: 4 }}>
            <FiFilter size={14} /> Sort by:
          </span>
          {[
            { val: 'lowest', label: '💰 Lowest Price' },
            { val: 'rating', label: '⭐ Top Rated' },
            { val: 'discount', label: '🔥 Best Discount' }
          ].map(s => (
            <button key={s.val} onClick={() => setSort(s.val)} style={{
              background: sort === s.val ? '#FFD70020' : '#16162e',
              border: `1px solid ${sort === s.val ? '#FFD700' : '#2a2a4a'}`,
              color: sort === s.val ? '#FFD700' : '#a0a0c0',
              borderRadius: 10, padding: '8px 16px', cursor: 'pointer', fontSize: 13
            }}>{s.label}</button>
          ))}
        </div>

        <div className="product-grid">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>

        {page < totalPages && (
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <button onClick={loadMore} className="btn-secondary" style={{ padding: '12px 32px' }}>
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
