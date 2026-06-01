# AgriAlternative — Agri-Commodities Marketplace Prototype

> Argentina-focused agricultural commodities marketplace with buyer/seller dashboards, a Compliance Passport, AI copilot, and market intelligence. Bilingual EN / ES.

---

## 🚀 Live Demo (Vercel)

Deploy this repo to Vercel with one click — it's a fully static site, no build step needed.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

---

## 📁 Project Structure

```
├── index.html                  # Public landing page
├── buyer.html                  # Buyer dashboard
├── seller.html                 # Seller dashboard
├── admin.html                  # Admin panel
├── compliance-passport.html    # Compliance Passport (flagship)
├── market-intelligence.html    # Market intelligence feed
├── search-results.html         # Search results page
├── region.html                 # Region browse page
│
├── shared.css                  # Global tokens + top nav
├── alt-dash.css                # Dashboard chrome (buyer/seller/admin)
│
├── i18n.js                     # EN/ES translation engine
├── lang-widget.js              # Floating language switcher
├── listings-data.js            # Mock listings data
├── passport-data.js            # Compliance passport data layer
├── passport-render.js          # Passport UI renderer
├── passport-copilot.js         # AI copilot (templated — ready for real LLM)
├── demo-banner.js              # Cross-surface demo navigation banner
│
├── favicon.svg                 # Site favicon
├── vercel.json                 # Vercel routing + headers config
└── README.md
```

---

## 🌐 Pages

| URL | File | Description |
|-----|------|-------------|
| `/` | `index.html` | Landing — hero, listings, mega-menu, ticker, market intel preview |
| `/buyer` | `buyer.html` | Buyer dashboard — browse, contracts, saved, profile |
| `/seller` | `seller.html` | Seller dashboard — products, contracts, KYC |
| `/admin` | `admin.html` | Admin panel — moderation, users, KYC, support |
| `/passport` | `compliance-passport.html` | Compliance Passport — gates, audit log, AI copilot |
| `/market` | `market-intelligence.html` | Market intelligence feed |
| `/search` | `search-results.html` | Search results |
| `/region` | `region.html` | Browse by Argentine province |

---

## ✅ Features Built

### Public Landing
- Hero with BUY / SELL tabs, search input, language switcher (EN/ES)
- Category mega-menu (8 commodity groups)
- Featured listings grid with chip filters + favourite toggle
- Browse by region (8 Argentine provinces)
- How it works — 4-step process strip
- Live Rosario FOB price ticker
- Market intelligence preview band
- Product detail drawer + Auth modal

### Compliance Passport ⭐
- 4-shipment strip with destination overlays (EU / US / CN)
- Live pipeline — origin gates → destination gates
- Origin gates: AFIP DJVE, SENASA, ROE Verde, HS, Terminal, B/L
- Destination gates: EU (EUDR, MRL, GMP+), US (APHIS, FDA), CN (GACC 248/249)
- Certifiers & services marketplace
- Live audit log with animated new entries
- Export audit PDF button
- **AI Compliance Copilot** — citations, service recommendations, Q&A

### Dashboards
- Buyer: contracts, saved listings, profile, KYC state
- Seller: listing manager, add product form, verification docs
- Admin: KPIs, moderation queue, user/company/contract tables, KYC review

### Market Intelligence
- Featured post hero + filterable feed
- Coverage: EUDR, ROE Verde, AFIP HS, GACC 248/249, EU MRL, US 2026 rules

### Cross-cutting
- EN / ES i18n on landing + nav
- Shared top nav across all logged-in surfaces
- Demo banner linking all surfaces
- Consistent status pills (pass/fail/risk/active/pending)

---

## 🔧 Deploying to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Import your GitHub repo
4. **No build settings needed** — Framework Preset: `Other`, Output Directory: `./`
5. Click **Deploy**

Clean URLs are configured in `vercel.json` (e.g. `/passport` instead of `/compliance-passport.html`).

---

## 🗺️ Roadmap (High Impact Next Steps)

### Sprint 1
- [ ] Wire AI Copilot to real LLM (hook `passport-copilot.js` to Claude / OpenAI)
- [ ] Export audit PDF (button exists, needs `window.print()` route)
- [ ] Search bar wired to results page
- [ ] Listing favourites persisted to `localStorage`
- [ ] Buyer → Passport deep-link from contract row

### Sprint 2
- [ ] Service booking flow (2-step drawer → audit log entry)
- [ ] Seller "Add product" persisted to localStorage + surfaces on landing
- [ ] Admin moderation queue wired to fake store
- [ ] i18n parity across all surfaces (currently landing + nav only)

### Sprint 3
- [ ] Live negotiation thread on listings
- [ ] Contracts module (GAFTA-aligned PDF + e-sign)
- [ ] UK / Brazil / India / MENA destination overlays
- [ ] Currency switcher (USD / EUR / ARS) + unit switcher (MT / bu / lb)

---

## 🛠️ Tech Stack

- Vanilla HTML / CSS / JS — zero build step, zero dependencies
- Google Fonts (Fraunces + Roboto)
- All data mocked in JS files — swap for real API calls

---

## 📄 License

Prototype / proprietary — not for redistribution.
