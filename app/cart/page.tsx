'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { formatPrice } from '@/lib/utils';
import QuantitySelector from '@/components/ui/QuantitySelector';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { Trash2, ShoppingBag, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalPrice, checkout } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleCheckout = () => {
    if (!user) {
      router.push('/login');
      return;
    }
    setShowCheckout(true);
  };

  const confirmCheckout = () => {
    const order = checkout();
    setShowCheckout(false);
    if (order) {
      setOrderSuccess(true);
    }
  };

  if (orderSuccess) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <CheckCircle size={64} className="mx-auto text-green-500 mb-4" />
        <h2 className="text-xl font-bold text-gray-800 mb-2">下单成功！</h2>
        <p className="text-gray-500 mb-6">您的订单已提交，请耐心等待制作</p>
        <div className="flex gap-4 justify-center">
          <Link href="/profile">
            <Button variant="ghost">查看订单</Button>
          </Link>
          <Link href="/menu">
            <Button>继续点单</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
        <h2 className="text-xl font-bold text-gray-400 mb-2">购物车是空的</h2>
        <p className="text-gray-400 mb-6">快去挑选你喜欢的饮品和甜品吧！</p>
        <Link href="/menu">
          <Button>浏览菜单</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">购物车</h1>
        <Button variant="ghost" size="sm" onClick={clearCart}>清空购物车</Button>
      </div>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.product.id} className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4">
            <img
              src={item.product.image}
              alt={item.product.name}
              className="w-20 h-20 rounded-lg object-cover bg-amber-50"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-800 truncate">{item.product.name}</h3>
              <p className="text-amber-600 font-bold mt-1">{formatPrice(item.product.price)}</p>
            </div>
            <QuantitySelector
              quantity={item.quantity}
              onChange={(q) => updateQuantity(item.product.id, q)}
            />
            <div className="text-right min-w-[80px]">
              <p className="font-bold text-gray-800">{formatPrice(item.product.price * item.quantity)}</p>
            </div>
            <button
              onClick={() => removeItem(item.product.id)}
              className="text-gray-400 hover:text-red-500 transition-colors p-1"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">共 {items.reduce((s, i) => s + i.quantity, 0)} 件商品</span>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">合计：</span>
            <span className="text-2xl font-bold text-amber-600">{formatPrice(totalPrice)}</span>
          </div>
        </div>
        <Button className="w-full mt-4" size="lg" onClick={handleCheckout}>结算</Button>
      </div>

      {/* 结算确认弹窗 */}
      <Modal open={showCheckout} onClose={() => setShowCheckout(false)} title="确认订单">
        <div className="space-y-3 mb-4">
          {items.map((item) => (
            <div key={item.product.id} className="flex justify-between text-sm">
              <span className="text-gray-700">{item.product.name} x{item.quantity}</span>
              <span className="text-gray-600">{formatPrice(item.product.price * item.quantity)}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-200 pt-3 mb-4">
          <div className="flex justify-between font-bold">
            <span>合计</span>
            <span className="text-amber-600 text-lg">{formatPrice(totalPrice)}</span>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="ghost" className="flex-1" onClick={() => setShowCheckout(false)}>取消</Button>
          <Button className="flex-1" onClick={confirmCheckout}>确认下单</Button>
        </div>
      </Modal>
    </div>
  );
}
