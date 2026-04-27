import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { T } from '../../translations';
import { Upload, ArrowLeft, Check } from 'lucide-react';

const BLUE = '#4A90D9';

const CATEGORIES = {
  ES: ['Cereales', 'Oleaginosas', 'Legumbres', 'Forrajes'],
  EN: ['Grains', 'Oilseeds', 'Legumes', 'Forages'],
};
const BASIS_OPTIONS = ['EXW', 'FOB', 'FAS', 'CFR', 'CIF', 'CPT', 'DAP'];
const CERTIFICATIONS = {
  ES: ['Convencional', 'Orgánico', 'Non-GMO', 'Global GAP', 'Rainforest Alliance'],
  EN: ['Conventional', 'Organic', 'Non-GMO', 'Global GAP', 'Rainforest Alliance'],
};

function Field({ label, children, required, hint }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>
        {label} {required && <span style={{ color: '#dc2626' }}>*</span>}
        {hint && <span style={{ fontWeight: 400, color: '#9ca3af', marginLeft: 6 }}>({hint})</span>}
      </label>
      {children}
    </div>
  );
}

const inputStyle = {
  width: '100%', padding: '10px 13px', border: '1.5px solid #e5e7eb',
  borderRadius: 7, fontSize: 14, outline: 'none', color: '#1a1a2e',
  background: '#fff', boxSizing: 'border-box',
};

const selectStyle = { ...inputStyle, cursor: 'pointer' };

export default function NewProduct({ onNavigate, onSaved }) {
  const { lang } = useAuth();
  const t = T[lang];
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    name: '', category: '', grade: '', origin: 'Argentina',
    volMin: '', volMax: '', priceMin: '', priceMax: '',
    priceType: 'fixed', basis: 'FOB',
    destination: '', periodFrom: '', periodTo: '',
    certification: '', description: '',
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = () => {
    if (!form.name || !form.category || !form.priceMin) {
      alert(lang === 'ES' ? 'Completá los campos obligatorios.' : 'Please fill in required fields.');
      return;
    }
    setSaved(true);
    setTimeout(() => { onNavigate('/seller/products'); }, 1500);
  };

  if (saved) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 320, gap: 16 }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Check size={32} style={{ color: '#16a34a' }} />
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1a1a2e', margin: 0 }}>
          {lang === 'ES' ? '¡Producto publicado!' : 'Product published!'}
        </h2>
        <p style={{ color: '#888', margin: 0 }}>
          {lang === 'ES' ? 'Redirigiendo a tus productos...' : 'Redirecting to your products...'}
        </p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 860, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
        <button onClick={() => onNavigate('/seller/products')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888', display: 'flex', alignItems: 'center', gap: 4, fontSize: 14 }}>
          <ArrowLeft size={16} /> {t.back}
        </button>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#1a1a2e', margin: 0 }}>{t.newProduct}</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>

        {/* LEFT column */}
        <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #eee', padding: 28, boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1a1a2e', marginBottom: 20, marginTop: 0, paddingBottom: 12, borderBottom: '1px solid #f0f0f0' }}>
            {lang === 'ES' ? 'Información del producto' : 'Product information'}
          </h3>

          <Field label={t.productName} required>
            <input value={form.name} onChange={e => set('name', e.target.value)} placeholder={lang === 'ES' ? 'Ej: Maíz Amarillo 100% Limpio' : 'E.g.: Yellow Corn 100% Clean'} style={inputStyle} />
          </Field>

          <Field label={t.category} required>
            <select value={form.category} onChange={e => set('category', e.target.value)} style={selectStyle}>
              <option value="">{lang === 'ES' ? 'Seleccionar...' : 'Select...'}</option>
              {CATEGORIES[lang].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>

          <Field label={t.grade}>
            <input value={form.grade} onChange={e => set('grade', e.target.value)} placeholder="Ej: Grado 1, Alto Oleico" style={inputStyle} />
          </Field>

          <Field label={t.origin} required>
            <input value={form.origin} onChange={e => set('origin', e.target.value)} style={inputStyle} />
          </Field>

          <Field label={t.certification} hint={t.optional}>
            <select value={form.certification} onChange={e => set('certification', e.target.value)} style={selectStyle}>
              <option value="">{lang === 'ES' ? 'Seleccionar...' : 'Select...'}</option>
              {CERTIFICATIONS[lang].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>

          <Field label={t.description} hint={t.optional}>
            <textarea
              value={form.description}
              onChange={e => set('description', e.target.value)}
              rows={4}
              placeholder={lang === 'ES' ? 'Describí el producto: humedad, proteína, condición, etc.' : 'Describe the product: moisture, protein, condition, etc.'}
              style={{ ...inputStyle, resize: 'vertical' }}
            />
          </Field>
        </div>

        {/* RIGHT column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Precio & volumen */}
          <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #eee', padding: 28, boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1a1a2e', marginBottom: 20, marginTop: 0, paddingBottom: 12, borderBottom: '1px solid #f0f0f0' }}>
              {lang === 'ES' ? 'Precio y volumen' : 'Price & volume'}
            </h3>

            {/* Price type toggle */}
            <Field label={t.priceType} required>
              <div style={{ display: 'flex', gap: 8 }}>
                {['fixed', 'negotiable'].map(type => (
                  <button
                    key={type}
                    onClick={() => set('priceType', type)}
                    style={{
                      flex: 1, padding: '9px 0', border: `1.5px solid ${form.priceType === type ? BLUE : '#e5e7eb'}`,
                      borderRadius: 7, background: form.priceType === type ? '#eff6ff' : '#fff',
                      color: form.priceType === type ? BLUE : '#888',
                      fontWeight: form.priceType === type ? 700 : 400, fontSize: 13, cursor: 'pointer',
                    }}
                  >
                    {type === 'fixed' ? t.fixedPrice : t.negotiable}
                  </button>
                ))}
              </div>
            </Field>

            {/* Price range */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 5 }}>{t.priceMin} (USD) *</label>
                <input type="number" value={form.priceMin} onChange={e => set('priceMin', e.target.value)} placeholder="320" style={inputStyle} />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 5 }}>{t.priceMax} (USD)</label>
                <input type="number" value={form.priceMax} onChange={e => set('priceMax', e.target.value)} placeholder="400" style={inputStyle} />
              </div>
            </div>

            {/* Volume range */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 5 }}>{t.volMin} (tn)</label>
                <input type="number" value={form.volMin} onChange={e => set('volMin', e.target.value)} placeholder="100" style={inputStyle} />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 5 }}>{t.volMax} (tn)</label>
                <input type="number" value={form.volMax} onChange={e => set('volMax', e.target.value)} placeholder="5000" style={inputStyle} />
              </div>
            </div>

            {/* Basis */}
            <Field label={t.basis} required>
              <select value={form.basis} onChange={e => set('basis', e.target.value)} style={selectStyle}>
                {BASIS_OPTIONS.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </Field>

            {/* Destination */}
            <Field label={t.destination}>
              <input value={form.destination} onChange={e => set('destination', e.target.value)} placeholder="Port Lavaca, TX, USA" style={inputStyle} />
            </Field>

            {/* Period */}
            <Field label={t.period}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <input type="date" value={form.periodFrom} onChange={e => set('periodFrom', e.target.value)} style={inputStyle} />
                <input type="date" value={form.periodTo} onChange={e => set('periodTo', e.target.value)} style={inputStyle} />
              </div>
            </Field>
          </div>

          {/* Photos */}
          <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #eee', padding: 28, boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1a1a2e', marginBottom: 16, marginTop: 0 }}>{t.photos}</h3>
            <div style={{
              border: '2px dashed #e5e7eb', borderRadius: 8, padding: '32px 20px',
              textAlign: 'center', cursor: 'pointer', color: '#9ca3af',
            }}>
              <Upload size={28} style={{ margin: '0 auto 10px', display: 'block', opacity: 0.5 }} />
              <p style={{ margin: 0, fontSize: 14 }}>{t.uploadDoc}</p>
              <p style={{ margin: '4px 0 0', fontSize: 12 }}>JPG, PNG — máx 5MB</p>
            </div>
          </div>

          {/* Save button */}
          <button
            onClick={handleSave}
            style={{
              width: '100%', padding: '14px 0', background: BLUE, color: '#fff',
              border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 15,
              cursor: 'pointer', letterSpacing: 0.5,
            }}
          >
            {t.saveProduct}
          </button>
        </div>
      </div>
    </div>
  );
}
