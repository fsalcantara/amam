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
            <div className={styles.cardContent}>
              <h3>Vagas</h3>
              <div className={styles.statValue}>{stats.jobs}</div>
              <p className={styles.linkText}>Gerenciar Vagas →</p>
            </div>
          </div>
        )}

        {(user.role === UserRole.ADMIN || user.role === UserRole.MARKETING) && (
          <div className={styles.statCard} onClick={() => router.push('/admin/conteudo')}>
            <div className={styles.cardContent}>
              <h3>O que acontece na vellum</h3>
              <div className={styles.statValue}>{stats.posts}</div>
              <p className={styles.linkText}>Gerenciar Conteúdo →</p>
            </div>
          </div>
        )}

        {user.role === UserRole.ADMIN && (
          <div className={styles.statCard} onClick={() => router.push('/admin/usuarios')}>
            <div className={styles.cardContent}>
              <h3>Usuários</h3>
              <div className={styles.statValue}>{stats.users}</div>
              <p className={styles.linkText}>Gerenciar Acessos →</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
