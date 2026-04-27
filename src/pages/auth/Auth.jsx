import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { T } from '../../translations';
import { Eye, EyeOff } from 'lucide-react';

const BLUE = '#4A90D9';
const GRAD = 'linear-gradient(100deg,#5B8FDB 0%,#4DBFD9 100%)';

function Logo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center', marginBottom: 28 }}>
      <svg width="32" height="32" viewBox="0 0 100 100">
        <path d="M50 10 L40 30 L50 50 L60 30 Z" fill="#9FD356"/>
        <path d="M40 30 L30 45 L40 60 L50 50 Z" fill="#6BBF3B"/>
        <path d="M60 30 L70 45 L60 60 L50 50 Z" fill="#4A9D2A"/>
        <path d="M50 50 C50 50,30 75,30 85 Q30 95,50 95 Q70 95,70 85 C70 75,50 50,50 50" fill="#6BBF3B"/>
      </svg>
      <span style={{ fontWeight: 800, fontSize: 22, letterSpacing: 4, color: '#fff' }}>AGRIMARKET</span>
    </div>
  );
}

const inputStyle = {
  width: '100%', padding: '11px 14px', border: '1.5px solid #e5e7eb',
  borderRadius: 7, fontSize: 14, outline: 'none', color: '#1a1a2e',
  background: '#fff', boxSizing: 'border-box',
};

// ─── LOGIN ────────────────────────────────────────────────────────────────────
export function Login({ onNavigate }) {
  const { login, lang, setLang } = useAuth();
  const t = T[lang];
  const [email, setEmail]       = useState('');
  const [pass, setPass]         = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError]       = useState('');

  const handleLogin = () => {
    if (!email || !pass) { setError(lang === 'ES' ? 'Completá todos los campos.' : 'Please fill in all fields.'); return; }
    // Demo: any email with @seller → seller, @admin → admin, else buyer
    const role = email.includes('admin') ? 'admin' : email.includes('seller') || email.includes('vendor') ? 'seller' : 'buyer';
    login({ name: email.split('@')[0].replace('.', ' '), email, role }, 'demo-token');
    onNavigate(role === 'seller' ? '/seller/dashboard' : role === 'admin' ? '/admin/dashboard' : '/buyer/dashboard');
  };

  return (
    <div style={{ minHeight: '100vh', background: GRAD, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        <Logo />

        <div style={{ background: '#fff', borderRadius: 12, padding: '36px 36px', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#1a1a2e', marginBottom: 4, marginTop: 0 }}>{t.loginTitle}</h1>
          <p style={{ color: '#888', fontSize: 14, marginBottom: 28 }}>{t.loginSub}</p>

          {error && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 6, padding: '10px 14px', color: '#dc2626', fontSize: 13, marginBottom: 16 }}>
              {error}
            </div>
          )}

          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>{t.email}</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="juan@empresa.com" style={inputStyle}
              onFocus={e => e.target.style.borderColor = BLUE} onBlur={e => e.target.style.borderColor = '#e5e7eb'} />
          </div>

          <div style={{ marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>{t.password}</label>
            <div style={{ position: 'relative' }}>
              <input type={showPass ? 'text' : 'password'} value={pass} onChange={e => setPass(e.target.value)} style={{ ...inputStyle, paddingRight: 42 }}
                onFocus={e => e.target.style.borderColor = BLUE} onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                onKeyDown={e => e.key === 'Enter' && handleLogin()} />
              <button onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#aaa' }}>
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div style={{ textAlign: 'right', marginBottom: 24 }}>
            <a href="#" style={{ fontSize: 12, color: BLUE, textDecoration: 'none' }}>{t.forgotPass}</a>
          </div>

          <button onClick={handleLogin} style={{ width: '100%', padding: '12px 0', background: BLUE, color: '#fff', border: 'none', borderRadius: 7, fontWeight: 700, fontSize: 15, cursor: 'pointer', marginBottom: 16 }}>
            {t.loginBtn}
          </button>

          <p style={{ textAlign: 'center', fontSize: 13, color: '#888', margin: 0 }}>
            {t.noAccount} {' '}
            <button onClick={() => onNavigate('/register')} style={{ background: 'none', border: 'none', color: BLUE, fontWeight: 700, cursor: 'pointer', fontSize: 13 }}>
              {lang === 'ES' ? 'Registrarse' : 'Sign up'}
            </button>
          </p>

          {/* Demo hint */}
          <div style={{ marginTop: 20, padding: '12px 14px', background: '#f8faff', borderRadius: 6, border: '1px solid #e0eaff', fontSize: 12, color: '#6b7280' }}>
            <strong style={{ color: '#374151' }}>Demo:</strong> usá <code>seller@demo.com</code>, <code>buyer@demo.com</code> o <code>admin@demo.com</code> con cualquier contraseña.
          </div>
        </div>

        {/* Language toggle */}
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          {['ES', 'EN'].map(l => (
            <button key={l} onClick={() => setLang(l)} style={{ background: 'none', border: 'none', color: lang === l ? '#fff' : 'rgba(255,255,255,0.6)', fontWeight: lang === l ? 700 : 400, fontSize: 13, cursor: 'pointer', margin: '0 6px' }}>
              {l === 'ES' ? '🇦🇷 Español' : '🇬🇧 English'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── REGISTER ─────────────────────────────────────────────────────────────────
export function Register({ onNavigate }) {
  const { login, lang, setLang } = useAuth();
  const t = T[lang];
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'seller' });

  const handleRegister = () => {
    if (!form.name || !form.email || !form.password) return;
    login({ name: form.name, email: form.email, role: form.role }, 'demo-token');
    onNavigate('/onboarding');
  };

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div style={{ minHeight: '100vh', background: GRAD, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ width: '100%', maxWidth: 440 }}>
        <Logo />

        <div style={{ background: '#fff', borderRadius: 12, padding: '36px 36px', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#1a1a2e', marginBottom: 4, marginTop: 0 }}>
            {lang === 'ES' ? 'Crear tu cuenta' : 'Create your account'}
          </h1>
          <p style={{ color: '#888', fontSize: 14, marginBottom: 24 }}>{t.loginSub}</p>

          {/* Role selector */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 8 }}>{t.roleLabel}</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {['seller', 'buyer'].map(role => (
                <button key={role} onClick={() => set('role', role)} style={{
                  padding: '12px 10px', border: `2px solid ${form.role === role ? BLUE : '#e5e7eb'}`,
                  borderRadius: 8, background: form.role === role ? '#eff6ff' : '#fff',
                  color: form.role === role ? BLUE : '#555',
                  fontWeight: form.role === role ? 700 : 400, fontSize: 13, cursor: 'pointer',
                }}>
                  {role === 'seller' ? '📦 ' + t.roleSeller : '🛒 ' + t.roleBuyer}
                </button>
              ))}
            </div>
          </div>

          {[
            { label: t.name,  key: 'name',     type: 'text',     placeholder: 'Juan Pérez' },
            { label: t.email, key: 'email',    type: 'email',    placeholder: 'juan@empresa.com' },
            { label: t.password, key: 'password', type: 'password', placeholder: '••••••••' },
          ].map(({ label, key, type, placeholder }) => (
            <div key={key} style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>{label}</label>
              <input type={type} value={form[key]} onChange={e => set(key, e.target.value)} placeholder={placeholder} style={inputStyle}
                onFocus={e => e.target.style.borderColor = BLUE} onBlur={e => e.target.style.borderColor = '#e5e7eb'} />
            </div>
          ))}

          <button onClick={handleRegister} style={{ width: '100%', padding: '12px 0', background: BLUE, color: '#fff', border: 'none', borderRadius: 7, fontWeight: 700, fontSize: 15, cursor: 'pointer', marginTop: 8, marginBottom: 16 }}>
            {t.registerBtn}
          </button>

          <p style={{ textAlign: 'center', fontSize: 13, color: '#888', margin: 0 }}>
            {t.haveAccount} {' '}
            <button onClick={() => onNavigate('/login')} style={{ background: 'none', border: 'none', color: BLUE, fontWeight: 700, cursor: 'pointer', fontSize: 13 }}>
              {t.signIn}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
