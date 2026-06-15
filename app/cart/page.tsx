'use client';

import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import QuantitySelector from '@/components/ui/QuantitySelector';
import Button from '@/components/ui/Button';
import { Trash2, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalPrice } = useCart();

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
        <Button className="w-full mt-4" size="lg">结算</Button>
      </div>
    </div>
  );
}
