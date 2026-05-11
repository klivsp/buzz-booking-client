import { type ReactNode, useEffect, useState } from 'react';
import { LuCircleUserRound, LuLogIn, LuMenu } from 'react-icons/lu';
import BookingActionButton from '@/components/client-booking/BookingActionButton';
import BookingLanguageSelector from '@/components/client-booking/BookingLanguageSelector';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

type HeaderAction = {
  label: string;
  icon?: ReactNode;
};

type BookingHeaderProps = {
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
};

const headerActions: HeaderAction[] = [
  { label: 'Register', icon: <LuCircleUserRound className="h-5 w-5" /> },
  { label: 'Login', icon: <LuLogIn className="h-5 w-5" /> },
];

const BookingHeader = ({ onLoginClick, onRegisterClick }: BookingHeaderProps) => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleActionClick = (label: string) => {
    if (label === 'Login') {
      onLoginClick?.();
    }

    if (label === 'Register') {
      onRegisterClick?.();
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
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        'fixed left-0 top-0 z-40 w-full border-b transition-all duration-300',
        hasScrolled ? 'backdrop-blur shadow-md' : 'shadow-none'
      )}
      style={{
        backgroundColor: scrollProgress > 0 ? `rgba(255, 255, 255, ${0.95 * scrollProgress})` : 'transparent',
        borderColor: scrollProgress > 0 ? `rgba(226, 232, 240, ${scrollProgress})` : 'transparent',
      }}
    >
      <div className="flex h-20 w-full items-center justify-between px-3 sm:px-4 lg:px-6">
        <h2
          className={cn(
            'text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl',
            hasScrolled ? 'text-emerald-700' : 'text-white'
          )}
        >
          <span className="md:hidden">PMP</span>
          <span className="hidden md:inline">PMP Platform</span>
        </h2>

        <div className="flex items-center gap-2 sm:gap-3">
          <BookingActionButton
            label="Add your property"
            variant="outline"
            className={cn(
              'h-9 rounded-full border-2 px-3 text-[10px] uppercase tracking-wide sm:h-10 sm:px-4 sm:text-xs md:h-11 md:px-6 md:text-sm',
              hasScrolled
                ? 'border-slate-400 bg-transparent text-slate-700 hover:bg-slate-500/10'
                : 'border-white/40 bg-transparent text-white hover:bg-slate-500/40'
            )}
          />

          <div className="hidden items-center gap-2 sm:gap-3 md:flex">
            <BookingLanguageSelector
              className={cn(
                'h-9 rounded-md px-2 text-xs sm:px-3 sm:text-sm lg:text-base',
                hasScrolled
                  ? 'border-transparent bg-transparent text-slate-700 hover:bg-slate-100'
                  : 'border-transparent bg-transparent text-white hover:bg-white/10'
              )}
            />

            {headerActions.map((action) => (
              <BookingActionButton
                key={action.label}
                label={action.label}
                icon={action.icon}
                onClick={() => handleActionClick(action.label)}
                variant="outline"
                className={cn(
                  'h-8 rounded-full border-transparent px-2 text-xs sm:h-9 sm:px-3 md:px-4 md:text-sm lg:text-base',
                  hasScrolled
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
                  hasScrolled ? 'text-slate-700 hover:bg-slate-100' : 'text-white hover:bg-white/10'
                )}
              >
                <LuMenu className="h-5 w-5" />
                <span className="sr-only">Open header menu</span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56 rounded-xl p-2">
              <div className="mb-2 px-2">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Language</p>
                <BookingLanguageSelector className="h-9 w-full justify-between rounded-md border border-slate-200 bg-white px-2 text-xs text-slate-700 hover:bg-slate-100" />
              </div>
              <DropdownMenuSeparator />
              {headerActions.map((action) => (
                <DropdownMenuItem
                  key={action.label}
                  className="cursor-pointer gap-2 rounded-md py-2"
                  onSelect={() => handleActionClick(action.label)}
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