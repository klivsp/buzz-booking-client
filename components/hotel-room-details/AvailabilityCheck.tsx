'use client'

import { useState } from 'react';
import { Calendar as CalendarIcon, Users, Search } from 'lucide-react';
import { format } from 'date-fns';
import { Button, buttonVariants } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import type { DateRange } from 'react-day-picker';

export default function AvailabilityChecker() {
    const [date, setDate] = useState<DateRange | undefined>();
    const [guests, setGuests] = useState(2);

    return (
        <div className="glass rounded-2xl p-6 shadow-xl shadow-slate-200/50 space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
                <Search className="h-5 w-5 text-glass-accent" />
                Check Availability
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Dates</label>
                    <Popover>
                        <PopoverTrigger
                            className={cn(
                                buttonVariants({ variant: "outline" }),
                                "w-full justify-start text-left font-normal h-12 rounded-xl border-slate-200 bg-white/50",
                                !date && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date?.from ? (
                                date.to ? (
                                    <>
                                        {format(date.from, "LLL dd")} - {format(date.to, "LLL dd")}
                                    </>
                                ) : (
                                    format(date.from, "LLL dd")
                                )
                            ) : (
                                <span>Select dates</span>
                            )}
                        </PopoverTrigger>
                        <PopoverContent
                            className="w-auto p-0"
                            align="start"
                            onInteractOutside={(event) => {
                                if (date?.from && !date?.to) {
                                    event.preventDefault();
                                }
                            }}
                        >
                            <Calendar
                                mode="range"
                                defaultMonth={date?.from}
                                selected={date}
                                onSelect={setDate}
                                numberOfMonths={1}
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Guests</label>
                    <div className="flex items-center gap-2 h-12 px-4 rounded-xl border border-slate-200 bg-white/50">
                        <Users className="h-4 w-4 text-slate-400" />
                        <select
                            value={guests}
                            onChange={(e) => setGuests(Number(e.target.value))}
                            className="bg-transparent border-none focus:ring-0 text-sm w-full outline-none"
                        >
                            {[1, 2, 3, 4, 5, 6].map(n => (
                                <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <Button className="h-12 w-full rounded-xl bg-blue-600 font-bold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-600">
                Check Availability
            </Button>
        </div>
    );
}