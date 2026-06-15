'use client';

import { useRef, useEffect } from 'react';
import type { ChatMessage as ChatMessageType } from '@/types';
import ChatMessage from './ChatMessage';
import { Bot } from 'lucide-react';

interface ChatWindowProps {
  messages: ChatMessageType[];
  isStreaming: boolean;
}

export default function ChatWindow({ messages, isStreaming }: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8">
        <Bot size={48} className="mb-4 text-purple-300" />
        <p className="text-lg font-medium">喵星咖啡 AI 助手</p>
        <p className="text-sm mt-2">有什么关于猫咪、咖啡或预约的问题，尽管问我吧！</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((msg) => (
        <ChatMessage key={msg.id} message={msg} />
      ))}
      {isStreaming && (
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center shrink-0">
            <Bot size={16} />
          </div>
          <div className="bg-white shadow-sm rounded-2xl rounded-tl-sm px-4 py-2.5">
            <span className="text-sm text-gray-400 pulse-soft">正在思考...</span>
          </div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
}
