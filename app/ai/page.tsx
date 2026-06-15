'use client';

import { useAIContext } from '@/context/AIContext';
import { useDeepSeek } from '@/hooks/useDeepSeek';
import ChatWindow from '@/components/ai/ChatWindow';
import ChatInput from '@/components/ai/ChatInput';
import ApiKeySetting from '@/components/ai/ApiKeySetting';
import { Plus, Trash2, MessageSquare, Bot, Key } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function AIPage() {
  const { apiKey, sessions, currentSessionId, setCurrentSessionId, createSession, deleteSession, clearAllSessions } = useAIContext();
  const { sendMessage, isStreaming, stopStreaming } = useDeepSeek();

  const currentSession = sessions.find((s) => s.id === currentSessionId);

  const handleSend = (content: string) => {
    if (!apiKey) return;
    if (!currentSessionId) {
      const id = createSession();
      // Need to wait for state update, use setTimeout
      setTimeout(() => {
        sendMessage(content);
      }, 100);
      return;
    }
    sendMessage(content);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 h-[calc(100vh-8rem)]">
      <div className="flex h-full bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 border-r border-gray-100 flex flex-col shrink-0 hidden md:flex">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-purple-600 font-bold">
                <Bot size={20} />
                AI 助手
              </div>
            </div>
            <Button size="sm" className="w-full" onClick={() => createSession()}>
              <Plus size={14} className="mr-1" /> 新建对话
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {sessions.map((session) => (
              <div
                key={session.id}
                onClick={() => setCurrentSessionId(session.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer text-sm transition-colors ${
                  currentSessionId === session.id
                    ? 'bg-purple-50 text-purple-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <MessageSquare size={14} className="shrink-0" />
                <span className="truncate flex-1">{session.title}</span>
                <button
                  onClick={(e) => { e.stopPropagation(); deleteSession(session.id); }}
                  className="text-gray-400 hover:text-red-500 shrink-0"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-gray-100 space-y-2">
            <ApiKeySetting />
            {sessions.length > 0 && (
              <Button variant="ghost" size="sm" onClick={clearAllSessions} className="w-full text-red-400 hover:text-red-500">
                <Trash2 size={14} className="mr-1" /> 清空所有对话
              </Button>
            )}
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between md:justify-end">
            <div className="md:hidden flex items-center gap-2 text-purple-600 font-bold">
              <Bot size={18} />
              AI 助手
            </div>
            <div className="flex items-center gap-2">
              <ApiKeySetting />
              {!apiKey && (
                <span className="text-xs text-red-400 flex items-center gap-1">
                  <Key size={12} /> 请先设置 API Key
                </span>
              )}
            </div>
          </div>

          {!apiKey ? (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8">
              <Key size={48} className="mb-4 text-amber-300" />
              <p className="text-lg font-medium">请先设置 API Key</p>
              <p className="text-sm mt-2 text-center">点击上方"设置 API Key"按钮，填入你的 DeepSeek API Key 后即可开始对话</p>
              <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3 max-w-sm text-sm text-yellow-800">
                <p>安全提示：API Key 会存储在浏览器本地，请注意安全风险。</p>
              </div>
            </div>
          ) : (
            <>
              <ChatWindow
                messages={currentSession?.messages || []}
                isStreaming={isStreaming}
              />
              <ChatInput onSend={handleSend} disabled={isStreaming} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
