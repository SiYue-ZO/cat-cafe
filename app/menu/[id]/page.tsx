import { products } from '@/lib/data';
import ProductDetailClient from './ProductDetailClient';

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  return <ProductDetailClient params={params} />;
}
