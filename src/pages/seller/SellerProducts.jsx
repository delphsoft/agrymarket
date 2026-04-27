import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { T } from '../../translations';
import { Plus, Edit, Pause, Play, Trash2, Search, Package } from 'lucide-react';

const BLUE = '#4A90D9';

const sampleProducts = [
  { id: 1, name: { ES: 'Maíz Amarillo 100% Limpio', EN: 'Yellow Corn 100% Clean' }, category: { ES: 'Cereales', EN: 'Grains' }, price: 'USD 1.100 - 1.800', volume: '50 - 1.000', status: 'active', updated: '20.04.2026', grade: 'Grado 1' },
  { id: 2, name: { ES: 'Soja Premium', EN: 'Premium Soybeans' },                    category: { ES: 'Oleaginosas', EN: 'Oilseeds' }, price: 'USD 450 - 520',     volume: '20 - 500',  status: 'active', updated: '18.04.2026', grade: 'Grado A' },
  { id: 3, name: { ES: 'Trigo Pan Grado 2', EN: 'Wheat Pan Grade 2' },              category: { ES: 'Cereales', EN: 'Grains' },   price: 'USD 320',           volume: '100 - 2.000',status: 'paused', updated: '10.04.2026', grade: 'Grado 2' },
  { id: 4, name: { ES: 'Girasol Alto Oleico', EN: 'High Oleic Sunflower' },         category: { ES: 'Oleaginosas', EN: 'Oilseeds' },price: 'USD 290 - 340',    volume: '50 - 800',  status: 'active', updated: '22.04.2026', grade: 'Alto Oleico' },
  { id: 5, name: { ES: 'Cebada Maltera', EN: 'Malting Barley' },                    category: { ES: 'Cereales', EN: 'Grains' },   price: 'USD 280',           volume: '30 - 600',  status: 'draft',  updated: '08.04.2026', grade: 'Maltera' },
];

const STATUS_STYLE = {
  active: { bg: '#dcfce7', color: '#15803d', label: { ES: 'Activo', EN: 'Active' } },
  paused: { bg: '#fef9c3', color: '#854d0e', label: { ES: 'Pausado', EN: 'Paused' } },
  draft:  { bg: '#f1f5f9', color: '#475569', label: { ES: 'Borrador', EN: 'Draft' } },
};

export default function SellerProducts({ onNavigate }) {
  const { lang } = useAuth();
  const t = T[lang];
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState(sampleProducts);

  const filtered = products.filter(p =>
    p.name[lang].toLowerCase().includes(search.toLowerCase())
  );

  const toggleStatus = (id) => {
    setProducts(products.map(p =>
      p.id === id ? { ...p, status: p.status === 'active' ? 'paused' : 'active' } : p
    ));
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#1a1a2e', margin: 0 }}>{t.myProducts}</h1>
          <p style={{ color: '#888', fontSize: 13, margin: '4px 0 0' }}>
            {products.length} {lang === 'ES' ? 'productos publicados' : 'products published'}
          </p>
        </div>
        <button
          onClick={() => onNavigate('/seller/products/new')}
          style={{ display: 'flex', alignItems: 'center', gap: 8, background: BLUE, color: '#fff', border: 'none', borderRadius: 6, padding: '10px 18px', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}
        >
          <Plus size={16} /> {t.newProduct}
        </button>
      </div>

      {/* Search */}
      <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #eee', padding: '14px 20px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
        <Search size={16} style={{ color: '#aaa' }} />
        <input
          type="text"
          placeholder={lang === 'ES' ? 'Buscar producto...' : 'Search product...'}
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ flex: 1, border: 'none', outline: 'none', fontSize: 14, color: '#333' }}
        />
      </div>

      {/* Table */}
      <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #eee', overflow: 'hidden', boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
        {/* Table header */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1.2fr 1fr 100px 120px', gap: 0, padding: '12px 20px', background: '#fafbfc', borderBottom: '1px solid #eee' }}>
          {[
            lang === 'ES' ? 'Producto' : 'Product',
            lang === 'ES' ? 'Categoría' : 'Category',
            lang === 'ES' ? 'Precio (USD/tn)' : 'Price (USD/MT)',
            lang === 'ES' ? 'Volumen (tn)' : 'Volume (MT)',
            t.status,
            lang === 'ES' ? 'Acciones' : 'Actions',
          ].map((h, i) => (
            <span key={i} style={{ fontSize: 11, fontWeight: 700, color: '#888', letterSpacing: 1, textTransform: 'uppercase' }}>{h}</span>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 0', color: '#ccc' }}>
            <Package size={40} style={{ margin: '0 auto 12px', display: 'block', opacity: 0.3 }} />
            <p>{t.noData}</p>
          </div>
        ) : (
          filtered.map((p, i) => {
            const st = STATUS_STYLE[p.status];
            return (
              <div
                key={p.id}
                style={{
                  display: 'grid', gridTemplateColumns: '2fr 1fr 1.2fr 1fr 100px 120px',
                  gap: 0, padding: '14px 20px', alignItems: 'center',
                  borderBottom: i < filtered.length - 1 ? '1px solid #f5f5f5' : 'none',
                  background: '#fff',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#fafbff'}
                onMouseLeave={e => e.currentTarget.style.background = '#fff'}
              >
                <div>
                  <p style={{ fontWeight: 600, color: '#1a1a2e', margin: 0, fontSize: 14 }}>{p.name[lang]}</p>
                  <p style={{ color: '#aaa', margin: '2px 0 0', fontSize: 12 }}>{t.updated}: {p.updated} · {p.grade}</p>
                </div>
                <span style={{ fontSize: 13, color: '#555' }}>{p.category[lang]}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: BLUE }}>{p.price}</span>
                <span style={{ fontSize: 13, color: '#555' }}>{p.volume}</span>
                <span style={{ display: 'inline-block', fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 4, background: st.bg, color: st.color }}>
                  {st.label[lang]}
                </span>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button onClick={() => onNavigate(`/seller/products/${p.id}/edit`)} style={{ padding: '6px', background: '#f1f5f9', border: 'none', borderRadius: 5, cursor: 'pointer', color: '#555' }} title={t.edit}>
                    <Edit size={14} />
                  </button>
                  <button onClick={() => toggleStatus(p.id)} style={{ padding: '6px', background: p.status === 'active' ? '#fef9c3' : '#dcfce7', border: 'none', borderRadius: 5, cursor: 'pointer', color: p.status === 'active' ? '#854d0e' : '#15803d' }} title={p.status === 'active' ? t.pauseProduct : t.activateProduct}>
                    {p.status === 'active' ? <Pause size={14} /> : <Play size={14} />}
                  </button>
                  <button onClick={() => deleteProduct(p.id)} style={{ padding: '6px', background: '#fef2f2', border: 'none', borderRadius: 5, cursor: 'pointer', color: '#dc2626' }} title={t.deleteProduct}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
