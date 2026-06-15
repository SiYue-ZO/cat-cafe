'use client';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', hover = true }: CardProps) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-md overflow-hidden ${
        hover ? 'hover:shadow-xl hover:scale-105 transition-all duration-300' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
