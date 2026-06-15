'use client';

import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import Button from '@/components/ui/Button';

interface ChatInputProps {
  onSend: (content: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (!input.trim() || disabled) return;
    onSend(input.trim());
    setInput('');
    if (inputRef.current) inputRef.current.style.height = 'auto';
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (!disabled && inputRef.current) inputRef.current.focus();
  }, [disabled]);

  return (
    <div className="flex items-end gap-2 p-4 border-t border-gray-100 bg-white">
      <textarea
        ref={inputRef}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          e.target.style.height = 'auto';
          e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
        }}
        onKeyDown={handleKeyDown}
        placeholder="输入消息..."
        rows={1}
        disabled={disabled}
        className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm resize-none disabled:opacity-50"
      />
      <Button onClick={handleSend} disabled={!input.trim() || disabled} size="md" className="shrink-0">
        <Send size={16} />
      </Button>
    </div>
  );
}
