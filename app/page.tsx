'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import BookingCarousel from '@/components/client-specific-booking/BookingCarousel';
import BookingFooter from '@/components/client-specific-booking/BookingFooter';
import BookingHeader from '@/components/client-specific-booking/BookingHeader';
import BookingHotelCard from '@/components/client-specific-booking/BookingHotelCard';
import BookingSearch from '@/components/client-specific-booking/BookingSearch';
import type { BookingSearchCriteria } from '@/components/client-specific-booking/BookingSearch';
import bookingHome from '../public/images/bookingHome.jpg';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { hotelDetails, toSlug } from '@/data/hotelDetails';

const ClientSpecificBooking = () => {
    const hotelsSectionRef = useRef<HTMLElement | null>(null);
    const [searchCriteria, setSearchCriteria] = useState<BookingSearchCriteria | null>(null);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const scrollToHotels = () => {
        hotelsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    useEffect(() => {
        if (searchParams.get('scrollTo') !== 'hotels') {
            return;
        }

        const runScroll = () => {
            hotelsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        };

        requestAnimationFrame(() => {
            requestAnimationFrame(runScroll);
        });

        const clearQueryTimer = window.setTimeout(() => {
            router.replace(pathname, { scroll: false });
        }, 550);

        return () => {
            window.clearTimeout(clearQueryTimer);
        };
    }, [pathname, router, searchParams]);

    const filteredStays = useMemo(() => {
        if (!searchCriteria) {
            return hotelDetails;
        }

        return hotelDetails.filter((stay) => {
            const hasDestinationMatch = searchCriteria.destination
                ? stay.location.toLowerCase().includes(searchCriteria.destination.toLowerCase()) ||
                stay.title.toLowerCase().includes(searchCriteria.destination.toLowerCase())
                : true;

            const hasDateMatch =
                !searchCriteria.stayDateRange?.from ||
                !searchCriteria.stayDateRange?.to ||
                (() => {
                    const searchStart = searchCriteria.stayDateRange?.from;
                    const searchEnd = searchCriteria.stayDateRange?.to;
                    if (!searchStart || !searchEnd) {
                        return true;
                    }

                    const stayStart = new Date(stay.checkIn);
                    const stayEnd = new Date(stay.checkOut);
                    return stayStart <= searchEnd && stayEnd >= searchStart;
                })();

            return hasDestinationMatch && hasDateMatch;
        });
    }, [searchCriteria]);

    return (
        <main className="min-h-screen overflow-x-hidden bg-white text-slate-900">
            <BookingHeader onHotelsClick={scrollToHotels} />
            <section
                className="relative flex min-h-screen items-center overflow-hidden text-white"
                style={{
                    backgroundImage: `url(${bookingHome.src})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                }}
            >
                <div className="absolute inset-0 bg-slate-900/35" />
                <div className="relative mx-auto w-full max-w-6xl space-y-8 px-4 pt-20">
                    <div className="space-y-4">
                        <h1 className="max-w-2xl text-4xl font-bold leading-tight md:text-5xl">
                            Find your ideal stay with fast and secure booking
                        </h1>
                        <p className="max-w-xl text-sm text-slate-100 md:text-base">
                            Inspired by modern booking platforms, with a focus on clarity, trust, and an excellent user experience.
                        </p>
                    </div>
                    <BookingSearch
                        onSearch={(criteria) => {
                            setSearchCriteria(criteria);
                            scrollToHotels();
                        }}
                    />
                </div>
            </section>

            <section ref={hotelsSectionRef} className="mx-auto w-full max-w-7xl scroll-mt-28 px-4 py-14 sm:px-6 lg:px-8">
                <div className="mb-6 flex items-end justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Recommended for your next trip</h2>
                    </div>
                </div>
                {filteredStays.length > 0 ? (
                    <BookingCarousel slideCount={filteredStays.length}>
                        {filteredStays.map((stay) => (
                            <BookingHotelCard
                                key={stay.id}
                                size="narrow"
                                onCardClick={() =>
                                    router.push(`/${toSlug(stay.location)}/${toSlug(stay.title)}`)
                                }
                                reservation={{
                                    id: stay.id,
                                    propertyImage: stay.imageSrc,
                                    propertyName: stay.title,
                                    roomType: stay.location,
                                    status: stay.statusLabel,
                                    checkIn: stay.checkIn,
                                    checkOut: stay.checkOut,
                                    totalPrice: stay.totalPrice,
                                }}
                            />
                        ))}
                    </BookingCarousel>
                ) : (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center">
                        <p className="text-base font-medium text-slate-700">No hotels match your search criteria.</p>
                    </div>
                )}
            </section>

            <BookingFooter />
        </main>
    );
};

export default ClientSpecificBooking;