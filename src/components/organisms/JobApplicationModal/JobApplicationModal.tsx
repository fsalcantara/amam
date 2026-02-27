"use client";

import { useState } from 'react';
import { Modal } from '@/components/molecules/Modal/Modal';
import styles from './JobApplicationModal.module.css';

interface JobApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  vacancyTitle: string;
}

export const JobApplicationModal = ({ isOpen, onClose, vacancyTitle }: JobApplicationModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    linkedin: '',
    resume: null as File | null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Application submitted:', formData);
    alert(`Candidatura enviada para ${vacancyTitle} com sucesso!`);
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, resume: e.target.files[0] });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.modalContent}>
        <div className={styles.header}>
          <h2>Candidatura Simplificada</h2>
          <p>Você está se candidatando para: <strong>{vacancyTitle}</strong></p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>Nome Completo</label>
            <input 
              type="text" 
              id="name" 
              className={styles.input} 
              required 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input 
              type="email" 
              id="email" 
              className={styles.input} 
              required 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="linkedin" className={styles.label}>Perfil do LinkedIn (URL)</label>
            <input 
              type="url" 
              id="linkedin" 
              className={styles.input} 
              placeholder="https://linkedin.com/in/seu-perfil"
              value={formData.linkedin}
              onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Currículo (PDF, DOCX)</label>
            <div className={styles.fileInputWrapper}>
              <label htmlFor="resume" className={styles.uploadBtn}>
                {formData.resume ? formData.resume.name : '📎 Anexar Currículo'}
              </label>
              <input 
                type="file" 
                id="resume" 
                className={styles.fileInput} 
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
              />
            </div>
          </div>

          <button type="submit" className={styles.submitBtn}>
            Enviar Candidatura
          </button>
          
          <p className={styles.disclaimer}>
            Ao clicar em enviar, você concorda com nossos termos de privacidade.
          </p>
        </form>
      </div>
    </Modal>
  );
};
