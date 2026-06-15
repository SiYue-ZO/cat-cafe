'use client';

interface ProductFilterProps {
  current: string;
  onChange: (category: string) => void;
}

const categories = [
  { key: '', label: '全部' },
  { key: 'coffee', label: '咖啡' },
  { key: 'drink', label: '饮品' },
  { key: 'dessert', label: '甜品' },
];

export default function ProductFilter({ current, onChange }: ProductFilterProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {categories.map((cat) => (
        <button
          key={cat.key}
          onClick={() => onChange(cat.key)}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            current === cat.key
              ? 'bg-amber-500 text-white shadow-md'
              : 'bg-white text-gray-600 border border-gray-200 hover:border-amber-400'
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
