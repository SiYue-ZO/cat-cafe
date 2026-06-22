'use client';

import type { ChatMessage as ChatMessageType } from '@/types';
import { Bot, User, AlertCircle } from 'lucide-react';

interface ChatMessageProps {
  message: ChatMessageType;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const isError = message.isError;
  const isStreaming = message.isStreaming;

  // 空消息不渲染（流式输出前的占位气泡）
  if (!isUser && !message.content && !isError) return null;

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
        isUser ? 'bg-amber-500 text-white' : 'bg-purple-500 text-white'
      }`}>
        {isUser ? <User size={16} /> : <Bot size={16} />}
      </div>
      <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
        isUser
          ? 'bg-amber-500 text-white rounded-tr-sm'
          : isError
            ? 'bg-red-50 text-red-700 border border-red-200 rounded-tl-sm'
            : 'bg-white text-gray-800 shadow-sm rounded-tl-sm'
      }`}>
        {isError && (
          <div className="flex items-center gap-1.5 mb-1 text-red-500">
            <AlertCircle size={14} />
            <span className="text-xs font-medium">出错了</span>
          </div>
        )}
        <p className="whitespace-pre-wrap">{message.content}</p>
        {isStreaming && !isUser && (
          <span className="inline-block w-2 h-4 ml-0.5 bg-purple-400 animate-pulse rounded-sm" />
        )}
      </div>
    </div>
  );
}
