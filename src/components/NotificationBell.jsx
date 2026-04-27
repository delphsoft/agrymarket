import React, { useState } from 'react';
import { Bell, MessageSquare, FileText, Gavel, CheckCircle, X } from 'lucide-react';

const BLUE = '#4A90D9';

const NOTIF_TYPES = {
  message:  { icon: MessageSquare, color: BLUE,      bg: '#eff6ff' },
  contract: { icon: FileText,       color: '#f59e0b', bg: '#fffbeb' },
  tender:   { icon: Gavel,          color: '#7c3aed', bg: '#f5f3ff' },
  system:   { icon: CheckCircle,    color: '#10b981', bg: '#ecfdf5' },
};

const initialNotifications = {
  seller: [
    { id: 1, type: 'message',  read: false, time: '10:32', text: { ES: 'Australian Grain Co. respondió tu oferta', EN: 'Australian Grain Co. replied to your offer' },       route: '/seller/messages' },
    { id: 2, type: 'contract', read: false, time: '09:15', text: { ES: 'Contra-oferta recibida en contrato #251', EN: 'Counter-offer received on contract #251' },            route: '/seller/contracts' },
    { id: 3, type: 'tender',   read: false, time: 'Ayer',  text: { ES: 'Nueva oferta en licitación T-001: USD 1.100', EN: 'New bid on tender T-001: USD 1,100' },             route: '/seller/tenders' },
    { id: 4, type: 'system',   read: true,  time: 'Ayer',  text: { ES: 'Tu KYC fue verificado correctamente', EN: 'Your KYC has been verified successfully' },                route: '/seller/profile' },
    { id: 5, type: 'contract', read: true,  time: '22/04', text: { ES: 'Contrato #253 firmado por Adecoagro S.A.', EN: 'Contract #253 signed by Adecoagro S.A.' },           route: '/seller/contracts' },
  ],
  buyer: [
    { id: 1, type: 'contract', read: false, time: '11:04', text: { ES: 'Contra-oferta recibida en contrato #251', EN: 'Counter-offer received on contract #251' },            route: '/buyer/contracts' },
    { id: 2, type: 'message',  read: false, time: '09:30', text: { ES: 'AgroSur S.A. te envió un mensaje', EN: 'AgroSur S.A. sent you a message' },                          route: '/buyer/messages' },
    { id: 3, type: 'tender',   read: true,  time: 'Ayer',  text: { ES: 'Tu oferta en T-005 es la mejor actualmente', EN: 'Your bid on T-005 is currently the best' },        route: '/buyer/tenders' },
    { id: 4, type: 'system',   read: true,  time: '24/04', text: { ES: 'Bienvenido a AGRIMARKET. KYC aprobado.', EN: 'Welcome to AGRIMARKET. KYC approved.' },               route: '/buyer/profile' },
  ],
  admin: [
    { id: 1, type: 'system',   read: false, time: '11:30', text: { ES: '5 usuarios pendientes de verificación KYC', EN: '5 users pending KYC verification' },                  route: '/admin/users' },
    { id: 2, type: 'contract', read: false, time: '10:15', text: { ES: 'Disputa reportada en contrato #248', EN: 'Dispute reported on contract #248' },                        route: '/admin/contracts' },
    { id: 3, type: 'message',  read: true,  time: 'Ayer',  text: { ES: 'Nuevo mensaje de soporte de Golden Harvest', EN: 'New support message from Golden Harvest' },          route: '/admin/messages' },
  ],
};

export default function NotificationBell({ role = 'seller', lang = 'ES', onNavigate }) {
  const [open, setOpen] = useState(false);
  const [notifs, setNotifs] = useState(initialNotifications[role] || initialNotifications.seller);

  const unread = notifs.filter(n => !n.read).length;

  const markAll = () => setNotifs(ns => ns.map(n => ({ ...n, read: true })));
  const markOne = (id) => setNotifs(ns => ns.map(n => n.id === id ? { ...n, read: true } : n));

  const handleClick = (notif) => {
    markOne(notif.id);
    setOpen(false);
    onNavigate(notif.route);
  };

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.35)', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative', color: '#fff' }}
      >
        <Bell size={17} />
        {unread > 0 && (
          <span style={{ position: 'absolute', top: -3, right: -3, background: '#ef4444', color: '#fff', fontSize: 10, fontWeight: 800, borderRadius: '50%', width: 17, height: 17, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid rgba(91,143,219,1)' }}>
            {unread > 9 ? '9+' : unread}
          </span>
        )}
      </button>

      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 90 }} />
          <div style={{ position: 'absolute', right: 0, top: 44, width: 360, background: '#fff', borderRadius: 10, boxShadow: '0 12px 40px rgba(0,0,0,0.16)', border: '1px solid #eee', zIndex: 100, overflow: 'hidden' }}>

            {/* Header */}
            <div style={{ padding: '14px 18px', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fafbfc' }}>
              <p style={{ margin: 0, fontWeight: 700, fontSize: 14, color: '#1a1a2e' }}>
                {lang === 'ES' ? 'Notificaciones' : 'Notifications'}
                {unread > 0 && <span style={{ marginLeft: 8, background: '#ef4444', color: '#fff', fontSize: 11, fontWeight: 700, borderRadius: 10, padding: '1px 7px' }}>{unread}</span>}
              </p>
              {unread > 0 && (
                <button onClick={markAll} style={{ background: 'none', border: 'none', color: BLUE, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
                  {lang === 'ES' ? 'Marcar todo leído' : 'Mark all read'}
                </button>
              )}
            </div>

            {/* List */}
            <div style={{ maxHeight: 380, overflowY: 'auto' }}>
              {notifs.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '32px 20px', color: '#ccc' }}>
                  <Bell size={32} style={{ display: 'block', margin: '0 auto 10px', opacity: 0.3 }} />
                  <p style={{ margin: 0, fontSize: 13 }}>{lang === 'ES' ? 'Sin notificaciones' : 'No notifications'}</p>
                </div>
              ) : (
                notifs.map((n, i) => {
                  const cfg = NOTIF_TYPES[n.type];
                  const Icon = cfg.icon;
                  return (
                    <button key={n.id} onClick={() => handleClick(n)}
                      style={{ display: 'flex', alignItems: 'flex-start', gap: 12, width: '100%', padding: '13px 18px', border: 'none', background: n.read ? '#fff' : '#f8fbff', borderBottom: i < notifs.length - 1 ? '1px solid #f5f5f5' : 'none', cursor: 'pointer', textAlign: 'left' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#f0f6ff'}
                      onMouseLeave={e => e.currentTarget.style.background = n.read ? '#fff' : '#f8fbff'}
                    >
                      <div style={{ width: 34, height: 34, borderRadius: '50%', background: cfg.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Icon size={16} style={{ color: cfg.color }} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ margin: '0 0 2px', fontSize: 13, color: '#1a1a2e', lineHeight: 1.4, fontWeight: n.read ? 400 : 600 }}>{n.text[lang]}</p>
                        <p style={{ margin: 0, fontSize: 11, color: '#bbb' }}>{n.time}</p>
                      </div>
                      {!n.read && <div style={{ width: 8, height: 8, borderRadius: '50%', background: BLUE, flexShrink: 0, marginTop: 4 }} />}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
