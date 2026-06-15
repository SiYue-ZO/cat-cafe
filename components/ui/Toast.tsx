'use client';

import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Info } from 'lucide-react';

export interface ToastData {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface ToastProps {
  toasts: ToastData[];
  removeToast: (id: string) => void;
}

const icons = {
  success: <CheckCircle className="text-green-500" size={20} />,
  error: <XCircle className="text-red-500" size={20} />,
  info: <Info className="text-blue-500" size={20} />,
};

function ToastItem({ toast, onRemove }: { toast: ToastData; onRemove: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onRemove, 3000);
    return () => clearTimeout(timer);
  }, [onRemove]);

  return (
    <div className="flex items-center gap-2 bg-white shadow-lg rounded-xl px-4 py-3 border border-gray-100 animate-in slide-in-from-right">
      {icons[toast.type]}
      <span className="text-sm text-gray-700">{toast.message}</span>
    </div>
  );
}

export default function ToastContainer({ toasts, removeToast }: ToastProps) {
  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onRemove={() => removeToast(t.id)} />
      ))}
    </div>
  );
}

/** Toast hook */
export function useToast() {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = (type: ToastData['type'], message: string) => {
    const id = Date.now().toString(36);
    setToasts((prev) => [...prev, { id, type, message }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return { toasts, addToast, removeToast };
}
