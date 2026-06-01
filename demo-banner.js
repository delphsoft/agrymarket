/* AgriAlternative — floating demo navigator
   Replaces the sticky banner with a discreet corner pill.
   Click the pill → popover with page links. Click outside → closes. */
(function () {
  const PAGES = [
    { label: 'Landing',      url: 'index.html',                  icon: '🏠' },
    { label: 'Buyer',        url: 'buyer.html',                  icon: '🛒' },
    { label: 'Seller',       url: 'seller.html',                 icon: '📦' },
    { label: 'Admin',        url: 'admin.html',                  icon: '⚙️' },
    { label: 'Compliance',   url: 'compliance-passport.html',    icon: '🛂' },
    { label: 'Market Intel', url: 'market-intelligence.html',    icon: '📊' },
    { label: 'Search',       url: 'search-results.html',         icon: '🔍' },
    { label: 'Region',       url: 'region.html?region=cordoba',  icon: '📍' }
  ];

  const current = location.pathname.split('/').pop() || 'index.html';

  /* ── styles ────────────────────────────────────────────────── */
  const style = document.createElement('style');
  style.textContent = `
    #dm-pill {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 99999;
      display: flex;
      align-items: center;
      gap: 7px;
      background: #0f1729;
      color: #00d2d2;
      border: 1px solid rgba(0,210,210,0.35);
      border-radius: 999px;
      padding: 8px 16px 8px 12px;
      font-family: 'Roboto', system-ui, sans-serif;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      cursor: pointer;
      box-shadow: 0 4px 24px rgba(0,0,0,0.45);
      user-select: none;
      transition: box-shadow 0.2s, transform 0.15s;
    }
    #dm-pill:hover {
      box-shadow: 0 6px 32px rgba(0,210,210,0.25);
      transform: translateY(-1px);
    }
    #dm-pill .dm-dot {
      width: 7px; height: 7px;
      border-radius: 50%;
      background: #00d2d2;
      box-shadow: 0 0 6px #00d2d2;
      flex-shrink: 0;
    }

    #dm-popover {
      position: fixed;
      bottom: 68px;
      right: 24px;
      z-index: 99998;
      background: #0f1729;
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 14px;
      padding: 10px 8px;
      box-shadow: 0 12px 48px rgba(0,0,0,0.6);
      min-width: 200px;
      transform-origin: bottom right;
      transform: scale(0.92) translateY(8px);
      opacity: 0;
      pointer-events: none;
      transition: transform 0.18s cubic-bezier(.34,1.56,.64,1), opacity 0.15s;
    }
    #dm-popover.open {
      transform: scale(1) translateY(0);
      opacity: 1;
      pointer-events: all;
    }
    #dm-popover .dm-heading {
      font-family: 'Roboto', system-ui, sans-serif;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.35);
      padding: 4px 10px 8px;
    }
    #dm-popover a {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 9px 12px;
      border-radius: 8px;
      font-family: 'Roboto', system-ui, sans-serif;
      font-size: 13px;
      font-weight: 500;
      color: rgba(255,255,255,0.78);
      text-decoration: none;
      transition: background 0.12s, color 0.12s;
    }
    #dm-popover a:hover {
      background: rgba(255,255,255,0.08);
      color: #fff;
    }
    #dm-popover a.active {
      background: rgba(37,99,235,0.55);
      color: #fff;
      font-weight: 600;
    }
    #dm-popover a .dm-icon {
      width: 22px;
      text-align: center;
      font-size: 14px;
      flex-shrink: 0;
    }
    #dm-popover .dm-divider {
      height: 1px;
      background: rgba(255,255,255,0.07);
      margin: 6px 10px;
    }
  `;
  document.head.appendChild(style);

  /* ── pill ───────────────────────────────────────────────────── */
  const pill = document.createElement('div');
  pill.id = 'dm-pill';
  pill.innerHTML = `<span class="dm-dot"></span>Demo`;

  /* ── popover ────────────────────────────────────────────────── */
  const pop = document.createElement('div');
  pop.id = 'dm-popover';
  pop.innerHTML = `
    <div class="dm-heading">Navigate demo</div>
    ${PAGES.map((p, i) => {
      const pageName = p.url.split('?')[0];
      const isActive = current === pageName || (current === '' && pageName === 'index.html');
      const divider  = (i === 3) ? '<div class="dm-divider"></div>' : '';
      return `${divider}<a href="${p.url}" class="${isActive ? 'active' : ''}">
        <span class="dm-icon">${p.icon}</span>${p.label}
      </a>`;
    }).join('')}
  `;

  document.body.appendChild(pop);
  document.body.appendChild(pill);

  /* ── toggle logic ───────────────────────────────────────────── */
  pill.addEventListener('click', function (e) {
    e.stopPropagation();
    pop.classList.toggle('open');
  });

  document.addEventListener('click', function () {
    pop.classList.remove('open');
  });

  pop.addEventListener('click', function (e) {
    e.stopPropagation();
  });
})();
