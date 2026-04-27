import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Send, Paperclip, ChevronDown, ChevronUp, MessageSquare, FileText } from 'lucide-react';

const BLUE = '#4A90D9';

const initialClients = [
  {
    id: 1, name: 'Australian Grain Co.', initials: 'AG', color: '#10b981',
    threads: [
      {
        id: 'general', label: 'General', time: '15:30', unread: 1,
        messages: [
          { id: 1, from: 'Australian Grain Co.', fromType: 'client', initials: 'AG', color: '#10b981', time: '14:55', date: 'HOY', text: 'Hello, we are interested in 1,200 MT of wheat. What is your best FOB price for May delivery?' },
          { id: 2, from: 'Yo',                   fromType: 'me',     initials: 'YO', color: BLUE,      time: '15:10', text: 'Hi! Our current offer is USD 185/MT FOB Port Saint Joe. We can discuss terms. Are you interested in a formal contract proposal?' },
          { id: 3, from: 'Australian Grain Co.', fromType: 'client', initials: 'AG', color: '#10b981', time: '15:30', text: 'Yes, please send a contract proposal. We may also need 2,000 MT more in June.' },
        ],
      },
      {
        id: 'contract-256', label: 'Contrato #256', time: '01/04', unread: 0,
        messages: [
          { id: 1, from: 'AGRIMARKET',           fromType: 'admin',  initials: 'AM', color: '#7c3aed', time: '09:00', date: '01 ABR', text: 'Contrato #256 generado. Producto: Trigo · 1.200 MT · USD 185 FOB Port Saint Joe.' },
          { id: 2, from: 'Australian Grain Co.', fromType: 'client', initials: 'AG', color: '#10b981', time: '09:42', text: 'Revisamos las condiciones. Aceptamos el precio pero pedimos basis CPT en lugar de FOB.', attachment: 'counter_offer_256.pdf' },
        ],
      },
    ],
  },
  {
    id: 2, name: 'Golden Harvest Ltd', initials: 'GH', color: '#f59e0b',
    threads: [
      {
        id: 'general', label: 'General', time: '12:04', unread: 0,
        messages: [
          { id: 1, from: 'Golden Harvest Ltd', fromType: 'client', initials: 'GH', color: '#f59e0b', time: '11:30', date: 'AYER', text: 'We want to negotiate a larger volume of corn. Can you offer 4,000 MT?' },
          { id: 2, from: 'Yo',                 fromType: 'me',     initials: 'YO', color: BLUE,      time: '12:04', text: 'Yes, we have 4,000 MT available. Price would be USD 186/MT FOB. Let us move to a contract draft.' },
        ],
      },
      {
        id: 'verification', label: 'Verificación', time: '25.04', unread: 0,
        messages: [
          { id: 1, from: 'AGRIMARKET', fromType: 'admin', initials: 'AM', color: '#7c3aed', time: '10:00', date: '25 ABR', text: 'Golden Harvest Ltd ha completado el proceso KYC. Pueden operar libremente en la plataforma.' },
        ],
      },
    ],
  },
  {
    id: 3, name: 'Impex Express S.A.', initials: 'IE', color: '#8b5cf6',
    threads: [
      {
        id: 'general', label: 'General', time: '10:22', unread: 2,
        messages: [
          { id: 1, from: 'Impex Express S.A.', fromType: 'client', initials: 'IE', color: '#8b5cf6', time: '10:15', date: 'HOY', text: '¿Tienen sorgo forrajero disponible para entrega inmediata?' },
          { id: 2, from: 'Impex Express S.A.', fromType: 'client', initials: 'IE', color: '#8b5cf6', time: '10:22', text: 'Necesitamos mínimo 1.000 tn y tenemos urgencia por el cierre de campaña.' },
        ],
      },
    ],
  },
];

function Avatar({ initials, color, size = 36 }) {
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: color + '20', color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: size * 0.37, flexShrink: 0, border: `1.5px solid ${color}40` }}>
      {initials}
    </div>
  );
}

export default function SellerMessages() {
  const { lang } = useAuth();
  const [clients, setClients] = useState(initialClients);
  const [activeClient, setActiveClient] = useState(initialClients[0]);
  const [activeThread, setActiveThread] = useState(initialClients[0].threads[0]);
  const [expandedClient, setExpandedClient] = useState(initialClients[0].id);
  const [msgInput, setMsgInput] = useState('');
  const [activeTab, setActiveTab] = useState('CLIENTS');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeThread]);

  const totalUnread = clients.reduce((a, c) => a + c.threads.reduce((b, t) => b + (t.unread || 0), 0), 0);

  const selectThread = (client, thread) => {
    // Mark as read
    setClients(cs => cs.map(c => c.id === client.id
      ? { ...c, threads: c.threads.map(t => t.id === thread.id ? { ...t, unread: 0 } : t) }
      : c
    ));
    setActiveClient(client);
    setActiveThread(thread);
  };

  const handleSend = () => {
    if (!msgInput.trim()) return;
    const newMsg = {
      id: Date.now(), from: 'Yo', fromType: 'me', initials: 'YO', color: BLUE,
      time: new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }),
      text: msgInput,
    };
    setClients(cs => cs.map(c => c.id === activeClient.id
      ? { ...c, threads: c.threads.map(t => t.id === activeThread.id ? { ...t, messages: [...t.messages, newMsg] } : t) }
      : c
    ));
    setActiveThread(t => ({ ...t, messages: [...t.messages, newMsg] }));
    setMsgInput('');
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
  };

  // Get current thread messages from state
  const currentMessages = clients.find(c => c.id === activeClient.id)
    ?.threads.find(t => t.id === activeThread.id)?.messages || [];

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#1a1a2e', margin: 0 }}>
          {lang === 'ES' ? 'Mensajes' : 'Messages'}
          {totalUnread > 0 && (
            <span style={{ marginLeft: 10, background: BLUE, color: '#fff', fontSize: 12, fontWeight: 700, borderRadius: 10, padding: '2px 9px' }}>{totalUnread}</span>
          )}
        </h1>
      </div>

      <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #eee', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', display: 'flex', height: 640, overflow: 'hidden' }}>

        {/* ── SIDEBAR ── */}
        <div style={{ width: 290, flexShrink: 0, borderRight: '1px solid #eee', display: 'flex', flexDirection: 'column' }}>

          {/* Tabs */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid #eee' }}>
            {[
              { key: 'MESSAGES', label: lang === 'ES' ? 'MENSAJES' : 'MESSAGES' },
              { key: 'CLIENTS',  label: lang === 'ES' ? 'CLIENTES' : 'CLIENTS' },
            ].map(tab => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                style={{ padding: '14px 0', border: 'none', background: activeTab === tab.key ? '#fff' : '#f8fafc', color: activeTab === tab.key ? BLUE : '#999', fontWeight: activeTab === tab.key ? 700 : 400, fontSize: 12, cursor: 'pointer', letterSpacing: 0.8, borderBottom: activeTab === tab.key ? `2px solid ${BLUE}` : '2px solid transparent' }}>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Client list */}
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {clients.map(client => {
              const clientUnread = client.threads.reduce((a, t) => a + (t.unread || 0), 0);
              const isExpanded = expandedClient === client.id;
              const isActive = activeClient.id === client.id;

              return (
                <div key={client.id}>
                  {/* Client header row */}
                  <button
                    onClick={() => {
                      setExpandedClient(isExpanded ? null : client.id);
                      if (!isExpanded) selectThread(client, client.threads[0]);
                    }}
                    style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '13px 16px', border: 'none', background: isActive ? '#f0f6ff' : '#fff', cursor: 'pointer', borderBottom: '1px solid #f0f0f0', textAlign: 'left' }}
                  >
                    <Avatar initials={client.initials} color={client.color} size={36} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ margin: 0, fontWeight: 600, fontSize: 13, color: '#1a1a2e', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{client.name}</p>
                      <p style={{ margin: '1px 0 0', fontSize: 11, color: '#aaa' }}>{client.threads.length} {lang === 'ES' ? 'hilos' : 'threads'}</p>
                    </div>
                    {clientUnread > 0 && (
                      <span style={{ background: BLUE, color: '#fff', fontSize: 11, fontWeight: 700, borderRadius: '50%', width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{clientUnread}</span>
                    )}
                    {isExpanded ? <ChevronUp size={14} style={{ color: '#ccc', flexShrink: 0 }} /> : <ChevronDown size={14} style={{ color: '#ccc', flexShrink: 0 }} />}
                  </button>

                  {/* Threads */}
                  {isExpanded && (
                    <div style={{ background: '#f8fafc' }}>
                      <div style={{ padding: '8px 16px 4px', fontSize: 10, fontWeight: 700, color: '#bbb', letterSpacing: 1.2 }}>
                        {lang === 'ES' ? 'CONVERSACIONES' : 'CONVERSATIONS'}
                      </div>
                      {client.threads.map(thread => {
                        const isActiveThread = activeThread.id === thread.id && isActive;
                        return (
                          <button key={thread.id} onClick={() => selectThread(client, thread)}
                            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '10px 16px 10px 30px', border: 'none', background: isActiveThread ? '#e6f0ff' : 'transparent', cursor: 'pointer', textAlign: 'left', borderLeft: isActiveThread ? `3px solid ${BLUE}` : '3px solid transparent' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                              {thread.id.startsWith('contract') ? <FileText size={12} style={{ color: '#aaa' }} /> : <MessageSquare size={12} style={{ color: '#aaa' }} />}
                              <span style={{ fontSize: 13, fontWeight: isActiveThread ? 700 : 400, color: isActiveThread ? BLUE : '#555' }}>{thread.label}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                              {thread.unread > 0 && <span style={{ background: BLUE, color: '#fff', fontSize: 10, fontWeight: 700, borderRadius: 8, padding: '1px 6px' }}>{thread.unread}</span>}
                              <span style={{ fontSize: 10, color: '#ccc' }}>{thread.time}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── CHAT PANEL ── */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>

          {/* Chat header */}
          <div style={{ padding: '14px 24px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fafbfc' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Avatar initials={activeClient.initials} color={activeClient.color} size={36} />
              <div>
                <p style={{ margin: 0, fontWeight: 700, fontSize: 14, color: '#1a1a2e' }}>{activeClient.name}</p>
                <p style={{ margin: 0, fontSize: 12, color: '#aaa' }}>{activeThread.label}</p>
              </div>
            </div>
            <button style={{ padding: '7px 16px', border: '1.5px solid #e5e7eb', borderRadius: 6, background: '#fff', color: '#555', fontSize: 12, fontWeight: 700, cursor: 'pointer', letterSpacing: 0.5 }}>
              {lang === 'ES' ? 'VER ARCHIVOS' : 'VIEW FILES'}
            </button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 18, background: '#fff' }}>
            {currentMessages.length === 0 ? (
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc', flexDirection: 'column', gap: 10 }}>
                <MessageSquare size={40} style={{ opacity: 0.25 }} />
                <p style={{ margin: 0, fontSize: 14 }}>{lang === 'ES' ? 'Sin mensajes aún' : 'No messages yet'}</p>
              </div>
            ) : (
              currentMessages.map((msg, i) => {
                const isMe = msg.fromType === 'me';
                return (
                  <div key={msg.id}>
                    {msg.date && (
                      <div style={{ textAlign: 'center', fontSize: 11, fontWeight: 700, color: BLUE, marginBottom: 14, letterSpacing: 1 }}>
                        ── {msg.date} ──
                      </div>
                    )}
                    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', flexDirection: isMe ? 'row-reverse' : 'row' }}>
                      <Avatar initials={msg.initials} color={msg.color} size={34} />
                      <div style={{ maxWidth: '68%' }}>
                        <p style={{ margin: '0 0 5px', fontWeight: 700, fontSize: 12, color: '#888', textAlign: isMe ? 'right' : 'left' }}>{msg.from}</p>
                        {msg.attachment ? (
                          <div style={{ background: '#f5f7fa', border: '1px solid #e8eaed', borderRadius: 10, padding: '12px 16px', borderTopLeftRadius: isMe ? 10 : 2, borderTopRightRadius: isMe ? 2 : 10 }}>
                            <p style={{ margin: '0 0 8px', fontSize: 13, color: '#333' }}>{msg.text}</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: BLUE, cursor: 'pointer', fontWeight: 600 }}>
                              <Paperclip size={13} /> {msg.attachment}
                            </div>
                          </div>
                        ) : (
                          <div style={{ background: isMe ? BLUE : '#f5f7fa', borderRadius: 10, padding: '11px 15px', borderTopLeftRadius: isMe ? 10 : 2, borderTopRightRadius: isMe ? 2 : 10 }}>
                            <p style={{ margin: 0, fontSize: 13, color: isMe ? '#fff' : '#333', lineHeight: 1.55 }}>{msg.text}</p>
                          </div>
                        )}
                        <p style={{ margin: '4px 0 0', fontSize: 10, color: '#ccc', textAlign: isMe ? 'right' : 'left' }}>{msg.time}</p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{ padding: '14px 20px', borderTop: '1px solid #eee', background: '#fafbfc' }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', background: '#fff', border: '1.5px solid #e5e7eb', borderRadius: 10, padding: '10px 14px' }}
              onFocus={e => e.currentTarget.style.borderColor = BLUE}
              onBlur={e => e.currentTarget.style.borderColor = '#e5e7eb'}
            >
              <input
                type="text"
                placeholder={lang === 'ES' ? 'Escribí un mensaje...' : 'Type message here...'}
                value={msgInput}
                onChange={e => setMsgInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
                style={{ flex: 1, border: 'none', outline: 'none', fontSize: 14, color: '#333', background: 'transparent' }}
              />
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#bbb', padding: 4 }}>
                <Paperclip size={18} />
              </button>
              <button onClick={handleSend}
                style={{ background: BLUE, color: '#fff', border: 'none', borderRadius: 7, padding: '8px 18px', fontWeight: 700, fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, letterSpacing: 0.8, flexShrink: 0 }}>
                <Send size={13} /> {lang === 'ES' ? 'ENVIAR' : 'SEND'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
