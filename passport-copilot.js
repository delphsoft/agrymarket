/* =================================================================
   COMPLIANCE COPILOT — chat surface
   - Pulls current shipment context from window.Passport
   - Cites COMPLIANCE_SOURCES (from passport-data.js)
   - Now also: recommends certifications/services for destination
   ================================================================= */

(function() {
  let chatHistory = []; // [{role:'user'|'bot', content}]

  function escapeHTML(s) {
    return String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  /* ---------- context block built fresh on each prompt ---------- */
  function shipmentContextBlock() {
    const s = (window.Passport && window.Passport.getCurrent) ? window.Passport.getCurrent() : null;
    if (!s) return 'No shipment selected.';
    const region = REGION_GATES[s.destination.region];
    const originLines = ORIGIN_GATES.map(g => {
      const st = s.gates[g.id]?.state || 'pending';
      return ` ${g.num}. ${g.name} — ${st.toUpperCase()}`;
    }).join('\n');
    const destLines = region.gates.map(g => {
      const st = s.destGates[g.id]?.state || 'pending';
      return ` ${g.num}. ${g.name} (${region.label}) — ${st.toUpperCase()}`;
    }).join('\n');
    const fixLines = (s.fixes || []).map(f =>
      ` - Gate ${f.gate} (${f.severity}): ${f.title.replace(/<[^>]+>/g, '')}`).join('\n') || ' (none)';
    return `Shipment ${s.id}: ${s.product.name}, ${s.volumeLabel}, ${s.origin.short} → ${s.destination.port}.
Counterparties: ${s.seller} → ${s.buyer}. Destination market: ${region.label}.
Contract value ${s.contractValue}. Laycan ${s.laycan}.

Origin gates (Argentina):
${originLines}

Destination gates (${region.label}):
${destLines}

Open issues platform has already drafted suggestions for:
${fixLines}`;
  }

  /* ---------- services catalog summary (for cert recommendations) ---------- */
  function servicesContextBlock() {
    return SERVICES.map(svc => {
      return `- ${svc.vendor} — ${svc.service} (region:${svc.region}, unlocks:${svc.unlocks}, lead:${svc.leadTime}, price:${svc.price})`;
    }).join('\n');
  }

  /* ---------- UI helpers ---------- */
  function panel()    { return document.getElementById('copPanel'); }
  function body()     { return document.getElementById('copBody'); }
  function input()    { return document.getElementById('copInput'); }
  function suggest()  { return document.getElementById('copSuggest'); }
  function contextEl(){ return document.getElementById('copContext'); }

  function toggle() {
    panel().classList.toggle('show');
    if (panel().classList.contains('show')) {
      setTimeout(() => input().focus(), 50);
      const nudge = document.querySelector('.cop-fab .nudge');
      if (nudge) nudge.style.display = 'none';
    }
  }

  function renderCitesInText(text) {
    const esc = escapeHTML(text);
    return esc.replace(/\[(\d+(?:\s*,\s*\d+)*)\]/g, (m, grp) => {
      return grp.split(',').map(n => {
        const num = Number(n.trim());
        if (!num || num < 1 || num > COMPLIANCE_SOURCES.length) return '';
        return `<a class="cite" href="#" data-cite="${num}" onclick="Copilot.highlightSource(${num});return false;">${num}</a>`;
      }).join('');
    });
  }

  function highlightSource(n) {
    document.querySelectorAll('.cop-source').forEach(el => {
      if (Number(el.dataset.n) === n) {
        el.scrollIntoView({block: 'nearest'});
        el.style.borderColor = 'var(--accent)';
        setTimeout(() => el.style.borderColor = '', 1200);
      }
    });
  }

  function renderServiceRecs(serviceVendors) {
    if (!serviceVendors || !serviceVendors.length) return '';
    const matched = serviceVendors
      .map(v => SERVICES.find(s => s.vendor.toLowerCase() === String(v).toLowerCase() || s.short.toLowerCase() === String(v).toLowerCase()))
      .filter(Boolean);
    if (!matched.length) return '';
    return `<div class="cop-services">
      <div class="cop-services-lbl">✨ Suggested services</div>
      ${matched.map(svc => `
        <div class="cop-service" onclick="document.getElementById('services-grid')?.scrollIntoView({behavior:'smooth', block:'start'})">
          <span class="cop-service-logo" style="background:${svc.color}">${escapeHTML(svc.short)}</span>
          <span class="cop-service-body">
            <span class="cop-service-vendor">${escapeHTML(svc.vendor)}</span>
            <span class="cop-service-line">${escapeHTML(svc.service)} · ${escapeHTML(svc.leadTime)} · ${escapeHTML(svc.price)}</span>
          </span>
          <span class="cop-service-cta">Book ›</span>
        </div>`).join('')}
    </div>`;
  }

  function appendUser(text) {
    const b = body();
    b.insertAdjacentHTML('beforeend', `<div class="cop-msg user"><div class="bub">${escapeHTML(text)}</div></div>`);
    b.scrollTop = b.scrollHeight;
  }

  function appendThinking() {
    body().insertAdjacentHTML('beforeend',
      `<div class="cop-msg bot" id="copThinking"><div class="bub"><div class="cop-thinking"><span class="d"></span><span class="d"></span><span class="d"></span></div></div></div>`);
    body().scrollTop = body().scrollHeight;
  }
  function removeThinking() {
    document.getElementById('copThinking')?.remove();
  }

  function appendBot(answer, citeNums, serviceVendors) {
    const html = renderCitesInText(answer);
    const used = (citeNums || []).filter((v,i,a) => a.indexOf(v) === i).filter(n => n >=1 && n <= COMPLIANCE_SOURCES.length);
    const srcHTML = used.length ? `
      <div class="cop-sources">
        ${used.map(n => {
          const s = COMPLIANCE_SOURCES[n-1];
          const regionPill = { eu:'EU', us:'US', cn:'China', origin:'AR' }[s.region] || '';
          return `<a class="cop-source" data-n="${n}" href="market-intelligence.html#${s.id}" target="_blank">
            <span class="num">${n}</span>
            <span class="src-body">
              <span class="src-title">${escapeHTML(s.title)}</span>
              <span class="src-meta">
                <span class="tag-pill">Compliance</span>
                ${regionPill ? `<span class="region-pill">${regionPill}</span>` : ''}
                ${escapeHTML(s.author)} · ${escapeHTML(s.date)}
              </span>
            </span>
          </a>`;
        }).join('')}
      </div>` : '';
    const svcHTML = renderServiceRecs(serviceVendors);
    body().insertAdjacentHTML('beforeend', `<div class="cop-msg bot"><div class="bub">${html}${svcHTML}${srcHTML}</div></div>`);
    body().scrollTop = body().scrollHeight;
  }

  /* ---------- prompt builder ---------- */
  function buildPrompt(question) {
    const srcBlock = COMPLIANCE_SOURCES.map((s, i) => {
      return `[${i+1}] "${s.title}" (region:${s.region}) — ${s.author}, ${s.date}\n${s.body.join(' ')}`;
    }).join('\n\n');

    const histBlock = chatHistory.slice(-6).map(m => `${m.role === 'user' ? 'USER' : 'COPILOT'}: ${m.content}`).join('\n');

    return `You are AgriMarket's Compliance Copilot — a regulatory assistant for Argentine agri-commodity exporters and their EU/US/Asia buyers. You answer in 1-3 short paragraphs (max ~120 words), in working-trader voice, with specific filings, timeframes, HS codes and regulation names when relevant.

CURRENT SHIPMENT CONTEXT (use this when the user asks "us", "we" or about gates):
${shipmentContextBlock()}

AVAILABLE CERTIFIER SERVICES on the AgriMarket marketplace (recommend by exact vendor name when one of these would unblock a gate):
${servicesContextBlock()}

SOURCES (AgriMarket Market Intelligence — Compliance desk posts). Cite by bracketed number, e.g. [1] or [2,4]. Use ONLY these sources. If none apply, say so explicitly and answer from general AFIP / SENASA / EU / US / GACC rules without citing.

${srcBlock}

RECENT CONVERSATION:
${histBlock || '(start of conversation)'}

USER: ${question}

Return ONLY valid JSON with this exact shape, no markdown:
{
  "answer": "your 1-3 paragraph reply with inline [n] citations where supported by a source",
  "cites": [array of source numbers actually cited in the answer],
  "services": [array of vendor names to recommend (e.g. \"Control Union\", \"SGS\"); empty array if no service unblocks anything in this answer]
}`;
  }

  function parseAIResponse(raw) {
    if (!raw) return null;
    let s = String(raw).trim().replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/i, '').trim();
    try { return JSON.parse(s); } catch {}
    const m = s.match(/\{[\s\S]*\}/);
    if (m) { try { return JSON.parse(m[0]); } catch {} }
    return null;
  }

  /* ---------- ask flow ---------- */
  async function ask(q) {
    const send = document.getElementById('copSend');
    send.disabled = true;
    appendUser(q);
    chatHistory.push({role: 'user', content: q});
    appendThinking();
    try {
      const raw = await window.claude.complete(buildPrompt(q));
      const parsed = parseAIResponse(raw);
      removeThinking();
      if (parsed && parsed.answer) {
        appendBot(parsed.answer,
          Array.isArray(parsed.cites) ? parsed.cites.map(Number) : [],
          Array.isArray(parsed.services) ? parsed.services : []);
        chatHistory.push({role: 'bot', content: parsed.answer});
      } else {
        const text = (raw || '').trim() || 'Sorry — I could not parse a response just now. Try rephrasing?';
        appendBot(text, [], []);
        chatHistory.push({role: 'bot', content: text});
      }
    } catch (err) {
      removeThinking();
      appendBot('Could not reach the Copilot right now — please try again in a moment.', [], []);
      console.warn(err);
    } finally {
      send.disabled = false;
      input().focus();
    }
  }

  function onAsk(ev) {
    ev.preventDefault();
    const q = (input().value || '').trim();
    if (!q) return;
    input().value = '';
    ask(q);
  }

  function askPreset(q) {
    input().value = q;
    ask(q);
    input().value = '';
  }

  /* ---------- preset chips refresh on shipment change ---------- */
  function refreshSuggestions() {
    const s = (window.Passport && window.Passport.getCurrent) ? window.Passport.getCurrent() : null;
    if (!s) return;
    const region = REGION_GATES[s.destination.region];
    // pick contextual presets based on shipment state
    const presets = [];
    if (s.fixes && s.fixes.length) {
      const f = s.fixes[0];
      presets.push(`Why did Gate ${f.gate} fail and what's the cleanest fix?`);
    }
    if (s.destination.region === 'eu') {
      presets.push('What does EUDR require for our soy plots?');
      presets.push('Which lab covers EU MRL panel fastest?');
    } else if (s.destination.region === 'us') {
      presets.push('What do we need for USDA Bioengineered disclosure?');
      presets.push('FDA Prior Notice — what filing lead time?');
    } else if (s.destination.region === 'cn') {
      presets.push('Is our GACC registration current for this category?');
      presets.push('GB-2763 vs EU MRL — which is tighter for soy meal?');
    }
    presets.push('Which certifiers can unblock our destination gates?');

    const wrap = suggest();
    wrap.innerHTML = presets.slice(0, 4).map(q =>
      `<button class="chip-q" onclick="Copilot.askPreset(${JSON.stringify(q).replace(/"/g, '&quot;')})">${escapeHTML(q)}</button>`
    ).join('');

    // context strip in the panel
    contextEl().innerHTML = `
      <svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 1l5 2v5c0 3.5-2.2 5.8-5 6.7-2.8-0.9-5-3.2-5-6.7V3z"/></svg>
      Context: <strong>${s.id}</strong> · ${escapeHTML(s.product.short)} · ${s.origin.short} → ${s.destination.short}
      <span class="ctx-region region-${s.destination.region}">${region.flag} ${region.label}</span>`;
  }

  function onShipmentChanged() {
    refreshSuggestions();
  }

  /* ---------- esc closes ---------- */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && panel().classList.contains('show')) toggle();
  });

  // expose
  window.Copilot = {
    toggle, askPreset, onShipmentChanged, highlightSource,
    onAsk
  };

  document.addEventListener('DOMContentLoaded', () => {
    refreshSuggestions();
  });
})();
