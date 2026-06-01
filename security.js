/**
 * AgriAlternative — Client-side security hardening
 */
(function () {
  'use strict';

  /* ── 1. Disable right-click context menu ─────────────────────────── */
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    return false;
  });

  /* ── 2. Block common keyboard inspection shortcuts ───────────────── */
  document.addEventListener('keydown', function (e) {
    const ctrl  = e.ctrlKey || e.metaKey;
    const shift = e.shiftKey;
    const key   = e.key;
    if (
      (ctrl && key === 'u') ||
      (ctrl && key === 's') ||
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

  /* ── 3. Disable image drag ───────────────────────────────────────── */
  document.addEventListener('dragstart', function (e) {
    if (e.target.tagName === 'IMG') e.preventDefault();
  });

  /* ── 4. CSS-based text selection disable (safer than selectstart) ── */
  const selStyle = document.createElement('style');
  selStyle.textContent = `
    body { -webkit-user-select: none; user-select: none; }
    input, textarea, [contenteditable] {
      -webkit-user-select: text; user-select: text;
    }
  `;
  document.head.appendChild(selStyle);

  /* ── 5. Block clipboard copy outside inputs ──────────────────────── */
  document.addEventListener('copy', function (e) {
    const active = document.activeElement?.tagName;
    if (!['INPUT','TEXTAREA'].includes(active)) {
      e.preventDefault();
      e.clipboardData?.setData('text/plain', '');
    }
  });

  /* ── 6. DevTools width-only detection (avoids mobile false positives) */
  //  Height gap can be 160px+ on mobile due to browser chrome — never check it.
  //  Width gap only fires when DevTools is docked to the side (≥300px wide).
  let devtoolsOpen = false;
  const WIDTH_THRESHOLD = 300;

  function checkDevTools() {
    const widthGap = window.outerWidth - window.innerWidth;
    if (widthGap > WIDTH_THRESHOLD) {
      if (!devtoolsOpen) { devtoolsOpen = true; showWarning(); }
    } else {
      if (devtoolsOpen) { devtoolsOpen = false; hideWarning(); }
    }
  }
  setInterval(checkDevTools, 1500);

  function showWarning() {
    if (document.getElementById('__sec-overlay')) return;
    const o = document.createElement('div');
    o.id = '__sec-overlay';
    o.style.cssText = 'position:fixed;inset:0;z-index:999999;background:rgba(10,10,10,0.92);backdrop-filter:blur(6px);display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;font-family:system-ui,sans-serif;text-align:center;padding:40px';
    o.innerHTML = `
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="1.5" style="margin-bottom:20px">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"/>
      </svg>
      <h2 style="margin:0 0 10px;font-size:22px;font-weight:600">Unauthorised access detected</h2>
      <p style="margin:0;opacity:.7;max-width:400px;font-size:15px;line-height:1.6">Developer tools are not permitted on this platform.<br>Close DevTools to continue.</p>`;
    document.body.appendChild(o);
  }

  function hideWarning() {
    const o = document.getElementById('__sec-overlay');
    if (o) o.remove();
  }

  /* ── 7. Console legal notice ─────────────────────────────────────── */
  setTimeout(function () {
    console.clear();
    console.log('%cAgriAlternative — Security Notice', 'color:#f59e0b;font-size:18px;font-weight:bold');
    console.log('%cThis is a proprietary platform. Unauthorised scraping or reverse-engineering is prohibited.', 'color:#aaa;font-size:13px');
  }, 500);

  /* ── 8. Lightweight bot honeypot ─────────────────────────────────── */
  let humanSignal = false;
  document.addEventListener('mousemove', function h(e) {
    if (e.clientX > 5 || e.clientY > 5) {
      humanSignal = true;
      document.removeEventListener('mousemove', h);
    }
  });
  setTimeout(function () {
    if (!humanSignal) console.warn('[AgriAlternative] Non-human session flagged.');
  }, 4000);

})();
