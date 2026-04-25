import React, { useState } from 'react';
import { Search, List, Facebook, Twitter, Linkedin, ChevronDown, MapPin, Clock, Package } from 'lucide-react';

// ─── TRANSLATIONS ──────────────────────────────────────────────────────────────
const T = {
  EN: {
    nav: ['How it works', 'Compliance', 'About', 'Ask manager'],
    signIn: 'SIGN IN', register: 'REGISTER NOW',
    heroTitle: 'Access to Global Commodities Marketplace',
    heroSub: 'Platform tailored to agro-commodity traders',
    categories: 'CATEGORIES', buy: 'BUY', sell: 'SELL',
    searchPlaceholder: 'What are you looking for?',
    banner1Title: 'Access the global market', banner1Blue: 'for free',
    banner1Desc: 'Join us and get free access for 6 months to buy and sell commodities from around the world.',
    banner1Btn: 'REGISTER NOW',
    banner2Title: 'Buy and sell commodities worldwide', banner2Btn: 'HOW IT WORKS',
    featTitle: 'Why choose AGRIMARKET?',
    features: [
      { title: 'Global Commodities Access', desc: 'Search our product database for agricultural commodities being sold around the world!' },
      { title: 'Enhanced Transparency', desc: 'All customers must go through our KYC compliance process to gain full access to the platform.' },
      { title: 'Buy At Source', desc: 'Negotiate a better price directly with the producer.' },
      { title: 'New Benchmark in Communication', desc: 'With our real-time messaging and contract management system, you can negotiate every step without a single phone call.' },
      { title: 'Personal Relationship Manager', desc: 'All customers are assigned a personal relationship manager providing support with platform functionality.' },
      { title: 'Expand Markets', desc: 'Find new buyers and sellers for your products and diversify your client base.' },
    ],
    recentTitle: 'Recently added products',
    perTon: 'per ton', viewOffer: 'View offer',
    ctaTitle: 'Access the global market', ctaBlue: 'for free',
    ctaDesc: 'Join us and get free access for 6 months to buy and sell commodities from around the world.',
    ctaBtn: 'REGISTER NOW',
    footerSub: 'Subscribe to receive news first',
    emailPlaceholder: 'Email for newsletters', subscribe: 'SUBSCRIBE',
    menuLinks: ['Home', 'About', 'How it works', 'Compliance'],
    legalLinks: ['Terms of Service', 'The Policy of Confidentiality', 'Support', 'FAQ'],
    copyright: 'All rights reserved.',
    filterAll: 'All', filterGrains: 'Grains', filterLegumes: 'Legumes',
    filterOilseeds: 'Oilseeds', filterForages: 'Forages',
    fixed: 'Fixed price', negotiable: 'Negotiable',
    noProducts: 'No products found.',
    language: 'LANGUAGE',
  },
  ES: {
    nav: ['Cómo funciona', 'Cumplimiento', 'Nosotros', 'Hablar con gerente'],
    signIn: 'INGRESAR', register: 'REGISTRARSE',
    heroTitle: 'Acceso al Mercado Global de Commodities',
    heroSub: 'Plataforma diseñada para operadores de agro-commodities',
    categories: 'CATEGORÍAS', buy: 'COMPRAR', sell: 'VENDER',
    searchPlaceholder: '¿Qué estás buscando?',
    banner1Title: 'Accedé al mercado global', banner1Blue: 'gratis',
    banner1Desc: 'Uníte y obtené 6 meses de acceso gratuito para comprar y vender commodities de todo el mundo.',
    banner1Btn: 'REGISTRARSE',
    banner2Title: 'Comprá y vendé commodities en todo el mundo', banner2Btn: 'CÓMO FUNCIONA',
    featTitle: '¿Por qué elegir AGRIMARKET?',
    features: [
      { title: 'Acceso Global a Commodities', desc: 'Buscá en nuestra base de datos de commodities agrícolas que se comercializan en todo el mundo.' },
      { title: 'Transparencia Total', desc: 'Todos los clientes deben pasar por nuestro proceso de cumplimiento KYC para obtener acceso completo a la plataforma.' },
      { title: 'Comprá en la Fuente', desc: 'Negociá un mejor precio directamente con el productor.' },
      { title: 'Nuevo Estándar de Comunicación', desc: 'Con nuestro sistema de mensajería en tiempo real y gestión de contratos, podés negociar cada paso sin una sola llamada.' },
      { title: 'Gerente de Relaciones Personal', desc: 'Cada cliente tiene asignado un gerente de relaciones personal que brinda soporte con la funcionalidad de la plataforma.' },
      { title: 'Expandí tus Mercados', desc: 'Encontrá nuevos compradores y vendedores para tus productos y diversificá tu base de clientes.' },
    ],
    recentTitle: 'Productos recientemente agregados',
    perTon: 'por tonelada', viewOffer: 'Ver oferta',
    ctaTitle: 'Accedé al mercado global', ctaBlue: 'gratis',
    ctaDesc: 'Uníte y obtené 6 meses de acceso gratuito para comprar y vender commodities de todo el mundo.',
    ctaBtn: 'REGISTRARSE',
    footerSub: 'Suscribite para recibir novedades',
    emailPlaceholder: 'Email para newsletters', subscribe: 'SUSCRIBIRSE',
    menuLinks: ['Inicio', 'Nosotros', 'Cómo funciona', 'Cumplimiento'],
    legalLinks: ['Términos de Servicio', 'Política de Confidencialidad', 'Soporte', 'FAQ'],
    copyright: 'Todos los derechos reservados.',
    filterAll: 'Todos', filterGrains: 'Cereales', filterLegumes: 'Legumbres',
    filterOilseeds: 'Oleaginosas', filterForages: 'Forrajes',
    fixed: 'Precio fijo', negotiable: 'Negociable',
    noProducts: 'No se encontraron productos.',
    language: 'IDIOMA',
  },
};

// ─── PRODUCTS — usando URLs que sí cargan en producción ────────────────────────
const products = [
  {
    id: 1,
    // Maíz amarillo
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/YellowCorn.jpg/640px-YellowCorn.jpg',
    name: { EN: 'Yellow Corn 100% Clean', ES: 'Maíz Amarillo 100% Limpio' },
    category: 'Grains',
    price: '$1,100 - $1,800',
    location: 'Córdoba, Argentina',
    company: 'AgroSur S.A.',
    priceType: 'fixed',
    date: { EN: '2 days ago', ES: 'Hace 2 días' },
  },
  {
    id: 2,
    // Soja
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Soybean_sprouts.jpg/640px-Soybean_sprouts.jpg',
    name: { EN: 'Premium Soya Beans', ES: 'Soja Premium' },
    category: 'Legumes',
    price: '$450 - $520',
    location: 'Santa Fe, Argentina',
    company: 'PampaSoja Ltda.',
    priceType: 'negotiable',
    date: { EN: '5 days ago', ES: 'Hace 5 días' },
  },
  {
    id: 3,
    // Trigo
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Wheat_harvest.jpg/640px-Wheat_harvest.jpg',
    name: { EN: 'Wheat Pan Grade 2', ES: 'Trigo Pan Grado 2' },
    category: 'Grains',
    price: '$320',
    location: 'Buenos Aires, Argentina',
    company: 'CerealesBA S.R.L.',
    priceType: 'fixed',
    date: { EN: '1 week ago', ES: 'Hace 1 semana' },
  },
  {
    id: 4,
    // Girasol
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Sunflower_sky_backdrop.jpg/640px-Sunflower_sky_backdrop.jpg',
    name: { EN: 'High Oleic Sunflower', ES: 'Girasol Alto Oleico' },
    category: 'Oilseeds',
    price: '$290 - $340',
    location: 'La Pampa, Argentina',
    company: 'PampaOil S.A.',
    priceType: 'negotiable',
    date: { EN: '3 days ago', ES: 'Hace 3 días' },
  },
  {
    id: 5,
    // Cebada
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Barley_au_naturel.jpg/640px-Barley_au_naturel.jpg',
    name: { EN: 'Malting Barley', ES: 'Cebada Maltera' },
    category: 'Grains',
    price: '$280',
    location: 'Río Negro, Argentina',
    company: 'PatagoniaMalt S.A.',
    priceType: 'fixed',
    date: { EN: '6 days ago', ES: 'Hace 6 días' },
  },
  {
    id: 6,
    // Sorgo
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Sorghum_Mature.jpg/640px-Sorghum_Mature.jpg',
    name: { EN: 'Feed Sorghum', ES: 'Sorgo Forrajero' },
    category: 'Forages',
    price: '$210 - $250',
    location: 'Santiago del Estero, Argentina',
    company: 'NOA Granos S.R.L.',
    priceType: 'negotiable',
    date: { EN: '1 day ago', ES: 'Hace 1 día' },
  },
  {
    id: 7,
    // Arroz
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/White_rice.jpg/640px-White_rice.jpg',
    name: { EN: 'White Rice Premium', ES: 'Arroz Blanco Premium' },
    category: 'Grains',
    price: '$550 - $620',
    location: 'Corrientes, Argentina',
    company: 'Arrocera del Norte S.A.',
    priceType: 'fixed',
    date: { EN: '4 days ago', ES: 'Hace 4 días' },
  },
  {
    id: 8,
    // Soja orgánica / campo
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Soy_beal_Flickr.jpg/640px-Soy_beal_Flickr.jpg',
    name: { EN: 'Organic Soybeans', ES: 'Soja Orgánica Certificada' },
    category: 'Legumes',
    price: '$490 - $560',
    location: 'Entre Ríos, Argentina',
    company: 'OrganicPampa S.A.',
    priceType: 'negotiable',
    date: { EN: '2 days ago', ES: 'Hace 2 días' },
  },
];

// Imágenes de banners — Wikipedia Commons (sin CORS, sin restricciones)
const BANNER_CORN     = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/YellowCorn.jpg/800px-YellowCorn.jpg';
const BANNER_HARVEST  = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Wheat_harvest.jpg/1200px-Wheat_harvest.jpg';
const BANNER_FIELDS   = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Sunflower_sky_backdrop.jpg/1200px-Sunflower_sky_backdrop.jpg';

// ─── FEATURE ICONS ─────────────────────────────────────────────────────────────
const FeatureIcon = ({ type }) => {
  const c = '#4A90D9';
  const p = { width: 40, height: 40, viewBox: '0 0 40 40' };
  const icons = {
    list:    <svg {...p}><rect x="14" y="10" width="16" height="2.5" rx="1.25" fill={c}/><rect x="14" y="18" width="16" height="2.5" rx="1.25" fill={c}/><rect x="14" y="26" width="16" height="2.5" rx="1.25" fill={c}/><rect x="8" y="9.5" width="4" height="4" rx="1" fill={c} opacity="0.5"/><rect x="8" y="17.5" width="4" height="4" rx="1" fill={c} opacity="0.5"/><rect x="8" y="25.5" width="4" height="4" rx="1" fill={c} opacity="0.5"/></svg>,
    shield:  <svg {...p}><path d="M20 6 L32 11 L32 22 C32 29 20 35 20 35 C20 35 8 29 8 22 L8 11 Z" stroke={c} strokeWidth="2" fill="none"/><path d="M14 20 L18 24 L26 16" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    dollar:  <svg {...p}><circle cx="20" cy="20" r="13" stroke={c} strokeWidth="2" fill="none"/><text x="20" y="26" textAnchor="middle" fill={c} fontSize="16" fontWeight="bold">$</text></svg>,
    message: <svg {...p}><rect x="6" y="9" width="28" height="18" rx="3" stroke={c} strokeWidth="2" fill="none"/><path d="M6 18 L34 18" stroke={c} strokeWidth="1.5"/><circle cx="13" cy="24" r="2" fill={c} opacity="0.6"/><rect x="17" y="23" width="10" height="2" rx="1" fill={c} opacity="0.4"/><path d="M14 27 L10 33" stroke={c} strokeWidth="1.5" strokeLinecap="round"/></svg>,
    user:    <svg {...p}><circle cx="20" cy="14" r="7" stroke={c} strokeWidth="2" fill="none"/><path d="M7 36 C7 28 33 28 33 36" stroke={c} strokeWidth="2" fill="none" strokeLinecap="round"/></svg>,
    chart:   <svg {...p}><polyline points="6,32 14,22 20,26 28,14 34,18" stroke={c} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/><polyline points="28,14 34,14 34,20" stroke={c} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  };
  return icons[type] || null;
};
const iconTypes = ['list', 'shield', 'dollar', 'message', 'user', 'chart'];

// ─── MAIN ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang]           = useState('EN');
  const [activeTab, setActiveTab] = useState('BUY');
  const [search, setSearch]       = useState('');
  const [category, setCategory]   = useState('All');
  const [email, setEmail]         = useState('');
  const [langOpen, setLangOpen]   = useState(false);

  const t    = T[lang];
  const blue = '#4A90D9';
  const grad = 'linear-gradient(100deg,#5B8FDB 0%,#4DBFD9 100%)';

  const filters = [
    { key: 'All',      label: t.filterAll },
    { key: 'Grains',   label: t.filterGrains },
    { key: 'Legumes',  label: t.filterLegumes },
    { key: 'Oilseeds', label: t.filterOilseeds },
    { key: 'Forages',  label: t.filterForages },
  ];

  const filtered = products.filter(p => {
    const q = search.toLowerCase();
    const matchSearch = !search ||
      p.name[lang].toLowerCase().includes(q) ||
      p.company.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q);
    return matchSearch && (category === 'All' || p.category === category);
  });

  return (
    <div style={{ fontFamily: "'Roboto','Helvetica Neue',Arial,sans-serif", minHeight: '100vh', background: '#fff', color: '#222' }}>

      {/* ══ HEADER ══════════════════════════════════════════════════════════════ */}
      <header style={{ background: grad, position: 'sticky', top: 0, zIndex: 50, boxShadow: '0 2px 12px rgba(0,0,0,0.12)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px', display: 'flex', alignItems: 'center', height: 64, gap: 32 }}>

          {/* Logo */}
          <div style={{ color: '#fff', fontWeight: 800, fontSize: 19, letterSpacing: 4, flexShrink: 0, display: 'flex', alignItems: 'center', gap: 9 }}>
            <svg width="26" height="26" viewBox="0 0 100 100">
              <path d="M50 10 L40 30 L50 50 L60 30 Z" fill="#9FD356"/>
              <path d="M40 30 L30 45 L40 60 L50 50 Z" fill="#6BBF3B"/>
              <path d="M60 30 L70 45 L60 60 L50 50 Z" fill="#4A9D2A"/>
              <path d="M50 50 C50 50,30 75,30 85 Q30 95,50 95 Q70 95,70 85 C70 75,50 50,50 50" fill="#6BBF3B"/>
            </svg>
            AGRIMARKET
          </div>

          {/* Nav */}
          <nav style={{ display: 'flex', gap: 28, flex: 1 }}>
            {t.nav.map(l => (
              <a key={l} href="#" style={{ color: 'rgba(255,255,255,0.9)', fontSize: 14, textDecoration: 'none', whiteSpace: 'nowrap' }}>{l}</a>
            ))}
          </nav>

          {/* Auth + Lang */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
            <a href="#" style={{ color: '#fff', fontSize: 13, fontWeight: 700, textDecoration: 'none', letterSpacing: 1 }}>{t.signIn}</a>
            <a href="#" style={{ color: '#fff', fontSize: 12, fontWeight: 700, textDecoration: 'none', letterSpacing: 1, border: '2px solid rgba(255,255,255,0.85)', borderRadius: 4, padding: '7px 14px', whiteSpace: 'nowrap' }}>
              {t.register}
            </a>

            {/* Language dropdown */}
            <div style={{ position: 'relative' }}>
              <button onClick={() => setLangOpen(!langOpen)}
                style={{ background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: 4, color: '#fff', fontSize: 13, fontWeight: 700, padding: '6px 11px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                {lang} <ChevronDown size={12} />
              </button>
              {langOpen && (
                <>
                  <div onClick={() => setLangOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 90 }} />
                  <div style={{ position: 'absolute', right: 0, top: 42, background: '#fff', borderRadius: 6, boxShadow: '0 8px 24px rgba(0,0,0,0.15)', overflow: 'hidden', zIndex: 100, minWidth: 130 }}>
                    {['EN', 'ES'].map(l => (
                      <button key={l} onClick={() => { setLang(l); setLangOpen(false); setCategory('All'); }}
                        style={{ display: 'block', width: '100%', padding: '11px 16px', border: 'none', background: lang === l ? '#eff6ff' : '#fff', color: lang === l ? blue : '#333', fontWeight: lang === l ? 700 : 400, fontSize: 14, cursor: 'pointer', textAlign: 'left' }}>
                        {l === 'EN' ? '🇬🇧 English' : '🇦🇷 Español'}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ══ HERO ═════════════════════════════════════════════════════════════════ */}
      <section style={{ background: grad, padding: '88px 24px 108px', textAlign: 'center' }}>
        <h1 style={{ color: '#fff', fontSize: 'clamp(22px,3.2vw,44px)', fontWeight: 300, margin: '0 auto 16px', lineHeight: 1.3, maxWidth: 680 }}>
          {t.heroTitle}
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: 16, marginBottom: 50, fontWeight: 300 }}>
          {t.heroSub}
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, maxWidth: 880, margin: '0 auto', flexWrap: 'wrap', alignItems: 'center' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: 9, background: 'rgba(255,255,255,0.18)', border: '1.5px solid rgba(255,255,255,0.45)', borderRadius: 6, color: '#fff', fontWeight: 700, fontSize: 13, letterSpacing: 1.5, padding: '0 20px', height: 52, cursor: 'pointer', flexShrink: 0 }}>
            <List size={16} /> {t.categories}
          </button>

          <div style={{ display: 'flex', flex: 1, minWidth: 280, background: '#fff', borderRadius: 6, overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.14)', height: 52 }}>
            {[{ key: 'BUY', label: t.buy }, { key: 'SELL', label: t.sell }].map(tab => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                style={{ background: activeTab === tab.key ? blue : 'transparent', color: activeTab === tab.key ? '#fff' : '#999', border: 'none', fontWeight: 700, fontSize: 13, padding: '0 18px', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                {tab.label}
              </button>
            ))}
            <input type="text" placeholder={t.searchPlaceholder} value={search} onChange={e => setSearch(e.target.value)}
              style={{ flex: 1, border: 'none', outline: 'none', fontSize: 14, color: '#555', padding: '0 12px', background: 'transparent' }} />
            <button style={{ background: 'none', border: 'none', paddingRight: 16, cursor: 'pointer', color: blue }}>
              <Search size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* ══ TWO-PANEL BANNER ═════════════════════════════════════════════════════ */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>

        {/* LEFT — imagen maíz + texto */}
        <div style={{ display: 'flex', alignItems: 'stretch', background: '#fff', minHeight: 300, overflow: 'hidden' }}>
          <div style={{ width: '44%', flexShrink: 0 }}>
            <img
              src={BANNER_CORN}
              alt="Corn"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              onError={e => { e.target.style.display = 'none'; }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '44px 44px' }}>
            <h2 style={{ fontSize: 25, fontWeight: 400, color: '#1a1a2e', marginBottom: 6, lineHeight: 1.3 }}>{t.banner1Title}</h2>
            <div style={{ color: blue, fontSize: 27, fontWeight: 700, marginBottom: 18 }}>{t.banner1Blue}</div>
            <p style={{ color: '#666', fontSize: 14, lineHeight: 1.8, marginBottom: 28, maxWidth: 300 }}>{t.banner1Desc}</p>
            <a href="#" style={{ display: 'inline-block', background: blue, color: '#fff', fontWeight: 700, fontSize: 12, letterSpacing: 1.5, padding: '13px 26px', borderRadius: 4, textDecoration: 'none', width: 'fit-content' }}>
              {t.banner1Btn}
            </a>
          </div>
        </div>

        {/* RIGHT — imagen cosecha con overlay oscuro */}
        <div style={{ position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', padding: '44px 56px', minHeight: 300 }}>
          <img
            src={BANNER_HARVEST}
            alt="Harvest"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            onError={e => { e.target.parentNode.style.background = '#1a2a3a'; }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(10,20,40,0.75) 0%,rgba(10,35,65,0.60) 100%)' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ color: '#fff', fontSize: 28, fontWeight: 400, lineHeight: 1.4, marginBottom: 32, maxWidth: 320 }}>{t.banner2Title}</h2>
            <a href="#" style={{ display: 'inline-block', color: '#fff', fontWeight: 700, fontSize: 12, letterSpacing: 1.5, padding: '12px 26px', border: '2px solid #fff', borderRadius: 4, textDecoration: 'none' }}>
              {t.banner2Btn}
            </a>
          </div>
        </div>
      </div>

      {/* ══ 6 FEATURES ═══════════════════════════════════════════════════════════ */}
      <section style={{ background: '#fafbfc', padding: '72px 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: 27, fontWeight: 300, color: '#1a1a2e', marginBottom: 56 }}>{t.featTitle}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '52px 56px' }}>
            {t.features.map(({ title, desc }, i) => (
              <div key={i} style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
                <div style={{ flexShrink: 0 }}><FeatureIcon type={iconTypes[i]} /></div>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1a1a2e', marginBottom: 9, lineHeight: 1.35 }}>{title}</h3>
                  <p style={{ fontSize: 13, color: '#777', lineHeight: 1.75, margin: 0 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PRODUCTS GRID ════════════════════════════════════════════════════════ */}
      <section style={{ padding: '56px 40px 80px', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          {/* Header + filters */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28, flexWrap: 'wrap', gap: 16 }}>
            <h2 style={{ fontSize: 27, fontWeight: 300, color: '#1a1a2e', margin: 0 }}>{t.recentTitle}</h2>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {filters.map(f => (
                <button key={f.key} onClick={() => setCategory(f.key)}
                  style={{ padding: '7px 16px', borderRadius: 20, border: '1.5px solid', cursor: 'pointer', fontWeight: 600, fontSize: 12,
                    borderColor: category === f.key ? blue : '#e0e0e0',
                    background: category === f.key ? '#eff6ff' : '#fff',
                    color: category === f.key ? blue : '#888' }}>
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#ccc' }}>
              <Package size={48} style={{ margin: '0 auto 16px', display: 'block', opacity: 0.3 }} />
              <p style={{ fontSize: 16 }}>{t.noProducts}</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(255px,1fr))', gap: 22 }}>
              {filtered.map(p => (
                <div key={p.id}
                  style={{ borderRadius: 8, overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', border: '1px solid #eee', background: '#fff', cursor: 'pointer', transition: 'transform 0.18s, box-shadow 0.18s' }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.14)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.08)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  {/* Image */}
                  <div style={{ position: 'relative', height: 180, overflow: 'hidden', background: '#e8f0e8' }}>
                    <img
                      src={p.image}
                      alt={p.name[lang]}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      onError={e => {
                        e.target.style.display = 'none';
                        e.target.parentNode.style.display = 'flex';
                        e.target.parentNode.style.alignItems = 'center';
                        e.target.parentNode.style.justifyContent = 'center';
                        e.target.parentNode.innerHTML = `<span style="font-size:48px;">🌾</span>`;
                      }}
                    />
                    <span style={{ position: 'absolute', top: 10, left: 10, borderRadius: 4, padding: '3px 9px', fontSize: 11, fontWeight: 700, background: 'rgba(255,255,255,0.93)', color: blue }}>
                      {filters.find(f => f.key === p.category)?.label || p.category}
                    </span>
                    <span style={{ position: 'absolute', top: 10, right: 10, borderRadius: 4, padding: '3px 9px', fontSize: 11, fontWeight: 700,
                      background: p.priceType === 'fixed' ? 'rgba(220,252,231,0.95)' : 'rgba(254,249,195,0.95)',
                      color: p.priceType === 'fixed' ? '#15803d' : '#854d0e' }}>
                      {p.priceType === 'fixed' ? t.fixed : t.negotiable}
                    </span>
                  </div>

                  {/* Info */}
                  <div style={{ padding: '16px 18px 18px' }}>
                    <h3 style={{ fontWeight: 700, fontSize: 14, color: '#1a1a2e', marginBottom: 6, lineHeight: 1.3 }}>{p.name[lang]}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#888', fontSize: 12, marginBottom: 3 }}>
                      <MapPin size={12} /> {p.location}
                    </div>
                    <div style={{ color: '#bbb', fontSize: 11, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Clock size={11} /> {p.date[lang]} &nbsp;·&nbsp; {p.company}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                      <div>
                        <div style={{ color: blue, fontWeight: 800, fontSize: 17 }}>{p.price}</div>
                        <div style={{ color: '#ccc', fontSize: 11 }}>{t.perTon}</div>
                      </div>
                      <a href="#" style={{ background: blue, color: '#fff', textDecoration: 'none', fontSize: 12, fontWeight: 700, padding: '9px 15px', borderRadius: 4 }}>
                        {t.viewOffer} →
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══ PRE-FOOTER CTA BANNER ════════════════════════════════════════════════ */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 290, background: '#f5f7fa' }}>
        <div style={{ overflow: 'hidden' }}>
          <img
            src={BANNER_FIELDS}
            alt="Fields"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', minHeight: 280 }}
            onError={e => { e.target.parentNode.style.background = '#c8e6c9'; }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px 60px' }}>
          <h2 style={{ fontSize: 27, fontWeight: 400, color: '#1a1a2e', marginBottom: 8, lineHeight: 1.3 }}>{t.ctaTitle}</h2>
          <div style={{ color: blue, fontSize: 29, fontWeight: 700, marginBottom: 20 }}>{t.ctaBlue}</div>
          <p style={{ color: '#666', fontSize: 14, lineHeight: 1.8, marginBottom: 30, maxWidth: 360 }}>{t.ctaDesc}</p>
          <a href="#" style={{ display: 'inline-block', background: blue, color: '#fff', fontWeight: 700, fontSize: 12, letterSpacing: 1.5, padding: '14px 28px', borderRadius: 4, textDecoration: 'none', width: 'fit-content' }}>
            {t.ctaBtn}
          </a>
        </div>
      </section>

      {/* ══ FOOTER ═══════════════════════════════════════════════════════════════ */}
      <footer style={{ background: '#f5f7fa', borderTop: '1px solid #e5e8ed', padding: '52px 40px 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, marginBottom: 36 }}>

          {/* Newsletter */}
          <div>
            <p style={{ fontSize: 15, color: '#333', marginBottom: 16 }}>{t.footerSub}</p>
            <div style={{ display: 'flex', maxWidth: 380, marginBottom: 24 }}>
              <input type="email" placeholder={t.emailPlaceholder} value={email} onChange={e => setEmail(e.target.value)}
                style={{ flex: 1, border: '1px solid #ddd', borderRight: 'none', borderRadius: '4px 0 0 4px', padding: '10px 14px', fontSize: 14, outline: 'none', color: '#555' }} />
              <button style={{ background: blue, color: '#fff', border: 'none', borderRadius: '0 4px 4px 0', padding: '10px 16px', fontWeight: 700, fontSize: 12, cursor: 'pointer', letterSpacing: 1 }}>
                {t.subscribe}
              </button>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              {[{ I: Facebook, bg: '#1877F2' }, { I: Twitter, bg: '#1DA1F2' }, { I: Linkedin, bg: '#0A66C2' }].map(({ I, bg }, i) => (
                <a key={i} href="#" style={{ width: 38, height: 38, borderRadius: '50%', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', textDecoration: 'none' }}>
                  <I size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* Menu */}
          <div>
            {t.menuLinks.map(item => (
              <div key={item} style={{ marginBottom: 14 }}>
                <a href="#" style={{ color: '#333', textDecoration: 'none', fontSize: 15, fontWeight: 500 }}>{item}</a>
              </div>
            ))}
          </div>

          {/* Language */}
          <div>
            <div style={{ marginBottom: 14, fontSize: 12, color: '#aaa', fontWeight: 700, letterSpacing: 1 }}>{t.language}</div>
            {['EN', 'ES'].map(l => (
              <div key={l} style={{ marginBottom: 12 }}>
                <button onClick={() => { setLang(l); setCategory('All'); }}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: lang === l ? blue : '#666', fontWeight: lang === l ? 700 : 400, padding: 0, textAlign: 'left' }}>
                  {l === 'EN' ? '🇬🇧 English' : '🇦🇷 Español'}
                </button>
              </div>
            ))}
          </div>

          {/* Legal */}
          <div>
            {t.legalLinks.map(item => (
              <div key={item} style={{ marginBottom: 14 }}>
                <a href="#" style={{ color: '#666', textDecoration: 'none', fontSize: 14 }}>{item}</a>
              </div>
            ))}
          </div>
        </div>

        <div style={{ borderTop: '1px solid #e0e3e8', paddingTop: 22, textAlign: 'center', color: '#bbb', fontSize: 13 }}>
          © {new Date().getFullYear()} AGRIMARKET. {t.copyright}
        </div>
      </footer>

      <style>{`
        * { box-sizing: border-box; }
        a { transition: opacity 0.15s; }
        a:hover { opacity: 0.8; }
        @media (max-width: 900px) {
          nav { display: none !important; }
        }
      `}</style>
    </div>
  );
}
