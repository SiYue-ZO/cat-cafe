'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { products } from '@/lib/data';
import ProductCard from '@/components/menu/ProductCard';
import ProductFilter from '@/components/menu/ProductFilter';
import { Search } from 'lucide-react';

export default function MenuContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const [category, setCategory] = useState(initialCategory);
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (category && p.category !== category) return false;
      if (search && !p.name.includes(search) && !(p.tags || []).some(t => t.includes(search))) return false;
      return true;
    });
  }, [category, search]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">咖啡菜单</h1>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜索商品名称或标签..."
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
          />
        </div>
        <ProductFilter current={category} onChange={setCategory} />
      </div>
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">暂无匹配的商品</div>
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
