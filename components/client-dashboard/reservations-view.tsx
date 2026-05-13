import { CalendarDays } from 'lucide-react';
import BookingCard from './booking-card';
import { Reservation } from '@/types/room';

interface ReservationsViewProps {
  reservations: Reservation[];
  onCancel: (id: string) => void;
  onPostpone: (id: string, date: Date) => void;
}

export function ReservationsView({ reservations, onCancel, onPostpone }: ReservationsViewProps) {
  if (!reservations?.length) {
    return (
      <div className="py-20 text-center glass rounded-3xl">
        <CalendarDays className="h-12 w-12 text-slate-300 mx-auto mb-4" />
        <p className="text-slate-500 font-medium">No bookings found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
      {reservations.map((res) => (
        <BookingCard 
          key={res.id} 
          reservation={res} 
          onCancel={onCancel}
          onPostpone={(id) => onPostpone(id, new Date())}
        />
      ))}
    </div>
  );
}