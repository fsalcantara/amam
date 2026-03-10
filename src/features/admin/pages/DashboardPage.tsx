"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/features/auth/services/authService';
import { UserRole } from '@/features/auth/types';
import styles from './DashboardPage.module.css';

import { jobService } from '@/features/jobs/services/jobService';
import { postService } from '@/features/content-hub/services/postService';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(authService.getCurrentUser());
  const [stats, setStats] = useState({
    jobs: 0,
    posts: 0,
    users: 0
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
    const [jobs, posts, users] = await Promise.all([
      jobService.getJobs(),
      postService.getPosts(),
      authService.getMockUsers()
    ]);

    setStats({
      jobs: jobs.filter(j => j.isActive).length,
      posts: posts.length,
      users: users.filter(u => u.isActive).length
    });
  };

  if (!user) return <div className={styles.loading}>Carregando...</div>;

  return (
    <div className={styles.page}>
      <h1>Bem-vindo, {user.name}</h1>
      <p className={styles.subtitle}>Painel Administrativo - AMAM Alimentos</p>

      <div className={styles.statsGrid}>
        {(user.role === UserRole.ADMIN || user.role === UserRole.HR) && (
          <div className={styles.statCard} onClick={() => router.push('/admin/vagas')}>
            <div className={styles.cardHeader}>
              <div className={styles.iconBox}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
              </div>
              <h3 className={styles.cardTitle}>Vagas e Oportunidades</h3>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.statValue}>{stats.jobs}</div>
              <p className={styles.statLabel}>Vagas ativas no portal</p>
            </div>
            <div className={styles.cardAction}>
              <p className={styles.linkText}>Recrutamento e Gestão →</p>
            </div>
          </div>
        )}

        {(user.role === UserRole.ADMIN || user.role === UserRole.MARKETING) && (
          <div className={styles.statCard} onClick={() => router.push('/admin/conteudo')}>
            <div className={styles.cardHeader}>
              <div className={`${styles.iconBox} ${styles.blueIconBox}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              </div>
              <h3 className={styles.cardTitle}>Acontecendo na Amam</h3>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.statValue}>{stats.posts}</div>
              <p className={styles.statLabel}>Artigos e Eventos</p>
            </div>
             <div className={styles.cardAction}>
              <p className={styles.linkText}>Central de Notícias →</p>
            </div>
          </div>
        )}

        {user.role === UserRole.ADMIN && (
          <div className={styles.statCard} onClick={() => router.push('/admin/usuarios')}>
            <div className={styles.cardHeader}>
              <div className={`${styles.iconBox} ${styles.greenIconBox}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              </div>
              <h3 className={styles.cardTitle}>Acesso Administrativo</h3>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.statValue}>{stats.users}</div>
              <p className={styles.statLabel}>Membros da Equipe</p>
            </div>
             <div className={styles.cardAction}>
              <p className={styles.linkText}>Controle de Usuários →</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
