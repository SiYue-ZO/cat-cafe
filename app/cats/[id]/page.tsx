import { cats } from '@/lib/data';
import CatDetailClient from './CatDetailClient';

export function generateStaticParams() {
  return cats.map((cat) => ({ id: cat.id }));
}

export default function CatDetailPage({ params }: { params: Promise<{ id: string }> }) {
  return <CatDetailClient params={params} />;
}
