# AgriMarket — To Be Done

> Gaps + next moves. Ordered by **impact × effort**. Tick boxes as we go.

Legend — **S** = ≤ 1 day · **M** = 2–3 days · **L** = 1 week+ · ⭐ = high impact

---

## 1. Now (next sprint)

### Compliance Passport
- [ ] ⭐ **Real LLM wiring for the Copilot** (currently templated). Hook `passport-copilot.js` to a real model call, keep citation contract and inline-service recommendations. **M**
- [ ] **Export audit PDF** — the button exists but no-ops. Generate a printable view + `window.print()` route. **S**
- [ ] **Pipeline step → gate scroll** works on desktop; add a sticky pipeline strip so it stays visible while scrolling gate cards. **S**
- [ ] **Service booking flow** — clicking "Book" on a `svc` card should open a 2-step drawer (date / scope → confirm), then drop a fake event into the audit log + flip the matching gate's evidence to "pending → vendor". **M**
- [ ] **Empty / loading / error states** for the gates grid, services grid, audit log. **S**
- [ ] **Seller view of the passport** — today it's buyer-only. Mirror the layout but pivot the "Suggested fixes" to seller actions (e.g. "Upload DJVE", "Schedule SENASA"). **M**

### Public landing
- [ ] **Search bar is dead** — wire BUY / SELL tabs + input to a results page (even a static `search-results.html`). **M**
- [ ] **Category mega-menu** — only `grains` panel populated; fill the other 7. **S**
- [ ] **Mobile nav** — hamburger + collapsed mega-menu. **M**
- [ ] **Listing favourites** — heart toggles UI but doesn't persist; back with `localStorage`. **S**

### Buyer / Seller / Admin
- [ ] **Buyer ↔ Passport hand-off** — clicking a contract row should deep-link to its passport with the right shipment pre-selected. **S**
- [ ] **Seller "Add product"** — form is static; persist to `localStorage` and surface new items in the seller's "My products" list and on landing. **M**
- [ ] **Admin moderation queue** — approve / reject actions are visual only; wire to a fake `moderation` store. **S**
- [ ] **Admin → user/company drill-in** — current table rows are inert. **M**

### Cross-cutting
- [ ] **i18n parity** — Spanish only covers landing + nav strings. Extend to buyer / seller / admin / passport. **M**
- [ ] **Demo banner** — keep a single source of truth for the surface list so adding a new surface doesn't mean editing N banners. **S**
- [ ] **Page titles + favicon** — set a real favicon, normalize `<title>` format. **S**

---

## 2. Next (after the foundation works)

### Compliance Passport
- [ ] **Region overlays for more destinations** — UK, Brazil, India, MENA, ASEAN beyond CN/JP/KR. **L**
- [ ] **Versioned regulations** — show "Effective from / superseded by" on KB sources so the Copilot can reason about timeline. **M**
- [ ] **Compare shipments** — pick 2 from the strip, see passports side-by-side. **M**
- [ ] **Notifications drawer** — events from the audit log promoted to top-nav bell with unread state. **M**

### Marketplace mechanics
- [ ] **Live negotiation thread** on a listing (offer / counter-offer / accept) — the "How it works" step 2 promises this. **L**
- [ ] **Contracts module** — generate a GAFTA-aligned PDF, redline UI, e-sign. Step 3 of "How it works". **L**
- [ ] **Trade-finance partner picker** at settlement. Step 4. **L**
- [ ] **Logistics tracker** — vessel position + ETA on the buyer side. **L**

### Market intelligence
- [ ] **Real post detail page** — feed currently goes to anchor only. **S**
- [ ] **Tag filters + search** on the feed. **S**
- [ ] **Author pages + subscriptions** (newsletter, RSS). **M**

### Internationalization
- [ ] **Portuguese (BR)** + **Mandarin (CN)** in addition to EN / ES. **M**
- [ ] **Currency switcher** (USD / EUR / ARS) on listings + passport. **S**
- [ ] **Unit switcher** (MT / bu / lb). **S**

### Admin / ops
- [ ] **KYC review flow** — open a company, view docs, approve / reject with reasons. **M**
- [ ] **Audit export** — pull any user / company / shipment audit trail to CSV / PDF. **S**
- [ ] **Feature flags** for surface rollouts. **M**

---

## 3. Later (after product-market fit signal)

- [ ] **Real-time Rosario FOB feed** from Bolsa de Comercio (replace the mocked ticker). **L**
- [ ] **Vessel + barge ETAs** from carrier APIs. **L**
- [ ] **Embedded escrow** for settlement. **L**
- [ ] **Mobile apps** (buyer ride-along + push alerts on passport state changes). **L**
- [ ] **API for ERPs** — push contracts / docs from / to SAP / Oracle Agriculture. **L**
- [ ] **White-label** for cooperatives. **L**

---

## 4. Known issues / debt

- `market-intelligence.html` headings include literal `${escapeHTML(...)}` strings — a template wasn't fully rendered server-side. Audit and fix the post-card template. **S**
- `index.html` is **1,355 lines** — split into partials (nav, hero, sections, drawer, modal) and load via a small include helper, or move per-section CSS into its own file. **S**
- `shared.css` and `alt-dash.css` overlap — consolidate tokens, keep `alt-dash.css` for dashboard-only patterns. **S**
- Landing's single Unsplash image (editorial) is a remote dependency; host locally with an `<image-slot>` for the user to drop their own. **S**
- No automated test pass; add at least a render-smoke check per HTML file. **M**
- Accessibility: nav landmarks, focus states on chips / tabs, alt text on flags, ARIA on the Copilot panel. **M**

---

## 5. Decisions still open

- Do we keep one Passport per shipment, or per **contract** (a contract often spans 2–5 shipments)?
- Should the Copilot ever take **actions** (book a vendor, refile DJVE), or stay read-only with deep-links?
- Pricing: marketplace fee vs. SaaS subscription vs. take-rate on certifier bookings?
- Who owns the regulation KB long-term — internal desk, partner law firm, or community-edited?
