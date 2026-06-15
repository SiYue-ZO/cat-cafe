'use client';

import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { getItem } from '@/lib/storage';
import { formatTime } from '@/lib/utils';
import type { Reservation } from '@/types';
import Button from '@/components/ui/Button';
import { User, Calendar, ShoppingBag, LogOut, Cat, Clock, Package } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const router = useRouter();
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    if (!user) return;
    const all = getItem<Reservation[]>('reservations') || [];
    setReservations(all.filter((r) => r.userId === user.id));
  }, [user]);

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <User size={64} className="mx-auto text-gray-300 mb-4" />
        <h2 className="text-xl font-bold text-gray-400 mb-2">请先登录</h2>
        <p className="text-gray-400 mb-6">登录后查看个人信息</p>
        <Link href="/login"><Button>去登录</Button></Link>
      </div>
    );
  }

  const statusLabels: Record<string, { label: string; color: string }> = {
    pending: { label: '待确认', color: 'bg-yellow-100 text-yellow-700' },
    confirmed: { label: '已确认', color: 'bg-green-100 text-green-700' },
    cancelled: { label: '已取消', color: 'bg-red-100 text-red-700' },
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* 用户信息 */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-bold text-2xl">
            {user.username[0]?.toUpperCase()}
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">{user.username}</h1>
            <p className="text-sm text-gray-500">{user.email}</p>
            <p className="text-sm text-gray-400">{user.phone}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="text-center p-3 bg-amber-50 rounded-xl">
            <Cat size={20} className="mx-auto text-amber-600 mb-1" />
            <p className="text-lg font-bold text-gray-800">{reservations.length}</p>
            <p className="text-xs text-gray-500">预约记录</p>
          </div>
          <Link href="/cart" className="text-center p-3 bg-purple-50 rounded-xl">
            <ShoppingBag size={20} className="mx-auto text-purple-600 mb-1" />
            <p className="text-lg font-bold text-gray-800">{items.length}</p>
            <p className="text-xs text-gray-500">购物车</p>
          </Link>
          <div className="text-center p-3 bg-green-50 rounded-xl">
            <Package size={20} className="mx-auto text-green-600 mb-1" />
            <p className="text-lg font-bold text-gray-800">0</p>
            <p className="text-xs text-gray-500">订单</p>
          </div>
        </div>
      </div>

      {/* 预约记录 */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-4">
          <Calendar size={20} className="text-amber-600" />
          预约记录
        </h2>
        {reservations.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <Calendar size={32} className="mx-auto mb-2 opacity-50" />
            <p>暂无预约记录</p>
            <Link href="/cats" className="text-amber-600 text-sm hover:underline mt-2 inline-block">去预约猫咪</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {reservations.map((r) => (
              <div key={r.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-medium text-gray-800">{r.catName}</p>
                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                    <Clock size={12} />
                    {r.date} {r.timeSlot}
                  </p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${statusLabels[r.status]?.color}`}>
                  {statusLabels[r.status]?.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 退出登录 */}
      <div className="text-center">
        <Button
          variant="danger"
          onClick={() => { logout(); router.push('/'); }}
          className="flex items-center gap-2 mx-auto"
        >
          <LogOut size={16} /> 退出登录
        </Button>
      </div>
    </div>
  );
}
