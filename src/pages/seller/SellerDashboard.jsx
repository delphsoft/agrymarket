import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { T } from '../../translations';
import { Package, MessageSquare, FileText, TrendingUp, Clock, ChevronRight } from 'lucide-react';

const BLUE = '#4A90D9';

const stats = [
  { key: 'activeListings',  icon: Package,       color: '#4A90D9', bg: '#eff6ff', value: 6  },
  { key: 'newMessages',     icon: MessageSquare, color: '#10b981', bg: '#ecfdf5', value: 3  },
  { key: 'activeContracts', icon: FileText,       color: '#f59e0b', bg: '#fffbeb', value: 2  },
  { key: 'totalVolume',     icon: TrendingUp,     color: '#8b5cf6', bg: '#f5f3ff', value: '4.800 tn' },
];

const recentActivity = [
  { type: 'message',  text: { ES: 'Nuevo mensaje de AustraloGrain Co.', EN: 'New message from AustraloGrain Co.' },        time: '15:30', route: '/seller/messages' },
  { type: 'contract', text: { ES: 'Contrato #253 firmado — Maíz 1.200 tn', EN: 'Contract #253 signed — Corn 1,200 MT' },   time: '12:04', route: '/seller/contracts' },
  { type: 'message',  text: { ES: 'AGRIMARKET: verificación aprobada', EN: 'AGRIMARKET: verification approved' },           time: 'Ayer', route: '/seller/messages' },
  { type: 'contract', text: { ES: 'Contra-oferta recibida en contrato #251', EN: 'Counter-offer received on contract #251' }, time: 'Ayer', route: '/seller/contracts' },
  { type: 'listing',  text: { ES: 'Trigo Pan Grado 2 — listado activado', EN: 'Wheat Pan Grade 2 — listing activated' },   time: 'Hace 2d', route: '/seller/products' },
];

const activityIcon = {
  message:  { icon: MessageSquare, color: BLUE },
  contract: { icon: FileText, color: '#f59e0b' },
  listing:  { icon: Package, color: '#10b981' },
};

export default function SellerDashboard({ onNavigate }) {
  const { user, lang } = useAuth();
  const t = T[lang];
  const greeting = lang === 'ES' ? 'Bienvenido' : 'Welcome back';
  const name = user?.name?.split(' ')[0] || (lang === 'ES' ? 'Vendedor' : 'Seller');

  return (
    <div>
      {/* Greeting */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1a1a2e', margin: 0 }}>
          {greeting}, {name} 👋
        </h1>
        <p style={{ color: '#888', fontSize: 14, marginTop: 4 }}>
          {lang === 'ES'
            ? 'Esto es lo que está pasando con tus productos hoy.'
            : "Here's what's happening with your products today."}
        </p>
      </div>

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 18, marginBottom: 36 }}>
        {stats.map(({ key, icon: Icon, color, bg, value }) => (
          <div key={key} style={{
            background: '#fff', borderRadius: 10, padding: '22px 24px',
            boxShadow: '0 1px 8px rgba(0,0,0,0.07)', border: '1px solid #eee',
            display: 'flex', alignItems: 'center', gap: 16,
          }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon size={22} style={{ color }} />
            </div>
            <div>
              <p style={{ fontSize: 26, fontWeight: 800, color: '#1a1a2e', margin: 0, lineHeight: 1 }}>{value}</p>
              <p style={{ fontSize: 12, color: '#888', margin: '4px 0 0' }}>{t[key]}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent activity */}
      <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #eee', boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 24px', borderBottom: '1px solid #f0f0f0' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#1a1a2e', margin: 0 }}>{t.recentActivity}</h2>
          <button onClick={() => onNavigate('/seller/messages')} style={{ background: 'none', border: 'none', color: BLUE, fontSize: 13, cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
            {t.viewAll} <ChevronRight size={14} />
          </button>
        </div>
        {recentActivity.map((item, i) => {
          const { icon: Icon, color } = activityIcon[item.type];
          return (
            <button
              key={i}
              onClick={() => onNavigate(item.route)}
              style={{
                display: 'flex', alignItems: 'center', gap: 14, width: '100%',
                padding: '14px 24px', border: 'none', background: '#fff',
                borderBottom: i < recentActivity.length - 1 ? '1px solid #f5f5f5' : 'none',
                cursor: 'pointer', textAlign: 'left',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#fafbff'}
              onMouseLeave={e => e.currentTarget.style.background = '#fff'}
            >
              <div style={{ width: 34, height: 34, borderRadius: '50%', background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={16} style={{ color }} />
              </div>
              <p style={{ flex: 1, margin: 0, fontSize: 14, color: '#333' }}>{item.text[lang]}</p>
              <span style={{ fontSize: 12, color: '#aaa', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 4 }}>
                <Clock size={12} /> {item.time}
              </span>
              <ChevronRight size={14} style={{ color: '#ddd', flexShrink: 0 }} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
