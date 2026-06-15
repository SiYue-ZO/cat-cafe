'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { validateUsername, validatePassword, validatorMessages } from '@/lib/validators';
import Button from '@/components/ui/Button';
import { Cat } from 'lucide-react';

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!validateUsername(form.username)) { setError(validatorMessages.username); return; }
    if (!validatePassword(form.password)) { setError(validatorMessages.password); return; }
    const err = login(form.username, form.password);
    if (err) { setError(err); return; }
    router.push('/');
  };

  const inputClass = `w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all text-sm`;

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md animate-in">
        <div className="text-center mb-6">
          <Cat className="mx-auto text-amber-500 mb-2" size={40} />
          <h1 className="text-2xl font-bold text-gray-800">欢迎回来</h1>
          <p className="text-sm text-gray-500 mt-1">登录喵星咖啡</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input className={inputClass} placeholder="用户名" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
          <input type="password" className={inputClass} placeholder="密码" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <Button type="submit" className="w-full">登录</Button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          还没有账号？<a href="/register" className="text-amber-600 hover:underline">去注册</a>
        </p>
      </div>
    </div>
  );
}
