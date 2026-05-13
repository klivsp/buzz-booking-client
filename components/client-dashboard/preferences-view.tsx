import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { UserPreferences } from '@/types/room';
import { cn } from '@/lib/utils';

export function PreferencesView({ prefs }: { prefs: UserPreferences }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="border-none glass rounded-3xl p-6 space-y-6">
        <h3 className="text-lg font-bold">Account Settings</h3>
        <div className="space-y-4">
          <SettingRow label="Language" value={prefs.language} />
          <SettingRow label="Currency" value={prefs.currency} />
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-slate-600">Notifications</span>
            <Badge className={prefs.notifications ? "bg-emerald-500" : "bg-slate-500"}>
              {prefs.notifications ? 'Enabled' : 'Disabled'}
            </Badge>
          </div>
        </div>
      </Card>

      <Card className="border-none glass rounded-3xl p-6 space-y-6 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold">Travel Preferences</h3>
          <div className="mt-4">
            <SettingRow label="Travel Type" value={prefs.travelType} capitalize />
          </div>
        </div>
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold">
          Update Preferences
        </Button>
      </Card>
    </div>
  );
}

function SettingRow({ label, value, capitalize }: { label: string, value: string, capitalize?: boolean }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm font-medium text-slate-600">{label}</span>
      <span className={cn("text-sm font-bold", capitalize && "capitalize")}>{value}</span>
    </div>
  );
}