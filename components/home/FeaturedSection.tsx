'use client';

import Link from 'next/link';
import { cats, products } from '@/lib/data';
import { formatPrice } from '@/lib/utils';
import Card from '@/components/ui/Card';
import { ArrowRight } from 'lucide-react';

export default function FeaturedSection() {
  const featuredCats = cats.filter((c) => c.available).slice(0, 3);
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="space-y-12">
      {/* 推荐猫咪 */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">明星猫咪</h2>
          <Link href="/cats" className="flex items-center gap-1 text-amber-600 hover:text-amber-700 text-sm font-medium">
            查看全部 <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCats.map((cat) => (
            <Link key={cat.id} href={`/cats/${cat.id}`}>
              <Card>
                <div className="aspect-square bg-amber-50 relative overflow-hidden">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  {!cat.available && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-bold">暂不可约</div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-800">{cat.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{cat.breed} · {cat.personality}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* 推荐商品 */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">招牌推荐</h2>
          <Link href="/menu" className="flex items-center gap-1 text-amber-600 hover:text-amber-700 text-sm font-medium">
            查看全部 <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredProducts.map((product) => (
            <Link key={product.id} href={`/menu/${product.id}`}>
              <Card>
                <div className="aspect-square bg-amber-50 overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-gray-800 text-sm truncate">{product.name}</h3>
                  <p className="text-amber-600 font-bold mt-1">{formatPrice(product.price)}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
