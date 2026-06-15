'use client';

import { use } from 'react';
import { cats } from '@/lib/data';
import CatDetail from '@/components/cats/CatDetail';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function CatDetailClient({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const cat = cats.find((c) => c.id === id);

  if (!cat) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-400 text-lg">未找到该猫咪</p>
        <Link href="/cats" className="text-amber-600 hover:underline mt-4 inline-block">返回猫咪列表</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link href="/cats" className="inline-flex items-center gap-1 text-amber-600 hover:text-amber-700 mb-6 text-sm">
        <ArrowLeft size={16} /> 返回猫咪列表
      </Link>
      <CatDetail cat={cat} />
    </div>
  );
}
