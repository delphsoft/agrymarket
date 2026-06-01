/* AgriMarket – shared i18n translations
   Usage:
     1. Add data-i18n="key" to any text element (replaces textContent)
     2. Add data-i18n-placeholder="key" for input placeholders
     3. Add data-i18n-html="key" if value contains HTML
     4. Call setLang('es') or setLang('en'); persists to localStorage 'agrimarket_lang'
*/

const I18N = {
  en: {
    // ===== NAV =====
    nav_how: "How it works",
    nav_compliance: "Compliance",
    nav_about: "About",
    nav_ask: "Ask manager",
    nav_signin: "SIGN IN",
    nav_register: "Register Now",

    // ===== HERO =====
    hero_title: "Argentina's commodities marketplace, online",
    hero_subtitle: "Direct from Rosario, B­a Blanca, Córdoba and Mendoza — to your port",
    hero_categories: "CATEGORIES",
    hero_buy: "BUY",
    hero_sell: "SELL",
    hero_search_placeholder: "What are you looking for?",

    // ===== PROMOS =====
    promo_global_title: "Access the global market",
    promo_global_free: "for free",
    promo_global_body: "Join us and get free access for 6 months to buy and sell commodities from around the world.",
    promo_register: "REGISTER NOW",
    promo_field_title: "From the field to your warehouse, direct from growers worldwide",
    promo_howitworks: "HOW IT WORKS",

    // ===== FEATURES =====
    feat1_title: "Global Commodities Access",
    feat1_body: "Search our product database for agricultural commodities being sold around the world!",
    feat2_title: "Enhanced Transparency",
    feat2_body: "All of our customers must go through our KYC compliance process in order to gain full access to the platform.",
    feat3_title: "Buy At Source",
    feat3_body: "Negotiate a better price directly with the producer.",
    feat4_title: "New Benchmark in Communication",
    feat4_body: "With our real-time messaging application and contract management system, you can negotiate every step of a transaction without having to make a single phone call.",
    feat5_title: "Personal Relationship Manager",
    feat5_body: "All of our customers are assigned a personal relationship manager that provides support with platform functionality.",
    feat6_title: "Expand Markets",
    feat6_body: "Find new buyers and sellers for your products and diversify your client base.",

    // ===== PRODUCTS SECTION =====
    recent_products: "Recently added products",
    available: "available",
    per_month: "/month",
    per_mt: "/ MT",
    ships: "ships",
    badge_new: "NEW",
    badge_verified: "VERIFIED",
    badge_hot: "HOT",

    // ===== FOOTER =====
    footer_subscribe_title: "Subscribe to receive news first",
    footer_email_placeholder: "Email for newsletters",
    footer_subscribe_btn: "SUBSCRIBE",
    footer_home: "Home",
    footer_about: "About",
    footer_how: "How it works",
    footer_compliance: "Compliance",
    footer_terms: "Terms of Service",
    footer_privacy: "The Policy of Confidentiality",
    footer_support: "Support",
    footer_faq: "FAQ",

    // ===== AUTH MODAL =====
    auth_welcome: "Welcome back",
    auth_welcome_sub: "Sign in to access your dashboard",
    auth_join: "Join AgriMarket",
    auth_join_sub: "Create your account in under 2 minutes",
    auth_signin_tab: "SIGN IN",
    auth_register_tab: "REGISTER",
    auth_i_am: "I am a",
    auth_buyer: "Buyer",
    auth_seller: "Seller",
    auth_admin: "Admin",
    auth_first: "First name",
    auth_last: "Last name",
    auth_company: "Company",
    auth_email: "Email",
    auth_password: "Password",
    auth_submit_signin: "Sign In to Dashboard",
    auth_submit_register: "Create Account",
    auth_footer_signin: "New to AgriMarket?",
    auth_footer_register: "Already have an account?",
    auth_create: "Create an account",
    auth_signin_link: "Sign in",

    // ===== CATEGORIES =====
    cat_grains: "Grains",
    cat_oilseeds: "Oilseeds",
    cat_pulses: "Pulses & Beans",
    cat_oils: "Edible Oils",
    cat_soft: "Soft Commodities",
    cat_feed: "Animal Feed",
    cat_spices: "Spices & Herbs",
    cat_browse_all: "Browse all categories",
    cat_see_all: "See all",

    // ===== DASHBOARDS – COMMON =====
    dash_my_products: "My products",
    dash_messages: "Messages",
    dash_contracts: "Contracts",
    dash_profile: "Profile",
    dash_browse: "Browse",
    dash_my_contracts: "My Contracts",
    dash_saved: "Saved",
    dash_post_buy: "+ Post Buy Request",
    dash_add_product: "+ Add Product",

    // ===== SELLER STATS =====
    stat_active_listings: "Active listings",
    stat_inquiries: "Inquiries",
    stat_open_contracts: "Open contracts",
    stat_total_volume: "Total volume sold",
    stat_this_week: "this week",
    stat_awaiting_sig: "awaiting signature",
    stat_ytd: "YTD",

    // ===== TABLE HEADERS =====
    th_product: "Product",
    th_type: "Type",
    th_country: "Country",
    th_price: "Price, USD/MT",
    th_volume: "Volume, MT",
    th_delivery: "Delivery",
    th_inquiries: "Inquiries",
    th_updated: "Updated",
    th_action: "Action",
    th_id: "ID",
    th_status: "Status",
    th_partner: "Partner",
    th_period: "Period",
    th_destination: "Shipment Destination",
    th_basis: "Basis",
    th_origin: "Origin",
    th_company: "Company",
    th_volume_short: "Volume",
    th_price_short: "Price",

    // ===== STATUSES =====
    status_new: "New",
    status_signed: "Signed",
    status_settled: "Settled",
    status_progress: "In Progress",
    status_terminated: "Terminated",
    status_open: "Open",
    status_closed: "Closed",
    status_awarded: "Awarded",
    status_cancelled: "Cancelled",

    // ===== ACTIONS =====
    act_edit: "Edit",
    act_pause: "Pause",
    act_view: "View",
    act_review: "Review",
    act_contact: "Contact",
    act_save: "Save",
    act_send_inquiry: "Send inquiry",
    act_request_quote: "Request quote",
    act_cancel: "Cancel",
    act_save_changes: "Save Changes",
    act_export_csv: "Export CSV",
    act_new_contract: "New Contract",
    act_export: "Export",
    act_publish: "Publish Listing",

    // ===== TABS =====
    tab_all: "All",

    // ===== BUYER BROWSE =====
    browse_origin: "ORIGIN",
    browse_volume: "VOLUME",
    browse_price: "PRICE",
    browse_basis: "BASIS (INCOTERMS)",
    browse_delivery: "DELIVERY PERIOD",
    browse_results: "RESULTS",
    browse_clear: "Clear Filters",

    // ===== ADMIN =====
    admin_dashboard: "Dashboard",
    admin_users: "Manage Users",
    admin_companies: "Manage Companies",
    admin_products: "Manage Products",
    admin_tenders: "Manage Tenders",
    admin_admin_contracts: "Manage Contracts",
    admin_messaging: "Messaging",
    admin_support: "Support Tickets",
    admin_compliance: "Compliance",
    admin_sales: "Sales Managers",
    admin_admins: "Admins",
    admin_section_ops: "Operations",
    admin_section_comm: "Communications",
    admin_section_team: "Team",
    admin_listings: "Listings",
    admin_customers: "Customers",
    admin_kyc_pending: "Pending KYC",
    admin_total_companies: "Total companies",
    admin_recent: "Recent activity",
    admin_top_countries: "Top countries by volume",
    admin_invite: "+ Invite User",

    // ===== PROFILE =====
    profile_personal: "Personal Information",
    profile_company: "Company Information",
    profile_verification: "Verification Documents",
    profile_preferences: "Buying Preferences",
    profile_verified_seller: "✓ Verified Seller",
    profile_verified_buyer: "✓ Verified Buyer",
    profile_approved: "✓ Approved",
    profile_under_review: "⏳ Under Review",
    profile_rejected: "✕ Rejected",

    // ===== DETAIL DRAWER =====
    detail_listing_id: "Listing ID",
    detail_posted: "Posted",
    detail_days_ago: "days ago",
    detail_active: "Active",
    detail_volume_range: "Volume range",
    detail_specs: "Product specifications",
    detail_description: "Description",
    detail_delivery: "Delivery",
    detail_window: "Delivery window",
    detail_dest_port: "Destination port",
    detail_shipment: "Shipment type",
    detail_payment: "Payment terms",
    detail_seller: "Seller",
    detail_listed_by: "Listed by",
    detail_on_time: "On-time delivery",
    detail_rating: "Avg. rating",
    detail_trades: "Completed trades",
    detail_basis_avail: "Available basis (Incoterms)",
    detail_inquiries: "inquiries",
    detail_views: "views",
    detail_edit_listing: "Edit listing",
    detail_view_inquiries: "View inquiries",

    // ===== CHAT =====
    chat_messages: "Messages",
    chat_clients: "Clients",
    chat_conversations: "Conversations",
    chat_other_clients: "Other clients",
    chat_send: "Send",
    chat_type_msg: "Type message here...",
    chat_view_files: "View Files",
    chat_contract_details: "Contract Details",

    // ===== DEMO BANNER =====
    demo_banner_seller: "You're viewing the <strong>Seller</strong> demo. Switch roles:",
    demo_banner_buyer: "You're viewing the <strong>Buyer</strong> demo. Switch roles:",
    demo_banner_admin: "You're viewing the <strong>Admin</strong> demo. Switch roles:",
    demo_landing: "Landing",
    demo_seller: "Seller",
    demo_buyer: "Buyer",
    demo_admin: "Admin",

    // ===== COMPLIANCE PASSPORT =====
    passport_title: "Compliance Passport",
    passport_sub: "Origin gates (Argentina) + destination overlays for EU, US and China. One source of truth, updated live.",
    passport_export: "Export audit PDF",
    passport_new_shipment: "+ New Shipment",
    passport_pipeline: "Compliance pipeline — origin + destination",
    passport_live: "LIVE",
    passport_fixes_clear: "✓ No issues. This shipment cleared all gates.",
    passport_fixes_pending: "✓ No blocking issues right now. Pending gates will auto-file as they reach SLA.",
    passport_services_title: "Certifiers & services",
    passport_services_lede: "Curated, accredited inspectors and labs. Book inline — results flow straight into the right gate's evidence file.",
    passport_services_catalog: "Browse full catalog →",
    passport_origin_gates: "Origin compliance — Argentina · 6 gates",
    passport_origin_blurb: "AFIP, SENASA and ROE Verde. Filed at origin, before B/L.",
    passport_audit_title: "Live audit log",
    passport_audit_sub: "auto-syncs from AFIP, SENASA, terminal, carrier & destination customs",
    passport_book: "Book service",
    passport_details: "Details",
    passport_copilot_greeting: "Hi — I'm the Compliance Copilot. I read from this shipment's passport and AgriMarket's compliance desk posts.",
    passport_copilot_placeholder: "Ask about a regulation, a gate, or a fix…",

    // ===== MARKET INTELLIGENCE =====
    mi_title: "Market Intelligence",
    mi_featured: "Top of the desk",
    mi_feed: "The feed",
    mi_filter_all: "All",
    mi_filter_compliance: "Compliance",
    mi_filter_market: "Market",
    mi_filter_origin: "Origin spotlight",
    mi_filter_brief: "Weekly brief",
    mi_read_more: "Read more →",
    mi_min_read: "min read",

    // ===== SEARCH =====
    search_placeholder: "Search commodities, origins, sellers…",
    search_results_for: "Results for",
    search_no_results: "No listings found. Try a different search term.",
    search_filters: "Filters",
    search_reset: "Reset filters",

    // ===== CATEGORIES (missing) =====
    cat_peanuts: "Peanuts & Pulses",
    cat_beef: "Beef & Protein",
    cat_wine: "Wine & Must",
    cat_citrus: "Citrus & Fruit",
    cat_dairy: "Dairy & Honey",

    // ===== INDEX SECTIONS =====
    sec_featured: "Featured listings",
    sec_featured_sub: "live sell offers · updated in real time",
    sec_regions: "Browse by region",
    sec_regions_sub: "Argentine origin — click to filter by province",
    sec_how: "How it works",
    sec_market_intel: "Market intelligence",
    sec_market_intel_sub: "Compliance alerts, origin spotlights and trade briefs — direct from Buenos Aires",
    sec_market_link: "See all posts →",

    // ===== HOW IT WORKS =====
    hiw_1_title: "Find the right product",
    hiw_1_body: "Search by commodity, origin, price range or delivery terms. Filter by province, Incoterms and shipment window.",
    hiw_2_title: "Connect & negotiate",
    hiw_2_body: "Open a thread directly with the seller. No middlemen. AI-assisted contract terms built from GAFTA clauses.",
    hiw_3_title: "Sign & trade",
    hiw_3_body: "E-sign via DocuSign-linked contracts. Trade finance and logistics partners available at checkout.",
    hiw_4_title: "Compliance & logistics",
    hiw_4_body: "Full Compliance Passport — AFIP, SENASA, ROE Verde, destination customs (EU / US / CN) — tracked live.",

    // ===== CTA BAND =====
    cta_title: "Ready to trade?",
    cta_body: "Join 1,840+ verified Argentine sellers and overseas buyers. Get matched on price, run negotiations and contracts, settle through trade-finance partners — all in one place.",
    cta_create: "Create free account",
    cta_talk: "Talk to a manager",

    // ===== FOOTER =====
    footer_platform: "Platform",
    footer_company: "Company",
    footer_contracts_settle: "Contracts & settlement",
    footer_logistics: "Logistics partners",
    footer_careers: "Careers",
    footer_press: "Press",

    // ===== MARKET INTELLIGENCE PAGE =====
    mi_hero_eyebrow: "Updated continuously · Buenos Aires desk",
    mi_hero_h1: "Market Intelligence",
    mi_hero_body: "Weekly briefs, compliance alerts, origin spotlights and macro commentary on Argentina's agri-commodity complex — all in one feed.",
    mi_stat_live: "Live posts",
    mi_stat_coverage: "Coverage areas",
    mi_stat_today: "Updated today",
    mi_eyebrow_week: "This week",
    mi_featured_h: "Top of the desk",
    mi_featured_sub: "The latest Weekly Brief — what our Buenos Aires traders are watching now.",
    mi_eyebrow_all: "All posts",
    mi_feed_h: "The feed",
    mi_gen_weekly: "📈 Weekly Brief",
    mi_gen_compliance: "⚖️ Compliance",
    mi_gen_origin: "📍 Origin Spotlight",
    mi_gen_logistics: "🚢 Logistics & Ports",
    mi_gen_fx: "💱 FX & Macro",
    mi_gen_weather: "🌦 Weather & Crop",
    mi_gen_btn: "Generate brief",
    mi_foot_back: "← Back to marketplace",
    mi_nav_marketplace: "Marketplace",
    mi_nav_how: "How it works",
    mi_nav_compliance: "Compliance",
    mi_nav_mi: "Market Intelligence",

    // ===== BUYER TABLE =====
    th_passport: "Passport",

    // ===== SELLER MODAL / PROFILE =====
    seller_company_info: "Company Information",
    seller_verif_docs: "Verification Documents",
    seller_add_listing_title: "Add new product listing",
    seller_prod_name: "Product name",
    seller_prod_name_ph: "e.g. Winter Wheat, Grade #2",
    seller_type: "Type",
    seller_category: "Category",
    seller_country_origin: "Country of origin",
    seller_vol_range: "Volume range (MT/month)",
    seller_price_min: "Price min (USD/MT)",
    seller_price_max: "Price max (USD/MT)",
    seller_terms: "Delivery terms",
    seller_specs: "Specifications",
    seller_specs_ph: "Protein %, moisture %, etc.",
    seller_boost: "Boost campaign",
    seller_perf_sub: "12 active listings · 47 inquiries in the last 7 days · 5 contracts in flight"
  },

  es: {
    // ===== NAV =====
    nav_how: "Cómo funciona",
    nav_compliance: "Cumplimiento",
    nav_about: "Acerca de",
    nav_ask: "Consultar gestor",
    nav_signin: "INICIAR SESIÓN",
    nav_register: "Registrarse",

    // ===== HERO =====
    hero_title: "El mercado argentino de granos, online",
    hero_subtitle: "Directo de Rosario, Bª Blanca, Córdoba y Mendoza — a tu puerto",
    hero_categories: "CATEGORÍAS",
    hero_buy: "COMPRAR",
    hero_sell: "VENDER",
    hero_search_placeholder: "¿Qué estás buscando?",

    // ===== PROMOS =====
    promo_global_title: "Accede al mercado global",
    promo_global_free: "gratis",
    promo_global_body: "Únete y obtén acceso gratuito durante 6 meses para comprar y vender materias primas en todo el mundo.",
    promo_register: "REGISTRARSE",
    promo_field_title: "Del campo a tu almacén, directo de productores en todo el mundo",
    promo_howitworks: "CÓMO FUNCIONA",

    // ===== FEATURES =====
    feat1_title: "Acceso Global a Materias Primas",
    feat1_body: "Busca en nuestra base de datos productos agrícolas que se venden en todo el mundo.",
    feat2_title: "Mayor Transparencia",
    feat2_body: "Todos nuestros clientes deben superar nuestro proceso de cumplimiento KYC para obtener acceso completo a la plataforma.",
    feat3_title: "Compra en Origen",
    feat3_body: "Negocia un mejor precio directamente con el productor.",
    feat4_title: "Nuevo Estándar de Comunicación",
    feat4_body: "Con nuestra mensajería en tiempo real y sistema de gestión de contratos, puedes negociar cada paso de una transacción sin hacer una sola llamada.",
    feat5_title: "Gestor de Cuenta Personal",
    feat5_body: "Asignamos a cada cliente un gestor personal que ofrece soporte sobre el uso de la plataforma.",
    feat6_title: "Expande Mercados",
    feat6_body: "Encuentra nuevos compradores y vendedores para tus productos y diversifica tu cartera de clientes.",

    // ===== PRODUCTS SECTION =====
    recent_products: "Productos añadidos recientemente",
    available: "disponibles",
    per_month: "/mes",
    per_mt: "/ TM",
    ships: "envío",
    badge_new: "NUEVO",
    badge_verified: "VERIFICADO",
    badge_hot: "TOP",

    // ===== FOOTER =====
    footer_subscribe_title: "Suscríbete para recibir las novedades",
    footer_email_placeholder: "Email para el boletín",
    footer_subscribe_btn: "SUSCRIBIRSE",
    footer_home: "Inicio",
    footer_about: "Acerca de",
    footer_how: "Cómo funciona",
    footer_compliance: "Cumplimiento",
    footer_terms: "Términos del Servicio",
    footer_privacy: "Política de Privacidad",
    footer_support: "Soporte",
    footer_faq: "Preguntas frecuentes",

    // ===== AUTH MODAL =====
    auth_welcome: "Bienvenido de nuevo",
    auth_welcome_sub: "Inicia sesión para acceder a tu panel",
    auth_join: "Únete a AgriMarket",
    auth_join_sub: "Crea tu cuenta en menos de 2 minutos",
    auth_signin_tab: "INICIAR SESIÓN",
    auth_register_tab: "REGISTRARSE",
    auth_i_am: "Soy un",
    auth_buyer: "Comprador",
    auth_seller: "Vendedor",
    auth_admin: "Administrador",
    auth_first: "Nombre",
    auth_last: "Apellido",
    auth_company: "Empresa",
    auth_email: "Correo electrónico",
    auth_password: "Contraseña",
    auth_submit_signin: "Acceder al panel",
    auth_submit_register: "Crear cuenta",
    auth_footer_signin: "¿Nuevo en AgriMarket?",
    auth_footer_register: "¿Ya tienes una cuenta?",
    auth_create: "Crear una cuenta",
    auth_signin_link: "Iniciar sesión",

    // ===== CATEGORIES =====
    cat_grains: "Granos",
    cat_oilseeds: "Oleaginosas",
    cat_pulses: "Legumbres",
    cat_oils: "Aceites comestibles",
    cat_soft: "Materias blandas",
    cat_feed: "Alimento animal",
    cat_spices: "Especias y hierbas",
    cat_browse_all: "Ver todas las categorías",
    cat_see_all: "Ver todo",

    // ===== DASHBOARDS – COMMON =====
    dash_my_products: "Mis productos",
    dash_messages: "Mensajes",
    dash_contracts: "Contratos",
    dash_profile: "Perfil",
    dash_browse: "Explorar",
    dash_my_contracts: "Mis Contratos",
    dash_saved: "Guardados",
    dash_post_buy: "+ Publicar solicitud",
    dash_add_product: "+ Añadir producto",

    // ===== SELLER STATS =====
    stat_active_listings: "Anuncios activos",
    stat_inquiries: "Consultas",
    stat_open_contracts: "Contratos abiertos",
    stat_total_volume: "Volumen total vendido",
    stat_this_week: "esta semana",
    stat_awaiting_sig: "pendientes de firma",
    stat_ytd: "YTD",

    // ===== TABLE HEADERS =====
    th_product: "Producto",
    th_type: "Tipo",
    th_country: "País",
    th_price: "Precio, USD/TM",
    th_volume: "Volumen, TM",
    th_delivery: "Entrega",
    th_inquiries: "Consultas",
    th_updated: "Actualizado",
    th_action: "Acción",
    th_id: "ID",
    th_status: "Estado",
    th_partner: "Contraparte",
    th_period: "Periodo",
    th_destination: "Destino del envío",
    th_basis: "Incoterm",
    th_origin: "Origen",
    th_company: "Empresa",
    th_volume_short: "Volumen",
    th_price_short: "Precio",

    // ===== STATUSES =====
    status_new: "Nuevo",
    status_signed: "Firmado",
    status_settled: "Liquidado",
    status_progress: "En curso",
    status_terminated: "Cancelado",
    status_open: "Abierto",
    status_closed: "Cerrado",
    status_awarded: "Adjudicado",
    status_cancelled: "Cancelado",

    // ===== ACTIONS =====
    act_edit: "Editar",
    act_pause: "Pausar",
    act_view: "Ver",
    act_review: "Revisar",
    act_contact: "Contactar",
    act_save: "Guardar",
    act_send_inquiry: "Enviar consulta",
    act_request_quote: "Solicitar cotización",
    act_cancel: "Cancelar",
    act_save_changes: "Guardar cambios",
    act_export_csv: "Exportar CSV",
    act_new_contract: "Nuevo contrato",
    act_export: "Exportar",
    act_publish: "Publicar anuncio",

    // ===== TABS =====
    tab_all: "Todos",

    // ===== BUYER BROWSE =====
    browse_origin: "ORIGEN",
    browse_volume: "VOLUMEN",
    browse_price: "PRECIO",
    browse_basis: "INCOTERM",
    browse_delivery: "PERIODO DE ENTREGA",
    browse_results: "RESULTADOS",
    browse_clear: "Limpiar filtros",

    // ===== ADMIN =====
    admin_dashboard: "Panel",
    admin_users: "Gestionar usuarios",
    admin_companies: "Gestionar empresas",
    admin_products: "Gestionar productos",
    admin_tenders: "Gestionar licitaciones",
    admin_admin_contracts: "Gestionar contratos",
    admin_messaging: "Mensajería",
    admin_support: "Tickets de soporte",
    admin_compliance: "Cumplimiento",
    admin_sales: "Gestores comerciales",
    admin_admins: "Administradores",
    admin_section_ops: "Operaciones",
    admin_section_comm: "Comunicaciones",
    admin_section_team: "Equipo",
    admin_listings: "Anuncios",
    admin_customers: "Clientes",
    admin_kyc_pending: "KYC pendiente",
    admin_total_companies: "Empresas totales",
    admin_recent: "Actividad reciente",
    admin_top_countries: "Países por volumen",
    admin_invite: "+ Invitar usuario",

    // ===== PROFILE =====
    profile_personal: "Información personal",
    profile_company: "Información de la empresa",
    profile_verification: "Documentos de verificación",
    profile_preferences: "Preferencias de compra",
    profile_verified_seller: "✓ Vendedor verificado",
    profile_verified_buyer: "✓ Comprador verificado",
    profile_approved: "✓ Aprobado",
    profile_under_review: "⏳ En revisión",
    profile_rejected: "✕ Rechazado",

    // ===== DETAIL DRAWER =====
    detail_listing_id: "ID del anuncio",
    detail_posted: "Publicado",
    detail_days_ago: "días",
    detail_active: "Activo",
    detail_volume_range: "Rango de volumen",
    detail_specs: "Especificaciones del producto",
    detail_description: "Descripción",
    detail_delivery: "Entrega",
    detail_window: "Ventana de entrega",
    detail_dest_port: "Puerto de destino",
    detail_shipment: "Tipo de envío",
    detail_payment: "Condiciones de pago",
    detail_seller: "Vendedor",
    detail_listed_by: "Publicado por",
    detail_on_time: "Entrega puntual",
    detail_rating: "Valoración media",
    detail_trades: "Operaciones completadas",
    detail_basis_avail: "Incoterms disponibles",
    detail_inquiries: "consultas",
    detail_views: "vistas",
    detail_edit_listing: "Editar anuncio",
    detail_view_inquiries: "Ver consultas",

    // ===== CHAT =====
    chat_messages: "Mensajes",
    chat_clients: "Clientes",
    chat_conversations: "Conversaciones",
    chat_other_clients: "Otros clientes",
    chat_send: "Enviar",
    chat_type_msg: "Escribe un mensaje...",
    chat_view_files: "Ver archivos",
    chat_contract_details: "Detalles del contrato",

    // ===== DEMO BANNER =====
    demo_banner_seller: "Estás viendo la demo del <strong>Vendedor</strong>. Cambiar de rol:",
    demo_banner_buyer: "Estás viendo la demo del <strong>Comprador</strong>. Cambiar de rol:",
    demo_banner_admin: "Estás viendo la demo del <strong>Administrador</strong>. Cambiar de rol:",
    demo_landing: "Inicio",
    demo_seller: "Vendedor",
    demo_buyer: "Comprador",
    demo_admin: "Administrador",

    // ===== COMPLIANCE PASSPORT =====
    passport_title: "Pasaporte de Cumplimiento",
    passport_sub: "Compuertas de origen (Argentina) + superposiciones de destino para UE, EE.UU. y China. Una fuente de verdad, actualizada en vivo.",
    passport_export: "Exportar PDF de auditoría",
    passport_new_shipment: "+ Nuevo envío",
    passport_pipeline: "Pipeline de cumplimiento — origen + destino",
    passport_live: "EN VIVO",
    passport_fixes_clear: "✓ Sin problemas. Este envío superó todas las compuertas.",
    passport_fixes_pending: "✓ Sin problemas bloqueantes. Las compuertas pendientes se completarán automáticamente al llegar al SLA.",
    passport_services_title: "Certificadores y servicios",
    passport_services_lede: "Inspectores y laboratorios acreditados. Reserva en línea — los resultados van directamente al expediente de evidencia de la compuerta correspondiente.",
    passport_services_catalog: "Ver catálogo completo →",
    passport_origin_gates: "Cumplimiento de origen — Argentina · 6 compuertas",
    passport_origin_blurb: "AFIP, SENASA y ROE Verde. Presentado en origen, antes del B/L.",
    passport_audit_title: "Registro de auditoría en vivo",
    passport_audit_sub: "sincronización automática con AFIP, SENASA, terminal, naviera y aduana de destino",
    passport_book: "Reservar servicio",
    passport_details: "Detalles",
    passport_copilot_greeting: "Hola — soy el Copiloto de Cumplimiento. Leo el pasaporte de este envío y los artículos del equipo de cumplimiento de AgriMarket.",
    passport_copilot_placeholder: "Pregunta sobre un reglamento, compuerta o solución…",

    // ===== MARKET INTELLIGENCE =====
    mi_title: "Inteligencia de Mercado",
    mi_featured: "Destacado del día",
    mi_feed: "El feed",
    mi_filter_all: "Todos",
    mi_filter_compliance: "Cumplimiento",
    mi_filter_market: "Mercado",
    mi_filter_origin: "Enfoque en origen",
    mi_filter_brief: "Resumen semanal",
    mi_read_more: "Leer más →",
    mi_min_read: "min de lectura",

    // ===== SEARCH =====
    search_placeholder: "Buscar materias primas, orígenes, vendedores…",
    search_results_for: "Resultados para",
    search_no_results: "No se encontraron anuncios. Prueba con otro término.",
    search_filters: "Filtros",
    search_reset: "Restablecer filtros",

    // ===== CATEGORIES (missing) =====
    cat_peanuts: "Maníes y Legumbres",
    cat_beef: "Carne y Proteína",
    cat_wine: "Vino y Mosto",
    cat_citrus: "Cítricos y Frutas",
    cat_dairy: "Lácteos y Miel",

    // ===== INDEX SECTIONS =====
    sec_featured: "Anuncios destacados",
    sec_featured_sub: "ofertas de venta en vivo · actualizadas en tiempo real",
    sec_regions: "Explorar por región",
    sec_regions_sub: "Origen argentino — haz clic para filtrar por provincia",
    sec_how: "Cómo funciona",
    sec_market_intel: "Inteligencia de mercado",
    sec_market_intel_sub: "Alertas de cumplimiento, enfoque en origen y resúmenes de comercio — directo de Buenos Aires",
    sec_market_link: "Ver todos los artículos →",

    // ===== HOW IT WORKS =====
    hiw_1_title: "Encuentra el producto adecuado",
    hiw_1_body: "Busca por materia prima, origen, precio o condiciones de entrega. Filtra por provincia, Incoterms y ventana de envío.",
    hiw_2_title: "Conecta y negocia",
    hiw_2_body: "Abre un hilo directamente con el vendedor. Sin intermediarios. Términos contractuales asistidos por IA basados en cláusulas GAFTA.",
    hiw_3_title: "Firma y opera",
    hiw_3_body: "Firma electrónica mediante contratos vinculados a DocuSign. Socios de financiamiento comercial y logística disponibles al cerrar.",
    hiw_4_title: "Cumplimiento y logística",
    hiw_4_body: "Pasaporte de Cumplimiento completo — AFIP, SENASA, ROE Verde, aduana de destino (UE / EE.UU. / CN) — seguimiento en vivo.",

    // ===== CTA BAND =====
    cta_title: "¿Listo para operar?",
    cta_body: "Únete a más de 1.840 vendedores argentinos verificados y compradores internacionales. Emparéjate por precio, negocia contratos y liquida con socios de financiamiento comercial — todo en un solo lugar.",
    cta_create: "Crear cuenta gratis",
    cta_talk: "Hablar con un gestor",

    // ===== FOOTER =====
    footer_platform: "Plataforma",
    footer_company: "Empresa",
    footer_contracts_settle: "Contratos y liquidación",
    footer_logistics: "Socios logísticos",
    footer_careers: "Empleo",
    footer_press: "Prensa",

    // ===== MARKET INTELLIGENCE PAGE =====
    mi_hero_eyebrow: "Actualización continua · Escritorio de Buenos Aires",
    mi_hero_h1: "Inteligencia de Mercado",
    mi_hero_body: "Resúmenes semanales, alertas de cumplimiento, enfoques de origen y análisis macro del complejo de materias primas agrícolas de Argentina — todo en un feed.",
    mi_stat_live: "Artículos activos",
    mi_stat_coverage: "Áreas de cobertura",
    mi_stat_today: "Actualizados hoy",
    mi_eyebrow_week: "Esta semana",
    mi_featured_h: "Destacado del día",
    mi_featured_sub: "El último resumen semanal — lo que nuestros operadores en Buenos Aires están siguiendo ahora.",
    mi_eyebrow_all: "Todos los artículos",
    mi_feed_h: "El feed",
    mi_gen_weekly: "📈 Resumen semanal",
    mi_gen_compliance: "⚖️ Cumplimiento",
    mi_gen_origin: "📍 Enfoque en origen",
    mi_gen_logistics: "🚢 Logística y puertos",
    mi_gen_fx: "💱 FX y macro",
    mi_gen_weather: "🌦 Clima y cosecha",
    mi_gen_btn: "Generar resumen",
    mi_foot_back: "← Volver al mercado",
    mi_nav_marketplace: "Mercado",
    mi_nav_how: "Cómo funciona",
    mi_nav_compliance: "Cumplimiento",
    mi_nav_mi: "Inteligencia de Mercado",

    // ===== BUYER TABLE =====
    th_passport: "Pasaporte",

    // ===== SELLER MODAL / PROFILE =====
    seller_company_info: "Información de la empresa",
    seller_verif_docs: "Documentos de verificación",
    seller_add_listing_title: "Añadir nuevo anuncio",
    seller_prod_name: "Nombre del producto",
    seller_prod_name_ph: "p.ej. Trigo de invierno, Grado #2",
    seller_type: "Tipo",
    seller_category: "Categoría",
    seller_country_origin: "País de origen",
    seller_vol_range: "Rango de volumen (TM/mes)",
    seller_price_min: "Precio mínimo (USD/TM)",
    seller_price_max: "Precio máximo (USD/TM)",
    seller_terms: "Condiciones de entrega",
    seller_specs: "Especificaciones",
    seller_specs_ph: "Proteína %, humedad %, etc.",
    seller_boost: "Campaña de impulso",
    seller_perf_sub: "12 anuncios activos · 47 consultas en los últimos 7 días · 5 contratos en curso"
  }
};

function getLang() {
  return localStorage.getItem('agrimarket_lang') || 'en';
}

function setLang(lang) {
  if (!I18N[lang]) lang = 'en';
  localStorage.setItem('agrimarket_lang', lang);
  applyLang();
  // Notify listeners (for dynamic UI like dropdowns to re-render)
  document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
}

function applyLang() {
  const lang = getLang();
  const dict = I18N[lang];

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) el.textContent = dict[key];
  });

  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (dict[key] !== undefined) el.innerHTML = dict[key];
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key] !== undefined) el.setAttribute('placeholder', dict[key]);
  });

  // Update lang switcher displays
  document.querySelectorAll('[data-lang-display]').forEach(el => {
    el.textContent = lang.toUpperCase();
  });
  document.querySelectorAll('[data-lang-pick]').forEach(el => {
    el.classList.toggle('active', el.getAttribute('data-lang-pick') === lang);
  });

  document.documentElement.setAttribute('lang', lang);
}

// Helper for translating a key directly (use in dynamic JS)
function t(key) {
  return (I18N[getLang()] || I18N.en)[key] || key;
}

document.addEventListener('DOMContentLoaded', applyLang);
