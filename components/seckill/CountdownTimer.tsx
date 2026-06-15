'use client';

import { useEffect, useState } from 'react';

interface CountdownTimerProps {
  endTime: string;
  compact?: boolean;
}

export default function CountdownTimer({ endTime, compact = false }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: false });

  useEffect(() => {
    const calc = () => {
      const diff = new Date(endTime).getTime() - Date.now();
      if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
        expired: false,
      };
    };
    setTimeLeft(calc());
    const timer = setInterval(() => setTimeLeft(calc()), 1000);
    return () => clearInterval(timer);
  }, [endTime]);

  if (timeLeft.expired) {
    return <span className={compact ? 'text-xs opacity-60' : 'text-red-500 font-bold'}>已结束</span>;
  }

  const pad = (n: number) => n.toString().padStart(2, '0');

  if (compact) {
    return (
      <span className="text-xs font-mono opacity-80">
        {timeLeft.days > 0 && `${timeLeft.days}天`}
        {pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}
      </span>
    );
  }

  return (
    <div className="flex items-center gap-1">
      {timeLeft.days > 0 && (
        <span className="bg-red-600 text-white text-sm font-bold px-1.5 py-0.5 rounded">{pad(timeLeft.days)}</span>
      )}
      <span className="bg-red-600 text-white text-sm font-bold px-1.5 py-0.5 rounded">{pad(timeLeft.hours)}</span>
      <span className="text-red-600 font-bold">:</span>
      <span className="bg-red-600 text-white text-sm font-bold px-1.5 py-0.5 rounded">{pad(timeLeft.minutes)}</span>
      <span className="text-red-600 font-bold">:</span>
      <span className="bg-red-600 text-white text-sm font-bold px-1.5 py-0.5 rounded">{pad(timeLeft.seconds)}</span>
    </div>
  );
}
