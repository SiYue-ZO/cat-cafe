'use client';

import type { Cat } from '@/types';
import ImageZoom from '@/components/zoom/ImageZoom';
import ReservationForm from './ReservationForm';

interface CatDetailProps {
  cat: Cat;
}

export default function CatDetail({ cat }: CatDetailProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <ImageZoom src={cat.image} alt={cat.name} />
      </div>
      <div>
        <h1 className="text-3xl font-bold text-gray-800">{cat.name}</h1>
        <div className="flex items-center gap-3 mt-3">
          <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-medium">{cat.breed}</span>
          <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">{cat.gender}</span>
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">{cat.age}</span>
        </div>
        <div className="mt-4">
          <h3 className="font-bold text-gray-700 mb-2">性格特点</h3>
          <p className="text-gray-600">{cat.personality}</p>
        </div>
        <div className="mt-4">
          <h3 className="font-bold text-gray-700 mb-2">详细介绍</h3>
          <p className="text-gray-600 leading-relaxed">{cat.description}</p>
        </div>
        <div className="mt-6">
          {cat.available ? (
            <ReservationForm catId={cat.id} catName={cat.name} />
          ) : (
            <div className="bg-gray-100 text-gray-500 rounded-xl p-4 text-center">
              该猫咪暂时不可预约
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
