// ── BuyerDashboard ────────────────────────────────────────────────────────────
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Search, FileText, TrendingUp, MessageSquare, ChevronRight, Clock, Send, Paperclip, ChevronDown, ChevronUp, CheckCircle, Edit3, Download, XCircle, Package } from 'lucide-react';

const BLUE   = '#4A90D9';
const PURPLE = '#7c3aed';

// ── BUYER DASHBOARD ───────────────────────────────────────────────────────────
export function BuyerDashboard({ onNavigate }) {
  const { user, lang } = useAuth();
  const name = user?.name?.split(' ')[0] || (lang === 'ES' ? 'Comprador' : 'Buyer');

  const stats = [
    { icon: Search,       color: BLUE,    bg: '#eff6ff', val: '34',       sub: { ES: 'búsquedas guardadas', EN: 'saved searches' } },
    { icon: MessageSquare,color: '#10b981',bg: '#ecfdf5', val: '2',        sub: { ES: 'mensajes nuevos',     EN: 'new messages' } },
    { icon: FileText,     color: '#f59e0b',bg: '#fffbeb', val: '3',        sub: { ES: 'contratos activos',   EN: 'active contracts' } },
    { icon: TrendingUp,   color: PURPLE,  bg: '#f5f3ff', val: '6.200 tn', sub: { ES: 'volumen comprado',    EN: 'volume purchased' } },
  ];

  const recentActivity = [
    { icon: FileText,      color: '#f59e0b', text: { ES: 'Contra-oferta recibida en contrato #251', EN: 'Counter-offer received on contract #251' }, time: 'Hace 1h',   route: '/buyer/contracts' },
    { icon: MessageSquare, color: BLUE,      text: { ES: 'Nuevo mensaje de AgroSur S.A.',           EN: 'New message from AgroSur S.A.'           }, time: 'Hace 2h',   route: '/buyer/messages' },
    { icon: CheckCircle,   color: '#10b981', text: { ES: 'Contrato #253 firmado correctamente',     EN: 'Contract #253 successfully signed'       }, time: 'Ayer',      route: '/buyer/contracts' },
    { icon: Search,        color: PURPLE,    text: { ES: 'Búsqueda: Maíz FOB > 2.000 tn — 5 resultados', EN: 'Search: Corn FOB > 2,000 MT — 5 results' }, time: 'Hace 2d', route: '/buyer/search' },
  ];

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#1a1a2e', margin: 0 }}>
          {lang === 'ES' ? `Bienvenido, ${name} 👋` : `Welcome back, ${name} 👋`}
        </h1>
        <p style={{ color: '#888', fontSize: 13, marginTop: 4 }}>
          {lang === 'ES' ? 'Tu panel de compras de commodities.' : 'Your commodity purchasing dashboard.'}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 18, marginBottom: 28 }}>
        {stats.map(({ icon: Icon, color, bg, val, sub }, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 10, padding: '20px 22px', boxShadow: '0 1px 8px rgba(0,0,0,0.07)', border: '1px solid #eee', display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 46, height: 46, borderRadius: 12, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon size={21} style={{ color }} />
            </div>
            <div>
              <p style={{ fontSize: 24, fontWeight: 800, color: '#1a1a2e', margin: 0, lineHeight: 1 }}>{val}</p>
              <p style={{ fontSize: 12, color: '#888', margin: '3px 0 0' }}>{sub[lang]}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Quick search */}
        <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #eee', padding: 24, boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#1a1a2e', margin: '0 0 16px' }}>{lang === 'ES' ? 'Búsqueda rápida' : 'Quick search'}</h2>
          <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
            <input type="text" placeholder={lang === 'ES' ? 'Maíz, soja, trigo...' : 'Corn, soybeans, wheat...'} style={{ flex: 1, padding: '10px 13px', border: '1.5px solid #e5e7eb', borderRadius: 7, fontSize: 14, outline: 'none' }} />
            <button onClick={() => onNavigate('/buyer/search')} style={{ padding: '10px 16px', background: BLUE, color: '#fff', border: 'none', borderRadius: 7, fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
              <Search size={16} />
            </button>
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {(lang === 'ES' ? ['Maíz', 'Soja', 'Trigo', 'Girasol', 'Cebada'] : ['Corn', 'Soybeans', 'Wheat', 'Sunflower', 'Barley']).map(p => (
              <button key={p} onClick={() => onNavigate('/buyer/search')} style={{ padding: '5px 12px', borderRadius: 14, border: '1.5px solid #e5e7eb', fontSize: 12, background: '#fff', color: '#555', cursor: 'pointer', fontWeight: 500 }}>
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #eee', boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 22px', borderBottom: '1px solid #f0f0f0' }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: '#1a1a2e', margin: 0 }}>{lang === 'ES' ? 'Actividad reciente' : 'Recent activity'}</h2>
          </div>
          {recentActivity.map((item, i) => {
            const Icon = item.icon;
            return (
              <button key={i} onClick={() => onNavigate(item.route)}
                style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: '12px 22px', border: 'none', background: '#fff', borderBottom: i < recentActivity.length - 1 ? '1px solid #f5f5f5' : 'none', cursor: 'pointer', textAlign: 'left' }}
                onMouseEnter={e => e.currentTarget.style.background = '#fafbff'}
                onMouseLeave={e => e.currentTarget.style.background = '#fff'}
              >
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: item.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={15} style={{ color: item.color }} />
                </div>
                <p style={{ flex: 1, margin: 0, fontSize: 13, color: '#333' }}>{item.text[lang]}</p>
                <span style={{ fontSize: 11, color: '#bbb', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 3 }}>
                  <Clock size={11} /> {item.time}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── BUYER MESSAGES ────────────────────────────────────────────────────────────
const buyerClients = [
  {
    id: 1, name: 'AgroSur S.A.', initials: 'AS', color: BLUE,
    threads: [
      { id: 'general', label: 'General', time: '15:30', unread: 1, messages: [
        { id: 1, from: 'Yo', fromType: 'me', initials: 'YO', color: PURPLE, time: '14:50', date: 'HOY', text: 'Hi, we are interested in 1,200 MT of wheat. Can you offer USD 183 FOB?' },
        { id: 2, from: 'AgroSur S.A.', fromType: 'client', initials: 'AS', color: BLUE, time: '15:30', text: 'Hello! Our current offer is USD 185/MT FOB. We have 1,200 MT available for May delivery. Would you like a contract proposal?' },
      ]},
      { id: 'contract-253', label: 'Contrato #253', time: '12/03', unread: 0, messages: [
        { id: 1, from: 'AGRIMARKET', fromType: 'admin', initials: 'AM', color: '#7c3aed', time: '09:00', date: '12 MAR', text: 'Contrato #253 generado. Trigo Pan · 1.200 MT · USD 183 FOB Port Saint Joe.' },
        { id: 2, from: 'Yo', fromType: 'me', initials: 'YO', color: PURPLE, time: '09:30', text: 'Perfecto. Aceptamos las condiciones. Por favor procedan con la firma.' },
        { id: 3, from: 'AgroSur S.A.', fromType: 'client', initials: 'AS', color: BLUE, time: '10:15', text: '✅ Contrato firmado por ambas partes. Gracias por la operación.', },
      ]},
    ],
  },
  {
    id: 2, name: 'NOA Granos S.R.L.', initials: 'NG', color: '#8b5cf6',
    threads: [
      { id: 'general', label: 'General', time: '10:22', unread: 0, messages: [
        { id: 1, from: 'Yo', fromType: 'me', initials: 'YO', color: PURPLE, time: '10:00', date: 'HOY', text: '¿Tienen sorgo disponible para entrega inmediata? Necesitamos 1.000 tn mínimo.' },
        { id: 2, from: 'NOA Granos S.R.L.', fromType: 'client', initials: 'NG', color: '#8b5cf6', time: '10:22', text: 'Sí, tenemos stock disponible. Precio USD 210/tn EXW Santiago del Estero. ¿Les interesa?' },
      ]},
    ],
  },
];

function Avatar2({ initials, color, size = 36 }) {
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: color + '20', color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: size * 0.37, flexShrink: 0, border: `1.5px solid ${color}40` }}>
      {initials}
    </div>
  );
}

export function BuyerMessages() {
  const { lang } = useAuth();
  const [clients, setClients] = useState(buyerClients);
  const [activeClient, setActiveClient] = useState(buyerClients[0]);
  const [activeThread, setActiveThread] = useState(buyerClients[0].threads[0]);
  const [expandedClient, setExpandedClient] = useState(buyerClients[0].id);
  const [msgInput, setMsgInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [activeThread]);

  const selectThread = (client, thread) => {
    setClients(cs => cs.map(c => c.id === client.id ? { ...c, threads: c.threads.map(t => t.id === thread.id ? { ...t, unread: 0 } : t) } : c));
    setActiveClient(client); setActiveThread(thread);
  };

  const handleSend = () => {
    if (!msgInput.trim()) return;
    const newMsg = { id: Date.now(), from: 'Yo', fromType: 'me', initials: 'YO', color: PURPLE, time: new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }), text: msgInput };
    setClients(cs => cs.map(c => c.id === activeClient.id ? { ...c, threads: c.threads.map(t => t.id === activeThread.id ? { ...t, messages: [...t.messages, newMsg] } : t) } : c));
    setActiveThread(t => ({ ...t, messages: [...t.messages, newMsg] }));
    setMsgInput('');
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
  };

  const currentMessages = clients.find(c => c.id === activeClient.id)?.threads.find(t => t.id === activeThread.id)?.messages || [];

  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: '#1a1a2e', marginBottom: 20 }}>{lang === 'ES' ? 'Mensajes' : 'Messages'}</h1>
      <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #eee', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', display: 'flex', height: 640, overflow: 'hidden' }}>
        {/* Sidebar */}
        <div style={{ width: 280, flexShrink: 0, borderRight: '1px solid #eee', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '14px 16px', borderBottom: '1px solid #eee', background: '#fafbfc' }}>
            <p style={{ margin: 0, fontWeight: 700, fontSize: 13, color: '#1a1a2e' }}>{lang === 'ES' ? 'MIS VENDEDORES' : 'MY SELLERS'}</p>
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {clients.map(client => {
              const unread = client.threads.reduce((a, t) => a + (t.unread || 0), 0);
              const isExpanded = expandedClient === client.id;
              return (
                <div key={client.id}>
                  <button onClick={() => { setExpandedClient(isExpanded ? null : client.id); if (!isExpanded) selectThread(client, client.threads[0]); }}
                    style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '13px 16px', border: 'none', background: activeClient.id === client.id ? '#f0f6ff' : '#fff', cursor: 'pointer', borderBottom: '1px solid #f0f0f0', textAlign: 'left' }}>
                    <Avatar2 initials={client.initials} color={client.color} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ margin: 0, fontWeight: 600, fontSize: 13, color: '#1a1a2e', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{client.name}</p>
                    </div>
                    {unread > 0 && <span style={{ background: BLUE, color: '#fff', fontSize: 11, fontWeight: 700, borderRadius: '50%', width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{unread}</span>}
                    {isExpanded ? <ChevronUp size={13} style={{ color: '#ccc' }} /> : <ChevronDown size={13} style={{ color: '#ccc' }} />}
                  </button>
                  {isExpanded && (
                    <div style={{ background: '#f8fafc' }}>
                      {client.threads.map(thread => {
                        const isActiveThread = activeThread.id === thread.id && activeClient.id === client.id;
                        return (
                          <button key={thread.id} onClick={() => selectThread(client, thread)}
                            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '10px 16px 10px 30px', border: 'none', background: isActiveThread ? '#e6f0ff' : 'transparent', cursor: 'pointer', textAlign: 'left', borderLeft: isActiveThread ? `3px solid ${BLUE}` : '3px solid transparent' }}>
                            <span style={{ fontSize: 13, fontWeight: isActiveThread ? 700 : 400, color: isActiveThread ? BLUE : '#555' }}>{thread.label}</span>
                            <span style={{ fontSize: 10, color: '#ccc' }}>{thread.time}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        {/* Chat */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '14px 24px', borderBottom: '1px solid #eee', background: '#fafbfc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Avatar2 initials={activeClient.initials} color={activeClient.color} />
              <div>
                <p style={{ margin: 0, fontWeight: 700, fontSize: 14, color: '#1a1a2e' }}>{activeClient.name}</p>
                <p style={{ margin: 0, fontSize: 12, color: '#aaa' }}>{activeThread.label}</p>
              </div>
            </div>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 18 }}>
            {currentMessages.map((msg, i) => {
              const isMe = msg.fromType === 'me';
              return (
                <div key={msg.id}>
                  {msg.date && <div style={{ textAlign: 'center', fontSize: 11, fontWeight: 700, color: BLUE, marginBottom: 14, letterSpacing: 1 }}>── {msg.date} ──</div>}
                  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', flexDirection: isMe ? 'row-reverse' : 'row' }}>
                    <Avatar2 initials={msg.initials} color={msg.color} size={32} />
                    <div style={{ maxWidth: '68%' }}>
                      <p style={{ margin: '0 0 5px', fontWeight: 700, fontSize: 12, color: '#888', textAlign: isMe ? 'right' : 'left' }}>{msg.from}</p>
                      <div style={{ background: isMe ? PURPLE : '#f5f7fa', borderRadius: 10, padding: '11px 15px', borderTopLeftRadius: isMe ? 10 : 2, borderTopRightRadius: isMe ? 2 : 10 }}>
                        <p style={{ margin: 0, fontSize: 13, color: isMe ? '#fff' : '#333', lineHeight: 1.55 }}>{msg.text}</p>
                      </div>
                      <p style={{ margin: '4px 0 0', fontSize: 10, color: '#ccc', textAlign: isMe ? 'right' : 'left' }}>{msg.time}</p>
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>
          <div style={{ padding: '14px 20px', borderTop: '1px solid #eee', background: '#fafbfc' }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', background: '#fff', border: '1.5px solid #e5e7eb', borderRadius: 10, padding: '10px 14px' }}>
              <input type="text" placeholder={lang === 'ES' ? 'Escribí un mensaje...' : 'Type message here...'} value={msgInput} onChange={e => setMsgInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} style={{ flex: 1, border: 'none', outline: 'none', fontSize: 14, color: '#333', background: 'transparent' }} />
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#bbb' }}><Paperclip size={17} /></button>
              <button onClick={handleSend} style={{ background: PURPLE, color: '#fff', border: 'none', borderRadius: 7, padding: '8px 18px', fontWeight: 700, fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, letterSpacing: 0.8 }}>
                <Send size={13} /> {lang === 'ES' ? 'ENVIAR' : 'SEND'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── BUYER CONTRACTS ───────────────────────────────────────────────────────────
const STATUS_CFG = {
  new:        { bg: '#ccfbf1', color: '#0f766e', ES: 'Nuevo',        EN: 'New' },
  progress:   { bg: '#dbeafe', color: '#1d4ed8', ES: 'En progreso',  EN: 'In Progress' },
  countered:  { bg: '#fef9c3', color: '#854d0e', ES: 'Contra-oferta',EN: 'Counter offer' },
  signed:     { bg: '#dcfce7', color: '#15803d', ES: 'Firmado',      EN: 'Signed' },
  terminated: { bg: '#fee2e2', color: '#b45309', ES: 'Terminado',    EN: 'Terminated' },
};

const buyerContracts = [
  { id: 256, product: { ES: 'Trigo Pan Grado 2', EN: 'Wheat Pan Grade 2' }, volume: 1200, price: 185, status: 'progress',  seller: 'CerealesBA S.R.L.', basis: 'FOB (Bulk)',      destination: 'Port Saint Joe, FL', date: '01/04/2026', history: [{ date: '01/04', from: 'Vendedor', action: { ES: 'Oferta enviada', EN: 'Offer sent' }, price: 185, basis: 'FOB (Bulk)' }] },
  { id: 253, product: { ES: 'Trigo Pan Grado 2', EN: 'Wheat Pan Grade 2' }, volume: 1200, price: 183, status: 'signed',    seller: 'CerealesBA S.R.L.', basis: 'FOB (Container)', destination: 'Port Saint Joe, FL', date: '12/03/2026', history: [{ date: '10/03', from: 'Vendedor', action: { ES: 'Oferta enviada', EN: 'Offer sent' }, price: 190, basis: 'FOB' }, { date: '11/03', from: 'Comprador', action: { ES: 'Contra-oferta enviada', EN: 'Counter-offer sent' }, price: 183, basis: 'FOB (Container)' }, { date: '12/03', from: 'Vendedor', action: { ES: 'Aceptado — firmado', EN: 'Accepted — signed' }, price: 183, basis: 'FOB (Container)' }] },
  { id: 251, product: { ES: 'Maíz Amarillo', EN: 'Yellow Corn' },           volume: 4000, price: 186, status: 'countered', seller: 'AgroSur S.A.',        basis: 'FOB (Container)', destination: 'Port St. Lucie, FL', date: '08/03/2026', counterOffer: { price: 186, basis: 'FOB (Container)', note: 'We accept the price but need May delivery.' }, history: [{ date: '08/03', from: 'Comprador', action: { ES: 'Solicitud enviada', EN: 'Request sent' }, price: 180, basis: 'CIF' }, { date: '09/03', from: 'Vendedor', action: { ES: 'Contra-oferta recibida', EN: 'Counter-offer received' }, price: 186, basis: 'FOB (Container)' }] },
];

export function BuyerContracts() {
  const { lang } = useAuth();
  const [contracts, setContracts] = useState(buyerContracts);
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState(null);

  const notify = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const handleAccept = (id) => {
    setContracts(cs => cs.map(c => c.id === id ? { ...c, status: 'signed', history: [...c.history, { date: 'HOY', from: 'Comprador', action: { ES: 'Contra-oferta aceptada — firmado', EN: 'Counter-offer accepted — signed' }, price: c.counterOffer.price, basis: c.counterOffer.basis }] } : c));
    setSelected(s => s ? { ...s, status: 'signed' } : s);
    notify(lang === 'ES' ? '✅ Contrato firmado.' : '✅ Contract signed.');
  };

  const selectedFull = selected ? contracts.find(c => c.id === selected.id) : null;

  return (
    <div>
      {toast && <div style={{ position: 'fixed', top: 20, right: 24, zIndex: 300, background: '#16a34a', color: '#fff', padding: '12px 20px', borderRadius: 8, fontWeight: 700, fontSize: 13 }}>{toast}</div>}
      <h1 style={{ fontSize: 22, fontWeight: 700, color: '#1a1a2e', marginBottom: 20 }}>{lang === 'ES' ? 'Mis contratos' : 'My contracts'}</h1>

      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 360px' : '1fr', gap: 20 }}>
        <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #eee', overflow: 'hidden', boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '50px 2fr 90px 90px 110px 1fr', padding: '11px 20px', background: '#fafbfc', borderBottom: '1px solid #eee' }}>
            {['ID', lang === 'ES' ? 'Producto' : 'Product', 'Vol. MT', lang === 'ES' ? 'Precio' : 'Price', 'Estado', lang === 'ES' ? 'Vendedor' : 'Seller'].map((h, i) => (
              <span key={i} style={{ fontSize: 11, fontWeight: 700, color: '#888', letterSpacing: 0.8, textTransform: 'uppercase' }}>{h}</span>
            ))}
          </div>
          {contracts.map((c, i) => {
            const st = STATUS_CFG[c.status];
            const isSel = selected?.id === c.id;
            return (
              <div key={c.id} style={{ display: 'grid', gridTemplateColumns: '50px 2fr 90px 90px 110px 1fr', padding: '13px 20px', alignItems: 'center', borderBottom: i < contracts.length - 1 ? '1px solid #f5f5f5' : 'none', background: isSel ? '#f8faff' : '#fff', cursor: 'pointer' }}
                onClick={() => setSelected(isSel ? null : c)}
                onMouseEnter={e => { if (!isSel) e.currentTarget.style.background = '#fafbff'; }}
                onMouseLeave={e => { if (!isSel) e.currentTarget.style.background = '#fff'; }}
              >
                <span style={{ fontSize: 13, color: '#aaa', fontWeight: 600 }}>#{c.id}</span>
                <div>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: 13, color: '#1a1a2e' }}>{c.product[lang]}</p>
                  <p style={{ margin: '1px 0 0', fontSize: 11, color: '#aaa' }}>{c.date} · {c.basis}</p>
                </div>
                <span style={{ fontSize: 13, color: '#555' }}>{c.volume.toLocaleString()}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: PURPLE }}>USD {c.price}</span>
                <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 4, background: st.bg, color: st.color }}>{st[lang]}</span>
                <span style={{ fontSize: 12, color: '#555' }}>{c.seller}</span>
              </div>
            );
          })}
        </div>

        {selectedFull && (
          <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #eee', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', overflow: 'hidden', height: 'fit-content' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fafbfc' }}>
              <p style={{ margin: 0, fontWeight: 700, fontSize: 15, color: '#1a1a2e' }}>{lang === 'ES' ? 'Contrato' : 'Contract'} #{selectedFull.id}</p>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#aaa', fontSize: 20 }}>✕</button>
            </div>

            {selectedFull.status === 'countered' && selectedFull.counterOffer && (
              <div style={{ margin: '16px 20px 0', background: '#fef9c3', border: '1px solid #fde68a', borderRadius: 8, padding: '12px 16px' }}>
                <p style={{ margin: '0 0 6px', fontWeight: 700, fontSize: 13, color: '#854d0e' }}>⚡ {lang === 'ES' ? 'Contra-oferta del vendedor' : 'Seller counter-offer'}</p>
                <p style={{ margin: '0 0 2px', fontSize: 13, color: '#333' }}>USD {selectedFull.counterOffer.price}/tn · {selectedFull.counterOffer.basis}</p>
                {selectedFull.counterOffer.note && <p style={{ margin: '0 0 12px', fontSize: 12, color: '#666', fontStyle: 'italic' }}>"{selectedFull.counterOffer.note}"</p>}
                <button onClick={() => handleAccept(selectedFull.id)}
                  style={{ width: '100%', padding: '10px', background: '#dcfce7', border: 'none', borderRadius: 6, color: '#15803d', fontWeight: 700, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  <CheckCircle size={14} /> {lang === 'ES' ? 'Aceptar y firmar' : 'Accept & sign'}
                </button>
              </div>
            )}

            <div style={{ padding: '16px 20px' }}>
              {[
                { label: lang === 'ES' ? 'Producto' : 'Product', val: selectedFull.product[lang] },
                { label: lang === 'ES' ? 'Vendedor' : 'Seller',   val: selectedFull.seller },
                { label: lang === 'ES' ? 'Volumen' : 'Volume',     val: `${selectedFull.volume.toLocaleString()} MT` },
                { label: lang === 'ES' ? 'Precio' : 'Price',       val: `USD ${selectedFull.price} / MT` },
                { label: 'Basis',                                    val: selectedFull.basis },
                { label: lang === 'ES' ? 'Destino' : 'Destination', val: selectedFull.destination },
              ].map(({ label, val }) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f8f8f8' }}>
                  <span style={{ fontSize: 12, color: '#999' }}>{label}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#1a1a2e' }}>{val}</span>
                </div>
              ))}
            </div>

            <div style={{ padding: '0 20px 16px' }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: '#aaa', letterSpacing: 1, marginBottom: 8 }}>{lang === 'ES' ? 'HISTORIAL' : 'HISTORY'}</p>
              {selectedFull.history.map((h, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
                  <div style={{ width: 2, background: i === selectedFull.history.length - 1 ? PURPLE : '#e5e7eb', flexShrink: 0, marginLeft: 5 }} />
                  <div>
                    <p style={{ margin: '0 0 2px', fontSize: 12, fontWeight: 600, color: '#1a1a2e' }}>{h.action[lang]}</p>
                    <p style={{ margin: 0, fontSize: 11, color: '#aaa' }}>{h.date} · {h.from} · USD {h.price} · {h.basis}</p>
                  </div>
                </div>
              ))}
            </div>

            {selectedFull.status === 'signed' && (
              <div style={{ padding: '0 20px 20px' }}>
                <button style={{ width: '100%', padding: '10px', background: '#f5f3ff', border: 'none', borderRadius: 7, color: PURPLE, fontWeight: 700, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                  <Download size={14} /> {lang === 'ES' ? 'Descargar PDF' : 'Download PDF'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
