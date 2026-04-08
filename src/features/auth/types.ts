export enum UserRole {
  ADMIN = 'ADMIN', // Vellum - Full Access
  HR = 'HR', // RH - Jobs Only
  MARKETING = 'MARKETING', // Marketing - Content Only
}

export interface User {
  id: string;
  username: string;
  name: string;
  role: UserRole;
  isActive: boolean;
  forcePasswordReset?: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
