/* =====================================================================
   AgriMarket — shared catalog
   ---------------------------------------------------------------------
   Used by:  index.html  (featured listings + category chips)
             region.html (province browse page with sidebar filters)
   ===================================================================== */

/* ------- IMAGE BANK — direct Unsplash photo IDs ------- */
/* onerror gradient fallback wired in listingCardHTML / renderStream */
const IMG = {
  /* Wheat */
  wheat:      'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=900&q=80',
  wheatField: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900&q=80',
  /* Corn */
  corn:       'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=900&q=80',
  cornField:  'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=900&q=80',
  /* Soybeans */
  soy:        'https://images.unsplash.com/photo-1612358405970-2394c3e7dcaa?w=900&q=80',
  soyField:   'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=900&q=80',
  /* Sunflower */
  sunfOil:    'https://images.unsplash.com/photo-1598511796432-32f9c3034208?w=900&q=80',
  sunfFlower: 'https://images.unsplash.com/photo-1597474561103-0cdba17f59b8?w=900&q=80',
  /* Peanuts */
  peanuts:    'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=900&q=80',
  /* Sorghum */
  sorghum:    'https://images.unsplash.com/photo-1595855759920-86582396756a?w=900&q=80',
  /* Wine & grapes */
  wine:       'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=900&q=80',
  grapes:     'https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=900&q=80',
  /* Olive oil */
  oliveOil:   'https://images.unsplash.com/photo-1509483894890-c15a51e44a14?w=900&q=80',
  /* Beef & cattle */
  beef:       'https://images.unsplash.com/photo-1529693662653-9d480da3b561?w=900&q=80',
  cattle:     'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=900&q=80',
  /* Other */
  lemons:     'https://images.unsplash.com/photo-1587545329262-cc9cf8870059?w=900&q=80',
  honey:      'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=900&q=80',
  meal:       'https://images.unsplash.com/photo-1536304993881-ff86e0c9d7d8?w=900&q=80',
  tobacco:    'https://images.unsplash.com/photo-1571506165871-ee72a35bc9d4?w=900&q=80',
  barley:     'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900&q=80'
};

/* ------- REGION META (8 provinces) ------- */
const REGION_META = {
  'buenos-aires': {
    name: 'Buenos Aires',
    emoji: '🌾',
    focus: 'Grains · Beef · Sunflower',
    ports: 'Bahía Blanca · Quequén · Necochea',
    tagline: 'The industrial heartland — wheat, barley, soy and beef in scale, shipping out of Bahía Blanca, Necochea and Quequén.',
    headerImg: IMG.wheatField
  },
  'cordoba': {
    name: 'Córdoba',
    emoji: '🌽',
    focus: 'Corn · Soy · Peanuts',
    ports: 'via Rosario (Santa Fe)',
    tagline: 'Argentina\'s second largest crop province — corn, soy and the world\'s best high-oleic peanuts out of General Cabrera and General Deheza.',
    headerImg: IMG.cornField
  },
  'santa-fe': {
    name: 'Santa Fe',
    emoji: '🚢',
    focus: 'Rosario Up-River · Crush · Meals',
    ports: 'Rosario Up-River complex',
    tagline: 'Home to Rosario Up-River — the largest single soy crush corridor on the planet. Where Argentine meal, oil and beans clear FOB.',
    headerImg: IMG.soyField
  },
  'la-pampa': {
    name: 'La Pampa',
    emoji: '🥜',
    focus: 'Peanuts · Sunflower · Sorghum',
    ports: 'via Bahía Blanca',
    tagline: 'Sunflower country — and increasingly peanut country as the belt creeps south from Córdoba.',
    headerImg: IMG.sunfFlower
  },
  'entre-rios': {
    name: 'Entre Ríos',
    emoji: '🐄',
    focus: 'Rice · Poultry · Citrus · Honey',
    ports: 'Ibicuy · via Rosario',
    tagline: 'Rice paddies, poultry and Pampean honey between the Paraná and Uruguay rivers.',
    headerImg: IMG.honey
  },
  'mendoza': {
    name: 'Mendoza',
    emoji: '🍷',
    focus: 'Wine · Must · Olive Oil',
    ports: 'via Buenos Aires · CL ports (Pacific)',
    tagline: 'Cuyo wine country — Malbec, Cabernet, Bonarda, Torrontés. Bulk wine, IBC, and concentrated must out of Luján de Cuyo and the Uco Valley.',
    headerImg: IMG.wine
  },
  'tucuman': {
    name: 'Tucumán',
    emoji: '🍋',
    focus: 'Lemons · Sugar · Soy',
    ports: 'via Rosario · Buenos Aires',
    tagline: 'The world\'s top lemon exporter — juice, oil, fresh fruit — plus sugar and a growing northern soy belt.',
    headerImg: IMG.lemons
  },
  'salta': {
    name: 'Salta',
    emoji: '🌶️',
    focus: 'Beans · Soy · Tobacco · Wine',
    ports: 'via Rosario · Buenos Aires',
    tagline: 'Northern frontier — Alubia and black beans, soy at altitude, Torrontés wines from Cafayate.',
    headerImg: IMG.wine
  }
};

/* ------- LISTING CATALOG ------- */
/* addedDays = days ago.  basisList used by filter rail.                  */
const LISTINGS = [

  /* ============ SOYBEANS ============ */
  { id: 'L-2031', category: 'soybeans', region: 'santa-fe',
    title: 'Soybeans, Non-GMO IP, 2025/26',
    province: 'SANTA FE', locDetail: 'Rosario Up-River',
    price: '$420 – $445', priceMin: 420, priceMax: 445, priceUnit: 'USD / MT',
    vol: '2,000 MT', volMt: 2000, basis: 'FOB · CIF', basisList: ['FOB','CIF'],
    ship: 'Apr 2026', seller: 'Cofco Argentina S.A.',
    badge: 'verified', img: IMG.soy, addedDays: 1, cropYear: '2025/26' },

  { id: 'L-2030', category: 'soybeans', region: 'buenos-aires',
    title: 'Soybeans Standard, GMO Roundup Ready',
    province: 'BUENOS AIRES', locDetail: 'Bahía Blanca',
    price: '$398 – $412', priceMin: 398, priceMax: 412, priceUnit: 'USD / MT',
    vol: '5,000 MT', volMt: 5000, basis: 'FOB · FAS', basisList: ['FOB','FAS'],
    ship: 'May 2026', seller: 'Asociación Coop. Argentinas',
    badge: 'new', img: IMG.soyField, addedDays: 0, cropYear: '2025/26' },

  { id: 'L-2024', category: 'soybeans', region: 'cordoba',
    title: 'Soybeans IP Premium, EUDR-traceable',
    province: 'CÓRDOBA', locDetail: 'General Deheza',
    price: '$455 – $480', priceMin: 455, priceMax: 480, priceUnit: 'USD / MT',
    vol: '1,500 MT', volMt: 1500, basis: 'CIF · CFR', basisList: ['CIF','CFR'],
    ship: 'Jun 2026', seller: 'Aceitera General Deheza (AGD)',
    badge: 'verified', img: IMG.soy, addedDays: 2, cropYear: '2025/26' },

  { id: 'L-2018', category: 'soybeans', region: 'santa-fe',
    title: 'Soybeans Conventional, Bulk Feed Grade',
    province: 'SANTA FE', locDetail: 'San Lorenzo terminal',
    price: '$405 – $418', priceMin: 405, priceMax: 418, priceUnit: 'USD / MT',
    vol: '8,000 MT', volMt: 8000, basis: 'FOB', basisList: ['FOB'],
    ship: 'Apr 2026', seller: 'Vicentin Family Group',
    badge: 'verified', img: IMG.soyField, addedDays: 5, cropYear: '2025/26' },

  { id: 'L-2009', category: 'soybeans', region: 'salta',
    title: 'Northern Soy, Altitude-grown',
    province: 'SALTA', locDetail: 'Joaquín V. González',
    price: '$415 – $430', priceMin: 415, priceMax: 430, priceUnit: 'USD / MT',
    vol: '600 MT', volMt: 600, basis: 'CIF', basisList: ['CIF'],
    ship: 'Jul 2026', seller: 'Olmedo Agropecuaria',
    badge: 'new', img: IMG.soy, addedDays: 9, cropYear: '2025/26' },

  /* ============ CORN ============ */
  { id: 'L-2029', category: 'corn', region: 'buenos-aires',
    title: 'Yellow Corn, Grade 1 SAGPyA',
    province: 'BUENOS AIRES', locDetail: 'Bahía Blanca port',
    price: '$178 – $188', priceMin: 178, priceMax: 188, priceUnit: 'USD / MT',
    vol: '3,500 MT/mo', volMt: 3500, basis: 'FOB · CFR', basisList: ['FOB','CFR'],
    ship: 'May 2026', seller: 'Aceitera General Deheza (AGD)',
    badge: 'verified', img: IMG.corn, addedDays: 0, cropYear: '2025/26' },

  { id: 'L-2027', category: 'corn', region: 'cordoba',
    title: 'Flint Corn for Milling, 750 kg/hL',
    province: 'CÓRDOBA', locDetail: 'Río Cuarto',
    price: '$215 – $232', priceMin: 215, priceMax: 232, priceUnit: 'USD / MT',
    vol: '1,800 MT', volMt: 1800, basis: 'FOB · CIF', basisList: ['FOB','CIF'],
    ship: 'Jun 2026', seller: 'Molinos Río de la Plata',
    badge: 'new', img: IMG.corn, addedDays: 1, cropYear: '2025/26' },

  { id: 'L-2022', category: 'corn', region: 'cordoba',
    title: 'Yellow Corn, Feed Grade, Bulk',
    province: 'CÓRDOBA', locDetail: 'Marcos Juárez',
    price: '$172 – $182', priceMin: 172, priceMax: 182, priceUnit: 'USD / MT',
    vol: '6,000 MT', volMt: 6000, basis: 'FOB', basisList: ['FOB'],
    ship: 'Apr 2026', seller: 'Bunge Argentina S.A.',
    badge: 'verified', img: IMG.cornField, addedDays: 3, cropYear: '2025/26' },

  { id: 'L-2014', category: 'corn', region: 'santa-fe',
    title: 'Yellow Corn Up-River, Containerized',
    province: 'SANTA FE', locDetail: 'Rosario',
    price: '$182 – $192', priceMin: 182, priceMax: 192, priceUnit: 'USD / MT',
    vol: '900 MT', volMt: 900, basis: 'FCA · CIF', basisList: ['FCA','CIF'],
    ship: 'May 2026', seller: 'Cofco Argentina S.A.',
    badge: 'verified', img: IMG.corn, addedDays: 7, cropYear: '2025/26' },

  { id: 'L-2007', category: 'corn', region: 'buenos-aires',
    title: 'Yellow Corn, Necochea FOB',
    province: 'BUENOS AIRES', locDetail: 'Necochea',
    price: '$176 – $186', priceMin: 176, priceMax: 186, priceUnit: 'USD / MT',
    vol: '4,200 MT', volMt: 4200, basis: 'FOB', basisList: ['FOB'],
    ship: 'Jun 2026', seller: 'Viterra Argentina',
    badge: 'verified', img: IMG.cornField, addedDays: 11, cropYear: '2025/26' },

  /* ============ WHEAT ============ */
  { id: 'L-2028', category: 'wheat', region: 'buenos-aires',
    title: 'Bread Wheat, 11.5% protein, ART',
    province: 'BUENOS AIRES', locDetail: 'Quequén terminal',
    price: '$215 – $232', priceMin: 215, priceMax: 232, priceUnit: 'USD / MT',
    vol: '1,200 MT/mo', volMt: 1200, basis: 'FOB · CIF', basisList: ['FOB','CIF'],
    ship: 'Jun 2026', seller: 'Asociación Coop. Argentinas',
    badge: 'new', img: IMG.wheat, addedDays: 0, cropYear: '2025/26' },

  { id: 'L-2021', category: 'wheat', region: 'buenos-aires',
    title: 'Bread Wheat, 12.0% protein, Premium',
    province: 'BUENOS AIRES', locDetail: 'Bahía Blanca',
    price: '$228 – $246', priceMin: 228, priceMax: 246, priceUnit: 'USD / MT',
    vol: '2,500 MT', volMt: 2500, basis: 'FOB', basisList: ['FOB'],
    ship: 'Jun 2026', seller: 'Cargill Argentina',
    badge: 'verified', img: IMG.wheatField, addedDays: 4, cropYear: '2025/26' },

  { id: 'L-2017', category: 'wheat', region: 'santa-fe',
    title: 'Durum Wheat, Pasta Grade',
    province: 'SANTA FE', locDetail: 'Rosario Up-River',
    price: '$268 – $284', priceMin: 268, priceMax: 284, priceUnit: 'USD / MT',
    vol: '800 MT', volMt: 800, basis: 'CIF · CFR', basisList: ['CIF','CFR'],
    ship: 'Jul 2026', seller: 'Molinos Cañuelas',
    badge: 'verified', img: IMG.wheat, addedDays: 6, cropYear: '2025/26' },

  { id: 'L-2005', category: 'wheat', region: 'buenos-aires',
    title: 'Feed Wheat, Bulk Cargo',
    province: 'BUENOS AIRES', locDetail: 'Quequén',
    price: '$198 – $210', priceMin: 198, priceMax: 210, priceUnit: 'USD / MT',
    vol: '3,000 MT', volMt: 3000, basis: 'FOB · CFR', basisList: ['FOB','CFR'],
    ship: 'May 2026', seller: 'ACA — Asoc. Coop. Argentinas',
    badge: 'verified', img: IMG.wheatField, addedDays: 12, cropYear: '2025/26' },

  /* ============ SUNFLOWER OIL ============ */
  { id: 'L-2026', category: 'sunflower-oil', region: 'santa-fe',
    title: 'Sunflower Oil, Refined CP6',
    province: 'SANTA FE', locDetail: 'Rosario',
    price: '$960 – $1,020', priceMin: 960, priceMax: 1020, priceUnit: 'USD / MT',
    vol: '450 MT', volMt: 450, basis: 'FOB · Flexitank', basisList: ['FOB'],
    ship: 'May 2026', seller: 'Oleaginosa Moreno Hnos.',
    badge: 'verified', img: IMG.sunfOil, addedDays: 1, cropYear: '2025/26' },

  { id: 'L-2019', category: 'sunflower-oil', region: 'la-pampa',
    title: 'Sunflower Oil, Crude Degummed',
    province: 'LA PAMPA', locDetail: 'General Pico',
    price: '$895 – $945', priceMin: 895, priceMax: 945, priceUnit: 'USD / MT',
    vol: '800 MT', volMt: 800, basis: 'FOB · CIF', basisList: ['FOB','CIF'],
    ship: 'Jun 2026', seller: 'Aceitera San Lorenzo',
    badge: 'verified', img: IMG.sunfOil, addedDays: 4, cropYear: '2025/26' },

  { id: 'L-2012', category: 'sunflower-oil', region: 'buenos-aires',
    title: 'High-Oleic Sunflower Oil, Premium',
    province: 'BUENOS AIRES', locDetail: 'Bahía Blanca',
    price: '$1,180 – $1,260', priceMin: 1180, priceMax: 1260, priceUnit: 'USD / MT',
    vol: '220 MT', volMt: 220, basis: 'CIF · Flexitank', basisList: ['CIF'],
    ship: 'Jul 2026', seller: 'Cargill Argentina',
    badge: 'new', img: IMG.sunfOil, addedDays: 8, cropYear: '2025/26' },

  /* ============ SOY MEAL & OIL ============ */
  { id: 'L-2025', category: 'soy-meal-oil', region: 'santa-fe',
    title: 'Soybean Meal Hi-Pro 47%, Pelletized',
    province: 'SANTA FE', locDetail: 'Rosario Up-River',
    price: '$385 – $402', priceMin: 385, priceMax: 402, priceUnit: 'USD / MT',
    vol: '5,000 MT', volMt: 5000, basis: 'FOB · CFR', basisList: ['FOB','CFR'],
    ship: 'Apr 2026', seller: 'Aceitera General Deheza (AGD)',
    badge: 'verified', img: IMG.meal, addedDays: 2, cropYear: '2025/26' },

  { id: 'L-2020', category: 'soy-meal-oil', region: 'santa-fe',
    title: 'Soy Oil Degummed, Bulk',
    province: 'SANTA FE', locDetail: 'San Lorenzo',
    price: '$925 – $975', priceMin: 925, priceMax: 975, priceUnit: 'USD / MT',
    vol: '1,800 MT', volMt: 1800, basis: 'FOB', basisList: ['FOB'],
    ship: 'May 2026', seller: 'Vicentin Family Group',
    badge: 'verified', img: IMG.soy, addedDays: 4, cropYear: '2025/26' },

  { id: 'L-2011', category: 'soy-meal-oil', region: 'buenos-aires',
    title: 'Soy Hulls Pelletized, Feed Grade',
    province: 'BUENOS AIRES', locDetail: 'Bahía Blanca',
    price: '$172 – $186', priceMin: 172, priceMax: 186, priceUnit: 'USD / MT',
    vol: '3,200 MT', volMt: 3200, basis: 'FOB · CIF', basisList: ['FOB','CIF'],
    ship: 'Jun 2026', seller: 'Bunge Argentina S.A.',
    badge: 'verified', img: IMG.meal, addedDays: 8, cropYear: '2025/26' },

  /* ============ PEANUTS ============ */
  { id: 'L-2023', category: 'peanuts', region: 'cordoba',
    title: 'High-Oleic Peanuts, Runner 38/42',
    province: 'CÓRDOBA', locDetail: 'General Cabrera',
    price: '$1,380 – $1,450', priceMin: 1380, priceMax: 1450, priceUnit: 'USD / MT',
    vol: '300 MT', volMt: 300, basis: 'CIF · CFR', basisList: ['CIF','CFR'],
    ship: 'Jun 2026', seller: 'Lorenzati, Ruetsch y Cía.',
    badge: 'new', img: IMG.peanuts, addedDays: 2, cropYear: '2025/26' },

  { id: 'L-2016', category: 'peanuts', region: 'cordoba',
    title: 'Blanched Peanuts 40/50, Confectionery',
    province: 'CÓRDOBA', locDetail: 'General Deheza',
    price: '$1,420 – $1,520', priceMin: 1420, priceMax: 1520, priceUnit: 'USD / MT',
    vol: '180 MT', volMt: 180, basis: 'CIF · CFR', basisList: ['CIF','CFR'],
    ship: 'Jul 2026', seller: 'Olega S.A.',
    badge: 'verified', img: IMG.peanuts, addedDays: 6, cropYear: '2025/26' },

  { id: 'L-2008', category: 'peanuts', region: 'la-pampa',
    title: 'Peanut Paste, Industrial Bulk',
    province: 'LA PAMPA', locDetail: 'General Pico',
    price: '$2,180 – $2,320', priceMin: 2180, priceMax: 2320, priceUnit: 'USD / MT',
    vol: '120 MT', volMt: 120, basis: 'CIF', basisList: ['CIF'],
    ship: 'Aug 2026', seller: 'Lorenzati, Ruetsch y Cía.',
    badge: 'verified', img: IMG.peanuts, addedDays: 10, cropYear: '2025/26' },

  /* ============ SORGHUM ============ */
  { id: 'L-2015', category: 'sorghum', region: 'cordoba',
    title: 'Sorghum Granífero, Tannin-free',
    province: 'CÓRDOBA', locDetail: 'Río Cuarto',
    price: '$192 – $208', priceMin: 192, priceMax: 208, priceUnit: 'USD / MT',
    vol: '1,500 MT', volMt: 1500, basis: 'FOB · CIF', basisList: ['FOB','CIF'],
    ship: 'May 2026', seller: 'ACA — Asoc. Coop. Argentinas',
    badge: 'verified', img: IMG.sorghum, addedDays: 6, cropYear: '2025/26' },

  { id: 'L-2003', category: 'sorghum', region: 'entre-rios',
    title: 'Sorghum Feed Grade, Bulk',
    province: 'ENTRE RÍOS', locDetail: 'Paraná',
    price: '$184 – $196', priceMin: 184, priceMax: 196, priceUnit: 'USD / MT',
    vol: '2,200 MT', volMt: 2200, basis: 'FOB', basisList: ['FOB'],
    ship: 'Jun 2026', seller: 'Cooperativa Agrícola Diamante',
    badge: 'verified', img: IMG.sorghum, addedDays: 14, cropYear: '2025/26' },

  /* ============ BEEF ============ */
  { id: 'L-2013', category: 'beef', region: 'buenos-aires',
    title: 'Hilton Quota Cuts, Frozen',
    province: 'BUENOS AIRES', locDetail: 'San Justo plant',
    price: '$8,900 – $9,400', priceMin: 8900, priceMax: 9400, priceUnit: 'USD / MT',
    vol: '24 MT/wk', volMt: 24, basis: 'CIF · Refrigerated', basisList: ['CIF'],
    ship: 'Apr 2026', seller: 'Frigorífico Rioplatense',
    badge: 'verified', img: IMG.beef, addedDays: 7, cropYear: '—' },

  { id: 'L-2010', category: 'beef', region: 'santa-fe',
    title: 'Lean Trim 65 CL, Frozen Cartons',
    province: 'SANTA FE', locDetail: 'Venado Tuerto',
    price: '$5,400 – $5,750', priceMin: 5400, priceMax: 5750, priceUnit: 'USD / MT',
    vol: '40 MT', volMt: 40, basis: 'CIF · CFR', basisList: ['CIF','CFR'],
    ship: 'May 2026', seller: 'Marfrig — Quickfood',
    badge: 'verified', img: IMG.beef, addedDays: 9, cropYear: '—' },

  { id: 'L-2002', category: 'beef', region: 'cordoba',
    title: 'Striploin Frozen, Vacuum-sealed',
    province: 'CÓRDOBA', locDetail: 'Río Cuarto plant',
    price: '$9,800 – $10,400', priceMin: 9800, priceMax: 10400, priceUnit: 'USD / MT',
    vol: '18 MT', volMt: 18, basis: 'CIF · Refrigerated', basisList: ['CIF'],
    ship: 'Jun 2026', seller: 'Logros S.A.',
    badge: 'new', img: IMG.cattle, addedDays: 15, cropYear: '—' },

  /* ============ WINE ============ */
  { id: 'L-2006', category: 'wine', region: 'mendoza',
    title: 'Malbec Wine in bulk, Premium',
    province: 'MENDOZA', locDetail: 'Luján de Cuyo',
    price: '$1.35 – $1.60', priceMin: 1.35, priceMax: 1.60, priceUnit: 'USD / L',
    vol: '180 KL', volMt: 180, basis: 'FOB · IBC', basisList: ['FOB'],
    ship: 'Jul 2026', seller: 'Bodega Los Andes Coop.',
    badge: 'verified', img: IMG.wine, addedDays: 11, cropYear: '2025' },

  { id: 'L-2004', category: 'wine', region: 'mendoza',
    title: 'Cabernet Sauvignon Bulk, Uco Valley',
    province: 'MENDOZA', locDetail: 'Tunuyán',
    price: '$1.42 – $1.78', priceMin: 1.42, priceMax: 1.78, priceUnit: 'USD / L',
    vol: '120 KL', volMt: 120, basis: 'FOB · IBC', basisList: ['FOB'],
    ship: 'Aug 2026', seller: 'Bodegas Esmeralda',
    badge: 'verified', img: IMG.grapes, addedDays: 13, cropYear: '2025' },

  { id: 'L-2001', category: 'wine', region: 'salta',
    title: 'Torrontés Bulk, Cafayate',
    province: 'SALTA', locDetail: 'Cafayate',
    price: '$1.55 – $1.90', priceMin: 1.55, priceMax: 1.90, priceUnit: 'USD / L',
    vol: '60 KL', volMt: 60, basis: 'FOB', basisList: ['FOB'],
    ship: 'Aug 2026', seller: 'Bodega El Esteco',
    badge: 'new', img: IMG.wine, addedDays: 16, cropYear: '2025' },

  /* ============ OTHER (region-only) ============ */
  { id: 'L-2032', category: 'other', subCategory: 'olive', region: 'mendoza',
    title: 'EVOO Arbequina, First Cold-Press',
    province: 'MENDOZA', locDetail: 'San Rafael',
    price: '$3,850 – $4,200', priceMin: 3850, priceMax: 4200, priceUnit: 'USD / MT',
    vol: '40 MT', volMt: 40, basis: 'FOB · IBC', basisList: ['FOB'],
    ship: 'Jun 2026', seller: 'Olivícola del Sur',
    badge: 'verified', img: IMG.oliveOil, addedDays: 3, cropYear: '2025' },
  // oliveOil now uses distinct keyword URL — no longer same as sunfOil

  { id: 'L-2033', category: 'other', subCategory: 'citrus', region: 'tucuman',
    title: 'Tucumán Lemons, Eureka Pack',
    province: 'TUCUMÁN', locDetail: 'Famaillá',
    price: '$0.72 – $0.88', priceMin: 0.72, priceMax: 0.88, priceUnit: 'USD / kg',
    vol: '300 MT', volMt: 300, basis: 'CIF · Refrigerated', basisList: ['CIF'],
    ship: 'May 2026', seller: 'Citromax S.A.',
    badge: 'verified', img: IMG.lemons, addedDays: 5, cropYear: '2026' },

  { id: 'L-2034', category: 'other', subCategory: 'honey', region: 'entre-rios',
    title: 'Pure Pampean Honey, Drums',
    province: 'ENTRE RÍOS', locDetail: 'Concordia',
    price: '$2,950 – $3,200', priceMin: 2950, priceMax: 3200, priceUnit: 'USD / MT',
    vol: '80 MT', volMt: 80, basis: 'FOB · CIF', basisList: ['FOB','CIF'],
    ship: 'Jun 2026', seller: 'Apicultores del Litoral Coop.',
    badge: 'new', img: IMG.honey, addedDays: 1, cropYear: '2025' },

  { id: 'L-2035', category: 'other', subCategory: 'tobacco', region: 'salta',
    title: 'Virginia Tobacco, FCV Cured',
    province: 'SALTA', locDetail: 'El Carril',
    price: '$3,400 – $3,800', priceMin: 3400, priceMax: 3800, priceUnit: 'USD / MT',
    vol: '60 MT', volMt: 60, basis: 'FOB', basisList: ['FOB'],
    ship: 'Aug 2026', seller: 'Tabacalera del Norte',
    badge: 'verified', img: IMG.tobacco, addedDays: 9, cropYear: '2025' }
];

/* ------- CATEGORY META (for chips + headings) ------- */
const CATEGORY_META = {
  'all':           { label: 'All' },
  'soybeans':      { label: 'Soybeans' },
  'corn':          { label: 'Corn' },
  'wheat':         { label: 'Wheat' },
  'sunflower-oil': { label: 'Sunflower oil' },
  'soy-meal-oil':  { label: 'Soy meal & oil' },
  'peanuts':       { label: 'Peanuts' },
  'sorghum':       { label: 'Sorghum' },
  'beef':          { label: 'Beef & protein' },
  'wine':          { label: 'Wine & must' },
  'other':         { label: 'Other commodities' }
};

/* ------- EXPORT to window ------- */
window.IMG = IMG;
window.LISTINGS = LISTINGS;
window.REGION_META = REGION_META;
window.CATEGORY_META = CATEGORY_META;

/* ------- HELPERS ------- */
window.countByCategory = function(cat) {
  if (cat === 'all') return LISTINGS.length;
  return LISTINGS.filter(l => l.category === cat).length;
};
window.countByRegion = function(reg) {
  return LISTINGS.filter(l => l.region === reg).length;
};
window.sellerInitials = function(s) {
  return s.split(' ').filter(w => w.length > 1 && !/^(S\.A\.|S\.R\.L\.|Coop\.|Hnos\.|y|de|del|la|los|las)$/i.test(w))
          .map(w => w[0]).slice(0, 2).join('').toUpperCase();
};
window.addedLabel = function(days) {
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7)   return days + ' days ago';
  if (days < 14)  return '1 week ago';
  return Math.floor(days / 7) + ' weeks ago';
};
