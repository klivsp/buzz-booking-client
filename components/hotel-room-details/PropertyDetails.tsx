'use client'
import { useState } from 'react';
import { MapPin, Wifi, Car, Snowflake, Bath } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AvailabilityChecker from '@/components/hotel-room-details/AvailabilityCheck';
import BookingModal from '@/components/hotel-room-details/BookingModal';
import MapLocation from '@/components/hotel-room-details/MapLocation';
import type { HotelDetail } from '@/data/hotelDetails';

type Room = {
    id: string;
    type: string;
    capacity: number;
    price: number;
};

type PropertyDetailsProps = {
    hotel: HotelDetail;
};

const locationCoordinates: Record<string, { lat: number; lng: number }> = {
    'rome-italy': { lat: 41.9028, lng: 12.4964 },
    'milan-italy': { lat: 45.4642, lng: 9.19 },
    'tirane-albania': { lat: 41.3275, lng: 19.8187 },
};

export default function PropertyDetails({ hotel }: PropertyDetailsProps) {
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState<Room | undefined>(undefined);
    const propertyData = {
        name: hotel.title,
        description: `Enjoy your stay in ${hotel.location} at ${hotel.title}. This property offers comfort, central location, and a reliable booking experience.`,
        images: [
            hotel.imageSrc,
            'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
        ],
        location: locationCoordinates[hotel.location.toLowerCase().replace(/,\s*/g, '-')] ?? locationCoordinates['rome-italy'],
        rooms: [
            { id: `${hotel.id}-r1`, type: 'Deluxe Room', capacity: 2, price: Number(hotel.totalPrice) },
            { id: `${hotel.id}-r2`, type: 'Family Suite', capacity: 4, price: Number(hotel.totalPrice) + 80 },
        ] satisfies Room[],
    };

    const handleBookRoom = (room: Room) => {
        setSelectedRoom(room);
        setIsBookingModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-slate-50 px-4 pb-8 pt-28 text-slate-800 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-6xl space-y-8">
                <section className="space-y-5">
                    <div className="grid items-start gap-5 lg:grid-cols-[1.8fr_0.9fr]">
                        <div className="grid gap-2 overflow-hidden rounded-3xl shadow-xl shadow-slate-200/60 lg:grid-cols-[1.25fr_1fr]">
                            <img
                                src={propertyData.images[0]}
                                alt={`${propertyData.name} main`}
                                className="h-[220px] w-full object-cover lg:h-[360px]"
                                referrerPolicy="no-referrer"
                            />
                            <div className="grid grid-cols-2 gap-2">
                                {propertyData.images.slice(1, 5).map((imageSrc, index) => (
                                    <img
                                        key={imageSrc}
                                        src={imageSrc}
                                        alt={`${propertyData.name} view ${index + 1}`}
                                        className="h-[109px] w-full object-cover lg:h-[179px]"
                                        referrerPolicy="no-referrer"
                                    />
                                ))}
                            </div>
                        </div>

                        <aside className="space-y-4">
                            <AvailabilityChecker />
                            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Starting from</p>
                                <p className="mt-2 text-4xl font-black text-slate-900">
                                    EUR {propertyData.rooms[0].price} <span className="text-base font-medium text-slate-500">/ night</span>
                                </p>
                                <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-medium text-slate-600">
                                    <span className="inline-flex items-center gap-1"><Wifi className="h-3.5 w-3.5" /> Free WiFi</span>
                                    <span className="inline-flex items-center gap-1"><Bath className="h-3.5 w-3.5" /> Bathtub</span>
                                    <span className="inline-flex items-center gap-1"><Car className="h-3.5 w-3.5" /> Parking</span>
                                    <span className="inline-flex items-center gap-1"><Snowflake className="h-3.5 w-3.5" /> A/C</span>
                                </div>
                                <Button className="mt-5 h-11 w-full bg-blue-600 font-bold text-white hover:bg-blue-600" onClick={() => handleBookRoom(propertyData.rooms[0])}>
                                    Book Now
                                </Button>
                            </div>
                        </aside>
                    </div>

                    <div className="glass space-y-6 rounded-3xl p-6 md:p-8">
                        <div className="space-y-3">
                            <h1 className="text-3xl font-bold text-slate-900">{propertyData.name}</h1>
                            <p className="text-base leading-relaxed text-slate-600">{propertyData.description}</p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-slate-900">Available rooms</h3>
                            <div className="space-y-3">
                                {propertyData.rooms.map((room) => (
                                    <div key={room.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4">
                                        <div>
                                            <p className="font-semibold text-slate-900">{room.type}</p>
                                            <p className="text-sm text-slate-500">{room.capacity} guests</p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <p className="font-bold text-slate-900">EUR {room.price} / night</p>
                                            <Button className="bg-blue-600 text-white hover:bg-blue-600" onClick={() => handleBookRoom(room)}>
                                                Book now
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="flex items-center gap-2 text-xl font-semibold text-slate-900">
                                <MapPin className="h-5 w-5 text-glass-accent" />
                                Location
                            </h3>
                            <MapLocation center={[propertyData.location.lat, propertyData.location.lng]} />
                        </div>
                    </div>
                </section>
            </div>

            <BookingModal
                isOpen={isBookingModalOpen}
                onClose={() => setIsBookingModalOpen(false)}
                property={{ name: propertyData.name, images: propertyData.images }}
                selectedRoom={selectedRoom}
            />
        </div>
    );
}