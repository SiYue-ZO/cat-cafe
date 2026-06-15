'use client';

import type { Message } from '@/types';
import { formatTime } from '@/lib/utils';

interface MessageListProps {
  messages: Message[];
}

export default function MessageList({ messages }: MessageListProps) {
  if (messages.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        暂无留言，快来抢沙发吧！
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {messages.map((msg) => (
        <div key={msg.id} className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-bold text-sm">
              {msg.username[0]?.toUpperCase()}
            </div>
            <div>
              <span className="font-medium text-gray-800 text-sm">{msg.username}</span>
              <span className="text-xs text-gray-400 ml-2">{formatTime(msg.createdAt)}</span>
            </div>
          </div>
          <p className="mt-3 text-gray-600 text-sm leading-relaxed pl-[52px]">{msg.content}</p>
        </div>
      ))}
    </div>
  );
}
