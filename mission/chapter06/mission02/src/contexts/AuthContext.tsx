import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { UserInfo } from '../types';
import { getMe } from '../apis/authApi';

interface AuthContextValue {
  user: UserInfo | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (accessToken: string, refreshToken: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('accessToken');
    if (stored) {
      getMe()
        .then(setUser)
        .catch(() => {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (accessToken: string, refreshToken: string) => {
    localStorage.setItem('accessToken', JSON.stringify(accessToken));
    localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
    const me = await getMe();
    setUser(me);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
