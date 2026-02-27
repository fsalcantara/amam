"use client";

import { useState, useEffect } from 'react';
import { Job, JOB_AREAS } from '@/features/jobs/types/job';
import { AdminInput, AdminSelect, AdminTextarea } from '@/features/admin/components/ui/AdminInput';
import { AdminButton } from '@/features/admin/components/ui/AdminButton';
import { AdminToggle } from '@/features/admin/components/ui/AdminToggle';
import styles from './JobForm.module.css';

interface JobFormProps {
  initialData?: Job | null;
  onSubmit: (data: Partial<Job>) => Promise<void>;
  onCancel: () => void;
}

export function JobForm({ initialData, onSubmit, onCancel }: JobFormProps) {
  const [formData, setFormData] = useState<Partial<Job>>({
    title: '',
    area: 'admin',
    location: '',
    description: '',
    requirements: [],
    isActive: true
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.header}>
        <h2>{initialData ? 'Editar Vaga' : 'Nova Vaga'}</h2>
      </div>

      <div className={styles.grid}>
        <AdminInput 
          label="Cargo / Título" 
          value={formData.title} 
          onChange={e => setFormData({...formData, title: e.target.value})}
          required
        />
        
        <AdminSelect 
          label="Área"
          value={formData.area || ''}
          onChange={(value: string) => setFormData({...formData, area: value as any})}
          options={JOB_AREAS.map(a => ({ label: a.label, value: a.id }))}
          required
        />
        
        <AdminInput 
          label="Localização" 
          value={formData.location} 
          onChange={e => setFormData({...formData, location: e.target.value})}
          required
        />

        <div className={styles.fullWidth}>
          <AdminTextarea 
            label="Descrição" 
            value={formData.description} 
            onChange={e => setFormData({...formData, description: e.target.value})}
            required
            rows={4}
          />
        </div>

        <div className={styles.fullWidth}>
          <AdminTextarea 
            label="Requisitos (um por linha)" 
            value={Array.isArray(formData.requirements) ? formData.requirements.join('\n') : ''} 
            onChange={e => setFormData({...formData, requirements: e.target.value.split('\n')})}
            rows={4}
          />
        </div>

        <div className={styles.actions}>
          <AdminToggle 
            label="Vaga Ativa - Visível no site" 
            checked={!!formData.isActive}
            onChange={(checked) => setFormData({...formData, isActive: checked})}
          />
        </div>
      </div>

      <div className={styles.footer}>
        <AdminButton type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </AdminButton>
        <AdminButton type="submit" disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar Vaga'}
        </AdminButton>
      </div>
    </form>
  );
}
