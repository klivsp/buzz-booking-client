"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  CalendarDays,
  ChevronDown,
  CircleUserRound,
  LogIn,
  MapPin,
  Menu,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const HERO_BACKGROUND_SRC = "/bookingHome.jpg" as const;
const HEADER_SCROLL_BLEND_MAX = 440;

const FLAG_IT_SRC = "/flags/it.svg" as const;
const FLAG_EN_SRC = "/flags/en.svg" as const;

type HeroLocale = "it" | "en";

function HeroLanguageDropdown({
  locale,
  onLocaleChange,
  hasScrolled,
  align = "right",
  triggerClassName,
}: {
  locale: HeroLocale;
  onLocaleChange: (v: HeroLocale) => void;
  hasScrolled: boolean;
  align?: "left" | "right";
  triggerClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (
        rootRef.current &&
        !rootRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const currentFlag = locale === "it" ? FLAG_IT_SRC : FLAG_EN_SRC;

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={
          locale === "it"
            ? "Language: Italian. Open menu"
            : "Language: English. Open menu"
        }
        className={cn(
          "flex h-9 items-center gap-1.5 rounded-md border-0 bg-transparent px-1.5 outline-none transition focus-visible:ring-2 focus-visible:ring-offset-0",
          hasScrolled
            ? "text-slate-700 hover:bg-slate-100 focus-visible:ring-slate-400/50"
            : "text-white hover:bg-white/10 focus-visible:ring-white/50",
          triggerClassName,
        )}
        onClick={() => setOpen((v) => !v)}
      >
        <Image
          src={currentFlag}
          alt=""
          width={24}
          height={16}
          unoptimized
          className="rounded-sm object-cover shadow-sm ring-1 ring-black/10"
        />
        <ChevronDown
          className={cn(
            "size-4 shrink-0 transition-transform",
            open && "rotate-180",
            hasScrolled ? "text-slate-700" : "text-white",
          )}
          strokeWidth={2}
          aria-hidden
        />
      </button>

      {open ? (
        <ul
          role="listbox"
          aria-label="Languages"
          className={cn(
            "absolute top-full z-[70] mt-1.5 min-w-[11rem] overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg",
            align === "right" ? "right-0" : "left-0",
          )}
        >
          <li>
            <button
              type="button"
              role="option"
              aria-selected={locale === "it"}
              className={cn(
                "flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-sm text-slate-800 hover:bg-slate-50",
                locale === "it" && "bg-slate-100 font-medium",
              )}
              onClick={() => {
                onLocaleChange("it");
                setOpen(false);
              }}
            >
              <Image
                src={FLAG_IT_SRC}
                alt=""
                width={24}
                height={16}
                unoptimized
                className="rounded-sm object-cover"
              />
              Italiano
            </button>
          </li>
          <li>
            <button
              type="button"
              role="option"
              aria-selected={locale === "en"}
              className={cn(
                "flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-sm text-slate-800 hover:bg-slate-50",
                locale === "en" && "bg-slate-100 font-medium",
              )}
              onClick={() => {
                onLocaleChange("en");
                setOpen(false);
              }}
            >
              <Image
                src={FLAG_EN_SRC}
                alt=""
                width={24}
                height={16}
                unoptimized
                className="rounded-sm object-cover"
              />
              English
            </button>
          </li>
        </ul>
      ) : null}
    </div>
  );
}

type HeroSearchFieldProps = {
  icon: ReactNode;
  label: string;
  value: string;
  withLeadingRule?: boolean;
  className?: string;
};

function HeroSearchField({
  icon,
  label,
  value,
  withLeadingRule,
  className,
}: HeroSearchFieldProps) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-1 items-center gap-2.5 rounded-2xl border border-slate-200 bg-white px-3 py-3 sm:px-4 sm:py-3",
        "lg:rounded-none lg:border-0 lg:bg-transparent lg:px-5 lg:py-2",
        withLeadingRule && "lg:border-l lg:border-slate-200 lg:pl-6",
        !withLeadingRule && "lg:pl-7",
        className,
      )}
    >
      <span className="shrink-0 text-slate-400">{icon}</span>
      <div className="min-w-0 flex-1 text-left leading-tight">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400 sm:text-[11px]">
          {label}
        </p>
        <p className="mt-0.5 truncate text-sm font-medium text-slate-700 sm:text-[15px]">
          {value}
        </p>
      </div>
    </div>
  );
}

function HeroSearchStrip() {
  return (
    <div
      className={cn(
        "w-full border border-slate-200 bg-white text-slate-900",
        "rounded-2xl shadow-[0_14px_44px_-12px_rgba(15,23,42,0.36)]",
        "px-3 py-3 sm:px-5 sm:py-3",
        "lg:rounded-full lg:px-3 lg:py-2 lg:shadow-[0_16px_48px_-12px_rgba(15,23,42,0.38)]",
      )}
      role="search"
      aria-label="Search stays"
    >
      <div className="flex flex-col gap-2.5 lg:flex-row lg:items-stretch lg:gap-0">
        <HeroSearchField
          withLeadingRule={false}
          label="Destination"
          value="Where are you going?"
          icon={<MapPin className="size-[18px] shrink-0" strokeWidth={1.75} aria-hidden />}
          className="lg:flex-[1.2] lg:pr-1"
        />

        <HeroSearchField
          withLeadingRule
          label="Check in - Check out"
          value="Select dates"
          icon={
            <CalendarDays className="size-[18px] shrink-0" strokeWidth={1.75} aria-hidden />
          }
          className="lg:flex-1 lg:pr-1"
        />

        <HeroSearchField
          withLeadingRule
          label="How many people"
          value="1 adult"
          icon={<Users className="size-[18px] shrink-0" strokeWidth={1.75} aria-hidden />}
          className="lg:flex-1 lg:pr-1"
        />

        <div className="flex items-stretch px-0.5 pt-0.5 sm:px-1 lg:border-l lg:border-slate-200 lg:px-3 lg:py-0.5 lg:pl-5">
          <Button
            type="button"
            className={cn(
              "h-11 w-full rounded-lg text-xs font-bold uppercase tracking-[0.12em] text-white",
              "bg-[#3b82f6] shadow-sm hover:bg-blue-700",
              "lg:h-full lg:min-h-[2.75rem] lg:self-stretch lg:rounded-lg lg:px-10 lg:text-xs",
            )}
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}

export function BookingHero() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [heroLocale, setHeroLocale] = useState<HeroLocale>("it");
  const mobileNavRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHasScrolled(y > 24);
      setScrollProgress(Math.min(y / HEADER_SCROLL_BLEND_MAX, 1));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileNavOpen) return;
    const close = (e: MouseEvent) => {
      if (
        mobileNavRef.current &&
        !mobileNavRef.current.contains(e.target as Node)
      ) {
        setMobileNavOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [mobileNavOpen]);

  const headerSolid = scrollProgress > 0;

  return (
    <>
      <header
        className={cn(
          "fixed left-0 top-0 z-40 w-full border-b transition-all duration-300",
          hasScrolled ? "backdrop-blur-md shadow-md" : "shadow-none",
        )}
        style={{
          backgroundColor: headerSolid
            ? `rgba(255, 255, 255, ${0.95 * scrollProgress})`
            : "transparent",
          borderColor: headerSolid
            ? `rgba(226, 232, 240, ${scrollProgress})`
            : "transparent",
        }}
      >
        <div className="flex h-20 w-full items-center justify-between px-4 sm:px-6 lg:px-10">
          <h2
            className={cn(
              "font-serif text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl",
              hasScrolled ? "text-emerald-700" : "text-white",
            )}
          >
            <span className="md:hidden">Buzz</span>
            <span className="hidden md:inline">Buzz Booking</span>
          </h2>

          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              type="button"
              variant="outline"
              className={cn(
                "h-9 rounded-full border-2 px-3 text-[10px] font-semibold uppercase tracking-wide sm:h-10 sm:px-4 sm:text-xs md:h-11 md:px-6 md:text-sm",
                hasScrolled
                  ? "border-slate-400 bg-transparent text-slate-700 hover:bg-slate-500/10"
                  : "border-white/40 bg-transparent text-white hover:bg-white/15",
              )}
            >
              Add your property
            </Button>

            <div className="hidden items-center gap-2 sm:gap-3 md:flex">
              <HeroLanguageDropdown
                locale={heroLocale}
                onLocaleChange={setHeroLocale}
                hasScrolled={hasScrolled}
                align="right"
              />

              <Button
                type="button"
                variant="outline"
                className={cn(
                  "h-8 gap-2 rounded-full border-transparent px-2 text-xs font-semibold uppercase tracking-wide sm:h-9 sm:px-3 md:px-4 md:text-sm lg:text-base",
                  hasScrolled
                    ? "bg-transparent text-slate-700 hover:bg-slate-400/20"
                    : "bg-transparent text-white hover:bg-white/10",
                )}
              >
                <CircleUserRound className="size-4 shrink-0" aria-hidden />
                Register
              </Button>

              <Button
                type="button"
                variant="outline"
                className={cn(
                  "h-8 gap-2 rounded-full border-transparent px-2 text-xs font-semibold uppercase tracking-wide sm:h-9 sm:px-3 md:px-4 md:text-sm lg:text-base",
                  hasScrolled
                    ? "bg-transparent text-slate-700 hover:bg-slate-400/20"
                    : "bg-transparent text-white hover:bg-white/10",
                )}
              >
                <LogIn className="size-4 shrink-0" aria-hidden />
                Login
              </Button>
            </div>

            <div className="relative md:hidden" ref={mobileNavRef}>
              <Button
                type="button"
                variant="outline"
                size="icon"
                aria-expanded={mobileNavOpen}
                aria-controls="booking-hero-mobile-nav"
                className={cn(
                  "size-9 rounded-full border-transparent bg-transparent",
                  hasScrolled
                    ? "text-slate-700 hover:bg-slate-100"
                    : "text-white hover:bg-white/10",
                )}
                onClick={() => setMobileNavOpen((o) => !o)}
              >
                <Menu className="size-5" aria-hidden />
                <span className="sr-only">Open menu</span>
              </Button>

              {mobileNavOpen ? (
                <div
                  id="booking-hero-mobile-nav"
                  className="absolute right-0 top-full z-50 mt-2 w-56 rounded-xl border border-slate-200 bg-white p-2 shadow-lg"
                >
                  <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Language
                  </p>
                  <div className="mb-2 px-0">
                    <HeroLanguageDropdown
                      locale={heroLocale}
                      onLocaleChange={setHeroLocale}
                      hasScrolled
                      align="left"
                      triggerClassName="w-full justify-between rounded-md border border-slate-200 bg-white px-3 text-slate-800 hover:bg-slate-50"
                    />
                  </div>
                  <div className="my-2 h-px bg-slate-200" />
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full justify-start gap-2 rounded-md py-2 text-slate-800"
                    onClick={() => setMobileNavOpen(false)}
                  >
                    <CircleUserRound className="size-5" aria-hidden />
                    Register
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full justify-start gap-2 rounded-md py-2 text-slate-800"
                    onClick={() => setMobileNavOpen(false)}
                  >
                    <LogIn className="size-5" aria-hidden />
                    Login
                  </Button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </header>

      <section className="relative flex min-h-[100dvh] flex-col overflow-hidden text-white pt-20">
        <div className="pointer-events-none absolute inset-0">
          <Image
            src={HERO_BACKGROUND_SRC}
            alt= "img"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-slate-900/35" aria-hidden />
        </div>

        <div className="relative z-10 flex flex-1 flex-col px-4 pb-16 pt-10 sm:px-6 sm:pt-12 sm:pb-20 lg:px-10 lg:pt-14">
          <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-start">
            <div className="w-full pt-8 lg:pt-12">
              <div className="max-w-2xl text-left">
                <h1 className="font-serif text-4xl font-bold leading-tight md:text-5xl">
                  Find your ideal stay with fast and secure booking
                </h1>
                <p className="mt-4 max-w-xl font-sans text-sm leading-relaxed text-slate-100 md:text-base">
                  Inspired by modern booking platforms, with a focus on clarity,
                  trust, and an excellent user experience.
                </p>
              </div>

              <div className="mt-8 w-full sm:mt-9 lg:mt-10">
                <HeroSearchStrip />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
