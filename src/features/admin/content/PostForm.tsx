"use client";

import { useState, useEffect } from 'react';
import { Post, CONTENT_TYPES } from '@/features/content-hub/types/post';
import { AdminInput, AdminSelect, AdminTextarea } from '@/features/admin/components/ui/AdminInput';
import { AdminButton } from '@/features/admin/components/ui/AdminButton';
import styles from './PostForm.module.css';

interface PostFormProps {
  initialData?: Post | null;
  onSubmit: (data: Partial<Post>) => Promise<void>;
  onCancel: () => void;
}

export function PostForm({ initialData, onSubmit, onCancel }: PostFormProps) {
  const [formData, setFormData] = useState<Partial<Post>>({
    title: '',
    slug: '',
    type: 'blog',
    excerpt: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
    isFeatured: false
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
        <h2>{initialData ? 'Editar Conteúdo' : 'Novo Conteúdo'}</h2>
      </div>

      <div className={styles.grid}>
        <div className={styles.fullWidth}>
          <AdminInput 
            label="Título" 
            value={formData.title} 
            onChange={e => setFormData({...formData, title: e.target.value})}
            required
          />
        </div>

        <AdminInput 
          label="Slug (URL)" 
          value={formData.slug} 
          onChange={e => setFormData({...formData, slug: e.target.value})}
          required
        />
        
        <AdminSelect 
          label="Tipo"
          value={formData.type || ''}
          onChange={(value: string) => setFormData({...formData, type: value as any})}
          options={CONTENT_TYPES.map(t => ({ label: t.label, value: t.id }))}
          required
        />
        
        <AdminInput 
          label="Data de Publicação" 
          type="date"
          value={formData.date ? new Date(formData.date).toISOString().split('T')[0] : ''} 
          onChange={e => setFormData({...formData, date: e.target.value})}
          required
        />

        <div className={styles.fullWidth}>
          <AdminTextarea 
            label="Resumo" 
            value={formData.excerpt} 
            onChange={e => setFormData({...formData, excerpt: e.target.value})}
            required
            rows={3}
          />
        </div>

        <div className={styles.fullWidth}>
          <AdminTextarea 
            label="Conteúdo (HTML/Markdown)" 
            value={formData.content} 
            onChange={e => setFormData({...formData, content: e.target.value})}
            rows={8}
          />
        </div>

        <div className={styles.actions}>
          <label className={styles.checkboxLabel}>
            <input 
              type="checkbox" 
              checked={formData.isFeatured}
              onChange={e => setFormData({...formData, isFeatured: e.target.checked})}
            />
            Destaque na Home
          </label>
        </div>
      </div>

      <div className={styles.footer}>
        <AdminButton type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </AdminButton>
        <AdminButton type="submit" disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar Conteúdo'}
        </AdminButton>
      </div>
    </form>
  );
}
