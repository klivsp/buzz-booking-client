
import { notFound } from 'next/navigation';
import BookingFooter from '@/components/client-specific-booking/BookingFooter';
import BookingHeader from '@/components/client-specific-booking/BookingHeader';
import PropertyDetails from '@/components/hotel-room-details/PropertyDetails';
import { hotelDetails, toSlug } from '@/data/hotelDetails';

type HotelsDetailPageProps = {
    params: Promise<{
        location: string;
        title: string;
    }>;
};

const HotelsDetailPage = async ({ params }: HotelsDetailPageProps) => {
    const { location, title } = await params;

    const selectedHotel = hotelDetails.find(
        (stay) => toSlug(stay.location) === location && toSlug(stay.title) === title
    );

    if (!selectedHotel) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-slate-100 text-slate-900">
            <BookingHeader variant="solidBlue" />
            <PropertyDetails hotel={selectedHotel} />
            <BookingFooter variant="manage" />
        </main>
    );
};

export default HotelsDetailPage;