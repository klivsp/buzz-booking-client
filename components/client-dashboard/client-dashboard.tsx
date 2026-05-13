'use client';
import { useState } from 'react';
import { CalendarDays, Heart, History, User } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProfileHeader } from './profile-header';
import { ReservationsView } from './reservations-view';
import { ActivityLog } from './activity-log';
import { PreferencesView } from './preferences-view';
import { FavoritesGrid } from './favourites-grid';
import { ClientDashboardProps } from '@/types/room';


export default function ClientDashboard({ 
  user, 
  properties 
}: Omit<ClientDashboardProps, 'onCancelReservation' | 'onPostponeReservation' | 'onEditProfile'>) {
  const [activeTab, setActiveTab] = useState('reservations');

  const handleCancelReservation = (id: string) => {
    console.log("Cancelling reservation in Client Component:", id);
  };

  const handlePostponeReservation = (id: string, date: Date) => {
    console.log("Postponing reservation:", id, "to", date);
  };

  const handleEditProfile = () => {
    console.log("Opening edit profile modal...");
  };

  const favoriteProperties = properties.filter(p => user.favorites?.includes(p.id) ?? false);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <ProfileHeader 
        user={user} 
        activeTab={activeTab} 
        onEdit={handleEditProfile} 
      />
      <Tabs defaultValue="reservations" className="w-full" onValueChange={setActiveTab}>
        <div className="mb-8 overflow-x-auto -mx-4 px-4 pb-2 md:mx-0 md:px-0 scrollbar-hide">
          <TabsList className="bg-white/50 backdrop-blur-md p-1.5 rounded-3xl border border-white/60 shadow-sm flex w-max lg:w-auto h-auto gap-1">
            <TabsTrigger value="reservations" className="rounded-2xl px-6 py-2.5 lg:px-10 lg:py-3.5 data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-slate-900 text-slate-500 font-bold transition-all flex items-center justify-center">
              <CalendarDays className="mr-2 h-4 w-4 text-slate-400" />
              <span className="hidden sm:inline">My Bookings</span>
              <span className="sm:hidden">Bookings</span>
            </TabsTrigger>
            
            <TabsTrigger value="favorites" className="rounded-2xl px-6 py-2.5 lg:px-10 lg:py-3.5 data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-slate-900 text-slate-500 font-bold transition-all flex items-center justify-center">
              <Heart className="mr-2 h-4 w-4 text-slate-400" />
              Favorites
            </TabsTrigger>

            <TabsTrigger value="activities" className="rounded-2xl px-6 py-2.5 lg:px-10 lg:py-3.5 data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-slate-900 text-slate-500 font-bold transition-all flex items-center justify-center">
              <History className="mr-2 h-4 w-4 text-slate-400" />
              <span className="hidden sm:inline">Activity Log</span>
              <span className="sm:hidden">Activity</span>
            </TabsTrigger>

            <TabsTrigger value="preferences" className="rounded-2xl px-6 py-2.5 lg:px-10 lg:py-3.5 data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-slate-900 text-slate-500 font-bold transition-all flex items-center justify-center">
              <User className="mr-2 h-4 w-4 text-slate-400" />
              <span className="hidden sm:inline">Preferences</span>
              <span className="sm:hidden">Prefs</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="reservations" className="outline-none">
          <ReservationsView 
            reservations={user.reservations} 
            onCancel={handleCancelReservation} 
            onPostpone={handlePostponeReservation} 
          />
        </TabsContent>

        <TabsContent value="favorites" className="outline-none">
          <FavoritesGrid properties={favoriteProperties} />
        </TabsContent>

        <TabsContent value="activities" className="outline-none">
          <ActivityLog activities={user.activities} />
        </TabsContent>

        <TabsContent value="preferences" className="outline-none">
          <PreferencesView prefs={user.preferences} />
        </TabsContent>
      </Tabs>
    </div>
  );
}