import { useEffect, useRef, useState } from 'react';
import BookingActionButton from '@/components/client-booking/BookingActionButton';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarDays, MapPin, Minus, Plus, Users } from 'lucide-react';
import { type DateRange } from 'react-day-picker';

const BookingSearchBar = () => {
  const destinations = ['Roma', 'Tirane'];
  const guestOptions = [
    { key: 'adults', label: 'Adults', subtitle: '(18+ years)', min: 1 },
    { key: 'teens', label: 'Teens', subtitle: '(13-17 years)', min: 0 },
    { key: 'children', label: 'Children', subtitle: '(3-12 years)', min: 0 },
    { key: 'infants', label: 'Infants', subtitle: '(0-2 years)', min: 0 },
  ] as const;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isPinned, setIsPinned] = useState(false);
  const [wrapperHeight, setWrapperHeight] = useState(0);
  const [floatingStyles, setFloatingStyles] = useState({ left: 0, width: 0 });
  const [destinationQuery, setDestinationQuery] = useState('');
  const [isDestinationOpen, setIsDestinationOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isGuestsOpen, setIsGuestsOpen] = useState(false);
  const [stayDateRange, setStayDateRange] = useState<DateRange | undefined>();
  const [guestCounts, setGuestCounts] = useState({
    adults: 1,
    teens: 0,
    children: 0,
    infants: 0,
  });

  const filteredDestinations = destinations.filter((destination) =>
    destination.toLowerCase().includes(destinationQuery.toLowerCase()),
  );

  const dateRangeLabel =
    stayDateRange?.from && stayDateRange?.to
      ? `${format(stayDateRange.from, 'dd MMM')} - ${format(stayDateRange.to, 'dd MMM')}`
      : 'Select dates';

  const fromLabel = stayDateRange?.from ? format(stayDateRange.from, 'M/d/yy') : '...';
  const toLabel = stayDateRange?.to ? format(stayDateRange.to, 'M/d/yy') : '...';
  const guestsLabel = [
    guestCounts.adults ? `${guestCounts.adults} adult${guestCounts.adults > 1 ? 's' : ''}` : null,
    guestCounts.teens ? `${guestCounts.teens} teen${guestCounts.teens > 1 ? 's' : ''}` : null,
    guestCounts.children ? `${guestCounts.children} child${guestCounts.children > 1 ? 'ren' : ''}` : null,
    guestCounts.infants ? `${guestCounts.infants} infant${guestCounts.infants > 1 ? 's' : ''}` : null,
  ]
    .filter(Boolean)
    .join(', ');

  const updateGuestCount = (key: keyof typeof guestCounts, min: number, change: number) => {
    setGuestCounts((prev) => ({
      ...prev,
      [key]: Math.max(min, prev[key] + change),
    }));
  };

  useEffect(() => {
    const headerOffset = 96;
    const mq = window.matchMedia('(min-width: 1024px)');

    const updatePosition = () => {
      if (!wrapperRef.current) {
        return;
      }

      const { left, top, width, height } = wrapperRef.current.getBoundingClientRect();

      setWrapperHeight(height);
      setFloatingStyles({ left, width });

      if (!mq.matches) {
        setIsPinned(false);
        return;
      }

      setIsPinned(top <= headerOffset);
    };

    updatePosition();
    window.addEventListener('scroll', updatePosition, { passive: true });
    window.addEventListener('resize', updatePosition);
    mq.addEventListener('change', updatePosition);

    return () => {
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
      mq.removeEventListener('change', updatePosition);
    };
  }, []);

  return (
    <div ref={wrapperRef} style={isPinned ? { minHeight: wrapperHeight } : undefined}>
      <div
        className={cn('transition-all duration-200', isPinned && 'fixed top-24 z-30')}
        style={
          isPinned
            ? {
                left: floatingStyles.left,
                width: floatingStyles.width,
              }
            : undefined
        }
      >
        <div className="rounded-3xl border border-white/70 bg-white/95 p-3 shadow-2xl backdrop-blur-sm md:p-4">
          <div className="grid gap-3 lg:grid-cols-[1.25fr_1fr_1fr_auto]">
            <label className="group relative flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
              <MapPin className="h-4 w-4 text-slate-400 group-focus-within:text-blue-600" />
              <div className="w-full">
                <span className="block text-[11px] font-semibold uppercase tracking-wide text-slate-400">Destination</span>
                <input
                  className="h-6 w-full border-none p-0 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
                  value={destinationQuery}
                  onChange={(event) => {
                    setDestinationQuery(event.target.value);
                    setIsDestinationOpen(true);
                  }}
                  onFocus={() => setIsDestinationOpen(true)}
                  onBlur={() => {
                    setTimeout(() => setIsDestinationOpen(false), 120);
                  }}
                  placeholder="Where are you going?"
                  type="text"
                />
                {isDestinationOpen && destinationQuery.trim() && filteredDestinations.length > 0 ? (
                  <div className="absolute left-0 top-full z-20 mt-2 w-full rounded-xl border border-slate-200 bg-white p-1 shadow-lg">
                    {filteredDestinations.map((destination) => (
                      <button
                        key={destination}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100"
                        onMouseDown={() => {
                          setDestinationQuery(destination);
                          setIsDestinationOpen(false);
                        }}
                        type="button"
                      >
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-100">
                          <MapPin className="h-3.5 w-3.5 text-slate-500" />
                        </span>
                        {destination}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            </label>

            <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-left transition focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-100"
                >
                  <CalendarDays className="h-4 w-4 text-slate-400 group-focus-visible:text-blue-600" />
                  <div className="w-full">
                    <span className="block text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                      Check in - Check out
                    </span>
                    <span className="block h-6 text-sm text-slate-700">{dateRangeLabel}</span>
                  </div>
                </button>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                className="w-auto p-0"
                onInteractOutside={(event) => {
                  if (stayDateRange?.from && !stayDateRange?.to) {
                    event.preventDefault();
                  }
                }}
              >
                <div className="border-b border-slate-200 px-4 py-3">
                  <p className="text-lg font-semibold text-slate-900">Select arrival date</p>
                </div>
                <Calendar
                  mode="range"
                  selected={stayDateRange}
                  onSelect={(range) => {
                    setStayDateRange(range);
                    if (range?.from && range?.to) {
                      setIsDatePickerOpen(false);
                    }
                  }}
                  numberOfMonths={1}
                  defaultMonth={stayDateRange?.from}
                  disabled={{ before: new Date() }}
                  className="p-3"
                  classNames={{
                    months: 'flex flex-col gap-4',
                  }}
                />
                <div className="flex items-center gap-3 border-t border-slate-200 px-4 py-3">
                  <span className="text-sm text-slate-700">from</span>
                  <div className="rounded-full border border-teal-500 px-5 py-2 text-sm font-semibold text-slate-900">
                    {fromLabel}
                  </div>
                  <span className="text-sm text-slate-700">to</span>
                  <div className="rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-500">
                    {toLabel}
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Popover open={isGuestsOpen} onOpenChange={setIsGuestsOpen}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-left transition focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-100"
                >
                  <Users className="h-4 w-4 text-slate-400 group-focus-visible:text-blue-600" />
                  <div className="w-full">
                    <span className="block text-[11px] font-semibold uppercase tracking-wide text-slate-400">How many people</span>
                    <span className="block h-6 text-sm text-slate-700">{guestsLabel}</span>
                  </div>
                </button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-[22rem] p-0">
                <div className="px-5 py-4">
                  <p className="text-xl font-semibold text-slate-900">How many people will be staying?</p>
                </div>
                <div className="space-y-5 px-5 pb-5">
                  {guestOptions.map((option) => {
                    const count = guestCounts[option.key];

                    return (
                      <div key={option.key} className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-sm font-medium text-slate-700">{option.label}</p>
                          <p className="text-xs text-slate-500">{option.subtitle}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <button
                            type="button"
                            className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500 shadow-sm transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
                            onClick={() => updateGuestCount(option.key, option.min, -1)}
                            disabled={count <= option.min}
                          >
                            <Minus className="h-5 w-5" />
                          </button>
                          <span className="w-4 text-center text-2xl font-medium text-slate-900">{count}</span>
                          <button
                            type="button"
                            className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-teal-600 text-white shadow-sm transition hover:bg-teal-700"
                            onClick={() => updateGuestCount(option.key, option.min, 1)}
                          >
                            <Plus className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </PopoverContent>
            </Popover>

            <BookingActionButton className="h-full min-h-14 rounded-2xl px-8" label="Search" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSearchBar;
