import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Gavel, Plus, Clock, Users, ChevronRight, CheckCircle,
  XCircle, Eye, TrendingDown, ArrowUpRight, X
} from 'lucide-react';

const BLUE = '#4A90D9';

const STATUS_CFG = {
  active:   { bg: '#dcfce7', color: '#15803d', ES: 'Activa',    EN: 'Active' },
  closed:   { bg: '#dbeafe', color: '#1d4ed8', ES: 'Cerrada',   EN: 'Closed' },
  draft:    { bg: '#f1f5f9', color: '#475569', ES: 'Borrador',  EN: 'Draft' },
  awarded:  { bg: '#f5f3ff', color: '#7c3aed', ES: 'Adjudicada',EN: 'Awarded' },
};

const initialTenders = [
  {
    id: 'T-001', title: { ES: 'Maíz Amarillo — Exportación Mayo 2026', EN: 'Yellow Corn — May 2026 Export' },
    product: { ES: 'Maíz Amarillo', EN: 'Yellow Corn' }, volume: 5000, unit: 'MT',
    priceFloor: 1050, currency: 'USD', basis: 'FOB', destination: 'Port Saint Joe, FL, USA',
    deadline: '2026-05-10', status: 'active', bids: [
      { id: 1, company: 'Australian Grain Co.', price: 1080, date: '25/04', note: 'Ready for May 1st shipment' },
      { id: 2, company: 'Impex Express S.A.',   price: 1095, date: '26/04', note: 'Can increase to 5,500 MT' },
      { id: 3, company: 'Golden Harvest Ltd',   price: 1100, date: '26/04', note: 'FOB Port St. Joe preferred' },
    ],
    created: '20/04/2026',
  },
  {
    id: 'T-002', title: { ES: 'Soja Premium — Julio 2026', EN: 'Premium Soybeans — July 2026' },
    product: { ES: 'Soja Premium', EN: 'Premium Soybeans' }, volume: 2000, unit: 'MT',
    priceFloor: 440, currency: 'USD', basis: 'FOB', destination: 'Rotterdam, NED',
    deadline: '2026-06-15', status: 'draft', bids: [],
    created: '26/04/2026',
  },
  {
    id: 'T-003', title: { ES: 'Trigo Pan — Cosecha 2025/26', EN: 'Wheat Pan — 2025/26 Harvest' },
    product: { ES: 'Trigo Pan', EN: 'Wheat Pan' }, volume: 8000, unit: 'MT',
    priceFloor: 300, currency: 'USD', basis: 'FOB', destination: 'Port Lavaca, TX, USA',
    deadline: '2026-03-30', status: 'awarded', bids: [
      { id: 1, company: 'CerealesBA S.R.L.',  price: 318, date: '15/03', note: '', awarded: true },
      { id: 2, company: 'Adecoagro S.A.',      price: 312, date: '14/03', note: '' },
    ],
    created: '01/03/2026',
  },
];

// New Tender Modal
function NewTenderModal({ lang, onClose, onSave }) {
  const [form, setForm] = useState({
    titleES: '', titleEN: '', productES: '', productEN: '',
    volume: '', priceFloor: '', basis: 'FOB', destination: '', deadline: '',
  });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const BASIS = ['EXW','FOB','FAS','CIF','CFR','CPT','DAP'];

  const handleSave = () => {
    if (!form.titleES || !form.volume || !form.deadline) {
      alert(lang === 'ES' ? 'Completá los campos obligatorios.' : 'Fill in required fields.'); return;
    }
    onSave({
      id: `T-00${Date.now()}`,
      title: { ES: form.titleES, EN: form.titleEN || form.titleES },
      product: { ES: form.productES, EN: form.productEN || form.productES },
      volume: Number(form.volume), unit: 'MT',
      priceFloor: Number(form.priceFloor), currency: 'USD',
      basis: form.basis, destination: form.destination,
      deadline: form.deadline, status: 'draft', bids: [],
      created: new Date().toLocaleDateString('es-AR'),
    });
  };

  const inputStyle = { width: '100%', padding: '9px 12px', border: '1.5px solid #e5e7eb', borderRadius: 7, fontSize: 13, outline: 'none', boxSizing: 'border-box' };
  const Field = ({ label, children, required }) => (
    <div style={{ marginBottom: 14 }}>
      <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 5 }}>{label}{required && <span style={{ color: '#dc2626' }}> *</span>}</label>
      {children}
    </div>
  );

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ background: '#fff', borderRadius: 12, width: '100%', maxWidth: 560, padding: 32, boxShadow: '0 24px 60px rgba(0,0,0,0.18)', maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1a1a2e', margin: 0 }}>
            {lang === 'ES' ? 'Crear nueva licitación' : 'Create new tender'}
          </h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#aaa' }}><X size={22} /></button>
        </div>

        <Field label={lang === 'ES' ? 'Título (Español)' : 'Title (Spanish)'} required>
          <input value={form.titleES} onChange={e => set('titleES', e.target.value)} placeholder={lang === 'ES' ? 'Maíz Amarillo — Exportación Mayo 2026' : 'Yellow Corn — May 2026 Export'} style={inputStyle} />
        </Field>
        <Field label={lang === 'ES' ? 'Título (Inglés)' : 'Title (English)'}>
          <input value={form.titleEN} onChange={e => set('titleEN', e.target.value)} placeholder="Yellow Corn — May 2026 Export" style={inputStyle} />
        </Field>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <Field label={lang === 'ES' ? 'Producto (ES)' : 'Product (ES)'} required>
            <input value={form.productES} onChange={e => set('productES', e.target.value)} placeholder="Maíz Amarillo" style={inputStyle} />
          </Field>
          <Field label={lang === 'ES' ? 'Producto (EN)' : 'Product (EN)'}>
            <input value={form.productEN} onChange={e => set('productEN', e.target.value)} placeholder="Yellow Corn" style={inputStyle} />
          </Field>
          <Field label={lang === 'ES' ? 'Volumen (MT)' : 'Volume (MT)'} required>
            <input type="number" value={form.volume} onChange={e => set('volume', e.target.value)} placeholder="5000" style={inputStyle} />
          </Field>
          <Field label={lang === 'ES' ? 'Precio piso (USD/MT)' : 'Floor price (USD/MT)'}>
            <input type="number" value={form.priceFloor} onChange={e => set('priceFloor', e.target.value)} placeholder="1050" style={inputStyle} />
          </Field>
          <Field label="Basis">
            <select value={form.basis} onChange={e => set('basis', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
              {BASIS.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </Field>
          <Field label={lang === 'ES' ? 'Fecha límite' : 'Deadline'} required>
            <input type="date" value={form.deadline} onChange={e => set('deadline', e.target.value)} style={inputStyle} />
          </Field>
        </div>

        <Field label={lang === 'ES' ? 'Puerto / Destino' : 'Port / Destination'}>
          <input value={form.destination} onChange={e => set('destination', e.target.value)} placeholder="Port Saint Joe, FL, USA" style={inputStyle} />
        </Field>

        <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
          <button onClick={onClose} style={{ flex: 1, padding: '11px 0', border: '1.5px solid #e5e7eb', borderRadius: 7, background: '#fff', color: '#666', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
            {lang === 'ES' ? 'Cancelar' : 'Cancel'}
          </button>
          <button onClick={handleSave} style={{ flex: 2, padding: '11px 0', background: BLUE, border: 'none', borderRadius: 7, color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
            {lang === 'ES' ? 'Crear licitación' : 'Create tender'}
          </button>
        </div>
      </div>
    </div>
  );
}

// Bid detail panel
function BidPanel({ tender, lang, onClose, onAward }) {
  const best = tender.bids.reduce((a, b) => b.price > a.price ? b : a, { price: 0 });
  return (
    <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #eee', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', overflow: 'hidden', height: 'fit-content' }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fafbfc' }}>
        <div>
          <p style={{ margin: 0, fontWeight: 700, fontSize: 14, color: '#1a1a2e' }}>{tender.id}</p>
          <p style={{ margin: 0, fontSize: 12, color: '#aaa' }}>{tender.bids.length} {lang === 'ES' ? 'ofertas recibidas' : 'bids received'}</p>
        </div>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#aaa', fontSize: 20 }}>✕</button>
      </div>

      {/* Summary */}
      <div style={{ padding: '14px 20px', borderBottom: '1px solid #f0f0f0', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
        {[
          { label: lang === 'ES' ? 'Mejor oferta' : 'Best bid',   val: `USD ${best.price}`, color: '#10b981' },
          { label: lang === 'ES' ? 'Piso' : 'Floor',               val: `USD ${tender.priceFloor}`, color: '#888' },
          { label: lang === 'ES' ? 'Volumen' : 'Volume',           val: `${tender.volume.toLocaleString()} MT`, color: '#888' },
        ].map(({ label, val, color }) => (
          <div key={label} style={{ textAlign: 'center' }}>
            <p style={{ margin: 0, fontSize: 16, fontWeight: 800, color }}>{val}</p>
            <p style={{ margin: '2px 0 0', fontSize: 11, color: '#aaa' }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Bids */}
      <div style={{ padding: '14px 20px' }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#aaa', letterSpacing: 1, marginBottom: 10 }}>{lang === 'ES' ? 'OFERTAS' : 'BIDS'}</p>
        {tender.bids.length === 0 ? (
          <p style={{ color: '#ccc', textAlign: 'center', padding: '20px 0', fontSize: 13 }}>{lang === 'ES' ? 'Sin ofertas aún' : 'No bids yet'}</p>
        ) : (
          tender.bids.map((bid, i) => (
            <div key={bid.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: i < tender.bids.length - 1 ? '1px solid #f5f5f5' : 'none' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: 13, color: '#1a1a2e' }}>{bid.company}</p>
                  {bid.price === best.price && tender.bids.length > 1 && (
                    <span style={{ fontSize: 10, fontWeight: 700, background: '#dcfce7', color: '#15803d', padding: '1px 6px', borderRadius: 4 }}>
                      {lang === 'ES' ? 'MEJOR' : 'BEST'}
                    </span>
                  )}
                  {bid.awarded && <span style={{ fontSize: 10, fontWeight: 700, background: '#f5f3ff', color: '#7c3aed', padding: '1px 6px', borderRadius: 4 }}>✓ {lang === 'ES' ? 'ADJUDICADO' : 'AWARDED'}</span>}
                </div>
                {bid.note && <p style={{ margin: '2px 0 0', fontSize: 11, color: '#aaa', fontStyle: 'italic' }}>{bid.note}</p>}
                <p style={{ margin: '1px 0 0', fontSize: 11, color: '#bbb' }}>{bid.date}</p>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <p style={{ margin: 0, fontWeight: 800, fontSize: 15, color: bid.price === best.price ? '#10b981' : BLUE }}>USD {bid.price}</p>
                <p style={{ margin: '1px 0 0', fontSize: 11, color: '#aaa' }}>/ MT</p>
              </div>
              {tender.status === 'active' && !bid.awarded && (
                <button onClick={() => onAward(tender.id, bid.id)}
                  style={{ padding: '6px 12px', background: '#dcfce7', border: 'none', borderRadius: 6, color: '#15803d', fontWeight: 700, fontSize: 11, cursor: 'pointer', flexShrink: 0 }}>
                  {lang === 'ES' ? 'Adjudicar' : 'Award'}
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Main
export default function SellerTenders() {
  const { lang } = useAuth();
  const [tenders, setTenders] = useState(initialTenders);
  const [showNew, setShowNew] = useState(false);
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState(null);

  const notify = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const handleSave = (tender) => {
    setTenders(t => [...t, tender]);
    setShowNew(false);
    notify(lang === 'ES' ? '✅ Licitación creada.' : '✅ Tender created.');
  };

  const handleAward = (tenderId, bidId) => {
    setTenders(ts => ts.map(t => t.id === tenderId ? {
      ...t, status: 'awarded',
      bids: t.bids.map(b => ({ ...b, awarded: b.id === bidId })),
    } : t));
    setSelected(s => s ? { ...s, status: 'awarded', bids: s.bids.map(b => ({ ...b, awarded: b.id === bidId })) } : s);
    notify(lang === 'ES' ? '🏆 Licitación adjudicada correctamente.' : '🏆 Tender awarded successfully.');
  };

  const selectedFull = selected ? tenders.find(t => t.id === selected.id) : null;

  return (
    <div>
      {toast && <div style={{ position: 'fixed', top: 20, right: 24, zIndex: 300, background: '#16a34a', color: '#fff', padding: '12px 20px', borderRadius: 8, fontWeight: 700, fontSize: 13, boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }}>{toast}</div>}
      {showNew && <NewTenderModal lang={lang} onClose={() => setShowNew(false)} onSave={handleSave} />}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#1a1a2e', margin: 0 }}>
            {lang === 'ES' ? 'Mis licitaciones' : 'My tenders'}
          </h1>
          <p style={{ color: '#888', fontSize: 13, margin: '4px 0 0' }}>
            {tenders.filter(t => t.status === 'active').length} {lang === 'ES' ? 'activas' : 'active'} · {tenders.reduce((a, t) => a + t.bids.length, 0)} {lang === 'ES' ? 'ofertas recibidas' : 'bids received'}
          </p>
        </div>
        <button onClick={() => setShowNew(true)}
          style={{ display: 'flex', alignItems: 'center', gap: 8, background: BLUE, color: '#fff', border: 'none', borderRadius: 7, padding: '10px 18px', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
          <Plus size={16} /> {lang === 'ES' ? 'Nueva licitación' : 'New tender'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 380px' : '1fr', gap: 20, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {tenders.map(tender => {
            const st = STATUS_CFG[tender.status];
            const isSelected = selected?.id === tender.id;
            const bestBid = tender.bids.length > 0 ? Math.max(...tender.bids.map(b => b.price)) : null;
            const daysLeft = Math.ceil((new Date(tender.deadline) - new Date()) / 86400000);

            return (
              <div key={tender.id}
                style={{ background: '#fff', borderRadius: 10, border: `1.5px solid ${isSelected ? BLUE : '#eee'}`, boxShadow: isSelected ? `0 0 0 3px ${BLUE}20` : '0 1px 8px rgba(0,0,0,0.06)', padding: 22, cursor: 'pointer', transition: 'all 0.15s' }}
                onClick={() => setSelected(isSelected ? null : tender)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: 12, color: '#aaa', fontWeight: 600 }}>{tender.id}</span>
                      <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 4, background: st.bg, color: st.color }}>{st[lang]}</span>
                    </div>
                    <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: '#1a1a2e', lineHeight: 1.3 }}>{tender.title[lang]}</h3>
                  </div>
                  <ChevronRight size={18} style={{ color: '#ddd', flexShrink: 0, marginLeft: 8 }} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
                  {[
                    { icon: Gavel,    label: lang === 'ES' ? 'Volumen' : 'Volume',   val: `${tender.volume.toLocaleString()} MT` },
                    { icon: TrendingDown, label: lang === 'ES' ? 'Precio piso' : 'Floor price', val: `USD ${tender.priceFloor}` },
                    { icon: Users,    label: lang === 'ES' ? 'Ofertas' : 'Bids',     val: tender.bids.length.toString(), highlight: tender.bids.length > 0 },
                    { icon: Clock,    label: lang === 'ES' ? 'Vence' : 'Deadline',   val: daysLeft > 0 ? `${daysLeft}d` : (lang === 'ES' ? 'Vencida' : 'Expired'), highlight: daysLeft <= 3 && daysLeft > 0 },
                  ].map(({ icon: Icon, label, val, highlight }) => (
                    <div key={label}>
                      <p style={{ margin: '0 0 2px', fontSize: 11, color: '#aaa' }}>{label}</p>
                      <p style={{ margin: 0, fontWeight: 700, fontSize: 14, color: highlight ? '#10b981' : '#1a1a2e', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Icon size={13} style={{ color: highlight ? '#10b981' : '#aaa' }} /> {val}
                      </p>
                    </div>
                  ))}
                </div>

                {bestBid && (
                  <div style={{ marginTop: 14, padding: '10px 14px', background: '#f0fdf4', borderRadius: 7, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <ArrowUpRight size={14} style={{ color: '#10b981' }} />
                    <span style={{ fontSize: 13, color: '#15803d', fontWeight: 700 }}>
                      {lang === 'ES' ? 'Mejor oferta:' : 'Best bid:'} USD {bestBid} / MT
                    </span>
                    <span style={{ fontSize: 11, color: '#6b7280', marginLeft: 'auto' }}>{tender.basis} · {tender.destination}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {selectedFull && (
          <BidPanel tender={selectedFull} lang={lang} onClose={() => setSelected(null)} onAward={handleAward} />
        )}
      </div>
    </div>
  );
}
