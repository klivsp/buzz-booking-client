import { format } from 'date-fns';
import { Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { StaticImageData } from 'next/image';

type BookingSplitDestinationCardProps = {
  key?: string | number;
  reservation?: {
    id: string;
    propertyImage: string;
    propertyName: string;
    roomType: string;
    status?: string;
    checkIn?: string | Date;
    checkOut?: string | Date;
    totalPrice?: string | number;
  };
  onPostpone?: (id: string) => void;
  onCancel?: (id: string) => void;
  title?: string;
  location?: string;
  category?: string;
  imageSrc?: string | StaticImageData;
  imageAlt?: string;
  rating?: string;
  ratingSubtitle?: string;
  ratingAlign?: 'left' | 'right';
  paymentNote?: string;
  statusLabel?: string;
  size?: 'default' | 'narrow';
  variant?: 'stay' | 'region' | 'feature';
  description?: string;
  readMoreLabel?: string;
  readMoreHref?: string;
  onReadMoreClick?: () => void;
  className?: string;
  onFavoriteClick?: () => void;
  onCardClick?: () => void;
};

const BookingSplitDestinationCard = ({
  reservation,
  onPostpone,
  title,
  location,
  imageSrc,
  statusLabel,
  size = 'default',
  className,
}: BookingSplitDestinationCardProps) => {
  const isNarrow = size === 'narrow';
  const resolvedImageSrc = imageSrc ? (typeof imageSrc === 'string' ? imageSrc : imageSrc.src) : '';
  const res = reservation ?? {
    id: title ?? 'reservation',
    propertyImage: resolvedImageSrc,
    propertyName: title ?? 'Reservation',
    roomType: location ?? '-',
    status: statusLabel,
    totalPrice: '-',
  };

  const badgeClass =
    res.status === 'confirmed'
      ? 'bg-emerald-500 text-white'
      : res.status === 'pending'
        ? 'bg-amber-500 text-white'
        : res.status === 'cancelled'
          ? 'bg-slate-700/80 text-white backdrop-blur-md'
          : 'bg-slate-500 text-white';

  const formatDate = (value?: string | Date) => {
    if (!value) {
      return '-';
    }
    const parsed = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(parsed.getTime())) {
      return '-';
    }
    return format(parsed, 'MMM dd, yyyy');
  };

  return (
    <Card
      {...(isNarrow ? { 'data-carousel-card': '' } : {})}
      className={cn(
        'group overflow-hidden rounded-3xl border-none shadow-lg shadow-slate-200/50 glass',
        isNarrow
          ? 'w-[min(88vw,24rem)] shrink-0 snap-start sm:w-[min(72vw,24.5rem)] lg:w-[calc((100%-2rem)/3)]'
          : 'w-full',
        className
      )}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={res.propertyImage}
          alt={res.propertyName}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute right-4 top-4">
          <Badge className={cn('border-none px-3 py-1 text-[10px] font-bold uppercase tracking-wider', badgeClass)}>
            {res.status ?? 'unknown'}
          </Badge>
        </div>
      </div>
      <CardContent className="space-y-6 p-6">
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-slate-900">{res.propertyName}</h3>
          <p className="flex items-center gap-1 text-sm text-slate-400">
            <MapPin className="h-3.5 w-3.5" />
            {res.roomType}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-2">
            <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">Check-in</span>
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-blue-500" />
              <p className="text-sm font-bold text-slate-900">{formatDate(res.checkIn)}</p>
            </div>
          </div>
          <div className="space-y-2">
            <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">Check-out</span>
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-blue-500" />
              <p className="text-sm font-bold text-slate-900">{formatDate(res.checkOut)}</p>
            </div>
          </div>
        </div>

        <div className="flex items-end justify-between pt-2">
          <div className="space-y-1">
            <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">Total Price</span>
            <p className="text-2xl font-black text-slate-900">€{res.totalPrice ?? '-'}</p>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="rounded-xl text-xs font-bold text-orange-500 hover:bg-orange-50 hover:text-orange-600"
              onClick={() => onPostpone?.(res.id)}
            >
              <Clock className="mr-1.5 h-4 w-4" />
              Postpone
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingSplitDestinationCard;
