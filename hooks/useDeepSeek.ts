'use client';

import { useState, useCallback, useRef } from 'react';
import { streamDeepSeek, type DeepSeekMessage } from '@/lib/deepseek';
import { useAIContext } from '@/context/AIContext';

export function useDeepSeek() {
  const { addMessage, updateLastMessage, currentSessionId, sessions } = useAIContext();
  const [isStreaming, setIsStreaming] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(async (content: string, sessionId?: string) => {
    const targetId = sessionId || currentSessionId;
    if (!targetId || isStreaming) return;

    addMessage(targetId, 'user', content);
    addMessage(targetId, 'assistant', '');
    setIsStreaming(true);

    // 用 setTimeout 让 React 先刷新 state，再读取最新 sessions
    await new Promise((r) => setTimeout(r, 0));

    const session = sessions.find((s) => s.id === targetId);
    const history: DeepSeekMessage[] = (session?.messages || [])
      .filter((m) => m.content)
      .map((m) => ({ role: m.role, content: m.content }));

    history.push({ role: 'user', content });

    const controller = new AbortController();
    abortRef.current = controller;

    let fullText = '';
    await streamDeepSeek(
      history,
      (chunk) => {
        if (controller.signal.aborted) return;
        fullText += chunk;
        updateLastMessage(targetId, fullText);
      },
      () => {
        setIsStreaming(false);
        abortRef.current = null;
      },
      (error) => {
        updateLastMessage(targetId, error, true);
        setIsStreaming(false);
        abortRef.current = null;
      },
      controller.signal
    );
  }, [currentSessionId, isStreaming, sessions, addMessage, updateLastMessage]);

  const stopStreaming = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
    setIsStreaming(false);
  }, []);

  return { sendMessage, isStreaming, stopStreaming };
}
