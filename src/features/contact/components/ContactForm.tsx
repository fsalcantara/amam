'use client';

import { useState } from 'react';
import { Button } from '@/components/atoms/Button/Button';
import styles from './ContactForm.module.css';

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.group}>
        <label htmlFor="name" className={styles.label}>Nome</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className={styles.input}
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div className={styles.group}>
        <label htmlFor="email" className={styles.label}>E-mail</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className={styles.input}
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className={styles.group}>
        <label htmlFor="subject" className={styles.label}>Assunto</label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          className={styles.input}
          value={formData.subject}
          onChange={handleChange}
        />
      </div>

      <div className={styles.group}>
        <label htmlFor="message" className={styles.label}>Mensagem</label>
        <textarea
          id="message"
          name="message"
          required
          className={styles.textarea}
          value={formData.message}
          onChange={handleChange}
        />
      </div>

      <Button type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Enviando...' : 'Enviar Mensagem'}
      </Button>

      {status === 'success' && (
        <p style={{ color: 'green', fontSize: '0.9rem' }}>Mensagem enviada com sucesso! Entraremos em contato em breve.</p>
      )}
    </form>
  );
};
