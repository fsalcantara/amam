// src/components/organisms/VirtualAgent/VirtualAgent.tsx
"use client";

import { useState, useRef, useEffect } from 'react';
import styles from './VirtualAgent.module.css';

export const VirtualAgent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: string, content: string}[]>([
    { role: 'assistant', content: 'Olá! 👋 Sou a Ana, assistente virtual da Amam Alimentos. Como posso te ajudar com nossos pães hoje?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isLoading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] })
      });
      
      const data = await response.json();
      
      if (data.reply) {
        setMessages(prev => [...prev, data.reply]);
      } else {
        throw new Error('No reply');
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Desculpe, estou com um pouco de lentidão no momento devido ao alto volume de contatos. Pode tentar novamente em instantes?' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`${styles.container} ${isOpen ? styles.chatOpen : ''}`}>
      {isOpen ? (
        <div className={styles.chatWindow}>
          <div className={styles.header}>
            <div className={styles.headerTitle}>
              <div className={styles.avatar}>A</div>
              <div>
                <strong>Ana - Amam Alimentos</strong>
                 <br /><small>Responde em instantes</small>
              </div>
            </div>
            <button className={styles.closeBtn} onClick={() => setIsOpen(false)} aria-label="Fechar chat">✕</button>
          </div>
          
          <div className={styles.messagesContainer}>
            {messages.map((msg, index) => (
              <div key={index} className={msg.role === 'user' ? styles.userMessageWrapper : styles.botMessageWrapper}>
                <div className={msg.role === 'user' ? styles.userMessage : styles.botMessage}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className={styles.botMessageWrapper}>
                <div className={styles.botMessage}>
                  <div className={styles.typingIndicator}>
                    <span></span><span></span><span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className={styles.inputArea}>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Digite sua mensagem..."
              className={styles.input}
            />
            <button onClick={handleSend} disabled={isLoading || !input.trim()} className={styles.sendButton} aria-label="Enviar mensagem">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <button className={styles.floatingButton} onClick={() => setIsOpen(true)} aria-label="Abrir chat">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            <circle cx="8" cy="10" r="1.5" fill="currentColor" stroke="none"></circle>
            <circle cx="12" cy="10" r="1.5" fill="currentColor" stroke="none"></circle>
            <circle cx="16" cy="10" r="1.5" fill="currentColor" stroke="none"></circle>
          </svg>
        </button>
      )}
    </div>
  );
};
