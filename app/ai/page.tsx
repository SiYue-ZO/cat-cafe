'use client';

import { useState } from 'react';
import { useAIContext } from '@/context/AIContext';
import { useDeepSeek } from '@/hooks/useDeepSeek';
import ChatWindow from '@/components/ai/ChatWindow';
import ChatInput from '@/components/ai/ChatInput';
import { Plus, Trash2, MessageSquare, Bot, Menu, X } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function AIPage() {
  const { sessions, currentSessionId, setCurrentSessionId, createSession, deleteSession, clearAllSessions } = useAIContext();
  const { sendMessage, isStreaming, stopStreaming } = useDeepSeek();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentSession = sessions.find((s) => s.id === currentSessionId);

  const handleSend = (content: string) => {
    if (!currentSessionId) {
      const id = createSession();
      setTimeout(() => sendMessage(content, id), 50);
      return;
    }
    sendMessage(content);
  };

  const handleDeleteSession = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('确定删除这个对话吗？')) {
      deleteSession(id);
    }
  };

  const handleSelectSession = (id: string) => {
    setCurrentSessionId(id);
    setSidebarOpen(false);
  };

  // 侧边栏内容（桌面和移动端共用）
  const sidebarContent = (
    <>
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-purple-600 font-bold">
            <Bot size={20} />
            AI 助手
          </div>
          <button className="md:hidden text-gray-400 hover:text-gray-600" onClick={() => setSidebarOpen(false)} aria-label="关闭会话列表">
            <X size={20} />
          </button>
        </div>
        <Button size="sm" className="w-full" onClick={() => { createSession(); setSidebarOpen(false); }}>
          <Plus size={14} className="mr-1" /> 新建对话
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {sessions.length === 0 && (
          <p className="text-center text-gray-400 text-sm py-8">暂无对话</p>
        )}
        {sessions.map((session) => (
          <div
            key={session.id}
            onClick={() => handleSelectSession(session.id)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer text-sm transition-colors ${
              currentSessionId === session.id
                ? 'bg-purple-50 text-purple-700'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <MessageSquare size={14} className="shrink-0" />
            <span className="truncate flex-1">{session.title}</span>
            <button
              onClick={(e) => handleDeleteSession(session.id, e)}
              className="text-gray-400 hover:text-red-500 shrink-0"
              aria-label="删除对话"
            >
              <Trash2 size={12} />
            </button>
          </div>
        ))}
      </div>
      {sessions.length > 0 && (
        <div className="p-3 border-t border-gray-100">
          <Button variant="ghost" size="sm" onClick={clearAllSessions} className="w-full text-red-400 hover:text-red-500">
            <Trash2 size={14} className="mr-1" /> 清空所有对话
          </Button>
        </div>
      )}
    </>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 h-[calc(100vh-8rem)]">
      <div className="flex h-full bg-white rounded-2xl shadow-lg overflow-hidden relative">
        {/* 桌面端侧边栏 */}
        <div className="w-64 border-r border-gray-100 flex-col shrink-0 hidden md:flex">
          {sidebarContent}
        </div>

        {/* 移动端侧边栏抽屉 */}
        {sidebarOpen && (
          <>
            <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
            <div className="fixed top-0 left-0 bottom-0 w-72 bg-white z-50 flex flex-col shadow-xl md:hidden animate-in slide-in-from-left">
              {sidebarContent}
            </div>
          </>
        )}

        {/* 聊天区域 */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* 顶部栏 */}
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                className="md:hidden text-gray-500 hover:text-gray-700"
                onClick={() => setSidebarOpen(true)}
                aria-label="打开会话列表"
              >
                <Menu size={20} />
              </button>
              <div className="flex items-center gap-2 text-purple-600 font-bold">
                <Bot size={18} />
                <span className="hidden sm:inline">AI 助手</span>
              </div>
            </div>
            {isStreaming && (
              <Button variant="ghost" size="sm" onClick={stopStreaming} className="text-red-400 hover:text-red-500">
                停止
              </Button>
            )}
          </div>

          <ChatWindow
            messages={currentSession?.messages || []}
            isStreaming={isStreaming}
          />
          <ChatInput onSend={handleSend} disabled={isStreaming} />
        </div>
      </div>
    </div>
  );
}
