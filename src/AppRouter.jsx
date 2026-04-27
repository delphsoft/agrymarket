import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';

// Pages
import App                from './App.jsx';
import { Login, Register } from './pages/auth/Auth.jsx';
import Onboarding         from './pages/auth/Onboarding.jsx';

// Seller
import SellerLayout    from './pages/seller/SellerLayout.jsx';
import SellerDashboard from './pages/seller/SellerDashboard.jsx';
import SellerProducts  from './pages/seller/SellerProducts.jsx';
import NewProduct      from './pages/seller/NewProduct.jsx';

// ── Placeholder components (Paso 2, 3, 4...) ──────────────────────────────────
function ComingSoon({ title, lang }) {
  return (
    <div style={{ textAlign: 'center', padding: '80px 20px', color: '#aaa' }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>🚧</div>
      <h2 style={{ color: '#1a1a2e', fontWeight: 700, fontSize: 20, marginBottom: 8 }}>{title}</h2>
      <p style={{ margin: 0 }}>
        {lang === 'ES' ? 'Este módulo se construye en el próximo paso.' : 'This module is built in the next step.'}
      </p>
    </div>
  );
}

// ─── ROUTER ───────────────────────────────────────────────────────────────────
export default function AppRouter() {
  const { user, lang } = useAuth();
  const [route, setRoute] = useState('/');

  const navigate = (to) => {
    setRoute(to);
    window.scrollTo(0, 0);
  };

  // ── Public routes ────────────────────────────────────────────────────────
  if (route === '/')         return <App onNavigate={navigate} />;
  if (route === '/login')    return <Login onNavigate={navigate} />;
  if (route === '/register') return <Register onNavigate={navigate} />;
  if (route === '/onboarding') return <Onboarding onNavigate={navigate} />;

  // ── Seller routes ────────────────────────────────────────────────────────
  if (route.startsWith('/seller')) {
    const page = () => {
      if (route === '/seller/dashboard')    return <SellerDashboard onNavigate={navigate} />;
      if (route === '/seller/products')     return <SellerProducts onNavigate={navigate} />;
      if (route === '/seller/products/new') return <NewProduct onNavigate={navigate} />;
      if (route.includes('/edit'))          return <NewProduct onNavigate={navigate} editMode />;
      if (route === '/seller/messages')     return <ComingSoon title="Mensajería" lang={lang} />;
      if (route === '/seller/contracts')    return <ComingSoon title="Contratos" lang={lang} />;
      if (route === '/seller/tenders')      return <ComingSoon title="Licitaciones" lang={lang} />;
      if (route === '/seller/profile')      return <ComingSoon title="Perfil & KYC" lang={lang} />;
      return <SellerDashboard onNavigate={navigate} />;
    };
    return (
      <SellerLayout currentRoute={route} onNavigate={navigate} messageBadge={3}>
        {page()}
      </SellerLayout>
    );
  }

  // ── Buyer routes (Paso 3) ────────────────────────────────────────────────
  if (route.startsWith('/buyer')) {
    return (
      <div style={{ padding: 40, textAlign: 'center' }}>
        <ComingSoon title="Portal Comprador — Paso 3" lang={lang} />
        <button onClick={() => navigate('/')} style={{ marginTop: 20, padding: '10px 24px', background: '#4A90D9', color: '#fff', border: 'none', borderRadius: 7, cursor: 'pointer', fontWeight: 700 }}>
          ← {lang === 'ES' ? 'Inicio' : 'Home'}
        </button>
      </div>
    );
  }

  // ── Admin routes (Paso 4) ────────────────────────────────────────────────
  if (route.startsWith('/admin')) {
    return (
      <div style={{ padding: 40, textAlign: 'center' }}>
        <ComingSoon title="Panel Admin — Paso 4" lang={lang} />
        <button onClick={() => navigate('/')} style={{ marginTop: 20, padding: '10px 24px', background: '#4A90D9', color: '#fff', border: 'none', borderRadius: 7, cursor: 'pointer', fontWeight: 700 }}>
          ← {lang === 'ES' ? 'Inicio' : 'Home'}
        </button>
      </div>
    );
  }

  // Fallback
  return <App onNavigate={navigate} />;
}
