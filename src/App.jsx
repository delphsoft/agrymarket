import React, { useState } from 'react';
import {
  Search, MapPin, Clock, TrendingUp, ShoppingCart, User, Menu, X,
  Plus, Edit, Trash2, ChevronRight, Star, Package, Truck, Shield,
  DollarSign, Filter, CheckCircle, AlertCircle, Users, FileText,
  MessageSquare, Settings, BarChart3, Building2, ChevronDown, ArrowRight,
  Leaf, Globe, Award, Bell, LogOut, Eye, Download, RefreshCw
} from 'lucide-react';

// ─── DATA ─────────────────────────────────────────────────────────────────────
const initialProducts = [
  {
    id: 1,
    name: 'Maíz Amarillo 100% Limpio',
    category: 'Cereales',
    price: 1100,
    maxPrice: 1800,
    unit: 'por tonelada',
    image: 'https://images.unsplash.com/photo-1603086413587-0b938afa1726?w=800&h=600&fit=crop',
    description: 'Maíz amarillo 100% limpio, apto para consumo y exportación.',
    location: 'Córdoba, Argentina',
    company: 'AgroSur S.A.',
    priceType: 'fixed',
    stock: 1000,
    volume: '50 - 1000 tn',
    deliveryFrom: 'Inmediato',
    origin: 'Argentina',
    grade: 'Grado 1',
    certification: 'No-GMO',
    addedDate: new Date('2025-01-15'),
  },
  {
    id: 2,
    name: 'Soja Premium',
    category: 'Oleaginosas',
    price: 450,
    maxPrice: 520,
    unit: 'por tonelada',
    image: 'https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?w=800&h=600&fit=crop',
    description: 'Soja de primera calidad, alto contenido proteico.',
    location: 'Santa Fe, Argentina',
    company: 'PampaSoja Ltda.',
    priceType: 'negotiable',
    stock: 500,
    volume: '20 - 500 tn',
    deliveryFrom: 'Inmediato',
    origin: 'Argentina',
    grade: 'Grado A',
    certification: 'Orgánica',
    addedDate: new Date('2025-02-01'),
  },
  {
    id: 3,
    name: 'Trigo Pan',
    category: 'Cereales',
    price: 320,
    maxPrice: null,
    unit: 'por tonelada',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&h=600&fit=crop',
    description: 'Trigo pan de excelente calidad molinera, bajo porcentaje de impurezas.',
    location: 'Buenos Aires, Argentina',
    company: 'CerealesBA S.R.L.',
    priceType: 'fixed',
    stock: 2000,
    volume: '100 - 2000 tn',
    deliveryFrom: 'Cosecha 2025',
    origin: 'Argentina',
    grade: 'Grado 2',
    certification: 'Convencional',
    addedDate: new Date('2025-01-20'),
  },
  {
    id: 4,
    name: 'Girasol Alto Oleico',
    category: 'Oleaginosas',
    price: 290,
    maxPrice: 340,
    unit: 'por tonelada',
    image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=800&h=600&fit=crop',
    description: 'Girasol alto oleico certificado, ideal para aceites premium.',
    location: 'La Pampa, Argentina',
    company: 'PampaOil S.A.',
    priceType: 'negotiable',
    stock: 800,
    volume: '50 - 800 tn',
    deliveryFrom: 'Marzo 2025',
    origin: 'Argentina',
    grade: 'Alto Oleico',
    certification: 'Non-GMO',
    addedDate: new Date('2025-02-10'),
  },
  {
    id: 5,
    name: 'Cebada Cervecera',
    category: 'Cereales',
    price: 280,
    maxPrice: null,
    unit: 'por tonelada',
    image: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=800&h=600&fit=crop',
    description: 'Cebada cervecera de alta calidad maltera, contenido proteico controlado.',
    location: 'Río Negro, Argentina',
    company: 'PatagoniaMalt S.A.',
    priceType: 'fixed',
    stock: 600,
    volume: '30 - 600 tn',
    deliveryFrom: 'Junio 2025',
    origin: 'Argentina',
    grade: 'Maltera',
    certification: 'Convencional',
    addedDate: new Date('2025-01-28'),
  },
  {
    id: 6,
    name: 'Sorgo Granífero',
    category: 'Cereales',
    price: 210,
    maxPrice: 250,
    unit: 'por tonelada',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=600&fit=crop',
    description: 'Sorgo granífero seco, excelente para alimentación animal.',
    location: 'Santiago del Estero, Argentina',
    company: 'NOA Granos S.R.L.',
    priceType: 'negotiable',
    stock: 1500,
    volume: '100 - 1500 tn',
    deliveryFrom: 'Inmediato',
    origin: 'Argentina',
    grade: 'Grado 2',
    certification: 'Convencional',
    addedDate: new Date('2025-02-05'),
  },
];

const categories = ['Todos', 'Cereales', 'Oleaginosas', 'Legumbres', 'Forrajes'];
const regions = ['Todas las Regiones', 'Córdoba', 'Santa Fe', 'Buenos Aires', 'La Pampa', 'Río Negro', 'Santiago del Estero'];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const usdToArs = 1250; // tipo de cambio de referencia

const formatPrice = (price, currency) => {
  if (currency === 'ARS') {
    return `$${(price * usdToArs).toLocaleString('es-AR')}`;
  }
  return `USD ${price.toLocaleString('en-US')}`;
};

// ─── LOGO ─────────────────────────────────────────────────────────────────────
const Logo = () => (
  <div className="flex items-center gap-3">
    <div className="relative w-10 h-10">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <path d="M50 10 L40 30 L50 50 L60 30 Z" fill="#9FD356" />
        <path d="M40 30 L30 45 L40 60 L50 50 Z" fill="#6BBF3B" />
        <path d="M60 30 L70 45 L60 60 L50 50 Z" fill="#4A9D2A" />
        <path d="M50 50 C50 50, 30 75, 30 85 Q30 95, 50 95 Q70 95, 70 85 C70 75, 50 50, 50 50" fill="#6BBF3B" />
      </svg>
    </div>
    <div>
      <h1 className="text-2xl font-bold text-white tracking-tight">AGRIMARKET</h1>
      <p className="text-xs text-white opacity-80">Plataforma de Comercio Agrícola</p>
    </div>
  </div>
);

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedRegion, setSelectedRegion] = useState('Todas las Regiones');
  const [currency, setCurrency] = useState('USD');
  const [currentPage, setCurrentPage] = useState('home');
  const [viewProduct, setViewProduct] = useState(null);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentProduct, setPaymentProduct] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [adminForm, setAdminForm] = useState({
    name: '', category: 'Cereales', price: '', maxPrice: '',
    unit: 'por tonelada', description: '', location: '', company: '',
    stock: '', volume: '', origin: 'Argentina', grade: '', certification: '',
    image: '', priceType: 'fixed'
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [notification, setNotification] = useState(null);

  // ── Helpers ──
  const showNotification = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const filteredProducts = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = selectedCategory === 'Todos' || p.category === selectedCategory;
    const matchRegion = selectedRegion === 'Todas las Regiones' || p.location.includes(selectedRegion);
    return matchSearch && matchCategory && matchRegion;
  });

  // ── Admin CRUD ──
  const handleSaveProduct = () => {
    if (!adminForm.name || !adminForm.price) {
      showNotification('Completá al menos nombre y precio.', 'error');
      return;
    }
    if (editingProduct) {
      setProducts(products.map(p =>
        p.id === editingProduct.id
          ? { ...p, ...adminForm, price: parseFloat(adminForm.price), maxPrice: adminForm.maxPrice ? parseFloat(adminForm.maxPrice) : null, addedDate: p.addedDate }
          : p
      ));
      showNotification('Producto actualizado correctamente.');
    } else {
      const newProduct = {
        ...adminForm,
        id: Date.now(),
        price: parseFloat(adminForm.price),
        maxPrice: adminForm.maxPrice ? parseFloat(adminForm.maxPrice) : null,
        addedDate: new Date(),
      };
      setProducts([...products, newProduct]);
      showNotification('Producto publicado correctamente.');
    }
    setAdminForm({ name: '', category: 'Cereales', price: '', maxPrice: '', unit: 'por tonelada', description: '', location: '', company: '', stock: '', volume: '', origin: 'Argentina', grade: '', certification: '', image: '', priceType: 'fixed' });
    setEditingProduct(null);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setAdminForm({ ...product, price: product.price.toString(), maxPrice: product.maxPrice ? product.maxPrice.toString() : '' });
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
    showNotification('Producto eliminado.', 'error');
  };

  const handleBuyNow = (product, method) => {
    setPaymentProduct(product);
    setPaymentMethod(method);
    setShowPayment(true);
  };

  const handleLogin = () => {
    if (loginForm.email && loginForm.password) {
      setIsLoggedIn(true);
      setShowLoginModal(false);
      showNotification('Sesión iniciada correctamente.');
    } else {
      showNotification('Completá email y contraseña.', 'error');
    }
  };

  // ═══════════════════════════════════════════════════════════════════
  // HEADER
  // ═══════════════════════════════════════════════════════════════════
  const Header = () => (
    <header className="bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <button onClick={() => setCurrentPage('home')} className="focus:outline-none">
            <Logo />
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <button onClick={() => setCurrentPage('home')} className="text-white font-medium hover:opacity-80 transition">Inicio</button>
            <button onClick={() => setCurrentPage('products')} className="text-white font-medium hover:opacity-80 transition">Productos</button>
            <button onClick={() => setCurrentPage('howItWorks')} className="text-white font-medium hover:opacity-80 transition">¿Cómo funciona?</button>
            <button onClick={() => setCurrentPage('about')} className="text-white font-medium hover:opacity-80 transition">Nosotros</button>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {/* Currency Toggle */}
            <div className="flex bg-white/20 rounded-full p-1">
              {['USD', 'ARS'].map(c => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-3 py-1 rounded-full text-sm font-bold transition ${currency === c ? 'bg-white text-blue-600' : 'text-white'}`}
                >
                  {c}
                </button>
              ))}
            </div>

            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <button onClick={() => setShowAdminPanel(true)} className="bg-white text-blue-600 px-4 py-2 rounded-full text-sm font-bold hover:bg-blue-50 transition">
                  Panel Admin
                </button>
                <button onClick={() => { setIsLoggedIn(false); showNotification('Sesión cerrada.'); }} className="text-white hover:opacity-80">
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <button onClick={() => setShowLoginModal(true)} className="bg-white text-blue-600 px-4 py-2 rounded-full text-sm font-bold hover:bg-blue-50 transition">
                Ingresar
              </button>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pb-3 border-t border-white/20 pt-3 flex flex-col gap-3">
            {['home', 'products', 'howItWorks', 'about'].map(page => (
              <button key={page} onClick={() => { setCurrentPage(page); setMobileMenuOpen(false); }} className="text-white text-left font-medium">
                {page === 'home' ? 'Inicio' : page === 'products' ? 'Productos' : page === 'howItWorks' ? '¿Cómo funciona?' : 'Nosotros'}
              </button>
            ))}
            <div className="flex gap-2 mt-2">
              {['USD', 'ARS'].map(c => (
                <button key={c} onClick={() => setCurrency(c)} className={`px-3 py-1 rounded-full text-sm font-bold border ${currency === c ? 'bg-white text-blue-600' : 'text-white border-white/50'}`}>{c}</button>
              ))}
            </div>
            {!isLoggedIn && (
              <button onClick={() => { setShowLoginModal(true); setMobileMenuOpen(false); }} className="bg-white text-blue-600 px-4 py-2 rounded-full text-sm font-bold w-fit">
                Ingresar
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );

  // ═══════════════════════════════════════════════════════════════════
  // HOME PAGE
  // ═══════════════════════════════════════════════════════════════════
  const HomePage = () => (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            El mercado de <span className="text-green-300">granos y cereales</span> de Argentina
          </h2>
          <p className="text-lg md:text-xl opacity-90 mb-8">
            Conectamos productores, acopiadores y compradores en una plataforma segura y transparente.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setCurrentPage('products')} className="bg-green-400 hover:bg-green-300 text-green-900 font-bold px-8 py-3 rounded-full text-lg transition flex items-center gap-2 justify-center">
              Ver Productos <ArrowRight size={20} />
            </button>
            <button onClick={() => setShowLoginModal(true)} className="bg-white/20 hover:bg-white/30 border border-white text-white font-bold px-8 py-3 rounded-full text-lg transition">
              Publicar Producto
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-12 px-4 border-b">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { label: 'Productos publicados', value: products.length, icon: Package, color: 'blue' },
            { label: 'Empresas registradas', value: '120+', icon: Building2, color: 'green' },
            { label: 'Toneladas operadas', value: '50.000+', icon: TrendingUp, color: 'cyan' },
            { label: 'Provincias activas', value: '18', icon: MapPin, color: 'blue' },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className={`w-14 h-14 rounded-full bg-${stat.color}-100 flex items-center justify-center mb-3`}>
                <stat.icon size={26} className={`text-${stat.color}-600`} />
              </div>
              <p className="text-3xl font-extrabold text-gray-800">{stat.value}</p>
              <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800">Productos Destacados</h3>
            <button onClick={() => setCurrentPage('products')} className="text-blue-600 font-semibold flex items-center gap-1 hover:underline">
              Ver todos <ChevronRight size={18} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.slice(0, 3).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* How it works CTA */}
      <section className="bg-gradient-to-r from-green-500 to-cyan-500 py-14 px-4 text-white text-center">
        <h3 className="text-3xl font-bold mb-3">¿Sos productor o acopiador?</h3>
        <p className="text-lg opacity-90 mb-6">Publicá tus productos gratis y llegá a compradores de todo el país.</p>
        <button onClick={() => isLoggedIn ? setShowAdminPanel(true) : setShowLoginModal(true)} className="bg-white text-green-700 font-bold px-8 py-3 rounded-full text-lg hover:bg-green-50 transition">
          Empezar ahora →
        </button>
      </section>
    </div>
  );

  // ═══════════════════════════════════════════════════════════════════
  // PRODUCT CARD
  // ═══════════════════════════════════════════════════════════════════
  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-100 flex flex-col">
      <div className="relative h-48 overflow-hidden">
        {product.image ? (
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
            <Leaf size={48} className="text-green-400" />
          </div>
        )}
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-xs font-bold text-blue-700 px-3 py-1 rounded-full shadow">
          {product.category}
        </span>
        <span className={`absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full shadow ${product.priceType === 'fixed' ? 'bg-green-500 text-white' : 'bg-yellow-400 text-yellow-900'}`}>
          {product.priceType === 'fixed' ? 'Precio fijo' : 'Negociable'}
        </span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-gray-800 text-lg mb-1">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-3 flex items-center gap-1">
          <MapPin size={13} /> {product.location}
        </p>
        <p className="text-blue-600 font-extrabold text-xl mb-1">
          {formatPrice(product.price, currency)}
          {product.maxPrice ? ` - ${formatPrice(product.maxPrice, currency)}` : ''}
        </p>
        <p className="text-gray-400 text-xs mb-4">{product.unit} • Stock: {product.stock} tn</p>
        <div className="mt-auto flex gap-2">
          <button
            onClick={() => { setViewProduct(product); setCurrentPage('productDetail'); }}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-xl transition text-sm"
          >
            Ver detalle
          </button>
          <button
            onClick={() => handleBuyNow(product, 'MercadoPago')}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-xl transition text-sm"
          >
            Comprar
          </button>
        </div>
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════════════════
  // PRODUCTS PAGE
  // ═══════════════════════════════════════════════════════════════════
  const ProductsPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Marketplace</h2>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow p-4 mb-8 flex flex-wrap gap-4 items-center">
        <div className="flex-1 min-w-[200px] relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar producto o empresa..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
          />
        </div>
        <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className="border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300">
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>
        <select value={selectedRegion} onChange={e => setSelectedRegion(e.target.value)} className="border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300">
          {regions.map(r => <option key={r}>{r}</option>)}
        </select>
        <span className="text-gray-500 text-sm">{filteredProducts.length} resultado{filteredProducts.length !== 1 ? 's' : ''}</span>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <Package size={48} className="mx-auto mb-4 opacity-40" />
          <p className="text-lg">No se encontraron productos.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );

  // ═══════════════════════════════════════════════════════════════════
  // PRODUCT DETAIL
  // ═══════════════════════════════════════════════════════════════════
  const ProductDetailPage = () => {
    if (!viewProduct) return null;
    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <button onClick={() => setCurrentPage('products')} className="flex items-center gap-2 text-blue-600 font-semibold mb-6 hover:underline">
          ← Volver al marketplace
        </button>
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              {viewProduct.image ? (
                <img src={viewProduct.image} alt={viewProduct.name} className="w-full h-72 md:h-full object-cover" />
              ) : (
                <div className="w-full h-72 bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                  <Leaf size={64} className="text-green-400" />
                </div>
              )}
            </div>
            <div className="md:w-1/2 p-8 flex flex-col gap-4">
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full w-fit">{viewProduct.category}</span>
              <h2 className="text-2xl font-extrabold text-gray-800">{viewProduct.name}</h2>
              <p className="text-3xl font-extrabold text-blue-600">
                {formatPrice(viewProduct.price, currency)}
                {viewProduct.maxPrice ? ` - ${formatPrice(viewProduct.maxPrice, currency)}` : ''}
              </p>
              <p className="text-gray-500 text-sm">{viewProduct.unit}</p>

              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  { label: 'Empresa', value: viewProduct.company },
                  { label: 'Ubicación', value: viewProduct.location },
                  { label: 'Origen', value: viewProduct.origin },
                  { label: 'Grado', value: viewProduct.grade },
                  { label: 'Certificación', value: viewProduct.certification },
                  { label: 'Stock', value: `${viewProduct.stock} tn` },
                  { label: 'Volumen mín/máx', value: viewProduct.volume },
                  { label: 'Disponibilidad', value: viewProduct.deliveryFrom },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-gray-400 font-medium">{label}</p>
                    <p className="text-gray-700 font-semibold">{value}</p>
                  </div>
                ))}
              </div>

              <p className="text-gray-600 text-sm mt-2">{viewProduct.description}</p>

              <div className="flex gap-3 mt-4">
                <button onClick={() => handleBuyNow(viewProduct, 'MercadoPago')} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2">
                  <ShoppingCart size={18} /> Pagar con MercadoPago
                </button>
                <button onClick={() => handleBuyNow(viewProduct, 'Transferencia')} className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition">
                  Transferencia Bancaria
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════════════
  // HOW IT WORKS PAGE
  // ═══════════════════════════════════════════════════════════════════
  const HowItWorksPage = () => (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">¿Cómo funciona AGRIMARKET?</h2>
      <p className="text-gray-500 text-center mb-12">Un proceso simple, transparente y seguro.</p>
      <div className="space-y-8">
        {[
          { step: '01', title: 'Registrate', desc: 'Creá tu cuenta como productor, acopiador o comprador. Es gratis y lleva menos de 2 minutos.', icon: User },
          { step: '02', title: 'Publicá o buscá', desc: 'Los vendedores publican sus productos con precio, origen y condiciones. Los compradores buscan con filtros por categoría y región.', icon: Search },
          { step: '03', title: 'Conectate y negociá', desc: 'Contactá directamente al vendedor o comprá al precio publicado. Podés negociar condiciones por mensaje interno.', icon: MessageSquare },
          { step: '04', title: 'Pagá de forma segura', desc: 'Usá MercadoPago para pagos online o coordiná una transferencia bancaria. La operación queda registrada.', icon: Shield },
          { step: '05', title: 'Recibí tu mercadería', desc: 'El vendedor coordina la logística. Podés calificar la operación y dejar reseña.', icon: Truck },
        ].map(({ step, title, desc, icon: Icon }) => (
          <div key={step} className="flex gap-6 items-start bg-white rounded-2xl shadow p-6 border border-gray-100">
            <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center shadow">
              <Icon size={26} className="text-white" />
            </div>
            <div>
              <p className="text-xs font-bold text-blue-400 mb-1">PASO {step}</p>
              <h3 className="text-lg font-bold text-gray-800 mb-1">{title}</h3>
              <p className="text-gray-500 text-sm">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════════════════
  // ABOUT PAGE
  // ═══════════════════════════════════════════════════════════════════
  const AboutPage = () => (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <Logo />
        <p className="mt-4 text-gray-500 text-lg max-w-xl mx-auto">
          Somos una plataforma argentina especializada en el comercio de granos, cereales y oleaginosas, conectando a todos los actores de la cadena agroindustrial.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {[
          { icon: Globe, title: 'Presencia Nacional', desc: 'Operamos en las principales regiones productoras de Argentina.' },
          { icon: Award, title: 'Transparencia', desc: 'Precios públicos, operaciones registradas y calificaciones verificadas.' },
          { icon: Shield, title: 'Seguridad', desc: 'Pagos protegidos a través de MercadoPago y transferencias bancarias auditadas.' },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="bg-white rounded-2xl shadow p-6 text-center border border-gray-100">
            <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Icon size={26} className="text-white" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">{title}</h3>
            <p className="text-gray-500 text-sm">{desc}</p>
          </div>
        ))}
      </div>
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-8 text-white text-center">
        <h3 className="text-2xl font-bold mb-2">¿Querés ser parte de AGRIMARKET?</h3>
        <p className="opacity-90 mb-6">Registrate gratis y empezá a operar hoy mismo.</p>
        <button onClick={() => setShowLoginModal(true)} className="bg-white text-blue-700 font-bold px-8 py-3 rounded-full text-lg hover:bg-blue-50 transition">
          Crear cuenta gratis
        </button>
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════════════════
  // ADMIN PANEL
  // ═══════════════════════════════════════════════════════════════════
  const AdminPanel = () => (
    <div className="fixed inset-0 bg-gray-900 z-50 overflow-y-auto">
      <div className="min-h-screen">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-6">
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            <div>
              <h2 className="text-2xl font-bold text-white">Panel de Administración</h2>
              <p className="text-white/70 text-sm">Gestión de productos y operaciones</p>
            </div>
            <button onClick={() => setShowAdminPanel(false)} className="p-2 bg-white rounded-xl hover:bg-gray-100">
              <X size={22} />
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-6">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Productos', value: products.length, icon: Package, color: 'blue' },
              { label: 'Categorías', value: new Set(products.map(p => p.category)).size, icon: Filter, color: 'green' },
              { label: 'Stock total (tn)', value: products.reduce((a, b) => a + (b.stock || 0), 0).toLocaleString(), icon: TrendingUp, color: 'cyan' },
              { label: 'Empresas', value: new Set(products.map(p => p.company)).size, icon: Building2, color: 'purple' },
            ].map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="bg-white rounded-2xl shadow p-5 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl bg-${color}-100 flex items-center justify-center`}>
                  <Icon size={22} className={`text-${color}-600`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">{value}</p>
                  <p className="text-gray-400 text-xs">{label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Form */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="font-bold text-gray-800 text-lg mb-4">
                {editingProduct ? '✏️ Editar Producto' : '➕ Nuevo Producto'}
              </h3>
              <div className="space-y-3">
                {[
                  { label: 'Nombre del producto', key: 'name', type: 'text' },
                  { label: 'Empresa/Productor', key: 'company', type: 'text' },
                  { label: 'Ubicación', key: 'location', type: 'text' },
                  { label: 'Precio USD (mín)', key: 'price', type: 'number' },
                  { label: 'Precio USD (máx, opcional)', key: 'maxPrice', type: 'number' },
                  { label: 'Stock (toneladas)', key: 'stock', type: 'number' },
                  { label: 'Volumen mín/máx', key: 'volume', type: 'text' },
                  { label: 'Grado / Calidad', key: 'grade', type: 'text' },
                  { label: 'Certificación', key: 'certification', type: 'text' },
                  { label: 'URL de imagen', key: 'image', type: 'text' },
                ].map(({ label, key, type }) => (
                  <div key={key}>
                    <label className="text-xs font-semibold text-gray-500 block mb-1">{label}</label>
                    <input
                      type={type}
                      value={adminForm[key]}
                      onChange={e => setAdminForm({ ...adminForm, [key]: e.target.value })}
                      className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                  </div>
                ))}
                <div>
                  <label className="text-xs font-semibold text-gray-500 block mb-1">Categoría</label>
                  <select value={adminForm.category} onChange={e => setAdminForm({ ...adminForm, category: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300">
                    {categories.filter(c => c !== 'Todos').map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 block mb-1">Tipo de precio</label>
                  <select value={adminForm.priceType} onChange={e => setAdminForm({ ...adminForm, priceType: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300">
                    <option value="fixed">Precio fijo</option>
                    <option value="negotiable">Negociable</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 block mb-1">Descripción</label>
                  <textarea
                    value={adminForm.description}
                    onChange={e => setAdminForm({ ...adminForm, description: e.target.value })}
                    rows={3}
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button onClick={handleSaveProduct} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-xl transition">
                    {editingProduct ? 'Actualizar' : 'Publicar'}
                  </button>
                  {editingProduct && (
                    <button onClick={() => { setEditingProduct(null); setAdminForm({ name: '', category: 'Cereales', price: '', maxPrice: '', unit: 'por tonelada', description: '', location: '', company: '', stock: '', volume: '', origin: 'Argentina', grade: '', certification: '', image: '', priceType: 'fixed' }); }} className="px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 rounded-xl transition">
                      Cancelar
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Products List */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="font-bold text-gray-800 text-lg mb-4">Productos publicados ({products.length})</h3>
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                {products.map(product => (
                  <div key={product.id} className="flex items-center gap-3 p-3 border rounded-xl hover:bg-gray-50 transition">
                    <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center"><Leaf size={20} className="text-green-400" /></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-800 text-sm truncate">{product.name}</p>
                      <p className="text-blue-600 text-xs font-bold">
                        {formatPrice(product.price, currency)}{product.maxPrice ? ` - ${formatPrice(product.maxPrice, currency)}` : ''}
                      </p>
                      <p className="text-gray-400 text-xs">{product.location}</p>
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      <button onClick={() => handleEditProduct(product)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                        <Edit size={16} />
                      </button>
                      <button onClick={() => handleDeleteProduct(product.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════════════════
  // PAYMENT MODAL
  // ═══════════════════════════════════════════════════════════════════
  const PaymentModal = () => {
    if (!showPayment || !paymentProduct) return null;
    return (
      <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800">Confirmar compra</h3>
            <button onClick={() => setShowPayment(false)} className="text-gray-400 hover:text-gray-600">
              <X size={22} />
            </button>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <p className="font-bold text-gray-800">{paymentProduct.name}</p>
            <p className="text-blue-600 font-extrabold text-xl mt-1">
              {formatPrice(paymentProduct.price, currency)}
              {paymentProduct.maxPrice ? ` - ${formatPrice(paymentProduct.maxPrice, currency)}` : ''}
            </p>
            <p className="text-gray-500 text-sm">{paymentProduct.unit}</p>
          </div>
          <p className="text-sm text-gray-600 mb-4">Método seleccionado: <strong className="text-blue-600">{paymentMethod}</strong></p>

          {paymentMethod === 'MercadoPago' ? (
            <div className="space-y-3">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-700">
                <p className="font-bold mb-1">💳 MercadoPago</p>
                <p>Serás redirigido a la plataforma de pago seguro de MercadoPago para completar la transacción.</p>
              </div>
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition">
                Pagar con MercadoPago →
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-700">
                <p className="font-bold mb-2">🏦 Transferencia Bancaria</p>
                <p><strong>Banco:</strong> Banco Galicia</p>
                <p><strong>CBU:</strong> 0070999820000001234567</p>
                <p><strong>Alias:</strong> AGRIMARKET.VENTAS</p>
                <p><strong>Titular:</strong> AGRIMARKET S.A.</p>
                <p><strong>CUIT:</strong> 30-12345678-9</p>
              </div>
              <button onClick={() => { setShowPayment(false); showNotification('¡Datos bancarios copiados! Completá la transferencia.'); }} className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition">
                Copiar datos y confirmar
              </button>
            </div>
          )}

          <button onClick={() => { setShowPayment(false); setPaymentMethod(paymentMethod === 'MercadoPago' ? 'Transferencia' : 'MercadoPago'); setTimeout(() => setShowPayment(true), 100); }} className="w-full mt-3 text-gray-500 hover:text-gray-700 text-sm underline">
            Cambiar a {paymentMethod === 'MercadoPago' ? 'Transferencia Bancaria' : 'MercadoPago'}
          </button>
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════════════
  // LOGIN MODAL
  // ═══════════════════════════════════════════════════════════════════
  const LoginModal = () => (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">Ingresar a AGRIMARKET</h3>
          <button onClick={() => setShowLoginModal(false)} className="text-gray-400 hover:text-gray-600"><X size={22} /></button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-gray-600 block mb-1">Email</label>
            <input type="email" value={loginForm.email} onChange={e => setLoginForm({ ...loginForm, email: e.target.value })} placeholder="tu@email.com" className="w-full border rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-600 block mb-1">Contraseña</label>
            <input type="password" value={loginForm.password} onChange={e => setLoginForm({ ...loginForm, password: e.target.value })} placeholder="••••••••" className="w-full border rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" />
          </div>
          <button onClick={handleLogin} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition mt-2">
            Ingresar
          </button>
          <p className="text-center text-xs text-gray-400">Demo: cualquier email y contraseña funciona.</p>
        </div>
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════════════════
  // FOOTER
  // ═══════════════════════════════════════════════════════════════════
  const Footer = () => (
    <footer className="bg-gray-800 text-white py-10 px-4 mt-auto">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        <div>
          <Logo />
          <p className="text-gray-400 text-sm mt-3">Plataforma de comercio agrícola para Argentina. Conectamos productores y compradores en todo el país.</p>
        </div>
        <div>
          <h4 className="font-bold mb-3 text-gray-200">Links</h4>
          <div className="space-y-2 text-gray-400 text-sm">
            {[['Inicio', 'home'], ['Productos', 'products'], ['¿Cómo funciona?', 'howItWorks'], ['Nosotros', 'about']].map(([label, page]) => (
              <button key={page} onClick={() => setCurrentPage(page)} className="block hover:text-white transition">{label}</button>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-bold mb-3 text-gray-200">Contacto</h4>
          <div className="text-gray-400 text-sm space-y-1">
            <p>info@agrimarket.com.ar</p>
            <p>+54 9 11 1234-5678</p>
            <p>Buenos Aires, Argentina</p>
            <p className="mt-3 text-xs text-gray-500">© {new Date().getFullYear()} AGRIMARKET. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );

  // ═══════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-[60] flex items-center gap-3 px-5 py-3 rounded-2xl shadow-lg text-white font-semibold text-sm transition-all ${notification.type === 'error' ? 'bg-red-500' : 'bg-green-500'}`}>
          {notification.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle size={18} />}
          {notification.msg}
        </div>
      )}

      <Header />

      <main className="flex-1">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'products' && <ProductsPage />}
        {currentPage === 'productDetail' && <ProductDetailPage />}
        {currentPage === 'howItWorks' && <HowItWorksPage />}
        {currentPage === 'about' && <AboutPage />}
      </main>

      <Footer />

      {showAdminPanel && <AdminPanel />}
      {showPayment && <PaymentModal />}
      {showLoginModal && <LoginModal />}
    </div>
  );
}
