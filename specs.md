# AgriMarket — Specs

> **What the thing is, how it's wired, and the design contract.** Read alongside `features.md` (scope) and `to-be-done.md` (gaps).

---

## 1. Product summary

A bilingual (EN / ES) Argentina-focused **agri-commodities marketplace** with three logged-in surfaces (buyer / seller / admin), a public landing, a **Compliance Passport** that tracks shipments across origin + destination gates, an AI **Compliance Copilot**, and a **Market Intelligence** feed.

**Audience.** Argentine producers / cooperatives / exporters on the sell side; overseas buyers (EU / US / China primarily) on the buy side; internal ops on admin.

**Differentiators.**
1. Argentina-first sourcing depth (23 provinces, Rosario FOB ticker, local regs).
2. Compliance Passport that fuses origin (AFIP, SENASA, ROE Verde) with destination overlays (EUDR / FDA / GACC).
3. Embedded certifier marketplace so failing gates can be unblocked in-flow.
4. AI copilot grounded in the passport + regulatory KB.

---

## 2. Surface map

| Route | Surface | Auth | Primary user |
|---|---|---|---|
| `index.html` | Public landing | none | Visitor |
| `buyer.html` | Buyer dashboard | buyer | Importer / trader |
| `seller.html` | Seller dashboard | seller | Argentine grower / coop / exporter |
| `admin.html` | Admin panel | staff | AgriMarket ops |
| `compliance-passport.html` | Compliance Passport (buyer view) | buyer / seller | Trader / compliance officer |
| `market-intelligence.html` | Market intelligence feed | any logged-in | Trader |

---

## 3. Information architecture

```
PUBLIC
├── Hero + search (BUY / SELL tabs)
├── Categories mega-menu (8 commodity groups, sub-panels)
├── Featured listings (filter chips)
├── Browse by Argentine region (8 provinces)
├── How it works (4 steps)
├── Editorial / stats band
├── Market intelligence preview ──► market-intelligence.html
├── Live Rosario FOB ticker
├── CTA band
└── Footer (4 col + newsletter)

BUYER ──┐
SELLER ─┼── shared top nav (.gnav)
ADMIN ──┘

COMPLIANCE PASSPORT
├── Shipment strip (N shipments)
├── Selected shipment hero
├── Pipeline (origin gates │ destination gates)
├── Suggested fixes (alerts on failing gates)
├── Certifiers & services (region-filtered)
├── Origin gate cards (6, Argentina)
├── Destination gate cards (region overlay)
├── Live audit log
└── Compliance Copilot (FAB → side panel)
```

---

## 4. Design system

### Type
- Display: **Fraunces** (400 / 500), used on section titles, hero, large numerals.
- Body / UI: **Roboto** (300 / 400 / 500 / 700).
- Numerals use `font-variant-numeric: tabular-nums` for price / volume cells.

### Color tokens (`shared.css` + per-page roots)
| Token | Hex | Use |
|---|---|---|
| `--accent` / `--blue-dark` | `#2563EB` | Primary actions, links, accents |
| `--blue` | `#3a7bd5` | Hero gradient, secondary blues |
| `--cyan` | `#00d2d2` | Hero gradient end, editorial eyebrow |
| `--ink` | `#0f1729` | Body text on light, dark band bg |
| `--text` / `--text-light` / `--text-muted` | `#1a1f2e` / `#5a6478` / `#8b95a8` | Text hierarchy |
| `--bg-light` / `--bg-soft` / `--border-light` / `--border` | `#f5f7fa` / `#fafbfc` / `#eef0f4` / `#e5e7eb` | Surfaces and dividers |
| `--green` (pass) | `#1eb980` / `#047857` | Cleared gate, up tick |
| `--red` (fail) | `#ef4444` / `#b91c1c` | Failing gate, down tick |
| `--amber` (risk) | `#f59e0b` / `#b45309` | At-risk gate |
| Region accents | EU `#1e3a8a` · US `#b91c1c` · CN `#b45309` | Destination pills |

### Spacing & shape
- Card radius: 4–6 px (passport: 6 px, marketplace cards: 4 px).
- Section padding: `76px 0` on landing; `24–28px` cards.
- Max content width: **1180 px** (landing), **1320 px** (passport).
- Grid gutters: 12–24 px depending on density.

### Components (reused)
- `.gnav` (top nav) + `.demo-banner` (cross-surface jumper).
- Listing card · region card · insight card · how-step.
- Passport: ship-tab, ship-hero, pipe-step, gate card, fix card, svc card, audit-item.
- Drawer (`.pd-drawer`) — product detail, slide-in right.
- Auth modal · category mega-menu.
- Status pills: `pass / fail / risk / active / pending`.
- Ticker (`@keyframes tickerScroll`, 60 s linear).

---

## 5. Data shapes (Compliance Passport)

Declared in `passport-data.js`. Sketch only — see file for full schemas.

```js
SHIPMENTS = [{
  id, productName, productEmoji, route: {originPort, destPort},
  region: 'eu' | 'us' | 'cn', volume, value, eta,
  verdict: 'pass' | 'fail' | 'risk' | 'progress',
  originGates: [...gateState],
  destGates:   [...gateState]
}]

ORIGIN_GATES = [{ id, num, title, desc, evidence:[{k, v, status}], status }]
REGION_GATES = { eu:[...], us:[...], cn:[...] }

SERVICES = [{ id, vendor, service, blurb, gateUnlocks, region, price, leadTime, recommended }]

COMPLIANCE_SOURCES = [{ id, title, kind:'KB'|'reg', region, dateLabel, snippet }]

LIVE_EVENTS = [{ ts, status, who, msg, gateId }]
```

`passport-render.js` is the single render pass — pure function from selected shipment ID into DOM.
`passport-copilot.js` owns the chat panel state, prompt routing, and citation rendering.

---

## 6. Interaction contract

- **Language switcher** — toggling EN/ES rewrites `data-i18n` and `data-i18n-placeholder` nodes; persists in `localStorage`.
- **Categories mega-menu** — hover-driven sub-panels (left rail = group, right pane = subs + trending).
- **Listings → drawer** — clicking a card opens the right-side product drawer (`.pd-drawer`).
- **Auth modal** — `openAuth('signin' | 'register')`.
- **Passport pipeline** — clicking a step scroll-anchors to its gate card (`scroll-margin-top: 80px`).
- **Suggested fixes** — primary CTA (e.g. "Book inspector", "Re-file DJVE") routes to the matching service card.
- **Services CTA** — books a vendor; on success the vendor's result feeds the gate's evidence list and the audit log gets a new entry with the `just-landed` animation.
- **Copilot** — FAB opens panel; suggested-question chips seed prompts; replies cite numbered sources and may inline-recommend services.
- **Ticker** — auto-scrolls; hover pauses; 60 s loop.

---

## 7. Responsive

- Landing: 3-col listings collapse to 2 at ≤ 980 px; origin/how collapse; editorial stacks.
- Passport: 4-col ship-strip → 2-col → 1-col at 1100 / 720 px; pipeline wraps; service grid responds; gates grid 3 → 2 → 1.

---

## 8. Tech notes

- Plain HTML + vanilla JS + CSS variables.
- No build step.
- No framework runtime — all interactive logic is inline + small per-page scripts.
- Data is static in `passport-data.js`; no backend.
- Imagery on landing uses one Unsplash URL (`editorial-media`); everything else is gradients / SVG.

---

## 9. Out of scope (today)

- Real auth / sessions / RBAC.
- Real-time price feeds (ticker is mocked).
- Real LLM call for Copilot (replies are templated against sample KB).
- Mobile-first nav (collapsed hamburger not built on landing).
- Live language coverage for buyer / seller / admin surfaces (only landing + nav strings translated).
- Payments / escrow / settlement UI.
