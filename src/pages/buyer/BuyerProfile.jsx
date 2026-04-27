import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Building2, Shield, CheckCircle, Clock, Upload, Edit3, Save, X, Bell, Lock } from 'lucide-react';

const PURPLE = '#7c3aed';

const inputStyle = {
  width: '100%', padding: '10px 13px', border: '1.5px solid #e5e7eb',
  borderRadius: 7, fontSize: 14, outline: 'none', color: '#1a1a2e',
  background: '#fff', boxSizing: 'border-box',
};

function Section({ title, icon: Icon, color = '#4A90D9', children }) {
  return (
    <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #eee', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', overflow: 'hidden', marginBottom: 20 }}>
      <div style={{ padding: '16px 24px', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', gap: 10, background: '#fafbfc' }}>
        <Icon size={18} style={{ color }} />
        <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: '#1a1a2e' }}>{title}</h3>
      </div>
      <div style={{ padding: 24 }}>{children}</div>
    </div>
  );
}

function Field({ label, value, edit, onChange, type = 'text' }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>{label}</label>
      {edit
        ? <input type={type} value={value} onChange={e => onChange(e.target.value)} style={inputStyle} />
        : <p style={{ margin: 0, fontSize: 14, color: '#1a1a2e', padding: '10px 0', borderBottom: '1px solid #f5f5f5' }}>{value}</p>}
    </div>
  );
}

export default function BuyerProfile() {
  const { user, lang } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [toast, setToast]       = useState(null);
  const [notifs, setNotifs]     = useState({ messages: true, contracts: true, tenders: true, email: false });
  const [profile, setProfile]   = useState({
    name:        user?.name || 'María González',
    jobTitle:    lang === 'ES' ? 'Gerente de Compras' : 'Purchasing Manager',
    email:       user?.email || 'maria@goldenharvest.com',
    phone:       '+61 2 9876 5432',
    companyName: 'Golden Harvest Ltd',
    companyType: lang === 'ES' ? 'Importador / Procesador' : 'Importer / Processor',
    companySize: '200+',
    regNumber:   'ABN 51 824 753 556',
    address:     '45 Market St, Sydney NSW 2000, Australia',
    website:     'www.goldenharvest.com.au',
  });

  const set = (k, v) => setProfile(p => ({ ...p, [k]: v }));
  const notify = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); };
  const handleSave = () => { setEditMode(false); notify(lang === 'ES' ? '✅ Perfil actualizado.' : '✅ Profile updated.'); };

  const docs = [
    { name: lang === 'ES' ? 'Certificado de Incorporación' : 'Certificate of Incorporation', date: '22/04/2026', status: 'approved' },
    { name: lang === 'ES' ? 'Número ABN / Registro fiscal' : 'ABN / Tax registration', date: '22/04/2026', status: 'approved' },
    { name: lang === 'ES' ? 'Referencia bancaria' : 'Bank reference', date: '-', status: 'pending' },
  ];

  return (
    <div>
      {toast && <div style={{ position: 'fixed', top: 20, right: 24, zIndex: 300, background: '#16a34a', color: '#fff', padding: '12px 20px', borderRadius: 8, fontWeight: 700, fontSize: 13 }}>{toast}</div>}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#1a1a2e', margin: 0 }}>
          {lang === 'ES' ? 'Mi perfil' : 'My profile'}
        </h1>
        {editMode ? (
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => setEditMode(false)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 16px', border: '1.5px solid #e5e7eb', borderRadius: 7, background: '#fff', color: '#666', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
              <X size={14} /> {lang === 'ES' ? 'Cancelar' : 'Cancel'}
            </button>
            <button onClick={handleSave} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 16px', background: PURPLE, border: 'none', borderRadius: 7, color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
              <Save size={14} /> {lang === 'ES' ? 'Guardar' : 'Save'}
            </button>
          </div>
        ) : (
          <button onClick={() => setEditMode(true)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 16px', border: '1.5px solid #e5e7eb', borderRadius: 7, background: '#fff', color: '#555', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
            <Edit3 size={14} /> {lang === 'ES' ? 'Editar perfil' : 'Edit profile'}
          </button>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, alignItems: 'start' }}>
        <div>
          {/* Avatar + KYC */}
          <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #eee', padding: 24, marginBottom: 20, boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 20 }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: `linear-gradient(135deg,#7c3aed,#a78bfa)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 22, flexShrink: 0 }}>
                {profile.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div>
                <p style={{ margin: 0, fontWeight: 700, fontSize: 17, color: '#1a1a2e' }}>{profile.name}</p>
                <p style={{ margin: '2px 0', fontSize: 13, color: '#888' }}>{profile.jobTitle}</p>
                <p style={{ margin: 0, fontSize: 13, color: '#888' }}>{profile.companyName}</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderRadius: 8, background: '#dcfce7' }}>
              <CheckCircle size={20} style={{ color: '#15803d' }} />
              <div>
                <p style={{ margin: 0, fontWeight: 700, fontSize: 13, color: '#15803d' }}>KYC {lang === 'ES' ? 'Verificado' : 'Verified'}</p>
                <p style={{ margin: 0, fontSize: 11, color: '#15803d', opacity: 0.8 }}>
                  {lang === 'ES' ? 'Verificado el 22/04/2026' : 'Verified on 22/04/2026'}
                </p>
              </div>
            </div>
          </div>

          <Section title={lang === 'ES' ? 'Información personal' : 'Personal information'} icon={User} color={PURPLE}>
            <Field label={lang === 'ES' ? 'Nombre completo' : 'Full name'}   value={profile.name}     edit={editMode} onChange={v => set('name', v)} />
            <Field label={lang === 'ES' ? 'Cargo' : 'Job title'}             value={profile.jobTitle} edit={editMode} onChange={v => set('jobTitle', v)} />
            <Field label={lang === 'ES' ? 'Correo' : 'Email'}                value={profile.email}    edit={editMode} onChange={v => set('email', v)} type="email" />
            <Field label={lang === 'ES' ? 'Teléfono' : 'Phone'}             value={profile.phone}    edit={editMode} onChange={v => set('phone', v)} />
          </Section>

          <Section title={lang === 'ES' ? 'Notificaciones' : 'Notifications'} icon={Bell} color={PURPLE}>
            {[
              { key: 'messages',  label: { ES: 'Mensajes de vendedores',     EN: 'Messages from sellers' } },
              { key: 'contracts', label: { ES: 'Actualizaciones de contratos',EN: 'Contract updates' } },
              { key: 'tenders',   label: { ES: 'Nuevas licitaciones',         EN: 'New tenders' } },
              { key: 'email',     label: { ES: 'Resumen semanal por email',  EN: 'Weekly email digest' } },
            ].map(({ key, label }) => (
              <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f8f8f8' }}>
                <span style={{ fontSize: 14, color: '#333' }}>{label[lang]}</span>
                <button onClick={() => setNotifs(n => ({ ...n, [key]: !n[key] }))}
                  style={{ width: 42, height: 24, borderRadius: 12, border: 'none', background: notifs[key] ? PURPLE : '#e5e7eb', cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}>
                  <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#fff', position: 'absolute', top: 3, left: notifs[key] ? 21 : 3, transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
                </button>
              </div>
            ))}
          </Section>
        </div>

        <div>
          <Section title={lang === 'ES' ? 'Información de empresa' : 'Company information'} icon={Building2} color={PURPLE}>
            <Field label={lang === 'ES' ? 'Nombre de la empresa' : 'Company name'}    value={profile.companyName} edit={editMode} onChange={v => set('companyName', v)} />
            <Field label={lang === 'ES' ? 'Tipo de empresa' : 'Company type'}          value={profile.companyType} edit={editMode} onChange={v => set('companyType', v)} />
            <Field label={lang === 'ES' ? 'Tamaño' : 'Size'}                           value={profile.companySize} edit={editMode} onChange={v => set('companySize', v)} />
            <Field label={lang === 'ES' ? 'Registro fiscal' : 'Tax registration'}     value={profile.regNumber}   edit={editMode} onChange={v => set('regNumber', v)} />
            <Field label={lang === 'ES' ? 'Dirección' : 'Address'}                    value={profile.address}     edit={editMode} onChange={v => set('address', v)} />
            <Field label={lang === 'ES' ? 'Sitio web' : 'Website'}                   value={profile.website}     edit={editMode} onChange={v => set('website', v)} />
          </Section>

          <Section title={lang === 'ES' ? 'Documentos KYC' : 'KYC Documents'} icon={Shield} color={PURPLE}>
            {docs.map((doc, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: i < docs.length - 1 ? '1px solid #f5f5f5' : 'none' }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: doc.status === 'approved' ? '#dcfce7' : '#fef9c3', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {doc.status === 'approved' ? <CheckCircle size={18} style={{ color: '#15803d' }} /> : <Clock size={18} style={{ color: '#854d0e' }} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: 13, color: '#1a1a2e' }}>{doc.name}</p>
                  <p style={{ margin: '1px 0 0', fontSize: 11, color: '#aaa' }}>{doc.date !== '-' ? `${lang === 'ES' ? 'Subido' : 'Uploaded'}: ${doc.date}` : (lang === 'ES' ? 'Pendiente de subir' : 'Pending upload')}</p>
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 4, background: doc.status === 'approved' ? '#dcfce7' : '#fef9c3', color: doc.status === 'approved' ? '#15803d' : '#854d0e', flexShrink: 0 }}>
                  {doc.status === 'approved' ? (lang === 'ES' ? 'Aprobado' : 'Approved') : (lang === 'ES' ? 'Pendiente' : 'Pending')}
                </span>
              </div>
            ))}
            <button style={{ width: '100%', marginTop: 16, padding: '10px', background: '#faf5ff', border: '1.5px dashed #ddd6fe', borderRadius: 8, color: PURPLE, fontWeight: 600, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <Upload size={15} /> {lang === 'ES' ? 'Subir documento' : 'Upload document'}
            </button>
          </Section>

          <Section title={lang === 'ES' ? 'Seguridad' : 'Security'} icon={Lock} color={PURPLE}>
            <button style={{ width: '100%', padding: '11px', background: '#faf5ff', border: '1.5px solid #ddd6fe', borderRadius: 8, color: PURPLE, fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
              {lang === 'ES' ? 'Cambiar contraseña' : 'Change password'}
            </button>
            <p style={{ fontSize: 12, color: '#aaa', textAlign: 'center', marginBottom: 0, marginTop: 10 }}>
              {lang === 'ES' ? 'Última sesión: hoy 08:45 · Sydney, Australia' : 'Last login: today 08:45 · Sydney, Australia'}
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
}
