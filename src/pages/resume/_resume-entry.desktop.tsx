import type { ResumeEntryType } from "./resume";
import Image from "../../lib/components/image/image";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../lib/hooks/use-language";
import style from "./_resume-entry.module.css";

type Props = {
  align: "top" | "bottom";
  entry: ResumeEntryType;
};

export default function ResumeEntryDesktop({ align, entry }: Props) {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const resolvedLanguage = language === "de" ? "german" : "english";

  const image = (
    <Image className="w-52 h-52" url={entry.organizationLogo} noSkeleton />
  );
  const organization = `@${entry.organization}`;

  return (
    <div
      className={`hidden absolute ${align === "top" ? "top-0" : "bottom-0"} ${align === "top" ? "bottom-10" : "top-10"} left-0 right-0 md:grid place-items-center ${style.fadeIn}`}
    >
      <div className="min-w-200 flex flex-row gap-4">
        {entry.organizationLogo &&
          (entry.organizationLink ? (
            <a href={entry.organizationLink} target="_blank">
              {image}
            </a>
          ) : (
            image
          ))}
        <div className="flex flex-col justify-center">
          <p className="text-md font-medium">
            {entry.endAt
              ? `${format(new Date(entry.startAt), t("common:dateFormat"))} - ${format(new Date(entry.endAt), t("common:dateFormat"))}`
              : t("common:fromDate", {
                  date: format(new Date(entry.startAt), t("common:dateFormat")),
                })}
          </p>
          {entry.title && (
            <h1 className="text-2xl font-bold text-orange-500">
              {entry.title[resolvedLanguage]}
            </h1>
          )}
          {entry.organizationLink ? (
            <a
              className="text-3xl font-bold"
              href={entry.organizationLink}
              target="_blank"
            >
              {organization}
            </a>
          ) : (
            <h3 className="text-3xl font-bold">{organization}</h3>
          )}
          {entry.tags && entry.tags.length > 0 && (
            <span className="flex flex-col lg:flex-row lg:gap-2">
              {entry.tags?.map((tag) => (
                <p
                  key={tag}
                  className="text-sm font-light opacity-75"
                >{`#${tag}`}</p>
              ))}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
