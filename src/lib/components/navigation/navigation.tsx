import { useTranslation } from "react-i18next";
import LinkButton from "../button/link-button";

export default function Navigation() {
  const { t } = useTranslation();

  return (
    <header className="max-w-full flex flex-row items-center justify-between gap-1 px-4 py-2 md:justify-end-safe md:gap-8 md:px-8 md:py-4 overflow-hidden">
      <LinkButton label={t("janneGram:title")} destination="/jannegram" />
      <LinkButton label={t("projects:title")} destination="/projects" />
      <LinkButton label={t("resume:title")} destination="/resume" />
      <LinkButton label={t("home:title")} destination="/" />
    </header>
  );
}
