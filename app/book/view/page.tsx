'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import BookingFooter from '@/components/client-specific-booking/BookingFooter';
import BookingHeader from '@/components/client-specific-booking/BookingHeader';

const reservationFields = [
    {
        name: 'reservationCode',
        label: 'Reservation code',
        placeholder: 'Enter your reservation code',
    },
    {
        name: 'last4Digits',
        label: 'Last 4 digits of phone number',
        placeholder: '+XX XXX XXX1234',
    },
] as const;

const manageReservationSchema = z.object({
    reservationCode: z.string().trim().min(1, 'Reservation code is required.'),
    last4Digits: z.string().trim().min(1, 'Last 4 digits are required.'),
});

type ManageReservationFormValues = z.infer<typeof manageReservationSchema>;

const ManageReservations = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ManageReservationFormValues>({
        resolver: zodResolver(manageReservationSchema),
        defaultValues: {
            reservationCode: '',
            last4Digits: '',
        },
    });

    const onSubmit = (values: ManageReservationFormValues) => {
        console.log('Reservation lookup:', values);
    };

    return (
        <main className="min-h-screen bg-slate-100 text-slate-900">
            <BookingHeader variant="solidBlue" />

            <section className="mx-auto flex w-full max-w-6xl items-center justify-center px-4 pb-16 pt-36 sm:px-6 lg:px-8">
                <div className="w-full max-w-3xl">
                    <div className="mb-8 space-y-2">
                        <h1 className="text-4xl font-semibold text-slate-800">Manage your reservation</h1>
                        <p className="text-sm text-slate-500">Log in to manage your reservation.</p>
                    </div>

                    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                        {reservationFields.map((field) => (
                            <div key={field.name} className="space-y-2">
                                <label className="block text-sm text-slate-600" htmlFor={field.name}>
                                    {field.label}
                                </label>
                                <input
                                    id={field.name}
                                    type="text"
                                    placeholder={field.placeholder}
                                    className="h-11 w-full rounded-sm border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                                    {...register(field.name)}
                                />
                                {errors[field.name] ? (
                                    <p className="text-xs text-red-600">{errors[field.name]?.message}</p>
                                ) : null}
                            </div>
                        ))}

                        <button
                            type="submit"
                            className="mt-2 h-11 w-full rounded-full bg-amber-400 text-sm font-semibold text-white transition hover:bg-amber-500"
                        >
                            View reservation
                        </button>
                    </form>
                </div>
            </section>

            <BookingFooter variant="manage" />
        </main>
    );
};

export default ManageReservations;