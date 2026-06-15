'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { ChatSession } from '@/types';
import { getItem, setItem, getString, setString } from '@/lib/storage';
import { generateId } from '@/lib/utils';

interface AIContextType {
  apiKey: string;
  setApiKey: (key: string) => void;
  sessions: ChatSession[];
  currentSessionId: string | null;
  setCurrentSessionId: (id: string | null) => void;
  createSession: () => string;
  deleteSession: (id: string) => void;
  addMessage: (sessionId: string, role: 'user' | 'assistant', content: string) => void;
  updateLastMessage: (sessionId: string, content: string) => void;
  clearAllSessions: () => void;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export function AIProvider({ children }: { children: React.ReactNode }) {
  const [apiKey, setApiKeyState] = useState('');
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);

  useEffect(() => {
    const key = getString('api-key');
    if (key) setApiKeyState(key);
    const saved = getItem<ChatSession[]>('chat-sessions');
    if (saved) setSessions(saved);
  }, []);

  useEffect(() => {
    setItem('chat-sessions', sessions);
  }, [sessions]);

  const setApiKey = useCallback((key: string) => {
    setApiKeyState(key);
    setString('api-key', key);
  }, []);

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
    if (currentSessionId === id) setCurrentSessionId(null);
  }, [currentSessionId]);

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

  const updateLastMessage = useCallback((sessionId: string, content: string) => {
    setSessions((prev) =>
      prev.map((s) => {
        if (s.id !== sessionId) return s;
        const messages = [...s.messages];
        if (messages.length > 0) {
          messages[messages.length - 1] = { ...messages[messages.length - 1], content };
        }
        return { ...s, messages, updatedAt: new Date().toISOString() };
      })
    );
  }, []);

  const clearAllSessions = useCallback(() => {
    setSessions([]);
    setCurrentSessionId(null);
  }, []);

  return (
    <AIContext.Provider
      value={{
        apiKey, setApiKey, sessions, currentSessionId, setCurrentSessionId,
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
