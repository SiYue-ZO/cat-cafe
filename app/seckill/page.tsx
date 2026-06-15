import { Zap } from 'lucide-react';
import SeckillCard from '@/components/seckill/SeckillCard';

export default function SeckillPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-red-500 text-white p-2 rounded-xl">
          <Zap size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">限时秒杀</h1>
          <p className="text-sm text-gray-500">手慢无！超值优惠限时抢购</p>
        </div>
      </div>
      <SeckillCard />
    </div>
  );
}
