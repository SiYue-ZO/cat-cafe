'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import type { ChatMessage as ChatMessageType } from '@/types';
import ChatMessage from './ChatMessage';
import { Bot, ArrowDown } from 'lucide-react';

interface ChatWindowProps {
  messages: ChatMessageType[];
  isStreaming: boolean;
}

export default function ChatWindow({ messages, isStreaming }: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  // 智能滚动：只在用户没上翻时自动滚动
  // 使用 scrollTop 而非 scrollIntoView，避免滚动祖先容器（页面）也跟着滚
  const scrollToBottom = useCallback((behavior: ScrollBehavior = 'smooth') => {
    const el = containerRef.current;
    if (!el) return;
    if (behavior === 'instant') {
      el.scrollTop = el.scrollHeight;
    } else {
      el.scrollTo({ top: el.scrollHeight, behavior });
    }
  }, []);

  // 消息变化时自动滚动；流式输出期间用 instant 避免平滑动画叠加
  useEffect(() => {
    if (autoScroll) {
      scrollToBottom(isStreaming ? 'instant' : 'smooth');
    }
  }, [messages, isStreaming, autoScroll, scrollToBottom]);

  // 检测用户是否滚动到底部附近
  const handleScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const isNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 100;
    setAutoScroll(isNearBottom);
    setShowScrollBtn(!isNearBottom);
  }, []);

  // 流式输出时持续滚动到底部（用 instant 避免平滑动画叠加导致抖动）
  useEffect(() => {
    if (isStreaming && autoScroll) {
      scrollToBottom('instant');
    }
  }, [isStreaming, autoScroll, scrollToBottom]);

  // 空状态：无论是否在流式输出都显示
  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8">
        {isStreaming ? (
          <>
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
              <Bot size={24} className="text-purple-400 animate-pulse" />
            </div>
            <p className="text-lg font-medium">正在思考中...</p>
            <p className="text-sm mt-2">小助手正在准备回答，请稍候</p>
          </>
        ) : (
          <>
            <Bot size={48} className="mb-4 text-purple-300" />
            <p className="text-lg font-medium">喵星咖啡 AI 助手</p>
            <p className="text-sm mt-2">有什么关于猫咪、咖啡或预约的问题，尽管问我吧！</p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="flex-1 relative overflow-hidden">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="h-full overflow-y-auto p-4 space-y-4"
      >
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        {isStreaming && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center shrink-0">
              <Bot size={16} />
            </div>
            <div className="bg-white shadow-sm rounded-2xl rounded-tl-sm px-4 py-2.5">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* 回到底部按钮 */}
      {showScrollBtn && (
        <button
          onClick={() => { scrollToBottom(); setAutoScroll(true); }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white shadow-lg border border-gray-200 rounded-full p-2 hover:bg-gray-50 transition-all"
          aria-label="回到底部"
        >
          <ArrowDown size={16} className="text-gray-500" />
        </button>
      )}
    </div>
  );
}
