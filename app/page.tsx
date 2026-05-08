'use client';

import BookingSection from '@/components/client-booking/BookingSection';
import BookingFooter from '@/components/client-booking/BookingFooter';
import BookingHeader from '@/components/client-booking/BookingHeader';
import BookingSearchBar from '@/components/client-booking/BookingSearchBar';
import ScrollToTopButton from '@/components/client-booking/ScrollToTopButton';
import ClientBookingLogin from '@/components/client-booking/auth-client-booking/ClientBookingLogin';
import bookingHome from '@/public/images/bookingHome.jpg';
import {useState} from "react";

const ClientBookingPages = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginModalInitialView, setLoginModalInitialView] = useState<
      'options' | 'email-login' | 'manage-reservation' | 'register'
  >('options');

  return (
      <main className="min-h-screen overflow-x-hidden bg-white text-slate-900">
        <BookingHeader
            onLoginClick={() => {
              setLoginModalInitialView('options');
              setIsLoginModalOpen(true);
            }}
            onRegisterClick={() => {
              setLoginModalInitialView('register');
              setIsLoginModalOpen(true);
            }}
        />
        <section
            className="relative flex min-h-screen items-center overflow-hidden text-white"
            style={{
              backgroundImage: `url(${bookingHome})`,
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
            <BookingSearchBar />
          </div>
        </section>

        <BookingSection />

        <BookingFooter />
        <ScrollToTopButton />
        <ClientBookingLogin
            open={isLoginModalOpen}
            onOpenChange={setIsLoginModalOpen}
            initialView={loginModalInitialView}
        />
      </main>
  );
};

export default ClientBookingPages;