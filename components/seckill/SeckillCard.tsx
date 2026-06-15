'use client';

import Link from 'next/link';
import { Zap } from 'lucide-react';
import { seckillProducts } from '@/lib/data';
import { formatPrice } from '@/lib/utils';
import CountdownTimer from './CountdownTimer';
import Card from '@/components/ui/Card';

export default function SeckillCard() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {seckillProducts.map((product) => (
        <Link key={product.id} href={`/menu/${product.id}`}>
          <Card>
            <div className="relative">
              <div className="aspect-square bg-amber-50 overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              </div>
              <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1">
                <Zap size={12} />
                秒杀
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-gray-800">{product.name}</h3>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.description}</p>
              <div className="flex items-center justify-between mt-3">
                <div>
                  <span className="text-red-500 font-bold text-lg">{formatPrice(product.seckillPrice!)}</span>
                  <span className="text-gray-400 text-sm line-through ml-2">{formatPrice(product.price)}</span>
                </div>
              </div>
              {product.seckillEnd && (
                <div className="mt-2">
                  <CountdownTimer endTime={product.seckillEnd} />
                </div>
              )}
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
