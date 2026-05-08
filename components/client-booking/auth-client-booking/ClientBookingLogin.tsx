'use client';

import { ArrowLeft, ClipboardList, Eye, EyeOff, KeyRound, Mail, UserCog, UserPlus, X } from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogClose, DialogContent } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import ManageClientReservation from '@/components/client-booking/auth-client-booking/ManageClientReservation';
import ClientBookingRegister from '@/components/client-booking/auth-client-booking/ClientBookingRegister';
import facebookIcon from '@/public/images/icons/facebook.svg';
import googleIcon from '@/public/images/icons/google.svg';
import emailIcon from '@/public/images/icons/email.svg';

type ClientBookingLoginProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialView?: 'options' | 'email-login' | 'manage-reservation' | 'register';
};

type LoginOptionProps = {
  id: string;
  label: string;
  icon?: ReactNode;
  iconSrc?: string;
  iconAlt?: string;
  iconClassName?: string;
  onClick?: () => void;
  className: string;
};

const emailLoginSchema = z.object({
  email: z.string().trim().min(1, 'Email is required.').email('Please enter a valid email address.'),
  password: z.string().trim().min(1, 'Password is required.'),
  keepLoggedIn: z.boolean().optional(),
});

type EmailLoginValues = z.infer<typeof emailLoginSchema>;
type EmailLoginFieldConfig = {
  name: 'email' | 'password';
  type: 'email' | 'password';
  label: string;
  icon: ReactNode;
};

const LoginOption = ({ label, icon, iconSrc, iconAlt, iconClassName, onClick, className }: LoginOptionProps) => (
    <button
        type="button"
        onClick={onClick}
        className={`flex w-full items-center justify-between rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-wide shadow-sm transition hover:opacity-95 sm:px-6 sm:py-3 sm:text-sm ${className}`}
    >
    <span
        className={`inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-slate-700 sm:h-10 sm:w-10 ${iconClassName ?? ''}`}
    >
      {iconSrc ? <img src={iconSrc} alt={iconAlt ?? ''} className="h-6 w-6 object-contain sm:h-7 sm:w-7" /> : icon}
    </span>
      <span className="flex-1 text-center">{label}</span>
      <span className="h-8 w-8 sm:h-10 sm:w-10" />
    </button>
);

const loginOptions: LoginOptionProps[] = [
  {
    id: 'facebook',
    label: 'Login with Facebook',
    className: 'bg-[#3b5998] text-white',
    iconSrc: facebookIcon,
    iconAlt: 'Facebook',
  },
  {
    id: 'google',
    label: 'Login with Google',
    className: 'border border-slate-300 bg-white text-slate-900',
    iconSrc: googleIcon,
    iconAlt: 'Google',
  },
  {
    id: 'email',
    label: 'Login with your e-mail',
    className: 'bg-emerald-500 text-white',
    iconSrc: emailIcon,
    iconAlt: 'Email',
  },
  {
    id: 'reservation',
    label: 'Manage your reservation',
    className: 'bg-teal-600 text-white',
    icon: <ClipboardList className="h-5 w-5 sm:h-6 sm:w-6" />,
  },
  {
    id: 'create-account',
    label: 'Create your account',
    className: 'border border-slate-300 bg-white text-slate-900',
    icon: <UserPlus className="h-5 w-5 sm:h-6 sm:w-6" />,
  },
  {
    id: 'manager',
    label: 'Login as manager',
    className: 'border border-slate-300 bg-white text-slate-900',
    icon: <UserCog className="h-5 w-5 sm:h-6 sm:w-6" />,
  },
];

const emailLoginFields: EmailLoginFieldConfig[] = [
  {
    name: 'email',
    type: 'email',
    label: 'Your e-mail address *',
    icon: <Mail className="h-5 w-5" />,
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password *',
    icon: <KeyRound className="h-5 w-5" />,
  },
];

const ClientBookingLogin = ({ open, onOpenChange, initialView = 'options' }: ClientBookingLoginProps) => {
  const [activeView, setActiveView] = useState<'options' | 'email-login' | 'manage-reservation' | 'register'>(
      'options'
  );
  const [showPassword, setShowPassword] = useState(false);
  const emailForm = useForm<EmailLoginValues>({
    resolver: zodResolver(emailLoginSchema),
    defaultValues: {
      email: '',
      password: '',
      keepLoggedIn: false,
    },
  });

  const handleDialogOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setShowPassword(false);
      emailForm.reset();
    }
    onOpenChange(nextOpen);
  };

  useEffect(() => {
    if (open) {
      setActiveView(initialView);
    }
  }, [open, initialView]);

  const handleOptionClick = (optionKey: string) => {
    switch (optionKey) {
      case 'email':
        setActiveView('email-login');
        break;
      case 'reservation':
        setActiveView('manage-reservation');
        break;
      case 'create-account':
        setActiveView('register');
        break;
      default:
        break;
    }
  };

  const onSubmitEmailLogin = (values: EmailLoginValues) => {
    console.log('Email login values:', values);
  };

  return (
      <Dialog open={open} onOpenChange={handleDialogOpenChange}>
        <DialogContent
            className="w-[88vw] max-w-sm gap-0 overflow-hidden rounded-md border-slate-200 bg-[#ececec] p-0 sm:h-[88vh] sm:w-[93vw] sm:max-w-4xl"
            hideDefaultClose
        >
          <ScrollArea className="max-h-[85vh] sm:max-h-[88vh]">
            <div className="sticky top-0 z-20 flex items-center justify-start border-b border-slate-300/60 bg-[#ececec] pb-2 pl-3 pr-6 pt-2 sm:px-8 sm:pt-3">
              <h2 className="text-4xl font-bold text-emerald-700 max-sm:text-4xl">PMP Platform</h2>
              <DialogClose className="absolute right-4 top-2 rounded-sm p-1 text-slate-700 opacity-80 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-700/40 sm:right-6 sm:top-3">
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="sr-only">Close</span>
              </DialogClose>
            </div>
            {activeView === 'options' ? (
                <div className="space-y-4 pb-4 pl-3 pr-6 pt-3 sm:space-y-6 sm:px-8 sm:pb-8 sm:pt-4">
                  <div className="space-y-2 text-slate-800 sm:space-y-3">
                    <h1 className="text-center text-2xl font-bold text-black sm:text-3xl">Login</h1>
                    <p className="mx-auto max-w-4xl text-center text-sm leading-relaxed text-slate-900 sm:text-base">
                      Log in and take advantage of exclusive promotions and offers reserved just for you,
                      <br />
                      communicate with the properties, post reviews, easily manage your reservations...and a lot of other
                      features.
                    </p>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    {loginOptions.slice(0, 4).map((option) => (
                        <LoginOption key={option.id} {...option} onClick={() => handleOptionClick(option.id)} />
                    ))}
                  </div>

                  <div className="flex items-center gap-3 text-slate-500 sm:gap-4">
                    <div className="h-px flex-1 bg-slate-400/60" />
                    <span className="text-xl sm:text-2xl">OR</span>
                    <div className="h-px flex-1 bg-slate-400/60" />
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    <LoginOption {...loginOptions[4]} onClick={() => handleOptionClick(loginOptions[4].id)} />

                    <div className="flex items-center gap-3 pt-1 text-slate-500 sm:gap-4">
                      <div className="h-px flex-1 bg-slate-400/60" />
                      <span className="text-base sm:text-2xl">Do you own a property?</span>
                      <div className="h-px flex-1 bg-slate-400/60" />
                    </div>

                    <LoginOption {...loginOptions[5]} onClick={() => handleOptionClick(loginOptions[5].id)} />
                  </div>

                  <div className="flex items-center justify-center gap-2 py-2 text-center text-xs text-slate-700 sm:gap-4 sm:py-4 sm:text-sm">
                    <span>This site uses a 256-bit encryption</span>
                    <span className="rounded-md border border-emerald-600 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-600 sm:px-2 sm:py-1 sm:text-xs">
                  SECURED
                </span>
                  </div>
                </div>
            ) : activeView === 'email-login' ? (
                <div className="space-y-5 pb-5 pl-3 pr-6 pt-3 sm:space-y-7 sm:px-8 sm:pb-8 sm:pt-5">
                  <button
                      type="button"
                      onClick={() => setActiveView('options')}
                      className="inline-flex items-center gap-2 text-sm text-slate-800 transition hover:text-slate-950"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>back</span>
                  </button>

                  <div className="space-y-3 text-slate-900">
                    <h1 className="text-center text-2xl font-bold sm:text-4xl">Login with your e-mail</h1>
                    <p className="mx-auto max-w-4xl text-center text-sm leading-relaxed sm:text-base">
                      Log in and take advantage of exclusive promotions and offers reserved just for you, communicate with
                      the properties, post reviews, easily manage your reservations...and a lot of other features.
                    </p>
                  </div>

                  <Form {...emailForm}>
                    <form onSubmit={emailForm.handleSubmit(onSubmitEmailLogin)} className="space-y-6 sm:space-y-8">
                      {emailLoginFields.map((fieldConfig) => (
                          <FormField
                              key={fieldConfig.name}
                              control={emailForm.control}
                              name={fieldConfig.name}
                              render={({ field }) => (
                                  <FormItem>
                          <span className="flex items-center justify-between gap-2 text-base font-medium text-slate-800">
                            <span className="inline-flex items-center gap-2">
                              {fieldConfig.icon}
                              <span>{fieldConfig.label}</span>
                            </span>
                          </span>
                                    <FormControl>
                                      <div className="relative">
                                        <input
                                            {...field}
                                            type={
                                              fieldConfig.name === 'password'
                                                  ? showPassword
                                                      ? 'text'
                                                      : 'password'
                                                  : fieldConfig.type
                                            }
                                            className="mt-1 w-full border-0 border-b border-slate-500/80 bg-transparent px-1 py-1 pr-8 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-700"
                                        />
                                        {fieldConfig.name === 'password' ? (
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword((prev) => !prev)}
                                                className="absolute right-1 top-1/2 -translate-y-1/2 text-slate-700 transition hover:text-slate-900"
                                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                                            >
                                              {showPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                                            </button>
                                        ) : null}
                                      </div>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                  </FormItem>
                              )}
                          />
                      ))}

                      <FormField
                          control={emailForm.control}
                          name="keepLoggedIn"
                          render={({ field }) => (
                              <FormItem>
                                <label className="inline-flex items-center gap-3 text-base text-slate-800">
                                  <input
                                      type="checkbox"
                                      checked={Boolean(field.value)}
                                      onChange={(event) => field.onChange(event.target.checked)}
                                      className="h-5 w-5 rounded border-slate-500 text-emerald-600 focus:ring-emerald-500"
                                  />
                                  <span>Keep me logged in</span>
                                </label>
                              </FormItem>
                          )}
                      />

                      <button
                          type="submit"
                          className="w-full rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-sm transition hover:bg-emerald-600 sm:text-2xl"
                      >
                        Login
                      </button>

                      <button
                          type="button"
                          className="mx-auto block rounded-full border border-transparent bg-transparent px-4 py-2 text-sm text-slate-500 transition hover:border-slate-300"
                      >
                        Forgot your password?
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
            ) : (
                <>
                  {activeView === 'manage-reservation' ? (
                      <ManageClientReservation onBack={() => setActiveView('options')} />
                  ) : (
                      <ClientBookingRegister
                          onBack={() => setActiveView('options')}
                          showBackButton={initialView !== 'register'}
                      />
                  )}
                </>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
  );
};

export default ClientBookingLogin;
