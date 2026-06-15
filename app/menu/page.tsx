import { Suspense } from 'react';
import MenuContent from './MenuContent';

export default function MenuPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-8 text-center text-gray-400">加载中...</div>}>
      <MenuContent />
    </Suspense>
  );
}
