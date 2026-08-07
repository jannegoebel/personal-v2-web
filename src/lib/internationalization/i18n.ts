import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import {
  de as dateLocalesDe,
  enUS as dateLocalesEn,
  type Locale,
} from "date-fns/locale";
import commonDe from "./locales/de/common.json";
import commonEn from "./locales/en/common.json";
import contactDe from "./locales/de/contact.json";
import contactEn from "./locales/en/contact.json";
import homeDe from "./locales/de/home.json";
import homeEn from "./locales/en/home.json";
import janneGramDe from "./locales/de/jannegram.json";
import janneGramEn from "./locales/en/jannegram.json";
import projectsDe from "./locales/de/projects.json";
import projectsEn from "./locales/en/projects.json";
import quizDe from "./locales/de/quiz.json";
import quizEn from "./locales/en/quiz.json";
import resumeDe from "./locales/de/resume.json";
import resumeEn from "./locales/en/resume.json";
import songOfTheDayDe from "./locales/de/song-of-the-day.json";
import songOfTheDayEn from "./locales/en/song-of-the-day.json";

export type SupportedLangugage = "en" | "de";

export const supportedLanguages: SupportedLangugage[] = ["en", "de"];
export const dateLocales: Record<SupportedLangugage, Locale> = {
  de: dateLocalesDe,
  en: dateLocalesEn,
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "de",
    supportedLngs: supportedLanguages,
    debug: true,
    resources: {
      en: {
        common: commonEn,
        contact: contactEn,
        home: homeEn,
        janneGram: janneGramEn,
        projects: projectsEn,
        quiz: quizEn,
        resume: resumeEn,
        songOfTheDay: songOfTheDayEn,
      },
      de: {
        common: commonDe,
        contact: contactDe,
        home: homeDe,
        janneGram: janneGramDe,
        projects: projectsDe,
        quiz: quizDe,
        resume: resumeDe,
        songOfTheDay: songOfTheDayDe,
      },
    },

    interpolation: {
      escapeValue: false,
    },

    react: {
      useSuspense: true,
    },
  });

export default i18n;
