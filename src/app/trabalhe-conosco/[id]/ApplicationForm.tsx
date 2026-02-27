"use client";

import { useState } from 'react';
import { applicationService } from '@/features/jobs/services/applicationService';
import styles from './page.module.css'; // Reusing styles or specific ones

interface ApplicationFormProps {
  jobId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export function ApplicationForm({ jobId, onSuccess, onCancel }: ApplicationFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    cvFile: null as File | null
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await applicationService.apply({
        jobId,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        linkedin: formData.linkedin,
        cvFile: formData.cvFile || undefined
      });
      onSuccess();
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Erro ao enviar candidatura. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, cvFile: e.target.files[0] });
    }
  };

  return (
    <div className={styles.formContainer}>
      <h3 className={styles.formTitle}>Candidatar-se para a vaga</h3>
      <form onSubmit={handleSubmit}>
        
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Nome Completo *</label>
          <input 
            type="text" 
            required 
            className={styles.input}
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
            placeholder="Seu nome"
          />
        </div>

        <div className={styles.formGrid}>
          <div>
            <label className={styles.label}>Email *</label>
            <input 
              type="email" 
              required 
              className={styles.input}
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              placeholder="seu@email.com"
            />
          </div>
          <div>
            <label className={styles.label}>Telefone *</label>
            <input 
              type="tel" 
              required 
              className={styles.input}
              value={formData.phone}
              onChange={e => setFormData({...formData, phone: e.target.value})}
              placeholder="(00) 00000-0000"
            />
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>LinkedIn (Opcional)</label>
          <input 
            type="url" 
            className={styles.input}
            value={formData.linkedin}
            onChange={e => setFormData({...formData, linkedin: e.target.value})}
            placeholder="https://linkedin.com/in/seu-perfil"
          />
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>Currículo (PDF ou Word) *</label>
          <div className={`${styles.fileUploadArea} ${formData.cvFile ? styles.hasFile : ''}`}>
            {formData.cvFile ? (
              <div className={styles.fileName}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                <strong>{formData.cvFile.name}</strong>
              </div>
            ) : (
              <>
                <div className={styles.uploadIcon}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                </div>
                <p className={styles.uploadText}>Clique ou arraste seu arquivo aqui</p>
                <p className={styles.uploadSubtext}>PDF, DOC, DOCX (Máx. 5MB)</p>
              </>
            )}
            <input 
              type="file" 
              required 
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className={styles.hiddenInput}
            />
          </div>
        </div>

        <div className={styles.formActions}>
          <button 
            type="button" 
            onClick={onCancel}
            disabled={loading}
            className={styles.cancelButton}
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            disabled={loading}
            className={`${styles.applyButton} ${styles.submitButton}`}
          >
            {loading ? 'Enviando...' : 'Enviar Candidatura'}
          </button>
        </div>

      </form>
    </div>
  );
}
