'use client';

import Link from 'next/link';
import type { Product } from '@/types';
import { formatPrice, categoryLabels } from '@/lib/utils';
import Card from '@/components/ui/Card';
import { Zap } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/menu/${product.id}`}>
      <Card>
        <div className="relative">
          <div className="aspect-square bg-amber-50 overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          </div>
          {product.isSeckill && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1">
              <Zap size={12} /> 秒杀
            </div>
          )}
        </div>
        <div className="p-3">
          <h3 className="font-medium text-gray-800 text-sm truncate">{product.name}</h3>
          <p className="text-xs text-gray-400 mt-1">{categoryLabels[product.category]}</p>
          <div className="flex items-center gap-2 mt-2">
            {product.isSeckill && product.seckillPrice ? (
              <>
                <span className="text-red-500 font-bold">{formatPrice(product.seckillPrice)}</span>
                <span className="text-gray-400 text-xs line-through">{formatPrice(product.price)}</span>
              </>
            ) : (
              <span className="text-amber-600 font-bold">{formatPrice(product.price)}</span>
            )}
          </div>
          {product.tags && (
            <div className="flex gap-1 mt-2 flex-wrap">
              {product.tags.map((tag) => (
                <span key={tag} className="text-xs bg-amber-50 text-amber-600 px-1.5 py-0.5 rounded">{tag}</span>
              ))}
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
}
