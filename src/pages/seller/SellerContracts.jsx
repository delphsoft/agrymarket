import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FileText, Search, ChevronRight, CheckCircle, XCircle, MessageSquare, Download, Edit3 } from 'lucide-react';

const BLUE = '#4A90D9';

const STATUS_CFG = {
  new:        { bg: '#ccfbf1', color: '#0f766e', ES: 'Nuevo',       EN: 'New' },
  progress:   { bg: '#dbeafe', color: '#1d4ed8', ES: 'En progreso', EN: 'In Progress' },
  countered:  { bg: '#fef9c3', color: '#854d0e', ES: 'Contra-oferta',EN: 'Counter offer' },
  signed:     { bg: '#dcfce7', color: '#15803d', ES: 'Firmado',     EN: 'Signed' },
  terminated: { bg: '#fee2e2', color: '#b45309', ES: 'Terminado',   EN: 'Terminated' },
};

const initialContracts = [
  { id: 256, product: { ES: 'Trigo Pan Grado 2',        EN: 'Wheat Pan Grade 2' },       volume: 1200, price: 185, currency: 'USD', status: 'progress',   buyer: 'Australian Grain Co.', periodFrom: '01/04/2026', periodTo: '01/05/2026', destination: 'Port Saint Joe, FL, USA',  basis: 'FOB (Bulk)',      country: 'USA',       date: '01/04/2026',
    history: [
      { date: '01/04', from: 'Vendedor',  action: { ES: 'Oferta inicial enviada', EN: 'Initial offer sent' }, price: 185, basis: 'FOB (Bulk)' },
    ]
  },
  { id: 253, product: { ES: 'Trigo Pan Grado 2',        EN: 'Wheat Pan Grade 2' },       volume: 1200, price: 183, currency: 'USD', status: 'signed',     buyer: 'Adecoagro S.A.',        periodFrom: '-',          periodTo: '06/04/2026', destination: 'Port Saint Joe, FL, USA',  basis: 'FOB (Container)', country: 'ARG',      date: '12/03/2026',
    history: [
      { date: '10/03', from: 'Vendedor',  action: { ES: 'Oferta inicial enviada', EN: 'Initial offer sent' }, price: 190, basis: 'FOB' },
      { date: '11/03', from: 'Comprador', action: { ES: 'Contra-oferta recibida', EN: 'Counter-offer received' }, price: 183, basis: 'FOB (Container)' },
      { date: '12/03', from: 'Vendedor',  action: { ES: 'Oferta aceptada — contrato firmado', EN: 'Offer accepted — contract signed' }, price: 183, basis: 'FOB (Container)' },
    ]
  },
  { id: 251, product: { ES: 'Maíz Amarillo 100% Limpio', EN: 'Yellow Corn 100% Clean' }, volume: 4000, price: 186, currency: 'USD', status: 'countered',  buyer: 'Golden Harvest Ltd',    periodFrom: '-',          periodTo: '05/04/2026', destination: 'Port St. Lucie, FL, USA',  basis: 'FOB (Container)', country: 'AUS',      date: '08/03/2026',
    counterOffer: { price: 180, basis: 'CIF', note: 'We prefer CIF basis and price USD 180.' },
    history: [
      { date: '08/03', from: 'Vendedor',  action: { ES: 'Oferta inicial enviada', EN: 'Initial offer sent' }, price: 186, basis: 'FOB (Container)' },
      { date: '09/03', from: 'Comprador', action: { ES: 'Contra-oferta recibida', EN: 'Counter-offer received' }, price: 180, basis: 'CIF' },
    ]
  },
  { id: 248, product: { ES: 'Cebada Maltera',            EN: 'Malting Barley' },          volume: 1000, price: 168, currency: 'USD', status: 'terminated', buyer: 'Adecoagro S.A.',        periodFrom: '-',          periodTo: '20/03/2026', destination: 'Port Saint Joe, FL, USA',  basis: 'FAS (Container)', country: 'ARG',      date: '08/03/2026',
    history: [
      { date: '08/03', from: 'Vendedor',  action: { ES: 'Oferta inicial enviada', EN: 'Initial offer sent' }, price: 168, basis: 'FAS' },
      { date: '15/03', from: 'Sistema',   action: { ES: 'Contrato vencido sin acuerdo', EN: 'Contract expired without agreement' }, price: 168, basis: 'FAS' },
    ]
  },
  { id: 247, product: { ES: 'Sorgo Forrajero',           EN: 'Feed Sorghum' },            volume: 1000, price: 133, currency: 'USD', status: 'new',        buyer: 'Impex Express S.A.',    periodFrom: '-',          periodTo: '27/03/2026', destination: "Port O'Connor, TX, USA",    basis: 'FOB (Container)', country: 'UY',       date: '08/03/2026',
    history: [
      { date: '08/03', from: 'Comprador', action: { ES: 'Solicitud de contrato recibida', EN: 'Contract request received' }, price: 133, basis: 'FOB (Container)' },
    ]
  },
];

// ── Counter-offer modal ────────────────────────────────────────────────────────
function CounterModal({ contract, lang, onClose, onSend }) {
  const [price, setPrice] = useState(contract.counterOffer?.price || contract.price);
  const [basis, setBasis] = useState(contract.counterOffer?.basis || contract.basis);
  const [note, setNote]   = useState('');
  const BASIS = ['EXW','FOB','FAS','CIF','CFR','CPT','DAP','FOB (Bulk)','FOB (Container)','FAS (Container)'];

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ background: '#fff', borderRadius: 12, width: '100%', maxWidth: 480, padding: 32, boxShadow: '0 24px 60px rgba(0,0,0,0.18)' }}>
        <h3 style={{ fontSize: 17, fontWeight: 700, color: '#1a1a2e', marginTop: 0, marginBottom: 6 }}>
          {lang === 'ES' ? 'Responder contra-oferta' : 'Respond to counter-offer'} — #{contract.id}
        </h3>
        {contract.counterOffer && (
          <div style={{ background: '#fef9c3', border: '1px solid #fde68a', borderRadius: 8, padding: '10px 14px', marginBottom: 20, fontSize: 13, color: '#854d0e' }}>
            <strong>{lang === 'ES' ? 'Contra-oferta del comprador:' : 'Buyer counter-offer:'}</strong><br />
            USD {contract.counterOffer.price}/tn · {contract.counterOffer.basis}
            {contract.counterOffer.note && <><br /><em>"{contract.counterOffer.note}"</em></>}
          </div>
        )}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>
              {lang === 'ES' ? 'Tu precio (USD/tn)' : 'Your price (USD/MT)'}
            </label>
            <input type="number" value={price} onChange={e => setPrice(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #e5e7eb', borderRadius: 7, fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Basis</label>
            <select value={basis} onChange={e => setBasis(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #e5e7eb', borderRadius: 7, fontSize: 14, outline: 'none' }}>
              {BASIS.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
        </div>
        <div style={{ marginBottom: 22 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>
            {lang === 'ES' ? 'Nota (opcional)' : 'Note (optional)'}
          </label>
          <textarea value={note} onChange={e => setNote(e.target.value)} rows={3}
            placeholder={lang === 'ES' ? 'Agregá una nota a tu contra-oferta...' : 'Add a note to your counter-offer...'}
            style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #e5e7eb', borderRadius: 7, fontSize: 13, outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={onClose} style={{ flex: 1, padding: '11px 0', border: '1.5px solid #e5e7eb', borderRadius: 7, background: '#fff', color: '#666', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
            {lang === 'ES' ? 'Cancelar' : 'Cancel'}
          </button>
          <button onClick={() => onSend({ price, basis, note })} style={{ flex: 2, padding: '11px 0', background: BLUE, border: 'none', borderRadius: 7, color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
            {lang === 'ES' ? 'Enviar contra-oferta' : 'Send counter-offer'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function SellerContracts() {
  const { lang } = useAuth();
  const [contracts, setContracts] = useState(initialContracts);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selected, setSelected] = useState(null);
  const [showCounter, setShowCounter] = useState(false);
  const [toast, setToast] = useState(null);

  const notify = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const filtered = contracts.filter(c => {
    const q = search.toLowerCase();
    const matchQ = !search || c.product[lang].toLowerCase().includes(q) || c.buyer.toLowerCase().includes(q) || String(c.id).includes(q);
    const matchS = filterStatus === 'all' || c.status === filterStatus;
    return matchQ && matchS;
  });

  const handleAcceptCounter = (id) => {
    setContracts(cs => cs.map(c => c.id === id ? {
      ...c, status: 'signed',
      history: [...c.history, { date: 'HOY', from: 'Vendedor', action: { ES: 'Contra-oferta aceptada — contrato firmado', EN: 'Counter-offer accepted — contract signed' }, price: c.counterOffer.price, basis: c.counterOffer.basis }]
    } : c));
    setSelected(s => s ? { ...s, status: 'signed' } : s);
    notify(lang === 'ES' ? '✅ Contrato firmado correctamente.' : '✅ Contract signed successfully.');
  };

  const handleSendCounter = ({ price, basis, note }) => {
    setContracts(cs => cs.map(c => c.id === selected.id ? {
      ...c, price: Number(price), basis, status: 'progress',
      counterOffer: null,
      history: [...c.history, { date: 'HOY', from: 'Vendedor', action: { ES: `Contra-oferta enviada: USD ${price} · ${basis}`, EN: `Counter-offer sent: USD ${price} · ${basis}` }, price: Number(price), basis }]
    } : c));
    setSelected(s => ({ ...s, price: Number(price), basis, status: 'progress', counterOffer: null }));
    setShowCounter(false);
    notify(lang === 'ES' ? '📨 Contra-oferta enviada al comprador.' : '📨 Counter-offer sent to buyer.');
  };

  const handleSign = (id) => {
    setContracts(cs => cs.map(c => c.id === id ? {
      ...c, status: 'signed',
      history: [...c.history, { date: 'HOY', from: 'Vendedor', action: { ES: 'Contrato firmado', EN: 'Contract signed' }, price: c.price, basis: c.basis }]
    } : c));
    setSelected(s => s ? { ...s, status: 'signed' } : s);
    notify(lang === 'ES' ? '✅ Contrato firmado.' : '✅ Contract signed.');
  };

  const selectedFull = selected ? contracts.find(c => c.id === selected.id) : null;

  return (
    <div>
      {toast && (
        <div style={{ position: 'fixed', top: 20, right: 24, zIndex: 300, background: toast.type === 'success' ? '#16a34a' : '#dc2626', color: '#fff', padding: '12px 20px', borderRadius: 8, fontWeight: 700, fontSize: 13, boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }}>
          {toast.msg}
        </div>
      )}
      {showCounter && selectedFull && (
        <CounterModal contract={selectedFull} lang={lang} onClose={() => setShowCounter(false)} onSend={handleSendCounter} />
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#1a1a2e', margin: 0 }}>
            {lang === 'ES' ? 'Mis contratos' : 'My contracts'}
          </h1>
          <p style={{ color: '#888', fontSize: 13, margin: '4px 0 0' }}>
            {contracts.length} {lang === 'ES' ? 'contratos en total' : 'total contracts'}
            {contracts.filter(c => c.status === 'countered').length > 0 && (
              <span style={{ marginLeft: 10, color: '#854d0e', fontWeight: 700 }}>
                · {contracts.filter(c => c.status === 'countered').length} {lang === 'ES' ? 'contra-oferta pendiente' : 'counter-offer pending'}
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #eee', padding: '13px 20px', marginBottom: 16, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 200, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Search size={15} style={{ color: '#aaa' }} />
          <input type="text" placeholder={lang === 'ES' ? 'Buscar por ID, producto o comprador...' : 'Search by ID, product or buyer...'} value={search} onChange={e => setSearch(e.target.value)}
            style={{ border: 'none', outline: 'none', fontSize: 14, color: '#333', flex: 1 }} />
        </div>
        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
          {['all', 'new', 'progress', 'countered', 'signed', 'terminated'].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)}
              style={{ padding: '6px 13px', borderRadius: 16, border: '1.5px solid', fontSize: 11, fontWeight: 600, cursor: 'pointer',
                borderColor: filterStatus === s ? BLUE : '#e5e7eb',
                background: filterStatus === s ? '#eff6ff' : '#fff',
                color: filterStatus === s ? BLUE : '#888' }}>
              {s === 'all' ? (lang === 'ES' ? 'Todos' : 'All') : STATUS_CFG[s]?.[lang]}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 380px' : '1fr', gap: 20 }}>

        {/* Table */}
        <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #eee', overflow: 'hidden', boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
          {/* Head */}
          <div style={{ display: 'grid', gridTemplateColumns: '50px 2fr 90px 90px 110px 1fr', padding: '11px 20px', background: '#fafbfc', borderBottom: '1px solid #eee' }}>
            {['ID', lang === 'ES' ? 'Producto' : 'Product', lang === 'ES' ? 'Vol. MT' : 'Vol. MT', lang === 'ES' ? 'Precio' : 'Price', 'Estado', lang === 'ES' ? 'Comprador' : 'Buyer'].map((h, i) => (
              <span key={i} style={{ fontSize: 11, fontWeight: 700, color: '#888', letterSpacing: 0.8, textTransform: 'uppercase' }}>{h}</span>
            ))}
          </div>

          {filtered.map((c, i) => {
            const st = STATUS_CFG[c.status];
            const isSelected = selected?.id === c.id;
            return (
              <div key={c.id}
                style={{ display: 'grid', gridTemplateColumns: '50px 2fr 90px 90px 110px 1fr', padding: '13px 20px', alignItems: 'center', borderBottom: i < filtered.length - 1 ? '1px solid #f5f5f5' : 'none', background: isSelected ? '#f8faff' : '#fff', cursor: 'pointer' }}
                onClick={() => setSelected(isSelected ? null : c)}
                onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = '#fafbff'; }}
                onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = '#fff'; }}
              >
                <span style={{ fontSize: 13, color: '#aaa', fontWeight: 600 }}>#{c.id}</span>
                <div>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: 13, color: '#1a1a2e' }}>{c.product[lang]}</p>
                  <p style={{ margin: '1px 0 0', fontSize: 11, color: '#aaa' }}>{c.date} · {c.basis}</p>
                </div>
                <span style={{ fontSize: 13, color: '#555' }}>{c.volume.toLocaleString()}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: BLUE }}>USD {c.price}</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 700, padding: '3px 9px', borderRadius: 4, background: st.bg, color: st.color }}>
                  {st[lang]}
                  {c.status === 'countered' && <span style={{ animation: 'pulse 1.5s infinite', display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: '#854d0e' }} />}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 12, color: '#555', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.buyer}</span>
                  <ChevronRight size={14} style={{ color: '#ddd', flexShrink: 0 }} />
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '48px 0', color: '#ccc' }}>
              <FileText size={40} style={{ display: 'block', margin: '0 auto 12px', opacity: 0.3 }} />
              <p>{lang === 'ES' ? 'Sin resultados' : 'No results'}</p>
            </div>
          )}
        </div>

        {/* Detail panel */}
        {selectedFull && (
          <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #eee', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', overflow: 'hidden', height: 'fit-content' }}>

            {/* Header */}
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fafbfc' }}>
              <div>
                <p style={{ margin: 0, fontWeight: 700, fontSize: 15, color: '#1a1a2e' }}>
                  {lang === 'ES' ? 'Contrato' : 'Contract'} #{selectedFull.id}
                </p>
                <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 4, background: STATUS_CFG[selectedFull.status].bg, color: STATUS_CFG[selectedFull.status].color }}>
                  {STATUS_CFG[selectedFull.status][lang]}
                </span>
              </div>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#aaa', fontSize: 20, lineHeight: 1 }}>✕</button>
            </div>

            {/* Counter-offer alert */}
            {selectedFull.status === 'countered' && selectedFull.counterOffer && (
              <div style={{ margin: '16px 20px 0', background: '#fef9c3', border: '1px solid #fde68a', borderRadius: 8, padding: '12px 16px' }}>
                <p style={{ margin: '0 0 4px', fontWeight: 700, fontSize: 13, color: '#854d0e' }}>
                  ⚡ {lang === 'ES' ? 'Contra-oferta recibida del comprador' : 'Counter-offer received from buyer'}
                </p>
                <p style={{ margin: '0 0 2px', fontSize: 13, color: '#333' }}>
                  USD {selectedFull.counterOffer.price}/tn · {selectedFull.counterOffer.basis}
                </p>
                {selectedFull.counterOffer.note && <p style={{ margin: 0, fontSize: 12, color: '#666', fontStyle: 'italic' }}>"{selectedFull.counterOffer.note}"</p>}
                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                  <button onClick={() => handleAcceptCounter(selectedFull.id)}
                    style={{ flex: 1, padding: '9px 0', background: '#dcfce7', border: 'none', borderRadius: 6, color: '#15803d', fontWeight: 700, fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                    <CheckCircle size={13} /> {lang === 'ES' ? 'Aceptar y firmar' : 'Accept & sign'}
                  </button>
                  <button onClick={() => setShowCounter(true)}
                    style={{ flex: 1, padding: '9px 0', background: '#fef9c3', border: 'none', borderRadius: 6, color: '#854d0e', fontWeight: 700, fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                    <Edit3 size={13} /> {lang === 'ES' ? 'Contra-ofertar' : 'Counter-offer'}
                  </button>
                </div>
              </div>
            )}

            {/* Fields */}
            <div style={{ padding: '16px 20px' }}>
              {[
                { label: lang === 'ES' ? 'Producto' : 'Product',      val: selectedFull.product[lang] },
                { label: lang === 'ES' ? 'Comprador' : 'Buyer',        val: selectedFull.buyer },
                { label: lang === 'ES' ? 'Volumen' : 'Volume',          val: `${selectedFull.volume.toLocaleString()} MT` },
                { label: lang === 'ES' ? 'Precio' : 'Price',           val: `USD ${selectedFull.price} / MT` },
                { label: 'Basis',                                        val: selectedFull.basis },
                { label: lang === 'ES' ? 'Destino' : 'Destination',    val: selectedFull.destination },
                { label: lang === 'ES' ? 'Período' : 'Period',          val: selectedFull.periodTo },
                { label: lang === 'ES' ? 'País' : 'Country',            val: selectedFull.country },
              ].map(({ label, val }) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f8f8f8' }}>
                  <span style={{ fontSize: 12, color: '#999' }}>{label}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#1a1a2e', maxWidth: 200, textAlign: 'right' }}>{val}</span>
                </div>
              ))}
            </div>

            {/* History */}
            <div style={{ padding: '0 20px 16px' }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: '#aaa', letterSpacing: 1, marginBottom: 10 }}>
                {lang === 'ES' ? 'HISTORIAL DE NEGOCIACIÓN' : 'NEGOTIATION HISTORY'}
              </p>
              {selectedFull.history.map((h, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 2, background: i === selectedFull.history.length - 1 ? BLUE : '#e5e7eb', flexShrink: 0, marginLeft: 5 }} />
                  <div style={{ paddingBottom: 8 }}>
                    <p style={{ margin: '0 0 2px', fontSize: 12, fontWeight: 600, color: '#1a1a2e' }}>{h.action[lang]}</p>
                    <p style={{ margin: 0, fontSize: 11, color: '#aaa' }}>{h.date} · {h.from} · USD {h.price} · {h.basis}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            {(selectedFull.status === 'new' || selectedFull.status === 'progress') && (
              <div style={{ padding: '0 20px 20px', display: 'flex', gap: 10 }}>
                <button onClick={() => handleSign(selectedFull.id)}
                  style={{ flex: 1, padding: '10px 0', background: '#dcfce7', border: 'none', borderRadius: 7, color: '#15803d', fontWeight: 700, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                  <CheckCircle size={14} /> {lang === 'ES' ? 'Firmar contrato' : 'Sign contract'}
                </button>
                <button onClick={() => setShowCounter(true)}
                  style={{ flex: 1, padding: '10px 0', background: '#eff6ff', border: 'none', borderRadius: 7, color: BLUE, fontWeight: 700, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                  <Edit3 size={14} /> {lang === 'ES' ? 'Contra-ofertar' : 'Counter-offer'}
                </button>
              </div>
            )}

            {selectedFull.status === 'signed' && (
              <div style={{ padding: '0 20px 20px', display: 'flex', gap: 10 }}>
                <button style={{ flex: 1, padding: '10px 0', background: '#f5f3ff', border: 'none', borderRadius: 7, color: '#7c3aed', fontWeight: 700, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                  <Download size={14} /> {lang === 'ES' ? 'Descargar PDF' : 'Download PDF'}
                </button>
                <button style={{ flex: 1, padding: '10px 0', background: '#f5f7fa', border: 'none', borderRadius: 7, color: '#555', fontWeight: 700, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                  <MessageSquare size={14} /> {lang === 'ES' ? 'Mensajear' : 'Message'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
