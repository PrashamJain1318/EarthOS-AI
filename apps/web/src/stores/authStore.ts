import { create } from 'zustand';
import { UserRole } from '@earthos/types';

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  token: string | null;
  isLoggedIn: boolean;
  login: (user: AuthUser, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  token: null,
  isLoggedIn: false,
  login: (user, token) => {
    localStorage.setItem('token', token);
    set(() => ({ user, accessToken: token, token, isLoggedIn: true }));
  },
  logout: () => {
    localStorage.removeItem('token');
    set(() => ({ user: null, accessToken: null, token: null, isLoggedIn: false }));
  }
}));
export default useAuthStore;
