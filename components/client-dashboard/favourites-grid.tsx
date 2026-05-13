import { Heart } from 'lucide-react';
import FavoriteCard from './favourite-card';
import { Property } from '@/types/room';

interface FavoritesGridProps {
  properties: Property[];
}

export function FavoritesGrid({ properties }: FavoritesGridProps) {
 
  if (!properties?.length) {
    return (
      <div className="col-span-full py-20 text-center glass rounded-3xl border border-white/50">
        <div className="bg-rose-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Heart className="h-10 w-10 text-rose-300" />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">No favorites yet</h3>
        <p className="text-slate-500 max-w-xs mx-auto">
          Explore our properties and click the heart icon to save the ones you love.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-700">
      {properties.map((property) => (
        <FavoriteCard key={property.id} property={property} />
      ))}
    </div>
  );
}