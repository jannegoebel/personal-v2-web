import type { SupportedLangugage } from "../internationalization/i18n";
import { useTranslation } from "react-i18next";

function isSupportedLanguage(lang: string): lang is SupportedLangugage {
  return lang === "de" || lang === "en";
}

function getLanguage(lang: string): SupportedLangugage {
  if (!isSupportedLanguage(lang)) {
    // If unsupported language return fallback
    return "de";
  }

  return lang;
}

export function useLanguage() {
  const { i18n } = useTranslation();

  const language = getLanguage(i18n.language);

  function toggleLanguage() {
    i18n.changeLanguage(language === "de" ? "en" : "de");
  }

  return {
    language,
    toggleLanguage,
  };
}
