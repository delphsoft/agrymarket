/**
 * AgriAlternative — Client-side security hardening
 * Deters casual scraping, right-click inspection, and devtools shortcuts.
 * NOTE: This is a deterrent layer, not a cryptographic guarantee.
 *       A determined developer can always bypass client-side JS.
 */

(function () {
  'use strict';

  /* ── 1. Disable right-click context menu ─────────────────────────── */
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    return false;
  });

  /* ── 2. Block common keyboard shortcuts ──────────────────────────── */
  document.addEventListener('keydown', function (e) {
    const ctrl  = e.ctrlKey  || e.metaKey;
    const shift = e.shiftKey;
    const key   = e.key;

    // Ctrl/Cmd + U  → view source
    // Ctrl/Cmd + S  → save page
    // Ctrl/Cmd + A  → select all
    // Ctrl/Cmd + C  → copy (allow inside inputs)
    // Ctrl/Cmd + Shift + I / J / C → DevTools panels
    // Ctrl/Cmd + Shift + C → element inspector
    // F12           → DevTools toggle
    if (
      (ctrl && key === 'u') ||
      (ctrl && key === 's') ||
      (ctrl && key === 'a' && !['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName)) ||
      (ctrl && shift && (key === 'I' || key === 'i')) ||
      (ctrl && shift && (key === 'J' || key === 'j')) ||
      (ctrl && shift && (key === 'C' || key === 'c')) ||
      (ctrl && shift && (key === 'K' || key === 'k')) ||
      key === 'F12'
    ) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }, true);

  /* ── 3. Disable drag-to-select on non-interactive elements ──────── */
  document.addEventListener('selectstart', function (e) {
    const tag = e.target?.tagName;
    if (!['INPUT','TEXTAREA'].includes(tag)) {
      e.preventDefault();
    }
  });

  /* ── 4. Disable image drag ───────────────────────────────────────── */
  document.addEventListener('dragstart', function (e) {
    if (e.target.tagName === 'IMG') {
      e.preventDefault();
    }
  });

  /* ── 5. DevTools open detection (timing-based) ───────────────────── */
  let devtoolsOpen = false;
  const threshold  = 160; // px — DevTools panel is usually wider/taller

  function checkDevTools() {
    const widthGap  = window.outerWidth  - window.innerWidth;
    const heightGap = window.outerHeight - window.innerHeight;
    if (widthGap > threshold || heightGap > threshold) {
      if (!devtoolsOpen) {
        devtoolsOpen = true;
        // Soft response: blur content, show warning overlay
        showDevToolsWarning();
      }
    } else {
      if (devtoolsOpen) {
        devtoolsOpen = false;
        hideDevToolsWarning();
      }
    }
  }

  setInterval(checkDevTools, 1000);

  function showDevToolsWarning() {
    if (document.getElementById('__sec-overlay')) return;
    const overlay = document.createElement('div');
    overlay.id = '__sec-overlay';
    overlay.style.cssText = [
      'position:fixed', 'inset:0', 'z-index:999999',
      'background:rgba(10,10,10,0.92)', 'backdrop-filter:blur(6px)',
      'display:flex', 'flex-direction:column',
      'align-items:center', 'justify-content:center',
      'color:#fff', 'font-family:system-ui,sans-serif',
      'text-align:center', 'padding:40px'
    ].join(';');
    overlay.innerHTML = `
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="1.5" style="margin-bottom:20px">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874
          1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898
          0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"/>
      </svg>
      <h2 style="margin:0 0 10px;font-size:22px;font-weight:600">Unauthorised access detected</h2>
      <p style="margin:0;opacity:.7;max-width:400px;font-size:15px;line-height:1.6">
        Developer tools are not permitted on this platform.<br>
        Close DevTools to continue.
      </p>`;
    document.body.appendChild(overlay);
  }

  function hideDevToolsWarning() {
    const overlay = document.getElementById('__sec-overlay');
    if (overlay) overlay.remove();
  }

  /* ── 6. Console warning for curious developers ───────────────────── */
  const warn = [
    '%cAgriAlternative — Security Notice',
    'color:#f59e0b;font-size:18px;font-weight:bold'
  ];
  const msg = [
    '%cThis is a proprietary platform. Unauthorised scraping, reverse-engineering\nor redistribution of content is prohibited under applicable law.',
    'color:#aaa;font-size:13px'
  ];
  setTimeout(function () {
    console.clear();
    console.log(...warn);
    console.log(...msg);
  }, 500);

  /* ── 7. Block clipboard copy of selected text ───────────────────── */
  document.addEventListener('copy', function (e) {
    const active = document.activeElement?.tagName;
    if (!['INPUT','TEXTAREA'].includes(active)) {
      e.preventDefault();
      e.clipboardData?.setData('text/plain', '');
    }
  });

  /* ── 8. Honeypot bot detection ───────────────────────────────────── */
  // Bots often fire mousemove immediately on load with (0,0)
  // Real users have varied first-touch coordinates.
  let humanSignal = false;
  document.addEventListener('mousemove', function handler(e) {
    if (e.clientX > 5 || e.clientY > 5) {
      humanSignal = true;
      document.removeEventListener('mousemove', handler);
    }
  });

  // After 4 s with no human signal, log suspicious session
  setTimeout(function () {
    if (!humanSignal) {
      // In production: POST to your analytics / ban endpoint
      console.warn('[AgriAlternative] Non-human session flagged.');
    }
  }, 4000);

})();
