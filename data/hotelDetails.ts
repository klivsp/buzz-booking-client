export type HotelDetail = {
    id: string;
    title: string;
    location: string;
    imageSrc: string;
    statusLabel: string;
    checkIn: string;
    checkOut: string;
    totalPrice: number;
};

export const hotelDetails: HotelDetail[] = [
    {
        id: 'rome-city-center',
        title: 'Rome City Center Suite',
        location: 'Rome, Italy',
        imageSrc: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
        statusLabel: 'confirmed',
        checkIn: '2026-05-12',
        checkOut: '2026-05-17',
        totalPrice: 980,
    },
    {
        id: 'milan-business',
        title: 'Milan Business Hotel',
        location: 'Milan, Italy',
        imageSrc: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
        statusLabel: 'pending',
        checkIn: '2026-06-02',
        checkOut: '2026-06-06',
        totalPrice: 760,
    },
    {
        id: 'tirane-boutique',
        title: 'Tirane Boutique Stay',
        location: 'Tirane, Albania',
        imageSrc: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80',
        statusLabel: 'confirmed',
        checkIn: '2026-07-01',
        checkOut: '2026-07-05',
        totalPrice: 540,
    },
    {
        id: 'tirane-boutique-2',
        title: 'Tirane Boutique Stay',
        location: 'Tirane, Albania',
        imageSrc: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80',
        statusLabel: 'confirmed',
        checkIn: '2026-07-01',
        checkOut: '2026-07-05',
        totalPrice: 540,
    },
];

export const toSlug = (value: string) =>
    value
        .trim()
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
