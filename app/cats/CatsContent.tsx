'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { cats } from '@/lib/data';
import CatCard from '@/components/cats/CatCard';
import { Search } from 'lucide-react';

export default function CatsContent() {
  const searchParams = useSearchParams();
  const breedFilter = searchParams.get('breed') || '';
  const [search, setSearch] = useState('');

  const filteredCats = useMemo(() => {
    return cats.filter((cat) => {
      if (breedFilter && cat.breed !== breedFilter) return false;
      if (search && !cat.name.includes(search) && !cat.breed.includes(search)) return false;
      return true;
    });
  }, [breedFilter, search]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">猫咪信息</h1>
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜索猫咪名字或品种..."
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
          />
        </div>
        {breedFilter && (
          <span className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-lg">
            筛选：{breedFilter}
          </span>
        )}
      </div>
      {filteredCats.length === 0 ? (
        <div className="text-center py-16 text-gray-400">暂无匹配的猫咪</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCats.map((cat) => (
            <CatCard key={cat.id} cat={cat} />
          ))}
        </div>
      )}
    </div>
  );
}
