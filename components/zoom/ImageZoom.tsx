'use client';

import { useState, useRef, useCallback } from 'react';

interface ImageZoomProps {
  src: string;
  alt: string;
  zoom?: number;
}

export default function ImageZoom({ src, alt, zoom = 2.5 }: ImageZoomProps) {
  const [showZoom, setShowZoom] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const imgRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPosition({ x, y });
  }, []);

  return (
    <div className="relative">
      <div
        ref={imgRef}
        className="aspect-square bg-amber-50 rounded-2xl overflow-hidden cursor-crosshair"
        onMouseEnter={() => setShowZoom(true)}
        onMouseLeave={() => setShowZoom(false)}
        onMouseMove={handleMouseMove}
      >
        <img src={src} alt={alt} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
      </div>
      {showZoom && (
        <div className="absolute top-0 left-full ml-4 w-[400px] h-[400px] border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-xl hidden lg:block">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: `${zoom * 100}%`,
              backgroundPosition: `${position.x}% ${position.y}%`,
              backgroundRepeat: 'no-repeat',
            }}
          />
        </div>
      )}
    </div>
  );
}
