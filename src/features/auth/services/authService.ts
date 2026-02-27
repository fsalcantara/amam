import { User, UserRole } from '../types';

// Mock users database
const MOCK_USERS: User[] = [
  { id: '1', username: 'vellum', name: 'Admin Vellum', role: UserRole.ADMIN, isActive: true },
  { id: '2', username: 'rh', name: 'Recursos Humanos', role: UserRole.HR, isActive: true },
  { id: '3', username: 'marketing', name: 'Marketing Team', role: UserRole.MARKETING, isActive: true },
];

const CREDENTIALS: Record<string, string> = {
  'vellum': 'Bibi2411*',
  'rh': 'rh',
  'marketing': 'marketing',
};

const STORAGE_KEY = 'amam_auth_user';

export const authService = {
  login: async (username: string, password: string): Promise<User | null> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (CREDENTIALS[username] === password) {
      const user = MOCK_USERS.find(u => u.username === username);
      if (user) {
        if (typeof window !== 'undefined') {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        }
        return user;
      }
    }
    return null;
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  },

  getCurrentUser: (): User | null => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    }
    return null;
  },

  hasPermission: (user: User | null, requiredRole: UserRole | UserRole[]): boolean => {
    if (!user) return false;
    if (user.role === UserRole.ADMIN) return true; // Admin has access to everything
    
    if (Array.isArray(requiredRole)) {
      return requiredRole.includes(user.role);
    }
    return user.role === requiredRole;
  },

  getMockUsers: async (): Promise<User[]> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...MOCK_USERS];
  },

  toggleUserStatus: async (userId: string,  isActive: boolean): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const user = MOCK_USERS.find(u => u.id === userId);
    if (user) {
      user.isActive = isActive;
    }
  }
};
