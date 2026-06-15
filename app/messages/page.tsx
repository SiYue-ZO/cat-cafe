'use client';

import { useState, useEffect } from 'react';
import { getItem } from '@/lib/storage';
import type { Message } from '@/types';
import MessageList from '@/components/messages/MessageList';
import MessageForm from '@/components/messages/MessageForm';
import { MessageSquare } from 'lucide-react';

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);

  const loadMessages = () => {
    const saved = getItem<Message[]>('messages') || [];
    setMessages(saved);
  };

  useEffect(() => {
    loadMessages();
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare size={24} className="text-amber-600" />
        <h1 className="text-2xl font-bold text-gray-800">留言板</h1>
      </div>
      <div className="mb-6">
        <MessageForm onSubmitted={loadMessages} />
      </div>
      <MessageList messages={messages} />
    </div>
  );
}
