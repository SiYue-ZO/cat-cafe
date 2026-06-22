'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { getItem, setItem } from '@/lib/storage';
import { generateId } from '@/lib/utils';
import type { Message } from '@/types';
import Button from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

interface MessageFormProps {
  onSubmitted: () => void;
}

export default function MessageForm({ onSubmitted }: MessageFormProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { router.push('/login'); return; }
    if (!content.trim()) return;

    const messages = getItem<Message[]>('messages') || [];
    const newMsg: Message = {
      id: generateId(),
      userId: user.id,
      username: user.username,
      avatar: '',
      content: content.trim(),
      createdAt: new Date().toISOString(),
    };
    setItem('messages', [newMsg, ...messages]);
    setContent('');
    onSubmitted();
  };

  if (!user) {
    return (
      <div className="bg-amber-50 rounded-xl p-4 text-center text-sm text-amber-700">
        请先 <Link href="/login" className="underline font-medium">登录</Link> 后再留言
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl p-4 shadow-sm">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="说点什么吧..."
        rows={3}
        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm resize-none"
      />
      <div className="flex justify-end mt-2">
        <Button type="submit" size="sm" disabled={!content.trim()}>发表留言</Button>
      </div>
    </form>
  );
}
