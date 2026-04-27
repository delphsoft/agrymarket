import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Search, CheckCircle, XCircle, Star, Trash2, Eye, Package } from 'lucide-react';

const BLUE = '#4A90D9';

const allListings = [
  { id: 1,  name: { ES: 'Maíz Amarillo 100% Limpio', EN: 'Yellow Corn 100% Clean' }, category: { ES: 'Cereales', EN: 'Grains' },    seller: 'AgroSur S.A.',          price: 'USD 1.100-1.800', volume: '1.000 tn', status: 'active',   featured: true,  date: '22/04/2026' },
  { id: 2,  name: { ES: 'Soja Premium',              EN: 'Premium Soybeans' },        category: { ES: 'Oleaginosas', EN: 'Oilseeds'}, seller: 'PampaSoja Ltda.',       price: 'USD 450-520',    volume: '500 tn',   status: 'pending',  featured: false, date: '24/04/2026' },
  { id: 3,  name: { ES: 'Trigo Pan Grado 2',         EN: 'Wheat Pan Grade 2' },       category: { ES: 'Cereales', EN: 'Grains' },    seller: 'CerealesBA S.R.L.',     price: 'USD 320',        volume: '2.000 tn', status: 'active',   featured: false, date: '18/04/2026' },
  { id: 4,  name: { ES: 'Girasol Alto Oleico',       EN: 'High Oleic Sunflower' },    category: { ES: 'Oleaginosas', EN: 'Oilseeds'}, seller: 'PampaOil S.A.',         price: 'USD 290-340',    volume: '800 tn',   status: 'pending',  featured: false, date: '25/04/2026' },
  { id: 5,  name: { ES: 'Cebada Maltera',            EN: 'Malting Barley' },          category: { ES: 'Cereales', EN: 'Grains' },    seller: 'PatagoniaMalt S.A.',    price: 'USD 280',        volume: '600 tn',   status: 'active',   featured: true,  date: '05/04/2026' },
  { id: 6,  name: { ES: 'Sorgo Forrajero',           EN: 'Feed Sorghum' },            category: { ES: 'Forrajes', EN: 'Forages' },   seller: 'NOA Granos S.R.L.',     price: 'USD 210-250',    volume: '1.500 tn', status: 'rejected', featured: false, date: '20/04/2026' },
  { id: 7,  name: { ES: 'Arroz Blanco Premium',      EN: 'White Rice Premium' },      category: { ES: 'Cereales', EN: 'Grains' },    seller: 'Arrocera del Norte',    price: 'USD 550-620',    volume: '900 tn',   status: 'active',   featured: false, date: '10/04/2026' },
  { id: 8,  name: { ES: 'Soja Orgánica Cert.',       EN: 'Certified Organic Soy' },   category: { ES: 'Oleaginosas', EN: 'Oilseeds'}, seller: 'OrganicPampa S.A.',     price: 'USD 490-560',    volume: '400 tn',   status: 'pending',  featured: false, date: '26/04/2026' },
];

const STATUS_CFG = {
  active:   { bg: '#dcfce7', color: '#15803d', ES: 'Activo',     EN: 'Active' },
  pending:  { bg: '#fef9c3', color: '#854d0e', ES: 'Pendiente',  EN: 'Pending' },
  rejected: { bg: '#fee2e2', color: '#dc2626', ES: 'Rechazado',  EN: 'Rejected' },
};

export default function AdminListings() {
  const { lang } = useAuth();
  const [listings, setListings] = useState(allListings);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filtered = listings.filter(l => {
    const q = search.toLowerCase();
    const matchQ = !search || l.name[lang].toLowerCase().includes(q) || l.seller.toLowerCase().includes(q);
    const matchS = filterStatus === 'all' || l.status === filterStatus;
    return matchQ && matchS;
  });

  const setStatus = (id, status) => setListings(ls => ls.map(l => l.id === id ? { ...l, status } : l));
  const toggleFeatured = (id) => setListings(ls => ls.map(l => l.id === id ? { ...l, featured: !l.featured } : l));
  const remove = (id) => setListings(ls => ls.filter(l => l.id !== id));

  const pending = listings.filter(l => l.status === 'pending').length;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#1a1a2e', margin: 0 }}>
            {lang === 'ES' ? 'Gestión de listados' : 'Listings management'}
          </h1>
          <p style={{ color: '#888', fontSize: 13, margin: '4px 0 0' }}>
            {listings.length} {lang === 'ES' ? 'listados en total' : 'total listings'}
            {pending > 0 && <span style={{ marginLeft: 10, color: '#854d0e', fontWeight: 700 }}>· {pending} {lang === 'ES' ? 'esperando aprobación' : 'awaiting approval'}</span>}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #eee', padding: '13px 20px', marginBottom: 16, display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 200, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Search size={15} style={{ color: '#aaa' }} />
          <input type="text" placeholder={lang === 'ES' ? 'Buscar producto o empresa...' : 'Search product or company...'} value={search} onChange={e => setSearch(e.target.value)}
            style={{ border: 'none', outline: 'none', fontSize: 14, color: '#333', flex: 1 }} />
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {['all', 'pending', 'active', 'rejected'].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)}
              style={{ padding: '6px 14px', borderRadius: 16, border: '1.5px solid', fontSize: 12, fontWeight: 600, cursor: 'pointer',
                borderColor: filterStatus === s ? BLUE : '#e5e7eb',
                background: filterStatus === s ? '#eff6ff' : '#fff',
                color: filterStatus === s ? BLUE : '#888' }}>
              {s === 'all' ? (lang === 'ES' ? 'Todos' : 'All') : STATUS_CFG[s]?.[lang]}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #eee', overflow: 'hidden', boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 90px 160px', padding: '11px 20px', background: '#fafbfc', borderBottom: '1px solid #eee' }}>
          {[
            lang === 'ES' ? 'Producto' : 'Product',
            lang === 'ES' ? 'Categoría' : 'Category',
            lang === 'ES' ? 'Vendedor' : 'Seller',
            lang === 'ES' ? 'Precio' : 'Price',
            'Estado',
            lang === 'ES' ? 'Acciones' : 'Actions',
          ].map((h, i) => (
            <span key={i} style={{ fontSize: 11, fontWeight: 700, color: '#888', letterSpacing: 1, textTransform: 'uppercase' }}>{h}</span>
          ))}
        </div>

        {filtered.map((l, i) => {
          const st = STATUS_CFG[l.status];
          return (
            <div key={l.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 90px 160px', padding: '13px 20px', alignItems: 'center', borderBottom: i < filtered.length - 1 ? '1px solid #f5f5f5' : 'none', background: '#fff' }}
              onMouseEnter={e => e.currentTarget.style.background = '#fafbff'}
              onMouseLeave={e => e.currentTarget.style.background = '#fff'}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {l.featured && <Star size={13} style={{ color: '#f59e0b', flexShrink: 0 }} fill="#f59e0b" />}
                <div>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: 14, color: '#1a1a2e' }}>{l.name[lang]}</p>
                  <p style={{ margin: '2px 0 0', fontSize: 11, color: '#aaa' }}>{l.date} · {l.volume}</p>
                </div>
              </div>
              <span style={{ fontSize: 13, color: '#555' }}>{l.category[lang]}</span>
              <span style={{ fontSize: 13, color: '#555' }}>{l.seller}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: BLUE }}>{l.price}</span>
              <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 4, background: st.bg, color: st.color }}>{st[lang]}</span>

              <div style={{ display: 'flex', gap: 5 }}>
                {l.status === 'pending' && <>
                  <button onClick={() => setStatus(l.id, 'active')} style={{ padding: '5px 7px', background: '#dcfce7', border: 'none', borderRadius: 5, cursor: 'pointer', color: '#15803d' }} title={lang === 'ES' ? 'Aprobar' : 'Approve'}>
                    <CheckCircle size={13} />
                  </button>
                  <button onClick={() => setStatus(l.id, 'rejected')} style={{ padding: '5px 7px', background: '#fee2e2', border: 'none', borderRadius: 5, cursor: 'pointer', color: '#dc2626' }} title={lang === 'ES' ? 'Rechazar' : 'Reject'}>
                    <XCircle size={13} />
                  </button>
                </>}
                <button onClick={() => toggleFeatured(l.id)} style={{ padding: '5px 7px', background: l.featured ? '#fef9c3' : '#f1f5f9', border: 'none', borderRadius: 5, cursor: 'pointer', color: l.featured ? '#854d0e' : '#888' }} title={lang === 'ES' ? 'Destacar' : 'Feature'}>
                  <Star size={13} fill={l.featured ? '#f59e0b' : 'none'} />
                </button>
                <button onClick={() => remove(l.id)} style={{ padding: '5px 7px', background: '#fef2f2', border: 'none', borderRadius: 5, cursor: 'pointer', color: '#dc2626' }} title={lang === 'ES' ? 'Eliminar' : 'Delete'}>
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px 0', color: '#ccc' }}>
            <Package size={40} style={{ display: 'block', margin: '0 auto 12px', opacity: 0.3 }} />
            <p>{lang === 'ES' ? 'Sin resultados' : 'No results'}</p>
          </div>
        )}
      </div>
    </div>
  );
}
