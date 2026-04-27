import React, { useState } from 'react';
import {
  Package, MessageSquare, FileText, User, ChevronDown,
  LogOut, Plus, Bell, Settings, BarChart3, Users, List,
  PenSquare, Gavel
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import NotificationBell from './NotificationBell';
import { T } from '../translations';

const BLUE  = '#4A90D9';
const GRAD  = 'linear-gradient(100deg,#5B8FDB 0%,#4DBFD9 100%)';

// Icono SVG del logo
function Logo() {
  return (
    <svg width="28" height="28" viewBox="0 0 100 100" style={{ flexShrink: 0 }}>
      <path d="M50 10 L40 30 L50 50 L60 30 Z" fill="#9FD356"/>
      <path d="M40 30 L30 45 L40 60 L50 50 Z" fill="#6BBF3B"/>
      <path d="M60 30 L70 45 L60 60 L50 50 Z" fill="#4A9D2A"/>
      <path d="M50 50 C50 50,30 75,30 85 Q30 95,50 95 Q70 95,70 85 C70 75,50 50,50 50" fill="#6BBF3B"/>
    </svg>
  );
}

// Dropdown genérico
function Dropdown({ label, icon: Icon, items, badge, onNavigate }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          background: 'none', border: 'none', color: 'rgba(255,255,255,0.92)',
          fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center',
          gap: 6, padding: '6px 4px', position: 'relative',
        }}
      >
        {Icon && <Icon size={16} style={{ opacity: 0.85 }} />}
        {label}
        {badge > 0 && (
          <span style={{
            background: '#4DBFD9', color: '#fff', fontSize: 11, fontWeight: 700,
            borderRadius: '50%', width: 18, height: 18, display: 'flex',
            alignItems: 'center', justifyContent: 'center', marginLeft: 2,
          }}>{badge}</span>
        )}
        <ChevronDown size={13} style={{ opacity: 0.7 }} />
      </button>

      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 90 }} />
          <div style={{
            position: 'absolute', top: 38, left: 0, background: '#fff', borderRadius: 6,
            boxShadow: '0 8px 32px rgba(0,0,0,0.14)', overflow: 'hidden', zIndex: 100,
            minWidth: 180, border: '1px solid #eee',
          }}>
            {items.map((item) => (
              <button
                key={item.label}
                onClick={() => { onNavigate(item.route); setOpen(false); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10, width: '100%',
                  padding: '11px 16px', border: 'none', background: '#fff',
                  color: '#333', fontSize: 14, cursor: 'pointer', textAlign: 'left',
                  borderBottom: '1px solid #f5f5f5',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#f8faff'}
                onMouseLeave={e => e.currentTarget.style.background = '#fff'}
              >
                {item.icon && <item.icon size={15} style={{ color: BLUE }} />}
                {item.label}
                {item.badge > 0 && (
                  <span style={{ marginLeft: 'auto', background: BLUE, color: '#fff', fontSize: 10, fontWeight: 700, borderRadius: 10, padding: '1px 7px' }}>
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// Simple nav link (sin dropdown)
function NavLink({ label, icon: Icon, route, onNavigate, active, badge }) {
  return (
    <button
      onClick={() => onNavigate(route)}
      style={{
        background: 'none', border: 'none',
        color: active ? '#fff' : 'rgba(255,255,255,0.88)',
        fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center',
        gap: 6, padding: '6px 4px',
        borderBottom: active ? '2px solid rgba(255,255,255,0.9)' : '2px solid transparent',
        position: 'relative',
      }}
    >
      {Icon && <Icon size={16} style={{ opacity: 0.85 }} />}
      {label}
      {badge > 0 && (
        <span style={{
          background: '#4DBFD9', color: '#fff', fontSize: 11, fontWeight: 700,
          borderRadius: '50%', width: 18, height: 18, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
        }}>{badge}</span>
      )}
    </button>
  );
}

// ─── AUTH HEADER ──────────────────────────────────────────────────────────────
export default function AuthHeader({ currentRoute, onNavigate, messageBadge = 0 }) {
  const { user, lang, setLang, logout } = useAuth();
  const t = T[lang];
  const [langOpen, setLangOpen] = useState(false);

  const role = user?.role; // 'seller' | 'buyer' | 'admin'

  // ── Seller nav items ──────────────────────────────────────────────────────
  const sellerNav = [
    {
      type: 'dropdown',
      label: t.myProducts,
      icon: Package,
      items: [
        { label: t.myProducts, icon: List,       route: '/seller/products' },
        { label: t.newProduct, icon: Plus,        route: '/seller/products/new' },
      ],
    },
    {
      type: 'link',
      label: t.messages,
      icon: MessageSquare,
      route: '/seller/messages',
      badge: messageBadge,
    },
    {
      type: 'link',
      label: t.contracts,
      icon: FileText,
      route: '/seller/contracts',
    },
    {
      type: 'link',
      label: t.tenders,
      icon: Gavel,
      route: '/seller/tenders',
    },
    {
      type: 'dropdown',
      label: t.profile,
      icon: User,
      items: [
        { label: t.profile,  icon: User,     route: '/seller/profile' },
        { label: t.dashboard,icon: BarChart3, route: '/seller/dashboard' },
        { label: t.logout,   icon: LogOut,   route: '__logout__' },
      ],
    },
    {
      type: 'dropdown',
      label: t.askManager,
      icon: null,
      items: [
        { label: 'General',      icon: MessageSquare, route: '/seller/messages?thread=general' },
        { label: 'Soporte',      icon: MessageSquare, route: '/seller/messages?thread=support' },
      ],
    },
  ];

  // ── Buyer nav items ───────────────────────────────────────────────────────
  const buyerNav = [
    {
      type: 'link',
      label: t.search,
      icon: List,
      route: '/buyer/search',
    },
    {
      type: 'link',
      label: t.messages,
      icon: MessageSquare,
      route: '/buyer/messages',
      badge: messageBadge,
    },
    {
      type: 'link',
      label: t.contracts,
      icon: FileText,
      route: '/buyer/contracts',
    },
    {
      type: 'link',
      label: t.tenders,
      icon: Gavel,
      route: '/buyer/tenders',
    },
    {
      type: 'dropdown',
      label: t.profile,
      icon: User,
      items: [
        { label: t.profile,   icon: User,     route: '/buyer/profile' },
        { label: t.dashboard, icon: BarChart3, route: '/buyer/dashboard' },
        { label: t.logout,    icon: LogOut,   route: '__logout__' },
      ],
    },
    {
      type: 'dropdown',
      label: t.askManager,
      items: [
        { label: 'General', icon: MessageSquare, route: '/buyer/messages?thread=general' },
        { label: 'Soporte', icon: MessageSquare, route: '/buyer/messages?thread=support' },
      ],
    },
  ];

  // ── Admin nav items ───────────────────────────────────────────────────────
  const adminNav = [
    { type: 'link', label: t.users,    icon: Users,       route: '/admin/users' },
    { type: 'link', label: t.listings, icon: List,        route: '/admin/listings' },
    { type: 'link', label: t.messages, icon: MessageSquare, route: '/admin/messages', badge: messageBadge },
    { type: 'link', label: t.contracts,icon: FileText,    route: '/admin/contracts' },
    { type: 'link', label: t.blog,     icon: PenSquare,   route: '/admin/blog' },
    {
      type: 'dropdown',
      label: t.profile,
      icon: User,
      items: [
        { label: t.staff,  icon: Users,  route: '/admin/staff' },
        { label: t.logout, icon: LogOut, route: '__logout__' },
      ],
    },
  ];

  const navItems = role === 'seller' ? sellerNav
    : role === 'buyer' ? buyerNav
    : adminNav;

  const handleNavigate = (route) => {
    if (route === '__logout__') { logout(); onNavigate('/'); return; }
    onNavigate(route);
  };

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : '?';

  return (
    <header style={{
      background: GRAD,
      position: 'sticky', top: 0, zIndex: 50,
      boxShadow: '0 2px 12px rgba(0,0,0,0.13)',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        padding: '0 24px',
        display: 'flex', alignItems: 'center', height: 64, gap: 0,
      }}>

        {/* Logo */}
        <button
          onClick={() => handleNavigate('/')}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 10,
            color: '#fff', fontWeight: 800, fontSize: 18, letterSpacing: 4,
            marginRight: 32, flexShrink: 0, padding: 0,
          }}
        >
          <Logo />
          AGRIMARKET
        </button>

        {/* Nav items */}
        <nav style={{ display: 'flex', gap: 4, flex: 1, alignItems: 'center' }}>
          {navItems.map((item, i) =>
            item.type === 'dropdown' ? (
              <Dropdown
                key={i}
                label={item.label}
                icon={item.icon}
                items={item.items}
                badge={item.badge || 0}
                onNavigate={handleNavigate}
              />
            ) : (
              <NavLink
                key={i}
                label={item.label}
                icon={item.icon}
                route={item.route}
                badge={item.badge || 0}
                active={currentRoute?.startsWith(item.route)}
                onNavigate={handleNavigate}
              />
            )
          )}
        </nav>

        {/* Right side: ADD PRODUCT (seller only) + Lang + Avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>

          {role === 'seller' && (
            <button
              onClick={() => handleNavigate('/seller/products/new')}
              style={{
                background: 'transparent', color: '#fff',
                border: '2px solid rgba(255,255,255,0.85)',
                borderRadius: 4, padding: '8px 16px',
                fontWeight: 700, fontSize: 12, letterSpacing: 1.2,
                cursor: 'pointer', whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
            >
              + {t.addProduct}
            </button>
          )}

          {/* Notifications */}
          <NotificationBell role={role || 'seller'} lang={lang} onNavigate={handleNavigate} />

          {/* Language */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              style={{
                background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.35)',
                borderRadius: 4, color: '#fff', fontSize: 13, fontWeight: 700,
                padding: '5px 10px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 4,
              }}
            >
              {lang} <ChevronDown size={12} />
            </button>
            {langOpen && (
              <>
                <div onClick={() => setLangOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 90 }} />
                <div style={{
                  position: 'absolute', right: 0, top: 38, background: '#fff',
                  borderRadius: 6, boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                  overflow: 'hidden', zIndex: 100, minWidth: 130,
                }}>
                  {['ES', 'EN'].map(l => (
                    <button key={l} onClick={() => { setLang(l); setLangOpen(false); }}
                      style={{
                        display: 'block', width: '100%', padding: '10px 16px',
                        border: 'none', background: lang === l ? '#eff6ff' : '#fff',
                        color: lang === l ? BLUE : '#333',
                        fontWeight: lang === l ? 700 : 400, fontSize: 14,
                        cursor: 'pointer', textAlign: 'left',
                      }}>
                      {l === 'ES' ? '🇦🇷 Español' : '🇬🇧 English'}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Avatar */}
          <div
            style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'rgba(255,255,255,0.25)',
              border: '2px solid rgba(255,255,255,0.5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer',
              flexShrink: 0,
            }}
            title={user?.name}
          >
            {initials}
          </div>
        </div>
      </div>
    </header>
  );
}
