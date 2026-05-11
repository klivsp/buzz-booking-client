import { zodResolver } from '@hookform/resolvers/zod';
import { FiArrowLeft, FiEye, FiEyeOff, FiHash, FiInfo } from 'react-icons/fi';
import { LuKeyRound, LuNotebookText } from 'react-icons/lu';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';

type ManageClientReservationProps = {
  onBack: () => void;
};

const reservationSchema = z.object({
  reservationNumber: z.string().trim().min(1, 'Reservation number is required.'),
  pin: z.string().trim().min(1, 'PIN is required.'),
});

type ReservationValues = z.infer<typeof reservationSchema>;
type ReservationFieldConfig = {
  name: 'reservationNumber' | 'pin';
  label: string;
  icon: React.ReactNode;
  type: 'text' | 'password';
  showInfoIcon?: boolean;
  hasVisibilityToggle?: boolean;
};

const reservationFields: ReservationFieldConfig[] = [
  {
    name: 'reservationNumber',
    label: 'Reservation number *',
    icon: <FiHash className="h-5 w-5" />,
    type: 'text',
    showInfoIcon: true,
  },
  {
    name: 'pin',
    label: 'PIN *',
    icon: <LuKeyRound className="h-5 w-5" />,
    type: 'password',
    showInfoIcon: true,
    hasVisibilityToggle: true,
  },
];

const ManageClientReservation = ({ onBack }: ManageClientReservationProps) => {
  const [showPin, setShowPin] = useState(false);
  const form = useForm<ReservationValues>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      reservationNumber: '',
      pin: '',
    },
  });

  const onSubmit = (values: ReservationValues) => {
    console.log('Manage reservation values:', values);
  };

  return (
    <div className="space-y-5 pb-5 pl-3 pr-6 pt-3 sm:space-y-7 sm:px-8 sm:pb-8 sm:pt-5">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm text-slate-800 transition hover:text-slate-950"
      >
        <FiArrowLeft className="h-4 w-4" />
        <span>back</span>
      </button>

      <div className="space-y-3 text-slate-900">
        <LuNotebookText className="mx-auto h-14 w-14" />
        <h1 className="text-center text-2xl font-bold sm:text-4xl">Manage your reservation</h1>
        <p className="mx-auto max-w-4xl text-center text-sm leading-relaxed sm:text-base">
          Log in to fully manage your reservation, add beds or services, communicate with the property, post a review,
          or simply check your reservation.
        </p>
        <p className="mx-auto max-w-4xl text-center text-sm leading-relaxed sm:text-base">
          Enter the reservation number and the PIN you received in reservation confirmation e-mail.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8">
          {reservationFields.map((fieldConfig) => (
            <FormField
              key={fieldConfig.name}
              control={form.control}
              name={fieldConfig.name}
              render={({ field }) => (
                <FormItem>
                  <span className="flex items-center justify-between gap-2 text-base font-medium text-slate-800">
                    <span className="inline-flex items-center gap-2">
                      {fieldConfig.icon}
                      <span>{fieldConfig.label}</span>
                    </span>
                    <span className="inline-flex items-center gap-2">
                      {fieldConfig.showInfoIcon ? <FiInfo className="h-4 w-4" /> : null}
                    </span>
                  </span>
                  <FormControl>
                    <div className="relative">
                      <input
                        {...field}
                        type={
                          fieldConfig.hasVisibilityToggle
                            ? showPin
                              ? 'text'
                              : 'password'
                            : fieldConfig.type
                        }
                        className="mt-1 w-full border-0 border-b border-slate-500/80 bg-transparent px-1 py-1 pr-8 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-700"
                      />
                      {fieldConfig.hasVisibilityToggle ? (
                        <button
                          type="button"
                          onClick={() => setShowPin((prev) => !prev)}
                          className="absolute right-1 top-1/2 -translate-y-1/2 text-slate-700 transition hover:text-slate-900"
                          aria-label={showPin ? 'Hide PIN' : 'Show PIN'}
                        >
                          {showPin ? <FiEye className="h-4 w-4" /> : <FiEyeOff className="h-4 w-4" />}
                        </button>
                      ) : null}
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          ))}

          <button
            type="submit"
            className="w-full rounded-full bg-teal-600 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-sm transition hover:bg-teal-700 sm:text-2xl"
          >
            Login
          </button>

          <button
            type="button"
            className="mx-auto block rounded-full border border-transparent bg-transparent px-4 py-2 text-sm text-slate-500 transition hover:border-slate-300"
          >
            Can&apos;t find your confirmation e-mail? We&apos;ll send it to you again!
          </button>
        </form>
      </Form>

      <div className="flex items-center justify-center gap-2 py-2 text-center text-xs text-slate-700 sm:gap-4 sm:py-4 sm:text-sm">
        <span>This site uses a 256-bit encryption</span>
        <span className="rounded-md border border-emerald-600 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-600 sm:px-2 sm:py-1 sm:text-xs">
          SECURED
        </span>
      </div>
    </div>
  );
};

export default ManageClientReservation;