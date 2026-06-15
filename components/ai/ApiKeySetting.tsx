'use client';

import { useState } from 'react';
import { useAIContext } from '@/context/AIContext';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { Key, AlertTriangle } from 'lucide-react';

export default function ApiKeySetting() {
  const { apiKey, setApiKey } = useAIContext();
  const [open, setOpen] = useState(false);
  const [key, setKey] = useState('');

  const handleOpen = () => {
    setKey(apiKey);
    setOpen(true);
  };

  const handleSave = () => {
    setApiKey(key.trim());
    setOpen(false);
  };

  return (
    <>
      <Button variant="ghost" size="sm" onClick={handleOpen} className="flex items-center gap-1">
        <Key size={14} />
        {apiKey ? '已设置 Key' : '设置 API Key'}
      </Button>
      <Modal open={open} onClose={() => setOpen(false)} title="设置 DeepSeek API Key">
        <div className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex gap-2">
            <AlertTriangle size={18} className="text-yellow-600 shrink-0 mt-0.5" />
            <div className="text-sm text-yellow-800">
              <p className="font-medium">安全提示</p>
              <p className="mt-1">请使用你自己的 API Key。由于本项目为纯前端 Demo，API Key 会暴露在浏览器端，请注意安全风险。建议使用小额充值的 Key 进行测试。</p>
            </div>
          </div>
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="sk-..."
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
          />
          <div className="flex gap-3">
            <Button variant="ghost" className="flex-1" onClick={() => setOpen(false)}>取消</Button>
            <Button className="flex-1" onClick={handleSave}>保存</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
