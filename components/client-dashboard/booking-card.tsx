import { Calendar as CalendarIcon, MapPin, Clock, XCircle } from 'lucide-react';
import { format, isValid } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Reservation } from '@/types/room';
import { cn } from '@/lib/utils';

interface BookingCardProps {
  reservation: Reservation;
  onPostpone: (id: string) => void;
  onCancel: (id: string) => void;
}

export default function BookingCard({ reservation, onPostpone, onCancel }: BookingCardProps) {
  const { 
    id, 
    propertyName, 
    propertyImage, 
    status, 
    roomType, 
    checkIn, 
    checkOut, 
    totalPrice 
  } = reservation;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return isValid(date) ? format(date, "MMM dd, yyyy") : "Invalid Date";
  };

  return (
    <Card className="overflow-hidden border-none glass rounded-3xl shadow-lg shadow-slate-200/50 group transition-all duration-300 hover:shadow-xl">
      <div className="h-48 relative overflow-hidden">
        <img 
          src={propertyImage || '/placeholder-property.jpg'} 
          alt={propertyName} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 right-4">
          <Badge className={cn(
            "font-bold uppercase tracking-wider text-[10px] px-3 py-1 border-none shadow-sm",
            status === 'confirmed' && "bg-emerald-500 text-white",
            status === 'pending' && "bg-amber-500 text-white",
            status === 'cancelled' && "bg-slate-700/80 text-white backdrop-blur-md",
            status === 'completed' && "bg-blue-500 text-white"
          )}>
            {status}
          </Badge>
        </div>
      </div>

      <CardContent className="p-6 space-y-6">
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-slate-900 line-clamp-1">{propertyName}</h3>
          <p className="text-sm text-slate-400 flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-slate-400" />
            {roomType}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 py-2 border-y border-slate-50">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block">Check-in</span>
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-blue-500" />
              <p className="text-sm font-bold text-slate-900">{formatDate(checkIn)}</p>
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block">Check-out</span>
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-blue-500" />
              <p className="text-sm font-bold text-slate-900">{formatDate(checkOut)}</p>
            </div>
          </div>
        </div>


        <div className="flex items-center justify-between pt-2">
          <div className="space-y-0.5">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block">Total Price</span>
            <p className="text-2xl font-black text-slate-900">€{totalPrice}</p>
          </div>
          
          <div className="flex gap-1">
            {status !== 'cancelled' && (
              <>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-orange-500 hover:text-orange-600 hover:bg-orange-50 rounded-xl font-bold text-xs h-9"
                  onClick={() => onPostpone(id)}
                >
                  <Clock className="mr-1.5 h-4 w-4" />
                  Postpone
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-rose-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl font-bold text-xs h-9"
                  onClick={() => onCancel(id)}
                >
                  <XCircle className="mr-1.5 h-4 w-4" />
                  Cancel
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}