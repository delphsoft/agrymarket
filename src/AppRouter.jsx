import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';

import App                 from './App.jsx';
import { Login, Register } from './pages/auth/Auth.jsx';
import Onboarding          from './pages/auth/Onboarding.jsx';

import SellerLayout    from './pages/seller/SellerLayout.jsx';
import SellerDashboard from './pages/seller/SellerDashboard.jsx';
import SellerProducts  from './pages/seller/SellerProducts.jsx';
import NewProduct      from './pages/seller/NewProduct.jsx';
import SellerMessages  from './pages/seller/SellerMessages.jsx';
import SellerContracts from './pages/seller/SellerContracts.jsx';

import AdminLayout    from './pages/admin/AdminLayout.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AdminUsers     from './pages/admin/AdminUsers.jsx';
import AdminListings  from './pages/admin/AdminListings.jsx';
import AdminContracts from './pages/admin/AdminContracts.jsx';
import AdminMessages  from './pages/admin/AdminMessages.jsx';
import AdminBlog      from './pages/admin/AdminBlog.jsx';

import BuyerLayout  from './pages/buyer/BuyerLayout.jsx';
import BuyerSearch  from './pages/buyer/BuyerSearch.jsx';
import { BuyerDashboard, BuyerMessages, BuyerContracts } from './pages/buyer/BuyerPages.jsx';

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

export default function AppRouter() {
  const { lang } = useAuth();
  const [route, setRoute] = useState('/');
  const navigate = (to) => { setRoute(to); window.scrollTo(0, 0); };

  if (route === '/')           return <App onNavigate={navigate} />;
  if (route === '/login')      return <Login onNavigate={navigate} />;
  if (route === '/register')   return <Register onNavigate={navigate} />;
  if (route === '/onboarding') return <Onboarding onNavigate={navigate} />;

  if (route.startsWith('/seller')) {
    const page = () => {
      if (route === '/seller/dashboard')    return <SellerDashboard onNavigate={navigate} />;
      if (route === '/seller/products')     return <SellerProducts onNavigate={navigate} />;
      if (route === '/seller/products/new') return <NewProduct onNavigate={navigate} />;
      if (route.includes('/edit'))          return <NewProduct onNavigate={navigate} editMode />;
      if (route === '/seller/messages')     return <SellerMessages />;
      if (route === '/seller/contracts')    return <SellerContracts />;
      if (route === '/seller/tenders')      return <ComingSoon title="Licitaciones — Fase 3" lang={lang} />;
      if (route === '/seller/profile')      return <ComingSoon title="Perfil & KYC — Fase 3" lang={lang} />;
      return <SellerDashboard onNavigate={navigate} />;
    };
    return (
      <SellerLayout currentRoute={route} onNavigate={navigate} messageBadge={3}>
        {page()}
      </SellerLayout>
    );
  }

  if (route.startsWith('/admin')) {
    const page = () => {
      if (route === '/admin/dashboard') return <AdminDashboard onNavigate={navigate} />;
      if (route === '/admin/users')     return <AdminUsers />;
      if (route === '/admin/listings')  return <AdminListings />;
      if (route === '/admin/contracts') return <AdminContracts />;
      if (route === '/admin/messages')  return <AdminMessages />;
      if (route === '/admin/blog')      return <AdminBlog />;
      if (route === '/admin/staff')     return <ComingSoon title="Gestión de staff" lang={lang} />;
      return <AdminDashboard onNavigate={navigate} />;
    };
    return (
      <AdminLayout currentRoute={route} onNavigate={navigate} messageBadge={2}>
        {page()}
      </AdminLayout>
    );
  }

  if (route.startsWith('/buyer')) {
    const page = () => {
      if (route === '/buyer/dashboard') return <BuyerDashboard onNavigate={navigate} />;
      if (route === '/buyer/search')    return <BuyerSearch onNavigate={navigate} />;
      if (route === '/buyer/messages')  return <BuyerMessages />;
      if (route === '/buyer/contracts') return <BuyerContracts />;
      if (route === '/buyer/tenders')   return <ComingSoon title="Licitaciones — Fase 3" lang={lang} />;
      if (route === '/buyer/profile')   return <ComingSoon title="Perfil & KYC — Fase 3" lang={lang} />;
      return <BuyerDashboard onNavigate={navigate} />;
    };
    return (
      <BuyerLayout currentRoute={route} onNavigate={navigate} messageBadge={1}>
        {page()}
      </BuyerLayout>
    );
  }

  return <App onNavigate={navigate} />;
}
