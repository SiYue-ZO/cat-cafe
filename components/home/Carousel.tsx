'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { banners } from '@/lib/data';

export default function Carousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = banners.length;

  const next = useCallback(() => setCurrent((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setCurrent((i) => (i - 1 + total) % total), [total]);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [paused, next]);

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {banners.map((banner) => (
          <div key={banner.id} className="w-full shrink-0 relative">
            <div className="aspect-[3/1] bg-gradient-to-r from-amber-400 to-orange-300 flex items-center justify-center">
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center">
                <div className="px-8 md:px-16 text-white">
                  <h2 className="text-2xl md:text-4xl font-bold mb-2">{banner.title}</h2>
                  <p className="text-sm md:text-lg opacity-90">{banner.subtitle}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/60 rounded-full p-2 text-white hover:text-gray-800 transition-all backdrop-blur-sm">
        <ChevronLeft size={20} />
      </button>
      <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/60 rounded-full p-2 text-white hover:text-gray-800 transition-all backdrop-blur-sm">
        <ChevronRight size={20} />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? 'bg-white scale-125' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
}
