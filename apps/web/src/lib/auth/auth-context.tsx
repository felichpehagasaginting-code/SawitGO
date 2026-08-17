'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { apiEndpoints } from '@/lib/api/endpoints';
import { setAuthToken } from '@/lib/api/client';
import { ApiError } from '@/lib/api/client';
import type { UserProfile } from '@/lib/api/types';

const TOKEN_KEY = 'sawitgo_access_token';
const USER_KEY = 'sawitgo_user';

interface AuthContextValue {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (nip: string, password: string) => Promise<void>;
  loginWithGoogle: (email: string, idToken?: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Restore user & status loading secara sinkron dari localStorage saat
  // client render pertama agar tidak perlu setState sinkron di effect.
  const [user, setUser] = useState<UserProfile | null>(() => {
    if (typeof window === 'undefined') {
      return null;
    }
    const rawUser = localStorage.getItem(USER_KEY);
    if (!rawUser) {
      return null;
    }
    try {
      return JSON.parse(rawUser) as UserProfile;
    } catch {
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState<boolean>(() => {
    if (typeof window === 'undefined') {
      return true;
    }
    return localStorage.getItem(TOKEN_KEY) === null ? false : true;
  });

  useEffect(() => {
    let cancelled = false;

    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      return;
    }

    setAuthToken(token);

    apiEndpoints
      .getProfile()
      .then((profile) => {
        localStorage.setItem(USER_KEY, JSON.stringify(profile));
        if (!cancelled) {
          setUser(profile);
        }
      })
      .catch((error: unknown) => {
        // Hanya token yang benar-benar ditolak (401) yang menghapus sesi.
        // Error jaringan tidak menghapus sesi agar dashboard tetap bisa
        // menampilkan data cache saat backend offline.
        if (error instanceof ApiError && error.status === 401 && !cancelled) {
          localStorage.removeItem(TOKEN_KEY);
          localStorage.removeItem(USER_KEY);
          setAuthToken(null);
          setUser(null);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (nip: string, password: string) => {
    const response = await apiEndpoints.login(nip, password);
    setAuthToken(response.accessToken);
    localStorage.setItem(TOKEN_KEY, response.accessToken);
    localStorage.setItem(USER_KEY, JSON.stringify(response.user));
    setUser(response.user);
  }, []);

  const loginWithGoogle = useCallback(async (email: string, idToken?: string) => {
    const response = await apiEndpoints.googleLogin(email, idToken);
    setAuthToken(response.accessToken);
    localStorage.setItem(TOKEN_KEY, response.accessToken);
    localStorage.setItem(USER_KEY, JSON.stringify(response.user));
    setUser(response.user);
  }, []);

  const logout = useCallback(() => {
    setAuthToken(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== null,
        isLoading,
        login,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth harus digunakan di dalam AuthProvider');
  }
  return context;
}
