import React from 'react';
import AuthHeader from '../../components/AuthHeader';
import { useAuth } from '../../context/AuthContext';
import { T } from '../../translations';
import {
  BarChart3, Package, MessageSquare, FileText, Gavel, User, Plus
} from 'lucide-react';

const BLUE    = '#4A90D9';
const SIDEBAR = 220;

// Sidebar item
function SideItem({ label, icon: Icon, route, active, badge, onNavigate }) {
  return (
    <button
      onClick={() => onNavigate(route)}
      style={{
        display: 'flex', alignItems: 'center', gap: 10,
        width: '100%', padding: '11px 20px',
        border: 'none', borderRadius: 0,
        background: active ? '#eff6ff' : 'transparent',
        color: active ? BLUE : '#555',
        fontWeight: active ? 700 : 400,
        fontSize: 14, cursor: 'pointer', textAlign: 'left',
        borderLeft: active ? `3px solid ${BLUE}` : '3px solid transparent',
        transition: 'all 0.15s',
      }}
      onMouseEnter={e => { if (!active) e.currentTarget.style.background = '#f5f8ff'; }}
      onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
    >
      <Icon size={16} style={{ flexShrink: 0 }} />
      <span style={{ flex: 1 }}>{label}</span>
      {badge > 0 && (
        <span style={{
          background: BLUE, color: '#fff', fontSize: 11, fontWeight: 700,
          borderRadius: 10, padding: '1px 7px', marginLeft: 'auto',
        }}>{badge}</span>
      )}
    </button>
  );
}

export default function SellerLayout({
  children,
  currentRoute,
  onNavigate,
  messageBadge = 0,
}) {
  const { lang } = useAuth();
  const t = T[lang];

  const sideItems = [
    { label: t.dashboard,  icon: BarChart3,     route: '/seller/dashboard' },
    { label: t.myProducts, icon: Package,        route: '/seller/products' },
    { label: t.messages,   icon: MessageSquare,  route: '/seller/messages',  badge: messageBadge },
    { label: t.contracts,  icon: FileText,       route: '/seller/contracts' },
    { label: t.tenders,    icon: Gavel,          route: '/seller/tenders' },
    { label: t.profile,    icon: User,           route: '/seller/profile' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f5f7fa', display: 'flex', flexDirection: 'column' }}>

      {/* Authenticated header */}
      <AuthHeader
        currentRoute={currentRoute}
        onNavigate={onNavigate}
        messageBadge={messageBadge}
      />

      <div style={{ display: 'flex', flex: 1 }}>

        {/* ── SIDEBAR ── */}
        <aside style={{
          width: SIDEBAR, flexShrink: 0,
          background: '#fff',
          borderRight: '1px solid #e8eaed',
          display: 'flex', flexDirection: 'column',
          paddingTop: 16,
        }}>

          {/* Company / user info */}
          <div style={{ padding: '0 20px 16px', borderBottom: '1px solid #f0f0f0' }}>
            <p style={{ fontSize: 12, color: '#aaa', margin: 0, marginBottom: 2 }}>
              {lang === 'ES' ? 'Panel del' : 'Logged in as'}
            </p>
            <p style={{ fontSize: 14, fontWeight: 700, color: '#1a1a2e', margin: 0 }}>
              {lang === 'ES' ? 'Vendedor' : 'Seller'}
            </p>
          </div>

          {/* Nav items */}
          <nav style={{ flex: 1, paddingTop: 8 }}>
            {sideItems.map(item => (
              <SideItem
                key={item.route}
                {...item}
                active={currentRoute?.startsWith(item.route)}
                onNavigate={onNavigate}
              />
            ))}
          </nav>

          {/* Quick action */}
          <div style={{ padding: '16px 16px 20px', borderTop: '1px solid #f0f0f0' }}>
            <button
              onClick={() => onNavigate('/seller/products/new')}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                width: '100%', padding: '10px 0',
                background: BLUE, color: '#fff',
                border: 'none', borderRadius: 6,
                fontWeight: 700, fontSize: 13, cursor: 'pointer',
                letterSpacing: 0.5,
              }}
            >
              <Plus size={15} />
              {t.newProduct}
            </button>
          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main style={{ flex: 1, minWidth: 0, padding: '32px 36px' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
