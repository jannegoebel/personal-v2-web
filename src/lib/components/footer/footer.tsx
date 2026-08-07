import { useTranslation } from "react-i18next";
import { useTheme } from "../../contexts/theme-context/use-theme";
import Button from "../button/button";
import LinkButton from "../button/link-button";
import { useLanguage } from "../../hooks/use-language";
import { MoonIcon, SunIcon } from "lucide-react";
import UsaFlagIcon from "../icons/usa";
import GermanyFlagIcon from "../icons/germany";

const iconStyle = "w-4";

export default function Footer() {
  const { t } = useTranslation();
  const { language, toggleLanguage } = useLanguage();
  const { isDark, setTheme } = useTheme();

  return (
    <footer className="w-full flex flex-row items-center justify-between gap-1 px-4 py-1 md:justify-end-safe md:gap-4 md:px-8 md:py-2">
      <Button
        classNameLabel="text-sm"
        leftIcon={
          language === "de" ? (
            <GermanyFlagIcon className={iconStyle} />
          ) : (
            <UsaFlagIcon className={iconStyle} />
          )
        }
        label={language === "de" ? t("common:german") : t("common:english")}
        onClick={toggleLanguage}
      />
      <Button
        classNameLabel="text-sm"
        leftIcon={
          isDark ? (
            <MoonIcon className={iconStyle} />
          ) : (
            <SunIcon className={iconStyle} />
          )
        }
        label={isDark ? t("common:dark") : t("common:light")}
        onClick={() => setTheme(isDark ? "light" : "dark")}
      />
      <LinkButton
        classNameLabel="text-sm"
        label={t("contact:title")}
        destination="/contact"
      />
    </footer>
  );
}
