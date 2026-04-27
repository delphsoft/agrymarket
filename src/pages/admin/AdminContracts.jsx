import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Search, FileText, Eye, Download } from 'lucide-react';

const BLUE = '#4A90D9';

const contracts = [
  { id: 256, product: { ES: 'Trigo',    EN: 'Wheat' },   volume: 1200, price: '185 USD', status: 'progress',   seller: 'CerealesBA S.R.L.',   buyer: 'Australian Grain Co.', periodFrom: '01/04/2026', periodTo: '01/05/2026', destination: 'Port Saint Joe, FL, USA', basis: 'FOB (Bulk)',      country: 'United States' },
  { id: 253, product: { ES: 'Trigo',    EN: 'Wheat' },   volume: 1200, price: '183 USD', status: 'signed',     seller: 'CerealesBA S.R.L.',   buyer: 'Adecoagro S.A.',        periodFrom: '-',          periodTo: '06/04/2026', destination: 'Port Saint Joe, FL, USA', basis: 'FOB (Container)', country: 'United States' },
  { id: 251, product: { ES: 'Maíz',     EN: 'Corn' },    volume: 4000, price: '186 USD', status: 'progress',   seller: 'AgroSur S.A.',        buyer: 'Golden Harvest Ltd',    periodFrom: '-',          periodTo: '05/04/2026', destination: 'Port St. Lucie, FL, USA', basis: 'FOB (Container)', country: 'United States' },
  { id: 248, product: { ES: 'Cebada',   EN: 'Barley' },  volume: 1000, price: '168 USD', status: 'terminated', seller: 'PatagoniaMalt S.A.',  buyer: 'Adecoagro S.A.',        periodFrom: '-',          periodTo: '20/03/2026', destination: 'Port Saint Joe, FL, USA', basis: 'FAS (Container)', country: 'United States' },
  { id: 247, product: { ES: 'Sorgo',    EN: 'Sorghum' }, volume: 1000, price: '133 USD', status: 'new',        seller: 'NOA Granos S.R.L.',  buyer: 'Impex Express S.A.',    periodFrom: '-',          periodTo: '27/03/2026', destination: "Port O'Connor, TX, USA",  basis: 'FOB (Container)', country: 'United States' },
  { id: 243, product: { ES: 'Trigo',    EN: 'Wheat' },   volume: 2200, price: '199 USD', status: 'signed',     seller: 'CerealesBA S.R.L.',   buyer: 'Oleocampo S.C.A.',      periodFrom: '-',          periodTo: '09/04/2026', destination: 'Port of Spain, Trinidad', basis: 'CPT (Container)', country: 'United States' },
  { id: 241, product: { ES: 'Soja',     EN: 'Soybeans'}, volume: 800,  price: '472 USD', status: 'signed',     seller: 'PampaSoja Ltda.',     buyer: 'Australian Grain Co.', periodFrom: '15/03/2026', periodTo: '15/04/2026', destination: 'Melbourne, VIC, AUS',     basis: 'CFR',             country: 'Australia' },
  { id: 238, product: { ES: 'Girasol',  EN: 'Sunflower'},volume: 500,  price: '312 USD', status: 'terminated', seller: 'PampaOil S.A.',       buyer: 'Impex Express S.A.',    periodFrom: '-',          periodTo: '28/02/2026', destination: 'Montevideo, UY',          basis: 'FOB',             country: 'Uruguay' },
];

const STATUS_CFG = {
  progress:   { bg: '#dbeafe', color: '#1d4ed8', ES: 'En progreso', EN: 'In Progress' },
  signed:     { bg: '#dcfce7', color: '#15803d', ES: 'Firmado',     EN: 'Signed'      },
  terminated: { bg: '#fee2e2', color: '#b45309', ES: 'Terminado',   EN: 'Terminated'  },
  new:        { bg: '#ccfbf1', color: '#0f766e', ES: 'Nuevo',       EN: 'New'         },
};

export default function AdminContracts() {
  const { lang } = useAuth();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selected, setSelected] = useState(null);

  const filtered = contracts.filter(c => {
    const q = search.toLowerCase();
    const matchQ = !search || c.product[lang].toLowerCase().includes(q) || c.seller.toLowerCase().includes(q) || c.buyer.toLowerCase().includes(q) || String(c.id).includes(q);
    const matchS = filterStatus === 'all' || c.status === filterStatus;
    return matchQ && matchS;
  });

  const cols = [
    { label: 'ID',                           w: '50px' },
    { label: lang === 'ES' ? 'Producto' : 'Product',       w: '1fr' },
    { label: lang === 'ES' ? 'Volumen MT' : 'Volume MT',   w: '90px' },
    { label: lang === 'ES' ? 'Precio MT' : 'Price MT',     w: '90px' },
    { label: 'Estado',                       w: '110px' },
    { label: lang === 'ES' ? 'Comprador' : 'Buyer',        w: '1fr' },
    { label: lang === 'ES' ? 'Período' : 'Period',         w: '110px' },
    { label: 'Basis',                        w: '120px' },
    { label: lang === 'ES' ? 'Destino' : 'Destination',    w: '1fr' },
  ];
  const gridCols = cols.map(c => c.w).join(' ');

  return (
    <div>
      <div style={{ marginBottom: 22 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#1a1a2e', margin: 0 }}>
          {lang === 'ES' ? 'Supervisión de contratos' : 'Contract supervision'}
        </h1>
        <p style={{ color: '#888', fontSize: 13, margin: '4px 0 0' }}>
          {contracts.length} {lang === 'ES' ? 'contratos registrados' : 'registered contracts'}
        </p>
      </div>

      {/* Filters */}
      <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #eee', padding: '13px 20px', marginBottom: 16, display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 200, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Search size={15} style={{ color: '#aaa' }} />
          <input type="text" placeholder={lang === 'ES' ? 'Buscar por ID, producto o empresa...' : 'Search by ID, product or company...'} value={search} onChange={e => setSearch(e.target.value)}
            style={{ border: 'none', outline: 'none', fontSize: 14, color: '#333', flex: 1 }} />
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {['all', 'new', 'progress', 'signed', 'terminated'].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)}
              style={{ padding: '6px 14px', borderRadius: 16, border: '1.5px solid', fontSize: 12, fontWeight: 600, cursor: 'pointer',
                borderColor: filterStatus === s ? BLUE : '#e5e7eb',
                background: filterStatus === s ? '#eff6ff' : '#fff',
                color: filterStatus === s ? BLUE : '#888' }}>
              {s === 'all' ? (lang === 'ES' ? 'Todos' : 'All') : STATUS_CFG[s]?.[lang]}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 320px' : '1fr', gap: 20 }}>

        {/* Table — styled exactly like Aliro screenshot 3 */}
        <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #eee', overflow: 'auto', boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
          {/* Head */}
          <div style={{ display: 'grid', gridTemplateColumns: gridCols, padding: '12px 20px', background: '#fafbfc', borderBottom: '1px solid #eee', minWidth: 900 }}>
            {cols.map((c, i) => (
              <span key={i} style={{ fontSize: 11, fontWeight: 700, color: '#888', letterSpacing: 0.8, textTransform: 'uppercase' }}>{c.label}</span>
            ))}
          </div>

          {filtered.map((c, i) => {
            const st = STATUS_CFG[c.status];
            const isSelected = selected?.id === c.id;
            return (
              <div key={c.id}
                style={{ display: 'grid', gridTemplateColumns: gridCols, padding: '13px 20px', alignItems: 'center', borderBottom: i < filtered.length - 1 ? '1px solid #f5f5f5' : 'none', background: isSelected ? '#f8faff' : '#fff', cursor: 'pointer', minWidth: 900 }}
                onClick={() => setSelected(isSelected ? null : c)}
                onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = '#fafbff'; }}
                onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = '#fff'; }}
              >
                <span style={{ fontSize: 13, color: '#aaa', fontWeight: 600 }}>#{c.id}</span>
                <div>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: 13, color: '#1a1a2e' }}>{c.product[lang]}</p>
                  <p style={{ margin: '1px 0 0', fontSize: 11, color: '#aaa' }}>{c.seller}</p>
                </div>
                <span style={{ fontSize: 13, color: '#555' }}>{c.volume.toLocaleString()}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: BLUE }}>{c.price}</span>
                <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 4, background: st.bg, color: st.color }}>{st[lang]}</span>
                <span style={{ fontSize: 12, color: '#666', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.buyer}</span>
                <span style={{ fontSize: 11, color: '#888' }}>{c.periodTo}</span>
                <span style={{ fontSize: 12, color: '#555' }}>{c.basis}</span>
                <span style={{ fontSize: 11, color: '#888', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.destination}</span>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '48px 0', color: '#ccc' }}>
              <FileText size={40} style={{ display: 'block', margin: '0 auto 12px', opacity: 0.3 }} />
              <p>{lang === 'ES' ? 'Sin resultados' : 'No results'}</p>
            </div>
          )}
        </div>

        {/* Detail panel */}
        {selected && (
          <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #eee', padding: 22, height: 'fit-content', boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1a1a2e', margin: 0 }}>
                {lang === 'ES' ? 'Contrato' : 'Contract'} #{selected.id}
              </h3>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#aaa', fontSize: 18 }}>✕</button>
            </div>

            <div style={{ display: 'inline-block', marginBottom: 18, fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 4, background: STATUS_CFG[selected.status].bg, color: STATUS_CFG[selected.status].color }}>
              {STATUS_CFG[selected.status][lang]}
            </div>

            {[
              { label: lang === 'ES' ? 'Producto' : 'Product',      val: selected.product[lang] },
              { label: lang === 'ES' ? 'Volumen' : 'Volume',         val: `${selected.volume.toLocaleString()} MT` },
              { label: lang === 'ES' ? 'Precio' : 'Price',           val: `${selected.price} / MT` },
              { label: lang === 'ES' ? 'Vendedor' : 'Seller',        val: selected.seller },
              { label: lang === 'ES' ? 'Comprador' : 'Buyer',        val: selected.buyer },
              { label: lang === 'ES' ? 'Vencimiento' : 'Period end', val: selected.periodTo },
              { label: 'Basis',                                        val: selected.basis },
              { label: lang === 'ES' ? 'Destino' : 'Destination',   val: selected.destination },
              { label: lang === 'ES' ? 'País origen' : 'Origin country', val: selected.country },
            ].map(({ label, val }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f8f8f8' }}>
                <span style={{ fontSize: 12, color: '#999' }}>{label}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#1a1a2e', textAlign: 'right', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{val}</span>
              </div>
            ))}

            <div style={{ marginTop: 18, display: 'flex', gap: 10 }}>
              <button style={{ flex: 1, padding: '9px 0', background: '#eff6ff', border: 'none', borderRadius: 7, color: BLUE, fontWeight: 700, fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                <Eye size={13} /> {lang === 'ES' ? 'Ver detalle' : 'View detail'}
              </button>
              <button style={{ flex: 1, padding: '9px 0', background: '#f5f3ff', border: 'none', borderRadius: 7, color: '#7c3aed', fontWeight: 700, fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                <Download size={13} /> PDF
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
