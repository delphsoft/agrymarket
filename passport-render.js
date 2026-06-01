/* =================================================================
   COMPLIANCE PASSPORT — render layer
   Renders strip, hero, pipeline, fixes, services, gate cards, audit
   from passport-data.js. Handles shipment switching.
   ================================================================= */

(function() {
  let currentCode = '0418'; // default selected shipment
  let liveTimer = null;

  function escapeHTML(s) {
    return String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  function getShipment(code) { return SHIPMENTS.find(s => s.code === code) || SHIPMENTS[0]; }
  function regionOf(s) { return REGION_GATES[s.destination.region]; }
  const REGION_SHORT = { eu: 'EU', us: 'US', cn: 'CN · GACC' };
  function allGatesFor(s) {
    const dest = regionOf(s);
    return [
      ...ORIGIN_GATES.map(g => ({ ...g, scope: 'origin', state: s.gates[g.id]?.state || 'pending' })),
      ...dest.gates.map(g => ({ ...g, scope: 'dest', state: s.destGates[g.id]?.state || 'pending' }))
    ];
  }

  /* ---------- shipment strip (top 4 cards) ---------- */
  function renderStrip() {
    const strip = document.getElementById('ship-strip');
    strip.innerHTML = SHIPMENTS.map(s => {
      const dest = regionOf(s);
      const gates = allGatesFor(s);
      const dots = gates.map(g => `<span class="gate-dot ${g.state}" title="Gate ${g.num} ${g.name}"></span>`).join('');
      const verdictCls = { pass:'v-pass', fail:'v-fail', risk:'v-fail', prog:'v-prog' }[s.verdict.state] || 'v-prog';
      let verdictText;
      const f = gates.filter(g => g.state === 'fail').length;
      const r = gates.filter(g => g.state === 'risk').length;
      if (s.verdict.state === 'pass') verdictText = 'Cleared';
      else if (s.verdict.state === 'prog') verdictText = `Gate ${gates.filter(g => g.state==='pass').length + 1} / ${gates.length}`;
      else verdictText = `${f} fail${f===1?'':'s'}${r ? ' · ' + r + ' risk' : ''}`;

      return `
        <div class="ship-tab ${s.code === currentCode ? 'active' : ''}" data-code="${s.code}">
          <div class="ttl-row">
            <span class="ttl">${s.id}</span>
            <span class="eta">${escapeHTML(s.eta)}</span>
          </div>
          <div class="prod">
            <strong>${escapeHTML(s.product.short)}</strong> · ${s.volumeLabel}
            <div class="route-line">
              ${s.origin.short} → ${s.destination.short}
              <span class="dest-pill region-${s.destination.region}">${dest.flag} ${REGION_SHORT[s.destination.region]}</span>
            </div>
          </div>
          <div class="gates">
            ${dots}
            <span class="verdict ${verdictCls}">${verdictText}</span>
          </div>
        </div>`;
    }).join('');
    strip.querySelectorAll('.ship-tab').forEach(el => {
      el.addEventListener('click', () => switchShipment(el.dataset.code));
    });
  }

  /* ---------- hero card ---------- */
  function renderHero() {
    const s = getShipment(currentCode);
    const dest = regionOf(s);
    const isPass = s.verdict.state === 'pass';
    const isProg = s.verdict.state === 'prog';
    const verdictBg = isPass ? 'pass-bg' : (isProg ? 'active-bg' : 'fail-bg');
    document.getElementById('ship-hero').innerHTML = `
      <div class="h-prod">
        <div class="tag-row">
          <span class="h-tag">FOB · ${escapeHTML(s.origin.short)} Up-River</span>
          <span class="h-tag live">${typeof t === 'function' ? t('passport_live') : 'LIVE'} PIPELINE</span>
          <span class="h-tag region region-${s.destination.region}">${dest.flag} ${dest.label} overlay · +${dest.gates.length} gates</span>
        </div>
        <div class="nm">${escapeHTML(s.product.name)} · ${s.volumeLabel}</div>
        <div class="id">${s.id} · Contract ${s.contract} · ${isPass ? 'B/L issued' : 'B/L pending'}</div>
        <div class="route">
          <span class="port">${s.origin.flag} ${escapeHTML(s.origin.port)}</span>
          <span class="arr">———▶</span>
          <span class="port">${s.destination.flag} ${escapeHTML(s.destination.port)}</span>
        </div>
      </div>
      <div class="h-stat">
        <div class="k">Counterparties</div>
        <div class="v" style="font-size:14px;">${escapeHTML(s.seller)}</div>
        <div class="vsub">→ ${escapeHTML(s.buyer)} · KYC ✓ both sides</div>
      </div>
      <div class="h-stat">
        <div class="k">Contract value</div>
        <div class="v">${s.contractValue} <small>USD</small></div>
        <div class="vsub">${escapeHTML(s.fobPrice)}</div>
      </div>
      <div class="h-stat">
        <div class="k">Passport verdict</div>
        <span class="verdict-big v-${s.verdict.state}">${s.verdict.label}</span>
        <div class="vsub" style="margin-top:6px;">${escapeHTML(s.verdict.sub)}</div>
      </div>`;
  }

  /* ---------- pipeline (origin + dest in one row with divider) ---------- */
  function renderPipeline() {
    const s = getShipment(currentCode);
    const dest = regionOf(s);
    const gates = allGatesFor(s);
    const stateMeta = {
      pass:    { icon: '✓', label: 'Passed' },
      fail:    { icon: '!', label: 'Failed' },
      risk:    { icon: '⚠', label: 'At risk' },
      active:  { icon: '◐', label: 'In progress' },
      pending: { icon: '·', label: 'Pending' }
    };
    // mini meta per gate (e.g. days, codes)
    const metaFor = (g) => {
      if (g.scope === 'origin') return s.gates[g.id]?.filedAt || '';
      return s.destGates[g.id]?.filedAt || '';
    };

    // Build with a "divider" cell between origin and dest gates
    const stepsHTML = gates.map((g, i) => {
      const m = stateMeta[g.state] || stateMeta.pending;
      const meta = metaFor(g);
      const dividerBefore = (g.scope === 'dest' && (i === 0 || gates[i-1].scope === 'origin'))
        ? `<div class="pipe-divider"><span class="pdline"></span><span class="pdlabel">${dest.flag} ${escapeHTML(dest.label)}</span><span class="pdline"></span></div>`
        : '';
      return `${dividerBefore}
        <a class="pipe-step ${g.state}" data-gate="${g.id}" data-scope="${g.scope}" href="#g-${g.id}">
          <div class="pipe-dot">${m.icon}</div>
          <div class="pipe-name">${escapeHTML(g.name)}</div>
          <div class="pipe-status">${m.label}</div>
          <div class="pipe-meta">${escapeHTML(meta || '')}</div>
        </a>`;
    }).join('');

    document.getElementById('pipeline').innerHTML = stepsHTML;
    document.getElementById('pipeline-summary').innerHTML = s.summary;
  }

  /* ---------- fixes row ---------- */
  function renderFixes() {
    const s = getShipment(currentCode);
    const wrap = document.getElementById('fix-row');
    if (!s.fixes || !s.fixes.length) {
      wrap.innerHTML = `<div class="empty-state">
        ${s.verdict.state === 'pass'
          ? '✓ No issues. This shipment cleared all gates. Audit log preserved below.'
          : '✓ No blocking issues right now. Pending gates will auto-file as they reach SLA.'}
      </div>`;
      return;
    }
    wrap.innerHTML = s.fixes.map(f => `
      <div class="fix ${f.severity}">
        <div class="fix-ico">${f.icon}</div>
        <div class="fix-body">
          <div class="fix-title"><span class="gate-no">GATE ${f.gate}</span> ${escapeHTML(f.title)}</div>
          <div class="fix-detail">${f.detail}</div>
          <div class="suggested">
            <div class="sug-lbl">✨ Platform suggests</div>
            ${f.suggest}
          </div>
        </div>
        <div class="fix-actions">
          ${f.actions.map(a => `<button class="btn-sm ${a.kind}">${escapeHTML(a.label)}</button>`).join('')}
        </div>
      </div>`).join('');
  }

  /* ---------- services marketplace ---------- */
  function renderServices() {
    const s = getShipment(currentCode);
    const dest = regionOf(s);
    // services relevant: matching region OR 'any' OR matches an unfilled dest gate
    const failingIds = new Set();
    Object.entries(s.destGates).forEach(([id, g]) => {
      if (g.state === 'fail' || g.state === 'risk' || g.state === 'pending') failingIds.add(id);
    });
    const ranked = SERVICES.map(svc => {
      const matchesRegion = svc.region === s.destination.region || svc.region === 'any';
      const recommended = failingIds.has(svc.unlocks);
      return { ...svc, matchesRegion, recommended };
    }).filter(svc => svc.matchesRegion).sort((a, b) => Number(b.recommended) - Number(a.recommended));

    document.getElementById('services-region').textContent = `${dest.flag} ${dest.label}`;
    const wrap = document.getElementById('services-grid');
    wrap.innerHTML = ranked.map(svc => {
      const gateName = (() => {
        const dg = dest.gates.find(g => g.id === svc.unlocks);
        if (dg) return `Gate ${dg.num} · ${dg.name}`;
        if (svc.unlocks === 'eu-mrl') return 'Gate 8 · EU MRL';
        return 'Cross-market service';
      })();
      return `
        <article class="svc ${svc.recommended ? 'recommended' : ''}">
          ${svc.recommended ? '<span class="svc-rec">✨ RECOMMENDED · unblocks a gate</span>' : ''}
          <div class="svc-head">
            <div class="svc-logo" style="background:${svc.color}">${escapeHTML(svc.short)}</div>
            <div class="svc-titles">
              <div class="svc-vendor">${escapeHTML(svc.vendor)}</div>
              <div class="svc-service">${escapeHTML(svc.service)}</div>
            </div>
          </div>
          <div class="svc-blurb">${escapeHTML(svc.blurb)}</div>
          <div class="svc-meta">
            <div class="svc-meta-cell"><span class="k">Unlocks</span><span class="v unlocks">${escapeHTML(gateName)}</span></div>
            <div class="svc-meta-cell"><span class="k">Lead time</span><span class="v">${escapeHTML(svc.leadTime)}</span></div>
            <div class="svc-meta-cell"><span class="k">Price</span><span class="v">${escapeHTML(svc.price)}</span></div>
            <div class="svc-meta-cell"><span class="k">Rating</span><span class="v">★ ${svc.rating} · ${svc.jobs.toLocaleString()} jobs</span></div>
          </div>
          <div class="svc-actions">
            <button class="btn-sm solid" onclick="openBookingByVendor('${svc.vendor.replace(/'/g,'\\&#39;')}')">
              ${typeof t === 'function' ? t('passport_book') : 'Book service'}
            </button>
            <button class="btn-sm ghost" onclick="openBookingByVendor('${svc.vendor.replace(/'/g,'\\&#39;')}')">
              ${typeof t === 'function' ? t('passport_details') : 'Details'}
            </button>
          </div>
        </article>`;
    }).join('');
  }

  /* ---------- gate detail cards ---------- */
  function renderGates() {
    const s = getShipment(currentCode);
    const dest = regionOf(s);
    const stateMeta = {
      pass:    { pillCls: 'pass',   pillText: '✓ Passed' },
      fail:    { pillCls: 'fail',   pillText: '⛔ Failed' },
      risk:    { pillCls: 'risk',   pillText: '⚠ At risk' },
      active:  { pillCls: 'active', pillText: '◐ In progress' },
      pending: { pillCls: 'pending',pillText: '· Pending' }
    };

    const cardFor = (g, state, ev, foot, isDest) => {
      const m = stateMeta[state] || stateMeta.pending;
      return `
        <article class="gate ${state}" id="g-${g.id}">
          <div class="gate-head">
            <div class="gate-no-row">
              <span class="num">${g.num}</span>
              <span class="gate-title">${escapeHTML(g.name)}</span>
              ${isDest ? `<span class="dest-chip" title="${escapeHTML(dest.label)}">${dest.flag}</span>` : ''}
            </div>
            <span class="gate-pill ${m.pillCls}">${m.pillText}</span>
          </div>
          <div class="gate-desc">${escapeHTML(g.desc)}</div>
          <div class="gate-evid">
            ${(ev || []).map(e => `
              <div class="ev-row"><span class="k">${escapeHTML(e.k)}</span><span class="v ${e.cls || ''}">${escapeHTML(e.v)}</span></div>
            `).join('')}
          </div>
          <div class="gate-foot">
            <span>${escapeHTML(foot?.left || '')}</span>
            <a href="#">${escapeHTML(foot?.right || '')}</a>
          </div>
        </article>`;
    };

    const originHTML = ORIGIN_GATES.map(g => {
      const data = s.gates[g.id] || {};
      return cardFor(g, data.state || 'pending', data.evidence, { left: data.footLeft, right: data.footRight }, false);
    }).join('');

    const destHTML = dest.gates.map(g => {
      const data = s.destGates[g.id] || {};
      return cardFor(g, data.state || 'pending', data.evidence, { left: data.footLeft, right: data.footRight }, true);
    }).join('');

    document.getElementById('gates-grid').innerHTML = originHTML;
    document.getElementById('gates-grid-dest-label').innerHTML = `${dest.flag} ${escapeHTML(dest.label)} compliance · ${dest.gates.length} additional gates`;
    document.getElementById('gates-grid-dest-blurb').textContent = dest.blurb;
    document.getElementById('gates-grid-dest').innerHTML = destHTML;
  }

  /* ---------- audit log ---------- */
  function renderAudit() {
    const s = getShipment(currentCode);
    document.getElementById('audit-list').innerHTML = s.audit.map(item => `
      <div class="audit-item ${item.state}">
        <span class="t">${escapeHTML(item.t)}</span>
        <span class="marker"></span>
        <span class="msg">${item.msg}</span>
        <span class="who">${escapeHTML(item.who)}</span>
      </div>`).join('');
  }

  /* ---------- live event injection ---------- */
  function scheduleLiveEvent() {
    if (liveTimer) clearTimeout(liveTimer);
    liveTimer = setTimeout(() => {
      const ev = LIVE_EVENTS[currentCode];
      if (!ev) return;
      const list = document.getElementById('audit-list');
      if (!list) return;
      list.insertAdjacentHTML('afterbegin', `
        <div class="audit-item ${ev.state} just-landed">
          <span class="t">${ev.t}</span>
          <span class="marker"></span>
          <span class="msg">${ev.msg}</span>
          <span class="who">${escapeHTML(ev.who)}</span>
        </div>`);
    }, 18000);
  }

  /* ---------- public switcher ---------- */
  function switchShipment(code) {
    if (code === currentCode) return;
    currentCode = code;
    renderAll();
    // tell the Copilot the context changed
    if (window.Copilot && typeof window.Copilot.onShipmentChanged === 'function') {
      window.Copilot.onShipmentChanged(getShipment(code));
    }
    // scroll into view
    document.querySelector('.ship-hero')?.scrollIntoView({block: 'start', behavior: 'smooth'});
  }

  function renderAll() {
    renderStrip();
    renderHero();
    renderPipeline();
    renderFixes();
    renderServices();
    renderGates();
    renderAudit();
    scheduleLiveEvent();
  }

  // expose
  window.Passport = {
    getCurrent: () => getShipment(currentCode),
    switchTo: switchShipment,
    rerender: renderAll
  };

  // re-render on language change so dynamic strings update
  document.addEventListener('langchange', () => renderAll(currentCode));

  document.addEventListener('DOMContentLoaded', renderAll);
})();
