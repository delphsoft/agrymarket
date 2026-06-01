/* =================================================================
   COMPLIANCE PASSPORT — data layer
   - SHIPMENTS: 4 live shipment files (EU, US, China demo split)
   - ORIGIN_GATES / REGION_GATES: gate definitions
   - SERVICES: curated certifier catalog (Option C)
   - COMPLIANCE_SOURCES: posts the Copilot can cite
   ================================================================= */

/* ---------- Gate metadata (origin = Argentina, dest = market) ---------- */

const ORIGIN_GATES = [
  { num: 1, id: 'kyc',    name: 'KYC & Counterparty',
    desc: 'Identity, sanctions and beneficial-owner check for both parties; recertified every 12 months.' },
  { num: 2, id: 'djve',   name: 'DJVE Filed',
    desc: 'Declaración Jurada de Ventas al Exterior lodged with AFIP within 24h of contract signing.' },
  { num: 3, id: 'roe',    name: 'ROE Verde Balance',
    desc: 'Registro Oficial de Exportadores. Each shipment must fit within the exporter\'s open monthly allocation.' },
  { num: 4, id: 'senasa', name: 'SENASA Phytosanitary',
    desc: 'SENASA-accredited phyto certificate at loading, EU-aligned residue & GMO declarations attached.' },
  { num: 5, id: 'afip',   name: 'AFIP Retenciones',
    desc: 'Export-tax & anticipo de retenciones lodged before B/L. Cut-off T-72h from ETA.' },
  { num: 6, id: 'hsfx',   name: 'Customs HS & FX',
    desc: 'HS code consistency DJVE↔B/L↔customs entry. FX repatriation within 15 days of B/L.' }
];

const REGION_GATES = {
  eu: {
    label: 'European Union',
    flag: '🇪🇺',
    blurb: 'Stricter deforestation, residue and SPS rules. Rotterdam customs auto-runs geo-checks at lodge.',
    gates: [
      { num: 7, id: 'eudr',   name: 'EUDR Deforestation-Free',
        desc: 'EU Regulation 2023/1115. Plot-level geolocations + deforestation-free attestation against the 31 Dec 2020 cut-off.' },
      { num: 8, id: 'eu-mrl', name: 'EU MRL & SPS',
        desc: 'Pesticide residue limits (EC 396/2005) and EU SPS declarations consistent with the SENASA phyto cert.' }
    ]
  },
  us: {
    label: 'United States',
    flag: '🇺🇸',
    blurb: 'Three federal touchpoints: APHIS at the port, FDA prior notice for food-use, and USDA BE disclosure.',
    gates: [
      { num: 7, id: 'aphis',  name: 'USDA APHIS Phyto Permit',
        desc: 'Import permit + Phyto Cert 7CFR 319, validated by APHIS-accredited inspector at origin.' },
      { num: 8, id: 'fda-pn', name: 'FDA Prior Notice',
        desc: 'Prior Notice of Imported Foods filed via PNSI no later than 8h before arrival.' },
      { num: 9, id: 'usda-be', name: 'USDA Bioengineered Disclosure',
        desc: 'NBFDS disclosure for GMO content. Statement + label artwork required on the consignment.' }
    ]
  },
  cn: {
    label: 'China (GACC)',
    flag: '🇨🇳',
    blurb: 'Heavy GACC pre-registration regime + commodity-specific CIQ inspection at the load port.',
    gates: [
      { num: 7, id: 'gacc',     name: 'GACC Exporter Registration',
        desc: 'GACC Decree 248/249 registration current for both seller establishment and product category.' },
      { num: 8, id: 'ciq',      name: 'CIQ Pre-shipment Inspection',
        desc: 'CIQ-accredited inspection at load port. Cert. issued before B/L, valid 90 days.' },
      { num: 9, id: 'gb-2763',  name: 'GB-2763 Residue Compliance',
        desc: 'Chinese maximum residue limits, GMO declaration per GB-19641 if applicable.' }
    ]
  }
};

/* ---------- Services & Certifiers marketplace (Option C) ---------- */

const SERVICES = [
  { vendor: 'Control Union',  short: 'CU',  color: '#1e3a8a',
    service: 'EUDR Geolocation Audit & Attestation',
    region: 'eu', unlocks: 'eudr',
    leadTime: '24-48 h',  price: '$1,800',
    blurb: 'Plot-level coordinate verification against the 31 Dec 2020 baseline. ISO 17065 accredited.',
    rating: 4.8, jobs: 1820 },
  { vendor: 'SGS',            short: 'SGS', color: '#0f766e',
    service: 'CIQ Pre-shipment Inspection',
    region: 'cn', unlocks: 'ciq',
    leadTime: '3-5 days', price: '$4,200',
    blurb: 'GACC-recognised CIQ inspection on bulk grain & oilseeds at Rosario, Bahía Blanca, San Lorenzo.',
    rating: 4.7, jobs: 1140 },
  { vendor: 'Cotecna',        short: 'COT', color: '#b45309',
    service: 'USDA APHIS Phyto + Container Inspection',
    region: 'us', unlocks: 'aphis',
    leadTime: '24 h',     price: '$1,250',
    blurb: 'APHIS-accredited phyto. Container/bulk inspection at Up-River and BB terminals.',
    rating: 4.6, jobs: 820 },
  { vendor: 'Bureau Veritas', short: 'BV',  color: '#6d28d9',
    service: 'Residue & MRL lab panel (EU & CN)',
    region: 'any', unlocks: 'eu-mrl',
    leadTime: '48-72 h',  price: '$2,400',
    blurb: 'Accredited lab panel covering EC 396/2005 and GB-2763 residue thresholds.',
    rating: 4.7, jobs: 640 },
  { vendor: 'Intertek',       short: 'IT',  color: '#0369a1',
    service: 'FDA Prior Notice filing',
    region: 'us', unlocks: 'fda-pn',
    leadTime: '4 h',      price: '$320',
    blurb: 'Prior Notice submitted to FDA PNSI portal; tracks to vessel ETA.',
    rating: 4.5, jobs: 510 },
  { vendor: 'AgriMarket',     short: 'AM',  color: '#2563EB',
    service: 'USDA BE Disclosure pack',
    region: 'us', unlocks: 'usda-be',
    leadTime: 'Instant',  price: 'Included',
    blurb: 'Auto-generated NBFDS disclosure + label artwork from the contract\'s GMO declaration.',
    rating: 4.9, jobs: 2200 }
];

/* ---------- Shipment files ----------
   gates: array indexed 1..6 -> { state, evidence:[{k,v,cls}], filedAt, footLeft, footRight }
   destGates: array of { id, state, evidence, filedAt, footLeft, footRight }
   states: 'pass' | 'fail' | 'risk' | 'active' | 'pending'
*/

const SHIPMENTS = [

  /* =================== 0418  EU bound  Soy =================== */
  {
    id: 'SHP-2026-0418', code: '0418', eta: 'ETA May 22',
    product: { name: 'Soybean (Hi-Pro 46%)', short: 'Soybean HiPro' },
    volumeMT: 25000, volumeLabel: '25,000 MT',
    contractValue: '$11.85M', fobPrice: 'FOB $474/MT · L/C at sight',
    laycan: 'May 20-24', contract: 'C-2026-1188',
    origin:      { flag: '🇦🇷', port: 'Terminal 6, Rosario',  short: 'Rosario' },
    destination: { region: 'eu', flag: '🇳🇱', port: 'Port of Rotterdam', short: 'Rotterdam' },
    seller: 'Adecoagro S.A.', buyer: 'Cefetra B.V.',
    verdict: { state: 'fail', label: '⚠ 3 gates blocking', sub: 'Vessel laycan May 20-24 · fixes due 48h' },
    summary: '<b>3 passed</b> · <b>2 at risk</b> · <b>3 failed</b> · last event 4 min ago',

    gates: {
      kyc:    { state: 'pass', filedAt: 'Mar 14, 2026', footLeft: 'Recertifies Mar 2027', footRight: '3 documents',
        evidence: [
          { k: 'Buyer (Cefetra B.V.)',   v: 'Verified · Tier-1', cls: 'ok' },
          { k: 'Seller (Adecoagro)',     v: 'Verified · Tier-1', cls: 'ok' },
          { k: 'Sanctions (OFAC/EU/UN)', v: 'Clear', cls: 'ok' },
          { k: 'UBO refreshed',          v: 'Mar 14, 2026' }
      ] },
      djve:   { state: 'pass', filedAt: 'May 02, 14:22 ART', footLeft: 'Locked · amendable', footRight: 'View filing',
        evidence: [
          { k: 'DJVE no.',     v: 'DJ-2026-118842' },
          { k: 'Filed',        v: 'May 02, 14:22 ART' },
          { k: 'SLA window',   v: '+18h of signing', cls: 'ok' },
          { k: 'HS declared',  v: '1201.90.00' }
      ] },
      roe:    { state: 'fail', filedAt: 'May 17, 2026', footLeft: 'Blocking customs', footRight: 'Fix above ↑',
        evidence: [
          { k: 'May allocation',     v: '23,200 MT' },
          { k: 'Shipment volume',    v: '25,000 MT' },
          { k: 'Over allocation',    v: '−1,800 MT', cls: 'warn' },
          { k: 'Next window opens',  v: 'Jun 01, 09:00 ART' }
      ] },
      senasa: { state: 'pass', filedAt: 'Issued May 11', footLeft: 'Issued May 11', footRight: 'Open cert',
        evidence: [
          { k: 'Cert. no.',       v: 'AR-2026-08312' },
          { k: 'Inspector',       v: 'SENASA · Rosario' },
          { k: 'Aflatoxin B1',    v: '0.6 ppb (limit 5)', cls: 'ok' },
          { k: 'EUDR origin proof', v: 'Geolocations attached', cls: 'ok' }
      ] },
      afip:   { state: 'risk', filedAt: 'May 13, 16:08 ART', footLeft: 'Auto-recheck every 30 min', footRight: 'View filing',
        evidence: [
          { k: 'Effective rate',    v: '33% · soybeans' },
          { k: 'Anticipo lodged',   v: 'May 13, 16:08 ART', cls: 'amber' },
          { k: 'SLA',               v: '+14h after T-72h cut-off', cls: 'amber' },
          { k: 'AFIP review',       v: 'In review · likely OK' }
      ] },
      hsfx:   { state: 'fail', filedAt: 'May 17', footLeft: 'Blocking customs', footRight: 'Send corrigendum ↑',
        evidence: [
          { k: 'DJVE HS',         v: '1201.90.00' },
          { k: 'B/L draft HS',    v: '1201.10.00 ⚠', cls: 'warn' },
          { k: 'Customs status',  v: 'Will reject on lodge', cls: 'warn' },
          { k: 'FX repatriation', v: 'Pending B/L date' }
      ] }
    },

    destGates: {
      eudr:    { state: 'risk', filedAt: 'May 14, 2026', footLeft: 'Blocking at Rotterdam customs', footRight: 'Fix below ↓',
        evidence: [
          { k: 'Plots required',     v: '184 polygons' },
          { k: 'Plots attached',     v: '182 / 184', cls: 'amber' },
          { k: 'GFW baseline check', v: '2 plots missing 2020 baseline', cls: 'warn' },
          { k: 'DDS reference',      v: 'DDS-2026-AR-3120' }
      ] },
      'eu-mrl':{ state: 'pass', filedAt: 'May 11, 2026', footLeft: 'Lab panel passed', footRight: 'Open lab report',
        evidence: [
          { k: 'Glyphosate',        v: '0.4 mg/kg (limit 20)', cls: 'ok' },
          { k: 'Chlorpyrifos',      v: 'Not detected', cls: 'ok' },
          { k: 'Lab',               v: 'Bureau Veritas BA' },
          { k: 'Panel',             v: 'EC 396/2005, 184 substances' }
      ] }
    },

    fixes: [
      { gate: 3, severity: 'fail', icon: '⛔', title: 'ROE Verde balance exhausted',
        detail: 'Your soy ROE Verde allocation for May closed at 23,200 MT after Adecoagro\'s earlier nomination. Current shipment is <b>1,800 MT over</b> the May ceiling.',
        suggest: 'Two paths. <b>(a)</b> Re-split the B/L: 23,200 MT under the May allocation + 1,800 MT held for June 1 release (ETR loss ~$0.40/MT on the carry). <b>(b)</b> Request supplementary ROE allocation — typical AFIP issuance 24-48 h, success rate ~70% for clean exporters.',
        actions: [
          { kind: 'solid', label: 'Apply split (a)' },
          { kind: 'ghost', label: 'File request (b)' },
          { kind: 'ghost', label: 'Ask Copilot' }
      ] },
      { gate: 6, severity: 'fail', icon: '⛔', title: 'HS code mismatch DJVE ↔ B/L draft',
        detail: 'DJVE was filed under <b>1201.90.00</b> (soybeans, other). Terminal-6 draft B/L came back coded <b>1201.10.00</b> (seed soybeans). Mismatch will trigger automatic AFIP rejection at customs gate.',
        suggest: 'Issue a B/L corrigendum to the terminal agent (Cofco) re-coding to <b>1201.90.00</b> before customs lodgement. Pre-filled corrigendum drafted — review and 1-click send. ETA to clear: 6-8 h.',
        actions: [
          { kind: 'solid', label: 'Send corrigendum' },
          { kind: 'ghost', label: 'Open draft' },
          { kind: 'ghost', label: 'Ask Copilot' }
      ] },
      { gate: 7, severity: 'risk', icon: '⚠', title: 'EUDR — 2 plot polygons missing 2020 baseline',
        detail: 'Rotterdam customs auto-checks every plot polygon against Global Forest Watch\'s 31 Dec 2020 baseline. <b>2 of 184 plots</b> from a new La Pampa producer don\'t have a baseline match — they\'ll be held on arrival.',
        suggest: 'Two options. <b>(a)</b> Book a Control Union geo-audit (24-48h, $1,800) to back-verify the two plots against satellite imagery. <b>(b)</b> Swap those plots for substitutes from the same cooperative\'s pre-cleared inventory — same physical beans, different chain-of-custody trail.',
        actions: [
          { kind: 'solid', label: 'Book Control Union' },
          { kind: 'ghost', label: 'Swap plots' },
          { kind: 'ghost', label: 'Ask Copilot' }
      ] }
    ],

    audit: [
      { t: '12:42', state: 'active', who: 'AgriMarket · auto',
        msg: '<b>Platform suggestion drafted</b> — HS-code corrigendum for B/L pre-filled (1201.10.00 → 1201.90.00). Awaiting your send.' },
      { t: '12:38', state: 'fail', who: 'Cofco · terminal sync',
        msg: '<b>Gate 6 failed</b> — Terminal-6 B/L draft returned with HS 1201.10.00; conflict with DJVE filing.' },
      { t: '11:14', state: 'fail', who: 'AFIP · ROE feed',
        msg: '<b>Gate 3 failed</b> — Soy ROE Verde May allocation moved to 23,200 MT after a partner nomination cleared. Current shipment 1,800 MT over.' },
      { t: '10:31', state: 'risk', who: 'Rotterdam customs · sync',
        msg: '<b>Gate 7 flagged at risk</b> — EU customs flagged 2 of 184 EUDR plots without a 2020 baseline match.' },
      { t: '09:02', state: 'risk', who: 'AFIP · status feed',
        msg: '<b>Gate 5 flagged at risk</b> — Anticipo de retenciones lodged 14 h past the T-72h SLA; AFIP marks in review.' },
      { t: 'May 11', state: 'pass', who: 'SENASA · Rosario',
        msg: '<b>Gate 4 passed</b> — SENASA phyto cert AR-2026-08312 issued. Aflatoxin 0.6 ppb, EUDR geo-IDs attached.' },
      { t: 'May 02', state: 'pass', who: 'Adecoagro · ops',
        msg: '<b>Gate 2 passed</b> — DJVE DJ-2026-118842 filed within SLA. HS declared 1201.90.00.' },
      { t: 'Mar 14', state: 'pass', who: 'AgriMarket · compliance',
        msg: '<b>Gate 1 passed</b> — KYC refresh complete for both counterparties. UBO files current.' }
    ]
  },

  /* =================== 0414  US bound  Corn =================== */
  {
    id: 'SHP-2026-0414', code: '0414', eta: 'ETA Jun 03',
    product: { name: 'Corn yellow #2 GMO', short: 'Corn #2' },
    volumeMT: 18500, volumeLabel: '18,500 MT',
    contractValue: '$3.42M', fobPrice: 'FOB $185/MT · CAD against docs',
    laycan: 'Jun 01-04', contract: 'C-2026-1162',
    origin:      { flag: '🇦🇷', port: 'Bahía Blanca',          short: 'Bahía Blanca' },
    destination: { region: 'us', flag: '🇺🇸', port: 'Port of Wilmington, NC', short: 'Wilmington' },
    seller: 'Asociación de Cooperativas Argentinas', buyer: 'Cargill Inc.',
    verdict: { state: 'fail', label: '⛔ 1 gate blocking', sub: 'BE disclosure missing — fix in <2h' },
    summary: '<b>8 passed</b> · <b>1 failed</b> · last event 7 min ago',

    gates: {
      kyc:    { state: 'pass', footLeft: 'Recertifies Sep 2026', footRight: '4 documents',
        evidence: [
          { k: 'Buyer (Cargill Inc.)',  v: 'Verified · Tier-1', cls: 'ok' },
          { k: 'Seller (ACA)',          v: 'Verified · Tier-1', cls: 'ok' },
          { k: 'Sanctions',             v: 'Clear', cls: 'ok' },
          { k: 'UBO refreshed',         v: 'Sep 02, 2025' }
      ] },
      djve:   { state: 'pass', footLeft: 'Filed within 8h of signing', footRight: 'View filing',
        evidence: [
          { k: 'DJVE no.',    v: 'DJ-2026-119102' },
          { k: 'Filed',       v: 'May 09, 11:18 ART' },
          { k: 'SLA window',  v: '+8h of signing', cls: 'ok' },
          { k: 'HS declared', v: '1005.90.10' }
      ] },
      roe:    { state: 'pass', footLeft: 'Within May allocation', footRight: 'View allocation',
        evidence: [
          { k: 'May allocation',  v: '85,000 MT' },
          { k: 'Used to date',    v: '62,500 MT' },
          { k: 'Shipment volume', v: '18,500 MT' },
          { k: 'Headroom',        v: '+4,000 MT', cls: 'ok' }
      ] },
      senasa: { state: 'pass', footLeft: 'Issued May 18', footRight: 'Open cert',
        evidence: [
          { k: 'Cert. no.',     v: 'AR-2026-08488' },
          { k: 'Inspector',     v: 'SENASA · Bahía Blanca' },
          { k: 'Moisture',      v: '13.8% (limit 14)', cls: 'ok' },
          { k: 'Broken kernels',v: '2.1% (limit 5)', cls: 'ok' }
      ] },
      afip:   { state: 'pass', footLeft: 'Cleared T-72h SLA', footRight: 'View filing',
        evidence: [
          { k: 'Effective rate', v: '12% · corn' },
          { k: 'Anticipo',       v: 'May 28, 09:14 ART', cls: 'ok' },
          { k: 'SLA',            v: 'T-78h before ETA', cls: 'ok' },
          { k: 'AFIP review',    v: 'Approved' }
      ] },
      hsfx:   { state: 'pass', footLeft: 'HS aligned, FX pending B/L', footRight: 'View B/L',
        evidence: [
          { k: 'DJVE HS',        v: '1005.90.10' },
          { k: 'B/L draft HS',   v: '1005.90.10', cls: 'ok' },
          { k: 'Customs status', v: 'Ready to lodge', cls: 'ok' },
          { k: 'FX repatriation',v: 'Pending B/L date' }
      ] }
    },

    destGates: {
      aphis:    { state: 'pass', footLeft: 'Validated by APHIS-accredited Cotecna', footRight: 'Open cert',
        evidence: [
          { k: 'APHIS permit no.', v: 'P526P-26-04412' },
          { k: 'Cert. inspector',  v: 'Cotecna · Bahía Blanca' },
          { k: 'Issued',           v: 'May 18, 2026', cls: 'ok' },
          { k: 'Valid until',      v: 'Jul 18, 2026' }
      ] },
      'fda-pn': { state: 'pass', footLeft: 'PNSI confirmation in hand', footRight: 'View confirmation',
        evidence: [
          { k: 'Prior Notice no.', v: 'PN-26-1442880' },
          { k: 'Filed',            v: 'May 25, 22:14 EST', cls: 'ok' },
          { k: 'ETA',              v: 'Jun 03, 06:00 EST' },
          { k: 'Lead time',        v: '+9 days before ETA', cls: 'ok' }
      ] },
      'usda-be': { state: 'fail', footLeft: 'Blocking US port release', footRight: 'Fix below ↓',
        evidence: [
          { k: 'BE content',         v: 'Yes (event MON810)' },
          { k: 'Disclosure on label',v: 'Missing', cls: 'warn' },
          { k: 'Label artwork',      v: 'Not attached', cls: 'warn' },
          { k: 'Risk',               v: 'Detention at Wilmington', cls: 'warn' }
      ] }
    },

    fixes: [
      { gate: 9, severity: 'fail', icon: '⛔', title: 'USDA Bioengineered disclosure missing',
        detail: 'Cargo contains MON810 corn (declared in the contract). USDA NBFDS requires a "bioengineered" disclosure statement + label artwork on the consignment. Neither is attached.',
        suggest: 'AgriMarket can auto-generate the NBFDS pack (disclosure text + on-pack label artwork in en/es) from your contract\'s GMO declaration. Instant, included in your plan. After that, the disclosure flows into the B/L pack automatically.',
        actions: [
          { kind: 'solid', label: 'Generate BE pack (free)' },
          { kind: 'ghost', label: 'Upload my own' },
          { kind: 'ghost', label: 'Ask Copilot' }
      ] }
    ],

    audit: [
      { t: '13:18', state: 'fail', who: 'Wilmington · pre-check',
        msg: '<b>Gate 9 failed</b> — USDA Bioengineered disclosure missing on B/L pack. Cargo carries MON810 per contract.' },
      { t: '12:02', state: 'pass', who: 'FDA PNSI · sync',
        msg: '<b>Gate 8 passed</b> — Prior Notice PN-26-1442880 confirmed by FDA.' },
      { t: 'May 28', state: 'pass', who: 'AFIP · status feed',
        msg: '<b>Gate 5 passed</b> — Anticipo de retenciones approved within T-72h SLA.' },
      { t: 'May 25', state: 'pass', who: 'Cotecna · APHIS',
        msg: '<b>Gate 7 passed</b> — APHIS phyto P526P-26-04412 issued at Bahía Blanca.' },
      { t: 'May 18', state: 'pass', who: 'SENASA · BB',
        msg: '<b>Gate 4 passed</b> — SENASA phyto cert AR-2026-08488 issued.' },
      { t: 'May 09', state: 'pass', who: 'ACA · ops',
        msg: '<b>Gate 2 passed</b> — DJVE DJ-2026-119102 filed in 8h.' }
    ]
  },

  /* =================== 0407  China bound  Soy meal =================== */
  {
    id: 'SHP-2026-0407', code: '0407', eta: 'B/L May 03 ✓',
    product: { name: 'Soybean meal 48% Hi-Pro', short: 'Soy meal' },
    volumeMT: 32000, volumeLabel: '32,000 MT',
    contractValue: '$13.95M', fobPrice: 'FOB $436/MT · L/C at sight',
    laycan: 'Apr 28-May 03', contract: 'C-2026-1097',
    origin:      { flag: '🇦🇷', port: 'San Lorenzo Up-River', short: 'San Lorenzo' },
    destination: { region: 'cn', flag: '🇨🇳', port: 'Port of Tianjin', short: 'Tianjin' },
    seller: 'COFCO International Argentina', buyer: 'COFCO China Trading',
    verdict: { state: 'pass', label: '✓ All 9 gates cleared', sub: 'B/L issued May 03 · FX repatriated May 12' },
    summary: '<b>9 passed</b> · <b>0 issues</b> · cleared May 12',

    gates: {
      kyc:    { state: 'pass', footLeft: 'Group-level KYC', footRight: '6 documents',
        evidence: [
          { k: 'Buyer (COFCO China)',  v: 'Verified · Tier-1', cls: 'ok' },
          { k: 'Seller (COFCO AR)',    v: 'Verified · Tier-1', cls: 'ok' },
          { k: 'Intercompany flag',    v: 'Disclosed' },
          { k: 'UBO refreshed',        v: 'Jan 10, 2026' }
      ] },
      djve:   { state: 'pass', footLeft: 'Cleared', footRight: 'View filing',
        evidence: [
          { k: 'DJVE no.',    v: 'DJ-2026-117310' },
          { k: 'Filed',       v: 'Apr 12, 09:40 ART', cls: 'ok' },
          { k: 'SLA',         v: '+4h of signing', cls: 'ok' },
          { k: 'HS declared', v: '2304.00.10' }
      ] },
      roe:    { state: 'pass', footLeft: 'Cleared', footRight: 'View allocation',
        evidence: [
          { k: 'Apr allocation',  v: '180,000 MT' },
          { k: 'Used',            v: '142,000 MT' },
          { k: 'Headroom',        v: '+6,000 MT', cls: 'ok' },
          { k: 'Closed',          v: 'Apr 30' }
      ] },
      senasa: { state: 'pass', footLeft: 'Cleared', footRight: 'Open cert',
        evidence: [
          { k: 'Cert. no.',  v: 'AR-2026-07911' },
          { k: 'Inspector',  v: 'SENASA · San Lorenzo' },
          { k: 'Salmonella', v: 'Not detected', cls: 'ok' },
          { k: 'GMO decl.',  v: 'RR1 / Liberty Link disclosed' }
      ] },
      afip:   { state: 'pass', footLeft: 'Cleared', footRight: 'View filing',
        evidence: [
          { k: 'Effective rate', v: '31% · soy meal' },
          { k: 'Anticipo',       v: 'Apr 28', cls: 'ok' },
          { k: 'AFIP review',    v: 'Approved' },
          { k: 'Final retención',v: 'Settled May 04' }
      ] },
      hsfx:   { state: 'pass', footLeft: 'Cleared, FX repatriated', footRight: 'View B/L',
        evidence: [
          { k: 'DJVE HS',          v: '2304.00.10' },
          { k: 'B/L HS',           v: '2304.00.10', cls: 'ok' },
          { k: 'Customs',          v: 'Lodged May 03', cls: 'ok' },
          { k: 'FX repatriation',  v: 'May 12 · in window', cls: 'ok' }
      ] }
    },

    destGates: {
      gacc:     { state: 'pass', footLeft: 'Both parties pre-registered', footRight: 'View registration',
        evidence: [
          { k: 'GACC reg. (seller)',  v: 'CHC-AR-2024-118', cls: 'ok' },
          { k: 'Decree 248/249',      v: 'Compliant', cls: 'ok' },
          { k: 'Category',            v: 'Soy meal · feed-grade' },
          { k: 'Valid until',         v: '2027-01-15' }
      ] },
      ciq:      { state: 'pass', footLeft: 'Issued at load port', footRight: 'View cert',
        evidence: [
          { k: 'CIQ cert. no.',     v: 'CN-CIQ-26-08819' },
          { k: 'Inspector',         v: 'SGS · San Lorenzo' },
          { k: 'Issued',            v: 'Apr 30, 2026', cls: 'ok' },
          { k: 'Valid 90 days',     v: 'Through Jul 30' }
      ] },
      'gb-2763':{ state: 'pass', footLeft: 'Within all CN MRL ceilings', footRight: 'Lab report',
        evidence: [
          { k: 'Aflatoxin B1',  v: '0.4 ppb (limit 10)', cls: 'ok' },
          { k: 'Heavy metals',  v: 'Within Cd / Pb limits', cls: 'ok' },
          { k: 'GMO decl.',     v: 'Per GB-19641', cls: 'ok' },
          { k: 'Lab',           v: 'Bureau Veritas BA' }
      ] }
    },

    fixes: [],

    audit: [
      { t: 'May 12', state: 'pass', who: 'AFIP · FX feed',
        msg: '<b>Shipment fully settled</b> — FX repatriation registered. Passport closed clean.' },
      { t: 'May 03', state: 'pass', who: 'Customs · San Lorenzo',
        msg: '<b>B/L lodged</b> — all 9 gates green at customs lodge. Vessel sailed 14:20 ART.' },
      { t: 'Apr 30', state: 'pass', who: 'SGS · CIQ',
        msg: '<b>Gate 8 passed</b> — CIQ pre-shipment inspection cert CN-CIQ-26-08819 issued.' },
      { t: 'Apr 28', state: 'pass', who: 'AgriMarket · sync',
        msg: '<b>Gate 7 passed</b> — GACC registration confirmed against Decree 248 for soy meal category.' }
    ]
  },

  /* =================== 0421  EU bound  Wheat (in progress) =================== */
  {
    id: 'SHP-2026-0421', code: '0421', eta: 'ETA Jun 12',
    product: { name: 'Wheat ART 11.5% protein', short: 'Wheat 11.5%' },
    volumeMT: 12000, volumeLabel: '12,000 MT',
    contractValue: '$2.40M', fobPrice: 'FOB $200/MT · L/C at sight',
    laycan: 'Jun 10-14', contract: 'C-2026-1204',
    origin:      { flag: '🇦🇷', port: 'Quequén',         short: 'Quequén' },
    destination: { region: 'eu', flag: '🇩🇪', port: 'Port of Hamburg', short: 'Hamburg' },
    seller: 'Oleocampo S.C.A', buyer: 'Mühle Rüningen GmbH',
    verdict: { state: 'prog', label: '◐ Gate 2 of 8 · on track', sub: 'Vessel laycan Jun 10-14 · 24 days runway' },
    summary: '<b>1 passed</b> · <b>1 active</b> · 6 pending',

    gates: {
      kyc:    { state: 'pass', footLeft: 'Recertifies Jul 2026', footRight: '3 documents',
        evidence: [
          { k: 'Buyer',         v: 'Verified · Tier-2', cls: 'ok' },
          { k: 'Seller',        v: 'Verified · Tier-1', cls: 'ok' },
          { k: 'Sanctions',     v: 'Clear', cls: 'ok' },
          { k: 'UBO refreshed', v: 'Jul 2025' }
      ] },
      djve:   { state: 'active', footLeft: 'AFIP portal open', footRight: 'Resume filing',
        evidence: [
          { k: 'Draft prepared', v: 'Yes', cls: 'ok' },
          { k: 'HS prepared',    v: '1001.99.00' },
          { k: 'SLA',            v: '6h remaining to file' },
          { k: 'Filed',          v: '— not yet —' }
      ] },
      roe:    { state: 'pending', footLeft: 'Awaits DJVE', footRight: '—', evidence: [
          { k: 'Pre-check',       v: 'Headroom: +8,400 MT', cls: 'ok' },
          { k: 'Auto-files',      v: 'On DJVE confirmation' }
      ] },
      senasa: { state: 'pending', footLeft: 'Booked', footRight: '—', evidence: [
          { k: 'Inspection booked', v: 'May 30 · Quequén' },
          { k: 'Inspector',         v: 'SENASA · Necochea' }
      ] },
      afip:   { state: 'pending', footLeft: 'Auto-files at T-72h', footRight: '—', evidence: [
          { k: 'Anticipo schedule', v: 'Jun 07' },
          { k: 'Effective rate',    v: '12% · wheat' }
      ] },
      hsfx:   { state: 'pending', footLeft: 'Awaits B/L', footRight: '—', evidence: [
          { k: 'Pre-check', v: 'HS aligned in contract' }
      ] }
    },

    destGates: {
      eudr:    { state: 'pending', footLeft: 'Awaits SENASA cert', footRight: '—',
        evidence: [
          { k: 'Plots in supplier file', v: '64 polygons' },
          { k: 'GFW pre-check',          v: 'All green', cls: 'ok' },
          { k: 'DDS reference',          v: 'To be issued at load' }
      ] },
      'eu-mrl':{ state: 'pending', footLeft: 'Lab booked', footRight: '—',
        evidence: [
          { k: 'Booked', v: 'Jun 02 · BV Buenos Aires' },
          { k: 'Panel', v: 'EC 396/2005' }
      ] }
    },

    fixes: [],

    audit: [
      { t: '11:08', state: 'active', who: 'Oleocampo · ops',
        msg: '<b>Gate 2 in progress</b> — DJVE draft prepared, 6h remaining in SLA window.' },
      { t: '08:42', state: 'pass', who: 'AgriMarket · compliance',
        msg: '<b>Gate 1 passed</b> — KYC complete for Mühle Rüningen GmbH.' }
    ]
  }
];

/* ---------- Compliance source posts (used by Copilot citations) ---------- */

const COMPLIANCE_SOURCES = [
  {
    id: 'cp-2026-05-15',
    title: 'Retenciones & ROE Verde: what soy & corn exporters must file in Q3',
    date: 'May 15, 2026', author: 'Compliance team', region: 'origin',
    excerpt: 'A practical checklist of the export-tax declarations and ROE Verde windows your shipments need before nomination.',
    body: [
      'AFIP has clarified Q3 filing windows for export-tax (derechos de exportación / retenciones) declarations on soy, corn and wheat shipments. The headline change: nomination cut-off now sits 72 hours before vessel ETA rather than 48.',
      'A working checklist for exporters: (1) Confirm ROE Verde is open for your commodity and origin port; (2) Lodge the DJVE within 24h of contract signing; (3) Submit anticipo de retenciones before B/L date; (4) Retain SENASA phyto and origin paperwork for the audit window (now 5 years).',
      'Common rejection reasons we see: mismatched HS codes between DJVE and B/L, ROE Verde balance exhausted mid-shipment, and FX settlement falling outside the 15-day window from B/L.'
    ]
  },
  {
    id: 'cp-2026-05-08',
    title: 'SENASA: new phyto requirements for citrus into the EU',
    date: 'May 8, 2026', author: 'Compliance team', region: 'eu',
    excerpt: 'Effective July 1, additional cold-treatment certification is required for Tucumán lemons and oranges shipped to EU ports.',
    body: [
      'SENASA published new phytosanitary requirements aligned with EU Regulation 2024/xxxx for citrus shipments. From July 1, exporters must produce cold-treatment certificates documenting a 1.1°C / 16-day regime, validated by an accredited inspector.',
      'Exporters with vessels already loading in late June should liaise with SENASA inspectors this week to avoid documentation gaps at destination.'
    ]
  },
  {
    id: 'cp-2026-04-22',
    title: 'EUDR deforestation-free deadline: what Argentine soy exporters must attach',
    date: 'Apr 22, 2026', author: 'Compliance team', region: 'eu',
    excerpt: 'EU operators now require plot-level geolocation, deforestation-free attestation and a chain-of-custody trail on every soybean shipment landed in EU ports.',
    body: [
      'The EU Deforestation Regulation (EUDR) is now fully enforced for soy. Every consignment landing at an EU port must carry plot-level geolocations (latitude/longitude pairs or polygons), a deforestation-free attestation referencing 31 December 2020 as the cut-off date, and a chain-of-custody trail back to the producing farm or cooperative.',
      'For Rotterdam in particular, customs is using automated geo-checks against Global Forest Watch baselines. A missing or mismatched coordinate triggers a hold; the typical clearance delay is 5-9 days.',
      'Our advice for soy shippers: bundle the EUDR pack with your SENASA phyto cert so it travels with the shipment. AgriMarket auto-attaches the geo-IDs registered against the seller\'s plot file.'
    ]
  },
  {
    id: 'cp-2026-04-10',
    title: 'AFIP HS code reconciliation: how to avoid customs rejection at lodge',
    date: 'Apr 10, 2026', author: 'Compliance team', region: 'origin',
    excerpt: 'The single biggest cause of customs hold this quarter is a stale HS code on the B/L. A short guide to keeping DJVE, B/L and customs entry aligned.',
    body: [
      'AFIP\'s automated customs lodge will reject any consignment where the HS code on the B/L does not match the HS code on the underlying DJVE filing. Even a sub-line mismatch (e.g. 1201.10 vs 1201.90 for soybeans) is rejected.',
      'If a discrepancy is found before lodge, the standard fix is a B/L corrigendum issued by the terminal agent. Typical turnaround at Rosario / Up-River terminals is 6-8 hours. After lodge, a corrigendum requires AFIP re-submission and adds 24-48 h.',
      'AgriMarket sync-checks the DJVE HS against the draft B/L the moment the terminal posts it, and pre-fills the corrigendum if a mismatch is detected.'
    ]
  },
  {
    id: 'cp-2026-04-03',
    title: 'US import rules 2026: APHIS, FDA Prior Notice & USDA Bioengineered disclosure',
    date: 'Apr 3, 2026', author: 'Compliance team', region: 'us',
    excerpt: 'A three-touchpoint primer for shipping Argentine grain into US ports: APHIS phyto, FDA PN, and the NBFDS bioengineered disclosure for GMO cargo.',
    body: [
      'Bulk grain and oilseeds landing in the United States need to clear three federal touchpoints. (1) USDA APHIS phyto permit + cert issued by an APHIS-accredited inspector at origin. (2) FDA Prior Notice filed via the PNSI portal — minimum 8 hours before vessel arrival, but practically file at B/L issuance to avoid scrambling. (3) USDA NBFDS bioengineered disclosure when cargo contains GMO events: a disclosure statement plus on-pack label artwork (USDA-approved icon or text).',
      'Common US-port hold reasons: missing BE label on MON810 / RR2 corn, late Prior Notice filings, and APHIS permits expired between vessel sailing and arrival (permits are valid 60 days from issuance — re-issue if your transit is longer).',
      'AgriMarket auto-generates the NBFDS pack from your contract\'s declared GMO events and pre-fills FDA Prior Notice from the carrier feed.'
    ]
  },
  {
    id: 'cp-2026-03-20',
    title: 'GACC Decree 248/249 for Argentine soy meal exporters',
    date: 'Mar 20, 2026', author: 'Compliance team', region: 'cn',
    excerpt: 'China\'s pre-registration regime — what to register, where, and how to keep CIQ pre-shipment inspections fast.',
    body: [
      'GACC Decree 248 (general registration) and Decree 249 (food safety management) require Argentine exporter establishments and product categories to be pre-registered with China customs (GACC) before any consignment can land. Registration is per facility AND per HS category; a soy-meal-registered facility cannot ship whole soybeans without a separate category.',
      'For each shipment, GACC also expects a CIQ pre-shipment inspection cert issued at the load port by a CIQ-recognised body (SGS, BV, Cotecna and a handful of CCIC affiliates). Cert is valid 90 days from issuance.',
      'GB-2763 (pesticide residues) and GB-19641 (GMO labelling for soy) are checked at unloading. Pre-flight your shipment with a residue panel that explicitly covers GB-2763 thresholds, not just EU/Codex.'
    ]
  },
  {
    id: 'cp-2026-03-05',
    title: 'EU MRL changes 2026: what changed and which Argentine commodities are affected',
    date: 'Mar 5, 2026', author: 'Compliance team', region: 'eu',
    excerpt: 'The February EU MRL update tightened glyphosate and chlorpyrifos thresholds on cereals and oilseeds. Practical effect on Argentine flows.',
    body: [
      'The Commission\'s February 2026 update to EC 396/2005 lowered glyphosate ceilings on cereals from 20 to 10 mg/kg and effectively banned chlorpyrifos detection above 0.01 mg/kg across the board. Most Argentine soybean and wheat shipments will still clear the glyphosate threshold but will need a clean chlorpyrifos panel.',
      'Buyers in DE/NL/BE are increasingly requiring an accredited lab panel travel with the shipment rather than relying on producer attestation. Bureau Veritas, SGS and Eurofins Argentina all offer the relevant panel; typical turnaround 48-72 h.'
    ]
  },
  {
    id: 'cp-2026-02-12',
    title: 'Asia 2026: Japan & Korea positive lists, GACC and the GB-2763 update',
    date: 'Feb 12, 2026', author: 'Compliance team', region: 'cn',
    excerpt: 'Where Asian destination compliance is moving and which Argentine exporters need to adjust their pre-shipment work.',
    body: [
      'Japan\'s positive-list MRL system continues to be the strictest in Asia and any new pesticide registered in Argentina takes 12-18 months to clear in Japan. Korea\'s system mirrors Japan\'s and tends to follow within a year.',
      'China\'s GB-2763 update (mid-2025) added 81 new MRL thresholds — most are tighter than EU. The GMO labelling rule (GB-19641) requires explicit declaration of the soy / corn events present, not just a generic "GMO" statement.',
      'Practical exporter advice: pre-flight every China-bound shipment with a GB-2763-specific panel, not your EU panel. Confirm GACC registration is current for both the establishment and the HS line being shipped.'
    ]
  }
];

/* ---------- Live event injected after 18s, to keep passport "alive" ---------- */

const LIVE_EVENTS = {
  '0418': {
    t: 'just now', state: 'active', who: 'AFIP · status feed',
    msg: '<b>AFIP sync</b> — anticipo de retenciones now showing "Approved (provisional)". Gate 5 likely to clear within the hour.'
  },
  '0414': {
    t: 'just now', state: 'active', who: 'AgriMarket · auto',
    msg: '<b>Auto-draft</b> — NBFDS bioengineered disclosure pack drafted from contract. 1-click attach to B/L pack.'
  },
  '0407': null,
  '0421': {
    t: 'just now', state: 'pass', who: 'Oleocampo · ops',
    msg: '<b>Gate 2 filed</b> — DJVE DJ-2026-119240 submitted. SLA met with 4h spare.'
  }
};
