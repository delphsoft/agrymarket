import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  User, Building2, Shield, CheckCircle, Clock, Upload,
  Edit3, Globe, Phone, Mail, MapPin, Save, X, Bell, Lock
} from 'lucide-react';

const BLUE = '#4A90D9';

const inputStyle = {
  width: '100%', padding: '10px 13px', border: '1.5px solid #e5e7eb',
  borderRadius: 7, fontSize: 14, outline: 'none', color: '#1a1a2e',
  background: '#fff', boxSizing: 'border-box',
};

function Section({ title, icon: Icon, children }) {
  return (
    <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #eee', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', overflow: 'hidden', marginBottom: 20 }}>
      <div style={{ padding: '16px 24px', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', gap: 10, background: '#fafbfc' }}>
        <Icon size={18} style={{ color: BLUE }} />
        <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: '#1a1a2e' }}>{title}</h3>
      </div>
      <div style={{ padding: 24 }}>{children}</div>
    </div>
  );
}

function Field({ label, value, edit, onChange, type = 'text', readOnly }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>{label}</label>
      {edit && !readOnly ? (
        <input type={type} value={value} onChange={e => onChange(e.target.value)} style={inputStyle} />
      ) : (
        <p style={{ margin: 0, fontSize: 14, color: readOnly ? '#aaa' : '#1a1a2e', padding: '10px 0', borderBottom: '1px solid #f5f5f5' }}>{value}</p>
      )}
    </div>
  );
}

export default function SellerProfile() {
  const { user, lang } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [toast, setToast]       = useState(null);
  const [notifs, setNotifs]     = useState({ messages: true, contracts: true, tenders: true, email: true });

  const [profile, setProfile] = useState({
    name:        user?.name || 'Juan Pérez',
    jobTitle:    lang === 'ES' ? 'Director Comercial' : 'Commercial Director',
    email:       user?.email || 'juan@agrosur.com.ar',
    phone:       '+54 9 351 123-4567',
    companyName: 'AgroSur S.A.',
    companyType: lang === 'ES' ? 'Productor / Exportador' : 'Producer / Exporter',
    companySize: '51-200',
    regNumber:   '30-71234567-8',
    address:     'Ruta 9 Km 620, Córdoba, Argentina',
    website:     'www.agrosur.com.ar',
  });

  const set = (k, v) => setProfile(p => ({ ...p, [k]: v }));
  const notify = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const handleSave = () => { setEditMode(false); notify(lang === 'ES' ? '✅ Perfil actualizado.' : '✅ Profile updated.'); };

  const kycStatus = 'verified'; // 'verified' | 'pending' | 'rejected'
  const KYC_CFG = {
    verified: { bg: '#dcfce7', color: '#15803d', icon: CheckCircle, ES: 'Verificado', EN: 'Verified' },
    pending:  { bg: '#fef9c3', color: '#854d0e', icon: Clock,        ES: 'Pendiente',  EN: 'Pending' },
    rejected: { bg: '#fee2e2', color: '#dc2626', icon: X,            ES: 'Rechazado',  EN: 'Rejected' },
  };
  const kyc = KYC_CFG[kycStatus];
  const KycIcon = kyc.icon;

  const docs = [
    { name: 'Certificado de Incorporación', date: '22/04/2026', status: 'approved' },
    { name: 'CUIT / Registro fiscal',       date: '22/04/2026', status: 'approved' },
    { name: 'Constancia de inscripción AFIP',date: '22/04/2026', status: 'pending' },
  ];

  return (
    <div>
      {toast && <div style={{ position: 'fixed', top: 20, right: 24, zIndex: 300, background: '#16a34a', color: '#fff', padding: '12px 20px', borderRadius: 8, fontWeight: 700, fontSize: 13 }}>{toast}</div>}

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#1a1a2e', margin: 0 }}>
          {lang === 'ES' ? 'Mi perfil' : 'My profile'}
        </h1>
        {editMode ? (
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => setEditMode(false)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 16px', border: '1.5px solid #e5e7eb', borderRadius: 7, background: '#fff', color: '#666', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
              <X size={14} /> {lang === 'ES' ? 'Cancelar' : 'Cancel'}
            </button>
            <button onClick={handleSave} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 16px', background: BLUE, border: 'none', borderRadius: 7, color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
              <Save size={14} /> {lang === 'ES' ? 'Guardar cambios' : 'Save changes'}
            </button>
          </div>
        ) : (
          <button onClick={() => setEditMode(true)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 16px', border: '1.5px solid #e5e7eb', borderRadius: 7, background: '#fff', color: '#555', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
            <Edit3 size={14} /> {lang === 'ES' ? 'Editar perfil' : 'Edit profile'}
          </button>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, alignItems: 'start' }}>

        {/* LEFT */}
        <div>
          {/* Avatar + KYC */}
          <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #eee', padding: 24, marginBottom: 20, boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 20 }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: `linear-gradient(135deg,#5B8FDB,#4DBFD9)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 22, flexShrink: 0 }}>
                {profile.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div>
                <p style={{ margin: 0, fontWeight: 700, fontSize: 17, color: '#1a1a2e' }}>{profile.name}</p>
                <p style={{ margin: '2px 0', fontSize: 13, color: '#888' }}>{profile.jobTitle}</p>
                <p style={{ margin: 0, fontSize: 13, color: '#888' }}>{profile.companyName}</p>
              </div>
            </div>

            {/* KYC badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderRadius: 8, background: kyc.bg }}>
              <KycIcon size={20} style={{ color: kyc.color }} />
              <div>
                <p style={{ margin: 0, fontWeight: 700, fontSize: 13, color: kyc.color }}>
                  KYC {kyc[lang]}
                </p>
                <p style={{ margin: 0, fontSize: 11, color: kyc.color, opacity: 0.8 }}>
                  {lang === 'ES' ? 'Verificado el 22/04/2026 por AGRIMARKET' : 'Verified on 22/04/2026 by AGRIMARKET'}
                </p>
              </div>
            </div>
          </div>

          {/* Personal info */}
          <Section title={lang === 'ES' ? 'Información personal' : 'Personal information'} icon={User}>
            <Field label={lang === 'ES' ? 'Nombre completo' : 'Full name'}    value={profile.name}     edit={editMode} onChange={v => set('name', v)} />
            <Field label={lang === 'ES' ? 'Cargo' : 'Job title'}              value={profile.jobTitle} edit={editMode} onChange={v => set('jobTitle', v)} />
            <Field label={lang === 'ES' ? 'Correo electrónico' : 'Email'}     value={profile.email}    edit={editMode} onChange={v => set('email', v)} type="email" />
            <Field label={lang === 'ES' ? 'Teléfono' : 'Phone'}              value={profile.phone}    edit={editMode} onChange={v => set('phone', v)} />
          </Section>

          {/* Notifications */}
          <Section title={lang === 'ES' ? 'Notificaciones' : 'Notifications'} icon={Bell}>
            {[
              { key: 'messages',  label: { ES: 'Mensajes nuevos',           EN: 'New messages' } },
              { key: 'contracts', label: { ES: 'Actualizaciones de contratos', EN: 'Contract updates' } },
              { key: 'tenders',   label: { ES: 'Nuevas ofertas en licitaciones', EN: 'New tender bids' } },
              { key: 'email',     label: { ES: 'Resumen diario por email',   EN: 'Daily email digest' } },
            ].map(({ key, label }) => (
              <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f8f8f8' }}>
                <span style={{ fontSize: 14, color: '#333' }}>{label[lang]}</span>
                <button onClick={() => setNotifs(n => ({ ...n, [key]: !n[key] }))}
                  style={{ width: 42, height: 24, borderRadius: 12, border: 'none', background: notifs[key] ? BLUE : '#e5e7eb', cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}>
                  <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#fff', position: 'absolute', top: 3, left: notifs[key] ? 21 : 3, transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
                </button>
              </div>
            ))}
          </Section>
        </div>

        {/* RIGHT */}
        <div>
          {/* Company info */}
          <Section title={lang === 'ES' ? 'Información de empresa' : 'Company information'} icon={Building2}>
            <Field label={lang === 'ES' ? 'Nombre de la empresa' : 'Company name'}   value={profile.companyName} edit={editMode} onChange={v => set('companyName', v)} />
            <Field label={lang === 'ES' ? 'Tipo de empresa' : 'Company type'}         value={profile.companyType} edit={editMode} onChange={v => set('companyType', v)} />
            <Field label={lang === 'ES' ? 'Tamaño (empleados)' : 'Size (employees)'} value={profile.companySize} edit={editMode} onChange={v => set('companySize', v)} />
            <Field label={lang === 'ES' ? 'CUIT / Registro' : 'Tax ID / Reg. number'} value={profile.regNumber}  edit={editMode} onChange={v => set('regNumber', v)} />
            <Field label={lang === 'ES' ? 'Dirección' : 'Address'}                    value={profile.address}    edit={editMode} onChange={v => set('address', v)} />
            <Field label={lang === 'ES' ? 'Sitio web' : 'Website'}                   value={profile.website}    edit={editMode} onChange={v => set('website', v)} />
          </Section>

          {/* KYC Documents */}
          <Section title={lang === 'ES' ? 'Documentos KYC' : 'KYC Documents'} icon={Shield}>
            {docs.map((doc, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: i < docs.length - 1 ? '1px solid #f5f5f5' : 'none' }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: doc.status === 'approved' ? '#dcfce7' : '#fef9c3', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {doc.status === 'approved'
                    ? <CheckCircle size={18} style={{ color: '#15803d' }} />
                    : <Clock size={18} style={{ color: '#854d0e' }} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: 13, color: '#1a1a2e' }}>{doc.name}</p>
                  <p style={{ margin: '1px 0 0', fontSize: 11, color: '#aaa' }}>{lang === 'ES' ? 'Subido' : 'Uploaded'}: {doc.date}</p>
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 4, background: doc.status === 'approved' ? '#dcfce7' : '#fef9c3', color: doc.status === 'approved' ? '#15803d' : '#854d0e', flexShrink: 0 }}>
                  {doc.status === 'approved' ? (lang === 'ES' ? 'Aprobado' : 'Approved') : (lang === 'ES' ? 'En revisión' : 'In review')}
                </span>
              </div>
            ))}
            <button style={{ width: '100%', marginTop: 16, padding: '10px', background: '#f8faff', border: '1.5px dashed #bfdbfe', borderRadius: 8, color: BLUE, fontWeight: 600, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <Upload size={15} /> {lang === 'ES' ? 'Subir nuevo documento' : 'Upload new document'}
            </button>
          </Section>

          {/* Security */}
          <Section title={lang === 'ES' ? 'Seguridad' : 'Security'} icon={Lock}>
            <button style={{ width: '100%', padding: '11px', background: '#f8faff', border: '1.5px solid #bfdbfe', borderRadius: 8, color: BLUE, fontWeight: 700, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              {lang === 'ES' ? 'Cambiar contraseña' : 'Change password'}
            </button>
            <p style={{ fontSize: 12, color: '#aaa', textAlign: 'center', marginBottom: 0, marginTop: 10 }}>
              {lang === 'ES' ? 'Última sesión: hoy 09:14 · Córdoba, Argentina' : 'Last login: today 09:14 · Córdoba, Argentina'}
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
}
