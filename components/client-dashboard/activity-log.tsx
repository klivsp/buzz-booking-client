
import { CalendarDays, Search, User, Heart, History } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { UserActivity } from '@/types/room';

const ACTIVITY_CONFIG = {
  booking: { icon: CalendarDays, color: "bg-blue-50 text-blue-600" },
  search: { icon: Search, color: "bg-purple-50 text-purple-600" },
  review: { icon: User, color: "bg-emerald-50 text-emerald-600" },
  favorite: { icon: Heart, color: "bg-rose-50 text-rose-500" },
  default: { icon: History, color: "bg-slate-50 text-slate-600" }
};

export function ActivityLog({ activities }: { activities: UserActivity[] }) {
  if (!activities?.length) {
    return (
      <div className="p-20 text-center glass rounded-3xl">
        <History className="h-12 w-12 text-slate-300 mx-auto mb-4" />
        <p className="text-slate-500">No activities yet.</p>
      </div>
    );
  }

  return (
    <Card className="border-none glass rounded-3xl overflow-hidden">
      <CardContent className="p-0 divide-y divide-slate-100">
        {activities.map((act) => {
          const config = ACTIVITY_CONFIG[act.type as keyof typeof ACTIVITY_CONFIG] || ACTIVITY_CONFIG.default;
          const Icon = config.icon;

          return (
            <div key={act.id} className="p-6 flex items-start gap-4 hover:bg-white/40 transition-colors">
              <div className={cn("p-3 rounded-2xl shadow-sm", config.color)}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="font-bold text-slate-800">{act.description}</p>
                <p className="text-xs text-slate-400">
                  {format(new Date(act.timestamp), "MMM dd, yyyy 'at' HH:mm")}
                </p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}