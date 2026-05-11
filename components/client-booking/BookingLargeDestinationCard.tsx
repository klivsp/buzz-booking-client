import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import type { StaticImageData } from 'next/image';

type BookingLargeDestinationCardProps = {
  title: string;
  subtitle: string;
  imageSrc: string | StaticImageData;
  imageAlt?: string;
  className?: string;
  onNavigate?: () => void;
  variant?: 'default' | 'travel-idea' | 'country-banner';
  bannerParagraphs?: string[];
};

const BookingLargeDestinationCard = ({
  title,
  subtitle,
  imageSrc,
  imageAlt = '',
  className,
  onNavigate,
  variant = 'default',
  bannerParagraphs = [],
}: BookingLargeDestinationCardProps) => {
  const isIdea = variant === 'travel-idea';
  const isCountryBanner = variant === 'country-banner';
  const resolvedImageSrc = typeof imageSrc === 'string' ? imageSrc : imageSrc.src;

  const shellClassName = cn(
    'group relative flex h-full min-h-0 w-full flex-col overflow-hidden border text-left shadow-md transition hover:shadow-lg',
    isIdea ? 'rounded-xl border-slate-200' : isCountryBanner ? 'rounded-lg border-slate-100' : 'rounded-2xl border-slate-200',
    onNavigate &&
      'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2'
  );

  const innerCountryBanner = (
    <div className="relative w-full">
      <div className="relative h-[192px] w-full sm:h-[212px] md:h-[232px] lg:h-[252px]">
        <img
          src={resolvedImageSrc}
          alt={imageAlt}
          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.01]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/65 from-[5%] via-black/28 via-[55%] to-black/15"
          aria-hidden
        />
        <div className="absolute inset-0 flex h-full min-h-0 w-full flex-col px-5 py-5 font-sans sm:px-8 sm:py-6 md:px-12 md:py-7 lg:px-16 lg:py-8">
          <h3 className="shrink-0 text-[1.85rem] font-bold leading-[1.08] tracking-tight text-white sm:text-4xl md:text-[2.35rem] lg:text-[2.5rem]">
            {title}
          </h3>
          <div className="mt-3 flex min-h-0 w-full max-w-none flex-1 flex-col gap-y-3 overflow-hidden sm:mt-4 sm:gap-y-4 md:gap-y-5">
            {bannerParagraphs.map((block, idx) => (
              <p
                key={idx}
                className={cn(
                  'min-h-0 w-full max-w-none flex-1 text-left text-sm font-normal leading-[1.7] text-white antialiased [overflow-wrap:anywhere] sm:text-[0.9375rem] md:text-base md:leading-[1.72]',
                  'line-clamp-[5] sm:line-clamp-[7] md:line-clamp-[9] lg:line-clamp-[11]'
                )}
              >
                {block}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const inner = isCountryBanner ? (
    innerCountryBanner
  ) : (
    <>
      <span
        className={cn(
          'relative block w-full flex-1',
          isIdea
            ? 'h-[288px] min-h-[288px] sm:h-[304px] sm:min-h-[304px]'
            : 'min-h-[270px] md:min-h-[300px] lg:min-h-[24.5rem]'
        )}
      >
        <img src={resolvedImageSrc} alt={imageAlt} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]" />
        <span
          className={cn(
            'absolute inset-0 bg-gradient-to-t to-transparent',
            isIdea ? 'from-black/70 via-black/35' : 'from-slate-950/85 via-slate-950/25'
          )}
          aria-hidden
        />
        <div
          className={cn(
            'absolute text-left',
            isIdea
              ? 'bottom-4 left-4 right-4 z-10 flex items-end'
              : 'inset-x-0 bottom-0 flex items-center justify-between gap-4 p-5 md:gap-6 md:p-8'
          )}
        >
          <div className={cn('min-w-0', !isIdea && 'flex-1')}>
            {isIdea ? (
              <p className="font-sans text-sm leading-snug text-white sm:text-[15px]">
                <span className="font-bold text-white">{title}</span>
                {subtitle ? (
                  <span className="font-normal text-white">
                    {' '}
                    - {subtitle}
                  </span>
                ) : null}
              </p>
            ) : (
              <>
                <span className="block text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-[2.15rem] lg:leading-tight xl:text-[2.35rem]">
                  {title}
                </span>
                <span className="mt-1.5 block max-w-sm text-sm font-light leading-relaxed text-white/90 md:text-base">
                  {subtitle}
                </span>
              </>
            )}
          </div>
          {!isIdea ? (
            <span className="flex shrink-0 items-center justify-center text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" aria-hidden>
              <ChevronRight className="h-7 w-7 md:h-8 md:w-8" strokeWidth={2.25} />
            </span>
          ) : null}
        </div>
      </span>
    </>
  );

  if (onNavigate) {
    return (
      <button type="button" onClick={onNavigate} className={cn(shellClassName, className)}>
        {inner}
      </button>
    );
  }

  return <article className={cn(shellClassName, className)}>{inner}</article>;
};

export default BookingLargeDestinationCard;
