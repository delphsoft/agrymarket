import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Search, ChevronUp, ChevronDown, SlidersHorizontal, X } from 'lucide-react';

const BLUE = '#4A90D9';
const CYAN = '#4DBFD9';

const allListings = [
  { id: 1,  product: { ES: 'Maíz Amarillo',  EN: 'Yellow Corn' },   volMin: 50,   volMax: 1000, origin: 'Argentina', periodFrom: '01/04', periodTo: '31/05', basis: 'EXW',         destination: 'Córdoba, ARG',           price: 1100, company: 'AgroSur S.A.',          updated: '22.04.2026', category: 'Grains' },
  { id: 2,  product: { ES: 'Maíz Amarillo',  EN: 'Yellow Corn' },   volMin: 50,   volMax: 1000, origin: 'Argentina', periodFrom: '01/04', periodTo: '31/05', basis: 'FOB',         destination: 'Port Lavaca, USA',       price: 1180, company: 'AgroSur S.A.',          updated: '22.04.2026', category: 'Grains' },
  { id: 3,  product: { ES: 'Maíz Amarillo',  EN: 'Yellow Corn' },   volMin: 50,   volMax: 1000, origin: 'Argentina', periodFrom: '01/04', periodTo: '31/05', basis: 'FAS',         destination: 'Port Lavaca, USA',       price: 1150, company: 'AgroSur S.A.',          updated: '22.04.2026', category: 'Grains' },
  { id: 4,  product: { ES: 'Trigo Pan',       EN: 'Wheat Pan' },     volMin: 100,  volMax: 2000, origin: 'Argentina', periodFrom: '01/04', periodTo: '31/05', basis: 'FOB',         destination: 'Port St. Joe, USA',      price: 320,  company: 'CerealesBA S.R.L.',     updated: '18.04.2026', category: 'Grains' },
  { id: 5,  product: { ES: 'Trigo Pan',       EN: 'Wheat Pan' },     volMin: 100,  volMax: 2000, origin: 'Argentina', periodFrom: '01/04', periodTo: '31/05', basis: 'FOB',         destination: 'Port St. Joe, USA',      price: 325,  company: 'CerealesBA S.R.L.',     updated: '18.04.2026', category: 'Grains' },
  { id: 6,  product: { ES: 'Soja Premium',    EN: 'Premium Soybeans'},volMin: 20,   volMax: 500,  origin: 'Argentina', periodFrom: '15/04', periodTo: '15/06', basis: 'FOB',         destination: 'Port of Santos, BRA',   price: 450,  company: 'PampaSoja Ltda.',       updated: '24.04.2026', category: 'Oilseeds' },
  { id: 7,  product: { ES: 'Girasol Oleico',  EN: 'High Oleic Sunflower'},volMin:50, volMax:800,  origin: 'Argentina', periodFrom: '01/05', periodTo: '30/06', basis: 'FOB',         destination: 'Rotterdam, NED',         price: 290,  company: 'PampaOil S.A.',         updated: '20.04.2026', category: 'Oilseeds' },
  { id: 8,  product: { ES: 'Cebada Maltera',  EN: 'Malting Barley' },volMin: 30,   volMax: 600,  origin: 'Argentina', periodFrom: '01/06', periodTo: '31/07', basis: 'FOB',         destination: 'Hamburg, DEU',           price: 280,  company: 'PatagoniaMalt S.A.',    updated: '15.04.2026', category: 'Grains' },
  { id: 9,  product: { ES: 'Sorgo Forrajero', EN: 'Feed Sorghum' },  volMin: 100,  volMax: 1500, origin: 'Argentina', periodFrom: '-',     periodTo: '27/03', basis: 'EXW',         destination: 'Santiago del Estero',   price: 210,  company: 'NOA Granos S.R.L.',    updated: '08.04.2026', category: 'Forages' },
  { id: 10, product: { ES: 'Arroz Blanco',    EN: 'White Rice' },    volMin: 50,   volMax: 900,  origin: 'Argentina', periodFrom: '10/05', periodTo: '10/06', basis: 'CFR',         destination: 'Kingston, JAM',          price: 550,  company: 'Arrocera del Norte S.A.', updated: '10.04.2026', category: 'Grains' },
];

const ORIGINS = ['Argentina', 'Brasil', 'Uruguay', 'USA & Canada', 'Australia'];
const CATEGORIES_ES = { Grains: 'Cereales', Oilseeds: 'Oleaginosas', Forages: 'Forrajes', Legumes: 'Legumbres' };
const BASIS_ALL = ['EXW', 'FOB', 'FAS', 'CIF', 'CFR', 'CPT', 'DAP'];

function FilterSection({ title, open, onToggle, children }) {
  return (
    <div style={{ borderBottom: '1px solid #f0f0f0' }}>
      <button onClick={onToggle} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '14px 20px', border: 'none', background: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 700, color: '#1a1a2e' }}>
        {title}
        {open ? <ChevronUp size={14} style={{ color: '#aaa' }} /> : <ChevronDown size={14} style={{ color: '#aaa' }} />}
      </button>
      {open && <div style={{ padding: '0 20px 16px' }}>{children}</div>}
    </div>
  );
}

export default function BuyerSearch({ onNavigate }) {
  const { lang } = useAuth();
  const [query, setQuery]             = useState('');
  const [activeTab, setActiveTab]     = useState('BUY');
  const [selectedOrigins, setSelectedOrigins] = useState([]);
  const [selectedBasis, setSelectedBasis]     = useState([]);
  const [volMin, setVolMin]           = useState(0);
  const [volMax, setVolMax]           = useState(10000);
  const [priceMin, setPriceMin]       = useState(0);
  const [priceMax, setPriceMax]       = useState(10000);
  const [openSections, setOpenSections] = useState({ origin: true, volume: true, price: true, basis: false });
  const [sortCol, setSortCol]         = useState('price');
  const [sortDir, setSortDir]         = useState('asc');

  const toggleSection = (k) => setOpenSections(s => ({ ...s, [k]: !s[k] }));
  const toggleOrigin  = (o) => setSelectedOrigins(s => s.includes(o) ? s.filter(x => x !== o) : [...s, o]);
  const toggleBasis   = (b) => setSelectedBasis(s => s.includes(b) ? s.filter(x => x !== b) : [...s, b]);

  const clearFilters = () => {
    setSelectedOrigins([]); setSelectedBasis([]); setVolMin(0); setVolMax(10000); setPriceMin(0); setPriceMax(10000); setQuery('');
  };

  const filtered = allListings
    .filter(l => {
      const q = query.toLowerCase();
      const matchQ = !query || l.product[lang].toLowerCase().includes(q) || l.company.toLowerCase().includes(q);
      const matchO = selectedOrigins.length === 0 || selectedOrigins.some(o => l.origin.toLowerCase().includes(o.split(' ')[0].toLowerCase()));
      const matchV = l.volMax >= volMin && l.volMin <= volMax;
      const matchP = l.price >= priceMin && l.price <= priceMax;
      const matchB = selectedBasis.length === 0 || selectedBasis.includes(l.basis);
      return matchQ && matchO && matchV && matchP && matchB;
    })
    .sort((a, b) => {
      const dir = sortDir === 'asc' ? 1 : -1;
      if (sortCol === 'price')   return (a.price - b.price) * dir;
      if (sortCol === 'volume')  return (a.volMax - b.volMax) * dir;
      if (sortCol === 'company') return a.company.localeCompare(b.company) * dir;
      return 0;
    });

  const hasFilters = selectedOrigins.length > 0 || selectedBasis.length > 0 || volMin > 0 || volMax < 10000 || priceMin > 0 || priceMax < 10000;

  const handleSort = (col) => {
    if (sortCol === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortCol(col); setSortDir('asc'); }
  };

  const SortIcon = ({ col }) => sortCol === col
    ? (sortDir === 'asc' ? <ChevronUp size={12} style={{ color: BLUE }} /> : <ChevronDown size={12} style={{ color: BLUE }} />)
    : <ChevronDown size={12} style={{ color: '#ddd' }} />;

  return (
    <div>
      {/* Blue search bar — like Aliro screenshot 2 */}
      <div style={{ background: `linear-gradient(100deg,#5B8FDB,${CYAN})`, borderRadius: 10, padding: '18px 24px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ display: 'flex', background: 'rgba(255,255,255,0.15)', borderRadius: 6, overflow: 'hidden', padding: 3, gap: 2 }}>
          {[lang === 'ES' ? 'COMPRAR' : 'BUY', lang === 'ES' ? 'VENDER' : 'SELL'].map((tab, i) => (
            <button key={tab} onClick={() => setActiveTab(i === 0 ? 'BUY' : 'SELL')}
              style={{ padding: '7px 18px', border: 'none', borderRadius: 4, fontWeight: 700, fontSize: 13, cursor: 'pointer', background: (i === 0 ? activeTab === 'BUY' : activeTab === 'SELL') ? '#fff' : 'transparent', color: (i === 0 ? activeTab === 'BUY' : activeTab === 'SELL') ? BLUE : '#fff', letterSpacing: 0.5 }}>
              {tab}
            </button>
          ))}
        </div>
        <div style={{ flex: 1, background: '#fff', borderRadius: 6, display: 'flex', alignItems: 'center', padding: '0 14px', height: 42 }}>
          <input type="text" placeholder={lang === 'ES' ? '¿Qué estás buscando?' : 'What are you looking for?'} value={query} onChange={e => setQuery(e.target.value)}
            style={{ flex: 1, border: 'none', outline: 'none', fontSize: 14, color: '#333' }} />
          <Search size={18} style={{ color: CYAN, flexShrink: 0 }} />
        </div>
      </div>

      {/* Breadcrumb */}
      <p style={{ fontSize: 12, color: '#aaa', marginBottom: 16, fontWeight: 600 }}>
        {lang === 'ES' ? 'INICIO' : 'HOME'} → {lang === 'ES' ? 'PRODUCTOS' : 'PRODUCTS'} → {lang === 'ES' ? 'AGRICULTURA' : 'AGRICULTURE'}{query ? ` → ${query.toUpperCase()}` : ''}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 20, alignItems: 'start' }}>

        {/* ── SIDEBAR FILTERS ── */}
        <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #eee', boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px', borderBottom: '1px solid #f0f0f0' }}>
            <p style={{ margin: 0, fontWeight: 700, fontSize: 15, color: '#1a1a2e' }}>
              {filtered.length} {lang === 'ES' ? 'resultados' : 'results'}
            </p>
            {hasFilters && (
              <button onClick={clearFilters} style={{ display: 'flex', alignItems: 'center', gap: 4, background: '#fee2e2', border: 'none', borderRadius: 5, padding: '4px 10px', color: '#dc2626', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>
                <X size={11} /> {lang === 'ES' ? 'LIMPIAR' : 'CLEAR'}
              </button>
            )}
          </div>

          {/* Origin */}
          <FilterSection title={lang === 'ES' ? 'ORIGEN' : 'ORIGIN'} open={openSections.origin} onToggle={() => toggleSection('origin')}>
            {ORIGINS.map(o => (
              <label key={o} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, cursor: 'pointer' }}>
                <div onClick={() => toggleOrigin(o)}
                  style={{ width: 16, height: 16, border: `2px solid ${selectedOrigins.includes(o) ? BLUE : '#ddd'}`, borderRadius: 3, background: selectedOrigins.includes(o) ? BLUE : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, cursor: 'pointer' }}>
                  {selectedOrigins.includes(o) && <div style={{ width: 8, height: 8, background: '#fff', borderRadius: 1 }} />}
                </div>
                <span style={{ fontSize: 13, color: '#555' }}>{o}</span>
                <span style={{ marginLeft: 'auto', fontSize: 11, color: '#ccc', background: '#f5f5f5', padding: '1px 6px', borderRadius: 8 }}>
                  {allListings.filter(l => l.origin.toLowerCase().includes(o.split(' ')[0].toLowerCase())).length}
                </span>
              </label>
            ))}
          </FilterSection>

          {/* Volume */}
          <FilterSection title={lang === 'ES' ? 'VOLUMEN (tn)' : 'VOLUME (MT)'} open={openSections.volume} onToggle={() => toggleSection('volume')}>
            <div style={{ background: `linear-gradient(to right, ${CYAN}, #4A90D9)`, height: 6, borderRadius: 3, marginBottom: 12 }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 6 }}>
              <input type="number" value={volMin} onChange={e => setVolMin(Number(e.target.value))} style={{ padding: '6px 8px', border: '1px solid #e5e7eb', borderRadius: 5, fontSize: 12, outline: 'none', textAlign: 'center' }} />
              <span style={{ fontSize: 12, color: '#aaa' }}>-</span>
              <input type="number" value={volMax} onChange={e => setVolMax(Number(e.target.value))} style={{ padding: '6px 8px', border: '1px solid #e5e7eb', borderRadius: 5, fontSize: 12, outline: 'none', textAlign: 'center' }} />
            </div>
            <p style={{ margin: '8px 0 0', fontSize: 11, color: '#aaa', textAlign: 'center' }}>{volMin} MT — {volMax} MT</p>
          </FilterSection>

          {/* Price */}
          <FilterSection title={lang === 'ES' ? 'PRECIO (USD/tn)' : 'PRICE (USD/MT)'} open={openSections.price} onToggle={() => toggleSection('price')}>
            <div style={{ background: `linear-gradient(to right, ${CYAN}, #4A90D9)`, height: 6, borderRadius: 3, marginBottom: 12 }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 6 }}>
              <input type="number" value={priceMin} onChange={e => setPriceMin(Number(e.target.value))} style={{ padding: '6px 8px', border: '1px solid #e5e7eb', borderRadius: 5, fontSize: 12, outline: 'none', textAlign: 'center' }} />
              <span style={{ fontSize: 12, color: '#aaa' }}>-</span>
              <input type="number" value={priceMax} onChange={e => setPriceMax(Number(e.target.value))} style={{ padding: '6px 8px', border: '1px solid #e5e7eb', borderRadius: 5, fontSize: 12, outline: 'none', textAlign: 'center' }} />
            </div>
            <p style={{ margin: '8px 0 0', fontSize: 11, color: '#aaa', textAlign: 'center' }}>USD {priceMin} — USD {priceMax}</p>
          </FilterSection>

          {/* Basis */}
          <FilterSection title="BASIS" open={openSections.basis} onToggle={() => toggleSection('basis')}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {BASIS_ALL.map(b => (
                <button key={b} onClick={() => toggleBasis(b)}
                  style={{ padding: '4px 10px', borderRadius: 14, border: '1.5px solid', fontSize: 11, fontWeight: 600, cursor: 'pointer', borderColor: selectedBasis.includes(b) ? BLUE : '#e5e7eb', background: selectedBasis.includes(b) ? '#eff6ff' : '#fff', color: selectedBasis.includes(b) ? BLUE : '#888' }}>
                  {b}
                </button>
              ))}
            </div>
          </FilterSection>
        </div>

        {/* ── RESULTS TABLE ── */}
        <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #eee', overflow: 'hidden', boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
          {/* Columns */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 80px 1fr 90px 1fr', padding: '12px 20px', background: '#fafbfc', borderBottom: '1px solid #eee', gap: 8 }}>
            {[
              { label: lang === 'ES' ? 'PRODUCTO' : 'PRODUCT',     col: null },
              { label: lang === 'ES' ? 'VOLUMEN MT' : 'VOLUME MT',  col: 'volume' },
              { label: lang === 'ES' ? 'ORIGEN' : 'ORIGIN',         col: null },
              { label: lang === 'ES' ? 'PERÍODO' : 'PERIOD',         col: null },
              { label: 'BASIS',                                        col: null },
              { label: lang === 'ES' ? 'DESTINO' : 'DESTINATION',    col: null },
              { label: lang === 'ES' ? 'PRECIO MT' : 'PRICE MT',     col: 'price' },
              { label: lang === 'ES' ? 'EMPRESA' : 'COMPANY',        col: 'company' },
            ].map(({ label, col }) => (
              <button key={label} onClick={col ? () => handleSort(col) : undefined}
                style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', cursor: col ? 'pointer' : 'default', padding: 0, fontSize: 11, fontWeight: 700, color: sortCol === col ? BLUE : '#888', letterSpacing: 0.7, textAlign: 'left' }}>
                {label} {col && <SortIcon col={col} />}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 0', color: '#ccc' }}>
              <SlidersHorizontal size={40} style={{ display: 'block', margin: '0 auto 12px', opacity: 0.3 }} />
              <p>{lang === 'ES' ? 'Sin resultados con estos filtros' : 'No results with these filters'}</p>
            </div>
          ) : (
            filtered.map((l, i) => (
              <div key={l.id}
                style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 80px 1fr 90px 1fr', padding: '13px 20px', alignItems: 'center', borderBottom: i < filtered.length - 1 ? '1px solid #f5f5f5' : 'none', background: '#fff', cursor: 'pointer', gap: 8 }}
                onMouseEnter={e => e.currentTarget.style.background = '#fafbff'}
                onMouseLeave={e => e.currentTarget.style.background = '#fff'}
              >
                <div>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: 13, color: '#1a1a2e' }}>{l.product[lang]}</p>
                  <p style={{ margin: '1px 0 0', fontSize: 11, color: '#aaa' }}>{lang === 'ES' ? 'Actualizado' : 'Updated'}: {l.updated}</p>
                </div>
                <span style={{ fontSize: 13, color: '#555' }}>{l.volMin.toLocaleString()} - {l.volMax.toLocaleString()}</span>
                <span style={{ fontSize: 13, color: '#555' }}>{l.origin}...</span>
                <span style={{ fontSize: 12, color: '#555' }}>{l.periodFrom}/{l.periodTo}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#555' }}>{l.basis}</span>
                <span style={{ fontSize: 12, color: '#555', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l.destination}</span>
                <span style={{ fontSize: 14, fontWeight: 800, color: BLUE }}>${l.price}</span>
                <span style={{ fontSize: 12, color: '#666', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l.company.substring(0, 14)}...</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
