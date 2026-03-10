"use client";

import { useEffect, useState, useRef } from 'react';
import { Container } from '@/components/atoms/Container/Container';
import { jobService } from '@/features/jobs/services/jobService';
import { Job } from '@/features/jobs/types/job';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './page.module.css';
import { useParams } from 'next/navigation';

import { ApplicationForm } from './ApplicationForm';

export default function JobDetailsPage() {
  const params = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [isApplying, setIsApplying] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const container = useRef<HTMLDivElement>(null);

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

  useGSAP(() => {
    if (!loading && job && !isApplying && !showSuccess) {
      const tl = gsap.timeline();
      
      tl.fromTo('.gsap-title', 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      )
      .fromTo('.gsap-badge', 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo('.gsap-card', 
        { y: 40, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo('.gsap-section', 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo('.gsap-req-item', 
        { x: -15, opacity: 0 }, 
        { x: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power2.out' },
        '-=0.2'
      );
    }
  }, { scope: container, dependencies: [loading, job, isApplying, showSuccess] });

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
    <div className={styles.page} ref={container}>
      
      <div className={styles.header}>
        <Container>
          <div className={styles.headerContent}>
            <Link href="/trabalhe-conosco" className={styles.backLink}>
              ← Voltar para Vagas
            </Link>
            <h1 className={`${styles.title} gsap-title`}>{job.title}</h1>
            <div className={styles.meta}>
              <div className={`${styles.metaItem} gsap-badge`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                {job.location}
              </div>
              <div className={`${styles.metaItem} gsap-badge`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                Recrutador do AMAM
              </div>
              <div className={`${styles.metaItem} gsap-badge`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
          <div className={`${styles.card} gsap-card`}>
            
            {showSuccess ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <div style={{ width: 80, height: 80, background: '#4CAF50', borderRadius: '50%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)' }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <h2 style={{ color: '#4CAF50', marginBottom: '1rem', fontSize: '2rem' }}>Candidatura Completa!</h2>
                <p style={{ color: '#4b5563', fontSize: '1.1rem' }}>Seus dados e respostas foram recebidos com sucesso. Boa sorte no processo seletivo!</p>
                <button 
                  onClick={() => setShowSuccess(false)}
                  style={{ marginTop: '2.5rem', padding: '1rem 2.5rem', border: 'none', background: '#f1f5f9', color: '#1e293b', borderRadius: '50px', cursor: 'pointer', fontWeight: 600, fontSize: '1.05rem', transition: 'all 0.2s' }}
                  onMouseOver={(e) => e.currentTarget.style.background = '#e2e8f0'}
                  onMouseOut={(e) => e.currentTarget.style.background = '#f1f5f9'}
                >
                  Voltar para detalhes da vaga
                </button>
              </div>
            ) : (
              <>
                <div className={`${styles.section} gsap-section`}>
                  <h2>Descrição da Vaga</h2>
                  <p>{job.description}</p>
                </div>

                {job.requirements && job.requirements.length > 0 && (
                  <div className={`${styles.section} gsap-section`}>
                    <h2>Requisitos</h2>
                    <ul className={styles.requirementsList}>
                      {job.requirements.map((req, index) => (
                        <li key={index} className="gsap-req-item">{req}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {!isApplying ? (
                  <button className={`${styles.applyButton} gsap-section`} onClick={() => setIsApplying(true)}>
                    Candidatar-se para esta vaga
                  </button>
                ) : (
                  <ApplicationForm 
                    jobId={job.id} 
                    screeningQuestions={job.screeningQuestions}
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
