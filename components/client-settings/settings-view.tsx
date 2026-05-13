'use client';

import { useState } from 'react';
import { User, Bell, Shield, CreditCard, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserProfile } from '@/types/room';
import ProfileSettings from '@/components/client-settings/profile-settings';
import NotificationSettings from '@/components/client-settings/notifications';
import SecuritySettings from '@/components/client-settings/security-settings';
import BillingSettings from '@/components/client-settings/billing-settings';

interface SettingsViewProps {
  user: UserProfile; 
}

export default function SettingsView({ user: initialUser }: SettingsViewProps) {
  const [user, setUser] = useState<UserProfile>(initialUser);

  const handleUpdateUser = (updatedFields: Partial<UserProfile>) => {
    setUser((prev) => ({
      ...prev,
      ...updatedFields,
    }));
    console.log("Local state updated:", updatedFields);
  };

  const handleSaveAll = () => {
    console.log("Saving all changes to server...", user);
    alert("All changes have been saved successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Settings</h1>
          <p className="text-slate-500 text-sm">Manage your account settings and preferences.</p>
        </div>
        <Button 
          onClick={handleSaveAll}
          className="bg-glass-accent hover:bg-blue-700 text-white rounded-xl px-6 h-11 shadow-lg shadow-blue-500/20"
        >
          <Save className="mr-2 h-4 w-4" />
          Save All Changes
        </Button>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <div className="overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
          <TabsList className="bg-white/40 backdrop-blur-md p-1 rounded-2xl border border-glass-border mb-8 flex w-max md:w-full">
            <TabsTrigger 
              value="profile" 
              className="rounded-xl px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm flex-1 flex items-center justify-center transition-all"
            >
              <User className="mr-2 h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger 
              value="notifications" 
              className="rounded-xl px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm flex-1 flex items-center justify-center transition-all"
            >
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger 
              value="security" 
              className="rounded-xl px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm flex-1 flex items-center justify-center transition-all"
            >
              <Shield className="mr-2 h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger 
              value="billing" 
              className="rounded-xl px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm flex-1 flex items-center justify-center transition-all"
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Billing
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="profile" className="space-y-6 outline-none ring-0">
          <ProfileSettings user={user} onUpdateUser={handleUpdateUser} />
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6 outline-none ring-0">
          <NotificationSettings user={user} />
        </TabsContent>

        <TabsContent value="security" className="space-y-6 outline-none ring-0">
          <SecuritySettings />
        </TabsContent>

        <TabsContent value="billing" className="space-y-6 outline-none ring-0">
          <BillingSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}