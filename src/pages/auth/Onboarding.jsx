import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { T } from '../../translations';
import { Check, Upload, User, Building2, Shield } from 'lucide-react';

const BLUE = '#4A90D9';
const inputStyle = { width: '100%', padding: '10px 13px', border: '1.5px solid #e5e7eb', borderRadius: 7, fontSize: 14, outline: 'none', color: '#1a1a2e', background: '#fff', boxSizing: 'border-box' };

const STEPS = [
  { icon: User,      keyES: 'step1', keyEN: 'step1' },
  { icon: Building2, keyES: 'step2', keyEN: 'step2' },
  { icon: Shield,    keyES: 'step3', keyEN: 'step3' },
];

export default function Onboarding({ onNavigate }) {
  const { user, lang } = useAuth();
  const t = T[lang];
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ jobTitle: '', phone: '', companyName: '', companySize: '', companyType: '', regNumber: '', certFile: null });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const goNext = () => {
    if (step < 2) setStep(step + 1);
    else {
      // Done — navigate to portal
      const dest = user?.role === 'seller' ? '/seller/dashboard' : '/buyer/dashboard';
      onNavigate(dest);
    }
  };

  const COMPANY_SIZES = ['1-10', '11-50', '51-200', '200+'];
  const COMPANY_TYPES = {
    ES: ['Productor', 'Acopiador', 'Exportador', 'Importador', 'Broker', 'Procesador'],
    EN: ['Producer', 'Aggregator', 'Exporter', 'Importer', 'Broker', 'Processor'],
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f7fa', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 560 }}>

        {/* Logo & title */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <svg width="26" height="26" viewBox="0 0 100 100">
              <path d="M50 10 L40 30 L50 50 L60 30 Z" fill="#9FD356"/>
              <path d="M40 30 L30 45 L40 60 L50 50 Z" fill="#6BBF3B"/>
              <path d="M60 30 L70 45 L60 60 L50 50 Z" fill="#4A9D2A"/>
              <path d="M50 50 C50 50,30 75,30 85 Q30 95,50 95 Q70 95,70 85 C70 75,50 50,50 50" fill="#6BBF3B"/>
            </svg>
            <span style={{ fontWeight: 800, fontSize: 20, letterSpacing: 4, color: '#1a1a2e' }}>AGRIMARKET</span>
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#1a1a2e', margin: '0 0 6px' }}>
            {lang === 'ES' ? 'Completá tu perfil' : 'Complete your profile'}
          </h1>
          <p style={{ color: '#888', fontSize: 14, margin: 0 }}>
            {lang === 'ES' ? 'Solo 3 pasos para acceder al mercado global.' : 'Just 3 steps to access the global market.'}
          </p>
        </div>

        {/* Step indicator */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, marginBottom: 32 }}>
          {STEPS.map((s, i) => {
            const done = i < step;
            const active = i === step;
            const Icon = s.icon;
            return (
              <React.Fragment key={i}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: '50%',
                    background: done ? '#10b981' : active ? BLUE : '#e5e7eb',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.3s',
                  }}>
                    {done ? <Check size={20} color="#fff" /> : <Icon size={20} color={active ? '#fff' : '#aaa'} />}
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 600, color: active ? BLUE : done ? '#10b981' : '#aaa' }}>
                    {t[`step${i+1}`]}
                  </span>
                </div>
                {i < 2 && (
                  <div style={{ width: 80, height: 2, background: i < step ? '#10b981' : '#e5e7eb', margin: '0 4px', marginBottom: 22, transition: 'background 0.3s' }} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Form card */}
        <div style={{ background: '#fff', borderRadius: 12, padding: '32px 36px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', border: '1px solid #eee' }}>

          {/* STEP 0 — Personal info */}
          {step === 0 && (
            <div>
              <h2 style={{ fontSize: 17, fontWeight: 700, color: '#1a1a2e', marginTop: 0, marginBottom: 22 }}>{t.step1}</h2>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>{t.name}</label>
                <input value={user?.name || ''} readOnly style={{ ...inputStyle, background: '#f9fafb', color: '#888' }} />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>{t.jobTitle}</label>
                <input value={form.jobTitle} onChange={e => set('jobTitle', e.target.value)} placeholder={lang === 'ES' ? 'Director Comercial' : 'Commercial Director'} style={inputStyle} />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>{t.phone}</label>
                <input value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+54 9 11 1234-5678" style={inputStyle} />
              </div>
            </div>
          )}

          {/* STEP 1 — Company */}
          {step === 1 && (
            <div>
              <h2 style={{ fontSize: 17, fontWeight: 700, color: '#1a1a2e', marginTop: 0, marginBottom: 22 }}>{t.step2}</h2>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>{t.companyName} *</label>
                <input value={form.companyName} onChange={e => set('companyName', e.target.value)} placeholder="AgroSur S.A." style={inputStyle} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>{t.companyType}</label>
                  <select value={form.companyType} onChange={e => set('companyType', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                    <option value="">{lang === 'ES' ? 'Seleccionar...' : 'Select...'}</option>
                    {COMPANY_TYPES[lang].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>{t.companySize}</label>
                  <select value={form.companySize} onChange={e => set('companySize', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                    <option value="">{lang === 'ES' ? 'Empleados...' : 'Employees...'}</option>
                    {COMPANY_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>{t.regNumber}</label>
                <input value={form.regNumber} onChange={e => set('regNumber', e.target.value)} placeholder="30-12345678-9" style={inputStyle} />
              </div>
            </div>
          )}

          {/* STEP 2 — Verification */}
          {step === 2 && (
            <div>
              <h2 style={{ fontSize: 17, fontWeight: 700, color: '#1a1a2e', marginTop: 0, marginBottom: 8 }}>{t.step3}</h2>
              <p style={{ color: '#888', fontSize: 13, marginBottom: 24 }}>
                {lang === 'ES'
                  ? 'Tu certificado de incorporación nos permite verificar tu empresa. Este paso es opcional pero acelera el acceso completo a la plataforma.'
                  : 'Your certificate of incorporation allows us to verify your company. This step is optional but speeds up full platform access.'}
              </p>

              {/* Upload area */}
              <div style={{
                border: '2px dashed #e5e7eb', borderRadius: 10, padding: '36px 20px',
                textAlign: 'center', cursor: 'pointer', marginBottom: 20,
                background: form.certFile ? '#f0fdf4' : '#fafafa',
                borderColor: form.certFile ? '#86efac' : '#e5e7eb',
              }}>
                {form.certFile ? (
                  <>
                    <Check size={32} style={{ color: '#16a34a', margin: '0 auto 10px', display: 'block' }} />
                    <p style={{ margin: 0, fontWeight: 700, color: '#15803d', fontSize: 14 }}>{form.certFile}</p>
                    <p style={{ margin: '4px 0 0', fontSize: 12, color: '#888' }}>{lang === 'ES' ? 'Archivo listo para enviar' : 'File ready to submit'}</p>
                  </>
                ) : (
                  <>
                    <Upload size={32} style={{ color: '#aaa', margin: '0 auto 10px', display: 'block' }} />
                    <p style={{ margin: 0, fontWeight: 600, color: '#555', fontSize: 14 }}>{t.uploadDoc}</p>
                    <p style={{ margin: '4px 0 12px', fontSize: 12, color: '#aaa' }}>PDF, JPG, PNG — máx 10MB</p>
                    <button
                      onClick={() => set('certFile', 'Certificado_Incorporacion.pdf')}
                      style={{ background: BLUE, color: '#fff', border: 'none', borderRadius: 6, padding: '8px 20px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
                    >
                      {lang === 'ES' ? 'Seleccionar archivo' : 'Select file'}
                    </button>
                  </>
                )}
              </div>

              {/* Info box */}
              <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 8, padding: '12px 16px', fontSize: 13, color: '#1e40af' }}>
                <strong>{lang === 'ES' ? 'Proceso KYC' : 'KYC Process'}:</strong>{' '}
                {lang === 'ES'
                  ? 'Nuestro equipo revisará tus documentos en 24-48hs hábiles y te notificará por email.'
                  : 'Our team will review your documents within 24-48 business hours and notify you by email.'}
              </div>
            </div>
          )}
        </div>

        {/* Navigation buttons */}
        <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
          {step > 0 && (
            <button onClick={() => setStep(step - 1)} style={{ flex: 1, padding: '12px 0', background: '#fff', border: '1.5px solid #e5e7eb', borderRadius: 8, fontWeight: 600, fontSize: 14, cursor: 'pointer', color: '#555' }}>
              ← {t.prevStep}
            </button>
          )}
          {step === 2 && (
            <button onClick={goNext} style={{ color: '#888', background: 'none', border: 'none', fontSize: 13, cursor: 'pointer', padding: '12px 0', flexShrink: 0 }}>
              {t.skipStep}
            </button>
          )}
          <button onClick={goNext} style={{ flex: 2, padding: '12px 0', background: BLUE, color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
            {step === 2 ? t.finish : t.nextStep + ' →'}
          </button>
        </div>
      </div>
    </div>
  );
}
