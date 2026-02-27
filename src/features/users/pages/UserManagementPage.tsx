"use client";

import { useState } from 'react';
import { UserRole } from '@/features/auth/types';
import { AdminToggle } from '@/features/admin/components/ui/AdminToggle';
import { AdminButton } from '@/features/admin/components/ui/AdminButton';
import { AdminInput, AdminSelect } from '@/features/admin/components/ui/AdminInput';
import styles from './UserManagement.module.css';

// Mock list for display - should ideally come from authService
const INITIAL_USERS = [
  { id: '1', username: 'vellum', name: 'Admin Vellum', role: UserRole.ADMIN, isActive: true },
  { id: '2', username: 'rh', name: 'Recursos Humanos', role: UserRole.HR, isActive: true },
  { id: '3', username: 'marketing', name: 'Marketing Team', role: UserRole.MARKETING, isActive: true },
];

export default function UserManagementPage() {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [newUser, setNewUser] = useState({ name: '', username: '', password: '', role: UserRole.HR });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    const createdUser = {
      id: Math.random().toString(36).substr(2, 9),
      username: newUser.username,
      name: newUser.name,
      role: newUser.role,
      isActive: true
    };
    
    setUsers([...users, createdUser]);
    setNewUser({ name: '', username: '', password: '', role: UserRole.HR });
    setIsModalOpen(false);
    alert('Usuário criado com sucesso! (Mock)');
  };

  const toggleUser = (id: string, currentStatus: boolean) => {
    setUsers(users.map(u => 
      u.id === id ? { ...u, isActive: !currentStatus } : u
    ));
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
            <form onSubmit={handleCreateUser} className={styles.form}>
              <AdminInput 
                label="Nome Completo"
                value={newUser.name}
                onChange={e => setNewUser({...newUser, name: e.target.value})}
                required 
              />
              
              <AdminInput 
                label="Usuário (Login)"
                value={newUser.username}
                onChange={e => setNewUser({...newUser, username: e.target.value})}
                required 
              />

              <AdminInput 
                label="Senha"
                type="password"
                value={newUser.password}
                onChange={e => setNewUser({...newUser, password: e.target.value})}
                required 
              />

              <AdminSelect
                label="Função"
                value={newUser.role}
                onChange={(value: string) => setNewUser({...newUser, role: value as UserRole})}
                options={[
                  { label: 'HR (Recursos Humanos)', value: UserRole.HR },
                  { label: 'Marketing', value: UserRole.MARKETING },
                  { label: 'Admin (Acesso Total)', value: UserRole.ADMIN },
                ]}
              />

              <div className={styles.modalActions}>
                <AdminButton type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>Cancelar</AdminButton>
                <AdminButton type="submit">Salvar Usuário</AdminButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
