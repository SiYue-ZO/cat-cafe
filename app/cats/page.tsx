import { Suspense } from 'react';
import CatsContent from './CatsContent';

export default function CatsPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-8 text-center text-gray-400">加载中...</div>}>
      <CatsContent />
    </Suspense>
  );
}
