'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { User } from '@/types';
import { getItem, setItem, removeItem } from '@/lib/storage';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => string | null;
  register: (user: Omit<User, 'id' | 'createdAt'> & { role: 'user' | 'admin' }) => string | null;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/** 预设演示账号 */
const DEMO_USER: User = {
  id: 'demo-001',
  username: 'demo',
  password: 'demo123',
  phone: '13800138000',
  email: 'demo@catcafe.com',
  role: 'user',
  createdAt: new Date().toISOString(),
};

/** 预设管理员账号 */
const ADMIN_USER: User = {
  id: 'admin-001',
  username: 'admin',
  password: 'admin123',
  phone: '13800138001',
  email: 'admin@catcafe.com',
  role: 'admin',
  createdAt: new Date().toISOString(),
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 确保本地用户数据包含预设演示账号和管理员账号
    const users = getItem<User[]>('users') || [];
    let shouldWrite = false;
    // 如果没有任何用户，写入两个预设账号
    if (users.length === 0) {
      setItem('users', [DEMO_USER, ADMIN_USER]);
    } else {
      // 若已有用户但缺少演示账号或管理员账号，则补齐
      if (!users.find((u) => u.username === DEMO_USER.username)) {
        users.push(DEMO_USER);
        shouldWrite = true;
      }
      if (!users.find((u) => u.username === ADMIN_USER.username)) {
        users.push(ADMIN_USER);
        shouldWrite = true;
      }
      if (shouldWrite) setItem('users', users);
    }
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

  const register = useCallback((newUser: Omit<User, 'id' | 'createdAt'> & { role: 'user' | 'admin' }): string | null => {
    const users = getItem<User[]>('users') || [];
    if (users.find((u) => u.username === newUser.username)) {
      return '用户名已存在';
    }
    const user: User = {
      ...newUser,
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
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
