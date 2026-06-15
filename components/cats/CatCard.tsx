'use client';

import Link from 'next/link';
import type { Cat } from '@/types';
import Card from '@/components/ui/Card';

interface CatCardProps {
  cat: Cat;
}

export default function CatCard({ cat }: CatCardProps) {
  return (
    <Link href={`/cats/${cat.id}`}>
      <Card>
        <div className="aspect-square bg-amber-50 relative overflow-hidden">
          <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          {!cat.available && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-bold text-sm">暂不可约</div>
          )}
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-800">{cat.name}</h3>
            <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">{cat.breed}</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">{cat.gender} · {cat.age}</p>
          <p className="text-sm text-gray-400 mt-1">{cat.personality}</p>
        </div>
      </Card>
    </Link>
  );
}
