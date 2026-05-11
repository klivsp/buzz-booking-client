import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Users, CreditCard, Info } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type BookingProperty = {
    name: string;
    images: string[];
};

type BookingRoom = {
    type: string;
    capacity: number;
    price: number;
};

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    property: BookingProperty;
    selectedRoom?: BookingRoom;
}

const bookingSchema = z.object({
    firstName: z.string().trim().min(1, 'First name is required.'),
    lastName: z.string().trim().min(1, 'Last name is required.'),
    email: z.email('Please enter a valid email address.'),
    phone: z.string().trim().min(1, 'Phone number is required.'),
    specialRequests: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

const bookingFields: Array<{
    name: keyof BookingFormValues;
    label: string;
    placeholder: string;
    type?: 'text' | 'email' | 'tel' | 'textarea';
}> = [
    { name: 'firstName', label: 'First Name', placeholder: 'Enter your first name', type: 'text' },
    { name: 'lastName', label: 'Last Name', placeholder: 'Enter your last name', type: 'text' },
    { name: 'email', label: 'Email Address', placeholder: 'name@example.com', type: 'email' },
    { name: 'phone', label: 'Phone Number', placeholder: '+355 6X XXX XXXX', type: 'tel' },
    {
        name: 'specialRequests',
        label: 'Special Requests (Optional)',
        placeholder: 'Tell us about any specific requirements or arrival times...',
        type: 'textarea',
    },
];

export default function BookingModal({ isOpen, onClose, property, selectedRoom }: BookingModalProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<BookingFormValues>({
        resolver: zodResolver(bookingSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            specialRequests: '',
        },
    });

    const onSubmit = (values: BookingFormValues) => {
        console.log('Booking submitted:', { property, selectedRoom, formData: values });
        alert('Booking successful! You will receive a confirmation email shortly.');
        reset();
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px] w-[95vw] rounded-[2.5rem] p-0 overflow-hidden border-none glass max-h-[95vh] shadow-2xl">
                <ScrollArea className="max-h-[95vh]">
                    <div className="p-6 md:p-10 space-y-8">
                        <DialogHeader className="space-y-4">
                            <div className="space-y-2 text-center sm:text-left">
                                <DialogTitle className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">Complete your stay</DialogTitle>
                                <DialogDescription className="text-slate-500 font-medium text-base">
                                    You&apos;re just one step away from your stay at <span className="font-black text-slate-900">{property.name}</span>
                                </DialogDescription>
                            </div>
                        </DialogHeader>

                        {selectedRoom && (
                            <div className="bg-white/40 backdrop-blur-sm border border-glass-border rounded-3xl p-5 flex flex-col sm:flex-row gap-5 items-center sm:items-start shadow-sm">
                                <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 shadow-md">
                                    <img src={property.images[0]} alt={property.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                </div>
                                <div className="space-y-2 text-center sm:text-left flex-1">
                                    <p className="text-lg font-black text-slate-900 leading-tight">{selectedRoom.type}</p>
                                    <div className="flex flex-wrap justify-center sm:justify-start gap-3">
                                        <p className="text-xs text-slate-500 font-bold flex items-center gap-1.5 bg-slate-100/50 px-3 py-1 rounded-full uppercase tracking-widest">
                                            <Users className="h-3.5 w-3.5" />
                                            {selectedRoom.capacity} guests
                                        </p>
                                        <p className="text-xs text-emerald-600 font-bold flex items-center gap-1.5 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-widest">
                                            <Info className="h-3.5 w-3.5" />
                                            Instant confirmation
                                        </p>
                                    </div>
                                    <p className="text-xl font-black text-glass-accent pt-1">€{selectedRoom.price} <span className="text-xs text-slate-400 font-bold uppercase">/ night</span></p>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                {bookingFields.slice(0, 2).map((field) => (
                                    <div key={field.name} className="space-y-2.5">
                                        <Label htmlFor={field.name} className="ml-1 text-sm font-black uppercase tracking-widest text-slate-700">
                                            {field.label}
                                        </Label>
                                        <Input
                                            id={field.name}
                                            type={field.type === 'textarea' ? 'text' : field.type}
                                            placeholder={field.placeholder}
                                            className="h-12 rounded-2xl border-slate-200 bg-white/50 px-5 font-bold focus:ring-glass-accent"
                                            {...register(field.name)}
                                        />
                                        {errors[field.name] ? <p className="ml-3 text-xs font-medium text-red-600">{errors[field.name]?.message}</p> : null}
                                    </div>
                                ))}
                            </div>

                            {bookingFields.slice(2).map((field) => (
                                <div key={field.name} className="space-y-2.5">
                                    <Label htmlFor={field.name} className="ml-1 text-sm font-black uppercase tracking-widest text-slate-700">
                                        {field.label}
                                    </Label>
                                    {field.type === 'textarea' ? (
                                        <textarea
                                            id={field.name}
                                            className="min-h-[120px] w-full resize-none rounded-2xl border border-slate-200 bg-white/50 p-4 text-sm font-bold transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                            placeholder={field.placeholder}
                                            {...register(field.name)}
                                        />
                                    ) : (
                                        <Input
                                            id={field.name}
                                            type={field.type}
                                            placeholder={field.placeholder}
                                            className="h-12 rounded-2xl border-slate-200 bg-white/50 px-5 font-bold focus:ring-glass-accent"
                                            {...register(field.name)}
                                        />
                                    )}
                                    {errors[field.name] ? <p className="ml-3 text-xs font-medium text-red-600">{errors[field.name]?.message}</p> : null}
                                </div>
                            ))}

                            <div className="p-6 bg-slate-100/50 rounded-3xl border border-slate-200/50 space-y-3">
                                <div className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                                    <CreditCard className="h-3.5 w-3.5 text-glass-accent" />
                                    No pre-payment needed
                                </div>
                                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                                    Your reservation is guaranteed. You will pay the property directly during your stay. We don&apos;t charge any booking fees.
                                </p>
                            </div>

                            <DialogFooter className="flex-col sm:flex-row gap-3 pt-4 sm:pt-6">
                                <Button type="button" variant="ghost" onClick={onClose} className="rounded-2xl h-12 font-bold order-2 sm:order-1">
                                    Go back
                                </Button>
                                <Button type="submit" className="bg-blue-600 hover:bg-blue-600 text-white rounded-2xl px-10 h-14 font-black text-base shadow-xl shadow-blue-500/20 active:scale-95 transition-all flex-1 order-1 sm:order-2 uppercase tracking-widest">
                                    Confirm Booking
                                </Button>
                            </DialogFooter>
                        </form>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}