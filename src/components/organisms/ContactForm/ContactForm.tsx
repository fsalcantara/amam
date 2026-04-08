"use client";

import { useState } from 'react';
import { CustomSelect } from '@/features/admin/components/ui/CustomSelect';
import { useToast } from '@/components/atoms/Toast/ToastContext';
import styles from './ContactForm.module.css';

interface ContactFormProps {
  variant?: 'light' | 'dark';
}

export const ContactForm = ({ variant = 'light' }: ContactFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    email: '',
    segment: '',
    otherSegment: '',
    businessName: '',
  });

  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'contact',
          ...formData
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao enviar mensagem');
      }

      showToast(`Obrigado pelo contato, ${formData.name}! Recebemos sua mensagem com sucesso.`, 'success');
      setFormData({
        name: '',
        phone: '',
        city: '',
        email: '',
        segment: '',
        otherSegment: '',
        businessName: '',
      });
    } catch (error: any) {
      console.error('Submit error:', error);
      showToast(error.message || 'Ocorreu um erro ao enviar sua mensagem. Tente novamente mais tarde.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={`${styles.form} ${variant === 'dark' ? styles.formDark : ''}`} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Envie sua Mensagem</h2>

      <div className={styles.field}>
        <label htmlFor="name">Nome *</label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          required 
          value={formData.name}
          onChange={handleChange}
          placeholder="Seu nome completo"
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="phone">Telefone (WhatsApp) *</label>
        <input 
          type="tel" 
          id="phone" 
          name="phone" 
          required 
          value={formData.phone}
          onChange={handleChange}
          placeholder="(00) 00000-0000"
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="city">Cidade *</label>
        <input 
          type="text" 
          id="city" 
          name="city" 
          required 
          value={formData.city}
          onChange={handleChange}
          placeholder="Ex.: Vitória da Conquista"
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="email">Email *</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          required 
          value={formData.email}
          onChange={handleChange}
          placeholder="seu@email.com"
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="segment">Qual segmento do seu comércio?</label>
        <CustomSelect 
          value={formData.segment} 
          onChange={(value) => handleSelectChange('segment', value)}
          className={styles.select}
          options={[
            { label: 'Supermercado', value: 'Supermercado' },
            { label: 'Restaurante', value: 'Restaurante' },
            { label: 'Lanchonete', value: 'Lanchonete' },
            { label: 'Padaria', value: 'Padaria' },
            { label: 'Outro', value: 'Outro' },
          ]}
          placeholder="Selecione..."
        />
      </div>

      {formData.segment === 'Outro' && (
        <div className={`${styles.field} ${styles.fullWidth}`}>
          <label htmlFor="otherSegment">Qual o seu segmento? *</label>
          <input 
            type="text" 
            id="otherSegment" 
            name="otherSegment" 
            required
            value={formData.otherSegment}
            onChange={handleChange}
            placeholder="Digite seu segmento"
            autoFocus
          />
        </div>
      )}

      <div className={styles.field}>
        <label htmlFor="businessName">Nome do seu comércio *</label>
        <input 
          type="text" 
          id="businessName" 
          name="businessName" 
          required 
          value={formData.businessName}
          onChange={handleChange}
          placeholder="Nome da sua empresa"
        />
      </div>

      <button type="submit" className={styles.submitButton} disabled={loading}>
        {loading ? 'Enviando...' : 'Enviar'}
      </button>

    </form>
  );
};
