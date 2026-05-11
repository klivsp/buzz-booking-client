'use client';

import { useRouter } from 'next/navigation';

const navItems = ['HOME', 'HOTELS', 'MANAGE RESERVATION'] as const;

export default function BookingHeader() {
    const router = useRouter();

    const handleClick = (item: (typeof navItems)[number]) => {
        if (item === 'HOME') {
            router.push('/');
            return;
        }
        if (item === 'HOTELS') {
            router.push('/?scrollTo=hotels');
            return;
        }
        router.push('/book/view');
    };

    return (
        <header className="sticky top-0 z-40 w-full border-b border-blue-900/40 bg-[#0b3b8a]">
            <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <h1 className="text-base font-bold tracking-wide text-white sm:text-lg">We Love Roma</h1>
                <nav className="flex items-center gap-4 text-[11px] font-semibold uppercase tracking-wide text-white sm:gap-6">
                    {navItems.map((item) => (
                        <button key={item} type="button" onClick={() => handleClick(item)} className="opacity-90 transition hover:opacity-100">
                            {item}
                        </button>
                    ))}
                    <span className="text-sm">EN</span>
                </nav>
            </div>
        </header>
    );
}