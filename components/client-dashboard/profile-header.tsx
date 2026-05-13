import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { UserProfile } from '@/types/room';

interface ProfileHeaderProps {
  user: UserProfile;
  activeTab: string;
  onEdit: () => void;
}

export function ProfileHeader({ user, activeTab, onEdit }: ProfileHeaderProps) {
  return (
    <div className="glass rounded-[2.5rem] p-6 lg:p-10 flex flex-col lg:flex-row items-center gap-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full -mr-32 -mt-32 blur-3xl" />
      
      {/* Responsive Avatar: 24 on mobile, 32 on desktop */}
      <Avatar className="h-24 w-24 lg:h-32 lg:w-32 border-4 border-white shadow-2xl shrink-0 relative z-10">
        <AvatarImage src={user.avatar} />
        <AvatarFallback className="bg-slate-100 text-3xl">{user.name[0]}</AvatarFallback>
      </Avatar>
      
      <div className="text-center lg:text-left space-y-4 flex-1 relative z-10">
        <div className="space-y-2">
          <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-slate-900">
            {activeTab === 'favorites' ? 'My Favorites' : user.name}
          </h2>
          <p className="text-base text-slate-500 font-medium">{user.email}</p>
        </div>
        <div className="flex flex-wrap justify-center lg:justify-start gap-2">
           <Badge variant="secondary" className="bg-blue-100/50 text-blue-600 rounded-full px-4">
             {user.preferences.travelType} traveler
           </Badge>
        </div>
      </div>
      
      <Button onClick={onEdit} variant="outline" className="rounded-2xl h-11 font-bold">
        <Settings className="mr-2 h-4 w-4" />
        <span className="lg:hidden">Edit</span>
        <span className="hidden lg:inline">Edit Profile</span>
      </Button>
    </div>
  );
}