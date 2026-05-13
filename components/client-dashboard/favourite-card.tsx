import { MapPin, Star, ArrowUpRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Property } from '@/types/room';
import { Heart } from 'lucide-react';

interface FavoriteCardProps {
  property: Property;
}

export default function FavoriteCard({ property }: FavoriteCardProps) {
  return (
    <Card className="group overflow-hidden border-none glass rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-500">
      <div className="relative h-64 overflow-hidden">
        <img
          src={property.images[0] || '/placeholder-property.jpg'}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
    
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-2xl flex items-center gap-1.5 shadow-sm">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span className="text-xs font-black text-slate-800">{property.rating}</span>
        </div>

        <button className="absolute top-4 right-4 p-2.5 bg-rose-500 text-white rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95">
          <Heart className="h-4 w-4 fill-current" />
        </button>
      </div>

    
      <div className="p-6 space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {property.title}
          </h3>
          <div className="flex items-center gap-1 text-slate-400">
            <MapPin className="h-3.5 w-3.5" />
            <span className="text-xs font-medium">{property.location}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div>
            <span className="text-2xl font-black text-slate-900">€{property.pricePerNight}</span>
            <span className="text-xs text-slate-400 font-bold ml-1 uppercase tracking-tighter">/ night</span>
          </div>
          
          <Button size="sm" className="rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs px-4 group/btn">
            View
            <ArrowUpRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </Button>
        </div>
      </div>
    </Card>
  );
}