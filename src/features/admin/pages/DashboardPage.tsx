"use client";

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/features/auth/services/authService';
import { UserRole } from '@/features/auth/types';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './DashboardPage.module.css';

import { jobService } from '@/features/jobs/services/jobService';
import { postService } from '@/features/content-hub/services/postService';
import { productClientService } from '@/features/products/services/productClientService';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Bom dia';
  if (hour < 18) return 'Boa tarde';
  return 'Boa noite';
}

function getFormattedDate() {
  return new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date());
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const [stats, setStats] = useState({
    jobs: 0,
    posts: 0,
    users: 0,
    products: 0
  });

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      router.push('/admin/login');
    } else {
      setUser(currentUser);
      loadStats();
    }
  }, [router]);

  const loadStats = async () => {
    try {
      const [jobs, posts, products, usersRes] = await Promise.all([
        jobService.getJobs(),
        postService.getPosts(),
        productClientService.getProducts(),
        fetch('/api/users').then(r => r.ok ? r.json() : []).catch(() => []),
      ]);
  
      setStats({
        jobs: jobs.filter(j => j.isActive).length,
        posts: posts.length,
        users: Array.isArray(usersRes) ? usersRes.filter((u: any) => u.isActive !== false).length : 0,
        products: products.length
      });
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    } finally {
      setLoading(false);
    }
  };

  useGSAP(() => {
    if (!loading && user) {
      gsap.fromTo('.gsap-card', 
        { y: 30, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out', clearProps: 'all' }
      );
      gsap.fromTo(`.${styles.header}`, 
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );
    }
  }, { dependencies: [loading, user] });

  if (loading || !user) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Acelerando as coisas por aqui...</p>
      </div>
    );
  }

  return (
    <div className={styles.page} ref={containerRef}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>
            {getGreeting()}, <span className={styles.userName}>{user.name}</span>
          </h1>
          <p className={styles.subtitle}>Painel Corporativo Inteligente • AMAM Alimentos</p>
        </div>
        <div className={styles.dateChip}>
          {getFormattedDate()}
        </div>
      </header>

      <div className={styles.bentoGrid}>
        {(user.role === UserRole.ADMIN || user.role === UserRole.MARKETING) && (
          <div className={`${styles.statCard} gsap-card`} onClick={() => router.push('/admin/produtos')}>
            <div className={styles.cardHeader}>
              <div className={`${styles.iconBox} ${styles.orangeIconBox}`}>
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              </div>
              <h3 className={styles.cardTitle}>Catálogo de Produtos</h3>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.statValue}>{stats.products}</div>
              <p className={styles.statLabel}>Produtos cadastrados e disponíveis para vitrine online.</p>
            </div>
          </div>
        )}

        {(user.role === UserRole.ADMIN || user.role === UserRole.HR) && (
          <div className={`${styles.statCard} gsap-card`} onClick={() => router.push('/admin/vagas')}>
            <div className={styles.cardHeader}>
              <div className={styles.iconBox}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
              </div>
              <h3 className={styles.cardTitle}>Recrutamento</h3>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.statValue}>{stats.jobs}</div>
              <p className={styles.statLabel}>Vagas ativas recebendo currículos no portal.</p>
            </div>
          </div>
        )}

        {(user.role === UserRole.ADMIN || user.role === UserRole.MARKETING) && (
          <div className={`${styles.statCard} gsap-card`} onClick={() => router.push('/admin/conteudo')}>
            <div className={styles.cardHeader}>
              <div className={`${styles.iconBox} ${styles.blueIconBox}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              </div>
              <h3 className={styles.cardTitle}>Iniciativas e Conteúdo</h3>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.statValue}>{stats.posts}</div>
              <p className={styles.statLabel}>Total de publicações, incluindo Blog, Receitas e Eventos recentes.</p>
            </div>
          </div>
        )}

        {user.role === UserRole.ADMIN && (
          <div className={`${styles.statCard} gsap-card`} onClick={() => router.push('/admin/usuarios')}>
            <div className={styles.cardHeader}>
              <div className={`${styles.iconBox} ${styles.greenIconBox}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              </div>
              <h3 className={styles.cardTitle}>Time</h3>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.statValue}>{stats.users}</div>
              <p className={styles.statLabel}>Membros administrativos suportando o ecossistema corporativo.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
