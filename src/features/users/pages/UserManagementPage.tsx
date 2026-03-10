"use client";

import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserRole } from '@/features/auth/types';
import { AdminToggle } from '@/features/admin/components/ui/AdminToggle';
import { AdminButton } from '@/features/admin/components/ui/AdminButton';
import { AdminInput, AdminSelect } from '@/features/admin/components/ui/AdminInput';
import { newUserSchema, NewUserFormValues } from '@/features/admin/schemas/adminSchemas';
import styles from './UserManagement.module.css';

// Mock list for display - should ideally come from authService
const INITIAL_USERS = [
  { id: '1', username: 'vellum', name: 'Admin Vellum', role: UserRole.ADMIN, isActive: true },
  { id: '2', username: 'rh', name: 'Recursos Humanos', role: UserRole.HR, isActive: true },
  { id: '3', username: 'marketing', name: 'Marketing Team', role: UserRole.MARKETING, isActive: true },
];

export default function UserManagementPage() {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<NewUserFormValues>({
    resolver: zodResolver(newUserSchema) as any,
    defaultValues: { name: '', username: '', password: '', role: UserRole.HR },
  });

  const handleCreateUser = useCallback((data: NewUserFormValues) => {
    const createdUser = {
      id: Math.random().toString(36).substr(2, 9),
      username: data.username,
      name: data.name,
      role: data.role as UserRole,
      isActive: true
    };
    setUsers(prev => [...prev, createdUser]);
    reset();
    setIsModalOpen(false);
    alert('Usuário criado com sucesso! (Mock)');
  }, [reset]);

  const toggleUser = useCallback((id: string, currentStatus: boolean) => {
    setUsers(prev => prev.map(u => 
      u.id === id ? { ...u, isActive: !currentStatus } : u
    ));
  }, []);

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
                      disabled={user.role === UserRole.ADMIN && user.username === 'vellum'} // Prevent deactivating main admin
                    />
                  </div>
                </td>
                <td className={styles.actions}>
                  <AdminButton variant="danger" className={styles.smBtn} onClick={() => alert('Mock Remove')}>
                    Remover
                  </AdminButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2>Novo Usuário</h2>
            </div>
            <form onSubmit={handleSubmit(handleCreateUser)} className={styles.form}>
              <AdminInput 
                label="Nome Completo"
                {...register('name')}
                error={errors.name?.message}
                required 
              />
              
              <AdminInput 
                label="Usuário (Login)"
                {...register('username')}
                error={errors.username?.message}
                required 
              />

              <AdminInput 
                label="Senha"
                type="password"
                {...register('password')}
                error={errors.password?.message}
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
    </div>
  );
}
