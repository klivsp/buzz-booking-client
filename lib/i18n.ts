import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "@/components/language-dropdown/locales/en.json";
import es from "@/components/language-dropdown/locales/es.json";
import it from "@/components/language-dropdown/locales/it.json";

export const DEFAULT_LOCALE = "it" as const;
export const SUPPORTED_LOCALES = ["en", "it", "es"] as const;
export const LOCALE_STORAGE_KEY = "i18nextLng";

void i18n.use(initReactI18next).init({
  lng: DEFAULT_LOCALE,
  fallbackLng: DEFAULT_LOCALE,
  supportedLngs: [...SUPPORTED_LOCALES],
  resources: {
    en: { translation: en },
    it: { translation: it },
    es: { translation: es },
  },
  interpolation: { escapeValue: false },
});

export default i18n;
