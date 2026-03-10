"use client";

import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Post, CONTENT_TYPES } from '@/features/content-hub/types/post';
import { AdminInput, AdminSelect, AdminTextarea } from '@/features/admin/components/ui/AdminInput';
import { AdminButton } from '@/features/admin/components/ui/AdminButton';
import { postSchema, PostFormValues } from '@/features/admin/schemas/adminSchemas';
import styles from './PostForm.module.css';

interface PostFormProps {
  initialData?: Post | null;
  onSubmit: (data: Partial<Post>) => Promise<void>;
  onCancel: () => void;
}

export function PostForm({ initialData, onSubmit, onCancel }: PostFormProps) {
  const [loading, setLoading] = useState(false);
  const [videoMode, setVideoMode] = useState<'url' | 'upload'>('url');
  const [videoUrl, setVideoUrl] = useState(initialData?.videoUrl || '');
  const [gallery, setGallery] = useState<string[]>(initialData?.gallery || []);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: initialData?.title || '',
      excerpt: initialData?.excerpt || '',
      type: initialData?.type || 'blog',
      date: initialData?.date ? new Date(initialData.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      imageUrl: initialData?.coverImage || '',
      videoUrl: initialData?.videoUrl || '',
      content: initialData?.content || '',
      ingredients: initialData?.ingredients?.join('\n') || '',
      preparationSteps: initialData?.preparationSteps?.join('\n') || '',
    }
  });

  const formType = watch('type');

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoUrl(URL.createObjectURL(file));
    }
  }, []);

  const onFormSubmit = useCallback(async (data: PostFormValues) => {
    setLoading(true);
    try {
      await onSubmit({
        ...data,
        type: data.type as Post['type'],
        coverImage: data.imageUrl,
        videoUrl: videoMode === 'upload' ? videoUrl : data.videoUrl,
        gallery,
        isFeatured: false,
        ingredients: data.ingredients ? data.ingredients.split('\n').filter(i => i.trim()) : undefined,
        preparationSteps: data.preparationSteps ? data.preparationSteps.split('\n').filter(i => i.trim()) : undefined,
        slug: data.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      });
    } finally {
      setLoading(false);
    }
  }, [onSubmit, videoMode, videoUrl, gallery]);

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className={styles.form}>
      <div className={styles.header}>
        <h2>{initialData ? 'Editar Conteúdo' : 'Novo Conteúdo'}</h2>
      </div>

      <div className={styles.grid}>
        <div className={styles.fullWidth}>
          <AdminInput 
            label="Título" 
            {...register('title')}
            error={errors.title?.message}
            required
          />
        </div>

        <AdminSelect 
          label="Tipo"
          value={formType || 'blog'}
          onChange={(value: string) => setValue('type', value)}
          options={CONTENT_TYPES.map(t => ({ label: t.label, value: t.id }))}
          error={errors.type?.message}
          required
        />
        
        <AdminInput 
          label="Data de Publicação" 
          type="date"
          {...register('date')}
          error={errors.date?.message}
          required
        />

        <div className={styles.fullWidth}>
          <AdminTextarea 
            label="Resumo" 
            {...register('excerpt')}
            error={errors.excerpt?.message}
            required
            rows={3}
          />
        </div>

        <div className={styles.fullWidth}>
          <AdminTextarea 
            label="Conteúdo (HTML/Markdown)" 
            {...register('content')}
            rows={8}
          />
        </div>

        {formType === 'receita' && (
          <>
            <h3 className={styles.sectionTitle}>Detalhes da Receita</h3>
            <div className={styles.fullWidth}>
              <AdminTextarea 
                label="Ingredientes (Um por linha)" 
                {...register('ingredients')}
                placeholder="Ex: 500g de farinha&#10;1 xícara de leite..."
                rows={5}
              />
            </div>
            <div className={styles.fullWidth}>
              <AdminTextarea 
                label="Modo de Preparo (Um passo por linha)" 
                {...register('preparationSteps')}
                placeholder="Ex: Misture os secos&#10;Adicione o leite aos poucos..."
                rows={6}
              />
            </div>
          </>
        )}

        <h3 className={styles.sectionTitle}>Mídia e Galeria</h3>
        
        <div className={styles.fullWidth}>
          <AdminInput 
            label="Imagem de Capa (URL)" 
            {...register('imageUrl')}
            error={errors.imageUrl?.message}
            placeholder="https://exemplo.com/imagem-principal.jpg"
          />
        </div>

        <div className={styles.fullWidth}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#1e293b' }}>Opções de Vídeo da Postagem</label>
          <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem' }}>
            <label className={styles.checkboxLabel}>
              <input type="radio" checked={videoMode === 'url'} onChange={() => setVideoMode('url')} />
              Link Externo (YouTube / Vimeo)
            </label>
            <label className={styles.checkboxLabel}>
              <input type="radio" checked={videoMode === 'upload'} onChange={() => setVideoMode('upload')} />
              Fazer Upload de Vídeo Local (.mp4)
            </label>
          </div>

          {videoMode === 'url' ? (
            <AdminInput 
              label="URL do Vídeo (Embed)" 
              {...register('videoUrl')}
              placeholder="Ex: https://www.youtube.com/embed/ABCDEFG"
            />
          ) : (
            <div style={{ marginBottom: '1.5rem' }}>
              <input 
                type="file" 
                id="video-upload"
                accept="video/mp4,video/webm"
                className={styles.hiddenFileInput}
                onChange={handleFileUpload}
              />
              <label htmlFor="video-upload" className={styles.fileUploadZone}>
                <div className={styles.fileUploadContent}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color: '#94a3b8', marginBottom: '8px'}}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                  <span style={{ fontWeight: 600, color: '#0f172a' }}>Clique para selecionar o vídeo local</span>
                  <span style={{ fontSize: '0.85rem', color: '#64748b' }}>MP4 ou WebM (Max 50MB)</span>
                </div>
              </label>
              {videoUrl && videoUrl.startsWith('blob:') && (
                <p style={{ fontSize: '0.9rem', color: '#10b981', marginTop: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                  Vídeo anexado com sucesso!
                </p>
              )}
            </div>
          )}
        </div>

        <div className={styles.fullWidth}>
          <AdminTextarea 
            label="Galeria de Imagens Extras (Uma URL por linha)" 
            value={gallery.join('\n')}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => 
              setGallery(e.target.value.split('\n').filter(url => url.trim() !== ''))
            }
            rows={4}
            placeholder="https://exemplo.com/foto1.jpg"
          />
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
