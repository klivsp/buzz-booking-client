"use client"

import { useState } from "react"
import { 
  User, Bell, Shield, CreditCard, Camera, Trash2, Plus, 
  Mail, Phone, Lock, Download, Globe, ShieldCheck 
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

// --- TYPES ---
type Profile = {
  fullName: string
  email: string
  phone: string
  language: string
  bio: string
  avatar?: string
}

type Notifications = {
  emailBookings: boolean
  emailPromotions: boolean
  smsBookings: boolean
  smsReminders: boolean
}

interface SettingsTabsProps {
  defaultProfile: Profile
  defaultNotifications: Notifications
  onUpdateUser?: (updatedUser: Partial<Profile>) => void
}

export function SettingsTabs({ defaultProfile, defaultNotifications, onUpdateUser }: SettingsTabsProps) {
  // State management for Profile
  const [formData, setFormData] = useState<Profile>({
    fullName: defaultProfile?.fullName || '',
    email: defaultProfile?.email || '',
    phone: defaultProfile?.phone || '+355 69 123 4567',
    language: defaultProfile?.language || 'English',
    bio: defaultProfile?.bio || '',
    avatar: defaultProfile?.avatar
  })

  // State management for Notifications
  const [notifications, setNotifications] = useState<Notifications>(defaultNotifications || {
    emailBookings: true,
    emailPromotions: false,
    smsBookings: true,
    smsReminders: true
  })

  // State management for Security (Controlled Inputs)
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' })

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdateUser?.(formData)
    alert('Profile updated successfully!')
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-10 md:px-8">
      <Tabs defaultValue="profile" className="space-y-10">
        
        {/* HEADER & NAVIGATION */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between border-b pb-8 ">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Account Settings</h1>
            <p className="text-slate-500 mt-1">Manage your professional presence and security preferences.</p>
          </div>
          
          <TabsList className="h-12 p-1 bg-slate-100/80 backdrop-blur-sm rounded-xl border border-slate-200 w-full lg:w-auto grid grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="profile" className="px-4 py-2 gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">
              <User className="h-4 w-4" /> <span className="hidden md:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="px-4 py-2 gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">
              <Bell className="h-4 w-4" /> <span className="hidden md:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="px-4 py-2 gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">
              <Shield className="h-4 w-4" /> <span className="hidden md:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger value="billing" className="px-4 py-2 gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">
              <CreditCard className="h-4 w-4" /> <span className="hidden md:inline">Billing</span>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* --- PROFILE TAB --- */}
        <TabsContent value="profile" className="outline-none">
          <Card className="border-none shadow-2xl shadow-slate-200/60 bg-white/70 backdrop-blur-md rounded-[2.5rem] overflow-hidden">
            <CardHeader className="p-8 md:p-12 pb-6">
              <CardTitle className="text-2xl font-bold">Public Profile</CardTitle>
              <CardDescription className="text-base">This information will be visible to hosts and travelers.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 md:p-12 pt-0 space-y-10">
              
              {/* Avatar Section */}
              <div className="flex flex-col md:flex-row items-center gap-8 bg-slate-50/50 p-8 rounded-[2rem] border border-slate-100">
                <div className="relative group">
                  <Avatar className="h-32 w-32 border-4 border-white shadow-2xl transition-transform duration-300 group-hover:scale-105">
                    <AvatarImage src={formData.avatar} />
                    <AvatarFallback className="text-3xl bg-slate-200">{formData.fullName[0] || 'U'}</AvatarFallback>
                  </Avatar>
                  <button className="absolute bottom-1 right-1 bg-slate-900 text-white p-2.5 rounded-full shadow-lg hover:bg-slate-800 transition-all">
                    <Camera className="h-5 w-5" />
                  </button>
                </div>
                <div className="text-center md:text-left space-y-2">
                  <h3 className="text-lg font-bold">Profile Picture</h3>
                  <p className="text-sm text-slate-500 max-w-xs">JPG, GIF or PNG. Max size of 2MB.</p>
                  <div className="flex gap-3 justify-center md:justify-start pt-2">
                    <Button size="sm" className="rounded-xl px-6 bg-slate-900">Upload New</Button>
                    <Button size="sm" variant="ghost" className="text-destructive hover:bg-red-50 rounded-xl px-6">Remove</Button>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="space-y-2.5">
                    <Label htmlFor="name" className="font-semibold ml-1">Full Name</Label>
                    <Input 
                      id="name" 
                      value={formData.fullName} 
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      className="h-12 rounded-2xl border-slate-200" 
                    />
                  </div>
                  <div className="space-y-2.5">
                    <Label htmlFor="email" className="font-semibold ml-1">Email Address</Label>
                    <div className="relative">
                      <Input id="email" readOnly value={formData.email} className="h-12 rounded-2xl border-slate-200 bg-slate-50 pl-10 text-slate-400 cursor-not-allowed" />
                      <Mail className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-400" />
                    </div>
                  </div>
                  <div className="space-y-2.5">
                    <Label htmlFor="phone" className="font-semibold ml-1">Phone Number</Label>
                    <div className="relative">
                      <Input 
                        id="phone" 
                        value={formData.phone} 
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="h-12 rounded-2xl border-slate-200 pl-10" 
                      />
                      <Phone className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-400" />
                    </div>
                  </div>
                  <div className="space-y-2.5">
                    <Label htmlFor="language" className="font-semibold ml-1">Preferred Language</Label>
                    <Select value={formData.language} onValueChange={(v) => setFormData({...formData, language: v})}>
                      <SelectTrigger className="h-12 rounded-2xl border-slate-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Albanian">Albanian</SelectItem>
                        <SelectItem value="Italian">Italian</SelectItem>
                        <SelectItem value="German">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-2 space-y-2.5">
                    <Label htmlFor="bio" className="font-semibold ml-1">Bio</Label>
                    <textarea 
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => setFormData({...formData, bio: e.target.value})}
                      className="w-full min-h-30 rounded-2xl border border-slate-200 p-4 text-sm focus:outline-none focus:ring-4 focus:ring-slate-900/5 transition-all bg-white/50"
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <Button type="submit" className="h-12 px-10 rounded-2xl bg-slate-900 hover:bg-slate-800 shadow-lg">Update Profile</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- NOTIFICATIONS TAB --- */}
        <TabsContent value="notifications" className="outline-none">
          <Card className="border-none shadow-2xl shadow-slate-200/60 bg-white/70 rounded-[2.5rem] overflow-hidden">
            <CardHeader className="p-8 md:p-12 pb-6">
              <CardTitle className="text-2xl">Notification Preferences</CardTitle>
              <CardDescription className="text-base">Manage how you receive alerts about bookings and promotions.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 md:p-12 pt-0 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { id: 'emailBookings', title: 'Booking Confirmations', desc: 'Receive emails about your stays.' },
                { id: 'emailPromotions', title: 'Special Offers', desc: 'New deals and travel inspiration.' },
                { id: 'smsBookings', title: 'SMS Critical Alerts', desc: 'Urgent updates about your trips.' },
                { id: 'smsReminders', title: 'Check-in Reminders', desc: 'Stay on track with your schedule.' },
              ].map((item) => (
                <div key={item.id} className="flex items-center justify-between p-6 rounded-[2rem] bg-slate-50/50 border border-slate-100">
                  <div className="space-y-1">
                    <Label className="text-base font-bold">{item.title}</Label>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                  <Switch 
                    checked={notifications[item.id as keyof Notifications]} 
                    onCheckedChange={(v) => setNotifications({...notifications, [item.id]: v})}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- SECURITY TAB --- */}
        <TabsContent value="security" className="outline-none">
          <Card className="border-none shadow-2xl shadow-slate-200/60 bg-white/70 rounded-[2.5rem] overflow-hidden">
            <CardHeader className="p-8 md:p-12 pb-6">
              <CardTitle className="text-2xl">Security Settings</CardTitle>
              <CardDescription className="text-base">Protect your account and update your credentials.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 md:p-12 pt-0 space-y-12">
              
              <div className="space-y-6">
                <h3 className="text-lg font-bold flex items-center gap-2"><Lock className="h-5 w-5" /> Change Password</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2.5 md:col-span-2 lg:col-span-1">
                    <Label className="ml-1">Current Password</Label>
                    <Input 
                      type="password" 
                      value={passwords.current}
                      onChange={(e) => setPasswords({...passwords, current: e.target.value})}
                      className="h-12 rounded-2xl border-slate-200" 
                    />
                  </div>
                  <div className="space-y-2.5">
                    <Label className="ml-1">New Password</Label>
                    <Input 
                      type="password" 
                      value={passwords.new}
                      onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                      className="h-12 rounded-2xl border-slate-200" 
                    />
                  </div>
                  <div className="space-y-2.5">
                    <Label className="ml-1">Confirm New Password</Label>
                    <Input 
                      type="password" 
                      value={passwords.confirm}
                      onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                      className="h-12 rounded-2xl border-slate-200" 
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button className="h-11 px-8 rounded-xl bg-slate-900">Update Password</Button>
                </div>
              </div>

              <Separator />

              <div className="flex flex-col md:flex-row md:items-center justify-between p-8 rounded-[2rem] bg-indigo-50/50 border border-indigo-100 gap-6">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-indigo-900 flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5" /> Two-Factor Authentication
                  </h3>
                  <p className="text-sm text-indigo-700/70 max-w-md">Add an additional layer of security to your account by requiring a code during login.</p>
                </div>
                <Button variant="outline" className="rounded-xl border-indigo-200 text-indigo-900 hover:bg-indigo-100 px-8">Enable 2FA</Button>
              </div>

              <div className="p-8 rounded-[2rem] bg-red-50 border border-red-100 space-y-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-red-900">Danger Zone</h3>
                  <p className="text-sm text-red-700/70">Permanently delete your account and all associated data.</p>
                </div>
                <Button variant="destructive" className="rounded-xl px-8 font-semibold">Delete Account</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- BILLING TAB --- */}
        <TabsContent value="billing" className="outline-none">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            <Card className="lg:col-span-2 border-none shadow-2xl shadow-slate-200/60 bg-white/70 rounded-[2.5rem]">
              <CardHeader className="p-8 md:p-12 pb-6">
                <CardTitle className="text-2xl">Payment Methods</CardTitle>
                <CardDescription>Securely manage your credit cards and billing info.</CardDescription>
              </CardHeader>
              <CardContent className="p-8 md:p-12 pt-0 space-y-6">
                <div className="flex items-center justify-between p-6 rounded-[2rem] bg-slate-900 text-white shadow-xl group">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-9 bg-white/20 rounded-lg flex items-center justify-center font-black tracking-widest text-[10px]">VISA</div>
                    <div>
                      <p className="font-bold">Visa ending in 4242</p>
                      <p className="text-xs text-white/50">Expiry 12/28</p>
                    </div>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/10"><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
                <Button variant="outline" className="w-full h-24 border-dashed border-2 border-slate-200 rounded-[2rem] text-slate-400 hover:border-slate-900 hover:text-slate-900 transition-all flex flex-col gap-2">
                  <Plus className="h-6 w-6" />
                  <span className="font-bold text-sm">Add New Payment Method</span>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-none shadow-2xl shadow-slate-200/60 bg-slate-900 rounded-[2.5rem] text-white overflow-hidden">
              <CardHeader className="p-8">
                <CardTitle className="text-white">Billing History</CardTitle>
                <CardDescription className="text-slate-400">Your recent transactions.</CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-0 space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors group">
                    <div className="space-y-1">
                      <p className="text-sm font-bold tracking-tight">Invoice #INV-00{i}</p>
                      <p className="text-[10px] text-slate-400 uppercase">May {10+i}, 2026</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-black">€{120 * i}</span>
                      <Button size="icon" variant="ghost" className="text-white/40 hover:text-white"><Download className="h-4 w-4" /></Button>
                    </div>
                  </div>
                ))}
                <Button className="w-full mt-6 bg-white text-slate-900 hover:bg-slate-100 rounded-2xl h-12 font-bold transition-all">View Full History</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}