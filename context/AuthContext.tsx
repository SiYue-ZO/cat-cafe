'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { User } from '@/types';
import { getItem, setItem, removeItem } from '@/lib/storage';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => string | null;
  register: (user: Omit<User, 'id' | 'role' | 'createdAt'>) => string | null;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = getItem<User>('current-user');
    if (saved) setUser(saved);
    setLoading(false);
  }, []);

  const login = useCallback((username: string, password: string): string | null => {
    const users = getItem<User[]>('users') || [];
    const found = users.find((u) => u.username === username && u.password === password);
    if (!found) return '用户名或密码错误';
    setUser(found);
    setItem('current-user', found);
    return null;
  }, []);

  const register = useCallback((newUser: Omit<User, 'id' | 'role' | 'createdAt'>): string | null => {
    const users = getItem<User[]>('users') || [];
    if (users.find((u) => u.username === newUser.username)) {
      return '用户名已存在';
    }
    const user: User = {
      ...newUser,
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
      role: 'user',
      createdAt: new Date().toISOString(),
    };
    users.push(user);
    setItem('users', users);
    return null;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    removeItem('current-user');
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
