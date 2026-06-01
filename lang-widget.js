/* Shared lang dropdown widget for dashboards
   Inject by calling injectLangMenu(targetSelector)
   Or include `<span data-lang-widget>` and call initLangWidgets()
*/

function buildLangDropdownHTML(theme) {
  // theme: 'light' (admin) | 'dark' (gradient nav)
  const isDark = theme === 'dark';
  const stroke = isDark ? 'rgba(255,255,255,0.8)' : '#555';
  const color = isDark ? '#fff' : '#555';
  return `
    <span class="lang-widget" style="position:relative;display:inline-flex;align-items:center;gap:4px;cursor:pointer;color:${color};font-size:13px;" onclick="this.querySelector('.lang-menu').style.display=this.querySelector('.lang-menu').style.display==='block'?'none':'block';event.stopPropagation();">
      <span data-lang-display>EN</span>
      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="${stroke}" stroke-width="1.5"><path d="M1 1l4 4 4-4"/></svg>
      <div class="lang-menu" style="display:none;position:absolute;top:100%;right:0;margin-top:8px;background:#fff;box-shadow:0 8px 24px rgba(0,0,0,0.15);border-radius:4px;overflow:hidden;min-width:130px;z-index:1500;">
        <div data-lang-pick="en" onclick="setLang('en');this.parentElement.style.display='none';event.stopPropagation();" style="padding:10px 16px;color:#333;font-size:13px;cursor:pointer;border-bottom:1px solid #f0f0f0;">🇬🇧 English</div>
        <div data-lang-pick="es" onclick="setLang('es');this.parentElement.style.display='none';event.stopPropagation();" style="padding:10px 16px;color:#333;font-size:13px;cursor:pointer;">🇪🇸 Español</div>
      </div>
    </span>
  `;
}

function initLangWidgets() {
  document.querySelectorAll('[data-lang-widget]').forEach(host => {
    const theme = host.getAttribute('data-lang-widget') || 'dark';
    host.outerHTML = buildLangDropdownHTML(theme);
  });
  // Re-apply lang so the freshly-injected data-lang-display spans reflect stored language
  if (typeof applyLang === 'function') applyLang();
  // Close on outside click
  document.addEventListener('click', () => {
    document.querySelectorAll('.lang-menu').forEach(m => m.style.display = 'none');
  });
}

document.addEventListener('DOMContentLoaded', initLangWidgets);
