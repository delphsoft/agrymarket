import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Plus, Edit, Trash2, Eye, PenSquare } from 'lucide-react';

const BLUE = '#4A90D9';

const initialArticles = [
  { id: 1, title: { ES: 'Guía de exportación de granos desde Argentina 2026', EN: 'Guide to grain exports from Argentina 2026' }, tag: 'Guía', status: 'published', date: '20/04/2026', views: 1240 },
  { id: 2, title: { ES: 'Cómo funciona el sistema de licitaciones en AGRIMARKET', EN: 'How the tender system works on AGRIMARKET' }, tag: 'Plataforma', status: 'published', date: '15/04/2026', views: 830 },
  { id: 3, title: { ES: 'Precios del maíz: tendencias del mercado Q2 2026', EN: 'Corn prices: Q2 2026 market trends' }, tag: 'Mercado', status: 'draft', date: '24/04/2026', views: 0 },
  { id: 4, title: { ES: 'Compliance KYC: qué documentos necesitás para operar', EN: 'KYC compliance: what documents you need to trade' }, tag: 'Compliance', status: 'published', date: '08/04/2026', views: 2100 },
  { id: 5, title: { ES: 'Incoterms 2026: FOB, CIF, EXW explicados para el agro', EN: 'Incoterms 2026: FOB, CIF, EXW explained for agri' }, tag: 'Educación', status: 'draft', date: '26/04/2026', views: 0 },
];

const TAGS = ['Guía', 'Plataforma', 'Mercado', 'Compliance', 'Educación', 'Noticias'];

const STATUS_CFG = {
  published: { bg: '#dcfce7', color: '#15803d', ES: 'Publicado', EN: 'Published' },
  draft:     { bg: '#f1f5f9', color: '#475569', ES: 'Borrador',  EN: 'Draft' },
};

export default function AdminBlog() {
  const { lang } = useAuth();
  const [articles, setArticles] = useState(initialArticles);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ titleES: '', titleEN: '', tag: 'Guía', status: 'draft' });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const openNew = () => { setForm({ titleES: '', titleEN: '', tag: 'Guía', status: 'draft' }); setEditItem(null); setShowForm(true); };
  const openEdit = (a) => { setForm({ titleES: a.title.ES, titleEN: a.title.EN, tag: a.tag, status: a.status }); setEditItem(a); setShowForm(true); };

  const handleSave = () => {
    if (!form.titleES) return;
    const today = new Date().toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    if (editItem) {
      setArticles(articles.map(a => a.id === editItem.id ? { ...a, title: { ES: form.titleES, EN: form.titleEN }, tag: form.tag, status: form.status } : a));
    } else {
      setArticles([...articles, { id: Date.now(), title: { ES: form.titleES, EN: form.titleEN }, tag: form.tag, status: form.status, date: today, views: 0 }]);
    }
    setShowForm(false);
  };

  const remove = (id) => setArticles(articles.filter(a => a.id !== id));
  const toggleStatus = (id) => setArticles(articles.map(a => a.id === id ? { ...a, status: a.status === 'published' ? 'draft' : 'published' } : a));

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#1a1a2e', margin: 0 }}>Blog</h1>
          <p style={{ color: '#888', fontSize: 13, margin: '4px 0 0' }}>
            {articles.length} {lang === 'ES' ? 'artículos' : 'articles'} · {articles.filter(a => a.status === 'published').length} {lang === 'ES' ? 'publicados' : 'published'}
          </p>
        </div>
        <button onClick={openNew} style={{ display: 'flex', alignItems: 'center', gap: 8, background: BLUE, color: '#fff', border: 'none', borderRadius: 6, padding: '10px 18px', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
          <Plus size={16} /> {lang === 'ES' ? 'Nuevo artículo' : 'New article'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: showForm ? '1fr 380px' : '1fr', gap: 20 }}>

        {/* Articles table */}
        <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #eee', overflow: 'hidden', boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2.5fr 100px 100px 80px 130px', padding: '11px 20px', background: '#fafbfc', borderBottom: '1px solid #eee' }}>
            {['Título', 'Tag', 'Estado', 'Vistas', 'Acciones'].map((h, i) => (
              <span key={i} style={{ fontSize: 11, fontWeight: 700, color: '#888', letterSpacing: 1, textTransform: 'uppercase' }}>{h}</span>
            ))}
          </div>

          {articles.map((a, i) => {
            const st = STATUS_CFG[a.status];
            return (
              <div key={a.id} style={{ display: 'grid', gridTemplateColumns: '2.5fr 100px 100px 80px 130px', padding: '14px 20px', alignItems: 'center', borderBottom: i < articles.length - 1 ? '1px solid #f5f5f5' : 'none', background: '#fff' }}
                onMouseEnter={e => e.currentTarget.style.background = '#fafbff'}
                onMouseLeave={e => e.currentTarget.style.background = '#fff'}
              >
                <div>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: 14, color: '#1a1a2e' }}>{a.title[lang]}</p>
                  <p style={{ margin: '2px 0 0', fontSize: 11, color: '#aaa' }}>{a.date}</p>
                </div>
                <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 4, background: '#eff6ff', color: BLUE }}>{a.tag}</span>
                <button onClick={() => toggleStatus(a.id)} style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, padding: '4px 8px', borderRadius: 4, background: st.bg, color: st.color, border: 'none', cursor: 'pointer' }}>
                  {st[lang]}
                </button>
                <span style={{ fontSize: 13, color: '#888' }}>{a.views > 0 ? a.views.toLocaleString() : '-'}</span>
                <div style={{ display: 'flex', gap: 5 }}>
                  <button onClick={() => openEdit(a)} style={{ padding: '6px 8px', background: '#f1f5f9', border: 'none', borderRadius: 5, cursor: 'pointer', color: '#555' }}>
                    <Edit size={13} />
                  </button>
                  <button style={{ padding: '6px 8px', background: '#f1f5f9', border: 'none', borderRadius: 5, cursor: 'pointer', color: BLUE }}>
                    <Eye size={13} />
                  </button>
                  <button onClick={() => remove(a.id)} style={{ padding: '6px 8px', background: '#fef2f2', border: 'none', borderRadius: 5, cursor: 'pointer', color: '#dc2626' }}>
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Form panel */}
        {showForm && (
          <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #eee', padding: 24, height: 'fit-content', boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1a1a2e', margin: 0 }}>
                {editItem ? (lang === 'ES' ? 'Editar artículo' : 'Edit article') : (lang === 'ES' ? 'Nuevo artículo' : 'New article')}
              </h3>
              <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#aaa', fontSize: 18 }}>✕</button>
            </div>

            {[
              { label: lang === 'ES' ? 'Título en Español' : 'Spanish title', key: 'titleES' },
              { label: lang === 'ES' ? 'Título en Inglés' : 'English title', key: 'titleEN' },
            ].map(({ label, key }) => (
              <div key={key} style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>{label}</label>
                <input value={form[key]} onChange={e => set(key, e.target.value)} style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #e5e7eb', borderRadius: 7, fontSize: 13, outline: 'none', boxSizing: 'border-box' }} />
              </div>
            ))}

            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Tag</label>
              <select value={form.tag} onChange={e => set('tag', e.target.value)} style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #e5e7eb', borderRadius: 7, fontSize: 13, outline: 'none' }}>
                {TAGS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 8 }}>Estado</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {['draft', 'published'].map(s => (
                  <button key={s} onClick={() => set('status', s)} style={{ flex: 1, padding: '9px 0', border: `1.5px solid ${form.status === s ? BLUE : '#e5e7eb'}`, borderRadius: 7, background: form.status === s ? '#eff6ff' : '#fff', color: form.status === s ? BLUE : '#888', fontWeight: form.status === s ? 700 : 400, fontSize: 13, cursor: 'pointer' }}>
                    {STATUS_CFG[s][lang]}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={handleSave} style={{ width: '100%', padding: '11px 0', background: BLUE, color: '#fff', border: 'none', borderRadius: 7, fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
              {editItem ? (lang === 'ES' ? 'Guardar cambios' : 'Save changes') : (lang === 'ES' ? 'Publicar' : 'Publish')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
