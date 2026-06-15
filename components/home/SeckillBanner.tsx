'use client';

import Link from 'next/link';
import { Zap } from 'lucide-react';
import { seckillProducts } from '@/lib/data';
import { formatPrice } from '@/lib/utils';
import CountdownTimer from '@/components/seckill/CountdownTimer';

export default function SeckillBanner() {
  if (seckillProducts.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-6 text-white">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Zap size={24} className="text-yellow-300" />
          <h2 className="text-xl font-bold">限时秒杀</h2>
        </div>
        <Link href="/seckill" className="text-sm bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg transition-colors">
          查看全部 &rarr;
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {seckillProducts.slice(0, 3).map((product) => (
          <Link key={product.id} href={`/menu/${product.id}`} className="bg-white/10 hover:bg-white/20 rounded-xl p-4 transition-colors">
            <div className="flex items-center gap-3">
              <img src={product.image} alt={product.name} className="w-16 h-16 rounded-lg object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{product.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-yellow-300 font-bold">{formatPrice(product.seckillPrice!)}</span>
                  <span className="text-xs line-through opacity-60">{formatPrice(product.price)}</span>
                </div>
                {product.seckillEnd && <CountdownTimer endTime={product.seckillEnd} compact />}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
