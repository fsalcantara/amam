import { User, UserRole } from '../types';

const STORAGE_KEY = 'amam_auth_user';

export const authService = {
  login: async (username: string, password: string): Promise<User | null> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (!res.ok) return null;

      const user = await res.json();
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      }
      return user;
    } catch (error) {
      console.error('Login error:', error);
      return null;
    }
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  },

  getCurrentUser: (): User | null => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    }
    return null;
  },

  hasPermission: (user: User | null, requiredRole: UserRole | UserRole[]): boolean => {
    if (!user) return false;
    if (user.role === UserRole.ADMIN) return true;
    
    if (Array.isArray(requiredRole)) {
      return requiredRole.includes(user.role);
    }
    return user.role === requiredRole;
  },

  getMockUsers: async (): Promise<User[]> => {
    // Para simplificar, retornamos vazio. 
    // Em uma implementação completa, criaríamos /api/users
    return [];
  },

  toggleUserStatus: async (userId: string,  isActive: boolean): Promise<void> => {
    // Implementar via API no futuro
  }
};
