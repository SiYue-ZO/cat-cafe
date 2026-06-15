'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getItem, setItem } from '@/lib/storage';
import { generateId, timeSlots } from '@/lib/utils';
import type { Reservation } from '@/types';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { Calendar, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ReservationFormProps {
  catId: string;
  catName: string;
}

export default function ReservationForm({ catId, catName }: ReservationFormProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { router.push('/login'); return; }
    if (!date || !timeSlot) return;
    setShowConfirm(true);
  };

  const confirmReservation = () => {
    if (!user) return;
    const reservations = getItem<Reservation[]>('reservations') || [];
    const reservation: Reservation = {
      id: generateId(),
      catId,
      catName,
      userId: user.id,
      date,
      timeSlot,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    reservations.push(reservation);
    setItem('reservations', reservations);
    setShowConfirm(false);
    setShowSuccess(true);
    setDate('');
    setTimeSlot('');
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <>
      <form onSubmit={handleSubmit} className="bg-amber-50 rounded-xl p-4 space-y-4">
        <h3 className="font-bold text-gray-800 flex items-center gap-2">
          <Calendar size={18} className="text-amber-600" />
          预约互动
        </h3>
        <div>
          <label className="block text-sm text-gray-600 mb-1">选择日期</label>
          <input
            type="date"
            min={today}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">选择时间段</label>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => setTimeSlot(slot)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  timeSlot === slot
                    ? 'bg-amber-500 text-white'
                    : 'bg-white border border-gray-300 text-gray-600 hover:border-amber-400'
                }`}
              >
                <Clock size={12} className="inline mr-1" />
                {slot}
              </button>
            ))}
          </div>
        </div>
        <Button type="submit" className="w-full">立即预约</Button>
      </form>

      <Modal open={showConfirm} onClose={() => setShowConfirm(false)} title="确认预约">
        <div className="space-y-3">
          <p className="text-gray-600">确认预约以下信息：</p>
          <div className="bg-amber-50 rounded-lg p-3 space-y-1 text-sm">
            <p><span className="text-gray-500">猫咪：</span>{catName}</p>
            <p><span className="text-gray-500">日期：</span>{date}</p>
            <p><span className="text-gray-500">时间段：</span>{timeSlot}</p>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" className="flex-1" onClick={() => setShowConfirm(false)}>取消</Button>
            <Button className="flex-1" onClick={confirmReservation}>确认</Button>
          </div>
        </div>
      </Modal>

      <Modal open={showSuccess} onClose={() => setShowSuccess(false)} title="预约成功">
        <div className="text-center py-4">
          <div className="text-4xl mb-3">🎉</div>
          <p className="text-gray-600">你已成功预约与 <strong>{catName}</strong> 的互动！</p>
          <p className="text-sm text-gray-400 mt-2">可在个人中心查看预约记录</p>
          <Button className="mt-4" onClick={() => setShowSuccess(false)}>好的</Button>
        </div>
      </Modal>
    </>
  );
}
