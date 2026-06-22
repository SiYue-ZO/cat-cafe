'use client';

import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import type { ChatSession } from '@/types';
import { getItem, setItem } from '@/lib/storage';
import { generateId } from '@/lib/utils';

interface AIContextType {
  sessions: ChatSession[];
  currentSessionId: string | null;
  setCurrentSessionId: (id: string | null) => void;
  createSession: () => string;
  deleteSession: (id: string) => void;
  addMessage: (sessionId: string, role: 'user' | 'assistant', content: string) => void;
  updateLastMessage: (sessionId: string, content: string, isError?: boolean) => void;
  clearAllSessions: () => boolean;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export function AIProvider({ children }: { children: React.ReactNode }) {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  // 防抖写入 localStorage
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const debouncedSave = useCallback((data: ChatSession[]) => {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      setItem('chat-sessions', data);
    }, 500);
  }, []);

  // 从 localStorage 恢复数据
  useEffect(() => {
    const saved = getItem<ChatSession[]>('chat-sessions');
    if (saved) setSessions(saved);
    setHydrated(true);
  }, []);

  // 防抖持久化
  useEffect(() => {
    if (hydrated) {
      debouncedSave(sessions);
    }
  }, [sessions, hydrated, debouncedSave]);

  const createSession = useCallback((): string => {
    const id = generateId();
    const session: ChatSession = {
      id,
      title: '新对话',
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setSessions((prev) => [session, ...prev]);
    setCurrentSessionId(id);
    return id;
  }, []);

  const deleteSession = useCallback((id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
    setCurrentSessionId((prev) => (prev === id ? null : prev));
  }, []);

  const addMessage = useCallback((sessionId: string, role: 'user' | 'assistant', content: string) => {
    setSessions((prev) =>
      prev.map((s) => {
        if (s.id !== sessionId) return s;
        const msg = {
          id: generateId(),
          role,
          content,
          createdAt: new Date().toISOString(),
        };
        const messages = [...s.messages, msg];
        const title = s.messages.length === 0 && role === 'user'
          ? content.slice(0, 20) + (content.length > 20 ? '...' : '')
          : s.title;
        return { ...s, messages, title, updatedAt: new Date().toISOString() };
      })
    );
  }, []);

  const updateLastMessage = useCallback((sessionId: string, content: string, isError?: boolean) => {
    setSessions((prev) =>
      prev.map((s) => {
        if (s.id !== sessionId) return s;
        const messages = [...s.messages];
        if (messages.length > 0) {
          const last = messages[messages.length - 1];
          messages[messages.length - 1] = {
            ...last,
            content,
            ...(isError ? { isError: true } : {}),
          };
        }
        return { ...s, messages, updatedAt: new Date().toISOString() };
      })
    );
  }, []);

  const clearAllSessions = useCallback((): boolean => {
    if (sessions.length === 0) return false;
    if (!confirm('确定要清空所有对话吗？此操作不可恢复。')) return false;
    setSessions([]);
    setCurrentSessionId(null);
    return true;
  }, [sessions.length]);

  return (
    <AIContext.Provider
      value={{
        sessions, currentSessionId, setCurrentSessionId,
        createSession, deleteSession, addMessage, updateLastMessage, clearAllSessions,
      }}
    >
      {children}
    </AIContext.Provider>
  );
}

export function useAIContext() {
  const ctx = useContext(AIContext);
  if (!ctx) throw new Error('useAIContext must be used within AIProvider');
  return ctx;
}
