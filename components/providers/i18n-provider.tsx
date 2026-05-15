"use client";

import { useEffect } from "react";
import { I18nextProvider } from "react-i18next";

import i18n, {
  DEFAULT_LOCALE,
  LOCALE_STORAGE_KEY,
  SUPPORTED_LOCALES,
} from "@/lib/i18n";

function resolvePreferredLocale(): string {
  const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
  if (stored && SUPPORTED_LOCALES.some((code) => stored.startsWith(code))) {
    return stored;
  }

  const browser = navigator.language.split("-")[0];
  if (SUPPORTED_LOCALES.includes(browser as (typeof SUPPORTED_LOCALES)[number])) {
    return browser;
  }

  return DEFAULT_LOCALE;
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const preferred = resolvePreferredLocale();
    if (!i18n.language.startsWith(preferred)) {
      void i18n.changeLanguage(preferred);
    }

    const persistLocale = (lng: string) => {
      localStorage.setItem(LOCALE_STORAGE_KEY, lng);
    };

    i18n.on("languageChanged", persistLocale);
    return () => {
      i18n.off("languageChanged", persistLocale);
    };
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
