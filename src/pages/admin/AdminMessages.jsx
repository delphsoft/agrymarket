import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Send, Paperclip, ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';

const BLUE = '#4A90D9';

const clients = [
  {
    id: 1, name: 'AgroSur S.A.', initials: 'AS', color: BLUE,
    threads: [
      { id: 'general', label: 'General', time: '15:30', messages: [
        { from: 'AgroSur S.A.',  fromType: 'client', initials: 'AS', color: BLUE, time: '11:54', date: 'JULIO 25, 2018', text: 'Hola, necesitamos actualizar nuestro certificado de incorporación.' },
        { from: 'AGRIMARKET',    fromType: 'admin',  initials: 'AM', color: '#7c3aed', time: '15:30', text: 'Por favor subí el documento actualizado en el hilo de verificación.' },
      ]},
      { id: 'verification', label: 'Verificación', time: '25.07.2018', messages: [
        { from: 'Eric B.',       fromType: 'staff',  initials: 'EB', color: '#10b981', time: '11:54', date: 'JULIO 25, 2018', text: 'Enviado para aprobación: Certificado de Incorporación', attachment: 'Certificado_Inc_2024.png' },
        { from: 'AgroSur S.A.', fromType: 'client', initials: 'AS', color: BLUE,     time: '11:54', text: 'Aprobado: Certificado de Incorporación', attachment: 'Certificado_Inc_2024_ok.png' },
      ]},
    ],
  },
  {
    id: 2, name: 'Golden Harvest Ltd', initials: 'GH', color: '#f59e0b',
    threads: [
      { id: 'general',      label: 'General',      time: '09:12', messages: [
        { from: 'Golden Harvest', fromType: 'client', initials: 'GH', color: '#f59e0b', time: '09:12', date: 'HOY', text: 'We need to complete our KYC process. Who should we contact?' },
        { from: 'AGRIMARKET',     fromType: 'admin',  initials: 'AM', color: '#7c3aed', time: '09:18', text: 'Please upload your documents in the Verification thread below.' },
      ]},
      { id: 'verification', label: 'Verificación', time: 'Pendiente', messages: [] },
    ],
  },
  {
    id: 3, name: 'NOA Granos S.R.L.', initials: 'NG', color: '#8b5cf6',
    threads: [
      { id: 'general', label: 'General', time: '11/04', messages: [
        { from: 'NOA Granos', fromType: 'client', initials: 'NG', color: '#8b5cf6', time: '11:05', date: '24 ABR', text: '¿Cuándo estará listo el contrato #247?' },
      ]},
    ],
  },
];

function Avatar({ initials, color, size = 34 }) {
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: color + '22', color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: size * 0.38, flexShrink: 0 }}>
      {initials}
    </div>
  );
}

export default function AdminMessages() {
  const { lang } = useAuth();
  const [activeClient, setActiveClient] = useState(clients[0]);
  const [activeThread, setActiveThread] = useState(clients[0].threads[0]);
  const [expandedClient, setExpandedClient] = useState(clients[0].id);
  const [msgInput, setMsgInput] = useState('');
  const [activeTab, setActiveTab] = useState('CLIENTS');

  const handleSend = () => {
    if (!msgInput.trim()) return;
    setMsgInput('');
  };

  const selectThread = (client, thread) => {
    setActiveClient(client);
    setActiveThread(thread);
  };

  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: '#1a1a2e', marginBottom: 20 }}>
        {lang === 'ES' ? 'Mensajería' : 'Messages'}
      </h1>

      <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #eee', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', display: 'flex', height: 620, overflow: 'hidden' }}>

        {/* ── LEFT SIDEBAR ── */}
        <div style={{ width: 280, flexShrink: 0, borderRight: '1px solid #eee', display: 'flex', flexDirection: 'column' }}>

          {/* Tabs: MESSAGES / CLIENTS */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid #eee' }}>
            {['MESSAGES', 'CLIENTS'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                style={{ padding: '14px 0', border: 'none', background: activeTab === tab ? '#fff' : '#f8fafc', color: activeTab === tab ? BLUE : '#999', fontWeight: activeTab === tab ? 700 : 400, fontSize: 13, cursor: 'pointer', letterSpacing: 0.5, borderBottom: activeTab === tab ? `2px solid ${BLUE}` : '2px solid transparent' }}>
                {tab}
              </button>
            ))}
          </div>

          {/* Client list */}
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {clients.map(client => (
              <div key={client.id}>
                {/* Client row */}
                <button
                  onClick={() => { setExpandedClient(expandedClient === client.id ? null : client.id); setActiveClient(client); selectThread(client, client.threads[0]); }}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '12px 16px', border: 'none', background: activeClient.id === client.id ? '#f0f6ff' : '#fff', cursor: 'pointer', borderBottom: '1px solid #f5f5f5', textAlign: 'left' }}
                >
                  <Avatar initials={client.initials} color={client.color} />
                  <span style={{ flex: 1, fontWeight: 600, fontSize: 14, color: '#1a1a2e' }}>{client.name}</span>
                  {expandedClient === client.id ? <ChevronUp size={14} style={{ color: '#aaa' }} /> : <ChevronDown size={14} style={{ color: '#aaa' }} />}
                </button>

                {/* Expanded threads */}
                {expandedClient === client.id && (
                  <div style={{ background: '#f8fafc' }}>
                    <div style={{ padding: '8px 16px 4px', fontSize: 11, fontWeight: 700, color: '#aaa', letterSpacing: 1 }}>
                      {lang === 'ES' ? 'CONVERSACIONES' : 'CONVERSATIONS'}
                    </div>
                    {client.threads.map(thread => (
                      <button key={thread.id} onClick={() => selectThread(client, thread)}
                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '10px 16px 10px 28px', border: 'none', background: activeThread.id === thread.id && activeClient.id === client.id ? '#e6f0ff' : 'transparent', cursor: 'pointer', textAlign: 'left' }}>
                        <span style={{ fontSize: 13, fontWeight: activeThread.id === thread.id ? 700 : 400, color: activeThread.id === thread.id ? BLUE : '#555' }}>{thread.label}</span>
                        <span style={{ fontSize: 11, color: '#bbb' }}>{thread.time}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: CHAT PANEL ── */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>

          {/* Chat header */}
          <div style={{ padding: '14px 24px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Avatar initials={activeClient.initials} color={activeClient.color} />
              <div>
                <p style={{ margin: 0, fontWeight: 700, fontSize: 14, color: '#1a1a2e' }}>{activeClient.name}</p>
                <p style={{ margin: 0, fontSize: 12, color: '#aaa' }}>{activeThread.label}</p>
              </div>
            </div>
            <button style={{ padding: '7px 16px', border: '1.5px solid #e5e7eb', borderRadius: 6, background: '#fff', color: '#555', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
              {lang === 'ES' ? 'VER ARCHIVOS' : 'VIEW FILES'}
            </button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            {activeThread.messages.length === 0 ? (
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc', flexDirection: 'column', gap: 8 }}>
                <MessageSquare size={36} style={{ opacity: 0.3 }} />
                <p style={{ margin: 0, fontSize: 14 }}>{lang === 'ES' ? 'Sin mensajes en este hilo' : 'No messages in this thread'}</p>
              </div>
            ) : (
              activeThread.messages.map((msg, i) => (
                <div key={i}>
                  {msg.date && (
                    <div style={{ textAlign: 'center', fontSize: 11, fontWeight: 700, color: BLUE, marginBottom: 12, letterSpacing: 1 }}>
                      {msg.date}
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <Avatar initials={msg.initials} color={msg.color} />
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: '0 0 4px', fontWeight: 700, fontSize: 13, color: '#1a1a2e' }}>{msg.from}</p>
                      {msg.attachment ? (
                        <div style={{ background: '#f5f7fa', border: '1px solid #eee', borderRadius: 8, padding: '10px 14px', display: 'inline-block', maxWidth: 380 }}>
                          <p style={{ margin: '0 0 6px', fontSize: 13, color: '#333' }}>{msg.text}</p>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: BLUE, cursor: 'pointer' }}>
                            <span>📎</span> {msg.attachment}
                          </div>
                        </div>
                      ) : (
                        <p style={{ margin: 0, fontSize: 13, color: '#555', background: '#f5f7fa', borderRadius: 8, padding: '10px 14px', display: 'inline-block', maxWidth: 400 }}>{msg.text}</p>
                      )}
                    </div>
                    <span style={{ fontSize: 11, color: '#ccc', flexShrink: 0, marginTop: 2 }}>{msg.time}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Input */}
          <div style={{ padding: '14px 20px', borderTop: '1px solid #eee' }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', border: '1.5px solid #e5e7eb', borderRadius: 8, padding: '10px 14px' }}>
              <input
                type="text"
                placeholder={lang === 'ES' ? 'Escribí un mensaje...' : 'Type message here...'}
                value={msgInput}
                onChange={e => setMsgInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                style={{ flex: 1, border: 'none', outline: 'none', fontSize: 14, color: '#333' }}
              />
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#aaa' }}>
                <Paperclip size={18} />
              </button>
              <button onClick={handleSend}
                style={{ background: BLUE, color: '#fff', border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 700, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, letterSpacing: 0.5 }}>
                <Send size={14} /> {lang === 'ES' ? 'ENVIAR' : 'SEND'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
