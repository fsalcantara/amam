"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { authService } from '@/features/auth/services/authService';
import { User, UserRole } from '@/features/auth/types';
import styles from './AdminSidebar.module.css';

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check auth on mount
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      router.push('/admin/login');
    } else {
      setUser(currentUser);
    }
  }, [router]);

  if (!mounted || !user) return null;

  const handleLogout = () => {
    authService.logout();
    router.push('/admin/login');
  };

  if (!user) return null;

  const menuItems = [
    {
      label: 'Dashboard',
      href: '/admin',
      roles: [UserRole.ADMIN],
    },
    {
      label: 'Vagas',
      href: '/admin/vagas',
      roles: [UserRole.ADMIN, UserRole.HR],
    },
    {
      label: 'O que acontece na Amam',
      href: '/admin/conteudo',
      roles: [UserRole.ADMIN, UserRole.MARKETING],
    },
    {
      label: 'Usuários',
      href: '/admin/usuarios',
      roles: [UserRole.ADMIN],
    },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <div className={styles.logoContainer}>
          <Image 
            src="/SITE/LOGO/logo-white.png" 
            alt="Amam Alimentos" 
            className={styles.logoImage}
            width={220}
            height={90}
            priority
          />
          <h2 className={styles.logoSubtitle}>Painel Administrativo</h2>
        </div>
        <div className={styles.userInfo}>
          {user.name} <br/>
          <span className={styles.userRole}>{user.role}</span>
        </div>
      </div>

      <nav className={styles.nav}>
        {menuItems.map((item) => {
          if (!authService.hasPermission(user, item.roles)) return null;

          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`${styles.navItem} ${isActive ? styles.active : ''}`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className={styles.footerActions}>
        <Link href="/" className={styles.backToSiteButton}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          Voltar para o Site
        </Link>
        <button onClick={handleLogout} className={styles.logoutButton}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          Sair do Sistema
        </button>
      </div>
    </aside>
  );
}
