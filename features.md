# AgriMarket — Features & Value Proposition

> Argentina-focused agri-commodities marketplace — buyer / seller / admin dashboards, Compliance Passport, AI Copilot, bilingual EN / ES. Zero build step — deploy straight to Vercel.

---

## Built features

### Public landing (`index.html`)
- Hero with gradient, BUY / SELL tabs, search input, EN/ES language switcher
- **Why AgriMarket editorial band** — dark full-bleed section, headline, $840M / 1,840 sellers / 23 provinces stats, customer quote with field photo. Positioned immediately after the hero for instant trust-building.
- **Category mega-menu** — 8 commodity groups (grains, oilseeds, oils & meals, peanuts & pulses, beef & protein, wine & must, citrus & fruit, dairy & honey) with hover sub-panels and trending badges
- **Featured Argentine listings** — 3-col data-dense cards, chip filters (Soybeans / Corn / Wheat / Sunflower oil / Soy meal / Peanuts / Sorghum / Beef / Wine), verified + new badges, favourite toggle, product detail drawer (slide-in right)
- **Browse by Argentine region** — 8 provinces (Buenos Aires, Córdoba, Santa Fe, La Pampa, Entre Ríos, Mendoza, Tucumán, Salta)
- **How it works** — 4-step process strip (Verify → Discover → Contract → Ship)
- **Market intelligence preview** — large chart card + 2 secondary insight cards
- **Live Rosario FOB ticker** — 12 commodities, auto-scroll, hover-to-pause, masked fade edges
- CTA band + 4-column footer with newsletter
- Auth modal (sign-in / register, role picker: buyer / seller / admin)

### Buyer dashboard (`buyer.html`)
- Browse, My Contracts, Saved Listings, Profile tabs
- Wheat opportunities grid, contracts table with status pills, saved listings, KYC state

### Seller dashboard (`seller.html`)
- My Products, Contracts, Profile tabs
- Listing manager, add-product form (specs, Incoterms basis, images), verification documents panel

### Admin panel (`admin.html`)
- KPIs, recent activity feed, top-countries-by-volume chart
- Moderation queue, user / company / contract / tender tables
- Messaging oversight, support tickets, KYC review

### Compliance Passport (`compliance-passport.html`) ⭐ flagship
- **Shipment strip** — 4 active shipments, destination pills (EU / US / CN), gate-dot verdict summary
- **Live pipeline** — animated origin → destination gate chain, active-step indicator
- **Origin gates (Argentina, 6)** — AFIP DJVE, SENASA phyto, ROE Verde, HS reconciliation, terminal delivery, B/L draft
- **Destination gates (region-aware)** — EU (EUDR plot polygons, MRL, GMP+, customs), US (APHIS, FDA Prior Notice, USDA Bioengineered), CN (GACC Decree 248/249, GB-2763 MRL)
- **Suggested fixes** — alert cards for failing gates with one-click remediation CTAs
- **Certifiers & services marketplace** — 3-card grid of accredited inspectors / labs, region-filtered, results feed back into gate evidence
- **Live audit log** — timestamped color-coded events with "just-landed" animation
- **Export audit PDF** button
- **Compliance Copilot (AI)** — FAB + side panel, conversational Q&A, inline citations to source docs, inline service recommendations, suggested-question chips

### Market Intelligence (`market-intelligence.html`)
- Featured post hero + filterable feed
- Coverage: EUDR for Argentine soy, ROE Verde & Retenciones, AFIP HS reconciliation, GACC 248/249, EU MRL 2026, US import rules 2026

### Cross-cutting
- EN / ES i18n on landing + nav via `data-i18n` attributes, persisted in `localStorage`
- Shared top nav (`.gnav`) and demo banner across all logged-in surfaces
- Consistent status pills: pass / fail / risk / active / pending
- Responsive: 3 → 2 → 1 col at 980 / 768 px

---

## Value proposition — what to build next

Ordered by **buyer/seller impact × build feasibility**. These are the features that would make AgriMarket genuinely irreplaceable vs. a generic B2B marketplace.

---

### 🥇 Tier 1 — Core differentiators (build these first)

#### 1. Real LLM Compliance Copilot
Wire `passport-copilot.js` to Claude or OpenAI. The Copilot is the single most defensible feature — a compliance officer who knows AFIP, SENASA, ROE Verde, EUDR, GACC 248/249, FDA Prior Notice, and can answer "can I ship this parcel to Germany in Q3 without re-certification?" in seconds. Keep the citation + inline-service contract already built.

#### 2. Retenciones & basis calculator
Argentine sellers live by the spread between Rosario FOB and CBOT futures minus export taxes. A live calculator — enter volume + commodity + shipment date → see net USD after retenciones (35% soy, 12% corn, 12% wheat) → compare vs. local flat-price — would be opened daily. No equivalent exists in a marketplace format.

#### 3. EUDR traceability module
EUDR came into force Dec 2024 and is the #1 blocker for Argentine soy and beef into the EU. Build a plot-polygon upload + deforestation-risk map overlay (using Global Forest Watch tiles) that feeds directly into the EU Compliance Passport gate. The gate goes from "manual check" to "verified clean" automatically. This alone justifies the platform to EU-facing exporters.

#### 4. Tender board
Let buyers post structured tenders ("100,000 MT non-GMO soy FOB Q3 2026, Rosario, L/C at sight") and sellers submit offers against them. This is how real commodity trade works — most volume is traded on tender, not on browse. The current listing model alone only captures the spot/prompt market.

---

### 🥈 Tier 2 — Stickiness drivers

#### 5. WhatsApp / Telegram price alerts
Argentine agri trade runs on WhatsApp. A bot that pushes "SOY FOB UP-RIVER moved +$4.50/MT — your saved search has 3 new offers" to a phone number converts passive users into daily actives. Build the saved-search + alert preferences first; the messaging channel is a thin wrapper on top.

#### 6. Negotiation thread on listings
Step 2 of "How it works" promises private negotiations. Build a minimal offer / counter-offer / accept thread per listing. This keeps communication on-platform (vs. moving to email) and gives the audit log a real contract trail to attach to.

#### 7. GAFTA-aligned contract generator
Once a negotiation closes, auto-generate a pre-filled GAFTA 100 / GAFTA 78 / FOSFA 81 PDF from the agreed deal terms. Sellers know the clauses, buyers trust the template. E-sign via DocuSign or a lightweight canvas-signature. Step 3 of "How it works" is already in the UI as a promise.

#### 8. KYC fast-track (Sumsub / Jumio integration)
The current KYC is a file-upload form. Integrate Sumsub or Jumio to automate identity + company checks. Verified status in < 24 h instead of the current "48 h" claim. Reduces drop-off at registration significantly — KYC friction is the #1 reason B2B marketplace signups abort.

---

### 🥉 Tier 3 — Market expansion

#### 9. Currency & FX tool
Argentine sellers deal with peso FX controls daily. A widget showing CCL / blue-chip swap / official rate vs. USD/EUR/ARS with a simple hedge calculator (forward rate + cost) is a daily-use tool that keeps sellers on the platform between trades.

#### 10. Vessel & barge tracker (AIS integration)
Show real barge queue depths at Rosario Up-River terminals (a major bottleneck) and vessel ETAs at buyer destination ports. Use MarineTraffic or Pole Star APIs. Surfaces directly inside the Compliance Passport shipment hero.

#### 11. UK / Brazil / India / MENA destination overlays in Passport
Today EU / US / CN are covered. UK (post-Brexit SPS, UKCA), Brazil (MAPA / ANVISA), India (FSSAI) and MENA (halal + Gulf SPS) are the next-largest buyer corridors for Argentine ag. Each overlay is a new gate set — the data model already supports it.

#### 12. Unit & currency switcher on listings
Allow MT → bushels → lbs on grain listings; USD → EUR → ARS on prices. Trivial to build given the data is already parameterized; unlocks US and ARS-denominated domestic sellers.

---

### Open architecture questions

| Question | Why it matters |
|---|---|
| Passport per shipment vs. per contract? | A contract often covers 2–5 partial shipments; the passport should probably be contract-scoped with a per-shipment drill-in. |
| Copilot read-only vs. action-taking? | Can the Copilot book a vendor, refile a DJVE, or only recommend? Action-taking is 10× more valuable but needs a trust / liability layer. |
| Pricing model | Marketplace transaction fee (% of contract) vs. SaaS subscription vs. take-rate on certifier bookings. Certifier take-rate is the most defensible and scalable. |
| Who owns the regulation KB? | Internal desk, partner law firm, or community-edited with editorial review? Freshness is the Copilot's Achilles heel. |

---

## Tech stack

- Vanilla HTML / CSS / JS — zero build step, zero dependencies
- Google Fonts: Fraunces (display) + Roboto (body)
- All data mocked in `*.js` files — replace with real API calls
- `vercel.json` handles clean URLs (`/passport`, `/buyer`, `/market`, etc.)
