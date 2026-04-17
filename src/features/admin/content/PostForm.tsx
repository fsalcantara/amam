"use client";

import { useState, useEffect, useCallback } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
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
  const [coverImageMode, setCoverImageMode] = useState<'url' | 'upload'>(
    initialData?.coverImage?.startsWith('data:') ? 'upload' : 'url'
  );
  const [coverImageBase64, setCoverImageBase64] = useState<string>(
    initialData?.coverImage?.startsWith('data:') ? initialData.coverImage : ''
  );

  const { register, control, handleSubmit, watch, setValue, formState: { errors } } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: initialData?.title || '',
      excerpt: initialData?.excerpt || '',
      type: initialData?.type || 'blog',
      date: initialData?.date ? new Date(initialData.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      imageUrl: initialData?.coverImage || '',
      videoUrl: initialData?.videoUrl || '',
      content: initialData?.content || '',
      ingredients: initialData?.ingredients || [],
      preparationSteps: initialData?.preparationSteps?.map(i => ({ value: i })) || [],
    }
  });

  const { fields: ingredientFields, append: appendIngredient, remove: removeIngredient } = useFieldArray({
    control,
    name: "ingredients"
  });

  const { fields: stepFields, append: appendStep, remove: removeStep } = useFieldArray({
    control,
    name: "preparationSteps"
  });

  const formType = watch('type');

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoUrl(URL.createObjectURL(file));
    }
  }, []);

  const handleCoverImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert('A imagem deve ter no máximo 2MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setCoverImageBase64(reader.result as string);
    reader.readAsDataURL(file);
  }, []);

  const onFormSubmit = useCallback(async (data: PostFormValues) => {
    setLoading(true);
    try {
      await onSubmit({
        ...data,
        type: data.type as Post['type'],
        coverImage: coverImageMode === 'upload' ? coverImageBase64 : data.imageUrl,
        videoUrl: videoMode === 'upload' ? videoUrl : data.videoUrl,
        gallery,
        isFeatured: false,
        ingredients: data.ingredients ? data.ingredients.filter(v => v.measure.trim() || v.name.trim()) : undefined,
        preparationSteps: data.preparationSteps ? data.preparationSteps.map(s => s.value).filter(v => v.trim()) : undefined,
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
              <label className={styles.listLabel}>Ingredientes</label>
              <div className={styles.dynamicList}>
                {ingredientFields.map((field, index) => (
                  <div key={field.id} className={styles.dynamicItem}>
                    <div className={styles.dynamicInputWrapper} style={{ display: 'flex', gap: '0.5rem' }}>
                      <input 
                        className={styles.dynamicInput}
                        style={{ width: '120px', flexShrink: 0 }}
                        {...register(`ingredients.${index}.measure` as const)}
                        placeholder="Ex: 500g"
                      />
                      <input 
                        className={styles.dynamicInput}
                        {...register(`ingredients.${index}.name` as const)}
                        placeholder="Ex: farinha de trigo..."
                      />
                    </div>
                    <button 
                      type="button" 
                      onClick={() => removeIngredient(index)}
                      className={styles.removeButton}
                      title="Remover ingrediente"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                  </div>
                ))}
              </div>
              <button 
                type="button" 
                onClick={() => appendIngredient({ measure: '', name: '' })}
                className={styles.addButton}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                Adicionar Ingrediente
              </button>
            </div>

            <div className={styles.fullWidth} style={{ marginTop: '1.5rem' }}>
              <label className={styles.listLabel}>Modo de Preparo</label>
              <div className={styles.dynamicList}>
                {stepFields.map((field, index) => (
                  <div key={field.id} className={styles.dynamicItem}>
                    <div className={styles.stepNumberBadge}>{index + 1}</div>
                    <div className={styles.dynamicInputWrapper}>
                      <textarea 
                        className={`${styles.dynamicInput} ${styles.dynamicTextarea}`}
                        {...register(`preparationSteps.${index}.value` as const)}
                        placeholder="Ex: Misture os ingredientes secos..."
                        rows={2}
                      />
                    </div>
                    <button 
                      type="button" 
                      onClick={() => removeStep(index)}
                      className={styles.removeButton}
                      title="Remover passo"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                  </div>
                ))}
              </div>
              <button 
                type="button" 
                onClick={() => appendStep({ value: '' })}
                className={styles.addButton}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                Adicionar Passo
              </button>
            </div>
          </>
        )}

        <h3 className={styles.sectionTitle}>Mídia e Galeria</h3>
        
        <div className={styles.fullWidth}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#1e293b' }}>Imagem de Capa</label>
          <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem' }}>
            <label className={styles.checkboxLabel}>
              <input type="radio" checked={coverImageMode === 'url'} onChange={() => setCoverImageMode('url')} />
              Link Externo (URL)
            </label>
            <label className={styles.checkboxLabel}>
              <input type="radio" checked={coverImageMode === 'upload'} onChange={() => setCoverImageMode('upload')} />
              Fazer Upload de Imagem
            </label>
          </div>

          {coverImageMode === 'url' ? (
            <AdminInput
              label="URL da imagem"
              {...register('imageUrl')}
              error={errors.imageUrl?.message}
              placeholder="https://exemplo.com/imagem-principal.jpg"
            />
          ) : (
            <div>
              <input
                type="file"
                id="cover-image-upload"
                accept="image/*"
                className={styles.hiddenFileInput}
                onChange={handleCoverImageUpload}
              />
              <label htmlFor="cover-image-upload" className={styles.fileUploadZone}>
                <div className={styles.fileUploadContent}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#94a3b8', marginBottom: '8px' }}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                  <span style={{ fontWeight: 600, color: '#0f172a' }}>Clique para selecionar a imagem</span>
                  <span style={{ fontSize: '0.85rem', color: '#64748b' }}>JPG, PNG, WebP (Max 2MB)</span>
                </div>
              </label>
              {coverImageBase64 && (
                <div style={{ marginTop: '0.75rem', position: 'relative', display: 'inline-block' }}>
                  <img src={coverImageBase64} alt="Preview" style={{ maxHeight: '160px', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                  <button
                    type="button"
                    onClick={() => setCoverImageBase64('')}
                    style={{ position: 'absolute', top: '-8px', right: '-8px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer', fontSize: '14px', lineHeight: 1 }}
                  >×</button>
                </div>
              )}
            </div>
          )}
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
          <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 600, color: '#1e293b' }}>Galeria de Imagens</label>
          <input
            type="file"
            id="gallery-upload"
            accept="image/*"
            multiple
            className={styles.hiddenFileInput}
            onChange={(e) => {
              const files = Array.from(e.target.files || []);
              files.forEach(file => {
                if (file.size > 2 * 1024 * 1024) { alert(`"${file.name}" excede 2MB e foi ignorada.`); return; }
                const reader = new FileReader();
                reader.onload = () => setGallery(prev => [...prev, reader.result as string]);
                reader.readAsDataURL(file);
              });
              e.target.value = '';
            }}
          />
          <label htmlFor="gallery-upload" className={styles.fileUploadZone} style={{ marginBottom: '1rem' }}>
            <div className={styles.fileUploadContent}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#94a3b8', marginBottom: '6px' }}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
              <span style={{ fontWeight: 600, color: '#0f172a' }}>Adicionar imagens à galeria</span>
              <span style={{ fontSize: '0.82rem', color: '#64748b' }}>JPG, PNG, WebP — múltiplas (Max 2MB cada)</span>
            </div>
          </label>
          {gallery.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {gallery.map((img, idx) => (
                <div key={idx} style={{ position: 'relative', display: 'inline-block' }}>
                  <img src={img} alt={`Galeria ${idx + 1}`} style={{ width: '90px', height: '70px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                  <button
                    type="button"
                    onClick={() => setGallery(prev => prev.filter((_, i) => i !== idx))}
                    style={{ position: 'absolute', top: '-8px', right: '-8px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '50%', width: '22px', height: '22px', cursor: 'pointer', fontSize: '13px', lineHeight: 1 }}
                  >×</button>
                </div>
              ))}
            </div>
          )}
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
