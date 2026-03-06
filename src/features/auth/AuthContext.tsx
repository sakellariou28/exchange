import { createContext, useContext, useMemo, useState } from 'react';
import { appConfig } from '../../config/appConfig';
import { authService } from './authService';
import type { LoginInput, AuthUser } from './types';

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (input: LoginInput) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const getStoredAuth = () => {
  const token = localStorage.getItem(appConfig.authTokenStorageKey);
  const userRaw = localStorage.getItem(appConfig.userStorageKey);

  return {
    token,
    user: userRaw ? (JSON.parse(userRaw) as AuthUser) : null,
  };
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const initial = getStoredAuth();

  const [token, setToken] = useState<string | null>(initial.token);
  const [user, setUser] = useState<AuthUser | null>(initial.user);

  const login = async (input: LoginInput): Promise<void> => {
    const result = await authService.login(input);

    setToken(result.token);
    setUser(result.user);

    localStorage.setItem(appConfig.authTokenStorageKey, result.token);
    localStorage.setItem(appConfig.userStorageKey, JSON.stringify(result.user));
  };

  const logout = (): void => {
    setToken(null);
    setUser(null);
    localStorage.removeItem(appConfig.authTokenStorageKey);
    localStorage.removeItem(appConfig.userStorageKey);
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token && user),
      login,
      logout,
    }),
    [token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
};

