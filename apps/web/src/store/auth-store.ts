import { LoginSchema } from '@/schema/auth-schema';
import { loginService } from '@/services/auth-service';
import { create } from 'zustand';

interface SessionData {
  name: string;
  userId: number;
  email: string;
  role: string;
}

interface AuthStore {
  isAuthenticated: boolean;
  loading?: boolean;
  message?: string;
  session: SessionData | null;
  login: (payload: LoginSchema) => void;
  logout: () => void;
  setMessage: (message: string) => void;
  setSession: (data: SessionData) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  loading: false,
  errorMesage: undefined,
  session: null,
  login: async (payload: LoginSchema) => {
    set({ loading: true });
    loginService(payload)
      .then((data) => {
        set({ isAuthenticated: true });
      })
      .catch((err) => {
        set({ message: err.message, isAuthenticated: false });
      })
      .finally(() => {
        set({ loading: false });
      });
  },
  logout: () => set({ session: null }),
  setMessage: (message: string) => set({ message }),
  setSession: (data: SessionData) => set({ session: data }),
}));
