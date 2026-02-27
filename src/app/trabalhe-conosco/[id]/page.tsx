"use client";

import { useEffect, useState } from 'react';
import { Container } from '@/components/atoms/Container/Container';
import { jobService } from '@/features/jobs/services/jobService';
import { Job } from '@/features/jobs/types/job';
import Link from 'next/link';
import styles from './page.module.css';
import { useParams } from 'next/navigation';

import { ApplicationForm } from './ApplicationForm';

export default function JobDetailsPage() {
  const params = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [isApplying, setIsApplying] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      // Safely access id from params
      const id = params?.id;
      
      if (id) {
        try {
          // Cast to string to ensure type safety
          const jobId = Array.isArray(id) ? id[0] : id;
          
          const data = await jobService.getJobById(jobId);
          setJob(data || null);
        } catch (error) {
          console.error('Error fetching job:', error);
        } finally {
          setLoading(false);
        }
      } else {
         setLoading(false);
      }
    };

    fetchJob();
  }, [params]);

  const handleSuccess = () => {
    setIsApplying(false);
    setShowSuccess(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <Container>
          <p style={{ padding: '4rem', textAlign: 'center' }}>Carregando vaga...</p>
        </Container>
      </div>
    );
  }

  if (!job) {
    return (
      <div className={styles.page}>
        <Container>
          <div style={{ padding: '4rem', textAlign: 'center' }}>
            <h2>Vaga não encontrada</h2>
            <Link href="/trabalhe-conosco" style={{ color: 'var(--color-primary)', marginTop: '1rem', display: 'inline-block' }}>
              Voltar para lista de vagas
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      
      <div className={styles.header}>
        <Container>
          <div className={styles.headerContent}>
            <Link href="/trabalhe-conosco" className={styles.backLink}>
              ← Voltar para Vagas
            </Link>
            <h1 className={styles.title}>{job.title}</h1>
            <div className={styles.meta}>
              <div className={styles.metaItem}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                {job.location}
              </div>
              <div className={styles.metaItem}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
                {job.area}
              </div>
              <div className={styles.metaItem}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                Postada em {new Date(job.createdAt).toLocaleDateString('pt-BR')}
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <div className={styles.content}>
          <div className={styles.card}>
            
            {showSuccess ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <div style={{ width: 80, height: 80, background: '#4CAF50', borderRadius: '50%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <h2 style={{ color: '#4CAF50', marginBottom: '1rem' }}>Candidatura Enviada!</h2>
                <p>Seu currículo foi recebido com sucesso. Boa sorte!</p>
                <button 
                  onClick={() => setShowSuccess(false)}
                  style={{ marginTop: '2rem', padding: '0.8rem 2rem', border: '1px solid #ddd', background: 'white', borderRadius: '8px', cursor: 'pointer' }}
                >
                  Voltar para detalhes da vaga
                </button>
              </div>
            ) : (
              <>
                <div className={styles.section}>
                  <h2>Descrição da Vaga</h2>
                  <p>{job.description}</p>
                </div>

                {job.requirements && job.requirements.length > 0 && (
                  <div className={styles.section}>
                    <h2>Requisitos</h2>
                    <ul className={styles.requirementsList}>
                      {job.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {!isApplying ? (
                  <button className={styles.applyButton} onClick={() => setIsApplying(true)}>
                    Candidatar-se para esta vaga
                  </button>
                ) : (
                  <ApplicationForm 
                    jobId={job.id} 
                    onSuccess={handleSuccess} 
                    onCancel={() => setIsApplying(false)} 
                  />
                )}
              </>
            )}

          </div>
        </div>
      </Container>
    </div>
  );
}
