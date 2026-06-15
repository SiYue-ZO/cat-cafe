'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { validateUsername, validatePassword, validatePhone, validateEmail, validatorMessages } from '@/lib/validators';
import Button from '@/components/ui/Button';
import { Cat } from 'lucide-react';

export default function RegisterForm() {
  const router = useRouter();
  const { register } = useAuth();
  const [form, setForm] = useState({ username: '', password: '', confirmPassword: '', phone: '', email: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!validateUsername(form.username)) e.username = validatorMessages.username;
    if (!validatePassword(form.password)) e.password = validatorMessages.password;
    if (form.password !== form.confirmPassword) e.confirmPassword = validatorMessages.confirmPassword;
    if (!validatePhone(form.phone)) e.phone = validatorMessages.phone;
    if (!validateEmail(form.email)) e.email = validatorMessages.email;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const err = register({ username: form.username, password: form.password, phone: form.phone, email: form.email });
    if (err) { setErrors({ username: err }); return; }
    router.push('/login');
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-2.5 rounded-lg border ${errors[field] ? 'border-red-400 bg-red-50' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all text-sm`;

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md animate-in">
        <div className="text-center mb-6">
          <Cat className="mx-auto text-amber-500 mb-2" size={40} />
          <h1 className="text-2xl font-bold text-gray-800">注册账号</h1>
          <p className="text-sm text-gray-500 mt-1">加入喵星咖啡大家庭</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input className={inputClass('username')} placeholder="用户名（4-16位字母/数字/下划线）" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
          </div>
          <div>
            <input type="password" className={inputClass('password')} placeholder="密码（≥6位，含字母和数字）" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>
          <div>
            <input type="password" className={inputClass('confirmPassword')} placeholder="确认密码" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>
          <div>
            <input className={inputClass('phone')} placeholder="手机号" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>
          <div>
            <input className={inputClass('email')} placeholder="邮箱" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <Button type="submit" className="w-full">注册</Button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          已有账号？<a href="/login" className="text-amber-600 hover:underline">去登录</a>
        </p>
      </div>
    </div>
  );
}
