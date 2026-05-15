"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";
import { Check, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DEFAULT_LOCALE } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const languages = [
  {
    code: "en",
    label: "English",
    flagSrc: "/flags/en.svg",
  },
  {
    code: "it",
    label: "Italiano",
    flagSrc: "/flags/it.svg",
  },
  {
    code: "es",
    label: "Español",
    flagSrc: "/flags/es.svg",
  },
] as const;

type LanguageSwitcherProps = {
  variant?: "default" | "compact";
  hasScrolled?: boolean;
  triggerClassName?: string;
  align?: "start" | "end" | "center";
};

export function LanguageSwitcher({
  variant = "default",
  hasScrolled = false,
  triggerClassName,
  align = "end",
}: LanguageSwitcherProps) {
  const { i18n } = useTranslation();

  const currentLanguage =
    languages.find((lang) => i18n.language.startsWith(lang.code)) ??
    languages.find((lang) => lang.code === DEFAULT_LOCALE)!;

  const isCompact = variant === "compact";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant={isCompact ? "ghost" : "outline"}
          className={cn(
            isCompact
              ? "flex h-9 gap-1.5 rounded-md border-0 bg-transparent px-1.5 shadow-none hover:bg-transparent"
              : "flex h-10 min-w-[11rem] justify-between gap-2 rounded-xl px-3",
            isCompact &&
              (hasScrolled
                ? "text-slate-700 hover:bg-slate-100"
                : "text-white hover:bg-white/10"),
            triggerClassName,
          )}
          aria-label={`Language: ${currentLanguage.label}. Open menu`}
        >
          <Image
            src={currentLanguage.flagSrc}
            alt=""
            width={24}
            height={16}
            unoptimized
            className="rounded-sm object-cover shadow-sm ring-1 ring-black/10"
          />

          {isCompact ? (
            <ChevronDown
              className={cn(
                "size-4 shrink-0 opacity-80",
                hasScrolled ? "text-slate-700" : "text-white",
              )}
              strokeWidth={2}
              aria-hidden
            />
          ) : (
            <>
              <span className="font-medium">{currentLanguage.label}</span>
              <ChevronDown className="size-4 opacity-60" aria-hidden />
            </>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align={align}
        className="min-w-[11rem] w-52 overflow-hidden rounded-xl p-1"
      >
        {languages.map((language) => {
          const active = i18n.language.startsWith(language.code);

          return (
            <DropdownMenuItem
              key={language.code}
              onClick={() => void i18n.changeLanguage(language.code)}
              className={cn(
                "flex cursor-pointer items-center justify-between gap-2.5 rounded-lg px-3 py-2.5",
                active && "bg-slate-100 font-medium",
              )}
            >
              <div className="flex items-center gap-2.5">
                <Image
                  src={language.flagSrc}
                  alt=""
                  width={24}
                  height={16}
                  unoptimized
                  className="rounded-sm object-cover"
                />
                <span>{language.label}</span>
              </div>

              {active ? <Check className="size-4 text-primary" aria-hidden /> : null}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
