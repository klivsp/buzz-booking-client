'use client';

import { type ReactNode, useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { cn } from '@/lib/utils';

import BookingButton from './BookingButton';
import BookingLanguageSelect from './BookingLangueSelect';

type HeaderAction = {
    label: string;
    icon?: ReactNode;
};

type BookingHeaderProps = {
    onHotelsClick?: () => void;
    variant?: 'default' | 'solidBlue';
};

const headerActions: HeaderAction[] = [
    { label: 'Home' },
    { label: 'Hotels' },
    { label: 'MANAGE RESERVATION' },
];

const BookingHeader = ({
                           onHotelsClick,
                           variant = 'default',
                       }: BookingHeaderProps) => {
    const router = useRouter();

    const [hasScrolled, setHasScrolled] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    const handleActionClick = (label: string) => {
        if (label === 'Home') {
            router.push('/');
        }

        if (label === 'Hotels') {
            if (onHotelsClick) {
                onHotelsClick();
            } else {
                router.push('/?scrollTo=hotels');
            }
        }

        if (label === 'MANAGE RESERVATION') {
            router.push('/book/view');
        }
    };

    useEffect(() => {
        const maxScroll = 440;

        const handleScroll = () => {
            const y = window.scrollY;

            setHasScrolled(y > 24);
            setScrollProgress(Math.min(y / maxScroll, 1));
        };

        handleScroll();

        window.addEventListener('scroll', handleScroll, {
            passive: true,
        });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header
            className={cn(
                'fixed left-0 top-0 z-40 w-full border-b transition-all duration-300',
                variant === 'solidBlue'
                    ? 'border-blue-950/30 bg-[#0b3b8a] shadow-none'
                    : hasScrolled
                        ? 'backdrop-blur shadow-md'
                        : 'shadow-none'
            )}
            style={
                variant === 'solidBlue'
                    ? undefined
                    : {
                        backgroundColor:
                            scrollProgress > 0
                                ? `rgba(255, 255, 255, ${
                                    0.95 * scrollProgress
                                })`
                                : 'transparent',

                        borderColor:
                            scrollProgress > 0
                                ? `rgba(226, 232, 240, ${scrollProgress})`
                                : 'transparent',
                    }
            }
        >
            <div className="flex h-20 w-full items-center justify-between px-3 sm:px-4 lg:px-6">
                <button
                    type="button"
                    onClick={() => router.push('/')}
                    className={cn(
                        'text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl',
                        variant === 'solidBlue'
                            ? 'text-white'
                            : hasScrolled
                                ? 'text-emerald-700'
                                : 'text-white'
                    )}
                >
                    <span className="md:hidden">PMP</span>

                    <span className="hidden md:inline">
                        PMP Platform
                    </span>
                </button>

                <div className="flex items-center gap-2 sm:gap-3">
                    <div className="hidden items-center gap-2 sm:gap-3 md:flex">
                        <BookingLanguageSelect
                            className={cn(
                                'h-9 rounded-md px-2 text-xs sm:px-3 sm:text-sm lg:text-base',
                                variant === 'solidBlue'
                                    ? 'border-transparent bg-transparent text-white hover:bg-white/10'
                                    : hasScrolled
                                        ? 'border-transparent bg-transparent text-slate-700 hover:bg-slate-100'
                                        : 'border-transparent bg-transparent text-white hover:bg-white/10'
                            )}
                        />

                        {headerActions.map((action) => (
                            <BookingButton
                                key={action.label}
                                label={action.label}
                                icon={action.icon}
                                onClick={() =>
                                    handleActionClick(action.label)
                                }
                                variant="outline"
                                className={cn(
                                    'h-8 rounded-full border-transparent px-2 text-xs sm:h-9 sm:px-3 md:px-4 md:text-sm lg:text-base',
                                    variant === 'solidBlue'
                                        ? 'bg-transparent text-white hover:bg-white/10'
                                        : hasScrolled
                                            ? 'bg-transparent text-slate-700 hover:bg-slate-400/20'
                                            : 'bg-transparent text-white hover:bg-white/10'
                                )}
                            />
                        ))}
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                size="icon"
                                variant="outline"
                                className={cn(
                                    'h-9 w-9 rounded-full border-transparent bg-transparent md:hidden',
                                    variant === 'solidBlue'
                                        ? 'text-white hover:bg-white/10'
                                        : hasScrolled
                                            ? 'text-slate-700 hover:bg-slate-100'
                                            : 'text-white hover:bg-white/10'
                                )}
                            >
                                <Menu className="h-5 w-5" />

                                <span className="sr-only">
                                    Open header menu
                                </span>
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                            align="end"
                            className="w-56 rounded-xl p-2"
                        >
                            <div className="mb-2 px-2">
                                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Language
                                </p>

                                <BookingLanguageSelect className="h-9 w-full justify-between rounded-md border border-slate-200 bg-white px-2 text-xs text-slate-700 hover:bg-slate-100" />
                            </div>

                            <DropdownMenuSeparator />

                            {headerActions.map((action) => (
                                <DropdownMenuItem
                                    key={action.label}
                                    className="cursor-pointer gap-2 rounded-md py-2"
                                    onSelect={() =>
                                        handleActionClick(action.label)
                                    }
                                >
                                    {action.icon}

                                    <span>{action.label}</span>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
};

export default BookingHeader;