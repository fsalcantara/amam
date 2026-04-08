"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authService } from '@/features/auth/services/authService';
import { Container } from '@/components/atoms/Container/Container';
import styles from './LoginPage.module.css';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const user = await authService.login(username, password);
      if (user) {
        router.push(user.forcePasswordReset ? '/admin/reset-senha' : '/admin');
      } else {
        setError('Usuário ou senha inválidos');
      }
    } catch (err) {
      setError('Ocorreu um erro ao tentar fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.splitLayout}>
        {/* Left Side: Visual/Branding */}
        <div className={styles.visualSide}>
          <div className={styles.particlesContainer}>
            <div className={`${styles.particle} ${styles.p1}`}></div>
            <div className={`${styles.particle} ${styles.p2}`}></div>
            <div className={`${styles.particle} ${styles.p3}`}></div>
            <div className={`${styles.particle} ${styles.p4}`}></div>
            <div className={`${styles.particle} ${styles.p5}`}></div>
          </div>
          <div className={styles.visualContent}>
            <img 
              src="/SITE/LOGO/logo-white.png" 
              alt="Logo Amam Alimentos" 
              className={styles.heroLogo}
            />
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className={styles.formSide}>
          <div className={styles.loginContainer}>
            <div className={styles.formHeader}>
              <img 
                src="/SITE/LOGO/logo-color.png" 
                alt="Amam Alimentos" 
                className={styles.mobileLogo}
              />
              <h1>Painel de Gestão</h1>
              <p>Insira suas credenciais para acessar</p>
            </div>

            <form onSubmit={handleLogin} className={styles.form}>
              <div className={styles.inputGroup}>
                <label htmlFor="username">Usuário Corporativo</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Seu usuário"
                  required
                />
              </div>
              
              <div className={styles.inputGroup}>
                <label htmlFor="password">Senha de Acesso</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Sua senha"
                  required
                />
              </div>

              {error && (
                <div className={styles.errorAlert}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                  <span>{error}</span>
                </div>
              )}

              <button type="submit" className={styles.button} disabled={loading}>
                {loading ? (
                  <span className={styles.loadingState}>
                    <svg className={styles.spinner} viewBox="0 0 50 50">
                      <circle className={styles.path} cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
                    </svg>
                    Autenticando...
                  </span>
                ) : (
                  'Acessar Sistema'
                )}
              </button>
            </form>
            
            <div className={styles.formFooter}>
              <Link href="/" className={styles.backLink}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                Voltar para o site
              </Link>
              <p>Amam Alimentos &copy; {new Date().getFullYear()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
