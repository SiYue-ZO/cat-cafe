'use client';

import { useState, useCallback, useRef } from 'react';
import { streamDeepSeek, type DeepSeekMessage } from '@/lib/deepseek';
import { useAIContext } from '@/context/AIContext';

export function useDeepSeek() {
  const { apiKey, addMessage, updateLastMessage, currentSessionId, sessions } = useAIContext();
  const [isStreaming, setIsStreaming] = useState(false);
  const abortRef = useRef(false);

  const sendMessage = useCallback(async (content: string) => {
    if (!apiKey || !currentSessionId || isStreaming) return;

    addMessage(currentSessionId, 'user', content);
    addMessage(currentSessionId, 'assistant', '');
    setIsStreaming(true);
    abortRef.current = false;

    const session = sessions.find((s) => s.id === currentSessionId);
    const history: DeepSeekMessage[] = (session?.messages || [])
      .filter((m) => m.content)
      .map((m) => ({ role: m.role, content: m.content }));

    history.push({ role: 'user', content });

    let fullText = '';
    await streamDeepSeek(
      apiKey,
      history,
      (chunk) => {
        if (abortRef.current) return;
        fullText += chunk;
        updateLastMessage(currentSessionId, fullText);
      },
      () => {
        setIsStreaming(false);
      },
      (error) => {
        updateLastMessage(currentSessionId, `[错误] ${error}`);
        setIsStreaming(false);
      }
    );
  }, [apiKey, currentSessionId, isStreaming, sessions, addMessage, updateLastMessage]);

  const stopStreaming = useCallback(() => {
    abortRef.current = true;
    setIsStreaming(false);
  }, []);

  return { sendMessage, isStreaming, stopStreaming };
}
