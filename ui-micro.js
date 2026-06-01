/* ================================================================
   AgriMarket — UI Micro-interactions v1.0
   Ripple on click · button loading helpers · input char-count
   Load at bottom of <body> on every page (after other scripts)
   ================================================================ */
(function () {
  'use strict';

  /* ——— RIPPLE ——— */
  function addRipple(e) {
    const btn = e.currentTarget;
    // remove stale ripples
    btn.querySelectorAll('.ripple').forEach(r => r.remove());
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.6;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top  - size / 2;
    const span = document.createElement('span');
    span.className = 'ripple';
    span.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px;`;
    btn.appendChild(span);
    span.addEventListener('animationend', () => span.remove());
  }

  function wireRipples() {
    document.querySelectorAll(
      '.btn-primary, .btn-outline, .btn-sm'
    ).forEach(btn => {
      if (btn.dataset.ripple) return; // already wired
      btn.dataset.ripple = '1';
      btn.addEventListener('click', addRipple);
    });
  }

  /* ——— PUBLIC HELPERS ——— */
  /* window.btnLoad(el)   — show spinner on a button */
  /* window.btnDone(el)   — restore it */
  window.btnLoad = function (el) {
    if (!el) return;
    el._origText = el.innerHTML;
    el.classList.add('btn-loading');
    el.disabled = true;
  };
  window.btnDone = function (el) {
    if (!el) return;
    el.classList.remove('btn-loading');
    el.disabled = false;
    if (el._origText !== undefined) { el.innerHTML = el._origText; delete el._origText; }
  };

  /* ——— GLOBAL TOAST ——— */
  window.agriToast = function (msg, type) {
    // type: 'success' | 'error' | 'info'
    const colors = { success: '#047857', error: '#b91c1c', info: '#1d4ed8' };
    const bg = colors[type] || colors.info;
    const t = document.createElement('div');
    t.style.cssText = `
      position:fixed;bottom:28px;left:50%;transform:translateX(-50%) translateY(6px);
      background:${bg};color:#fff;padding:12px 28px;border-radius:6px;
      font-size:13px;font-weight:500;z-index:99999;
      box-shadow:0 8px 28px rgba(0,0,0,0.18);
      opacity:0;transition:opacity 0.22s,transform 0.22s;
      white-space:nowrap;pointer-events:none;letter-spacing:0.2px;
    `;
    t.textContent = msg;
    document.body.appendChild(t);
    requestAnimationFrame(() => {
      t.style.opacity = '1';
      t.style.transform = 'translateX(-50%) translateY(0)';
    });
    setTimeout(() => {
      t.style.opacity = '0';
      t.style.transform = 'translateX(-50%) translateY(6px)';
      setTimeout(() => t.remove(), 260);
    }, 2800);
  };

  /* ——— NAV SCROLL SHADOW ——— */
  (function () {
    const nav = document.querySelector('.gnav, .lnav, nav.nav');
    if (!nav) return;
    const update = () => {
      nav.style.boxShadow = window.scrollY > 4
        ? '0 2px 16px rgba(0,0,0,0.14)'
        : '';
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
  })();

  /* ——— PAGE-IN ANIMATION on main content ——— */
  (function () {
    const hero = document.querySelector('.hero-section, .alt-shell, .cp-wrap, .mi-wrap, .sr-wrap');
    if (!hero) return;
    hero.style.opacity = '0';
    hero.style.transform = 'translateY(6px)';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        hero.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
        hero.style.opacity   = '1';
        hero.style.transform = 'translateY(0)';
      });
    });
  })();

  /* ——— INPUT FOCUS CLASS (adds .is-focused to parent .form-field) ——— */
  document.querySelectorAll('.form-field input, .form-field select, .form-field textarea')
    .forEach(el => {
      el.addEventListener('focus', () => el.closest('.form-field')?.classList.add('is-focused'));
      el.addEventListener('blur',  () => el.closest('.form-field')?.classList.remove('is-focused'));
    });

  /* ——— LIVE CHIP COUNT BADGE on filter chips ——— */
  /* already handled by render functions — no-op */

  /* ——— FAV BUTTON: emit agriToast on save/unsave ——— */
  document.addEventListener('click', function (e) {
    const fav = e.target.closest('.listing-fav');
    if (!fav) return;
    const saved = fav.classList.contains('saved');
    // Toast fires after toggleFav runs (next tick)
    setTimeout(() => {
      const isSaved = fav.classList.contains('saved');
      agriToast(isSaved ? '♥ Saved to favourites' : 'Removed from favourites',
        isSaved ? 'success' : 'info');
    }, 50);
  });

  /* ——— WIRE ripples on initial load then on DOM changes ——— */
  wireRipples();
  if (typeof MutationObserver !== 'undefined') {
    new MutationObserver(wireRipples).observe(document.body, { childList: true, subtree: true });
  }

  /* ——— KEYBOARD: Escape closes any open drawer/modal ——— */
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    // index.html drawers
    if (typeof closePD   === 'function') closePD();
    if (typeof closeAuth === 'function') closeAuth();
    // booking drawer
    if (typeof closeBooking === 'function') closeBooking();
    // shared drawer
    if (typeof closeDrawer === 'function') closeDrawer();
  });

  /* ——— ENTER key submits search bar ——— */
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter') return;
    const inp = e.target;
    if (inp.id === 'heroSearch' && typeof doSearch === 'function') doSearch();
  });

})();
