import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Gavel, Clock, Building2, TrendingUp, ChevronRight, Send, X } from 'lucide-react';

const BLUE   = '#4A90D9';
const PURPLE = '#7c3aed';

const initialTenders = [
  {
    id: 'T-001', title: { ES: 'Maíz Amarillo — Exportación Mayo 2026', EN: 'Yellow Corn — May 2026 Export' },
    product: { ES: 'Maíz Amarillo', EN: 'Yellow Corn' }, volume: 5000,
    priceFloor: 1050, currency: 'USD', basis: 'FOB', destination: 'Port Saint Joe, FL, USA',
    deadline: '2026-05-10', seller: 'AgroSur S.A.', status: 'active',
    bids: [
      { company: 'Australian Grain Co.', price: 1080 },
      { company: 'Golden Harvest Ltd',   price: 1100 },
    ],
    myBid: null,
  },
  {
    id: 'T-004', title: { ES: 'Soja Orgánica Certificada — Junio 2026', EN: 'Certified Organic Soybeans — June 2026' },
    product: { ES: 'Soja Orgánica', EN: 'Organic Soybeans' }, volume: 1500,
    priceFloor: 480, currency: 'USD', basis: 'FOB', destination: 'Rotterdam, NED',
    deadline: '2026-05-20', seller: 'OrganicPampa S.A.', status: 'active',
    bids: [{ company: 'Impex Express S.A.', price: 495 }],
    myBid: null,
  },
  {
    id: 'T-005', title: { ES: 'Cebada Maltera — Cosecha 2026', EN: 'Malting Barley — 2026 Harvest' },
    product: { ES: 'Cebada Maltera', EN: 'Malting Barley' }, volume: 3000,
    priceFloor: 265, currency: 'USD', basis: 'FOB', destination: 'Hamburg, DEU',
    deadline: '2026-06-01', seller: 'PatagoniaMalt S.A.', status: 'active',
    bids: [],
    myBid: { price: 275, note: 'Ready for June shipment', date: 'Hoy' },
  },
];

function BidModal({ tender, lang, onClose, onSubmit }) {
  const [price, setPrice] = useState(tender.priceFloor + 5);
  const [note, setNote]   = useState('');
  const bestBid = tender.bids.length > 0 ? Math.max(...tender.bids.map(b => b.price)) : tender.priceFloor;

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ background: '#fff', borderRadius: 12, width: '100%', maxWidth: 440, padding: 32, boxShadow: '0 24px 60px rgba(0,0,0,0.18)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: '#1a1a2e', margin: 0 }}>
            {lang === 'ES' ? 'Hacer una oferta' : 'Place a bid'} — {tender.id}
          </h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#aaa' }}><X size={20} /></button>
        </div>

        {/* Context */}
        <div style={{ background: '#f8faff', borderRadius: 8, padding: '12px 16px', marginBottom: 20 }}>
          <p style={{ margin: '0 0 4px', fontWeight: 700, fontSize: 13, color: '#1a1a2e' }}>{tender.title[lang]}</p>
          <p style={{ margin: 0, fontSize: 12, color: '#888' }}>
            {tender.volume.toLocaleString()} MT · {tender.basis} · {tender.destination}
          </p>
          <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
            <span style={{ fontSize: 12, color: '#888' }}>{lang === 'ES' ? 'Piso:' : 'Floor:'} <strong style={{ color: '#dc2626' }}>USD {tender.priceFloor}</strong></span>
            <span style={{ fontSize: 12, color: '#888' }}>{lang === 'ES' ? 'Mejor oferta:' : 'Best bid:'} <strong style={{ color: '#10b981' }}>USD {bestBid}</strong></span>
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>
            {lang === 'ES' ? 'Tu oferta (USD/MT)' : 'Your bid (USD/MT)'} *
          </label>
          <input type="number" value={price} onChange={e => setPrice(Number(e.target.value))}
            style={{ width: '100%', padding: '11px 14px', border: `2px solid ${price > bestBid ? '#10b981' : price >= tender.priceFloor ? BLUE : '#dc2626'}`, borderRadius: 8, fontSize: 16, fontWeight: 700, outline: 'none', boxSizing: 'border-box', color: '#1a1a2e', textAlign: 'center' }} />
          {price < tender.priceFloor && (
            <p style={{ margin: '4px 0 0', fontSize: 11, color: '#dc2626' }}>⚠️ {lang === 'ES' ? 'Tu oferta está por debajo del precio piso.' : 'Your bid is below the floor price.'}</p>
          )}
          {price > bestBid && (
            <p style={{ margin: '4px 0 0', fontSize: 11, color: '#10b981' }}>✅ {lang === 'ES' ? 'Tu oferta es la mejor actualmente.' : 'Your bid is currently the best.'}</p>
          )}
        </div>

        <div style={{ marginBottom: 22 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>
            {lang === 'ES' ? 'Nota (opcional)' : 'Note (optional)'}
          </label>
          <textarea value={note} onChange={e => setNote(e.target.value)} rows={2}
            placeholder={lang === 'ES' ? 'Ej: Podemos ofrecer entrega inmediata...' : 'E.g.: We can offer immediate delivery...'}
            style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #e5e7eb', borderRadius: 7, fontSize: 13, outline: 'none', resize: 'none', boxSizing: 'border-box' }} />
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={onClose} style={{ flex: 1, padding: '11px 0', border: '1.5px solid #e5e7eb', borderRadius: 7, background: '#fff', color: '#666', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
            {lang === 'ES' ? 'Cancelar' : 'Cancel'}
          </button>
          <button onClick={() => onSubmit({ price, note })} disabled={price < tender.priceFloor}
            style={{ flex: 2, padding: '11px 0', background: price < tender.priceFloor ? '#e5e7eb' : PURPLE, border: 'none', borderRadius: 7, color: '#fff', fontWeight: 700, fontSize: 13, cursor: price < tender.priceFloor ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <Send size={14} /> {lang === 'ES' ? 'Enviar oferta' : 'Submit bid'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BuyerTenders() {
  const { lang } = useAuth();
  const [tenders, setTenders] = useState(initialTenders);
  const [bidModal, setBidModal] = useState(null);
  const [toast, setToast]       = useState(null);

  const notify = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3500); };

  const handleBid = ({ price, note }) => {
    setTenders(ts => ts.map(t => t.id === bidModal.id
      ? { ...t, myBid: { price, note, date: lang === 'ES' ? 'Hoy' : 'Today' }, bids: [...t.bids.filter(b => b.company !== 'Yo'), { company: 'Yo', price }] }
      : t
    ));
    setBidModal(null);
    notify(lang === 'ES' ? `✅ Oferta de USD ${price}/MT enviada.` : `✅ Bid of USD ${price}/MT submitted.`);
  };

  const daysLeft = (deadline) => Math.ceil((new Date(deadline) - new Date()) / 86400000);

  return (
    <div>
      {toast && <div style={{ position: 'fixed', top: 20, right: 24, zIndex: 300, background: '#16a34a', color: '#fff', padding: '12px 20px', borderRadius: 8, fontWeight: 700, fontSize: 13, boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }}>{toast}</div>}
      {bidModal && <BidModal tender={bidModal} lang={lang} onClose={() => setBidModal(null)} onSubmit={handleBid} />}

      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#1a1a2e', margin: 0 }}>
          {lang === 'ES' ? 'Licitaciones activas' : 'Active tenders'}
        </h1>
        <p style={{ color: '#888', fontSize: 13, margin: '4px 0 0' }}>
          {tenders.filter(t => t.status === 'active').length} {lang === 'ES' ? 'licitaciones disponibles para ofertar' : 'tenders available to bid on'}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {tenders.map(tender => {
          const best = tender.bids.length > 0 ? Math.max(...tender.bids.map(b => b.price)) : null;
          const days = daysLeft(tender.deadline);
          const hasBid = !!tender.myBid;

          return (
            <div key={tender.id} style={{ background: '#fff', borderRadius: 10, border: `1.5px solid ${hasBid ? PURPLE + '40' : '#eee'}`, boxShadow: '0 1px 8px rgba(0,0,0,0.06)', padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 12, color: '#aaa', fontWeight: 600 }}>{tender.id}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 4, background: '#dcfce7', color: '#15803d' }}>
                      {lang === 'ES' ? 'Activa' : 'Active'}
                    </span>
                    {hasBid && (
                      <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 4, background: '#f5f3ff', color: PURPLE }}>
                        {lang === 'ES' ? '✓ Oferta enviada' : '✓ Bid placed'}
                      </span>
                    )}
                  </div>
                  <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#1a1a2e' }}>{tender.title[lang]}</h3>
                </div>
                {!hasBid ? (
                  <button onClick={() => setBidModal(tender)}
                    style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '10px 20px', background: PURPLE, color: '#fff', border: 'none', borderRadius: 7, fontWeight: 700, fontSize: 13, cursor: 'pointer', flexShrink: 0 }}>
                    <Gavel size={15} /> {lang === 'ES' ? 'Hacer oferta' : 'Place bid'}
                  </button>
                ) : (
                  <button onClick={() => setBidModal(tender)}
                    style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '10px 20px', background: '#f5f3ff', color: PURPLE, border: '1.5px solid #ddd6fe', borderRadius: 7, fontWeight: 700, fontSize: 13, cursor: 'pointer', flexShrink: 0 }}>
                    <Gavel size={15} /> {lang === 'ES' ? 'Modificar oferta' : 'Update bid'}
                  </button>
                )}
              </div>

              {/* Stats row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 16, marginBottom: 16 }}>
                {[
                  { label: lang === 'ES' ? 'Volumen' : 'Volume',       val: `${tender.volume.toLocaleString()} MT` },
                  { label: lang === 'ES' ? 'Precio piso' : 'Floor',     val: `USD ${tender.priceFloor}`,          color: '#dc2626' },
                  { label: lang === 'ES' ? 'Mejor oferta' : 'Best bid', val: best ? `USD ${best}` : '-',          color: '#10b981' },
                  { label: lang === 'ES' ? 'Ofertas' : 'Bids',          val: tender.bids.length.toString() },
                  { label: lang === 'ES' ? 'Vence en' : 'Closes in',    val: days > 0 ? `${days}d` : (lang === 'ES' ? 'Vencida' : 'Expired'), color: days <= 3 ? '#dc2626' : undefined },
                ].map(({ label, val, color }) => (
                  <div key={label}>
                    <p style={{ margin: '0 0 2px', fontSize: 11, color: '#aaa' }}>{label}</p>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: 14, color: color || '#1a1a2e' }}>{val}</p>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 14, borderTop: '1px solid #f5f5f5' }}>
                <div style={{ display: 'flex', gap: 16 }}>
                  <span style={{ fontSize: 12, color: '#888', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Building2 size={13} /> {tender.seller}
                  </span>
                  <span style={{ fontSize: 12, color: '#888' }}>{tender.basis} · {tender.destination}</span>
                </div>
                {hasBid && (
                  <div style={{ fontSize: 12, color: PURPLE, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <TrendingUp size={13} />
                    {lang === 'ES' ? 'Tu oferta:' : 'Your bid:'} USD {tender.myBid.price}/MT
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
