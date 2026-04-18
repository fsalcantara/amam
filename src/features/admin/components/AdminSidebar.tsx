"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { authService } from '@/features/auth/services/authService';
import { User, UserRole } from '@/features/auth/types';
import styles from './AdminSidebar.module.css';

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function AdminSidebar({ isOpen = false, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      router.push('/admin/login');
    } else {
      setUser(currentUser);
    }
  }, [router]);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    onClose?.();
  }, [pathname]);

  if (!mounted || !user) return null;

  const handleLogout = () => {
    authService.logout();
    router.push('/admin/login');
  };

  const menuItems = [
    { label: 'Dashboard', href: '/admin', roles: [UserRole.ADMIN] },
    { label: 'Vagas', href: '/admin/vagas', roles: [UserRole.ADMIN, UserRole.HR] },
    { label: 'Conteúdo', href: '/admin/conteudo', roles: [UserRole.ADMIN, UserRole.MARKETING] },
    { label: 'Produtos', href: '/admin/produtos', roles: [UserRole.ADMIN] },
    { label: 'Usuários', href: '/admin/usuarios', roles: [UserRole.ADMIN] },
  ];

  return (
    <>
      {/* Overlay — mobile only */}
      {isOpen && (
        <div className={styles.overlay} onClick={onClose} />
      )}

      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <div className={styles.headerTop}>
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
            <button
              className={styles.closeBtn}
              onClick={onClose}
              aria-label="Fechar menu"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <div className={styles.userInfo}>
            {user.name} <br />
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
    </>
  );
}
