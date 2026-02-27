"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { authService } from '@/features/auth/services/authService';
import { User, UserRole } from '@/features/auth/types';
import { useEffect, useState } from 'react';
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
        <div className={styles.logo}>Amam Admin</div>
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

      <button onClick={handleLogout} className={styles.logoutButton}>
        Sair
      </button>
    </aside>
  );
}
