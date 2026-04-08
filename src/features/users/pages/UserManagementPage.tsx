"use client";

import { useState, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserRole } from '@/features/auth/types';
import { AdminToggle } from '@/features/admin/components/ui/AdminToggle';
import { AdminButton } from '@/features/admin/components/ui/AdminButton';
import { AdminInput, AdminSelect } from '@/features/admin/components/ui/AdminInput';
import { newUserSchema, NewUserFormValues } from '@/features/admin/schemas/adminSchemas';
import { useToast } from '@/components/atoms/Toast/ToastContext';
import styles from './UserManagement.module.css';

interface UserItem {
  id: string;
  username: string;
  name: string;
  role: UserRole;
  isActive: boolean;
}

export default function UserManagementPage() {
  const { showToast } = useToast();
  const [users, setUsers] = useState<UserItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resetTarget, setResetTarget] = useState<UserItem | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetError, setResetError] = useState('');
  const [resetLoading, setResetLoading] = useState(false);

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<NewUserFormValues>({
    resolver: zodResolver(newUserSchema) as any,
    defaultValues: { name: '', username: '', password: '', role: UserRole.HR },
  });

  useEffect(() => {
    fetch('/api/users')
      .then(r => r.json())
      .then(data => setUsers(data))
      .catch(() => {});
  }, []);

  const handleCreateUser = useCallback(async (data: NewUserFormValues) => {
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const created = await res.json();
        setUsers(prev => [...prev, { ...created, isActive: true }]);
        reset();
        setIsModalOpen(false);
      } else {
        const err = await res.json();
        showToast(err.error || 'Erro ao criar usuário', 'error');
      }
    } catch {
      showToast('Erro ao criar usuário', 'error');
    }
  }, [reset]);

  const toggleUser = useCallback((id: string, currentStatus: boolean) => {
    setUsers(prev => prev.map(u =>
      u.id === id ? { ...u, isActive: !currentStatus } : u
    ));
  }, []);

  const openResetModal = (user: UserItem) => {
    setResetTarget(user);
    setNewPassword('');
    setConfirmPassword('');
    setResetError('');
  };

  const handleResetPassword = async () => {
    if (!resetTarget) return;
    if (newPassword.length < 6) {
      setResetError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setResetError('As senhas não coincidem.');
      return;
    }
    setResetLoading(true);
    setResetError('');
    try {
      const res = await fetch(`/api/users/${resetTarget.id}/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: newPassword }),
      });
      if (res.ok) {
        setResetTarget(null);
        showToast(`Senha de "${resetTarget.name}" redefinida com sucesso!`, 'success');
      } else {
        const err = await res.json();
        setResetError(err.error || 'Erro ao redefinir senha.');
      }
    } catch {
      setResetError('Erro ao redefinir senha.');
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1>Gerenciar Usuários</h1>
          <p className={styles.subtitle}>Gerencie o acesso à área administrativa.</p>
        </div>
        <AdminButton onClick={() => setIsModalOpen(true)}>+ Novo Usuário</AdminButton>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Usuário</th>
              <th>Função</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className={!user.isActive ? styles.inactiveRow : ''}>
                <td style={{ fontWeight: 600 }}>{user.name}</td>
                <td>{user.username}</td>
                <td><span className={styles.roleTag}>{user.role}</span></td>
                <td>
                  <div onClick={(e) => e.stopPropagation()}>
                    <AdminToggle
                      label={user.isActive ? 'Ativo' : 'Inativo'}
                      checked={user.isActive}
                      onChange={() => toggleUser(user.id, user.isActive)}
                      disabled={user.role === UserRole.ADMIN && user.username === 'vellum'}
                    />
                  </div>
                </td>
                <td className={styles.actions}>
                  <AdminButton
                    variant="secondary"
                    className={styles.smBtn}
                    onClick={() => openResetModal(user)}
                  >
                    Resetar Senha
                  </AdminButton>
                  <AdminButton variant="danger" className={styles.smBtn} onClick={() => showToast('Funcionalidade em desenvolvimento', 'info')}>
                    Remover
                  </AdminButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card list */}
      <div className={styles.cardList}>
        {users.map((user) => (
          <div key={user.id} className={`${styles.card} ${!user.isActive ? styles.inactiveCard : ''}`}>
            <div className={styles.cardTop}>
              <div className={styles.cardInfo}>
                <span className={styles.cardName}>{user.name}</span>
                <span className={styles.cardUsername}>@{user.username}</span>
              </div>
              <AdminToggle
                label={user.isActive ? 'Ativo' : 'Inativo'}
                checked={user.isActive}
                onChange={() => toggleUser(user.id, user.isActive)}
                disabled={user.role === UserRole.ADMIN && user.username === 'vellum'}
              />
            </div>
            <div className={styles.cardMeta}>
              <span className={styles.roleTag}>{user.role}</span>
            </div>
            <div className={styles.cardActions}>
              <AdminButton variant="secondary" className={styles.smBtn} onClick={() => openResetModal(user)}>
                Resetar Senha
              </AdminButton>
              <AdminButton variant="danger" className={styles.smBtn} onClick={() => showToast('Funcionalidade em desenvolvimento', 'info')}>
                Remover
              </AdminButton>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Novo Usuário */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2>Novo Usuário</h2>
              <p>Preencha os dados para criar o acesso</p>
            </div>
            <form onSubmit={handleSubmit(handleCreateUser)} className={styles.form} autoComplete="off">
              <AdminInput
                label="Nome Completo"
                {...register('name')}
                error={errors.name?.message}
                autoComplete="off"
                required
              />
              <AdminInput
                label="Usuário (Login)"
                {...register('username')}
                error={errors.username?.message}
                autoComplete="off"
                required
              />
              <AdminInput
                label="Senha"
                type="password"
                {...register('password')}
                error={errors.password?.message}
                autoComplete="new-password"
                required
              />
              <AdminSelect
                label="Função"
                value={watch('role')}
                onChange={(value: string) => setValue('role', value)}
                options={[
                  { label: 'HR (Recursos Humanos)', value: UserRole.HR },
                  { label: 'Marketing', value: UserRole.MARKETING },
                  { label: 'Admin (Acesso Total)', value: UserRole.ADMIN },
                ]}
              />
              <div className={styles.modalActions}>
                <AdminButton type="button" variant="secondary" onClick={() => { reset(); setIsModalOpen(false); }}>Cancelar</AdminButton>
                <AdminButton type="submit">Salvar Usuário</AdminButton>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Resetar Senha */}
      {resetTarget && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2>Resetar Senha</h2>
              <p>{resetTarget.name} · @{resetTarget.username}</p>
            </div>
            <div className={styles.form}>
              <AdminInput
                label="Nova Senha"
                type="password"
                value={newPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
                required
              />
              <AdminInput
                label="Confirmar Nova Senha"
                type="password"
                value={confirmPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                required
              />
              {resetError && (
                <p style={{ color: '#ef4444', fontSize: '0.875rem', margin: 0 }}>{resetError}</p>
              )}
              <div className={styles.modalActions}>
                <AdminButton type="button" variant="secondary" onClick={() => setResetTarget(null)}>
                  Cancelar
                </AdminButton>
                <AdminButton onClick={handleResetPassword} disabled={resetLoading}>
                  {resetLoading ? 'Salvando...' : 'Salvar Nova Senha'}
                </AdminButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
