import React from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Users, Package, FileText, TrendingUp,
  MessageSquare, Clock, ChevronRight, CheckCircle,
  AlertCircle, XCircle, RefreshCw
} from 'lucide-react';

const BLUE   = '#4A90D9';
const PURPLE = '#7c3aed';

const stats = [
  { key: 'users',     icon: Users,       color: BLUE,    bg: '#eff6ff',  val: '124',    sub: { ES: '+8 esta semana',   EN: '+8 this week' } },
  { key: 'listings',  icon: Package,     color: '#10b981', bg: '#ecfdf5', val: '347',    sub: { ES: '12 pendientes',    EN: '12 pending' } },
  { key: 'contracts', icon: FileText,    color: '#f59e0b', bg: '#fffbeb', val: '58',     sub: { ES: '6 en progreso',    EN: '6 in progress' } },
  { key: 'volume',    icon: TrendingUp,  color: PURPLE,  bg: '#f5f3ff',  val: '48.200', sub: { ES: 'toneladas operadas',EN: 'metric tons traded' } },
];

const recentUsers = [
  { name: 'AgroSur S.A.',       role: { ES: 'Vendedor', EN: 'Seller' }, status: 'verified',   date: 'Hoy 09:14',    initials: 'AS', color: '#4A90D9' },
  { name: 'Golden Harvest Ltd', role: { ES: 'Comprador', EN: 'Buyer' }, status: 'pending',    date: 'Hoy 08:32',    initials: 'GH', color: '#f59e0b' },
  { name: 'PampaSoja Ltda.',    role: { ES: 'Vendedor', EN: 'Seller' }, status: 'verified',   date: 'Ayer 17:50',   initials: 'PS', color: '#10b981' },
  { name: 'Adecoagro S.A.',     role: { ES: 'Comprador', EN: 'Buyer' }, status: 'rejected',   date: 'Ayer 14:22',   initials: 'AC', color: '#ef4444' },
  { name: 'NOA Granos S.R.L.',  role: { ES: 'Vendedor', EN: 'Seller' }, status: 'pending',    date: '25/04 11:05',  initials: 'NG', color: '#8b5cf6' },
];

const recentContracts = [
  { id: 256, product: { ES: 'Trigo',  EN: 'Wheat' },   volume: 1200, price: '185 USD', status: 'progress', partner: 'Australian Grain...', date: '01/04 - 01/05' },
  { id: 253, product: { ES: 'Trigo',  EN: 'Wheat' },   volume: 1200, price: '183 USD', status: 'signed',   partner: 'Adecoagro S.A.',      date: '06/04/2026' },
  { id: 251, product: { ES: 'Maíz',   EN: 'Corn' },    volume: 4000, price: '186 USD', status: 'progress', partner: 'Golden Harvest...',    date: '05/04/2026' },
  { id: 248, product: { ES: 'Cebada', EN: 'Barley' },  volume: 1000, price: '168 USD', status: 'terminated',partner: 'Adecoagro S.A.',      date: '20/03/2026' },
  { id: 247, product: { ES: 'Sorgo',  EN: 'Sorghum' }, volume: 1000, price: '133 USD', status: 'new',      partner: 'Impex Express...',     date: '27/03/2026' },
];

const STATUS = {
  verified:   { bg: '#dcfce7', color: '#15803d', icon: CheckCircle,  ES: 'Verificado', EN: 'Verified' },
  pending:    { bg: '#fef9c3', color: '#854d0e', icon: RefreshCw,    ES: 'Pendiente',  EN: 'Pending' },
  rejected:   { bg: '#fee2e2', color: '#dc2626', icon: XCircle,      ES: 'Rechazado',  EN: 'Rejected' },
  signed:     { bg: '#dcfce7', color: '#15803d', icon: CheckCircle,  ES: 'Firmado',    EN: 'Signed' },
  progress:   { bg: '#dbeafe', color: '#1d4ed8', icon: RefreshCw,    ES: 'En progreso',EN: 'In Progress' },
  terminated: { bg: '#fee2e2', color: '#b45309', icon: XCircle,      ES: 'Terminado',  EN: 'Terminated' },
  new:        { bg: '#ccfbf1', color: '#0f766e', icon: CheckCircle,  ES: 'Nuevo',      EN: 'New' },
};

function StatusBadge({ status, lang }) {
  const s = STATUS[status];
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 4, background: s.bg, color: s.color }}>
      {s[lang]}
    </span>
  );
}

export default function AdminDashboard({ onNavigate }) {
  const { lang } = useAuth();
  const statLabels = {
    ES: { users: 'Usuarios registrados', listings: 'Listados activos', contracts: 'Contratos totales', volume: 'Volumen operado' },
    EN: { users: 'Registered users',     listings: 'Active listings',   contracts: 'Total contracts',   volume: 'Volume traded' },
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#1a1a2e', margin: 0 }}>
          {lang === 'ES' ? 'Panel de administración' : 'Admin dashboard'}
        </h1>
        <p style={{ color: '#888', fontSize: 13, marginTop: 4 }}>
          {lang === 'ES' ? 'Resumen operativo de AGRIMARKET' : 'AGRIMARKET operational overview'}
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 18, marginBottom: 28 }}>
        {stats.map(({ key, icon: Icon, color, bg, val, sub }) => (
          <div key={key} style={{ background: '#fff', borderRadius: 10, padding: '20px 22px', boxShadow: '0 1px 8px rgba(0,0,0,0.07)', border: '1px solid #eee', display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 46, height: 46, borderRadius: 12, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon size={21} style={{ color }} />
            </div>
            <div>
              <p style={{ fontSize: 26, fontWeight: 800, color: '#1a1a2e', margin: 0, lineHeight: 1 }}>{val}</p>
              <p style={{ fontSize: 12, color: '#888', margin: '3px 0 0' }}>{statLabels[lang][key]}</p>
              <p style={{ fontSize: 11, color, margin: '2px 0 0', fontWeight: 600 }}>{sub[lang]}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Two columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22 }}>

        {/* Recent users */}
        <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #eee', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 22px', borderBottom: '1px solid #f0f0f0' }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: '#1a1a2e', margin: 0 }}>
              {lang === 'ES' ? 'Usuarios recientes' : 'Recent users'}
            </h2>
            <button onClick={() => onNavigate('/admin/users')} style={{ background: 'none', border: 'none', color: BLUE, fontSize: 12, cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 3 }}>
              {lang === 'ES' ? 'Ver todos' : 'View all'} <ChevronRight size={13} />
            </button>
          </div>
          {recentUsers.map((u, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 22px', borderBottom: i < recentUsers.length - 1 ? '1px solid #f5f5f5' : 'none' }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: u.color + '22', color: u.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, flexShrink: 0 }}>
                {u.initials}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: 0, fontWeight: 600, fontSize: 13, color: '#1a1a2e', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{u.name}</p>
                <p style={{ margin: '1px 0 0', fontSize: 11, color: '#aaa' }}>{u.role[lang]} · {u.date}</p>
              </div>
              <StatusBadge status={u.status} lang={lang} />
            </div>
          ))}
        </div>

        {/* Recent contracts */}
        <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #eee', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 22px', borderBottom: '1px solid #f0f0f0' }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: '#1a1a2e', margin: 0 }}>
              {lang === 'ES' ? 'Contratos recientes' : 'Recent contracts'}
            </h2>
            <button onClick={() => onNavigate('/admin/contracts')} style={{ background: 'none', border: 'none', color: BLUE, fontSize: 12, cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 3 }}>
              {lang === 'ES' ? 'Ver todos' : 'View all'} <ChevronRight size={13} />
            </button>
          </div>
          {recentContracts.map((c, i) => (
            <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 22px', borderBottom: i < recentContracts.length - 1 ? '1px solid #f5f5f5' : 'none' }}>
              <span style={{ fontSize: 12, color: '#aaa', fontWeight: 600, minWidth: 30 }}>#{c.id}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: 0, fontWeight: 600, fontSize: 13, color: '#1a1a2e' }}>{c.product[lang]} · {c.volume} tn</p>
                <p style={{ margin: '1px 0 0', fontSize: 11, color: '#aaa' }}>{c.partner}</p>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <StatusBadge status={c.status} lang={lang} />
                <p style={{ margin: '3px 0 0', fontSize: 11, color: '#aaa' }}>{c.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
