import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CARD_GAP_PX = 16;

type BookingPropertyCarouselProps = {
    children: React.ReactNode;
    className?: string;
    slideCount?: number;
    overlayArrows?: boolean;
};

const arrowButtonBase =
    'pointer-events-auto absolute top-1/2 z-20 inline-flex h-auto min-h-0 w-auto -translate-y-1/2 items-center justify-center rounded-none border-0 bg-transparent p-1 shadow-none ring-0 ring-offset-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-25 sm:p-1.5';

const iconBase =
    'h-8 w-8 shrink-0 stroke-[2.25] sm:h-9 sm:w-9 sm:stroke-[2.5] md:h-10 md:w-10 md:stroke-[2.75] lg:h-11 lg:w-11 lg:stroke-[3] xl:h-12 xl:w-12 xl:stroke-[3]';

const BookingCarousel = ({children, className, slideCount = 0, overlayArrows = false,}: BookingPropertyCarouselProps) => {
    const scrollerRef = useRef<HTMLDivElement>(null);
    const [canPrev, setCanPrev] = useState(false);
    const [canNext, setCanNext] = useState(true);

    const updateArrows = useCallback(() => {
        const el = scrollerRef.current;
        if (!el) {
            return;
        }
        const { scrollLeft, scrollWidth, clientWidth } = el;
        setCanPrev(scrollLeft > 4);
        setCanNext(scrollLeft < scrollWidth - clientWidth - 4);
    }, []);

    useEffect(() => {
        const el = scrollerRef.current;
        if (!el) {
            return;
        }
        updateArrows();
        el.addEventListener('scroll', updateArrows, { passive: true });
        const ro = new ResizeObserver(updateArrows);
        ro.observe(el);
        return () => {
            el.removeEventListener('scroll', updateArrows);
            ro.disconnect();
        };
    }, [updateArrows, slideCount]);

    const scrollByStep = (direction: 'prev' | 'next') => {
        const el = scrollerRef.current;
        if (!el) {
            return;
        }
        const firstCard = el.querySelector<HTMLElement>('[data-carousel-card]');
        const step = (firstCard?.offsetWidth ?? 200) + CARD_GAP_PX;
        el.scrollBy({
            left: direction === 'next' ? step : -step,
            behavior: 'smooth',
        });
    };

    const arrowButtonClass = cn(
        arrowButtonBase,
        overlayArrows ? 'text-white hover:bg-black/25' : 'text-slate-900 hover:bg-black/[0.07]'
    );

    const iconClass = cn(iconBase, overlayArrows && 'drop-shadow-[0_1px_3px_rgba(0,0,0,0.55)]');

    return (
        <div className={cn('relative isolate min-h-0 min-w-0 max-w-full flex-1 pl-1 pr-1 sm:pl-2 sm:pr-2', className)}>
            <div
                ref={scrollerRef}
                className="scrollbar-thin flex min-h-0 min-w-0 max-w-full snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-visible py-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
                {children}
            </div>

            <button
                type="button"
                disabled={!canPrev}
                onClick={() => scrollByStep('prev')}
                className={cn(arrowButtonClass, 'left-0.5 z-30 sm:left-1')}
                aria-label="Previous slide"
            >
                <ChevronLeft className={iconClass} />
            </button>

            <button
                type="button"
                disabled={!canNext}
                onClick={() => scrollByStep('next')}
                className={cn(arrowButtonClass, 'right-0.5 z-30 sm:right-1')}
                aria-label="Next slide"
            >
                <ChevronRight className={iconClass} />
            </button>
        </div>
    );
};

export default BookingCarousel;