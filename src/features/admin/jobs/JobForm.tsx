"use client";

import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Job, JOB_AREAS, ScreeningQuestion } from '@/features/jobs/types/job';
import { AdminInput, AdminSelect, AdminTextarea } from '@/features/admin/components/ui/AdminInput';
import { AdminButton } from '@/features/admin/components/ui/AdminButton';
import { AdminToggle } from '@/features/admin/components/ui/AdminToggle';
import { QuestionnaireEditor } from './QuestionnaireEditor';
import { jobSchema, JobFormValues } from '@/features/admin/schemas/adminSchemas';
import styles from './JobForm.module.css';

interface JobFormProps {
  initialData?: Job | null;
  onSubmit: (data: Partial<Job>) => Promise<void>;
  onCancel: () => void;
}

export function JobForm({ initialData, onSubmit, onCancel }: JobFormProps) {
  const [loading, setLoading] = useState(false);
  const [showQuestions, setShowQuestions] = useState(
    !!initialData?.screeningQuestions?.length
  );
  const [screeningQuestions, setScreeningQuestions] = useState<ScreeningQuestion[]>(
    initialData?.screeningQuestions || []
  );
  const [isActive, setIsActive] = useState(initialData?.isActive ?? true);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema) as any,
    defaultValues: {
      title: initialData?.title || '',
      area: initialData?.area || 'admin',
      location: initialData?.location || '',
      description: initialData?.description || '',
      requirements: Array.isArray(initialData?.requirements)
        ? initialData.requirements.join('\n')
        : '',
      isActive: initialData?.isActive ?? true,
    }
  });

  const requirementsValue = watch('requirements');

  const onFormSubmit = useCallback(async (data: JobFormValues) => {
    setLoading(true);
    try {
      await onSubmit({
        ...data,
        area: data.area as Job['area'],
        requirements: data.requirements.split('\n').filter(r => r.trim()),
        isActive,
        screeningQuestions,
      });
    } finally {
      setLoading(false);
    }
  }, [onSubmit, isActive, screeningQuestions]);

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className={styles.form}>
      <div className={styles.header}>
        <h2>{initialData ? 'Editar Vaga' : 'Nova Vaga'}</h2>
      </div>

      <div className={styles.grid}>
        <AdminInput 
          label="Cargo / Título" 
          {...register('title')}
          error={errors.title?.message}
          required
        />
        
        <AdminSelect 
          label="Área"
          value={watch('area') || 'admin'}
          onChange={(value: string) => setValue('area', value)}
          options={JOB_AREAS.map(a => ({ label: a.label, value: a.id }))}
          error={errors.area?.message}
          required
        />
        
        <AdminInput 
          label="Localização" 
          {...register('location')}
          error={errors.location?.message}
          required
        />

        <div className={styles.fullWidth}>
          <AdminTextarea 
            label="Descrição" 
            {...register('description')}
            error={errors.description?.message}
            required
            rows={4}
          />
        </div>

        <div className={styles.fullWidth}>
          <AdminTextarea 
            label="Requisitos (um por linha)" 
            {...register('requirements')}
            error={errors.requirements?.message}
            rows={4}
          />
        </div>

        <div className={styles.actions}>
          <AdminToggle 
            label={isActive ? 'Vaga Ativa - Visível no site' : 'Vaga Inativa - Oculta no site'}
            checked={isActive}
            onChange={setIsActive}
          />
        </div>

        {/* Questionnaire Section */}
        <div className={styles.fullWidth}>
          <div className={styles.sectionDivider}>
            <button 
              type="button" 
              className={styles.toggleSection}
              onClick={() => setShowQuestions(!showQuestions)}
            >
              {showQuestions ? '▼' : '▶'} Perguntas de Triagem (Opcional)
              {screeningQuestions.length > 0 && (
                <span className={styles.questionCount}>
                  {screeningQuestions.length} pergunta(s)
                </span>
              )}
            </button>
          </div>

          {showQuestions && (
            <QuestionnaireEditor
              questions={screeningQuestions}
              onChange={setScreeningQuestions}
              jobTitle={watch('title')}
              jobArea={watch('area')}
              jobDescription={watch('description')}
            />
          )}
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
