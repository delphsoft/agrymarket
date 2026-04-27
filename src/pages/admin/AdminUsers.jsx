import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Search, CheckCircle, XCircle, RefreshCw,
  Eye, Shield, Users, Filter
} from 'lucide-react';

const BLUE = '#4A90D9';

const allUsers = [
  { id: 1,  name: 'AgroSur S.A.',          email: 'contacto@agrosur.com.ar',    role: 'seller', status: 'verified',   joined: '22/04/2026', docs: true,  country: 'AR', volume: '4.800 tn' },
  { id: 2,  name: 'Golden Harvest Ltd',     email: 'ops@goldenharvest.com',       role: 'buyer',  status: 'pending',    joined: '25/04/2026', docs: true,  country: 'AU', volume: '-' },
  { id: 3,  name: 'PampaSoja Ltda.',        email: 'ventas@pampasoja.com.ar',     role: 'seller', status: 'verified',   joined: '18/04/2026', docs: true,  country: 'AR', volume: '1.200 tn' },
  { id: 4,  name: 'Adecoagro S.A.',         email: 'trading@adecoagro.com',       role: 'buyer',  status: 'rejected',   joined: '20/04/2026', docs: false, country: 'AR', volume: '-' },
  { id: 5,  name: 'NOA Granos S.R.L.',      email: 'info@noagranos.com.ar',       role: 'seller', status: 'pending',    joined: '24/04/2026', docs: true,  country: 'AR', volume: '-' },
  { id: 6,  name: 'Australian Grain Co.',   email: 'trade@ausgrain.com.au',       role: 'buyer',  status: 'verified',   joined: '10/04/2026', docs: true,  country: 'AU', volume: '3.400 tn' },
  { id: 7,  name: 'PatagoniaMalt S.A.',     email: 'export@patagoniamalt.com.ar', role: 'seller', status: 'verified',   joined: '05/04/2026', docs: true,  country: 'AR', volume: '600 tn' },
  { id: 8,  name: 'Impex Express S.A.',     email: 'compras@impex.com',           role: 'buyer',  status: 'pending',    joined: '26/04/2026', docs: false, country: 'UY', volume: '-' },
  { id: 9,  name: 'CerealesBA S.R.L.',      email: 'ops@cerealesba.com.ar',       role: 'seller', status: 'verified',   joined: '01/04/2026', docs: true,  country: 'AR', volume: '2.000 tn' },
  { id: 10, name: 'Oleocampo S.C.A.',       email: 'export@oleocampo.com.ar',     role: 'seller', status: 'verified',   joined: '08/04/2026', docs: true,  country: 'AR', volume: '900 tn' },
];

const STATUS_CFG = {
  verified: { bg: '#dcfce7', color: '#15803d', ES: 'Verificado', EN: 'Verified' },
  pending:  { bg: '#fef9c3', color: '#854d0e', ES: 'Pendiente',  EN: 'Pending'  },
  rejected: { bg: '#fee2e2', color: '#dc2626', ES: 'Rechazado',  EN: 'Rejected' },
};
const ROLE_CFG = {
  seller: { bg: '#eff6ff', color: BLUE,      ES: 'Vendedor',   EN: 'Seller' },
  buyer:  { bg: '#f5f3ff', color: '#7c3aed', ES: 'Comprador',  EN: 'Buyer'  },
};

export default function AdminUsers() {
  const { lang } = useAuth();
  const [users, setUsers] = useState(allUsers);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterRole, setFilterRole] = useState('all');
  const [selected, setSelected] = useState(null);

  const filtered = users.filter(u => {
    const q = search.toLowerCase();
    const matchQ = !search || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
    const matchS = filterStatus === 'all' || u.status === filterStatus;
    const matchR = filterRole === 'all' || u.role === filterRole;
    return matchQ && matchS && matchR;
  });

  const updateStatus = (id, status) => {
    setUsers(users.map(u => u.id === id ? { ...u, status } : u));
    if (selected?.id === id) setSelected(s => ({ ...s, status }));
  };

  const pending = users.filter(u => u.status === 'pending').length;

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#1a1a2e', margin: 0 }}>
            {lang === 'ES' ? 'Gestión de usuarios' : 'User management'}
          </h1>
          <p style={{ color: '#888', fontSize: 13, margin: '4px 0 0' }}>
            {users.length} {lang === 'ES' ? 'usuarios registrados' : 'registered users'}
            {pending > 0 && <span style={{ marginLeft: 10, color: '#854d0e', fontWeight: 700 }}>· {pending} {lang === 'ES' ? 'pendientes de KYC' : 'pending KYC'}</span>}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #eee', padding: '14px 20px', marginBottom: 16, display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 200, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Search size={15} style={{ color: '#aaa', flexShrink: 0 }} />
          <input type="text" placeholder={lang === 'ES' ? 'Buscar empresa o email...' : 'Search company or email...'} value={search} onChange={e => setSearch(e.target.value)}
            style={{ border: 'none', outline: 'none', fontSize: 14, color: '#333', flex: 1 }} />
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {['all', 'pending', 'verified', 'rejected'].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)}
              style={{ padding: '6px 14px', borderRadius: 16, border: '1.5px solid', fontSize: 12, fontWeight: 600, cursor: 'pointer',
                borderColor: filterStatus === s ? BLUE : '#e5e7eb',
                background: filterStatus === s ? '#eff6ff' : '#fff',
                color: filterStatus === s ? BLUE : '#888' }}>
              {s === 'all' ? (lang === 'ES' ? 'Todos' : 'All') : STATUS_CFG[s]?.[lang]}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {['all', 'seller', 'buyer'].map(r => (
            <button key={r} onClick={() => setFilterRole(r)}
              style={{ padding: '6px 14px', borderRadius: 16, border: '1.5px solid', fontSize: 12, fontWeight: 600, cursor: 'pointer',
                borderColor: filterRole === r ? '#7c3aed' : '#e5e7eb',
                background: filterRole === r ? '#f5f3ff' : '#fff',
                color: filterRole === r ? '#7c3aed' : '#888' }}>
              {r === 'all' ? (lang === 'ES' ? 'Ambos roles' : 'All roles') : ROLE_CFG[r][lang]}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 360px' : '1fr', gap: 20 }}>

        {/* Table */}
        <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #eee', overflow: 'hidden', boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
          {/* Head */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 90px 90px 100px 120px', padding: '11px 20px', background: '#fafbfc', borderBottom: '1px solid #eee' }}>
            {[
              lang === 'ES' ? 'Empresa' : 'Company',
              'Email',
              lang === 'ES' ? 'Rol' : 'Role',
              'País',
              'Estado',
              lang === 'ES' ? 'Acciones' : 'Actions',
            ].map((h, i) => (
              <span key={i} style={{ fontSize: 11, fontWeight: 700, color: '#888', letterSpacing: 1, textTransform: 'uppercase' }}>{h}</span>
            ))}
          </div>

          {filtered.map((u, i) => {
            const st = STATUS_CFG[u.status];
            const rl = ROLE_CFG[u.role];
            const isSelected = selected?.id === u.id;
            return (
              <div key={u.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 90px 90px 100px 120px', padding: '13px 20px', alignItems: 'center', borderBottom: i < filtered.length - 1 ? '1px solid #f5f5f5' : 'none', background: isSelected ? '#f8faff' : '#fff', cursor: 'pointer' }}
                onClick={() => setSelected(isSelected ? null : u)}
                onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = '#fafbff'; }}
                onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = '#fff'; }}
              >
                <div>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: 14, color: '#1a1a2e' }}>{u.name}</p>
                  <p style={{ margin: '2px 0 0', fontSize: 11, color: '#aaa' }}>{lang === 'ES' ? 'Ingresó' : 'Joined'}: {u.joined}</p>
                </div>
                <span style={{ fontSize: 12, color: '#666', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{u.email}</span>
                <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 4, background: rl.bg, color: rl.color }}>{rl[lang]}</span>
                <span style={{ fontSize: 13, color: '#555' }}>🌎 {u.country}</span>
                <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 4, background: st.bg, color: st.color }}>{st[lang]}</span>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button onClick={e => { e.stopPropagation(); setSelected(u); }}
                    style={{ padding: '6px 8px', background: '#f1f5f9', border: 'none', borderRadius: 5, cursor: 'pointer', color: '#555', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Eye size={13} /> {lang === 'ES' ? 'Ver' : 'View'}
                  </button>
                  {u.status === 'pending' && (
                    <button onClick={e => { e.stopPropagation(); updateStatus(u.id, 'verified'); }}
                      style={{ padding: '6px 8px', background: '#dcfce7', border: 'none', borderRadius: 5, cursor: 'pointer', color: '#15803d', fontSize: 12, display: 'flex', alignItems: 'center', gap: 3 }}>
                      <CheckCircle size={13} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '48px 0', color: '#ccc' }}>
              <Users size={40} style={{ display: 'block', margin: '0 auto 12px', opacity: 0.3 }} />
              <p>{lang === 'ES' ? 'Sin resultados' : 'No results'}</p>
            </div>
          )}
        </div>

        {/* Detail panel */}
        {selected && (
          <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #eee', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', padding: 24, height: 'fit-content' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1a1a2e', margin: 0 }}>
                {lang === 'ES' ? 'Detalle de usuario' : 'User detail'}
              </h3>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#aaa', fontSize: 18 }}>✕</button>
            </div>

            {/* Avatar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20, padding: '14px 0', borderBottom: '1px solid #f0f0f0' }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: ROLE_CFG[selected.role].bg, color: ROLE_CFG[selected.role].color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 16 }}>
                {selected.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div>
                <p style={{ margin: 0, fontWeight: 700, fontSize: 15, color: '#1a1a2e' }}>{selected.name}</p>
                <p style={{ margin: '2px 0 0', fontSize: 12, color: '#888' }}>{selected.email}</p>
              </div>
            </div>

            {/* Fields */}
            {[
              { label: lang === 'ES' ? 'Rol' : 'Role', val: ROLE_CFG[selected.role][lang] },
              { label: 'País', val: selected.country },
              { label: lang === 'ES' ? 'Registro' : 'Joined', val: selected.joined },
              { label: lang === 'ES' ? 'Volumen operado' : 'Volume traded', val: selected.volume },
              { label: lang === 'ES' ? 'Estado KYC' : 'KYC Status', val: STATUS_CFG[selected.status][lang] },
              { label: lang === 'ES' ? 'Documentos' : 'Documents', val: selected.docs ? (lang === 'ES' ? '✅ Subidos' : '✅ Uploaded') : (lang === 'ES' ? '⏳ Pendiente' : '⏳ Pending') },
            ].map(({ label, val }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: '1px solid #f8f8f8' }}>
                <span style={{ fontSize: 12, color: '#999' }}>{label}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#1a1a2e' }}>{val}</span>
              </div>
            ))}

            {/* KYC Actions */}
            <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#555', margin: 0 }}>
                {lang === 'ES' ? 'Acción KYC' : 'KYC Action'}
              </p>
              <button onClick={() => updateStatus(selected.id, 'verified')}
                disabled={selected.status === 'verified'}
                style={{ width: '100%', padding: '10px', background: selected.status === 'verified' ? '#f5f5f5' : '#dcfce7', border: 'none', borderRadius: 7, color: selected.status === 'verified' ? '#aaa' : '#15803d', fontWeight: 700, fontSize: 13, cursor: selected.status === 'verified' ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                <CheckCircle size={15} /> {lang === 'ES' ? 'Aprobar verificación' : 'Approve verification'}
              </button>
              <button onClick={() => updateStatus(selected.id, 'rejected')}
                disabled={selected.status === 'rejected'}
                style={{ width: '100%', padding: '10px', background: selected.status === 'rejected' ? '#f5f5f5' : '#fee2e2', border: 'none', borderRadius: 7, color: selected.status === 'rejected' ? '#aaa' : '#dc2626', fontWeight: 700, fontSize: 13, cursor: selected.status === 'rejected' ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                <XCircle size={15} /> {lang === 'ES' ? 'Rechazar' : 'Reject'}
              </button>
              <button onClick={() => updateStatus(selected.id, 'pending')}
                style={{ width: '100%', padding: '10px', background: '#fef9c3', border: 'none', borderRadius: 7, color: '#854d0e', fontWeight: 700, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                <RefreshCw size={15} /> {lang === 'ES' ? 'Marcar pendiente' : 'Mark pending'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
