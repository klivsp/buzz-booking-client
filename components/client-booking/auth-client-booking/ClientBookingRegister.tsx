'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FiArrowLeft, FiInfo } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';

type ClientBookingRegisterProps = {
  onBack: () => void;
  showBackButton?: boolean;
};

const registerSchema = z.object({
  name: z.string().trim().min(1, 'Name is required.'),
  surname: z.string().trim().min(1, 'Surname is required.'),
  email: z
    .string()
    .trim()
    .min(1, 'Email is required.')
    .email('Please enter a valid email address.'),
  consent54: z.boolean().optional(),
  consent55: z.boolean().optional(),
});

type RegisterValues = z.infer<typeof registerSchema>;
type RegisterTextFieldConfig = {
  name: 'name' | 'surname' | 'email';
  label: string;
  type: 'text' | 'email';
  hasInfoIcon?: boolean;
};
type RegisterConsentFieldConfig = {
  name: 'consent54' | 'consent55';
  text: string;
};

const registerTextFields: RegisterTextFieldConfig[] = [
  { name: 'name', label: 'Name *', type: 'text' },
  { name: 'surname', label: 'Surname *', type: 'text' },
  { name: 'email', label: 'Your e-mail address *', type: 'email', hasInfoIcon: true },
];

const registerConsentFields: RegisterConsentFieldConfig[] = [
  {
    name: 'consent54',
    text: 'I consent to the processing of data for the purpose expressed at point 5.4 of the',
  },
  {
    name: 'consent55',
    text: 'I consent to the processing of data for the purpose expressed at point 5.5 of the',
  },
];

const ClientBookingRegister = ({ onBack, showBackButton = true }: ClientBookingRegisterProps) => {
  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      surname: '',
      email: '',
      consent54: false,
      consent55: false,
    },
  });

  const onSubmit = (values: RegisterValues) => {
    console.log('Register values:', values);
  };

  return (
    <div className="space-y-5 pb-5 pl-3 pr-6 pt-3 sm:space-y-7 sm:px-8 sm:pb-8 sm:pt-5">
      {showBackButton ? (
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm text-slate-800 transition hover:text-slate-950"
        >
          <FiArrowLeft className="h-4 w-4" />
          <span>back</span>
        </button>
      ) : null}

      <div className="space-y-3 text-slate-900">
        <h1 className="text-center ml-10 text-2xl font-bold sm:text-3xl">Create your account</h1>
        <p className="mx-auto max-w-4xl text-center text-sm leading-relaxed sm:text-base">
          Register to take advantage of exclusive promotions and offers reserved just for you, communicate with the
          properties, post reviews, easily manage your reservations...and a lot of other features.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {registerTextFields
              .filter((fieldConfig) => fieldConfig.name !== 'email')
              .map((fieldConfig) => (
                <FormField
                  key={fieldConfig.name}
                  control={form.control}
                  name={fieldConfig.name}
                  render={({ field }) => (
                    <FormItem>
                      <span className="text-base font-medium text-slate-800">{fieldConfig.label}</span>
                      <FormControl>
                        <input
                          {...field}
                          type={fieldConfig.type}
                          className="mt-1 w-full border-0 border-b border-slate-500/80 bg-transparent px-1 py-1 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-700"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              ))}
          </div>

          {registerTextFields
            .filter((fieldConfig) => fieldConfig.name === 'email')
            .map((fieldConfig) => (
              <FormField
                key={fieldConfig.name}
                control={form.control}
                name={fieldConfig.name}
                render={({ field }) => (
                  <FormItem>
                    <span className="flex items-center justify-between gap-2 text-base font-medium text-slate-800">
                      <span>{fieldConfig.label}</span>
                      {fieldConfig.hasInfoIcon ? <FiInfo className="h-4 w-4" /> : null}
                    </span>
                    <FormControl>
                      <input
                        {...field}
                        type={fieldConfig.type}
                        className="mt-1 w-full border-0 border-b border-slate-500/80 bg-transparent px-1 py-1 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-700"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            ))}

          <p className="text-base text-slate-900">
            By registering you automatically agree the{' '}
            <button type="button" className="font-semibold underline">
              terms and conditions
            </button>{' '}
            and{' '}
            <button type="button" className="font-semibold underline">
              privacy policy
            </button>
          </p>

          {registerConsentFields.map((consentField) => (
            <FormField
              key={consentField.name}
              control={form.control}
              name={consentField.name}
              render={({ field }) => (
                <FormItem>
                  <label className="inline-flex items-start gap-3 text-base text-slate-800">
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={(event) => field.onChange(event.target.checked)}
                      className="mt-1 h-5 w-5 rounded border-slate-500 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>
                      {consentField.text}{' '}
                      <button type="button" className="font-semibold underline">
                        privacy policy
                      </button>
                    </span>
                  </label>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          ))}

          <button
            type="submit"
            className="w-full rounded-full bg-teal-600 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-sm transition hover:bg-teal-700 sm:text-1xl"
          >
            Register
          </button>

          <div className="flex items-center gap-3 text-slate-500 sm:gap-4">
            <div className="h-px flex-1 bg-slate-400/60" />
            <span className="text-base sm:text-1xl">Do you own a property?</span>
            <div className="h-px flex-1 bg-slate-400/60" />
          </div>

          <button
            type="button"
            className="w-full rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold uppercase tracking-wide text-slate-900 transition hover:bg-slate-50 sm:text-1xl"
          >
            Add your property
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

export default ClientBookingRegister;