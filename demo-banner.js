/* AgriMarket — demo banner (shared component)
   Usage: <script src="demo-banner.js"></script>
   Injects a sticky demo banner at the top of any page. */
(function() {
  const PAGES = [
    { label: 'Landing',    url: 'index.html' },
    { label: 'Buyer',      url: 'buyer.html' },
    { label: 'Seller',     url: 'seller.html' },
    { label: 'Admin',      url: 'admin.html' },
    { label: 'Compliance', url: 'compliance-passport.html' },
    { label: 'Market Intel', url: 'market-intelligence.html' },
    { label: 'Search',     url: 'search-results.html' },
    { label: 'Region',     url: 'region.html?region=cordoba' }
  ];

  const current = location.pathname.split('/').pop() || 'index.html';

  const style = document.createElement('style');
  style.textContent = `
    .demo-banner {
      background: #0f1729; color: rgba(255,255,255,0.88);
      font-family: 'Roboto', sans-serif; font-size: 12px;
      display: flex; align-items: center; gap: 12px;
      padding: 0 20px; height: 36px; flex-wrap: nowrap; overflow-x: auto;
      position: sticky; top: 0; z-index: 9000;
      border-bottom: 1px solid rgba(255,255,255,0.06);
      scrollbar-width: none;
    }
    .demo-banner::-webkit-scrollbar { display: none; }
    .demo-banner .db-label {
      font-size: 10px; font-weight: 700; letter-spacing: 1.5px;
      text-transform: uppercase; color: #00d2d2; white-space: nowrap; flex-shrink: 0;
    }
    .demo-banner .db-sep { width: 1px; background: rgba(255,255,255,0.15); height: 16px; flex-shrink: 0; }
    .demo-banner a.db-link {
      color: rgba(255,255,255,0.75); text-decoration: none; white-space: nowrap;
      padding: 4px 10px; border-radius: 4px; font-weight: 500; transition: all 0.15s;
    }
    .demo-banner a.db-link:hover { color: #fff; background: rgba(255,255,255,0.1); }
    .demo-banner a.db-link.active {
      background: rgba(37,99,235,0.8); color: #fff; font-weight: 600;
    }
  `;
  document.head.appendChild(style);

  const bar = document.createElement('div');
  bar.className = 'demo-banner';
  bar.innerHTML = `
    <span class="db-label">Demo</span>
    <div class="db-sep"></div>
    ${PAGES.map(p => {
      const pageName = p.url.split('?')[0];
      const isActive = current === pageName || (current === '' && pageName === 'index.html');
      return `<a class="db-link${isActive ? ' active' : ''}" href="${p.url}">${p.label}</a>`;
    }).join('')}
  `;

  document.body.insertBefore(bar, document.body.firstChild);
})();
