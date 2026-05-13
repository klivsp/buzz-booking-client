'use client'
import { Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function BillingSettings() {
  return (
    <Card className="border-none glass rounded-3xl">
      <CardHeader className="p-8 pb-4">
        <CardTitle>Payment Methods</CardTitle>
        <CardDescription>Manage your saved payment methods and billing information.</CardDescription>
      </CardHeader>
      <CardContent className="p-8 pt-4 space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-5 rounded-2xl bg-white/40 border border-white/60">
            <div className="flex items-center gap-4">
              <div className="w-12 h-8 bg-slate-900 rounded flex items-center justify-center text-[10px] text-white font-bold uppercase">
                Visa
              </div>
              <div>
                <p className="font-bold text-slate-900">Visa ending in 4242</p>
                <p className="text-xs text-slate-500">Expires 12/2025</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="text-slate-500 rounded-lg">Edit</Button>
              <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 rounded-lg">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Button variant="outline" className="w-full h-14 border-dashed border-2 border-slate-200 rounded-2xl text-slate-500 hover:border-glass-accent hover:text-glass-accent transition-all">
            <Plus className="mr-2 h-4 w-4" />
            Add New Payment Method
          </Button>
        </div>

        <Separator className="bg-slate-100" />

        <div className="space-y-4">
          <h3 className="font-bold text-slate-900">Billing History</h3>
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 text-sm">
                <div className="space-y-0.5">
                  <p className="font-bold">Invoice #INV-00{i}</p>
                  <p className="text-xs text-slate-500">April {10 + i}, 2026</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold">€{120 * i}.00</span>
                  <Button variant="ghost" size="sm" className="text-glass-accent font-bold rounded-lg">Download</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
