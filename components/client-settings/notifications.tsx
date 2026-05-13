'use client';
import  { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserProfile } from '@/types/room';

interface NotificationSettingsProps {
  user: UserProfile;
}

export default function NotificationSettings({ user }: NotificationSettingsProps) {
  const [notifications, setNotifications] = useState({
    email: user.preferences.notifications,
    push: true,
    sms: false,
    marketing: false,
  });

  return (
    <Card className="border-none glass rounded-3xl">
      <CardHeader className="p-8 pb-4">
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>Choose how you want to be notified about your bookings and activity.</CardDescription>
      </CardHeader>
      <CardContent className="p-8 pt-4 space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-white/40 border border-white/60">
            <div className="space-y-0.5">
              <Label className="text-base font-bold">Email Notifications</Label>
              <p className="text-sm text-slate-500">Receive booking confirmations and updates via email.</p>
            </div>
            <Switch 
              checked={notifications.email} 
              onCheckedChange={(checked) => setNotifications({...notifications, email: checked})} 
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-white/40 border border-white/60">
            <div className="space-y-0.5">
              <Label className="text-base font-bold">Push Notifications</Label>
              <p className="text-sm text-slate-500">Receive real-time alerts on your device.</p>
            </div>
            <Switch 
              checked={notifications.push} 
              onCheckedChange={(checked) => setNotifications({...notifications, push: checked})} 
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-white/40 border border-white/60">
            <div className="space-y-0.5">
              <Label className="text-base font-bold">SMS Notifications</Label>
              <p className="text-sm text-slate-500">Get text messages for urgent booking changes.</p>
            </div>
            <Switch 
              checked={notifications.sms} 
              onCheckedChange={(checked) => setNotifications({...notifications, sms: checked})} 
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-white/40 border border-white/60">
            <div className="space-y-0.5">
              <Label className="text-base font-bold">Marketing Emails</Label>
              <p className="text-sm text-slate-500">Receive news, offers and travel inspiration.</p>
            </div>
            <Switch 
              checked={notifications.marketing} 
              onCheckedChange={(checked) => setNotifications({...notifications, marketing: checked})} 
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
