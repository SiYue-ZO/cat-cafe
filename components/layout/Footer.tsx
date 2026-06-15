import { Cat } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-amber-900 text-amber-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 text-amber-300 font-bold text-lg mb-3">
              <Cat size={24} />
              喵星咖啡
            </div>
            <p className="text-amber-200/70 text-sm leading-relaxed">
              一家有温度的猫咖，让你在咖啡香中与可爱的猫咪度过悠闲时光。来喵星，治愈你的每一天。
            </p>
          </div>
          <div>
            <h4 className="font-bold text-amber-300 mb-3">快速链接</h4>
            <div className="flex flex-col gap-2 text-sm text-amber-200/70">
              <Link href="/cats" className="hover:text-amber-300 transition-colors">猫咪信息</Link>
              <Link href="/menu" className="hover:text-amber-300 transition-colors">咖啡菜单</Link>
              <Link href="/seckill" className="hover:text-amber-300 transition-colors">限时秒杀</Link>
              <Link href="/messages" className="hover:text-amber-300 transition-colors">留言板</Link>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-amber-300 mb-3">联系我们</h4>
            <div className="flex flex-col gap-2 text-sm text-amber-200/70">
              <span>地址：喵星路88号 喵星咖啡</span>
              <span>电话：400-CAT-CAFE</span>
              <span>营业时间：10:00 - 21:00</span>
            </div>
          </div>
        </div>
        <div className="border-t border-amber-800 mt-8 pt-6 text-center text-sm text-amber-200/50">
          © 2024 喵星咖啡 MeowStar Café. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
