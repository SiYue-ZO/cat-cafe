'use client';

import type { ChatMessage as ChatMessageType } from '@/types';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: ChatMessageType;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

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
          : 'bg-white text-gray-800 shadow-sm rounded-tl-sm'
      }`}>
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  );
}
