"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/features/auth/services/authService';
import styles from './ResetSenha.module.css';

export default function ResetSenhaPage() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (!user) {
      router.push('/admin/login');
      return;
    }
    if (!user.forcePasswordReset) {
      router.push('/admin');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (newPassword.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    setLoading(true);
    try {
      const user = authService.getCurrentUser();
      const res = await fetch('/api/users/me/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user?.id, password: newPassword }),
      });

      if (res.ok && user) {
        // Update local session to clear forcePasswordReset
        const updated = { ...user, forcePasswordReset: false };
        localStorage.setItem('amam_auth_user', JSON.stringify(updated));
        router.push('/admin');
      } else {
        const err = await res.json();
        setError(err.error || 'Erro ao redefinir senha.');
      }
    } catch {
      setError('Erro ao redefinir senha.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.icon}>🔒</div>
        <h1 className={styles.title}>Defina sua senha</h1>
        <p className={styles.subtitle}>
          Este é seu primeiro acesso. Por segurança, crie uma senha pessoal para continuar.
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>Nova Senha</label>
            <input
              type="password"
              className={styles.input}
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Confirmar Nova Senha</label>
            <input
              type="password"
              className={styles.input}
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="Repita a senha"
              required
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? 'Salvando...' : 'Definir Senha e Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}
