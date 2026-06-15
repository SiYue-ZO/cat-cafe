'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { products } from '@/lib/data';
import ProductCard from '@/components/menu/ProductCard';
import ProductFilter from '@/components/menu/ProductFilter';

export default function MenuContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const [category, setCategory] = useState(initialCategory);

  const filtered = useMemo(() => {
    if (!category) return products;
    return products.filter((p) => p.category === category);
  }, [category]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">咖啡菜单</h1>
      <div className="mb-6">
        <ProductFilter current={category} onChange={setCategory} />
      </div>
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">暂无商品</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
