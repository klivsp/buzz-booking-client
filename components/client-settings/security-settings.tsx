'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function SecuritySettings() {
  return (
    <Card className="border-none glass rounded-3xl">
      <CardHeader className="p-8 pb-4">
        <CardTitle>Security Settings</CardTitle>
        <CardDescription>Keep your account secure with these settings.</CardDescription>
      </CardHeader>
      <CardContent className="p-8 pt-4 space-y-8">
        <div className="space-y-4">
          <h3 className="font-bold text-slate-900">Change Password</h3>
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" className="rounded-xl border-slate-200" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" className="rounded-xl border-slate-200" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" className="rounded-xl border-slate-200" />
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <Button className="bg-slate-900 text-white rounded-xl">Update Password</Button>
            </div>
          </div>
        </div>

        <Separator className="bg-slate-100" />

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="font-bold text-slate-900">Two-Factor Authentication</h3>
            <p className="text-sm text-slate-500">Add an extra layer of security to your account.</p>
          </div>
          <Button variant="outline" className="rounded-xl">Enable</Button>
        </div>

        <Separator className="bg-slate-100" />

        <div className="space-y-4">
          <h3 className="font-bold text-red-600">Danger Zone</h3>
          <div className="p-4 rounded-2xl bg-red-50 border border-red-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-0.5">
              <p className="font-bold text-red-900">Delete Account</p>
              <p className="text-sm text-red-700">Once you delete your account, there is no going back. Please be certain.</p>
            </div>
            <Button variant="destructive" className="rounded-xl">Delete Account</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
