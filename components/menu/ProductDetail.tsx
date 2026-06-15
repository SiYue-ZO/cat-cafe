'use client';

import type { Product } from '@/types';
import { formatPrice, categoryLabels } from '@/lib/utils';
import ImageZoom from '@/components/zoom/ImageZoom';
import QuantitySelector from '@/components/ui/QuantitySelector';
import Button from '@/components/ui/Button';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { ShoppingCart, Zap } from 'lucide-react';

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const displayPrice = product.isSeckill && product.seckillPrice ? product.seckillPrice : product.price;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <ImageZoom src={product.image} alt={product.name} />
      </div>
      <div>
        <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
        <div className="flex items-center gap-3 mt-3">
          <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-medium">
            {categoryLabels[product.category]}
          </span>
          {product.isSeckill && (
            <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
              <Zap size={14} /> 限时秒杀
            </span>
          )}
        </div>
        <div className="mt-4">
          {product.isSeckill && product.seckillPrice ? (
            <div className="flex items-center gap-3">
              <span className="text-red-500 font-bold text-3xl">{formatPrice(product.seckillPrice)}</span>
              <span className="text-gray-400 text-lg line-through">{formatPrice(product.price)}</span>
            </div>
          ) : (
            <span className="text-amber-600 font-bold text-3xl">{formatPrice(product.price)}</span>
          )}
        </div>
        <p className="text-gray-600 mt-4 leading-relaxed">{product.description}</p>
        {product.tags && (
          <div className="flex gap-2 mt-4 flex-wrap">
            {product.tags.map((tag) => (
              <span key={tag} className="text-sm bg-amber-50 text-amber-600 px-2 py-1 rounded-lg">{tag}</span>
            ))}
          </div>
        )}
        <div className="mt-6 flex items-center gap-4">
          <span className="text-sm text-gray-600">数量</span>
          <QuantitySelector quantity={quantity} onChange={setQuantity} />
        </div>
        <div className="mt-6">
          <Button
            onClick={handleAddToCart}
            className="w-full sm:w-auto flex items-center gap-2 justify-center"
            size="lg"
          >
            <ShoppingCart size={18} />
            {added ? '已加入购物车！' : '加入购物车'}
          </Button>
        </div>
      </div>
    </div>
  );
}
