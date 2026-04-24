import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Clock, 
  TrendingUp, 
  ShoppingCart, 
  User, 
  Menu, 
  X, 
  Plus, 
  Edit, 
  Trash2, 
  ChevronRight, 
  Star, 
  Package, 
  Truck, 
  Shield, 
  DollarSign, 
  Filter, 
  CheckCircle, 
  AlertCircle, 
  Users, 
  FileText, 
  MessageSquare, 
  Settings, 
  BarChart3, 
  Building2 
} from 'lucide-react';

// Sample initial data - Argentina Market Focus
const initialProducts = [
  {
    id: 1,
    name: 'Soja Argentina - Premium Grade',
    category: 'Grains',
    price: 320000,
    maxPrice: 380000,
    unit: 'por tonelada',
    image: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=800&h=600&fit=crop',
    description: 'Soja de alta calidad, grado premium, origen Buenos Aires',
    location: 'Buenos Aires, Argentina',
    company: 'Agropecuaria Las Pampas',
    priceType: 'fixed',
    stock: 5000,
    volume: '100-5000',
    deliveryFrom: 'Marzo 2025',
    origin: 'Buenos Aires, Argentina',
    grade: 'Premium',
    certification: 'Non-GMO',
    addedDate: new Date('2024-12-20')
  },
  {
    id: 2,
    name: 'Maíz Amarillo - Zona Núcleo',
    category: 'Grains',
    price: 180000,
    currentBid: 180000,
    unit: 'por tonelada',
    image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=800&h=600&fit=crop',
    description: 'Maíz amarillo premium, zona núcleo, excelente calidad',
    location: 'Córdoba, Argentina',
    company: 'Cereales del Centro SA',
    priceType: 'auction',
    stock: 3000,
    volume: '50-3000',
    deliveryFrom: 'Abril 2025',
    origin: 'Córdoba, Argentina',
    grade: 'Grade A',
    certification: 'SENASA',
    bids: 12,
    addedDate: new Date('2024-12-22')
  },
  {
    id: 3,
    name: 'Trigo Pan - Alta Proteína',
    category: 'Grains',
    price: 250000,
    maxPrice: 290000,
    unit: 'por tonelada',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&h=600&fit=crop',
    description: 'Trigo pan con alto contenido proteico, ideal molienda',
    location: 'Santa Fe, Argentina',
    company: 'Molinos Santa Fe',
    priceType: 'fixed',
    stock: 2000,
    volume: '75-2000',
    deliveryFrom: 'Febrero 2025',
    origin: 'Santa Fe, Argentina',
    grade: 'Grade 1',
    certification: 'Orgánico',
    addedDate: new Date('2024-12-23')
  },
  {
    id: 4,
    name: 'Girasol Alto Oleico',
    category: 'Seeds',
    price: 420000,
    currentBid: 420000,
    maxPrice: 480000,
    unit: 'por tonelada',
    image: 'https://images.unsplash.com/photo-1597306691225-b0f7ff4e1c0d?w=800&h=600&fit=crop',
    description: 'Girasol alto oleico, excelente para aceite premium',
    location: 'La Pampa, Argentina',
    company: 'Oleaginosas del Sur',
    priceType: 'auction',
    stock: 1500,
    volume: '30-1500',
    deliveryFrom: 'Mayo 2025',
    origin: 'La Pampa, Argentina',
    grade: 'Premium',
    certification: 'Alto Oleico',
    bids: 8,
    addedDate: new Date('2024-12-24')
  },
  {
    id: 5,
    name: 'Cebada Cervecera',
    category: 'Grains',
    price: 200000,
    maxPrice: 240000,
    unit: 'por tonelada',
    image: 'https://images.unsplash.com/photo-1595855759920-86118b7c1b8a?w=800&h=600&fit=crop',
    description: 'Cebada cervecera de primera calidad',
    location: 'Entre Ríos, Argentina',
    company: 'Malterías Argentinas',
    priceType: 'fixed',
    stock: 800,
    volume: '40-800',
    deliveryFrom: 'Abril 2025',
    origin: 'Entre Ríos, Argentina',
    grade: 'Grade 1',
    certification: 'Maltería',
    addedDate: new Date('2024-12-25')
  },
  {
    id: 6,
    name: 'Sorgo Granífero',
    category: 'Grains',
    price: 160000,
    currentBid: 160000,
    unit: 'por tonelada',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&h=600&fit=crop',
    description: 'Sorgo granífero para exportación y consumo',
    location: 'Santiago del Estero, Argentina',
    company: 'Granos del Norte',
    priceType: 'auction',
    stock: 2500,
    volume: '100-2500',
    deliveryFrom: 'Junio 2025',
    origin: 'Santiago del Estero, Argentina',
    grade: 'Grade 2',
    certification: 'Estándar',
    bids: 5,
    addedDate: new Date('2024-12-26')
  },
  {
    id: 7,
    name: 'Poroto de Soja Orgánico',
    category: 'Legumes',
    price: 450000,
    maxPrice: 520000,
    unit: 'por tonelada',
    image: 'https://images.unsplash.com/photo-1589927986089-35812378ab59?w=800&h=600&fit=crop',
    description: 'Soja orgánica certificada, libre de transgénicos',
    location: 'Tucumán, Argentina',
    company: 'Orgánicos del NOA',
    priceType: 'fixed',
    stock: 600,
    volume: '20-600',
    deliveryFrom: 'Marzo 2025',
    origin: 'Tucumán, Argentina',
    grade: 'Premium',
    certification: 'Orgánico Certificado',
    addedDate: new Date('2024-12-27')
  },
  {
    id: 8,
    name: 'Lenteja Argentina',
    category: 'Legumes',
    price: 380000,
    currentBid: 380000,
    maxPrice: 430000,
    unit: 'por tonelada',
    image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=800&h=600&fit=crop',
    description: 'Lentejas de alta calidad para exportación',
    location: 'Mendoza, Argentina',
    company: 'Legumbres Cuyo',
    priceType: 'auction',
    stock: 400,
    volume: '15-400',
    deliveryFrom: 'Febrero 2025',
    origin: 'Mendoza, Argentina',
    grade: 'Grade A',
    certification: 'Premium',
    bids: 15,
    addedDate: new Date('2024-12-28')
  },
  {
    id: 9,
    name: 'Garbanzo Tipo Kabuli',
    category: 'Legumes',
    price: 420000,
    maxPrice: 480000,
    unit: 'por tonelada',
    image: 'https://images.unsplash.com/photo-1589927986089-35812378ab59?w=800&h=600&fit=crop',
    description: 'Garbanzo tipo Kabuli, calibre grande, exportación',
    location: 'Salta, Argentina',
    company: 'Agroexport Salta',
    priceType: 'fixed',
    stock: 350,
    volume: '10-350',
    deliveryFrom: 'Mayo 2025',
    origin: 'Salta, Argentina',
    grade: 'Premium',
    certification: 'Tipo Kabuli',
    addedDate: new Date('2024-12-29')
  },
  {
    id: 10,
    name: 'Maní Confitería',
    category: 'Legumes',
    price: 550000,
    currentBid: 550000,
    unit: 'por tonelada',
    image: 'https://images.unsplash.com/photo-1589927986089-35812378ab59?w=800&h=600&fit=crop',
    description: 'Maní tipo confitería, calibre grande, sin aflatoxinas',
    location: 'Córdoba, Argentina',
    company: 'Maní Premium SRL',
    priceType: 'auction',
    stock: 800,
    volume: '25-800',
    deliveryFrom: 'Abril 2025',
    origin: 'Córdoba, Argentina',
    grade: 'Premium',
    certification: 'Confitería',
    bids: 20,
    addedDate: new Date('2024-12-30')
  },
  {
    id: 11,
    name: 'Avena Forrajera',
    category: 'Grains',
    price: 140000,
    maxPrice: 170000,
    unit: 'por tonelada',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&h=600&fit=crop',
    description: 'Avena para forraje y consumo animal',
    location: 'Buenos Aires, Argentina',
    company: 'Forrajes del Sur',
    priceType: 'fixed',
    stock: 1200,
    volume: '50-1200',
    deliveryFrom: 'Marzo 2025',
    origin: 'Buenos Aires, Argentina',
    grade: 'Grade 2',
    certification: 'Forrajera',
    addedDate: new Date('2024-12-31')
  },
  {
    id: 12,
    name: 'Colza - Canola Argentina',
    category: 'Seeds',
    price: 380000,
    currentBid: 380000,
    maxPrice: 440000,
    unit: 'por tonelada',
    image: 'https://images.unsplash.com/photo-1597306691225-b0f7ff4e1c0d?w=800&h=600&fit=crop',
    description: 'Canola argentina para aceite, bajo contenido de ácido erúcico',
    location: 'Río Negro, Argentina',
    company: 'Oleaginosas Patagonia',
    priceType: 'auction',
    stock: 500,
    volume: '20-500',
    deliveryFrom: 'Junio 2025',
    origin: 'Río Negro, Argentina',
    grade: 'Grade 1',
    certification: 'Canola',
    bids: 7,
    addedDate: new Date('2025-01-01')
  }
];

const AgroMarketplace = () => {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [userRole, setUserRole] = useState('buyer');
  const [activeTab, setActiveTab] = useState('buy');
  const [showMenu, setShowMenu] = useState(false);
  const [showProductPage, setShowProductPage] = useState(false);
  const [viewProduct, setViewProduct] = useState(null);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [currency, setCurrency] = useState('ARS');
  
  const exchangeRate = 850;

  const categories = ['all', 'Grains', 'Legumes', 'Seeds', 'Oils', 'Cereals'];

  const regions = [
    'Buenos Aires',
    'Córdoba', 
    'Santa Fe',
    'La Pampa',
    'Entre Ríos',
    'Santiago del Estero',
    'Tucumán',
    'Mendoza',
    'Salta',
    'Río Negro'
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => b.addedDate - a.addedDate);

  const handleBid = (productId) => {
    const product = products.find(p => p.id === productId);
    if (product && product.priceType === 'auction') {
      const bidAmount = prompt(`Current bid: $${product.currentBid}. Enter your bid:`);
      if (bidAmount && parseFloat(bidAmount) > product.currentBid) {
        setProducts(products.map(p => 
          p.id === productId 
            ? { ...p, currentBid: parseFloat(bidAmount), bids: p.bids + 1 }
            : p
        ));
        alert('Bid placed successfully!');
      }
    }
  };

  const handlePayment = (product, method) => {
    setPaymentMethod(method);
    setShowPayment(true);
    alert(`Payment initiated via ${method} for ${product.name}`);
  };

  const handleViewProduct = (product) => {
    setViewProduct(product);
    setShowProductPage(true);
  };

  const formatPrice = (priceARS) => {
    if (currency === 'USD') {
      const priceUSD = priceARS / exchangeRate;
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(priceUSD);
    } else {
      return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(priceARS);
    }
  };

  const handleDeleteProduct = (productId) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  const Logo = () => (
    <div className="flex items-center gap-3">
      <div className="relative w-12 h-12 bg-white rounded-xl p-2 shadow-md">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M50 85 L50 40" stroke="#2D5016" strokeWidth="4" fill="none" />
          <ellipse cx="35" cy="45" rx="12" ry="8" fill="#9FD356" transform="rotate(-30 35 45)" />
          <ellipse cx="30" cy="55" rx="14" ry="9" fill="#7BC043" transform="rotate(-35 30 55)" />
          <ellipse cx="28" cy="68" rx="15" ry="10" fill="#6BBF3B" transform="rotate(-40 28 68)" />
          <ellipse cx="65" cy="45" rx="12" ry="8" fill="#7BC043" transform="rotate(30 65 45)" />
          <ellipse cx="70" cy="55" rx="14" ry="9" fill="#6BBF3B" transform="rotate(35 70 55)" />
          <ellipse cx="72" cy="68" rx="15" ry="10" fill="#4A9D2A" transform="rotate(40 72 68)" />
          <ellipse cx="50" cy="35" rx="8" ry="12" fill="#9FD356" />
          <path d="M45 85 Q40 90, 35 88 M55 85 Q60 90, 65 88" stroke="#2D5016" strokeWidth="3" fill="none" />
        </svg>
      </div>
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">AGRIMARKET</h1>
        <p className="text-xs text-white opacity-90">Plataforma de Comercio Agrícola</p>
      </div>
    </div>
  );

  const AdminPanel = () => (
    <div className="fixed inset-0 bg-gray-900 z-50 overflow-y-auto">
      <div className="min-h-screen">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-white">Admin Dashboard</h2>
            <button onClick={() => setShowAdminPanel(false)} className="p-2 bg-white rounded-lg hover:bg-gray-100">
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Users</p>
                  <p className="text-3xl font-bold text-gray-900">1,234</p>
                </div>
                <Users className="text-blue-500" size={40} />
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Active Products</p>
                  <p className="text-3xl font-bold text-gray-900">567</p>
                </div>
                <Package className="text-green-500" size={40} />
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-orange-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Pending Verification</p>
                  <p className="text-3xl font-bold text-gray-900">23</p>
                </div>
                <AlertCircle className="text-orange-500" size={40} />
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Revenue</p>
                  <p className="text-3xl font-bold text-gray-900">$892K</p>
                </div>
                <DollarSign className="text-purple-500" size={40} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">Recent Activities</h3>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User size={20} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">New user registered</p>
                        <p className="text-sm text-gray-600">Company verification pending</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">2 mins ago</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">Admin Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
                  <Users size={18} />
                  Manage Users
                </button>
                <button className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2">
                  <Building2 size={18} />
                  Manage Companies
                </button>
                <button className="w-full bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition-colors flex items-center justify-center gap-2">
                  <Package size={18} />
                  Manage Products
                </button>
                <button className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2">
                  <TrendingUp size={18} />
                  Manage Tenders
                </button>
                <button className="w-full bg-cyan-500 text-white py-3 rounded-lg hover:bg-cyan-600 transition-colors flex items-center justify-center gap-2">
                  <FileText size={18} />
                  Manage Contracts
                </button>
                <button className="w-full bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600 transition-colors flex items-center justify-center gap-2">
                  <MessageSquare size={18} />
                  Support Tickets
                </button>
                <button className="w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 transition-colors flex items-center justify-center gap-2">
                  <Shield size={18} />
                  Compliance
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {showAdminPanel && <AdminPanel />}

      {showProductPage && viewProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 overflow-y-auto">
          <div className="min-h-screen px-4 py-8">
            <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl">
              <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center z-10 rounded-t-2xl">
                <h2 className="text-2xl font-bold text-gray-900">Product Details</h2>
                <button onClick={() => setShowProductPage(false)} className="p-2 hover:bg-gray-100 rounded-full">
                  <X size={24} />
                </button>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  <div>
                    <img src={viewProduct.image} alt={viewProduct.name} className="w-full h-96 object-cover rounded-2xl shadow-xl mb-6" />
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-blue-50 p-5 rounded-xl text-center border border-blue-200">
                        <Package className="mx-auto mb-2 text-blue-600" size={24} />
                        <p className="text-xs text-gray-600">Volume</p>
                        <p className="font-bold text-blue-700">{viewProduct.volume}t</p>
                      </div>
                      <div className="bg-green-50 p-5 rounded-xl text-center border border-green-200">
                        <Truck className="mx-auto mb-2 text-green-600" size={24} />
                        <p className="text-xs text-gray-600">Delivery</p>
                        <p className="font-bold text-green-700">{viewProduct.deliveryFrom}</p>
                      </div>
                      <div className="bg-purple-50 p-5 rounded-xl text-center border border-purple-200">
                        <MapPin className="mx-auto mb-2 text-purple-600" size={24} />
                        <p className="text-xs text-gray-600">Origin</p>
                        <p className="font-bold text-purple-700">{viewProduct.origin}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold mb-4">
                      {viewProduct.category}
                    </span>
                    
                    <h1 className="text-4xl font-bold text-gray-900 mb-6">{viewProduct.name}</h1>

                    <div className="bg-gradient-to-r from-blue-500 to-cyan-400 p-8 rounded-2xl mb-6 text-white shadow-xl">
                      <div className="flex justify-between items-start mb-2">
                        <p className="text-sm opacity-90">
                          {viewProduct.priceType === 'auction' ? 'Current Bid' : 'Price Range'}
                        </p>
                        <div className="bg-white bg-opacity-20 px-2 py-1 rounded text-xs font-bold">
                          {currency}
                        </div>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <p className="text-5xl font-bold">
                          {formatPrice(viewProduct.priceType === 'auction' ? viewProduct.currentBid : viewProduct.price)}
                        </p>
                        {viewProduct.maxPrice && (
                          <>
                            <span className="text-2xl">-</span>
                            <p className="text-3xl font-bold">{formatPrice(viewProduct.maxPrice)}</p>
                          </>
                        )}
                      </div>
                      <p className="text-sm mt-2 opacity-90">per ton</p>
                      {currency === 'USD' && (
                        <p className="text-xs mt-2 opacity-75">
                          Tasa de cambio: 1 USD = {exchangeRate} ARS
                        </p>
                      )}
                    </div>

                    <div className="mb-6">
                      <h3 className="text-xl font-bold mb-4">Description</h3>
                      <p className="text-gray-700 leading-relaxed">{viewProduct.description}</p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-xl mb-6 border">
                      <h3 className="text-lg font-bold mb-4">Company Information</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex"><span className="font-semibold w-32">Company:</span><span>{viewProduct.company}</span></div>
                        <div className="flex"><span className="font-semibold w-32">Location:</span><span>{viewProduct.location}</span></div>
                        <div className="flex"><span className="font-semibold w-32">Grade:</span><span>{viewProduct.grade}</span></div>
                        <div className="flex"><span className="font-semibold w-32">Certification:</span><span>{viewProduct.certification}</span></div>
                      </div>
                    </div>

                    {userRole === 'buyer' && (
                      <div className="space-y-3">
                        <h3 className="text-lg font-bold mb-3">Payment Options</h3>
                        <button
                          onClick={() => handlePayment(viewProduct, 'Mercado Pago')}
                          className="w-full bg-cyan-500 text-white px-6 py-4 rounded-xl hover:bg-cyan-600 transition-all font-bold flex items-center justify-center gap-3 shadow-lg"
                        >
                          <DollarSign size={20} />
                          Pay with Mercado Pago
                        </button>
                        <button
                          onClick={() => handlePayment(viewProduct, 'Bank Transfer')}
                          className="w-full bg-blue-600 text-white px-6 py-4 rounded-xl hover:bg-blue-700 transition-all font-bold flex items-center justify-center gap-3 shadow-lg"
                        >
                          <Building2 size={20} />
                          Bank Transfer
                        </button>
                        {viewProduct.priceType === 'auction' && (
                          <button
                            onClick={() => handleBid(viewProduct.id)}
                            className="w-full bg-orange-500 text-white px-6 py-4 rounded-xl hover:bg-orange-600 transition-all font-bold flex items-center justify-center gap-3 shadow-lg"
                          >
                            <TrendingUp size={20} />
                            Place Bid
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <header className="bg-gradient-to-r from-blue-600 to-cyan-400 shadow-lg sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo />
            
            <nav className="hidden lg:flex items-center gap-6">
              <a href="#" className="text-white hover:text-blue-100 transition-colors font-medium">How it works</a>
              <a href="#" className="text-white hover:text-blue-100 transition-colors font-medium">Compliance</a>
              <a href="#" className="text-white hover:text-blue-100 transition-colors font-medium">About</a>
              
              <div className="flex items-center gap-2 bg-white bg-opacity-20 rounded-lg px-3 py-2 border border-white border-opacity-30">
                <DollarSign size={18} className="text-white" />
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="bg-transparent text-white font-semibold outline-none cursor-pointer"
                >
                  <option value="ARS" className="text-gray-900">ARS</option>
                  <option value="USD" className="text-gray-900">USD</option>
                </select>
              </div>
              
              <select
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
                className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-lg border border-white border-opacity-30 font-medium"
              >
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
                <option value="admin">Admin</option>
              </select>
              
              <button className="bg-white text-blue-600 px-5 py-2 rounded-lg hover:bg-blue-50 transition-colors font-semibold">
                SIGN IN
              </button>
              <button className="bg-transparent border-2 border-white text-white px-5 py-2 rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-semibold">
                REGISTER NOW
              </button>
              {userRole === 'admin' && (
                <button
                  onClick={() => setShowAdminPanel(true)}
                  className="bg-yellow-400 text-gray-900 px-5 py-2 rounded-lg hover:bg-yellow-300 transition-colors font-semibold flex items-center gap-2"
                >
                  <Settings size={18} />
                  Admin Panel
                </button>
              )}
            </nav>
            
            <button onClick={() => setShowMenu(!showMenu)} className="lg:hidden text-white">
              {showMenu ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Access to Global Commodities Marketplace</h2>
            <p className="text-lg mb-8 opacity-90">Platform tailored to agro-commodity traders</p>
            
            <div className="bg-white rounded-xl shadow-2xl p-1 mb-6">
              <div className="flex gap-2 mb-3">
                <button
                  onClick={() => setActiveTab('buy')}
                  className={`flex-1 py-3 rounded-lg font-bold transition-all ${
                    activeTab === 'buy'
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-transparent text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  BUY
                </button>
                <button
                  onClick={() => setActiveTab('sell')}
                  className={`flex-1 py-3 rounded-lg font-bold transition-all ${
                    activeTab === 'sell'
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-transparent text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  SELL
                </button>
              </div>
              
              <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-2">
                <Search size={20} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="What you are looking for?"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 py-2 bg-transparent outline-none text-gray-800"
                />
                <button className="text-blue-500 hover:text-blue-600">
                  <Search size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-8">
        <div className="flex gap-6">
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">CATEGORIES</h3>
                <Filter size={18} />
              </div>
              <div className="space-y-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === cat
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t">
                <h4 className="font-bold text-gray-900 mb-3">REGIÓN</h4>
                <div className="space-y-2 text-sm max-h-64 overflow-y-auto">
                  {regions.map(region => (
                    <label key={region} className="flex items-center gap-2 hover:bg-gray-50 p-1 rounded cursor-pointer">
                      <input type="checkbox" className="rounded text-blue-500" />
                      <span>{region}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <h4 className="font-bold text-gray-900 mb-3">PRECIO</h4>
                <div className="bg-gray-50 p-3 rounded-lg mb-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Moneda:</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setCurrency('ARS')}
                        className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                          currency === 'ARS'
                            ? 'bg-blue-500 text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        ARS
                      </button>
                      <button
                        onClick={() => setCurrency('USD')}
                        className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                          currency === 'USD'
                            ? 'bg-blue-500 text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        USD
                      </button>
                    </div>
                  </div>
                  {currency === 'USD' && (
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      1 USD = {exchangeRate} ARS
                    </p>
                  )}
                </div>
                <div className="space-y-3">
                  <input 
                    type="range" 
                    min="0" 
                    max={currency === 'USD' ? "1000" : "1000000"} 
                    className="w-full"
                  />
                  <div className="flex gap-2 text-sm">
                    <div className="w-1/2">
                      <input 
                        type="number" 
                        placeholder="Mín" 
                        className="w-full px-3 py-2 border rounded-lg"
                      />
                    </div>
                    <div className="w-1/2">
                      <input 
                        type="number" 
                        placeholder="Máx" 
                        className="w-full px-3 py-2 border rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button className="w-full mt-6 bg-blue-100 text-blue-600 py-2 rounded-lg hover:bg-blue-200 transition-colors font-semibold text-sm">
                LIMPIAR FILTROS
              </button>
            </div>
          </div>

          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">
                {sortedProducts.length} RESULTS
              </h3>
              {(userRole === 'seller' || userRole === 'admin') && (
                <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 font-semibold flex items-center gap-2">
                  <Plus size={20} />
                  CREATE A LISTING
                </button>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr className="text-left text-xs font-semibold text-gray-600 uppercase">
                    <th className="px-6 py-4">Producto</th>
                    <th className="px-6 py-4">Empresa</th>
                    <th className="px-6 py-4">Origen</th>
                    <th className="px-6 py-4">Entrega</th>
                    <th className="px-6 py-4">Volumen (TON)</th>
                    <th className="px-6 py-4">Precio ({currency})</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {sortedProducts.map(product => (
                    <tr
                      key={product.id}
                      onClick={() => handleViewProduct(product)}
                      className="hover:bg-blue-50 cursor-pointer transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg" />
                          <div>
                            <p className="font-semibold text-gray-900">{product.name}</p>
                            <p className="text-sm text-gray-600">{product.description.substring(0, 40)}...</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-900">{product.company}</p>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{product.origin}</td>
                      <td className="px-6 py-4 text-gray-700">{product.deliveryFrom}</td>
                      <td className="px-6 py-4 text-blue-600 font-semibold">{product.volume}</td>
                      <td className="px-6 py-4">
                        <p className="text-blue-600 font-bold">
                          {formatPrice(product.price)}
                          {product.maxPrice && ` - ${formatPrice(product.maxPrice)}`}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Logo />
              <p className="text-gray-400 text-sm mt-4">Global commodities marketplace connecting verified traders worldwide.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">How it Works</a></li>
                <li><a href="#" className="hover:text-white">Compliance</a></li>
                <li><a href="#" className="hover:text-white">Verification</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Services</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <p className="text-sm text-gray-400">
                support@agrimarket.com<br />
                +1 (555) 123-4567
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            © 2024 Agrimarket. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AgroMarketplace;
