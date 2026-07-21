import { create } from 'zustand';
import { persist } from 'zustand/middleware';
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

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      token: null,
      isLoggedIn: false,
      login: (user, token) => {
        set({ user, accessToken: token, token, isLoggedIn: true });
      },
      logout: async () => {
        const { token } = get();
        if (token) {
          try {
            await fetch('http://localhost:8000/api/v1/auth/logout', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({ refreshToken: token })
            });
          } catch (e) {
            console.error('Logout error', e);
          }
        }
        set({ user: null, accessToken: null, token: null, isLoggedIn: false });
      }
    }),
    {
      name: 'earthos-auth-storage'
    }
  )
);
export default useAuthStore;
