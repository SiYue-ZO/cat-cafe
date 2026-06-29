'use client';

import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { getItem, setItem } from '@/lib/storage';
import { formatTime } from '@/lib/utils';
import type { Reservation, User as UserType, Order } from '@/types';
import Button from '@/components/ui/Button';
import { User, Calendar, ShoppingBag, LogOut, Cat, Clock, Package, Shield, Users } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const router = useRouter();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [allUsers, setAllUsers] = useState<UserType[]>([]);
  const [allReservations, setAllReservations] = useState<Reservation[]>([]);
  const [activeTab, setActiveTab] = useState<'reservations' | 'orders' | 'admin'>('reservations');

  useEffect(() => {
    if (!user) return;
    const all = getItem<Reservation[]>('reservations') || [];
    setReservations(all.filter((r) => r.userId === user.id));
    const allOrders = getItem<Order[]>('orders') || [];
    setOrders(allOrders.filter((o) => o.userId === user.id));
    if (user.role === 'admin') {
      setAllUsers(getItem<UserType[]>('users') || []);
      setAllReservations(all);
    }
  }, [user]);

  const handleConfirmReservation = (resId: string) => {
    const all = getItem<Reservation[]>('reservations') || [];
    const updated = all.map((r) => r.id === resId ? { ...r, status: 'confirmed' as const } : r);
    setItem('reservations', updated);
    setAllReservations(updated);
    setReservations(updated.filter((r) => r.userId === user?.id));
  };

  const handleCancelReservation = (resId: string) => {
    const all = getItem<Reservation[]>('reservations') || [];
    const updated = all.map((r) => r.id === resId ? { ...r, status: 'cancelled' as const } : r);
    setItem('reservations', updated);
    setAllReservations(updated);
    setReservations(updated.filter((r) => r.userId === user?.id));
  };

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

  const orderStatusLabels: Record<string, { label: string; color: string }> = {
    pending: { label: '待制作', color: 'bg-yellow-100 text-yellow-700' },
    completed: { label: '已完成', color: 'bg-green-100 text-green-700' },
    cancelled: { label: '已取消', color: 'bg-red-100 text-red-700' },
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* 用户信息 */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center gap-4">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-2xl ${user.role === 'admin' ? 'bg-purple-100 text-purple-600' : 'bg-amber-100 text-amber-600'}`}>
            {user.username[0]?.toUpperCase()}
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              {user.username}
              {user.role === 'admin' && (
                <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-600 font-medium">
                  <Shield size={12} /> 管理员
                </span>
              )}
            </h1>
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
            <p className="text-lg font-bold text-gray-800">{orders.length}</p>
            <p className="text-xs text-gray-500">订单</p>
          </div>
        </div>
      </div>

      {/* 选项卡 */}
      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('reservations')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'reservations' ? 'border-amber-500 text-amber-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          <Calendar size={14} className="inline mr-1" />预约记录
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'orders' ? 'border-amber-500 text-amber-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          <Package size={14} className="inline mr-1" />我的订单
        </button>
        {user.role === 'admin' && (
          <button
            onClick={() => setActiveTab('admin')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'admin' ? 'border-purple-500 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          >
            <Shield size={14} className="inline mr-1" />管理后台
          </button>
        )}
      </div>

      {/* 预约记录 */}
      {activeTab === 'reservations' && (
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
      )}

      {/* 我的订单 */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-4">
            <Package size={20} className="text-green-600" />
            我的订单
          </h2>
          {orders.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <Package size={32} className="mx-auto mb-2 opacity-50" />
              <p>暂无订单</p>
              <Link href="/menu" className="text-amber-600 text-sm hover:underline mt-2 inline-block">去点单</Link>
            </div>
          ) : (
            <div className="space-y-3">
              {orders.map((order) => (
                <div key={order.id} className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-500">订单号：{order.id}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${orderStatusLabels[order.status]?.color}`}>
                      {orderStatusLabels[order.status]?.label}
                    </span>
                  </div>
                  <div className="space-y-1">
                    {order.items.map((item) => (
                      <div key={item.product.id} className="flex justify-between text-sm">
                        <span className="text-gray-700">{item.product.name} x{item.quantity}</span>
                        <span className="text-gray-500">¥{(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-200">
                    <span className="text-xs text-gray-400">{formatTime(order.createdAt)}</span>
                    <span className="font-bold text-amber-600">合计：¥{order.totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 管理后台 */}
      {activeTab === 'admin' && user.role === 'admin' && (
        <div className="space-y-6">
          {/* 用户管理 */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-4">
              <Users size={20} className="text-purple-600" />
              用户管理
            </h2>
            <div className="space-y-2">
              {allUsers.map((u) => (
                <div key={u.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${u.role === 'admin' ? 'bg-purple-100 text-purple-600' : 'bg-amber-100 text-amber-600'}`}>
                      {u.username[0]?.toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 flex items-center gap-1">
                        {u.username}
                        {u.role === 'admin' && <Shield size={12} className="text-purple-500" />}
                      </p>
                      <p className="text-xs text-gray-400">{u.email}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${u.role === 'admin' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-600'}`}>
                    {u.role === 'admin' ? '管理员' : '普通用户'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 预约管理 */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-4">
              <Calendar size={20} className="text-amber-600" />
              预约管理
            </h2>
            {allReservations.length === 0 ? (
              <p className="text-center py-8 text-gray-400">暂无预约记录</p>
            ) : (
              <div className="space-y-2">
                {allReservations.map((r) => (
                  <div key={r.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-800">{r.catName}</p>
                      <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                        <Clock size={10} /> {r.date} {r.timeSlot}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${statusLabels[r.status]?.color}`}>
                        {statusLabels[r.status]?.label}
                      </span>
                      {r.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleConfirmReservation(r.id)}
                            className="text-xs px-2 py-1 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors"
                          >
                            确认
                          </button>
                          <button
                            onClick={() => handleCancelReservation(r.id)}
                            className="text-xs px-2 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
                          >
                            取消
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

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
