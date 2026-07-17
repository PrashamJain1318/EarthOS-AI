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
  isLoggedIn: boolean;
  login: (user: AuthUser, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isLoggedIn: false,
  login: (user, token) => set(() => ({ user, accessToken: token, isLoggedIn: true })),
  logout: () => set(() => ({ user: null, accessToken: null, isLoggedIn: false }))
}));
export default useAuthStore;
