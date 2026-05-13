'use client';
import React, { useState } from 'react';
import { Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserProfile } from '@/types/room';

interface ProfileSettingsProps {
  user: UserProfile;
  onUpdateUser: (updatedUser: Partial<UserProfile>) => void;
}

export default function ProfileSettings({ user, onUpdateUser }: ProfileSettingsProps) {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: '+355 69 123 4567',
    bio: 'Travel enthusiast and architecture lover. Always looking for the next unique stay.',
  });

  const handleSaveProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onUpdateUser({ name: formData.name, email: formData.email });
    alert('Profile updated successfully!');
  };

  return (
    <Card className="border-none glass rounded-3xl overflow-hidden">
      <CardHeader className="p-8 pb-4">
        <CardTitle>Public Profile</CardTitle>
        <CardDescription>This information will be visible to hosts and other travelers.</CardDescription>
      </CardHeader>
      <CardContent className="p-8 pt-4 space-y-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative group">
            <Avatar className="h-28 w-28 border-4 border-white shadow-xl">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="text-2xl">{user.name[0]}</AvatarFallback>
            </Avatar>
            <button className="absolute bottom-0 right-0 bg-glass-accent text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform">
              <Camera className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-bold text-lg">Profile Picture</h3>
            <p className="text-sm text-slate-500">JPG, GIF or PNG. Max size of 2MB.</p>
            <div className="flex gap-2 pt-2 justify-center md:justify-start">
              <Button variant="outline" size="sm" className="rounded-lg">Upload New</Button>
              <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg">Remove</Button>
            </div>
          </div>
        </div>

        <Separator className="bg-slate-100" />

        <form onSubmit={handleSaveProfile} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="rounded-xl border-slate-200 focus:ring-glass-accent"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                value={formData.email} 
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="rounded-xl border-slate-200 focus:ring-glass-accent"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                value={formData.phone} 
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="rounded-xl border-slate-200 focus:ring-glass-accent"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Preferred Language</Label>
              <Select defaultValue={user.preferences.language}>
                <SelectTrigger className="rounded-xl border-slate-200">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Albanian">Albanian</SelectItem>
                  <SelectItem value="Italian">Italian</SelectItem>
                  <SelectItem value="German">German</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <textarea 
              id="bio"
              className="w-full min-h-30 rounded-xl border border-slate-200 p-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all bg-white/50"
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
            />
            <p className="text-xs text-slate-400">Brief description for your profile. Max 250 characters.</p>
          </div>

          <div className="flex justify-end">
            <Button type="submit" className="bg-slate-900 text-white hover:bg-slate-800 rounded-xl px-8 h-11">
              Update Profile
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
