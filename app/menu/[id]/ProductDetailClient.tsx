'use client';

import { use } from 'react';
import { products } from '@/lib/data';
import ProductDetail from '@/components/menu/ProductDetail';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ProductDetailClient({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-400 text-lg">未找到该商品</p>
        <Link href="/menu" className="text-amber-600 hover:underline mt-4 inline-block">返回菜单</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link href="/menu" className="inline-flex items-center gap-1 text-amber-600 hover:text-amber-700 mb-6 text-sm">
        <ArrowLeft size={16} /> 返回菜单
      </Link>
      <ProductDetail product={product} />
    </div>
  );
}
